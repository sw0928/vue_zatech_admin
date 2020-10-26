let obj = {
    "path": [{
        "path": "bannerManage",
        "breadcrumbName": "廣告查询"
    }],
    "changeArr": [],
    "searchArr": [{

            "title": "通路名稱",
            "type": "select",
            "key": "channelCode",
            width: "200px",

            "items": ''
        },
        {
        
            "title": "所屬欄位",
            "type": "select",
            "key": "position",
            width: "200px",
        
            "items": [{
                "name": "首頁banner",
                "value": '001'
            }, {
                "name": "投保完成頁之banner",
                "value": '002'
            }, {
                "name": "註冊完成banner",
                "value": '004'
            }, {
                "name": "郵件範本中之推薦商品圖片",
                "value": '003'
            }, ]
        },
        {
        
            "title": "發佈狀態",
            "type": "select",
            "key": "isPublish",
           width: "200px",        
            "items": [{
                "name": "全部",
                "value": ''
            }, {
                "name": "上架",
                "value": 'Y'
            }, {
                "name": "下架",
                "value": 'N'
            }]
        },
        {
            "title": "標題",
            "type": "input",
            "key": "title",
            size: 100,
            width: "200px",

            "items": ""
        },
        
    ],



    "columns": [{
        title: "排序",
        key: "other",
        "fixed": "left",
        width: 100,
        scopedSlots: {
            customRender: "other"
        }
    },{
        "title": "所屬欄位",
        "dataIndex": "postionStr",
        "fixed": ""
    }, {
        "title": "標題",
        "dataIndex": "title",
        "fixed": ""
    }, {
        "title": "發佈狀態",
        "dataIndex": "isPublishStr",
        "fixed": ""
    }, {
        "title": "開始時間",
        "dataIndex": "grantBegStr",
        "fixed": ""
    }, {
        "title": "結束時間",
        "dataIndex": "grantEndStr",
        "fixed": "",
        //align: 'right'
    },{
        "title": "通路名稱",
        "dataIndex": "channelName",
        "fixed": ""
    }, {
        "title": "修改人員",
        "dataIndex": "modifier",
        "fixed": ""
    }, {
        "title": "異動日期",
        "dataIndex": "gmtModifiedStr",
        "fixed": ""
    }, {
        title: "操作",
        key: "operation",
        "fixed": "right",
        width: 100,
        scopedSlots: {
            customRender: "operation"
        }
    }],
	"columnsTwo": [{
	    "title": "所屬欄位",
	    "dataIndex": "positionStr",
	    "fixed": ""
	}, {
	    "title": "標題",
	    "dataIndex": "title",
	    "fixed": ""
	}, {
	    "title": "發佈狀態",
	    "dataIndex": "isPublishStr",
	    "fixed": ""
	}, {
	    "title": "開始時間",
	    "dataIndex": "grantBegStr",
	    "fixed": ""
	}, {
	    "title": "結束時間",
	    "dataIndex": "grantEndStr",
	    "fixed": "",
	    //align: 'right'
	},{
	    "title": "通路名稱",
	    "dataIndex": "channelName",
	    "fixed": ""
	}, {
	    "title": "修改人員",
	    "dataIndex": "modifier",
	    "fixed": ""
	}, {
	    "title": "異動日期",
	    "dataIndex": "gmtModifiedStr",
	    "fixed": ""
	}, {
	    title: "審核狀態",
	    key: "operation",
	    "fixed": "right",
	    width: 100,
	    scopedSlots: {
	        customRender: "operation"
	    }
	}]
}
export default obj
