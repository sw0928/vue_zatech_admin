import {longData,Axios} from '@/common/common.js'

let userInfo = longData(1,'userInfo') || ''

const state = {
	userInfo: userInfo,
  goodsList: [],
  orderStatusEnum: []
}


const mutations = {
	setUserInfo(state, payload) {
			console.log(payload)
     if(!payload) return
     longData(0,'userInfo',payload)
      state.userInfo = payload;
	},
  setGoodsList(state,payload){
    state.goodsList = payload;
  },
  setStatusList(state,payload){
    state.orderStatusEnum = payload;
  }
}

const actions = {
  getGoodsList ({ commit }) {
    var goodsList = []
    var orderStatusEnum = []

    Axios('listGoods')
      .then(res => {
        orderStatusEnum = res.data.data.orderStatusEnum;
        goodsList = res.data.data.goodsEnum;
        commit('setGoodsList',goodsList.map(item => {
          return {
            name: item.goodsName,
            value: item.goodsId
          }
        }))
        commit('setStatusList',orderStatusEnum.map(item => {
          return {
            name: item.value,
            value: item.key
          }
        }))


      })


  }
}

export default {
	state,
	mutations,
	actions
}
