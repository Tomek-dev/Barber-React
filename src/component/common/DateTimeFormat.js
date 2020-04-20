export function formatDate(date) {
    var format = new Date(date),
        month = '' + (format.getMonth() + 1),
        day = '' + format.getDate(),
        year = format.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [year, month, day].join('-');
}

export function formatDateTime(date){
    let format = new Date(date),
        hours = '' + (format.getHours()),
        minutes = '' + format.getMinutes(),
        seconds = '' + format.getSeconds();

    if(hours.length < 2) 
        hours = '0' + hours;
    if(minutes.length < 2) 
        minutes = '0' + minutes;
    if(seconds.length < 2) 
        seconds = '0' + seconds;
    return formatDate(date) + 'T' + hours + ':' + minutes + ':' + seconds+ '.0'
}