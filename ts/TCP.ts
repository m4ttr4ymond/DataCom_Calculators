/*
@author:    Matt Raymond
@date:      06/06/2020
@version:   1.0.0
@purpose:   Production
*/

import {Mathy, Units} from './Mathy'
import {TcpSnapshot} from './TcpSnapshot'
import {TcpInput} from './TcpInput'


/*
PURPOSE:    General class for TCP
*/
export abstract class TCP {
    abstract currentState: TcpSnapshot;
    abstract events: {[id:number]:TcpInput};

    abstract runSim():TcpSnapshot[];
    abstract timeoutResponse(res:TcpSnapshot[]):TcpSnapshot[];
    abstract dupAckResponse(res:TcpSnapshot[]):TcpSnapshot[];
    abstract fine(res:TcpSnapshot[]):TcpSnapshot[];
}
