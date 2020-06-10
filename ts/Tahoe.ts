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
    // ToDo: This code is a little spaghetti and could stand to be updated
    calcNewValues(c:TcpSnapshot, e:TcpInput):TcpSnapshot[] {
        // Create a list of snapshots
        let res:TcpSnapshot[] = [new TcpSnapshot()];

        // If there is an event
        if(e !== undefined) {
            // If it's a valid event
            if(e.event == TcpEvent.timeout || e.event == TcpEvent.tdACK) {
                // Update the timestamp
                res[0].timeStamp = c.timeStamp;
                // Update the values as described in class
                res[0].ssThresh = Math.floor(c.cwnd/2);
                res[0].cwnd = 1;
                res[0].state = 'ss';

                // Add a new snapshot to the list
                res.push(new TcpSnapshot());
                // Redefine c to make the later code work
                c = res[0];
            } else throw new Error("invalid TCP event");
        }

        // Update the timestamp and ssThreshold
        res[res.length-1].timeStamp = c.timeStamp+1;
        res[res.length-1].ssThresh = c.ssThresh;

        // Based on the state
        switch (c.state) {
            // If Slow Start
            case 'ss':
                // Update the command window
                if(c.cwnd*2 > c.ssThresh)
                    res[res.length-1].cwnd = c.ssThresh;
                else
                    res[res.length-1].cwnd = c.cwnd*2;
                break;
            // If Collision Avoidance
            case 'ca':
                // Update the command window
                res[res.length-1].cwnd = c.cwnd+1;
                break;
            // If it's neither
            default:
                // Throw an error
                throw new Error("invalid TCP state");
                break;
        }

        // Update the value of the state
        if(res[res.length-1].cwnd >= res[res.length-1].ssThresh)
            res[res.length-1].state = 'ca'; // collision avoidance
        else
            res[res.length-1].state = 'ss'; // Slow start

        // Return the result
        return res;
    }
}
