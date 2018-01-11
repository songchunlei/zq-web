'use strict'

import { API_ROOT } from './config.js';

//const reUrl = '/zq-portal';
const reUrl = '/static/mock/';

const apiZq = {
    menus: reUrl + 'menus', // 首页栏目数据
    listData: reUrl + 'list', // 列表数据
    textData: reUrl + 'text', // 文本数据
    bannersData: reUrl + 'banners', // 首页跑马灯数据
    tabListData: reUrl + 'homeTabList', // 首页获取tab数据 第一个模块
}

export const menusApi = API_ROOT.concat(apiZq.menus);
export const listDataApi = API_ROOT.concat(apiZq.listData);
export const textDataApi = API_ROOT.concat(apiZq.textData);
export const bannersApi = API_ROOT.concat(apiZq.bannersData);
export const tabListDataApi = API_ROOT.concat(apiZq.tabListData);

