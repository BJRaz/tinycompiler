import { SimpleParser } from "./simpleparser";
import { RomanNumeralsParser } from "./romannumeralsparser";

class Main{
    public static Start(): number {
        // let input = "1 liter øl\n1 kg kaffe\n800 gram mel\n4 kg guldkorn";
        // var parser = new SimpleParser(input);
        // parser.scan();
        // parser.parse();

        var p = new RomanNumeralsParser('DCCCCCCCCCCCCCCCCCCCCCCCCCC');
        console.log(p.parse());


        return 0;
    }
}

Main.Start();

