<?php
header("Access-Control-Allow-Origin:*");
$getUrl=$_GET['value'];
$getValue="https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su?json=1&wd={$getUrl}&cb=";
$data = iconv('gbk','utf-8',file_get_contents($getValue));
// echo json_encode($data);
// echo $data;
// var_dump(json_encode(rtrim(ltrim($data,"("),");")));
echo rtrim(ltrim($data,"("),");");
?>
