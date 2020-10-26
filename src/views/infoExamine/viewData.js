let obj = {
  "path": [{
    "path": "infoExamine",
    "breadcrumbName": "會員資料審核"
  }],
  "changeArr": [{
    "title": "訂單產生日",
    "type": "rangeTime",
		disabled: true,
    "key": "DateRange",
	 width: "380px",
  }],
  "searchArr": [{
	    "title": "姓名",
	    "type": "input",
	    "key": "accountName",
	    size: 100,
	    width: "200px",	
	    "items": ""
	}, 
	{
	    "title": "身份證字號",
	    "type": "input",
	    "key": "certificateNo",
	    size: 100,
	    width: "200px",	
	    "items": ""
	}, 
	{
	    "title": "會員帳號",
	    "type": "input",
	    "key": "accountCode",
	    size: 100,
	    width: "200px",	
	    "items": ""
	}, 
	{
	    "title": "手機",
	    "type": "input",
	    "key": "phone",
	    size: 100,
	    width: "200px",	
	    "items": ""
	}, 
	{
	    "title": "E-mail",
	    "type": "input",
	    "key": "email",
	    size: 100,
	    width: "200px",	
	    "items": ""
	}, 
	{
    "title": "異動日期",
    "type": "rangeTime",
    "key": "DateRange",
		width: "320px",		
		selectHour:true,
  },{
    "title": "審核狀態",
    "type": "select",
    "key": "auditorStatus",
		width: "200px",
		value: 1,
    "items": ""
  },
	
],
  "columns": [{
    "title": "會員編號",
    "dataIndex": "accountCode",
    "fixed": ""
  }, {
    "title": "姓名",
    "dataIndex": "accountName",
    "fixed": ""
  }, {
    "title": "身份證字號",
    "dataIndex": "certificateNo",
    "fixed": ""
  }, {
    "title": "生日",
    "dataIndex": "birthday",
    "fixed": ""
  }, {
    "title": "手機",
    "dataIndex": "phone",
    "fixed": "",
  }, {
    "title": "E-mail",
    "dataIndex": "email",
    "fixed": "",
  },{
    "title": "推薦人會員編號",
    "dataIndex": "referrerCode",
    "fixed": "",
  },{
    "title": "通路名稱",
    "dataIndex": "channelName",
    "fixed": "",
  },{
    "title": "Media Code",
    "dataIndex": "mediaCode",
    "fixed": "",
  },{
    "title": "維護人員",
    "dataIndex": "modifier",
    "fixed": "",
  },{
		title: "狀態",
		key: "other",
		"fixed": "",	
		scopedSlots: {
			customRender: "other"
		}
	}, {
		"title": "異動日期",
		"dataIndex": "gmtModifiedStr",
		"fixed": ""
	}, {
    "title": "審核狀態",
    "dataIndex": "auditorStatusStr",
    "fixed": ""
  }, {
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
