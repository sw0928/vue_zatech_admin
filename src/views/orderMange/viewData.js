let obj = {
  "path": [{
    "path": "orderMange",
    "breadcrumbName": "選單管理"
  }],
  "changeArr": [{
    "title": "選單級別",
    "type": "select",
    regular: 'other1',
    error: false,
    required: true,
    value: 1,
    "key": "funLevel",
    "items":  [{
      "name": "1",
      "value": 1
    },{
      "name": "2",
      "value": 2
    }]
  }, {
    "title": "選單名稱",
    // regular: 'other10',
    errorMsg: '選單名稱最多填寫20字元',
    error: false,
    required: true,
    "type": "input",
    size:20,
    "key": "name",
    "items": ""
  }, {
    "title": "父級選單名稱",
    "type": "select",
    disabled: false,

    regular: 'other1',
    error: false,
    required: true,
    "key": "parentCode",
    "items": ""
  }, 
  {
    "title": "選單狀態",
    "type": "select",
    regular: 'other1',
    error: false,
    required: true,
    "key": "status",
    "value": "a",
    "items": [{
      "name": "有效",
      "value": "a"
    },{
      "name": "無效",
      "value": "b"
    }]
  },
   {
    "title": "選單描述",
    "type": "input",
    error: false,
    required: false,
    "key": "content",
    size:40,
    "items": ""
  }, {
    "title": "排序",
    regular: 'other02',
    error: false,
    required: true,
    "type": "input",
    "key": "orderFun",
    size:2,
    "items": ""
  }],
  "searchArr": [{
    "title": "選單名稱",
    "type": "input",
    "key": "name",
    size:20,
    "items": ""
  }, {
    "title": "選單編碼",
    "type": "input",
    "key": "code",
    size:10,
    "items": ""
  }, {
    "title": "父級選單名稱",
    "type": "input",
    "key": "parentName",
    size:20,
    "items": ""
  }, {
    "title": "選單級別",
    "type": "select",
    "key": "funLevel",
    "items": [{
      "name": "全部",
      "value": ""
    },{
      "name": "1",
      "value": 1
    },{
      "name": "2",
      "value": 2
    }]
  }, {
    "title": "選單狀態",
    "type": "select",
    "key": "status",
    // 'value': 'a',
    "items": [{
      "name": "全部",
      "value": ""
    },{
      "name": "有效",
      "value": "a"
    },{
      "name": "無效",
      "value": "b"
    }]
  }],
  "columns": [{
    "title": "選單級別",
    "dataIndex": "funLevel",
    "fixed": ""
  }, {
    "title": "選單編碼",
    "dataIndex": "code",
    "fixed": ""
  }, {
    "title": "選單名稱",
    "dataIndex": "name",
    "fixed": ""
  }, {
    "title": "父級選單名稱",
    "dataIndex": "parentName",
    "fixed": ""
  }, 
  {
    "title": "選單狀態",
    "dataIndex": "status",
    scopedSlots: {
    	customRender: "other"
    },
    "fixed": ""
  }, 
  {
    "title": "選單描述",
    "dataIndex": "content",
    "fixed": ""
  }, {
    "title": "排序",
    "dataIndex": "orderFun",
    "fixed": ""
  }, {
						title: "操作",
						key: "operation",
						scopedSlots: {
							customRender: "operation"
						}
					}]
}
export default obj
