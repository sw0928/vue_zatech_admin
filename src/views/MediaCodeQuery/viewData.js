let obj = {
    "path": [{
        "path": "MediaCodeQuery",
        "breadcrumbName": "Media Code查詢"
    }],
    "changeArr": [],
    "searchArr": [{

            "title": "通路名稱",
            "type": "select",
            "key": "channelName",
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
            "title": "Media Code",
            "type": "input",
            "key": "mediaCode",
            size: 10,
            width: "240px",

            "items": ""
        },
    ],



    "columns": [{
            "title": "通路名稱",
            "dataIndex": "channelName",
            "fixed": ""
        }, {
            "title": "Media Code",
            "dataIndex": "mediaCode",
            "fixed": ""
        }, {
            "title": "活動名稱",
            "dataIndex": "activityName",
            "fixed": ""
        },
        {
            "title": "開始時間",
            "dataIndex": "grantBegStr",
            "fixed": ""
        },
        {
            "title": "結束時間",
            "dataIndex": "grantEndStr",
            "fixed": ""
        },
        {
            "title": "異動時間",
            "dataIndex": "gmtModifiedStr",
        }, {
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