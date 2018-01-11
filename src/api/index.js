'use strict'

import axios from 'axios';

axios.defaults.timeout =  10000;
axios.defaults.retry = 4;
axios.defaults.retryDelay = 1000;


axios.interceptors.response.use(undefined, function axiosRetryInterceptor(err) {
    var config = err.config;
    // If config does not exist or the retry option is not set, reject
    if(!config || !config.retry) return Promise.reject(err);
    
    // Set the variable for keeping track of the retry count
    config.__retryCount = config.__retryCount || 0;
    
    // Check if we've maxed out the total number of retries
    if(config.__retryCount >= config.retry) {
        // Reject with the error
        return Promise.reject(err);
    }
    
    // Increase the retry count
    config.__retryCount += 1;
    
    // Create new promise to handle exponential backoff
    var backoff = new Promise(function(resolve) {
        setTimeout(function() {
            resolve();
        }, config.retryDelay || 1);
    });
    
    // Return the promise in which recalls axios to retry the request
    return backoff.then(function() {
        return axios(config);
    });
});
const suffix = '.json'; // 后缀
const ajax = function (obj) {
    // TODO 遮罩
    debugger;
    let url = obj.url + suffix;
    let type = obj.type || 'get';
    if (type == 'get') {
        axios.get(url, {
            params: obj.params || {}
        }).then((res) => {
            // TODO 遮罩关闭
            obj.success && obj.success(res);
        }).catch( (error) => {
            //TODO 信息提示
        });
    } else {
        let params = new URLSearchParams();
        let objParams = obj.params;
        if (objParams && Object.keys(objParams).length > 0) {
            for (var key in objParams) {
                params.append(key, objParams.key);
            }
        }
        axios.post(url, params, {}).then((res) => {
            // TODO 遮罩关闭
            obj.success && obj.success(res);
        }).catch( (error) => {
            //TODO 信息提示
        });;
    }
}


import { 
    menusApi,
    listDataApi,
    textDataApi,
    bannersApi,
    tabListDataApi
} from './resource';

export default {
    // 菜单
    getMenusApi (success) {
        return ajax({ url: menusApi, success: success });
    },

    // mock 列表数据
    getListDataApi (success) {
        return ajax({ url: listDataApi, success: success });
    },

    // mock 列表数据
    getTextDataApi (success) {
        return ajax({ url: textDataApi, success: success });
    },

    // 跑马灯数据
    getBannersApi (success) {
        return ajax({ url: bannersApi, success: success }); 
    },

    // 首页获取tab对应的数据
    getTabListDataApi (url, id, success) {
        return ajax({ url: url || tabListDataApi, params: {id: id}, success: success }); 
    }
}