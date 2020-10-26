let obj = {
    "path": [{
        "path": "saleProductQuery",
        "breadcrumbName": "銷售商品設定管理"
    }],
    "changeArr": [],
    "productArr": [{
            "title": "商品名稱",
            "type": "input",
            "key": "goodsName",
            size: 60,
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
    ],
    "searchArr": [{

            "title": "通路名稱",
            "type": "select",
            "key": "channelName",
            width: "240px",
            required: true,
            regular: 'other1',
            value: 1,
            error: false,
            "items": ""
        },
        {
            "title": "通路代碼",
            "type": "span",
            "key": "channelCode",
            size: 10,
            width: "240px",

            "items": ""
        },
    ],



    "columns": [{
        "title": "商品名稱",
        "dataIndex": "goodsName",
        "fixed": ""
    }, {
        "title": "商品代碼",
        "dataIndex": "goodsCode",
        "fixed": ""
    }, {
        "title": "銷售開始時間",
        "dataIndex": "grantBegStr",
        "fixed": ""
    }, {
        "title": "銷售結束時間",
        "dataIndex": "grantEndStr",
        "fixed": ""
    }, {
        "title": "Campaign Code",
        "dataIndex": "campaignCode",
        "fixed": "",

    }]
}
export default obj