export class Mathy {

    // finds the log_2 of a number
    static log_2(x:number):number {
        // If number is not greater than zero or an int
        if(x < 0 || x%1 != 0) throw `Cannot take a log of ${x}`;

        var res:number = 1;
        while(x = (x>>1)) res+=1;
        return res;
    }

    // returns a binary representation of the number
    static bin(num:number, p:number = 0):string{
        return (num >>> 0).toString(2).padStart(p, '0');
    }

    static parseBin(num:string):number {
        return parseInt( num, 2 );
    }
}
