/*
@author:    Matt Raymond
@date:      06/06/2020
@version:   1.0.0
@purpose:   Production
*/

import {Mathy, Units} from './Mathy'
import {TCP} from './TCP'
import {TcpSnapshot} from './TcpSnapshot'
import {TcpInput, TcpEvent} from './TcpInput'

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
    events: {[id:number]:TcpInput};

    constructor(init: TcpSnapshot, e:[TcpInput]) {
        super();
        this.currentState = init;

        this.events = {};
        e.forEach(x => {this.events[x.timeStamp] = x});
    }

    runSim(no:number = 5):TcpSnapshot[] {
        let states:TcpSnapshot[] = [];
        for (let t = 0; t < no; t++) {
            this.calcNewValues(this.currentState, this.events[t])
                .forEach(x => {states.push(x)});
            this.currentState = states[states.length-1];
        }
        console.log(states);
        return states;
    }

    calcNewValues(c:TcpSnapshot, e:TcpInput):TcpSnapshot[] {
        let res:TcpSnapshot[] = [new TcpSnapshot()];

        if(e !== undefined) {
            res[0].timeStamp = c.timeStamp;
            if(e.event == TcpEvent.timeout || e.event == TcpEvent.tdACK) {
                res[0].ssThresh = Math.floor(c.cwnd/2);
                res[0].cwnd = 1;
                res[0].state = 'ss';
                res.push(new TcpSnapshot());
                c = res[0];
            } else throw new Error("invalid TCP event");
        }

        res[res.length-1].timeStamp = c.timeStamp+1;
        res[res.length-1].ssThresh = c.ssThresh;

        switch (c.state) {
            case 'ss':
                if(c.cwnd*2 > c.ssThresh) res[res.length-1].cwnd = c.ssThresh;
                else res[res.length-1].cwnd = c.cwnd*2;
                break;
            case 'ca':
                res[res.length-1].cwnd = c.cwnd+1;
                break;
            default:
                throw new Error("invalid TCP state");
                break;
        }

        if(res[res.length-1].cwnd >= res[res.length-1].ssThresh)
            res[res.length-1].state = 'ca'; // collision avoidance
        else
            res[res.length-1].state = 'ss'; // Slow start

        return res;
    }

    timeoutResponse():void {

    }

    dupAckResponse():void {

    }

    fine():void {

    }

}
