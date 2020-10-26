let obj = {
	"path": [{
		"path": "behaviorRecord",
		"breadcrumbName": "客戶行為記錄查詢"
	}],
	"searchArr": [{
		"title": "通路名稱",
		"type": "select",
		"key": "channelCode",
		width: "200px",
		"items": ''
	}, {
		"title": "Media Code",
		"type": "input",
		"key": "mediaCode",
		size: 10,
		"items": ""
	}, {
		"title": "階段代碼",
		"type": "select",
		"key": "operationCode",
		"items": [{
			"name": "全部",
			"value": ''
		}, {
			"name": "僅註冊/登入",
			"value": '10'
		}, {
			"name": "投保成功",
			"value": '11'
		}, {
			"name": "投保未成功-可再次投保",
			"value": '12'
		}, {
			"name": "投保未成功-不可繼續投保",
			"value": '13'
		}, {
			"name": "投保失敗",
			"value": '14'
		}, {
			"name": "投保跳出",
			"value": '15'
		}]
	},{
		"title": "資料建立日期",
		"type": "rangeTime",
		"key": "DateRange",
		
	},{
		"title": "商品名稱",
		"type": "input",
		"key": "goodsName",
		size: 10,
		"items": ""
	}],
	"columns": [{
		"title": "會員編號",
		"dataIndex": "accountCode",
		"fixed": ""
	}, {
		"title": "姓名",
		"dataIndex": "name",
		// width: 100,
		"fixed": ""
	}, {
		"title": "身份證字號",
		"dataIndex": "certificateNo",
		"fixed": ""
	}, {
		"title": "生日",
		"dataIndex": "birthday",
		"fixed": ""
	}, {
		"title": "手機",
		"dataIndex": "phone",
		"fixed": ""
	}, {
		"title": "E-mail",
		"dataIndex": "email",
		"fixed": ""
	}, {
		"title": "推薦人會員編號",
		"dataIndex": "referrerCode",
		"fixed": ""
	}, {
		"title": "通路名稱",
		"dataIndex": "channelName",
		"fixed": ""
	}, {
		"title": "Media Code",
		"dataIndex": "mediaCode",
		"fixed": ""
	}, {
		"title": "異動日期",
		"dataIndex": "updateTimeStr",
		"fixed": ""
	}, {
		title: "審核狀態",
		"dataIndex": "auditorStatusStr",
		"fixed": "",
		// scopedSlots: {
		// 	customRender: "other"
		// }
	}, {
		title: "操作",
		key: "operation",
		"fixed": "right",
		width: 200,
		align: 'right',
		scopedSlots: {
			customRender: "operation"
		}
	}],
	"columnsOther": [{
		"title": "姓名",
		"dataIndex": "name",
		"fixed": ""
	}, {
		"title": "身份證字號",
		"dataIndex": "certificateNo",
		"fixed": ""
	}, {
		"title": "生日",
		"dataIndex": "birthday",
		scopedSlots: {
			customRender: 'other'
		},
		"fixed": ""
	}, {
		"title": "手機",
		"dataIndex": "phone",
		scopedSlots: {
			customRender: 'other'
		},
		"fixed": ""
	}, {
		"title": "E-mail ",
		"dataIndex": "email",
		scopedSlots: {
			customRender: 'other'
		},
		"fixed": ""
	}, {
		"title": "推薦人會員編號",
		"dataIndex": "referrerCode",
		scopedSlots: {
			customRender: 'other'
		},
		"fixed": ""
	}, {
		"title": "狀態",
		"dataIndex": "status",
		scopedSlots: {
			customRender: 'other'
		},
		"fixed": ""
	}, {
		title: "異動時間/異動人員帳號",
		key: "others",
		"fixed": "",
		scopedSlots: {
			customRender: "others"
		}
	}, {
		title: "審核時間/審核人帳號",
		key: "operation",
		"fixed": "right",
		scopedSlots: {
			customRender: "operation"
		}
	}]
}
export default obj
