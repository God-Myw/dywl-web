import Vue from 'vue'
import Vuex from 'vuex'
// import modules from './modules'
Vue.use(Vuex)

const state = {
  productid: JSON.parse(sessionStorage.getItem('tabsId')),
}
const mutations = {
  product(state,id) {
    state.productid = id
    sessionStorage.setItem('tabsId',id)
  },

}
export default new Vuex.Store({
  state,
  mutations
  // modules: {
  //   modules
  // }
})
