//从前端服务器获取后端服务器地址
let $url = "";
$.get('serverconfig.json', function (responseText, textStatus, XMLHttpRequest) {
    $url = responseText.protocol + responseText.domain + responseText.port + responseText.context;
    sessionStorage.setItem('url',JSON.stringify($url))
});