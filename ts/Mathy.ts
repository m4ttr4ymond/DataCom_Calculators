/*
@author:    Matt Raymond
@date:      05/30/2020
@version:   1.0.0
@purpose:   Production
*/

/*
PURPOSE:    Holds some of the functions that are going to be used in multiple
            classes
*/
export class Mathy {

    /*
    PURPOSE:    Finds the log base 2 of a number (only works on integers)
    INPUT:      A number
    OUTPUT:     The result of the operation
    */
    static log_2(x:number):number {
        // If number is not greater than zero or an int
        if(x < 0 || x%1 !== 0) throw new Error(`Cannot take a log of ${x}`);

        // Find how many bits it takes to represent the number
        let res:number = 1;
        while(x = (x>>1)) res+=1;

        return res;
    }

    /*
    PURPOSE:    Returns a binary representation of the number
    INPUT:      A number to convert and a number representing how much padding
                to put on the left
    OUTPUT:     A string representation of the binary number
    */
    static bin(num:number, p:number = 0):string{
        return (num >>> 0).toString(2).padStart(p, '0');
    }

    /*
    PURPOSE:    Converts a string into a binary number
    INPUT:      A string representation of a number
    OUTPUT:     A number
    */
    static parseBin(num:string):number {
        return parseInt(num, 2);
    }
}
