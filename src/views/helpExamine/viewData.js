let obj = {
  "path": [{
    "path": "helpExamine",
    "breadcrumbName": "友邦幫忙审核"
  }],
  "changeArr": [{
    "title": "訂單產生日",
    "type": "rangeTime",
		disabled: true,
    "key": "DateRange",
	 width: "380px",
  }],
  "searchArr": [{
	    "title": "問題",
	    "type": "input",
	    "key": "question",
	    size: 10,
	    width: "200px",	
	    "items": ""
	}, {
    "title": "所屬標籤",
    "type": "select",
    "key": "helpLabel",
		width: "200px",
    "items": ""
  },	
	{
	  "title": "審核狀態",
	  "type": "select",
	  "key": "auditorStatus",
		width: "200px",
		value: 1,
	  "items": [{
	    "name": "待審核",
	    "value": 1
	  },{
	    "name": "退件",
	    "value": 2
	  },{
	    "name": "審核通過",
	    "value": 3
	  }]
	},	
	{
    "title": "異動日期",
    "type": "rangeTime",
    "key": "DateRange",
		width: "320px",		
		selectHour:true,
  }
],
  "columns": [{
    "title": "問題編號",
    "dataIndex": "questionCode",
    "fixed": ""
  }, {
    "title": "問題",
    "dataIndex": "question",
    "fixed": ""
  }, {
    "title": "所屬標籤",
    "dataIndex": "helpLabelStr",
    "fixed": ""
  },{
    "title": "修改人員",
    "dataIndex": "modifierName",
    "fixed": "",
    align: ''
  }, {
    "title": "異動日期",
    "dataIndex": "gmtModifiedStr",
    "fixed": "",
    align: ''
  },{
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
