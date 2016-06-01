function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    if(exdays == "")exdays = 5;
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + "; " + expires;
    //console.log(document.cookie );
}

function addOne( cname ){
    //console.log( cname + '+ 1');
    addQty( cname, 1);
}

function minusOne( cname ){
    minusQty( cname, 1);
}

function addQty( cname, amount, exdays){
    if(isNaN(parseInt(getCookie(cname)))){
        var ori = 0;
    }else{
        var ori = parseInt(getCookie(cname));
    }

    var qty = ori + parseInt(amount);
    setCookie(cname, qty, exdays);
}

function minusQty( cname, amount, exdays){
    var qty = parseInt(getCookie(cname)) - amount;
    if(qty < 0)qty = 0;
    setCookie(cname, qty, exdays);
}

function unsetCookie( cname ) {
    document.cookie = cname + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}


function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1);
        if (c.indexOf(name) == 0){
            //console.log(c.substring(cname + ': ' +name.length,c.length));
            return c.substring(name.length,c.length);
        }
    }
    return "";
}

