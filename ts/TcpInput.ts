/*
@author:    Matt Raymond
@date:      06/06/2020
@version:   1.0.0
@purpose:   Production
*/

import {Mathy, Units} from './Mathy'

// for now, assuming that a timeout means that all packets were dropped
export class TcpInput {
    event: TcpEvent;
    timeStamp: number;

    constructor(e:TcpEvent, t:number) {
        this.event = e;
        this.timeStamp = t;
    }
}

export enum TcpEvent {
    timeout,
    tdACK,
    newACK
}

export enum TcpState {
    SlowStart = "ss",
    CongestionAvoidance = "ca",
    FastRecovery = "fr"
}
