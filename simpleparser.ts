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
};


export class SimpleParser
{
    tokens: Token[] = [];
    input : string = "4 liter øl\n1 kg kaffe\n800 gram mel\n4 l guldkorn";
    tokenindex: number = 0;
    line: number = 0;
    currentToken: Token;
    
    /**
     *
     */
    constructor() {
        this.currentToken = new Token(TOKENS.DUMMY);
    }

    scan() : void {
        let inputlen = this.input.length;
        let index = 0;
        let char = this.input.charAt(0);
        while(true) {
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
                        let token : string[] = [];
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
                        
                        let token: string[] = [];
                        token[token.length] = char;
                        let done = false;                 
                        while(!done) {

                            if(nextchar == ' ' || nextchar == '' || nextchar == '\n') {
                                // done reading lexeme, decide action:
                                let _token = token.join('');
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

        console.log('OK .. done..');

        this.tokens.forEach(element => {
            console.log('Element: ' + TOKENS[element.type] + " (" + element.value + ')');
        });
    }


    // læg i en klasse for sig selv så scanner(lexer) og parser er adskilt
    // implementer token-lookahead rutine... antal() -> enhed() -> varenavn()
    parse() : void {
        this.tokenindex = 0;
        this.line = 1;
        
        while(this.hasMoreTokens()) {
            if(this.nextTokenMatch(TOKENS.ANTAL))
                this.antal();
            else
               throw new Error('Unexpected token ' + TOKENS[this.currentToken.type] + '(' + this.currentToken.value +'), should be ANTAL - line: ' + this.line);    
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
        let antal = parseFloat(this.currentToken.value);    
        console.log("Antal er: " + antal);   
        if(this.nextTokenMatch(TOKENS.ENHED)) {
            this.enhed();
        } else 
            throw new Error('Unexpected token ' + TOKENS[this.currentToken.type] + '(' + this.currentToken.value +'), should be ENHED - line: ' + this.line);    
    }

    private enhed() {
        let enhed = this.currentToken.value.toUpperCase();
        switch(enhed) {
            case 'KG':case 'KILO':case 'KILOGRAM':
                {}
                break;
            case 'L':case 'LITER':
                {}
                break;
            case 'G':case 'GRAM':
                {}
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