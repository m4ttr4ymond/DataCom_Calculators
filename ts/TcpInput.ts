/*
@author:    Matt Raymond
@date:      06/06/2020
@update_history:
    06/06/2020: Started
    06/20/2020: Added acks
@version:   1.0.0
@purpose:   Production
*/

import {Mathy, Units} from './Mathy'

/*
PURPOSE:    Holds data for events in simulation
*/
export class TcpInput {
    // The type of event that'd going to be taking place
    event: TcpEvent;
    // The time at thich the event takes place
    timeStamp: number;
    // The number of acks at that point (if duplicates)
    acks:number;

    /*
    PURPOSE:    Creates the TCPInput object
    INPUT:      A TCPEvent, a number for the timestamp, and a number for the
                amount of duplicate acks being recieved
    OUTPUT:     None
    */
    constructor(e:TcpEvent, t:number, a:number = null) {
        this.event = e;
        this.timeStamp = t;
        this.acks = a;
    }
}

// The type of TCP event being simulated
export enum TcpEvent {
    timeout, // Packet loss through a timeout
    dACK, // Duplicate ACK
    newACK // A new ACK after a series of no ACKs
}

// The current TCP state
export enum TcpState {
    SlowStart = "ss",
    CongestionAvoidance = "ca",
    FastRecovery = "fr"
}
