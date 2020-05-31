import {Mathy} from './Mathy'

export class Subnet {
    static castIP(ipAddress:string):number {
        const sections: string[] = ipAddress.split(".").reverse();
        let converted:number = 0;

        for (let i = 0; i < sections.length; i++)
            converted = converted | ((parseInt(sections[i], 10) << (8*i)));

        return converted
    }

    static toString(ipAddress:number):string {
        // If the number is too big
        if(ipAddress > 4294967295) throw new Error(`${ipAddress} is not a valid ip address`);

        let res: string = "";
        const mask: number = 0b11111111;

        for (let i = 0; i < 4; i++) {
            res = ((ipAddress >> (8*i)) & mask).toString() + "." + res;
        }

        return res.substring(0, res.length-1)
    }

    static getNetworkAddress(ipAddress:number, mask:number):number {
        return ipAddress & mask;
    }

    static getBroadcastAddress(ipAddress:number, mask:number):number {
        return this.getNetworkAddress(ipAddress, mask) | (~mask);
    }

    static getSubnetInfo(ipAddress:string, mask:string):string[] {
        const ipConv:number = this.castIP(ipAddress);
        const maskConv:number = this.castIP(mask);

        const networkAddress = this.getNetworkAddress(ipConv, maskConv);
        const broadcastAddress = this.getBroadcastAddress(ipConv, maskConv);

        return [this.toString(networkAddress), this.toString(broadcastAddress)]
    }
}
