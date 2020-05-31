import {Mathy} from './Mathy'

export class Crc {
    static genCodeword(dw:string, gen:string):string {
        const dataword:number = Mathy.parseBin(dw);
        const generator:number = Mathy.parseBin(gen);

        const dividend:number = this.genDividend(dataword, generator);
        const syndrome:number = this.genSyndrome(generator, dividend);

        return Mathy.bin((dataword << (Mathy.log_2(generator)-1)) | syndrome, (dw.length+gen.length-1));
    }

    static genSyndrome(generator:number, dividend:number):number {
        const lenDvd:number = Mathy.log_2(dividend);
        const lenGen:number = Mathy.log_2(generator);

        for (let i = lenDvd-lenGen; i >= 0; --i) {
            // Finds how much to multiply by
            if ((1<<(i+lenGen-1)) & dividend)
                dividend = dividend ^ (generator<<i);
        }

        // dividend is now the syndrome
        return dividend;
    }

    // Generates the dividend
    static genDividend(dataword:number, generator:number):number {
        return dataword << (Mathy.log_2(generator)-1);
    }
}
