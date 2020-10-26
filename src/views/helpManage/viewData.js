let obj = {
  "path": [{
    "path": "helpManage",
    "breadcrumbName": "友邦幫忙查询"
  }],
  "changeArr": [],
  "searchArr": [{
    "title": "所屬標籤",
    "type": "select",
    "key": "helpLabel",
		width: "200px",
    "items": ""
  },
	{
	    "title": "問題",
	    "type": "input",
	    "key": "question",
	    size: 10,
	    width: "200px",	
	    "items": ""
	}],
  "columns": [{
        title: "排序",
        key: "other",
        "fixed": "left",
        width: 100,
        scopedSlots: {
            customRender: "other"
        }
    },{
      "title": "問題編號",
      "dataIndex": "questionCode",
      "fixed": ""
  },  {
      "title": "問題",
      "dataIndex": "question",
      "fixed": ""
  }, {
      "title": "所屬標籤",
      "dataIndex": "helpLabelStr",
      "fixed": ""
  }, {
      "title": "修改人員",
      "dataIndex": "modifierName",
      "fixed": ""
  }, {
      "title": "異動日期",
      "dataIndex": "gmtModifiedStr",
      "fixed": ""
  }, {
      title: "操作",
      key: "operation",
      "fixed": "right",
      width: 100,
      scopedSlots: {
          customRender: "operation"
      }
  }],
  "columnsTwo": [{
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
  }, {
      "title": "修改人員",
      "dataIndex": "modifierName",
      "fixed": ""
  }, {
      "title": "異動日期",
      "dataIndex": "gmtModifiedStr",
      "fixed": ""
  }, {
      title: "審核狀態",
      key: "operation",
      "fixed": "right",
      width: 100,
      scopedSlots: {
          customRender: "operation"
      }
  }]
}
export default obj
