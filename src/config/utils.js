export const getQueryString = function (location,name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = location.match(reg);
    if (r != null) return unescape(r[2]);
    return null;
}