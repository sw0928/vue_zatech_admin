let obj = {
  "path": [{
    "path": "powerManage",
    "breadcrumbName": "權限管理"
  }],
  "changeArr": [{
    "title": "權限名稱",
    "type": "input",
    // regular: 'other10',
    size:20,
    errorMsg:'請填寫權限名稱',
    error: false,
    required: true,
    "key": "name",
    "items": ""
  }, {
    "title": "權限描述",
    "type": "input",
    size:40,

    "key": "remark",
    "items": ""
  }],
  "searchArr": [{
    "title": "權限名稱",
    "type": "input",
    "key": "name",
    size:20,
    "items": ""
  }],
  "columns": [{
    "title": "權限名稱",
    "dataIndex": "name",
    size:20,
    "fixed": ""
  }, {
    "title": "橊限描述",
    size:40,

    "dataIndex": "remark",
    "fixed": ""
  }, {
						title: "操作",
            width: 270,
            "fixed": "right",
						key: "operation",
						scopedSlots: {
							customRender: "operation"
						}
					}]
}
export default obj
