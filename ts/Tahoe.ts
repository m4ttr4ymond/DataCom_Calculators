/*
@author:    Matt Raymond
@date:      06/06/2020
@updated:   06/10/2020
@version:   1.0.0
@purpose:   Production
*/

import {Mathy, Units} from './Mathy'
import {TCP} from './TCP'
import {TcpSnapshot} from './TcpSnapshot'
import {TcpInput, TcpEvent} from './TcpInput'

/*
PURPOSE:    Performs calculations for TCP Tahoe
*/
export class Tahoe extends TCP {
    currentState: TcpSnapshot;

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
        let states:TcpSnapshot[] = [];
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
                    return this.generalResponse(res);
                case TcpEvent.tdACK:
                    return this.generalResponse(res);
                // Make sure that the response was valid
                default:
                    throw new Error("invalid TCP event");
            }
        }
        else return res;
    }

    /*
    PURPOSE:    Performs the Tahoe response for a timeout, calculates its TCP
                snapshot, and adds it to a list of TCP snapshots
    INPUT:      A list of TCP snapshots
    OUTPUT:     A list of TCP snapshots
    */
    timeoutResponse(res:TcpSnapshot[]):TcpSnapshot[] {
        return this.genErrorResponse(res);
    }

    /*
    PURPOSE:    Performs the Tahoe response for a duplicate ACK response,
                calculates its TCP snapshot, and adds it to a list of TCP
                snapshots
    INPUT:      A list of TCP snapshots
    OUTPUT:     A list of TCP snapshots
    */
    dupAckResponse(res:TcpSnapshot[]):TcpSnapshot[] {
        return this.genErrorResponse(res)
    }

    /*
    PURPOSE:    Tahoe uses the same response for both timeouts and triple-
                duplicate ACKs, so this provides a general response for the
                two
    INPUT:      A list of TCP snapshots
    OUTPUT:     A list of TCP snapshots
    */
    genErrorResponse(res:TcpSnapshot[]):TcpSnapshot[] {
        // Update the values as described in class
        res[0].ssThresh = Math.floor(res[0].cwnd/2);
        res[0].cwnd = 1;
        res[0].state = 'ss';

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

        // Perform an action based on the state
        if(res[0].state == 'ss') { // Slow Start
                // Update the command window
                if(res[0].cwnd*2 > res[0].ssThresh)
                    res[res.length-1].cwnd = res[0].ssThresh;
                else
                    res[res.length-1].cwnd = res[0].cwnd*2;
        }
        else if(res[0].state == 'ca') { //Collision Avoidance
            // Update the command window
            res[res.length-1].cwnd = res[0].cwnd+1;
        }
        else // Throw an error
            throw new Error("invalid TCP state");

        // Update the value of the state
        if(res[res.length-1].cwnd >= res[res.length-1].ssThresh)
            res[res.length-1].state = 'ca'; // collision avoidance
        else
            res[res.length-1].state = 'ss'; // Slow start

        return res;
    }
}
