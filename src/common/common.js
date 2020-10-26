import router from '../router'
import axios from 'axios'
import Vue from 'vue'
import mock from '../mock/Interface.js'
import moment from 'moment';
import Antd from 'ant-design-vue'
let vm = new Vue();
Vue.use(Antd)


// console.log(vm)
const toast = (value) => {
    vm.$message.error(value);
}
const alertAnt = (value) => {
        // Vue.$message.error(value);
        vm.$error({
            title: '提示',
            content: value
        });
    }
    // 实际调用后台地址
let http = '';
if (process.env.NODE_ENV !== 'development') {
    http = CONFIG.baseUrl
} else {
    http = '/api/';
}
// let http = CONFIG.baseUrl;

const headerGet = {
    "Content-Type": "application/json",
};

const headerPost = {
    "Content-Type": "application/x-www-form-urlencoded"
};

const Axios = function(url, tepData, type) {

    let data = tepData;

    let realUrl;
    let tokenObj = {};
    try {
        realUrl = mock[url].url;
        let token = localStorage.getItem('token');
        let setToken = () => {
            if (token) {
                tokenObj = {
                    // token: token
                    Authorization: token,
                };
            } else {
                router.push({
                    name: 'loginIn'
                });
                return
            }
        }
        mock[url].auth && setToken()
    } catch (e) {
        throw new Error('此接口未定义')
            // console.error('此接口未定义')
    }
    // console.info('%c 接口入参：' + url, 'background:#0e51ba;color:#fff')
    // console.log(tepData)
    return new Promise(function(resolve, reject) {
        axios({
                url: http + realUrl, //仅为示例，并非真实的接口地址
                data: tepData,
                params: mock[url].method == 'get' ? tepData : '',
                // header: method == 'get' ? headerGet : headerPost,
                header: headerGet,
                headers: tokenObj,
                method: mock[url].method
            })
            .then((res) => {
                // console.info('%c 接口返回：', 'background:#999999;color:#fff')
                // console.log(res)
                if (res.status == 200) {
                    if (res.data.code == 200) {
                        // console.info('%c 接口名称：' + url, 'background:#0e51ba;color:#fff')
                        // console.log(res.data)
                        // console.log(
                        //     '%c --------------------------------------------------   分割线   ----------------------------------------------',
                        //     'color: #0e51ba')
                        resolve(res)
                    } else if (res.data.code == '403') {
                        router.push({
                            name: 'loginIn'
                        });
                    } else {
                        // console.error(`接口名称 ${url} 接口错误码 ${res.data.code}`)
                        // console.error(`接口错误信息 ${res.data.message}`)
                        if (mock[url].confirm) {
                            alertAnt(res.data.message)
                        } else {
                            toast(res.data.message);
                        }
                        reject(res.data.message)
                    }
                } else {
                    // console.error(`接口错误码 ${res.data.code}`)
                    // console.error(`接口错误信息 ${res.statusCode}`)
                    toast(res.status);
                    reject(1)
                }
            })
            .catch((e) => {
                if  (e.response.status  !=  200)  {           return         }
                reject(1)
                toast(e);
            });
    })

}
let obj = {
    email: /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/,
    notChinese: /^[0-9a-zA-Z]{1,20}$/,
    onlyNumber: /^[a-zA-Z\u4e00-\u9fa5 ]{1,50}$/,
    Department: /^[a-zA-Z\u4e00-\u9fa5]{1,50}$/,
    name: /^[\u4e00-\u9fa5\\.\\,\\ ]{2,100}$|^[a-zA-Z\\.\\,\\ ]{4,200}$/,
    part: /^[\u4e00-\u9fa5\\.\\,\\ ]{1,25}$|^[a-zA-Z\\.\\,\\ ]{1,50}$/,
    // notChinese: /^[0-9a-zA-Z]{1,20}$/,
    phone: /^(09)[0-9]{8}$/,
    other1: /^[\u4e00-\u9fa5\\.\\,\\ ]{1,10}$|^[a-zA-Z0-9\\.\\,\\ ]{1,20}$/,
    other10: /^[\u4e00-\u9fa5\\.\\,\\ ]{1,10}$|^[a-zA-Z0-9\\.\\,\\ ]{1,20}$/,
    other20: /^[\u4e00-\u9fa5\\.\\,\\ ]{1,20}$|^[a-zA-Z0-9\\.\\,\\ ]{1,40}$/,
    other02: /^[1-9]\d{0,1}$/,
    number: /^([1-9]\d*|0)(\.\d{1,2})?$/,
    intPattern: /^0$|^[1-9]\d*$/,
    idNumA: /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/,
    idNumB: /^\d{7,}$/,
    idNumD: /^\d{8,}$/,
    idNumC: /^\d{10,18}$/,
    idNumE: /^[0-9a-zA-Z]{1,18}$/,
    bankNum: /^\d{16,19}$/,
    zipcode: /^\d{6}$/,
    benefitsLocation: /^[1-9]\d*$/,
    benefitsSort: /^[1-9]\d*$/,
    benefitsRate: /^0(\.\d{1,2})$|^1(\.[0]{1,2})?$/
}
const regTemplate = (value, reg, warn) => {
    // console.error(value, reg, warn)
    let regular = obj[reg];
    if (!regular.test(value)) {
        // toast(warn);
        return false;
    } else {
        return true
    }

}


// 延时函数
const timeout = async function(ms) {

    await new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}

// 缓存封装
const longData = (type, key, value) => {
    try {
        let obj = {
            0: () => {
                localStorage.setItem(key, JSON.stringify(value))
            },
            1: () => {

                return JSON.parse(localStorage.getItem(key))
            },
            2: () => {
                localStorage.removeItem(key)
            },

        }
        return obj[type]()
    } catch (e) {
        //TODO handle the exception
        return ''
    }

}

// form 表单提交
const formSubmmit = (url, param) => {
    let temp = document.createElement("form"); //创建form标签
    temp.action = url; //这里写URL
    temp.method = "post"; //post方式提交
    temp.style.display = "none"; //设置为不可见

    for (let k in param) {
        //创建input标签并设置相关参数
        let inputTemp = document.createElement("input");
        // inputTemp.setAttribute("type", "text");
        inputTemp.setAttribute("name", k);
        inputTemp.setAttribute("value", param[k]);
        temp.appendChild(inputTemp); //把input标签添加到form标签内
    }
    document.body.appendChild(temp); //将form标签添加到body标签内
    temp.submit(); //提交form
}

const formatmyyear = function formatmyyear(data, is) {
    if (data) {
        var date = new Date(data);
        var y = date.getFullYear();
        var m = date.getMonth() + 1;
        m = m < 10 ? '0' + m : m;
        var d = date.getDate();
        d = d < 10 ? '0' + d : d;
        var h = date.getHours();
        h = h < 10 ? '0' + h : h;
        var minute = date.getMinutes();
        minute = minute < 10 ? '0' + minute : minute;
        var mydate = y + '-' + m + '-' + d;
        return mydate;
    } else {
        return null;
    }
};
const getfilesize = function getfilesize(size) {
    if (!size)
        return "";

    var num = 1024.00; //byte

    if (size < num)
        return size + "B";
    if (size < Math.pow(num, 2))
        return (size / num).toFixed(2) + "K"; //kb
    if (size < Math.pow(num, 3))
        return (size / Math.pow(num, 2)).toFixed(2) + "M"; //M
    if (size < Math.pow(num, 4))
        return (size / Math.pow(num, 3)).toFixed(2) + "G"; //G
    return (size / Math.pow(num, 4)).toFixed(2) + "T"; //T
}
const dataURLtoFile = function dataURLtoFile(dataurl, filename) { //将base64转换为文件
    var arr = dataurl.split(','),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]),
        n = bstr.length,
        u8arr = new Uint8Array(n);
    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, {
        type: mime
    });
}
const compress = function compress(file) {
    return new Promise((resolve, reject) => {
        try {
            var windowURL = window.URL || window.webkitURL;
            var dataURL = windowURL.createObjectURL(file);
            // console.log(file);
            // console.log(getfilesize(file.size))
            var img = new Image();
            img.src = dataURL;
            var canvas = document.createElement('canvas');
            var ctx = canvas.getContext('2d')
            img.onload = function() {
                canvas.width = img.width;
                canvas.height = img.height;
                ctx.drawImage(img, 0, 0, img.width, img.height);
                var base64 = canvas.toDataURL('image/jpeg', 0.8);
                // console.log(base64)
                let filr = dataURLtoFile(base64, '99');
                // console.log(getfilesize(filr.size))
                // this.src = windowURL.createObjectURL(filr);
                resolve(filr)
            }
        } catch (e) {
            //TODO handle the exception;
            // console.log('压缩失败')
            resolve(file)
        }
    })
};

const debonce = (fn, delay, atOnce = false) => {
    let time = '';
    const layOut = (value) => {
        time = setTimeout(() => {
            fn(...value)
            time = ''
        }, delay)
    }
    return function() {
        // console.log(3333)
        if (!time) {
            if (atOnce) {
                fn(...arguments)
                time = 1
            } else {
                layOut(arguments)
            }
        } else {
            clearTimeout(time);
            layOut(arguments)
        }
    }
}

const Moment = (value, format) => {
    // console.log(value,format)
    if (!value) {
        return null
    } else {
        // console.log(moment(value, format))

        return moment(value, format)
    }

}
const tempetDownLoad = (url, tepData, fillName) => {
    function isIE() {
        if (!!window.ActiveXObject || "ActiveXObject" in window) {
            return true;
        } else {
            return false;
        }
    }


    function getTime(down) {
        var date = new Date();
        var y = date.getFullYear() - 1911;
        var m = date.getMonth() + 1;
        m = m < 10 ? '0' + m : m;
        var d = date.getDate();
        d = d < 10 ? '0' + d : d;
        var h = date.getHours();
        h = h < 10 ? '0' + h : h;
        var minute = date.getMinutes();
        minute = minute < 10 ? '0' + minute : minute;
        var seconds = date.getSeconds();
        seconds = seconds < 10 ? '0' + seconds : seconds;
        var mydate = `民國${y}年${m}月${d}日${h}時${minute}分${seconds}秒` //需要改為台灣的時間格式
        if (down === 1) {
            mydate = `_${y}${m}${d}${h}${minute}${seconds}`
        }
        return mydate
    }
    // 模板下载
    let config = {
        headers: {
            "Content-Type": "application/x-download;charset=utf-8"
        }
    };
    axios({
            method: "post",
            url: `${
http
}/${mock[url].url}`,
            data: tepData,
            headers: {
                Authorization: localStorage.getItem('token'),
            },
            // params: tepData,
            responseType: "blob"
        })
        .then(res => {
            var blob = new Blob([res.data]);
            // console.error(blob)
            if (isIE()) {
                window.navigator.msSaveOrOpenBlob(blob, `${fillName}${getTime(1)}.xls`);
            } else {
                var downloadElement = document.createElement("a");
                var href = window.URL.createObjectURL(blob); //创建下载的链接
                downloadElement.href = href;
                downloadElement.download = `${fillName}${getTime(1)}.xls`; //下载后文件名
                document.body.appendChild(downloadElement);
                downloadElement.click(); //点击下载
                document.body.removeChild(downloadElement); //下载完成移除元素
                window.URL.revokeObjectURL(href); //释放掉blob对象
            }
        })
        .catch(function(error) {
            // console.log(error);
        })
}
const changeDateStyle = (date) => {
    return date.split('/').join('-')
}
const changeDateStyleB = (date) => {
	let arr = date.split('/');
	let one = arr[0]*1 + 1911;
	 one  = one.toString();
	 arr[0] = one
    return arr.join('-')
}
const getDateStyle = (date) => {
	let arr = date.split('/');
	let one = arr[0]*1 - 1911;
	 one  = one.toString();
	 arr[0] = one
    return arr.join('/')
}

const getUrlParam = (name) => {
    var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)')
    let url = window.location.href.split('#')[0]
    let search = url.split('?')[1]
    if (search) {
        var r = search.substr(0).match(reg)
        if (r !== null) return unescape(r[2])
        return null
    } else {
        return null
    }
}
const getAge = (strBirthday) => {
    var returnAge;
    var strBirthdayArr = strBirthday.split("-");
    var birthYear = strBirthdayArr[0];
    var birthMonth = strBirthdayArr[1];
    var birthDay = strBirthdayArr[2];
    var d = new Date();
    var nowYear = d.getFullYear();
    var nowMonth = d.getMonth() + 1;
    var nowDay = d.getDate();
    if (nowYear == birthYear) {
        returnAge = 0; //同年 则为0岁  
    } else {
        var ageDiff = nowYear - birthYear; //年之差  
        if (ageDiff > 0) {
            if (nowMonth == birthMonth) {
                var dayDiff = nowDay - birthDay; //日之差  
                if (dayDiff < 0) {
                    returnAge = ageDiff - 1;
                } else {
                    returnAge = ageDiff;
                }
            } else {
                var monthDiff = nowMonth - birthMonth; //月之差  
                if (monthDiff < 0) {
                    returnAge = ageDiff - 1;
                } else {
                    returnAge = ageDiff;
                }
            }
        } else {
            returnAge = -1; //返回-1 表示出生日期输入错误 晚于今天  
        }
    }
    return returnAge; //返回周岁年龄  
}
const deepClone = function(data) {
    var type = typeof(data);
    var obj;
    if (type === 'array') {
        obj = [];
    } else if (type === 'object') {
        if (data === null) {
            obj = null;
        } else {
            obj = {}
        }
    } else {
        //不再具有下一层次
        return data;
    }
    if (type === 'array') {
        for (var i = 0, len = data.length; i < len; i++) {
            obj.push(deepClone(data[i]));
        }
    } else if (type === 'object') {
        for (var key in data) {
            obj[key] = deepClone(data[key]);
        }
    }
    return obj;
}
const TYPE_LIST = [{
        name: '输入框',
        value: 'input',
    },
    {
        name: '下拉框',
        value: 'select',
    },
    {
        name: '单选框',
        value: 'radio',
    },
    {
        name: '时间选择框',
        value: 'time',
    },
    {
        name: '范围时间选择框',
        value: 'rangeTime',
    },
    {
        name: '复选框',
        value: 'checkBox',
    },
]
const timeOperation = (type = 'year', value) => {
    let date = new Date()
    date.setFullYear(date.getFullYear() + value);
    return formatmyyear(date)
}
const codeHidden = (type, value) => {
    if (!value) return ''
    const REPLACECODE = 'O'
    let obj = {
        name: () => {
            value = value.replace(/\s*/g, "")
            let isChinesse = escape(value).indexOf("%u") < 0 ? false : true;
            // 中文处理
            if (isChinesse) {
                let length = value.length;
                if (length == 2) {
                    value = REPLACECODE + value[1]
                } else if (length == 3) {
                    value = value[0] + REPLACECODE + value[2]
                } else if (length > 3) {
                    value = value.substring(0, 2) + [...value.substring(2)].map((item, index) => {
                        return index % 2 == 0 ? REPLACECODE : item
                    }).join('')
                }
            } else {
                // english
                value = [...value].map((item, index) => {
                    return index % 2 != 0 ? '*' : item
                }).join('')
            }
            return value
        },
        address: () => {
            return value.replace(/\d/g, REPLACECODE)
        },
        idCard: () => {
            return value.substring(0, 2) + '*****' + value.substring(7)
        },
        bankCard: () => {
            return value.substring(0, 6) + '****' + value.substring(10, 12) + '*' + value.substring(13, 14) + (value.length == 15 ? '*' : '**')
        },
        email: () => {
            let index = value.indexOf('@');
            return value.substring(0, index - 5) + '***' + value.substring(index - 2)
        },
        birthday: () => {
            let index = value.lastIndexOf('/') == -1 ? value.lastIndexOf('-') : value.lastIndexOf('/');
            return value.substring(0, index + 1) + '**'
        },
        phone: () => {
            value = value.replace(/\s*/g, "")
            return value.substring(0, 2) == '09' ? (value.substring(0, 3) + '***' + value.substring(6)) : (value.substring(
                0, 2) + '***' + value.substring(5))
        },
    }
    return obj[type]()

}
export {
    timeout,
    changeDateStyle,
	changeDateStyleB,
	getDateStyle,
    Axios,
    regTemplate,
    longData,
    formSubmmit,
    formatmyyear,
    compress,
    getfilesize,
    debonce,
    getUrlParam,
    getAge,
    deepClone,
    Moment,
    TYPE_LIST,
    tempetDownLoad,
    timeOperation,
    codeHidden
}