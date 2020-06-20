/*
@author:    Matt Raymond
@date:      06/11/2020
@update_history:
    06/11/2020: Started
    06/20/2020: Fixed Fast Recovery
@version:   1.0.0
@purpose:   Production
*/

import {Mathy, Units} from './Mathy'
import {TCP} from './TCP'
import {TcpSnapshot} from './TcpSnapshot'
import {TcpInput, TcpEvent, TcpState} from './TcpInput'

/*
PURPOSE:    Performs calculations for TCP Tahoe
*/
export class Reno extends TCP {
    currentState: TcpSnapshot;
    // Allows for the exponential growth during fast recovery
    // We use the offset to boost the baseline of cwd
    offset:number = 0;

    // A list of events in the simulation
    events: {[id:number]:TcpInput};

    /*
    PURPOSE:    Creates the TCP object
    INPUT:      A snapshot of what TCP Tahoe will look like before the
                simulation, and a list of inputs for error events
    OUTPUT:     None
    */
    constructor(init: TcpSnapshot, e:[TcpInput]) {
        // Super constructor
        super();
        // Sets the initial state
        this.currentState = init;
        // Creates a dictionary of events to make lookups faster
        this.events = {};
        e.forEach(x => {this.events[x.timeStamp] = x});
    }

    /*
    PURPOSE:    Runs the simulation and outputs a state for every time quanta
    INPUT:      The number of time quanta to simulate over
    OUTPUT:     A list of states to be graphed
    */
    runSim(no:number = 5):TcpSnapshot[] {
        // Create a list of states
        let states:TcpSnapshot[] = [new TcpSnapshot().copy(this.currentState)];
        // Cycle through time quanta
        for (let t = 0; t < no; t++) {
            // Calculate the outputs for every event
            this.calcNewValues(this.currentState, this.events[t])
                // Save the results into the states list
                .forEach(x => {states.push(x)});
            // Set the current state based on the last status
            this.currentState = states[states.length-1];
        }
        return states;
    }

    /*
    PURPOSE:    Calculates the next state given the current state and an input
    INPUT:      A snapshot of the current state (abbreviated), and an event
                (may be undefined if there is no event at the given time)
    OUTPUT:     A list of events. This list has one element if everything is
                fine, or two if there is an error.
    */
    calcNewValues(c:TcpSnapshot, e:TcpInput):TcpSnapshot[] {
        // Create a list of snapshots
        let res:TcpSnapshot[] = [new TcpSnapshot().copy(c)];

        // Take care of event
        res = this.handleInput(res, e);

        // Perform the normal calculation
        return this.fine(res);
    }

    /*
    PURPOSE:    Responds to individual TCPInput inputs, executing the
                appropriate functions
    INPUT:      A list of TCP snapshots and a TCP input
    OUTPUT:     A list of TCP snapshots
    */
    handleInput(res:TcpSnapshot[], e:TcpInput):TcpSnapshot[] {
        // If there is an input
        if(e !== undefined) {
            switch (e.event) {
                // All reponses are the same in TCP Tahoe
                case TcpEvent.timeout:
                    return this.timeoutResponse(res);
                case TcpEvent.dACK:
                    return this.dupAckResponse(res, e.acks);
                case TcpEvent.newACK:
                    return this.newAckResponse(res);
                // Make sure that the response was valid
                default:
                    throw new Error("invalid TCP event");
            }
        }
        else return res;
    }

    /*
    PURPOSE:
    INPUT:      A list of TCP snapshots
    OUTPUT:     A list of TCP snapshots
    */
    timeoutResponse(res:TcpSnapshot[]):TcpSnapshot[] {
        // Update the values as described in class
        res[0].ssThresh = Math.floor(res[0].cwnd/2);
        res[0].cwnd = 1;
        res[0].state = TcpState.SlowStart;

        // Add a new snapshot to the list
        res.push(new TcpSnapshot());

        return res;
    }

    /*
    PURPOSE:
    INPUT:      A list of TCP snapshots, and a number of duplicate acks
    OUTPUT:     A list of TCP snapshots
    */
    dupAckResponse(res:TcpSnapshot[], dup:number):TcpSnapshot[] {
        if(dup === null)
            throw new Error("You cannot have a null number of duplicate AKCs");

        if(dup >= 3) {
            res[0].ssThresh = Math.floor(res[0].cwnd/2);
            this.offset = res[0].ssThresh + dup - 1;
            res[0].cwnd = this.offset + 1;
            res[0].state = TcpState.FastRecovery;

            // Add a new snapshot to the list
            res.push(new TcpSnapshot());
        }

        return res;
    }

    /*
    PURPOSE:
    INPUT:      A list of TCP snapshots
    OUTPUT:     A list of TCP snapshots
    */
    newAckResponse(res) {
        this.offset = 0;
        res[0].cwnd = res[0].ssThresh;
        res[0].state = TcpState.CongestionAvoidance;

        // Add a new snapshot to the list
        res.push(new TcpSnapshot());

        return res;
    }

    /*
    PURPOSE:    Performs the calculation for when everything goes fine in the
                TCP response
    INPUT:      A list of TCP snapshots
    OUTPUT:     A list of TCP snapshots
    */
    fine(res:TcpSnapshot[]):TcpSnapshot[] {
        // Update the timestamp and ssThreshold
        res[res.length-1].timeStamp = res[0].timeStamp+1;
        res[res.length-1].ssThresh = res[0].ssThresh;
        res[res.length-1].state = res[0].state;

        // Perform an action based on the state
        if(res[0].state == TcpState.SlowStart) {
                // Update the command window
                if(res[0].cwnd*2 > res[0].ssThresh)
                    res[res.length-1].cwnd = res[0].ssThresh;
                else
                    res[res.length-1].cwnd = res[0].cwnd*2;
        }
        else if(res[0].state == TcpState.CongestionAvoidance) {
            // Update the command window
            res[res.length-1].cwnd = res[0].cwnd+1;
        }
        else if(res[0].state == TcpState.FastRecovery) {
            res[res.length-1].cwnd = (res[0].cwnd-this.offset)*2 + this.offset;
        }
        else // Throw an error
            throw new Error("invalid TCP state");

        if(res[res.length-1].state !== TcpState.FastRecovery) {
            // Update the value of the state
            if(res[res.length-1].cwnd >= res[res.length-1].ssThresh)
                res[res.length-1].state = TcpState.CongestionAvoidance;
            else
                res[res.length-1].state = TcpState.SlowStart;
        }

        return res;
    }
}
