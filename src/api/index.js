'use strict'

import axios from 'axios';
import { Loading } from 'element-ui';

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
const loadingOpts = { // 遮罩层配置项
    lock: true,
    text: '加载中...',
    spinner: 'el-icon-loading',
    background: 'rgba(0, 0, 0, 0.4)'
}
const ajax = function (obj) {
    // TODO 遮罩
    let loadingInstance = Loading.service(loadingOpts);
    let url = obj.url + suffix;
    let type = obj.type || 'get';
    // if (obj.params && obj.params.columnId && obj.params.columnId == 'BEA64C2173AB4B5796D547F32A6BFDF3') {
    //     console.log('htm');
    //     url = obj.url + '.htm';
    // }
    
    if (type == 'get') {
        axios.get(url, {
            params: obj.params || {}
        }).then((res) => {
            // TODO 遮罩关闭
            loadingInstance.close();
            obj.success && obj.success(res);
        }).catch( (error) => {
            //TODO 信息提示
            loadingInstance.close();
        });
    } else {
        let params = new URLSearchParams();
        let objParams = obj.params;
        if (objParams && Object.keys(objParams).length > 0) {
            for (var key in objParams) {
                params.append(key, objParams[key]);
            }
        }
        axios.post(url, params, {}).then((res) => {
            // TODO 遮罩关闭
            loadingInstance.close();

            obj.success && obj.success(res);
        }).catch( (error) => {
            //TODO 信息提示
            loadingInstance.close();
        });;
    }
}


import { 
    menusApi,
    listDataApi,
    textDataApi,
    bannersApi,
    tabListDataApi,
    groupImagesApi,
    homeBtnsApi,
    membersApi,
    groupSummaryDetailApi,
    newsListByTypeApi,
    newsDetailApi,
    businessDetailApi,
    companyCultureApi,
    doStudyListByTypeApi,
    doStudyDetailApi,
    jobsApi,
    memberDetailApi,
    columnDetailApi,
    platformDetailApi,

    sysListDataApi,
    sysTextDataApi
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
    },

    // 首页集团风采图片
    getGroupImagesApi (success) {
        return ajax({ url: groupImagesApi, success: success }); 
    },

    // 首页快捷菜单
    getHomeBtnsApi (url, success) {
        return ajax({ url: url || homeBtnsApi, success: success }); 
    },

    // 首页成员单位
    getMembersApi (url, success) {
        return ajax({ url: url || membersApi, success: success }); 
    },

    //集团简介详情
    getGgroupSummaryDetailApi (url, id, success) {
        return ajax({ url: url || groupSummaryDetailApi, params: {id: id}, success: success }); 
    },

    //根据新闻类型获取新闻列表  
    getNewsListByTypeApi (url, type, success) {
        return ajax({ url: url || newsListByTypeApi, params: {type: type}, success: success }); 
    },

    //新闻详情
    getNewsDetailApi (url, id, success) {
        return ajax({ url: url || newsDetailApi, params: {id: id}, success: success }); 
    },

    //主营业务详情
    getBusinessDetailApi (url, id, success) {
        return ajax({ url: url || businessDetailApi, params: {id: id}, success: success }); 
    },

    //企业文化
    getCompanyCultureApi (url, id, success) {
        return ajax({ url: url || companyCultureApi, params: {id: id}, success: success }); 
    },

    //根据类型获取两学一做列表  
    getDoStudyListByTypeApi (url, type, success) {
        return ajax({ url: url || doStudyListByTypeApi, params: {type: type}, success: success }); 
    },

    //两学一做详情
    getDoStudyDetailApi (url, id, success) {
        return ajax({ url: url || doStudyDetailApi, params: {id: id}, success: success }); 
    },

    //人才招聘
    getJobsApi (url, id, success) {
        return ajax({ url: url || jobsApi, params: {id: id}, success: success }); 
    },

    //成员单位详情
    getMemberDetailApi (url, id, success) {
        return ajax({ url: url || memberDetailApi, params: {id: id}, success: success }); 
    },

    //辅助栏目详情
    getColumnDetailApi (url, id, success) {
        return ajax({ url: url || columnDetailApi, params: {id: id}, success: success }); 
    },

    // 五大平台详情
    getPlatformDetailApi (url, id, success) {
        return ajax({ url: url || platformDetailApi, params: {id: id}, success: success }); 
    },

    // 获取list数据
    getListDataApi (url, params, success) {
        return ajax({ url: sysListDataApi + url, params: params, success: success }); 
    },
    // 获取文本信息
    getTextDataApi (url, params, success) {
        return ajax({ url: sysTextDataApi + url, params: params, success: success }); 
    }

}