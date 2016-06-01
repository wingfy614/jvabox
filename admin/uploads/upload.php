<?php
include "mysqli.php";

if (!empty($_FILES))
{
    $file_name = $_FILES['file']['name']; //取得檔名
    $file_size = number_format(($_FILES['file']['size'] / 1024), 1, '.', ''); //取得檔案大小
    $allowSubName = "jpeg,jpg,png,gif,JPEG,JPG,PNG,GIF";    //允許檔案格式
    $allowMaxSize = 1024000; //允許上傳大小 (KB)
    $upFloder = "";    //目標資料夾
    $file_path = "uploads/";

    $subn_array = explode(",", $allowSubName);//分割允許上傳副檔名

    $checkSubName = "";
    $checkSize = "";
    $checkmsg = "";
    $checkRepeat = "";

    $fn_array = explode(".", $file_name);//分割檔名
    $mainName = $fn_array[0];//檔名
    $subName = substr($file_name, strrpos($file_name,".")+1); //副檔名

    //判斷檔案格式
    foreach ($subn_array as $index => $value) {
        if ($subName == $value) {
            $checkSubName = "ok";
            break;
        } else {
            $checkSubName = "格式不符:" . $subName;
        }
    }

    //判斷上傳檔案
    if ($file_size <= $allowMaxSize){
        $checkSize = "ok";
    } else {
        $checkSize = "圖片太大囉";
    }
    if ($checkSize == "ok" && $checkSubName == "ok") {
        if ($upFloder != "") {
            $upload_dir = $upFloder . '/';
    }

        //檔案名稱hash處理
        $file_name = sprintf("%s.%s", strval(microtime(true)*10000).'_'.strval(rand(10000,99999)).'_'.strval(rand(10000,99999)), $subName);
        $upload_file = $upload_dir . basename($file_name);

        //檔名重覆處理
        $x = 1;
        while (file_exists($upload_file)) {
            $checkRepeat = " (檔案名稱重複，附加辨識數字)";
            $file_name = sprintf("%s_%d.%s", $mainName, $x++, $subName);//組合檔名
            $upload_file = $upload_dir . basename($file_name);
        }
        $temploadfile = $_FILES['file']['tmp_name'];
        $result = move_uploaded_file($temploadfile, $upload_file);
    } else {
        $checkmsg = sprintf("1.檔案格式：%s<br>2.檔案大小：%s", $checkSubName, $checkSize);
    }
    if (isset($result))//判斷上傳結果
    {
        echo "OK";
        $table = "product_image";
//        $data_array['image_product_id'] = $file_name;
        $data_array['image_url'] = $file_path.$file_name;
        $data_array['image_product_id'] = $_POST['image_product_id'];

        insert(DATABASE, $table, $data_array);
        $data_array = null;
    } else {
        echo $checkmsg;
    }
}
