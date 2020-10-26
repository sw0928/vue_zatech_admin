let obj = {
    "path": [{
        "path": "accessQuery",
        "breadcrumbName": "通路查詢"
    }],
    "changeArr": [],
    "searchArr": [{

            "title": "通路名稱",
            "type": "select",
            "key": "channelName",
            width: "300px",

            "items": [{
                "name": "投保資格確認",
                "value": 1
            }, {
                "name": "資料填寫",
                "value": 2
            }, {
                "name": "資料確認",
                "value": 3
            }, {
                "name": "待繳費",
                "value": 4
            }, ]
        },
        {
            "title": "通路代碼",
            "type": "input",
            "key": "channelCode",
            size: 10,
            value: '',
            width: "300px",

            "items": ""
        },
    ],



    "columns": [{
        "title": "通路名稱",
        "dataIndex": "channelName",
        width: 200,

        "fixed": ""
    }, {
        "title": "通路代碼",
        "dataIndex": "channelCode",
        "fixed": ""
    }, {
        "title": "合作開始時間",
        "dataIndex": "grantBegStr",
        "fixed": ""
    }, {
        "title": "合作結束時間",
        "dataIndex": "grantEndStr",
        "fixed": ""
    }, {
        "title": "Agent Code",
        "dataIndex": "agentCode",
        "fixed": ""
    }, {
        "title": "異動時間",
        "dataIndex": "gmtModifiedStr",
        "fixed": "",
    }, {
        'title': "操作",
        key: "operation",
        width: 200,
        scopedSlots: {
            customRender: "operation"
        }
    }]
}
export default obj