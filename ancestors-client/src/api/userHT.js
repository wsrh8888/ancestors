import axios from 'axios';
import { req } from './axiosFun';
// const Domain = 'http://www.xlmx.xyz:8085'
const Domain = 'http://127.0.0.1:8085'
// 注册接口(*)
export const register = (params) => {return req('post',`${Domain}/api/users/register`,params)}

// 登录接口(*)
export const login = (data) => {return req('post',`${Domain}/api/users/login`,data)}

// 获取所有用户(*)
export const allusers = (params) => {return axios.get(`${Domain}/api/users/alls/${params}`)}

// 修改用户信息(*)
export const update = (data) => {return axios.post(`${Domain}/api/users/update`,data)}

// 删除用户接口(*)
export const deleteUser = (params) => {return axios.delete(`${Domain}/api/users/delete/${params}`)}

// 获取游戏的基本信息(*)
export const profiles = (params) => {return axios.get(`${Domain}/api/games/gamelist/${params}`)}

// 删除游戏信息(*)
export const deletes = (params) => {return axios.delete(`${Domain}/api/games/delete/${params}`)}

// 修改游戏的基本信息(*)
export const upbasic = (params,data) => {return req('post',`${Domain}/api/games/updatebasics/${params}`,data)}

// 增加游戏(*)
export const addgame = (params,data) => {return req('post',`${Domain}/api/games/add/${params}`,data)}

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







