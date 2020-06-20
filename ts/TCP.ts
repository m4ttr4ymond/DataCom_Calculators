/*
@author:    Matt Raymond
@date:      06/06/2020
@update_history:
    06/06/2020: Started/Finished
    06/11/2020: Changed function arguments and return types
    06/20/2020: Added "dup" to the arguments for "dupAckResponse"
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
    abstract dupAckResponse(res:TcpSnapshot[], dup:number):TcpSnapshot[];
    abstract fine(res:TcpSnapshot[]):TcpSnapshot[];
}
