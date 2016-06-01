$( document ).ready(function()
{
    /* =====================================
    * 這個區塊是在做折扣代碼的驗證與刷新後仍自動激活
    * */
    var coupon_code = getCookie('coupon_code');

    if(coupon_code != ""){

        var URLs="get_coupon_code.php";
        $.ajax({
            url: URLs,
            data: "coupon="+coupon_code,
            type: "POST",
            dataType:'text',
            success: function(msg){

                if(msg == "FALSE"){
                    unsetCookie('coupon_code');
                    unsetCookie('coupon_discount');

                    $("#coupon_alert").html("這個折扣代碼已達使用次數上限或是過期囉！");
                    $("#coupon_alert").show();
                    $("#coupon_success").hide();
                    $("#btn_coupon_submit").attr("disabled",false);

                }else{

                    $("#coupon_success").html("折扣代碼使用中！");
                    $("#coupon_success").show();
                    $("#coupon_alert").hide();

                    setCookie("coupon_code", coupon_code, 1);
                    setCookie("coupon_discount", msg, 1);

                    $("#coupon_alert").html("");
                    $("#paypal_express_coupon_code").val(coupon_code);
                    $("#input_coupon_code").val(coupon_code);

                    $("#h4_coupon_discount").toggle();
                    if(msg > 1){
                        $("#coupon_discount").html("-NT$ "+msg);
                    }else{
                        var temp = msg*100;
                        var discount = 0;
                        if(temp%10==0)discount = msg * 10; else discount = msg * 100;
                        $("#coupon_discount").html((discount)+"折");
                    }
                    setTimeout(function(){ $("#coupon_Modal").modal("hide"); }, 700);
                }

                fee_counter();
            },
            error:function(xhr, ajaxOptions, thrownError){
                console.log(xhr.status);
                console.log(thrownError);
                unsetCookie('coupon_code');
                unsetCookie('coupon_discount');
                $("#coupon_alert").html("這個折扣代碼已達使用次數上限或是過期囉！");
                $("#coupon_alert").show();
                $("#coupon_success").hide();
            }

        });
    }

    /* =====================================
     * 這個區塊是在做每個使用者欄位的驗證
     * */

    var instance = $('#customer_form').parsley();

    $( "input[type=checkbox]" ).on( "click", function()
    {
        $("#div-tos").css('background-color',"#FFFFFF");
        $("#div-tos").css('border',"0px solid #EED3D7");
        $("#div-tos").css('padding-left',"0px");
    } );




    /* =============================================
     * 這個區塊是在因應貨運選項改變時，要重新計算費用
     * */

    //$("#shipping_option").change(function() {
    //    fee_counter();
    //});

    /* =============================================
     * 這個區塊是在因應付費方式改變時，要顯示對應的欄位與重新計算費用
     * */

    //$("#payment_option").change(function() {
    //    if(($(this).val()==2)){
    //        $("#last5_div").show();
    //        $("#info_div").show();
    //        $("#last5_input").attr('required','required');
    //    }else{
    //        $("#last5_div").hide();
    //        $("#info_div").hide();
    //        $("#last5_input").removeAttr('required');
    //    }
    //    fee_counter();
    //});





    /* =============================================
     * 這個區塊是讀取cookie後，自動恢復地址，以及當使用者輸入完畢時自動記憶貨運地址
     * */

    $("#shipping_address").val(getCookie("shipping_address")).blur(function() {
        setCookie("shipping_address", $(this).val(), 7);
    });

    /* =============================================
     * 這個區塊是讀取cookie後，自動恢復付費方式，以及當使用者輸入完畢時自動記憶付費方式
     * */

    $("#payment_option").val(getCookie("payment_option")).blur(function() {
        setCookie("payment_option", $(this).val(), 7);
    });

    /* =============================================
     * 這個區塊是自動恢復付費方式後，要變更的欄位與設定需要跟著調整
     * */

    if($("#payment_option").val()==2){
        $("#last5_div").show();
        $("#info_div").show();
        $("#last5_input").attr('required','required');
    }

    /* =============================================
     * 這個區塊是讀取cookie後，自動恢復內容，以及當使用者輸入完畢時自動記憶客戶名稱
     * */

    $("#full_name").val(getCookie("full_name")).blur(function() {
        setCookie("full_name", $(this).val(), 7);
    });

    /* =============================================
     * 這個區塊是讀取cookie後，自動恢復內容，以及當使用者輸入完畢時自動記憶客戶手機
     * */

    $("#phone_number").val(getCookie("phone_number")).blur(function() {
        setCookie("phone_number", $(this).val(), 7);
    });

    /* =============================================
     * 這個區塊是讀取cookie後，自動恢復內容，以及當使用者輸入完畢時自動記憶客戶信箱
     * */

    $("#email").val(getCookie("email")).blur(function() {
        setCookie("email", $(this).val(), 7);
    });

    /* =============================================
     * 這個區塊是讀取cookie後，自動恢復內容，以及當使用者輸入完畢時自動記憶地區選項
     * */

    if(getCookie("region_group") == 'TW'){
        $("#region_taiwan").attr("checked","TW");
        $("#twzipcode").show();
    }

    if(getCookie("region_group") == 'AS'){
        $("#region_other_asia_country").attr("checked","AS");
        $("#twzipcode").hide();
    }

    /* =============================================
     * 這個區塊是當折扣代碼的按鈕被按下，要跳出代碼填寫框
     * */

    $("#btn_coupon").click(function () {
        $("#coupon_Modal").modal("show");
    });

    /* =============================================
     * 這個區塊是當折扣代碼完成送出的按鈕被按下，要執行的事情
     * */

    $("#btn_coupon_submit").click(function () {

        if($("#input_coupon_code").val() == ""){
            $("#coupon_alert").html("請輸入折扣代碼！");

        }else{

            $(this).attr("disabled",true);

            var URLs="get_coupon_code.php";
            $.ajax({
                url: URLs,
                data: "coupon="+$("#input_coupon_code").val(),
                type: "POST",
                dataType:'text',
                success: function(msg){

                    if(msg == "FALSE"){
                        unsetCookie('coupon_code');
                        unsetCookie('coupon_discount');

                        $("#coupon_alert").html("這個折扣代碼已達使用次數上限或是過期囉！");
                        $("#coupon_alert").show();
                        $("#coupon_success").hide();
                        $("#h4_coupon_discount").toggle();
                        $("#coupon_discount").html("");
                        $("#btn_coupon_submit").attr("disabled",false);

                    }else{
                        $("#coupon_success").html("折扣代碼使用中！");
                        $("#coupon_success").show();
                        $("#coupon_alert").hide();
                        setCookie("coupon_code", $("#input_coupon_code").val(), 1);
                        setCookie("coupon_discount", msg, 1);
                        $("#coupon_alert").html("");
                        $("#paypal_express_coupon_code").val($("#input_coupon_code").val());

                        $("#h4_coupon_discount").toggle();
                        if(msg > 1){
                            $("#coupon_discount").html("-NT$ "+msg);
                        }else{
                            var temp = msg*100;
                            var discount = 0;
                            if(temp%10==0)discount = msg * 10; else discount = msg * 100;
                            $("#coupon_discount").html((discount)+"折");
                        }
                        setTimeout(function(){ $("#coupon_Modal").modal("hide"); }, 700);
                    }

                    fee_counter();
                },
                error:function(xhr, ajaxOptions, thrownError){
                    console.log(xhr.status);
                    console.log(thrownError);
                    unsetCookie('coupon_code');
                    unsetCookie('coupon_discount');
                    $("#coupon_alert").html("這個折扣代碼已達使用次數上限或是過期囉！");
                    $("#coupon_alert").show();
                    $("#coupon_success").hide();
                }

            });
        }
    });
});


