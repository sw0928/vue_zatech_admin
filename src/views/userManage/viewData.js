let obj = {
  "path": [{
    "path": "userManage",
    "breadcrumbName": "使用者管理"
  }],
  "changeArr": [{
    "title": "帳號",
    "type": "input",
    "key": "loginName",
    regular: 'notChinese',
    errorMsg: '帳號錯誤，請重新填寫',
    error: false,
    size:20,
    required: true,
    "items": ""
  }, {
    "title": "姓名",
    "type": "input",
    "key": "realName",
    size:50,
    // regular: 'name',
    regular: 'onlyNumber',
    error: false,
    errorMsg: '姓名請至少填寫2個中文或4個英文',
    required: true,
    "items": ""
  }, {
    "title": "部門",
    "type": "input",
    // regular: 'Department',
    regular: 'onlyNumber',

    "key": "departmentName",
    "items": "",
    size:50,
    errorMsg: '請填寫正確的部門',
    error: false,
    required: true,
    // regular: 'part',
  }, {
    "title": "E-mail",
    "type": "input",
    "key": "email",
    size:50,
    regular: 'email',
     errorMsg: 'Email格式錯誤',
    error: false,
    required: true,
    "items": ""
  }, {
    "title": "狀態",
    "type": "select",
    required: true,
    "key": "userState",
    "items": [{
      "name": "開啓",
      "value": '1'
    },{
      "name": "關閉",
      "value": '2'
    },
    ]
  }, {
    "title": "手機",
    "type": "input",
    "key": "phone",
    size:10,
    regular: 'phone',
    errorMsg: '電話號碼格式錯誤',
    required: false,
    error: false,
    "items": ""
  }],
  "searchArr": [{
    "title": "帳號",
    "type": "input",
    "key": "loginName",
    size:20,
    "items": ""
  }, {
    "title": "姓名",
    "type": "input",
    "key": "realName",
    size:50,
    "items": ""
  }, {
    "title": "手機",
    "type": "input",
    "key": "phone",
    size:10,
    "items": ""
  }, {
    "title": "部門",
    "type": "input",
    "key": "departmentName",
    size:50,
    "items": ""
  }, {
    "title": "狀態",
    "type": "select",
    "key": "userState",
    "items": [{
      "name": "全部",
      "value": ''
    },
      {
      "name": "開啓",
      "value": '1'
    },{
      "name": "關閉",
      "value": '2'
    },
    ]
  }],
  "columns": [{
    "title": "帳號",
    "dataIndex": "loginName",
    // width: 100,
    "fixed": ""
  }, {
    "title": "姓名",
    "dataIndex": "realName",
    // width: 100,
    "fixed": ""
  }, {
    "title": "部門",
    "dataIndex": "departmentName",
    // width: 100,
    "fixed": ""
  }, {
    "title": "使用者角色",
    // width: 200,
    "dataIndex": "roleName",
    "fixed": ""
  }, {
    "title": "E-mail ",
    // width: 100,
    "dataIndex": "email",
    "fixed": ""
  }, {
    "title": "手機",
    // width: 100,
    "dataIndex": "phone",
    "fixed": ""
  }, {
    "title": "狀態",
    // width: 100,
    "dataIndex": "userStateStr",
    "fixed": ""
  }, {
    "title": "修改時間",
    // width: 150,
    "dataIndex": "gmtModifiedStr",
    "fixed": ""
  }, {
						title: "操作",
						key: "operation",
            "fixed": "right",
            width: 270,
						scopedSlots: {
							customRender: "operation"
						}
					}]
}
export default obj
