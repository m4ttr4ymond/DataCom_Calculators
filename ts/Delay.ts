/*
@author:    Matt Raymond
@date:      06/05/2020
@version:   1.0.0
@purpose:   Production
*/

import {Mathy, Units} from './Mathy'


/*
PURPOSE:    Calculates the maximum data rate of a medium
*/
export class Delay {
    /*
    PURPOSE:    Calculates transmission delay
    INPUT:      The number or bits being sent and the transmission rate of the
                interface/device sending them
    OUTPUT:     The transmission delay
    */
    static tDelay(noBits:[number, Units], tRate:[number, Units]):[number, Units] {
        if(tRate[0] === 0) throw new Error("Rate cannot be zero");
        return [Mathy.r(noBits) / Mathy.r(tRate), Units.second];
    }

    /*
    PURPOSE:    Calculates propagation delay
    INPUT:      The distance the data will be sent and the speed that data
                travels through the given medium
    OUTPUT:     The propagation delay
    */
    static pDelay(distance:[number, Units], pSpeed: [number, Units]):[number, Units] {
        if(pSpeed[0] === 0) throw new Error("Speed cannot be zero");
        return [Mathy.r(distance) / Mathy.r(pSpeed), Units.second];
    }

    /*
    PURPOSE:    Calculates Round Trip Time
    INPUT:      The distance the data will be sent and the speed that data
                travels through the given medium
    OUTPUT:     The RTT
    */
    static rtt(distance:[number, Units], pSpeed: [number, Units]):[number, Units] {
        return [2 * Mathy.r(this.pDelay(distance, pSpeed)), Units.second];
    }

    /*
    PURPOSE:    Computes the Bandwidth Delay Product
    INPUT:      The bandwidth, the distance being traveled, and the propagation
                speed
    OUTPUT:     The BDP
    */
    static bdp(bandwidth: [number, Units], distance:[number, Units], pSpeed: [number, Units]):[number, Units] {
        return [Mathy.r(bandwidth) * Mathy.r(this.rtt(distance, pSpeed)), Units.bit];
    }
}
