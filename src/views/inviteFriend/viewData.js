let obj = {
    "path": [{
      "path": "addvertise",
      "breadcrumbName": "邀請好友管理"
    }],
    "changeArr": [],
    "columns": [{
      "title": "標題",
      "dataIndex": "title",
      "fixed": ""
    }, {
      "title": '內文標題',
      "dataIndex": 'innerTitle',
      "fixed": ''
    }, {
      "title": '發佈狀態',
      "dataIndex": 'status',
      "fixed": ''
    }, {
      "title": '開始時間',
      "dataIndex": 'startTime',
      "fixed": ''
    }, {
      "title": '結束時間',
      "dataIndex": 'endTime',
      "fixed": ''
    }, {
      "title": '修改人員',
      "dataIndex": 'modifyMan',
      "fixed": ''
    }, {
      "title": '異動日期',
      "dataIndex": ' modifyTime',
      "fixed": ''
    }, {
        title: "操作",
        key: "operation",
        "fixed": "right",
        width: 200,
        scopedSlots: {
            customRender: "operation"
        }
    }],
    "searchArr": [{
      "title": "發佈狀態",
      "type": "input",
      "key": "publishStatus",
      size: 20,
      width: "300px",
      "items": [
        {
          "name": "全部",
          "value": 0
        },{
          "name": "上架",
          "value": 1
        },{
          "name": "下架",
          "value": 2
        }
      ]
    }, {
      "title": "標題",
      "type": "input",
      "key": " title",
      size: 20,
      width: "300px",
      "items": ""
    }]
}
export default obj
