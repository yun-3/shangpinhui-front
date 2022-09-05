import { reqAddOrUpdateShopCart, reqGoodsInfo } from "@/api";
import {getUUID} from "@/utils/uuid_token"
const state = {
    goodInfo : {},
    // 游客临时身份
    uuid_token:getUUID()
}
const mutations = {
    GETGOODINFO(state,goodInfo){
        state.goodInfo = goodInfo;
    }
};
const actions ={
    // 获取产品信息的actions
    async getGoodInfo({commit},skuId){
        let result = await reqGoodsInfo(skuId);
        if(result.data.code == 200){
            commit('GETGOODINFO',result.data.data)
        }
    },
    // 将产品添加到购物车中
    async addOrUpdateShopCart({commit},{skuId,skuNum}){
        let result = await reqAddOrUpdateShopCart(skuId,skuNum);
        // 加入购物车以后（发请求），前台将参数带给服务器，
        // 服务器写入数据成功并没有返回其他数据，只是返回code
        // 因此不需要三连环存进store
        // 当前这个函数如果执行返回Promise
        if(result.data.code == 200) return 'ok'
        else{return Promise.reject(new Error('faile'))}
    },
};
const getters = {
    categoryView(state){
        return state.goodInfo.categoryView||{};
    },
    skuInfo(state){
        return state.goodInfo.skuInfo||{};
    },
    spuSaleAttrList(state){
        return state.goodInfo.spuSaleAttrList || [];
    }
}
export default {
    state,
    mutations,
    actions,
    getters
}