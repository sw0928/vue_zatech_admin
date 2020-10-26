let obj = {
    "path": [{
        "path": "MediaCodeCheck",
        "breadcrumbName": "MediaCode審核"
    }],
    "changeArr": [],
    "searchArr": [{
            "title": "Media Code",
            "type": "input",
            "key": "mediaCode",
            size: 10,
            width: "240px",
            "items": ""
        },
        {
            "title": "活動名稱",
            "type": "input",
            "key": "activityName",
            size: 10,
            width: "240px",

            "items": ""
        },
        {

            "title": "通路名稱",
            "type": "select",
            "key": "channelName",
            width: "240px",

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

            "title": "審核狀態",
            "type": "select",
            "key": "auditorStatus",
            width: "240px",
			value: 1,
            "items": [{
                "name": "待審核",
                "value": 1
            }, {
                "name": "退件",
                "value": 2
            }, {
                "name": "審核通過",
                "value": 3
            }]
        },

    ],



    "columns": [{
            "title": "活動名稱",
            "dataIndex": "activityName",
            "fixed": ""
        }, {
            "title": "Media Code",
            "dataIndex": "mediaCode",
            "fixed": ""
        }, {
            "title": "開始時間",
            "dataIndex": "grantBegStr",
            "fixed": ""
        }, {
            "title": "結束時間",
            "dataIndex": "grantEndStr",
            "fixed": ""
        },
        {
            "title": "通路代碼",
            "dataIndex": "channelCode",
            "fixed": ""
        },
        {
            "title": "通路名稱",
            "dataIndex": "channelName",
            "fixed": ""
        },
        {
            "title": "異動時間",
            "dataIndex": "gmtModifiedStr",
            "fixed": ""
        },
        {
            "title": "審核狀態",
            "dataIndex": "auditorStatusStr",
        }, {
            title: "操作",
            key: "operation",
            "fixed": "right",
            width: 100,
            scopedSlots: {
                customRender: "operation"
            }
        }
    ]
}
export default obj