let obj = {
    "path": [{
        "path": "activityManage",
        "breadcrumbName": "行銷活動查询"
    }],
    "changeArr": [],
    "searchArr": [{

            "title": "通路名稱",
            "type": "select",
            "key": "channelCode",
            width: "200px",

            "items":""
        },   
        {
            "title": "標題",
            "type": "input",
            "key": "title",
            size: 10,
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
       // align: 'right'
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
	   // align: 'right'
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
