import { SimpleParser } from "./simpleparser";

class Main{
    public static Start(): number {
        var parser = new SimpleParser();
        parser.scan();
        parser.parse();
        return 0;
    }
}

Main.Start();

