import { reqCartList,reqDeleteCartById,reqUpdateCheckedByid } from "@/api";

const state = {
    cartList:[]
}
const mutations ={
    GETCARTLIST(state,cartList){
        state.cartList = cartList;
    }
};
const actions = {
    // 获取购物车列表数据
    async getCartList({commit}){
        let result = await reqCartList();
        if(result.data.code == 200){
            commit("GETCARTLIST",result.data.data)
        }
    },
    // 删除购物车某一个商品
    async deleteCartListBySkuId({commit},skuId){
        let result = await reqDeleteCartById(skuId);
        if(result.data.code==200){return "ok"}
        else return Promise.reject(new TypeError("faile"))
    },
    // 修改商品勾选状态
    async updateCheckedById({commit},{skuId,isChecked}){
        let result = await reqUpdateCheckedByid(skuId,isChecked);
        if(result.data.code==200){return "ok"}
        else return Promise.reject(new TypeError("faile"))
    },
    // 删除全部勾选的产品
    deleteAllCheckedCart({dispatch,getters}){
        // {dispatch,getters}其实是在解构()里默认的context，context里面有dispatch,getters
        let PromiseAll = [];
        getters.cartList.cartInfoList.forEach(item => {
            let promise = item.isChecked == 1?dispatch('deleteCartListBySkuId',item.skuId):'';
            PromiseAll.push(promise);
        });
        return Promise.all(PromiseAll);
    },
    // 修改全部产品状态
    updateAllCartChecked({dispatch,state},isChecked){
        let PromiseAll = [];
        state.cartList[0].cartInfoList.forEach(item=>{
            let promise = dispatch('updateCheckedById',{skuId:item.skuId,isChecked});
            PromiseAll.push(promise)
        })
        return Promise.all(PromiseAll);
    }
};
const getters ={
    cartList(state){
        return state.cartList[0] || {}
    }
};

export default{
    state,
    mutations,
    actions,
    getters
}