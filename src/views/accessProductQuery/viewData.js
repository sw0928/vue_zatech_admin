let obj = {
    "path": [{
        "path": "accessProductQuery",
        "breadcrumbName": "通路商品查詢"
    }],
    "changeArr": [],
    "searchArr": [{

            "title": "通路名稱",
            "type": "select",
            "key": "channelCode",
            width: "300px",

            "items": ""
        },
        {
            "title": "商品名稱",
            "type": "input",
            "key": "goodsName",
            size: 10,
            width: "300px",
            "items": ""
        },
        {
            "title": "商品代碼",
            "type": "input",
            "key": "goodsCode",
            size: 10,
            width: "300px",

            "items": ""
        },
        {

            "title": "商品類別",
            "type": "select",
            "key": "goodsType",
            width: "300px",
            "items": ""
        },
    ],



    "columns": [{
            "title": "通路名稱",
            "dataIndex": "channelName",
            "fixed": ""
        },
        {
            "title": "商品代碼",
            "dataIndex": "goodsCode",
            "fixed": ""
        },
        {
            "title": "商品名稱",
            "dataIndex": "goodsName",
            "fixed": ""
        },
        {
            "title": "商品類別",
            "dataIndex": "categoryName",
            "fixed": ""
        },
        {
            "title": "Campagin Code",
            "dataIndex": "campaignCode",
            "fixed": ""
        },
        {
            "title": "銷售開始時間",
            "dataIndex": "grantBegStr",
            "fixed": ""
        }, {
            "title": "銷售結束時間",
            "dataIndex": "grantEndStr",
            "fixed": ""
        }, {
            "title": "異動時間",
            "dataIndex": "gmtModifiedStr",
            "fixed": "",
        }
    ]
}
export default obj