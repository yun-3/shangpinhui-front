// home模块的小仓库
import { reqCategoryList, reqGetBannerList, reqFloorList } from "@/api";
const state = {
    categoryList:[],
    // 轮播图的数组
    bannerList:[],
    // 获取floor数据
    floorList:[]
};
const mutations = {
    GETCATEGORYLIST(state,categoryList){
        state.categoryList = categoryList;
    },
    GETBANNERLIST(state,bannerList){
        state.bannerList = bannerList;
    },
    GETFLOORLIST(state,floorList){
        state.floorList = floorList;
    },
};
const actions = {
    // 通过API里面的接口函数调用，向服务器发请求
    async getCategoryList({commit}){
        let result = await reqCategoryList();
        if(result.data.code == 200){
            commit("GETCATEGORYLIST",result.data.data)
        }
    },
    // 获取首页轮播图的数据
    async getBannerList({commit}){
        let result = await reqGetBannerList();
        if(result.data.code == 200){
            commit("GETBANNERLIST",result.data.data)
        }
    },
    // 获取首页轮播图的数据
    async getFloorList({commit}){
        let result = await reqFloorList();
        if(result.data.code == 200){
            commit("GETFLOORLIST",result.data.data)
        }
    }
};
const getters = {};

export default {
    state,
    mutations,
    actions,
    getters
}