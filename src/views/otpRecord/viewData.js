let obj = {
    "path": [{
        "path": "otpRecord",
        "breadcrumbName": "OTP記錄查詢"
    }],
    "changeArr": [],
    "searchArr": [{
	    "title": "會員編號",
	    "type": "input",
	    "key": "accountCode",
	    size: 100,
	    width: "200px",	
	    "items": ""
	}, {
	    "title": "手機號碼",
	    "type": "input",
	    "key": "phone",
	    size: 100,
	    width: "200px",	
	    "items": ""
	}, {
	    "title": "E-mail",
	    "type": "input",
	    "key": "email",
	    size: 100,
	    width: "200px",	
	    "items": ""
	}, {
	    "title": "身份證字號",
	    "type": "input",
	    "key": "certificateNo",
	    size: 100,
	    width: "200px",	
	    "items": ""
	}, {
            "title": "所屬功能",
            "type": "select",
            "key": "operationInterface",
            width: "200px",
            "items": [{
                "name": "全部",
                "value": ''
            }, {
                "name": "登入",
                "value": 'login'
            }, {
                "name": "注冊",
                "value": '"register'
            },{
                "name": "會員資料更新",
                "value": '"update'
            },{
                "name": "投保資料確認",
                "value": '"confirm'
            }]
        },   
        {
          "title": "發送時間",
          "type": "rangeTime",
          "key": "DateRange",
        }
    ],



    "columns": [{
        "title": "會員編號",
        "dataIndex": "accountCode",
        "fixed": ""
    },{
        "title": "身份證字號",
        "dataIndex": "certificateNo",
        "fixed": ""
    },  {
        "title": "手機號碼",
        "dataIndex": "phone",
        "fixed": ""
    }, {
        "title": "E-mail",
        "dataIndex": "email",
        "fixed": ""
    }, {
        "title": "發送時間",
        "dataIndex": "sendTimeStr",
        "fixed": "",
       // align: 'right'
    }, {
        "title": "驗證時間",
        "dataIndex": "sessionTimeOutStr",
        "fixed": ""
    },{
        "title": "狀態",
        "dataIndex": "otpStatus",
        "fixed": ""
    },{
        "title": "錯誤原因",
        "dataIndex": "errorMsg",
        "fixed": ""
    },{
        "title": "所屬功能",
        "dataIndex": "operationInterfaceStr",
        "fixed": ""
    }, {
        "title": "訂單編號",
        "dataIndex": "orderNo",
        "fixed": ""
    }],
}
export default obj
