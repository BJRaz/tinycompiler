import { SimpleParser } from "./simpleparser";

class Main{
    public static Start(): number {
        let input = "1 liter øl\n1 kg kaffe\n800 gram mel\n4 l guldkorn";
        var parser = new SimpleParser(input);
        parser.scan();
        parser.parse();
        return 0;
    }
}

Main.Start();

