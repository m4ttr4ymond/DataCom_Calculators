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
    state: number;
    timeStamp: number;
}
