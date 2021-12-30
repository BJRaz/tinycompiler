enum N {
    M = 1000,
    D = 500,
    C = 100,
    L = 50,
    X = 10,
    V = 5,
    I = 1
}

export class RomanNumeralsParser
{
    input: string;

    constructor(input : string) {
        this.input = input;
    }

   

    public parse() : number {
        const input = this.input;
        let char = input.charAt(0);
        let index = 0;
        const numbers: number[] = []; 
            
        function getNextchar() {
            return input.charAt(++index);
        }

        const loop = true;
        while(loop) {
            let nextChar = getNextchar();
            switch(char) {
                case 'M': 
                    numbers.push(N.M);
                    break;
                case 'D': 
                    numbers.push(N.D);
                    break;
                case 'C': 
                    numbers.push(N.C);
                    switch(nextChar) {
                        case 'M':
                            {
                                //@ts-ignore
                                numbers.push(N.M - numbers.pop());
                                nextChar = getNextchar(); 
                                break;                               
                            }
                        case 'D':
                            {
                                //@ts-ignore
                                numbers.push(N.D - numbers.pop());
                                nextChar = getNextchar();                                
                                break;
                            }   
                        // case 'C':
                        //     {
                        //         // TODO: refactor to only allow 3 consecutive 'C's
                        //         numbers.push(N.C);
                        //         let idx = index;    // index points at lastChar
                        //         while((nextChar = getNextchar()) == 'C')
                        //             numbers.push(N.C); 
                        //         break; 
                        //     }                     
                    }
                    break;
                case 'L': 
                    numbers.push(N.L);
                    break;
                case 'X': 
                    numbers.push(N.X);
                    switch(nextChar) {
                        case 'C':
                        {
                            //@ts-ignore
                            numbers.push(N.C - numbers.pop());
                            nextChar = getNextchar();  
                            break;                              
                        }
                        case 'L':
                        {
                            //@ts-ignore
                            numbers.push(N.L - numbers.pop());
                            nextChar = getNextchar();                                
                            break;
                        }
                    }
                    break;
                case 'V': 
                    numbers.push(N.V);
                    break;
                case 'I':
                    {
                        numbers.push(N.I);
                        switch(nextChar) {
                            case 'X':
                            {
                                //@ts-ignore
                                numbers.push(N.X - numbers.pop());
                                nextChar = getNextchar();  
                                break;                              
                            }
                            case 'V':
                            {
                                //@ts-ignore
                                numbers.push(N.V - numbers.pop());
                                nextChar = getNextchar();                                
                                break;
                            }
                        }
                        break;
                    }
                default:
                    throw new Error('Unknown character: "' + char + '"');

            }

            char = nextChar;

            if(char == '' || char == undefined)
                break;  
        }        
        let result = 0;
        numbers.forEach(n => {
            result += n;
        });

        return result;
    }
}

// BNF:
// indkøbsliste ::= liste | indkøbsliste liste
// liste        ::= antal enhed varenavn NL
// antal        ::= digit{digit}[.digit{digit}]
// enhed        ::= GRAM | G | KILO | KILOGRAM | KG | LITER | L
// varenavn     ::= letter{letter | digit}
// digit        ::= 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 
// letter       ::= 'a'...'z', 'æ', 'ø', 'å' | 'A' ... 'Z'. 'Æ', 'Ø', 'Å'


enum TOKENS {
    ANTAL = 1,
    ENHED,
    VARENAVN,
    NL,  // newline
    DUMMY 
}

class Token {
    constructor(public type: TOKENS, public value: string = '') {

    }
}


export class SimpleParser
{
    tokens: Token[] = [];
    tokenindex = 0;
    line = 0;
    currentToken: Token;
    
    /**
     *
     */
    constructor(protected input: string) {
        this.currentToken = new Token(TOKENS.DUMMY);
    }

    scan() : void {
        const inputlen = this.input.length;
        let index = 0;
        let char = this.input.charAt(0);
        const loop = true;
        while(loop) {
            let nextchar = this.input.charAt(++index);

            switch(char) {
                case '\n':           
                    this.tokens[this.tokens.length] = new Token(TOKENS.NL);
                    char = nextchar;
                    break;    
                case ' ':
                    char = nextchar;
                    break;
                case '0':case '1':case '2':case '3':case '4':case '5':case '6':case '7':case '8':case '9':
                    {
                        const token : string[] = [];
                        token[token.length] = char;
                        let done = false; 
                        let decimal = false;
                        while(!done) {
                            switch(nextchar) {
                                case '0':case '1':case '2':case '3':case '4':case '5':case '6':case '7':case '8':case '9':
                                case '.':
                                    {
                                        if(decimal && nextchar == '.')
                                            throw new Error('Unexpected decimal point ' + this.input.substring(0,index) + '<.>');
                                        if(nextchar == '.')
                                            decimal = true;                                    
                                        token[token.length] = nextchar;
                                        
                                        nextchar = this.input.charAt(++index);
                                        
                                    }
                                    break;
                                default:
                                    {
                                        //
                                        char = nextchar;
                                        done = true;    
                                        this.tokens[this.tokens.length] = new Token(TOKENS.ANTAL, token.join('')) ;
                                    }
                            }
                        }
                    }
                    break;
                default:
                    {       
                        
                        const token: string[] = [];
                        token[token.length] = char;
                        let done = false;                 
                        while(!done) {

                            if(nextchar == ' ' || nextchar == '' || nextchar == '\n') {
                                // done reading lexeme, decide action:
                                const _token = token.join('');
                                switch(_token) {
                                    case 'g':
                                    case 'gram':
                                    case 'kg':
                                    case 'kilo':
                                    case 'kilogram':
                                    case 'l':
                                    case 'liter':
                                            this.tokens[this.tokens.length] = new Token(TOKENS.ENHED, _token.toUpperCase());
                                            break;
                                    default:
                                            this.tokens[this.tokens.length] = new Token(TOKENS.VARENAVN, _token);
                                            break;
                                }
                                char = nextchar;
                                done = true;  
                                
                            } else {
                                token[token.length] = nextchar;
                                nextchar = this.input.charAt(++index);
                            }
                            
                        }
                    }
            }
            if(index == inputlen)
                break;    
        }

        console.log('OK .. SCAN done.. listing tokens: ');

        this.tokens.forEach(element => {
            console.log('Element: ' + TOKENS[element.type] + " (" + element.value + ')');
        });
    }


    // læg i en klasse for sig selv så scanner(lexer) og parser er adskilt
    // implementer token-lookahead rutine... antal() -> enhed() -> varenavn()
    parse() : void {
        this.tokenindex = 0;
        this.line = 1;
        try {
            while(this.hasMoreTokens()) {
                if(this.nextTokenMatch(TOKENS.ANTAL))
                    this.antal();
                else
                throw new Error('Unexpected token ' + TOKENS[this.currentToken.type] + '(' + this.currentToken.value +'), should be ANTAL - line: ' + this.line);    
            }           
        } catch (error) {
            console.log("PARSE ERROR: " + error);
        }
    } 

    private nextTokenMatch(type: TOKENS) {
        if(this.hasMoreTokens()) {
            this.nextToken();
            return this.currentToken.type == type;
        }
        return false;
    }
    
    private antal() {
        const antal = parseFloat(this.currentToken.value);    
        console.log("Antal er: " + antal);   
        if(this.nextTokenMatch(TOKENS.ENHED)) {
            this.enhed();
        } else 
            throw new Error('Unexpected token ' + TOKENS[this.currentToken.type] + '(' + this.currentToken.value +'), should be ENHED - line: ' + this.line);    
    }

    private enhed() {
        const enhed = this.currentToken.value.toUpperCase();
        switch(enhed) {
            case 'KG':case 'KILO':case 'KILOGRAM':
                break;
            case 'L':case 'LITER':
                break;
            case 'G':case 'GRAM':
                break;
            default: {
                throw new Error('unit not recognized ' + TOKENS[this.currentToken.type] + ', ' + this.currentToken.value + ' - line: ' + this.line);
            }
        }
        // do something
        console.log('Enhed: ' + this.currentToken.value);
        if(this.nextTokenMatch(TOKENS.VARENAVN)) {
            this.varenavn();
        } else 
            throw new Error('Unexpected token ' + TOKENS[this.currentToken.type] + '(' + this.currentToken.value +'), should be VARENAVN - line: ' + this.line);
    }

    private varenavn() {
        // do something      
        console.log('Varenavn: ' + this.currentToken.value);
        if(this.nextTokenMatch(TOKENS.NL)) {
            this.line++;
        } 
    }

    private nextToken() {
        this.currentToken = this.tokens[this.tokenindex++];
    }

    private hasMoreTokens(): boolean {
        return this.tokenindex < this.tokens.length;
    }

}