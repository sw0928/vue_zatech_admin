let obj = {
  "path": [{
    "path": "inCompleteInsure",
    "breadcrumbName": "未完成投保紀錄查詢"
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
    "title": "訂單編號",
    "type": "input",
    "key": "orderNo",
    size:10,
    "items": ""
  }, {
    "title": "商品名稱",
    "type": "select",
    "key": "goodsId",
    width: "240px",
    "items": []
  }, {
    "title": "維護日期",
    "type": "rangeTime",
    "key": "DateRange",
  }],
  "columns": [{
    "title": "訂單編號",
    "dataIndex": "orderNo",
    "fixed": ""
  }, {
    "title": "要(被)保人姓名",
    "dataIndex": "appName",
    "fixed": ""
  }, {
    "title": "維護日期",
    "dataIndex": "checkTimeStr",
    "fixed": ""
  }, {
    "title": "商品名稱",
    "dataIndex": "goodsName",
    "fixed": ""
  }, {
    "title": "保險金額(元)",
    "dataIndex": "amountStr",
    "fixed": "",
    align: 'right'
  }, {
    "title": "保費(元)",
    "dataIndex": "orderAmountStr",
    "fixed": "",
    align: 'right'
  }, {
						title: "操作",
						key: "operation",
            "fixed": "right",
            width: 200,
						scopedSlots: {
							customRender: "operation"
						}
					}]
}
export default obj
