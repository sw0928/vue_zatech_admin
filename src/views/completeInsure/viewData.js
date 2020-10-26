let obj = {
  "path": [{
    "path": "completeInsure",
    "breadcrumbName": "已完成投保紀錄查詢"
  }],
  "changeArr": [],
  "searchArr": [{
    "title": "要(被)保人身分證字號",
    "type": "input",
    size:10,
    "key": "certificateNo",
    "items": ""
  },{
    "title": "要(被)保人姓名",
    "type": "input",
    size:30,
    "key": "appName",
    "items": ""
  },{
    "title": "保單號碼",
    "type": "input",
    "key": "policyNo",
    size:20,
    "items": ""
  }, {
    "title": "商品名稱",
    "type": "select",
    "key": "goodsId",
    width: "240px",
    "items": []
  }, {
    "title": "訂單產生日",
    "type": "rangeTime",
    "key": "DateRange",
  }],
  "columns": [{
    "title": "保單號碼",
    "dataIndex": "policyNo",
    "fixed": ""
  }, {
    "title": "商品名稱",
    "dataIndex": "goodsName",
    "fixed": ""
  }, {
    "title": "商品類型",
    "dataIndex": "goodsTypeStr",
    "fixed": ""
  }, {
    "title": "保費(元)",
    "dataIndex": "orderAmountStr",
    "fixed": "",
    align: 'right'
  }, {
    "title": "要(被)保人姓名",
    "dataIndex": "appName",
    "fixed": ""
  }, {
    "title": "訂單產生日",
    "dataIndex": "orderDateStr",
    "fixed": ""
  }, {
    "title": "保單生效日",
    "dataIndex": "effectiveDate",
    "fixed": ""
  }, {
    "title": "契约滿期日",
    "dataIndex": "endDate",
    "fixed": ""
  }, {
    "title": "抽樣電訪",
    "dataIndex": "sampleCall",
    "fixed": ""
  },{
						title: "操作",
						key: "operation",
            "fixed": "right",
            width: 100,
						scopedSlots: {
							customRender: "operation"
						}
					}]
}
export default obj
