import {Mathy} from './Mathy'

export class Crc {
    static genCodeword(dw:string, gen:string):string {
        var dataword:number = Mathy.parseBin(dw);
        var generator:number = Mathy.parseBin(gen);

        var dividend:number = this.genDividend(dataword, generator);
        var syndrome:number = this.genSyndrome(generator, dividend);

        return Mathy.bin((dataword << (Mathy.log_2(generator)-1)) | syndrome, (dw.length+gen.length-1));
    }

    static genSyndrome(generator:number, dividend:number):number {
        var lenDvd:number = Mathy.log_2(dividend);
        var lenGen:number = Mathy.log_2(generator);

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

// export {Crc}
