

export class RomanNumeralsParser
{
    input: string;
    
    constructor(input : string) {
        this.input = input;
    }

    public parse() : number {
        let inputlen = this.input.length;
        let char = this.input.charAt(0);
        let index = 0;
        let numbers: number[] = []; 
        while(true) {
            let nextChar = this.input.charAt(++index);
            switch(char) {
                case 'M': 
                    numbers.push(1000);
                    char = nextChar;
                    break;
                case 'D': 
                    numbers.push(500);
                    switch(nextChar) {
                        case 'M':
                        {
                            numbers.pop();
                            numbers.push(500);
                            nextChar = this.input.charAt(++index);                                
                        }
                        break;
                    }
                    char = nextChar;
                    break;
                case 'C': 
                    numbers.push(100);
                    switch(nextChar) {
                        case 'M':
                        {
                            numbers.pop();
                            numbers.push(900);
                            nextChar = this.input.charAt(++index); 
                            break;                               
                        }
                        case 'D':
                        {
                            numbers.pop();
                            numbers.push(400);
                            nextChar = this.input.charAt(++index);                                
                            break;
                        }                        
                    }
                    char = nextChar;
                    break;
                case 'L': 
                    numbers.push(50);
                    char = nextChar;
                    break;
                case 'X': 
                    numbers.push(10);
                    switch(nextChar) {
                        case 'C':
                        {
                            numbers.pop();
                            numbers.push(90);
                            nextChar = this.input.charAt(++index);  
                            break;                              
                        }
                        case 'L':
                        {
                            numbers.pop();
                            numbers.push(40);
                            nextChar = this.input.charAt(++index);                                
                            break;
                        }
                    }
                    char = nextChar;
                    break;
                case 'V': 
                    numbers.push(5);
                    char = nextChar;
                    break;
                case 'I':
                    {
                        numbers.push(1);
                        switch(nextChar) {
                            case 'X':
                            {
                                numbers.pop();
                                numbers.push(9);
                                nextChar = this.input.charAt(++index);  
                                break;                              
                            }
                            case 'V':
                            {
                                numbers.pop();
                                numbers.push(4);
                                nextChar = this.input.charAt(++index);                                
                                break;
                            }
                        }
                        char = nextChar;
                        break;
                    }
                default:
                    throw new Error('Unknown character: ' + char);

            }
            if(char == '' || char == undefined)
                break;  
        }        
        var result = 0;
        numbers.forEach(n => {
            result += n;
        });

        return result;
    }
}