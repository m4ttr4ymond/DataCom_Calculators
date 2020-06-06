/*
@author:    Matt Raymond
@date:      06/06/2020
@version:   1.0.0
@purpose:   Production
*/

import {Mathy, Units} from './Mathy'
import {TCP} from './TCP'
import {TcpSnapshot} from './TcpSnapshot'
import {TcpInput} from './TcpInput'

// export class TCP {
//     abstract currentState: tcpSnapshot;
//
//     abstract constructor(init: tcpSnapshot, events:[tcpEvent]):[tcpSnapshot];
//     abstract runSim():[tcpSnapshot]
//     abstract timeoutResponse():void;
//     abstract dupAckResponse():void;
//     abstract fine():void;
// }

export class Tahoe extends TCP {
    currentState: TcpSnapshot;

    constructor(init: TcpSnapshot, events:[TcpInput]) {
        super();
        this.currentState = init;
    }
}
