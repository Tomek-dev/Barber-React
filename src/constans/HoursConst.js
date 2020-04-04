export function hours(){
    let minutes= ['00', '15', '30', '45'];
    const array = [];
    let hour = 0;
    while(hour <= 23){
        minutes.forEach(minute => array.push(('0' + hour).slice(-2)+ ':' + minute))
        hour+=1;
    }
    return array;
}