// BNF:
// indkøbsliste := indkøbsliste | liste
// liste        := antal enhed varenavn NL
// antal        := digit{digit}[.digit{digit}]
// enhed        := GRAM | G | KILO | KILOGRAM | KG | LITER | L
// varenavn     := letter{letter}
// digit        := 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 
// letter       := 'a'...'z', 'æ', 'ø', 'å' | 'A' ... 'Z'. 'Æ', 'Ø', 'Å'


enum TOKENS {
    ANTAL = 1,
    ENHED,
    VARENAVN,
    NL  // newline
}

class Token {
    constructor(public type: TOKENS, public value: string = '') {

    }
};


export class SimpleParser
{
    tokens: Token[] = [];
    input : string = "12.50 liter øl\n2 kg kaffe ";
    tokenindex: number = 0;
    line: number = 0;
    /**
     *
     */
    constructor() {
        
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
                        while(!done) {
                            switch(nextchar) {
                                case '0':case '1':case '2':case '3':case '4':case '5':case '6':case '7':case '8':case '9':
                                case '.':
                                    {
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
                                            this.tokens[this.tokens.length] = new Token(TOKENS.ENHED, _token);
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
            console.log(TOKENS[element.type] + " " + element.value);
        });
    }


    // læg i en klasse for sig selv så scanner(lexer) og parser er adskilt
    // implementer token-lookahead rutine... antal() -> enhed() -> varenavn()
    parse() : void {
        this.tokenindex = 0;
        this.line = 1;
        while(this.antal() != null) {
            this.enhed();
            this.varenavn();
            
        }
        
    } 

    private varenavn() {
        let token = this.nextToken();
        if(!token)
            return token;
        if(token && token.type == TOKENS.VARENAVN) {
            let antal = parseFloat(token.value);       
            this.newline();
        } else 
            throw new Error('Unexpected token ' + TOKENS[token.type] + '(' + token.value +'), should be VARENAVN - line: ' + this.line);
    }

    private newline() {
        let token = this.nextToken();

        if(!token)
            return token;
        if(token && token.type == TOKENS.NL) {
            this.line++;
        }
    }

    private antal() : Token |  null {
        let token = this.nextToken();

        if(!token)
            return token;
        if(token && token.type == TOKENS.ANTAL) {
            let antal = parseFloat(token.value);    
            console.log("Antal er: " + antal);   
        } else 
            throw new Error('Unexpected token ' + TOKENS[token.type] + '('+ token.value+'), should be ANTAL - line: ' + this.line);
        return token;
    }

    private enhed() {
        let token = this.nextToken();

        if(!token)
            return token;
        if(token && token.type == TOKENS.ENHED) {
            let enhed = token.value.toUpperCase();
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
                    throw new Error('unit not recognized ' + TOKENS[token.type] + ', ' + token.value + ' - line: ' + this.line);
                }
            }
        } else 
            throw new Error('Unexpected token ' + TOKENS[token.type] + '('+ token.value+'), should be ENHED - line: ' + this.line);
    }

    private nextToken() : Token | null {
        if(this.tokenindex < this.tokens.length)
            return this.tokens[this.tokenindex++];
        return null;
    }


}