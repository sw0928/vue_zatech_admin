let obj = {
  "path": [{
    "path": "roleManage",
    "breadcrumbName": "角色管理"
  }],
  "changeArr": [{
    "title": "角色名稱",
    "type": "input",
    "key": "name",
    size:20,
    // regular: 'other10',
    error: false,
    required: true,
    "items": ""
  }, {
    "title": "角色描述",
    "type": "input",
    "key": "remark",
    size:40,
    required: false,
    "items": ""
  }],
  "searchArr": [{
    "title": "角色名稱",
    "type": "input",
    "key": "name",
    size:10,
    "items": ""
  }],
  "columns": [{
    "title": "角色名稱",
    // width: 100,
    "dataIndex": "name",
    "fixed": ""
  }, {
    "title": "角色描述",
    // width: 270,
    "dataIndex": "remark",

  }, {
						title: "操作",
						key: "operation",
            width: 270,
            fixed: 'right',
						scopedSlots: {
							customRender: "operation"
						}
					}]
}
export default obj
