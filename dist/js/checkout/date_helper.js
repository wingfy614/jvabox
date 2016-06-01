function getDateTime(date) {

    var yyyy = date.getFullYear().toString();
    var mm = (date.getMonth()+1).toString();
    var dd = date.getDate().toString();
    var hh = date.getHours().toString();
    var nn = date.getMinutes().toString();
    var ss = date.getSeconds().toString();

    return yyyy + '-' + (mm[1]?mm:"0"+mm[0]) + '-' + (dd[1]?dd:"0"+dd[0])+ ' '+ (hh[1]?hh:"0"+hh[0]) + ':'+ (nn[1]?nn:"0"+nn[0]) + ':'+ (ss[1]?ss:"0"+ss[0]);
}