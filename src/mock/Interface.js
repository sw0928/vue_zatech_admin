let mockObj = {
    // fillINfo
    exportSysUsers: {
        url: '/sysUser/exportSysUsers',
        // url: 'zatech-life-ecadmin-provider/sysUser/exportSysUsers',
        auth: true,
        method: 'post',
        confirm: false
    },
    listSysUsers: {
        url: 'sysUser/listSysUsers',
        // url: 'zatech-life-ecadmin-provider/sysUser/listSysUsers',
        auth: true,
        method: 'post',
        confirm: false
    },
    saveOrUpdateSysUser: {
        url: 'sysUser/saveOrUpdateSysUser',
        // url: 'zatech-life-ecadmin-provider/sysUser/saveOrUpdateSysUser',
        auth: true,
        method: 'post',
        confirm: false
    },
    deletSysUser: {
        url: 'sysUser/deleteSysUser',
        auth: true,
        method: 'post',
        confirm: false
    },
    roleselectListPage: {
        url: 'role/selectListPage',
        auth: true,
        method: 'post',
        confirm: false
    },

    insert: {
        url: 'role/insert',
        auth: true,
        method: 'post',
        confirm: false
    },

    updateByPrimaryKey: {
        url: 'role/updateByPrimaryKey',
        auth: true,
        method: 'post',
        confirm: false
    },
    deleteRole: {
        url: 'role/deleteRole',
        auth: true,
        method: 'post',
        confirm: false
    },
    getRoleList: {
        url: 'role/getRoleList',
        auth: true,
        method: 'post',
        confirm: false
    },
    getPermissionsList: {
        url: 'permissions/getPermissionsList',
        auth: true,
        method: 'post',
        confirm: false
    },

    authorization: {
        url: 'role/authorization',
        auth: true,
        method: 'post',
        confirm: false
    },
    bindUserRole: {
        url: 'sysUser/bindUserRole',
        auth: true,
        method: 'post',
        confirm: false
    },
    selectListPage: {
        url: 'permissions/selectListPage',
        auth: true,
        method: 'post',
        confirm: false
    },
    permissionsinsert: {
        url: 'permissions/insert',
        auth: true,
        method: 'post',
        confirm: false
    },
    updateBySelective: {
        url: 'permissions/updateBySelective',
        auth: true,
        method: 'post',
        confirm: false
    },
    permissionsauthorization: {
        url: 'permissions/authorization',
        auth: true,
        method: 'post',
        confirm: false
    },

    deletePermissions: {
        url: 'permissions/deletePermissions',
        auth: true,
        method: 'post',
        confirm: false
    },
    permissionsselectListPage: {
        url: 'permissions/selectListPage',
        auth: true,
        method: 'post',
        confirm: false
    },
    permissionssaveOrUpdatePermissions: {
        url: 'permissions/saveOrUpdatePermissions',
        auth: true,
        method: 'post',
        confirm: false
    },

    permissionsdeletePermissions: {
        url: 'permissions/deletePermissions',
        auth: true,
        method: 'post',
        confirm: false
    },
    functiongetFunctionList: {
        url: 'function/getFunctionList',
        auth: true,
        method: 'post',
        confirm: false
    },
    functionselectListPage: {
        url: 'function/selectListPage',
        auth: true,
        method: 'post',
        confirm: false
    },
    functiongetFunctionLevelList: {
        url: 'function/getFunctionLevelList',
        auth: true,
        method: 'post',
        confirm: false
    },
    functionsaveOrUpdateFunction: {
        url: 'function/saveOrUpdateFunction',
        auth: true,
        method: 'post',
        confirm: false
    },
    functiondeleteFun: {
        url: 'function/deleteFun',
        auth: true,
        method: 'post',
        confirm: false
    },
    loginServicelogin: {
        url: 'loginService/ecadminLogin',
        auth: true,
        method: 'post',
        confirm: false
    },
    loginout: {
        url: 'loginService/loginout',
        auth: true,
        method: 'post',
        confirm: false
    },
    getMenuList: {
        url: 'mainService/getMenuList',
        auth: true,
        method: 'post',
        confirm: false
    },
    listOrders: {
        url: 'webOrderService/listOrders',
        auth: true,
        method: 'post',
        confirm: false
    },
    listPolicys: {
        url: 'webOrderService/listPolicys',
        auth: true,
        method: 'post',
        confirm: false
    },
    listOrderExcludePolicy: {
        url: 'webOrderService/listOrderExcludePolicy',
        auth: true,
        method: 'post',
        confirm: false
    },
    exportOrders: {
        url: 'webOrderService/exportOrders',
        auth: true,
        method: 'post',
        confirm: false
    },
    exportPolicys: {
        url: 'webOrderService/exportPolicys',
        auth: true,
        method: 'post',
        confirm: false
    },
    getOrderChecKRecord: {
        url: 'webOrderService/getOrderChecKRecord',
        auth: true,
        method: 'post',
        confirm: false
    },
    getOrderDetail: {
        url: 'webOrderService/getOrderDetail',
        auth: true,
        method: 'post',
        confirm: false
    },
    getOrderDetailOver: { //����ɱ����cδ��ɱ���
        url: 'webOrderService/getOrderDetailUndo',
        auth: true,
        method: 'post',
        confirm: false
    },
    // getOrderDetailNoOver: {
    //   url: 'webOrderService/getOrderDetailUndo',
    //   auth: true,
    //   method: 'post',
    //   confirm: false
    // },
    memberServiceselectListPage: {
        url: 'memberService/selectListPage',
        auth: true,
        method: 'post',
        confirm: false
    },
    selectUpdateList: {
        url: 'memberService/selectUpdateList',
        auth: true,
        method: 'post',
        confirm: false
    },
    getMemberInfo: {
        url: 'memberService/getMemberInfo',
        auth: true,
        method: 'post',
        confirm: false
    },
    updateMemberInfo: {
        url: 'memberService/updateMemberInfo',
        auth: true,
        method: 'post',
        confirm: false
    },
    exportList: {
        url: 'memberService/exportList',
        auth: true,
        method: 'post',
        confirm: false
    },
    listGoods: {
        url: 'webGoods/listGoods',
        auth: true,
        method: 'post',
        confirm: false
    },
    //獲取通路列表
    getList: {
        url: 'ecadminChannel/list',
        auth: true,
        method: 'post',
        confirm: false
    },
    // 獲取通路下拉option
    getChannelName: {
        url: 'ecadminChannel/getChannelName',
        auth: true,
        method: 'post',
        confirm: false
    },
    // 獲取通路詳情
    channelDetail: {
        url: 'ecadminChannel/detail',
        auth: true,
        method: 'post',
        confirm: false
    },
    // 獲取通路审批列表
    channelApplyList: {
        url: 'ecadminChannel/channelApply/list',
        auth: true,
        method: 'post',
        confirm: false
    },
    //新增通路資訊
    channelApply: {
        url: 'ecadminChannel/channelApply',
        auth: true,
        method: 'post',
        confirm: false
    },
    //新增通路审核
    approval: {
        url: 'ecadminChannel/approval',
        auth: true,
        method: 'post',
        confirm: false
    },
    //新增mediaCode列表
    mediaList: {
        url: 'ecadminMedia/list',
        auth: true,
        method: 'post',
        confirm: false
    },
    //mediaCode下載模板
    downFile: {
        url: 'ecadminMedia/getTemplate',
        auth: true,
        method: 'post',
        confirm: false
    },
    //mediaCode審批記錄查詢
    mediaCodeApply: {
        url: 'ecadminMedia/mediaCodeApply/list',
        auth: true,
        method: 'post',
        confirm: false
    },
    //获取商品设定下拉菜单列表
    getGoodsDtoSelect: {
        url: 'channelGoodsDTOService/inner_selete_list',
        auth: true,
        method: 'post',
        confirm: false
    },
    //获取商品设定数据
    getGoodsDtoList: {
        url: 'channelGoodsDTOService/list',
        auth: true,
        method: 'post',
        confirm: false
    },
    //获取商品设定数据
    getGoodsDtoModifyList: {
        url: 'channelGoodsDTOService/modifier_list',
        auth: true,
        method: 'post',
        confirm: false
    },
    //商品设定数据獲取
    getGoodsDtoGet: {
        url: 'channelGoodsDTOService/add_list',
        auth: true,
        method: 'post',
        confirm: false
    },

    //商品设定設定送審
    goodsDtoPost: {
        url: 'channelGoodsDTOService/add',
        auth: true,
        method: 'post',
        confirm: false
    },
    //商品设定設定審批列表
    goodsDtoAuditList: {
        url: 'channelGoodsDTOService/audit_list',
        auth: true,
        method: 'post',
        confirm: false
    },
    //商品设定設定審批
    goodsDtoAudit: {
        url: 'channelGoodsDTOService/audit',
        auth: true,
        method: 'post',
        confirm: false
    },






    //廣告清單列表
    cmsBannerListPage: {
        url: 'cmsBannerEcadminService/listPage',
        auth: true,
        method: 'post',
        confirm: false
    },
    //廣告記錄列表
    cmsBannerModifListPage: {
        url: 'cmsBannerEcadminService/modifListPage',
        auth: true,
        method: 'post',
        confirm: false
    },









    //mediaCode審批記錄查詢
    addMediaCode: {
        url: 'ecadminMedia/mediaCodes',
        auth: true,
        method: 'post',
        confirm: false
    },
    //mediaCode批量審批
    mediaApproval: {
        url: 'ecadminMedia/approval',
        auth: true,
        method: 'post',
        confirm: false
    },
    //廣告清單列表
    cmsBannerListPage: {
        url: 'cmsBannerEcadminService/listPage',
        auth: true,
        method: 'post',
        confirm: false
    },
    //廣告記錄列表
    cmsBannerModifListPage: {
        url: 'cmsBannerEcadminService/modifListPage',
        auth: true,
        method: 'post',
        confirm: false
    },
    //廣告清單列表
    cmsBannerListPage: {
        url: 'cmsBannerEcadminService/listPage',
        auth: true,
        method: 'post',
        confirm: false
    },
    //廣告清單列表排序
    sortBanner: {
        url: 'cmsBannerEcadminService/sortBanner',
        auth: true,
        method: 'post',
        confirm: false
    },
    //廣告記錄列表
    cmsBannerModifListPage: {
        url: 'cmsBannerEcadminService/modifListPage',
        auth: true,
        method: 'post',
        confirm: false
    },





    //廣告管理--獲取廣告管理下拉框選項列表
    cmsBannerInitSelect: {
        url: 'cmsBannerEcadminService/initBannerSelect',
        auth: true,
        method: 'post',
        confirm: false
    },
    //banner 輪播時間
    setBannerTime: {
        url: 'cmsBannerEcadminService/setBannerTime',
        auth: true,
        method: 'post',
        confirm: false
    },
    //banner詳情
    getBannerDetail: {
        url: 'cmsBannerEcadminService/getDetail',
        auth: true,
        method: 'post',
        confirm: false
    },


    //banner 删除
    deleteBanner: {
        url: 'cmsBannerEcadminService/deleteBanner',
        auth: true,
        method: 'post',
        confirm: false
    },
    //banner 審核列表
    approveListPage: {
        url: 'cmsBannerEcadminService/approveListPage',
        auth: true,
        method: 'post',
        confirm: false
    },
    //banner 審核列表詳情
    getApproveDetail: {
        url: 'cmsBannerEcadminService/getApproveDetail',
        auth: true,
        method: 'post',
        confirm: false
    },
    //banner 審批
    approve: {
        url: 'cmsBannerEcadminService/approve',
        auth: true,
        method: 'post',
        confirm: false
    },
    //banner 上傳圖片
    uploadFiles: {
        url: 'fileEcadminService/uploadFiles',
        auth: true,
        method: 'post',
        confirm: false
    },
    //邀請好友列表清單
    friendListPage: {
        url: 'cmsFriendInviteEcadminService/listPage',
        auth: true,
        method: 'post',
        confirm: false
    },
    //邀請好友修改記錄
    friendModifListPage: {
        url: 'cmsFriendInviteEcadminService/modifListPage',
        auth: true,
        method: 'post',
        confirm: false
    },
    //邀請好友新增修改
    addOrUpdateFriendInvite: {
        url: 'cmsFriendInviteEcadminService/addOrUpdateFriendInvite',
        auth: true,
        method: 'post',
        confirm: false
    },
    //邀請好友詳情
    getFriendDetail: {
        url: 'cmsFriendInviteEcadminService/getDetail',
        auth: true,
        method: 'post',
        confirm: false
    },
    //邀請好友審批列表
    friendApproveListPage: {
        url: 'cmsFriendInviteEcadminService/approveListPage',
        auth: true,
        method: 'post',
        confirm: false
    },
    //邀請好友審批詳情
    getApproveFriendDetail: {
        url: 'cmsFriendInviteEcadminService/getApproveDetail',
        auth: true,
        method: 'post',
        confirm: false
    },
    //邀請好友刪除
    deleteFriendInvite: {
        url: 'cmsFriendInviteEcadminService/deleteFriendInvite',
        auth: true,
        method: 'post',
        confirm: false
    },
    //邀請好友審批
    approveFriend: {
        url: 'cmsFriendInviteEcadminService/approve',
        auth: true,
        method: 'post',
        confirm: false
    },


    //banner 新增修改
    addOrUpdateBanner: {
        url: 'cmsBannerEcadminService/addOrUpdateBanner',
        auth: true,
        method: 'post',
        confirm: false
    },
    //banner 删除
    deleteBanner: {
        url: 'cmsBannerEcadminService/deleteBanner',
        auth: true,
        method: 'post',
        confirm: false
    },
    //banner 審核列表
    approveListPage: {
        url: 'cmsBannerEcadminService/approveListPage',
        auth: true,
        method: 'post',
        confirm: false
    },
    //banner 審核列表詳情
    getApproveDetail: {
        url: 'cmsBannerEcadminService/getApproveDetail',
        auth: true,
        method: 'post',
        confirm: false
    },
    //banner 審批
    approve: {
        url: 'cmsBannerEcadminService/approve',
        auth: true,
        method: 'post',
        confirm: false
    },
    //banner 上傳圖片
    uploadFiles: {
        url: 'fileEcadminService/uploadFiles',
        auth: true,
        method: 'post',
        confirm: false
    },
    //邀請好友列表清單
    friendListPage: {
        url: 'cmsFriendInviteEcadminService/listPage',
        auth: true,
        method: 'post',
        confirm: false
    },
    //邀請好友修改記錄
    friendModifListPage: {
        url: 'cmsFriendInviteEcadminService/modifListPage',
        auth: true,
        method: 'post',
        confirm: false
    },
    //邀請好友新增修改
    addOrUpdateFriendInvite: {
        url: 'cmsFriendInviteEcadminService/addOrUpdateFriendInvite',
        auth: true,
        method: 'post',
        confirm: false
    },
    //邀請好友詳情
    getFriendDetail: {
        url: 'cmsFriendInviteEcadminService/getDetail',
        auth: true,
        method: 'post',
        confirm: false
    },
    //邀請好友審批列表
    friendApproveListPage: {
        url: 'cmsFriendInviteEcadminService/approveListPage',
        auth: true,
        method: 'post',
        confirm: false
    },
    //邀請好友審批詳情
    getApproveFriendDetail: {
        url: 'cmsFriendInviteEcadminService/getApproveDetail',
        auth: true,
        method: 'post',
        confirm: false
    },
    //邀請好友刪除
    deleteFriendInvite: {
        url: 'cmsFriendInviteEcadminService/deleteFriendInvite',
        auth: true,
        method: 'post',
        confirm: false
    },
    //邀請好友審批
    approveFriend: {
        url: 'cmsFriendInviteEcadminService/approve',
        auth: true,
        method: 'post',
        confirm: false
    },
	 //行銷活動清单列表
	serviceListPage: {
	    url: 'cmsActivityEcadminService/listPage',
	    auth: true,
	    method: 'post',
	    confirm: false
	},
	 //行銷活動记录列表
	serviceModifListPage: {
	    url: 'cmsActivityEcadminService/modifListPage',
	    auth: true,
	    method: 'post',
	    confirm: false
	},
	 //行銷活動列表删除
	deleteActivity: {
	    url: 'cmsActivityEcadminService/deleteActivity',
	    auth: true,
	    method: 'post',
	    confirm: false
	},
	 //行銷活動列表排序
	sortActivity: {
	    url: 'cmsActivityEcadminService/sortActivity',
	    auth: true,
	    method: 'post',
	    confirm: false
	},
	 //行銷活動列表详情
	getDetailActivity: {
	    url: 'cmsActivityEcadminService/getDetail',
	    auth: true,
	    method: 'post',
	    confirm: false
	},
	//行銷活動新增修改
	addOrUpdateActivity: {
	    url: 'cmsActivityEcadminService/addOrUpdateActivity',
	    auth: true,
	    method: 'post',
	    confirm: false
	},
	//行銷活動审核列表
	activityApproveListPage: {
	    url: 'cmsActivityEcadminService/approveListPage',
	    auth: true,
	    method: 'post',
	    confirm: false
	},
	//行銷活動审批
	approveActivity: {
	    url: 'cmsActivityEcadminService/approve',
	    auth: true,
	    method: 'post',
	    confirm: false
	},
	//行銷活動审批详情
	getApproveActivityDetail: {
	    url: 'cmsActivityEcadminService/getApproveDetail',
	    auth: true,
	    method: 'post',
	    confirm: false
	},
	//友邦清单
	cmsHelpList: {
	    url: 'cmsHelpDTOService/list',
	    auth: true,
	    method: 'post',
	    confirm: false
	},
	//友邦记录
	cmsHelpModifier_list: {
	    url: 'cmsHelpDTOService/modifier_list',
	    auth: true,
	    method: 'post',
	    confirm: false
	},
	//友邦下拉框
	cmsHelpDTOService: {
	    url: 'cmsHelpDTOService/inner_selete_list',
	    auth: true,
	    method: 'post',
	    confirm: false
	},
	//友邦新增编码
	cmsHelpCode: {
	    url: 'cmsHelpDTOService/code',
	    auth: true,
	    method: 'post',
	    confirm: false
	},
	//友邦排序下移
	cmsHelpUown: {
	    url: 'cmsHelpDTOService/sort_down',
	    auth: true,
	    method: 'post',
	    confirm: false
	},
	//友邦排序上移
	cmsHelpUp: {
	    url: 'cmsHelpDTOService/sort_up',
	    auth: true,
	    method: 'post',
	    confirm: false
	},
	//友邦删除
	cmsHelpDelete: {
	    url: 'cmsHelpDTOService/delete',
	    auth: true,
	    method: 'post',
	    confirm: false
	},
	//友邦详情
	cmsHelpdetail: {
	    url: 'cmsHelpDTOService/detail',
	    auth: true,
	    method: 'post',
	    confirm: false
	},
	//友邦新增
	cmsHelpAdd: {
	    url: 'cmsHelpDTOService/add',
	    auth: true,
	    method: 'post',
	    confirm: false
	},
	//友邦审核列表
	cmsHelpAuditList: {
	    url: 'cmsHelpDTOService/audit_list',
	    auth: true,
	    method: 'post',
	    confirm: false
	},
	//友邦审核详情
	cmsHelpAuditDetail: {
	    url: 'cmsHelpDTOService/audit_detail',
	    auth: true,
	    method: 'post',
	    confirm: false
	},
	//友邦审批
	cmsHelpAudit: {
	    url: 'cmsHelpDTOService/audit',
	    auth: true,
	    method: 'post',
	    confirm: false
	},
	//会员审核列表
	memberServiceListPage: {
	    url: 'memberService/approveListPage',
	    auth: true,
	    method: 'post',
	    confirm: false
	},
	//会员审核审批
	memberServiceApprove: {
	    url: 'memberService/approve',
	    auth: true,
	    method: 'post',
	    confirm: false
	},
	//会员审批之前详情
	memberApproveDetail: {
	    url: 'memberService/getApproveDetail',
	    auth: true,
	    method: 'post',
	    confirm: false
	},
	//会员审批之后明细
	memberApproveAfterDetail: {
	    url: 'memberService/getApproveAfterDetail',
	    auth: true,
	    method: 'post',
	    confirm: false
	},
	//会员OTP记录
	memberAuthRecord: {
	    url: 'memberService/authRecord/list',
	    auth: true,
	    method: 'post',
	    confirm: false
	},
	//会员行为记录
	memberBehavior: {
	    url: 'memberService/export/userBehavior',
	    auth: true,
	    method: 'post',
	    confirm: false
	},
	//使用者记录
	userDataRecordListPage: {
	    url: 'userDataRecordService/listPage',
	    auth: true,
	    method: 'post',
	    confirm: false
	},
	//使用者参数初始化
	initUserDataRecordSelect: {
	    url: 'userDataRecordService/initUserDataRecordSelect',
	    auth: true,
	    method: 'post',
	    confirm: false
	},
}

export default mockObj