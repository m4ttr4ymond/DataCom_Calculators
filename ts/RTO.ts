/*
@author:    Matt Raymond
@date:      06/20/2020
@version:   1.0.0
@purpose:   Production
*/

export function computeRTO(lst:number[], rtts:number = null):number[] {
    const alpha = 1/8;
    const output:number[] = [];

    if(rtts == null) {
        if(lst.length < 2)
            throw new Error("List must have at least two elements if no RTTm is provided");

        output.push(lst.shift());
    }
    else {
        if(lst.length < 1)
            throw new Error("List must have at least one elements");

        output.push(rtts);
    }

    for (const element of lst) {
        output.push((1-alpha)*output[output.length-1] + alpha*element);
    }

    return output;
}
