import axios from 'axios';
import {Domain} from './url'
import { req } from './axiosFun';

// 发送验证码接口
export const sendcode = (data) => {return req('post',`${Domain}/api/users/code`,data)}

// 注册接口(*)
export const register = (data) => {return req('post',`${Domain}/api/users/register`,data)}

// 登录接口(*)
export const login = (data) => {return req('post',`${Domain}/api/users/login`,data)}

// 获取所有用户(*)
export const allusers = (params) => {return axios.get(`${Domain}/api/users/alls/${params}`)}

// 修改用户信息(*)
export const update = (data) => {return axios.post(`${Domain}/api/users/update`,data)}

// 删除用户接口(*)
export const deleteUser = (params) => {return axios.delete(`${Domain}/api/users/delete/${params}`)}

// 上传游戏的logo
export const logo = (data) => {return req('post',`${Domain}/api/games/addlogo`,data)}

// 获取游戏的基本信息(*)
export const profiles = (params) => {return axios.get(`${Domain}/api/games/gamelist/${params}`)}

// 删除游戏信息(*)
export const deletes = (params) => {return axios.delete(`${Domain}/api/games/delete/${params}`)}

// 修改游戏的基本信息(*)
export const upbasic = (data) => {return req('post',`${Domain}/api/games/updatebasics/`,data)}

// 增加游戏(*)
export const addgame = (data) => {return req('post',`${Domain}/api/games/add/`,data)}

//获取游戏的下载信息列表(*)
export const downloadlist = (params) => {return axios.get(`${Domain}/api/games/downloadlist/${params}`)}

// 修改游戏的下载信息(*)
export const updatedown = (data) => {return req('post',`${Domain}/api/games/updatedown`,data)}

// 获取游戏的更新日志(*)
export const getLog = (params) => {return axios.get(`${Domain}/api/games/log/${params}`)}

// 添加游戏的更新日志(*)
export const addLog = (data) => {return req('post',`${Domain}/api/games/addlog`,data)}

// 修改游戏的更新日志(*)
export const updateLog = (data) => {return req('post',`${Domain}/api/games/updatelog`,data)}

// 删除游戏的某条更新日志(*)
export const deleteLog = (data) => {return req('post',`${Domain}/api/games/deletelog`,data)}

// 获取游戏截图
export const gameImg = (params) => {return axios.get(`${Domain}/api/games/gameImg/${params}`)}


export const addimg = (data) => {return req('post',`${Domain}/api/games/addimg`,data)}


// 添加游戏截图
export const screenshot = (data) => {return req('post',`${Domain}/api/games/screenshot`,data)}

// 
export const test = (data) => {return req('post',`${Domain}/test`,data)}



// 文章接口

// 获取文章
export const articlelist = (params) => {return axios.get(`${Domain}/api/articles/all/${params}`)}

//增加文章
export const articleadd = (data) => {return  req('post',`${Domain}/api/articles/add`,data)}

// 删除文章
export const articledelete = (params) => {return axios.delete(`${Domain}/api/articles/delete/${params}`)}

// 类型的增加