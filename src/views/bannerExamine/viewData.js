let obj = {
  "path": [{
    "path": "bannerExamine",
    "breadcrumbName": "廣告審核"
  }],
  "changeArr": [{
    "title": "訂單產生日",
    "type": "rangeTime",
		disabled: true,
    "key": "DateRange",
	 width: "380px",
  }],
  "searchArr": [{
    "title": "通路名稱",
    "type": "select",
    "key": "channelCode",
		width: "240px",
    "items": ""
  },
	{
	  "title": "所屬欄位",
	  "type": "select",
	  "key": "position",
		width: "200px",
	  "items": ""
	},
	{
	    "title": "標題",
	    "type": "input",
	    "key": "title",
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
  },
	{
	  "title": "審核狀態",
	  "type": "select",
	  "key": "auditorStatus",
		width: "200px",
		value: 1,
	  "items": ""
	}],
  "columns": [{
    "title": "所屬欄位",
    "dataIndex": "positionStr",
    "fixed": ""
  }, {
    "title": "標題",
    "dataIndex": "title",
    "fixed": "",
  }, {
    "title": "發布狀態",
    "dataIndex": "isPublishStr",
    "fixed": ""
  }, {
    "title": "開始時間",
    "dataIndex": "grantBegStr",
    "fixed": ""
  }, {
    "title": "結束時間",
    "dataIndex": "grantEndStr",
    "fixed": ""
  }, {
    "title": "修改人員",
    "dataIndex": "modifier",
    "fixed": "",
    align: ''
  }, {
    "title": "異動日期",
    "dataIndex": "gmtModifiedStr",
    "fixed": "",
    align: ''
  }, {
    "title": "通路名稱",
    "dataIndex": "channelName",
    "fixed": ""
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
