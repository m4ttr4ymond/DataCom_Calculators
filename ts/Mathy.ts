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

    /*
    PURPOSE:    Gets the tuple in its base units
    INPUT:      A tuple containing a constant and its unit
    OUTPUT:     A number
    */
    static r(pair:[number, Units]):number {
        return pair[0] * pair[1];
    }
}

export enum Units {
    // Data sizes and data rates
    bit         = 1,
    nibble      = 4,
    Byte        = 8,

    // Bits
    Kbit        = 1000 ** 1, // kilobit
    Mbit        = 1000 ** 2, // megabit
    Gbit        = 1000 ** 3, // gigabit
    Tbit        = 1000 ** 4, // terabit
    Kibit       = 1024 ** 1, // kibibit
    Mibit       = 1024 ** 2, // mebibit
    Gibit       = 1024 ** 3, // gibibit
    Tibit       = 1024 ** 4, // tebibit

    // Bytes
    KB          = 8 * 1000 ** 1, // kilobyte
    MB          = 8 * 1000 ** 2, // megabyte
    GB          = 8 * 1000 ** 3, // gigabyte
    TB          = 8 * 1000 ** 4, // terabyte
    KiB         = 8 * 1024 ** 1, // kibibyte
    MiB         = 8 * 1024 ** 2, // mebibyte
    GiB         = 8 * 1024 ** 3, // gibibyte
    TiB         = 8 * 1024 ** 4, // tebibyte

// Distance
    mm          = 10 ** -3,
    cm          = 10 ** -2,
    dm          = 10 ** -1,
    m           = 10 **  0,
    Dm          = 10 **  1,
    Hm          = 10 **  2,
    Km          = 10 **  3,
    lightYear   = 9460730000000000,

// Time
    second      = 1,
    minute      = 60,
    hour        = 3600,
    day         = 86400,
    year        = 31536000,
    decade      = 315360000,
    century     = 3153600000,
    millenium   = 31536000000,

// Frequency
    Hz          = 10 ** 0,
    MHz         = 10 ** 3,
    GHz         = 10 ** 6
}
