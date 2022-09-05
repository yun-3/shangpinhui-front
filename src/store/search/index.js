// search模块的小仓库
import { reqGetSearchInfo } from "@/api";
const state = {
    searchList:{}
};
const mutations = {
    GETSEARCHLIST(state,searchList){
        state.searchList = searchList;
    }
};
const actions = {
    // 获取search模块数据
    async getSearchList({commit},params={}){
        // params形参：是当用户派发action的时候，第二个参数传过来的，默认是一个对象
        let result = await reqGetSearchInfo(params)
        if(result.data.code == 200){
            commit("GETSEARCHLIST",result.data.data)
        }
    }
};
// 计算属性
// 项目中getter主要作用：简化仓库中数据
// 可以把我们将来在组件中需要的数据简化一下，将来组件获取数据时就方便了
const getters = {
    // 当前形参state，当前仓库中的state，并非大仓库中的state
    // []是指如果没有网络，应该至少返回一个[]
    goodsList(state){
        return state.searchList.goodsList||[];
    },
    trademarkList(state){
        return state.searchList.trademarkList||[];
    },
    attrsList(state){
        return state.searchList.attrsList||[];
    },
};

export default {
    state,
    mutations,
    actions,
    getters
}