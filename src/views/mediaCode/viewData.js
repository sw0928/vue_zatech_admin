let obj = {
    "columns": [{
            "title": "活動名稱",
            "dataIndex": "activityName",
            "fixed": ""
        }, {
            "title": "Media Code",
            "dataIndex": "mediaCode",
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