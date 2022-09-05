// 登陆与注册模块
import { reqGetCode,reqUserLogin,reqUserRegister,reqUserInfo,reqLogout } from "@/api";
import {setToken,getToken,removeToken} from '@/utils/token'
const state ={
    code:'',
    token:getToken(),
    userInfo: {}
};
const mutations={
    GETCODE(state,code){
        state.code = code
    },
    USERLOGIN(state,token){
        state.token = token;
    },
    GETUSERINFO(state,userInfo){
        state.userInfo = userInfo
    },
    CLEAR(state){
        state.token = '';
        state.userInfo = {};
        removeToken();
    }
};
const actions ={
    // 获取验证码，把验证码返回，正常情况下，后台把验证码发到用户手机上（目前因为贫穷不能这么办doge）
    async getCode({commit},phone){
        let result = await reqGetCode(phone);
        if(result.data.code==200){
            commit("GETCODE",result.data.data);
            return 'ok'
        }else{
            return Promise.reject(new TypeError("error"))
        }
    },
    // 用户注册
    async userRegister({commit},user){
        let result = await reqUserRegister(user);
        if(result.data.code == 200){
            return 'ok'
        }else{
            return Promise.reject(new TypeError("error"))
        }
    },
    // 用户登录
    async userLogin({commit},data){
        let result = await reqUserLogin(data);
        // 服务器下发的token，用户唯一标识
        // 将来经常通过带token找服务器要用户信息进行展示
        if(result.data.code==200){
            commit("USERLOGIN",result.data.data.token);
            // 持久化存储token
            setToken(result.data.data.token);
            return 'ok'
        }else{
            return Promise.reject(new TypeError("error"))
        }
    },
    // 获取用户信息【token】
    async getUserInfo({commit}){
        let result = await reqUserInfo();
        if(result.data.code==200){
            commit('GETUSERINFO',result.data.data);
            return 'ok'
        }else{
            return Promise.reject(new TypeError("error"))
        }
    },
    // 退出登录
    async userLogout({commit}){
        let result = await reqLogout();
        if(result.data.code==200){
            commit("CLEAR");
            return 'ok'
        }else{
            return Promise.reject(new TypeError("error"))
        }
    },
};
const getters ={};
export default {
    state,mutations,actions,getters
}