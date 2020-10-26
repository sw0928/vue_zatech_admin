let obj = {
	"path": [{
		"path": "userRecord",
		"breadcrumbName": "使用者記錄查詢"
	}],
	"changeArr": [],
	"searchArr": [{
			"title": "帳號",
			"type": "input",
			"key": "loginName",
			size: 100,
			width: "200px",
			"items": ""
		},
		{
			"title": "功能模組",
			"type": "select",
			"key": "functionModelId",
			width: "200px",
			"items": ""
		},
		{
			"title": "功能項目",
			"type": "select",
			"key": "functionProId",
			width: "200px",
			"items": ""
		},
		{
			"title": "筆數區間",
			"type": "input_one",
			"key": "strokeCountStart",
			 size: 10,
			 width: "90px",
			"items": ""
		},
		{
			"title": "",
			"type": "input_two",
			"key": "strokeCountEnd",
			 size: 10,
			"items": ""
		},
		{
			"title": "查詢時間",
			"type": "rangeTime",
			"key": "DateRange",
		}
	],



	"columns": [{
		"title": "帳號",
		"dataIndex": "loginName",
		"fixed": ""
	}, {
		"title": "姓名",
		"dataIndex": "realName",
		"fixed": ""
	}, {
		"title": "所屬部門",
		"dataIndex": "department",
		"fixed": ""
	}, {
		"title": "使用者角色",
		"dataIndex": "roleName",
		"fixed": ""
	}, {
		"title": "功能模組",
		"dataIndex": "functionModelName",
		"fixed": "",
		// align: 'right'
	}, {
		"title": "功能項目",
		"dataIndex": "functionProName",
		"fixed": ""
	}, {
		"title": "查詢時間",
		"dataIndex": "gmtModifiedStr",
		"fixed": ""
	}, {
		"title": "查詢條件",
		"dataIndex": "conditionGather",
		"fixed": ""
	}, {
		"title": "筆數",
		"dataIndex": "strokeCount",
		"fixed": ""
	}],
}
export default obj
