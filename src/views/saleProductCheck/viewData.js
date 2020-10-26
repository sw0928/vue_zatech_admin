let obj = {
    "path": [{
        "path": "saleProductCheck",
        "breadcrumbName": "銷售商品設定審核"
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
            "title": "商品代碼",
            "type": "input",
            "key": "goodsCode",
            size: 10,
            width: "240px",

            "items": ""
        },
        {
            "title": "商品名稱",
            "type": "input",
            "key": "goodsName",
            size: 10,
            width: "240px",

            "items": ""
        },
        {

            "title": "商品類別",
            "type": "select",
            "key": "goodsType",
            width: "240px",

            "items": ""
        },
        {
            "title": "審核狀態",
            "type": "select",
            "key": "auditorStatus",
            width: "240px",
			value: 1,
            "items": ""
        },
    ],



    "columns": [{
            "title": "通路名稱",
            "dataIndex": "channelName",
            "fixed": ""
        }, {
            "title": "商品代碼",
            "dataIndex": "goodsCode",
            "fixed": ""
        }, {
            "title": "商品名稱",
            "dataIndex": "goodsName",
            "fixed": ""
        }, {
            "title": "商品類別",
            "dataIndex": "categoryName",
            "fixed": ""
        },
        {
            "title": "Campaign Code",
            "dataIndex": "campaignCode",
            "fixed": ""
        },
        {
            "title": "銷售開始時間",
            "dataIndex": "grantBegStr",
            "fixed": ""
        },
        {
            "title": "銷售結束時間",
            "dataIndex": "grantEndStr",
            "fixed": ""
        },
        {
            "title": "異動時間",
            "dataIndex": "gmtModifiedStr",
            "fixed": "",
        },
        {
            "title": "審核狀態",
            "dataIndex": "auditorStatusStr",
            "fixed": "",
        },
        {
            title: "操作",
            key: "operation",
            width: 150,
            scopedSlots: {
                customRender: "operation"
            }
        }
    ]
}
export default obj