/*
@author:    Matt Raymond
@date:      05/31/2020
@version:   1.0.0
@purpose:   Production
*/

import {Mathy} from './Mathy'

/*
PURPOSE:    Computes the subnet address and broadcast address given an ip
            address and a subnet mask
*/
export class Subnet {

    /*
    PURPOSE:    Takes an ip address as a string and converts it into a number
                so that bitwise operations can be performed on it
    INPUT:      An IP address as a string (must include dots)
    OUTPUT:     A number that holds a 32-bit ip address
    */
    static castIP(ipAddress:string):number {
        // Splits the ip address on the period
        // "xxx.xxx.xxx.xxx" -> ["xxx", "xxx", "xxx", "xxx"]
        const sections: string[] = ipAddress.split(".");
        let converted:number = 0;

        // Goes through, converts each one to binary, shifts it to the right
        // position, and inserts it into the address
        for (let i = 3; i >= 0; i--)
            converted = converted | ((parseInt(sections[3-i], 10) << (8*i)));

        // Returns the coputer address
        return converted
    }

    /*
    PURPOSE:    Converts the 32-bit number representation of the ip address
                into a string representation
    INPUT:      An ip address as a number
    OUTPUT:     A string representation of the ip address
    */
    static toString(ipAddress:number):string {
        // If the number is too big, throw an error
        if(ipAddress > 4294967295)
            throw new Error(`${ipAddress} is not a valid ip address`);

        // String to add to
        let res: string = "";
        // Mask to get 8 bits of the number at a time
        const mask: number = 0b11111111;

        // Goes through the number, grabs eight bits, converts them to a string,
        // and adds that string to the final output string
        for (let i = 0; i < 4; i++)
            res = ((ipAddress >> (8*i)) & mask).toString() + "." + res;

        // Removes the extra period at the end
        return res.substring(0, res.length-1)
    }

    /*
    PURPOSE:    Calculates the network address of a subnet
    INPUT:      An ip address and subnet mask as numbers
    OUTPUT:     A number for the network address
    */
    static getNetworkAddress(ipAddress:number, mask:number):number {
        return ipAddress & mask;
    }

    /*
    PURPOSE:    Calculates the broadcast address of a subnet
    INPUT:      An ip address and subnet mask as numbers
    OUTPUT:     A number for the broadcast address
    */
    static getBroadcastAddress(ipAddress:number, mask:number):number {
        return this.getNetworkAddress(ipAddress, mask) | (~mask);
    }

    /*
    PURPOSE:    Calculates the network address and broadcast address of a
                subnet from an ip address and a subnet mask
    INPUT:      An ip address and a subnet mask as strings
    OUTPUT:     A tuple containing the netwrok address and broadcast address
    */
    static getSubnetInfo(ipAddress:string, mask:string):string[] {
        // Cast strings to numbers
        const ipConv:number = this.castIP(ipAddress);
        const maskConv:number = this.castIP(mask);

        // Get the values we're looking for
        const networkAddress = this.getNetworkAddress(ipConv, maskConv);
        const broadcastAddress = this.getBroadcastAddress(ipConv, maskConv);

        // Return them in a tuple
        return [this.toString(networkAddress), this.toString(broadcastAddress)]
    }
}
