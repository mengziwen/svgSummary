import axios from 'axios';
import { message } from 'ant-design-vue';
// let baseURL2 = process.env.NODE_ENV == 'production' ? 'http://192.168.6.211:8019/' : '/api2/';
const instance = axios.create({
    baseURL:  process.env.NODE_ENV == 'production' ? 'http://192.168.6.211/' : '/api/',
    timeout: 3000,
    validateStatus(status: any) {
        if (status > 400 && status < 500) {
            message.error(`该功能还不完善请稍后再试. status:${status}`);
        }
        return status < 500;
    },
    headers: {
        'APP-ID':'5904',
        'corpId':'123',
        'X-Custom-Header': 'foobar',
        'clientType': 'webapp',
    },
});

const getToken = () => {
    const token = localStorage.getItem('token') || '';
    return 'Bearer ' + token;
};
instance.interceptors.request.use( (conf) => {
    conf.headers.Authorization = getToken();
    return conf;
},  (err) => {
    return Promise.reject(err);
});
instance.interceptors.response.use((res) => {
    let text = res.data.msg;
    if (res.data.ret) {
        switch (res.data.ret) {
            case -5:
                text = 'token失效请重新登录';
                break;
        }
        message.error(`请求错误: ${text}`);
        return Promise.reject(res);
    }
    // if (res.data.code !== 'M0000') {
    //     message.error(`该功能还不完善请稍后再试. ${res.data.msg}`);
    //     return Promise.reject(res);
    // }
    // return res.data.data;
    return res.data;
}, (err) => {
    return Promise.reject(err);
});

const install = (Vue: any) => {
    Vue.prototype.$axios = instance;
};

export interface Axiosconf {
    install?: () => void;
}
export { instance};
