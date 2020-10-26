let obj = {
    "path": [{
        "path": "accessCheck",
        "breadcrumbName": "通路審核 "
    }],
    "changeArr": [],
    "searchArr": [{
            "title": "通路代碼",
            "type": "input",
            "key": "channelCode",
            size: 10,
            // 'display': 'inline-block',
            width: "300px",

            "items": ""
        },
        {
            "title": "通路名稱",
            "type": "select",
            "key": "channelName",
            // 'display': 'inline-block',

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
            }]
        },
        {
            "title": "審核狀態",
            "type": "select",
            // 'display': 'inline-block',


            "key": "auditorStatus",
            width: "300px",
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
            "title": "通路名稱",
            "dataIndex": "channelName",
            width: 200,
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
        },
        {
            "title": "異動時間",
            "dataIndex": "gmtModifiedStr",
            "fixed": "",
            align: 'ledt'
        },
        {
            "title": "審核狀態",
            "dataIndex": "auditorStatusStr",
            "fixed": "",
        },
        {
            title: "操作",
            key: "operation",
            "fixed": "right",
            width: 200,
            scopedSlots: {
                customRender: "operation"
            }
        }
    ]
}
export default obj