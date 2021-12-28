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
        let input = this.input;
        let char = input.charAt(0);
        let index = 0;
        let numbers: number[] = []; 
        
        function getNextchar() {
            return input.charAt(++index);
        }

        while(true) {
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
        var result = 0;
        numbers.forEach(n => {
            result += n;
        });

        return result;
    }
}