/*
@author:    Matt Raymond
@date:      06/06/2020
@version:   1.0.0
@purpose:   Production
*/

import {Mathy, Units} from './Mathy'


/*
PURPOSE:    General class for TCP
*/
export class TcpSnapshot {
    ssThresh: number;
    cwnd: number;
    state: string;
    timeStamp: number;

    constructor(sst:number = 16, c:number = 1, s:string = 'ss', ts:number = 0) {
        this.ssThresh = sst;
        this.cwnd = c;
        this.state = s;
        this.timeStamp = ts;
    }

    copy(ts:TcpSnapshot):TcpSnapshot {
        this.ssThresh = ts.ssThresh;
        this.cwnd = ts.cwnd;
        this.state = ts.state;
        this.timeStamp = ts.timeStamp;

        return this;
    }
}
