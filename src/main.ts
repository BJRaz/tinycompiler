import { RomanNumeralsParser, SimpleParser } from "./parsers";

class Main{
    public static Start(): number {
        const input = "1 liter øl\n1 kg kaffe\n800 gram mel\n4 kg guldkorn";
        const parser = new SimpleParser(input);
        parser.scan();
        parser.parse();

        const p = new RomanNumeralsParser('DCCCXIIIXXXXX');
        console.log(p.parse());


        return 0;
    }
}

Main.Start();

