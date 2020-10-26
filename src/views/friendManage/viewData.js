let obj = {
    "path": [{
        "path": "friendManage",
        "breadcrumbName": "邀請好友查询"
    }],
    "changeArr": [],
    "searchArr": [{

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
        },
        
    ],



    "columns": [{
        "title": "標題",
        "dataIndex": "title",
        "fixed": ""
    },{
        "title": "內文標題",
        "dataIndex": "innerTitle",
        "fixed": ""
    },  {
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
        "title": "內文標題",
        "dataIndex": "innerTitle",
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
