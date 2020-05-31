/*
@author:    Matt Raymond
@date:      05/30/2020
@version:   1.0.0
@purpose:   Production
*/

import {Mathy} from './Mathy'

/*
PURPOSE:    Performs CRC on a given dataword and generator
*/
export class Crc {

    /*
    PURPOSE:    Finds the CRC codeword
    INPUT:      A dataword as a string and a generator as a string
    OUTPUT:     A string representation of a codeword
    */
    static genCodeword(dw:string, gen:string):string {
        // Convert to numbers
        const dataword:number = Mathy.parseBin(dw);
        const generator:number = Mathy.parseBin(gen);

        // Find the values
        const dividend:number = this.genDividend(dataword, generator);
        const syndrome:number = this.genSyndrome(generator, dividend);

        // Combine them to get the codeword
        return Mathy.bin((dataword << (Mathy.log_2(generator)-1)) | syndrome, (dw.length+gen.length-1));
    }

    /*
    PURPOSE:    Finds the CRC syndrome
    INPUT:      A number for the generator and a number for the dividend
    OUTPUT:     A number as the syndrome
    */
    static genSyndrome(generator:number, dividend:number):number {
        // Find the lendth of each number
        const lenDvd:number = Mathy.log_2(dividend);
        const lenGen:number = Mathy.log_2(generator);

        // Performs division with xor subtraction
        for (let i = lenDvd-lenGen; i >= 0; --i) {
            // Xors dividend by the generator if the leftmost bit is not zero
            if ((1<<(i+lenGen-1)) & dividend)
                dividend = dividend ^ (generator<<i);
        }

        // dividend is now the syndrome
        return dividend;
    }

    // Generates the dividend
    /*
    PURPOSE:    Finds that the dividend should be
    INPUT:      A number for the dataword and a number for the generator
    OUTPUT:     A number for the dividend
    */
    static genDividend(dataword:number, generator:number):number {
        return dataword << (Mathy.log_2(generator)-1);
    }
}
