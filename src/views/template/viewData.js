let obj = {
  path: {
    path: "insurProduct",
    breadcrumbName: "产品列表"
  },
  changeArr: [{
			title: '输入框',
			type: 'input',
			key: 'name0',
			items: ''
		},
		{
			title: '下拉框',
			type: 'select',
			key: 'name1',
			items: [{
					name: '测试一',
					value: '1'
				},
				{
					name: '测试二',
					value: '2'
				},
			]
		},
		{
			title: '时间框',
			type: 'time',
			key: 'name2',
			items: ''
		}],
	searchArr: [{
			title: '输入框',
			type: 'input',
			key: 'name0',
			items: ''
		},
		{
			title: '下拉框',
			type: 'select',
			key: 'name1',
			items: [{
					name: '测试一',
					value: '1'
				},
				{
					name: '测试二',
					value: '2'
				},
			]
		},
		{
			title: '时间框',
			type: 'time',
			key: 'name2',
			items: ''
		},

	],
	columns: [
    {
        title: '序號',
        render:(text,record,index)=>`${index+1}`,
      },
{
			title: "属性1",
			dataIndex: "name0",
		},
		{
			title: "属性2",
			dataIndex: "name1",
		},
		{
			title: "属性3",
			dataIndex: "name2",
		},
		{
			title: "属性4",
			dataIndex: "name3",
		},
		{
			title: "属性5",
			dataIndex: "name4",
		},
		{
			title: "属性6",
			dataIndex: "name5",
		},
		{
			title: "属性7",
			dataIndex: "name6",
		},
		{
			title: "属性8",
			dataIndex: "name7",
		},
		{
			title: "操作",
			key: "operation",
			scopedSlots: {
				customRender: "operation"
			}
		}

	]
}

export default obj
