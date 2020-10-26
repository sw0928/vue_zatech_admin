var CONFIG = {
    baseUrl: 'http://192.168.200.38/ecadmin/'
}
var locationAddress = window.location.hostname;
// console.log(locationAddress)

//http://tst-twaia.zaouter.com/这一个的话，把CONFIG.js里调用的地址写为http://tst-twaia.zaouter.com/aia/
if (locationAddress == 'tst-twaia-admin.zaouter.com') {
    CONFIG.baseUrl = 'https://tst-twaia-admin.zaouter.com/ecadmin/'
} else if (locationAddress == 'twakiulapp540.aia.biz') {
    CONFIG.baseUrl = 'https://twakiulapp540.aia.biz:8080/ecadmin/'
} else if (locationAddress == 'twakiulapp540') {
    CONFIG.baseUrl = 'https://twakiulapp540:8080/ecadmin/'
} else if (locationAddress == 'twakiulapp550.aia.biz') {
    CONFIG.baseUrl = 'https://twakiulapp550.aia.biz:8080/ecadmin/'
} else if (locationAddress == 'twakiulapp580.aia.biz') {
    CONFIG.baseUrl = 'https://twakiplapp580.aia.biz:8080/ecadmin/'
} else if (locationAddress == 'tst-twaia-backup-admin.zaouter.com') {
    CONFIG.baseUrl = 'https://tst-twaia-backup-admin.zaouter.com/ecadmin/'
}