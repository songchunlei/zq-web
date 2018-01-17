'use strict'

import { API_ROOT } from './config.js';

//const reUrl = '/zq-portal';
const reUrl = '/static/mock/';
const reUrlSer = '/zq-web';

const apiZq = {
    menus: reUrl + 'menus', // 首页栏目数据
    listData: reUrl + 'list', // 列表数据
    textData: reUrl + 'text', // 文本数据
    bannersData: reUrl + 'banners', // 首页跑马灯数据
    tabListData: reUrl + 'homeTabList', // 首页获取tab数据 第一个模块
    groupImages: reUrl + 'groupImages', // 首页集团风采
    homeBtns: reUrl + 'homeBtns', // 首页快捷菜单(酒店、培训中心...)
    members: reUrl + 'members', // 首页成员单位
    groupSummaryDetail: reUrl + 'groupSummaryDetail', //集团简介详情
    newsListByType: reUrl + 'list', //根据新闻类型获取新闻列表
    newsDetail: reUrl + 'newsDetail', //新闻详情
    businessDetail: reUrl + 'businessDetail', //主营业务详情
    companyCulture: reUrl + 'companyCulture', //企业文化
    doStudyListByType: reUrl + 'doStudyListByType', //根据两学一做类型获取列表
    doStudyDetail: reUrl + 'doStudyDetail', //两学一做详情
    jobs: reUrl + 'jobs', //人才招聘
    memberDetail: reUrl + 'memberDetail', //成员单位详情
    columnDetail: reUrl + 'columnDetail', //辅助栏目详情
    platformDetail: reUrl + 'platformDetail', //五大平台详情

    sysListDataApi: reUrl + '/', // 所有list数据的 公用api前缀
    sysTextDataApi: reUrl + '/', // 所有text数据的 公用api前缀
}

export const menusApi = API_ROOT.concat(apiZq.menus);
export const listDataApi = API_ROOT.concat(apiZq.listData);
export const textDataApi = API_ROOT.concat(apiZq.textData);
export const bannersApi = API_ROOT.concat(apiZq.bannersData);
export const tabListDataApi = API_ROOT.concat(apiZq.tabListData);
export const groupImagesApi = API_ROOT.concat(apiZq.groupImages);
export const homeBtnsApi = API_ROOT.concat(apiZq.homeBtns);
export const membersApi = API_ROOT.concat(apiZq.members);
export const groupSummaryDetailApi = API_ROOT.concat(apiZq.groupSummaryDetail);
export const newsListByTypeApi = API_ROOT.concat(apiZq.newsListByType);
export const newsDetailApi = API_ROOT.concat(apiZq.newsDetail);
export const businessDetailApi = API_ROOT.concat(apiZq.businessDetail);
export const companyCultureApi = API_ROOT.concat(apiZq.companyCulture);
export const doStudyListByTypeApi = API_ROOT.concat(apiZq.doStudyListByType);
export const doStudyDetailApi = API_ROOT.concat(apiZq.doStudyDetail);
export const jobsApi = API_ROOT.concat(apiZq.jobs);
export const memberDetailApi = API_ROOT.concat(apiZq.memberDetail);
export const columnDetailApi = API_ROOT.concat(apiZq.columnDetail);
export const platformDetailApi = API_ROOT.concat(apiZq.platformDetail);

export const sysListDataApi = API_ROOT.concat(apiZq.sysListDataApi);
export const sysTextDataApi = API_ROOT.concat(apiZq.sysTextDataApi);