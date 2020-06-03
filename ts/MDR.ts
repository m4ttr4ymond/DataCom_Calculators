/*
@author:    Matt Raymond
@date:      05/31/2020
@version:   1.0.0
@purpose:   Production
*/

import {Mathy} from './Mathy'


/*
PURPOSE:    Calculates the maximum data rate of a medium
*/
export class MDR {
    /*
    PURPOSE:    Takes a dB level and calculates the S/N ratio
    INPUT:      A dB level as a number
    OUTPUT:     A number as the S/N ratio
    */
    static dBtoSN(dB:number):number {
        return 10 ** (dB/10);
    }

    /*
    PURPOSE:    Calculates the missing variable in Nyquist's theorem
    INPUT:      A frequency as a number, a number of values as a number, and a
                maximum data rate as a number
    OUTPUT:     A number that represents whatever was not passed
    */
    static Nyquist(frequency:number|undefined, noValues:number|undefined, mdr:number|undefined):number {
        // If they want to find the frequency
        if(typeof frequency === 'undefined' && typeof noValues === 'number' && typeof mdr === 'number') {
            return mdr / Math.log2(noValues) / 2;
        }
        // If they want to find the number of values
        else if(typeof frequency === 'number' && typeof noValues === 'undefined' && typeof mdr === 'number') {
            return 2 ** (mdr/(2 * frequency));
        }
        // If they want to find the maximum data rate
        else if(typeof frequency === 'number' && typeof noValues === 'number' && typeof mdr === 'undefined') {
            return 2 * frequency * Math.log2(noValues);
        }
        // If there are the wrong number of entered values
        else throw new Error('You entered the wrong number of arguments');
    }

    /*
    PURPOSE:    Calculates the missing variable in Shannon's theorem
    INPUT:      A frequency as a number, a number of values as a number, and a
                maximum data rate as a number
    OUTPUT:     A number that represents whatever was not passed
    */
    static Shannon(frequency:number|undefined, sn:number|undefined, mdr:number|undefined):number {
        // If they want to find the number of values
        if(typeof frequency === 'undefined' && typeof sn === 'number' && typeof mdr === 'number') {
            return mdr / Math.log2(1 + sn);
        }
        // If they want to find the frequency
        else if( typeof frequency === 'number' && typeof sn === 'undefined' && typeof mdr === 'number') {
            return 2 ** (mdr / frequency) - 1;
            // 2 ** (MDR/H)-1 = S/N
        }
        // If they want to find the maximum data rate
        else if(typeof frequency === 'number' && typeof sn === 'number' && typeof mdr === 'undefined') {
            return frequency * Math.log2(1 + sn);
        }
        // If there are the wrong number of entered values
        else throw new Error('You entered the wrong number of arguments');
    }
}
