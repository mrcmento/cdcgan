//used to create gaussian numbers
export default function(samples) {
    let nums = []
    for(let i = 0; i<samples; i++) {
        var u = 0, v = 0;
        while(u === 0) u = Math.random();
        while(v === 0) v = Math.random();
        nums.push(Math.sqrt( -2.0 * Math.log( u ) ) * Math.cos( 2.0 * Math.PI * v ))
    }
    return nums
}