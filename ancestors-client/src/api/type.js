import axios from 'axios'
import {Domain} from './url'
import { req } from './axiosFun';
let url = 'api/types'

// 查询所以的类型
export const typeList = (params) => {return axios.get(`${Domain}/${url}/alls/${params}`)}

// 创建类型
export const typeAdd = (data) => {return req('post',`${Domain}/${url}/add`,data)}

// 增加子类型
export const typeAddChildren = (data) => {return req('post', `${Domain}/${url}/addchildren`,data)}

// 修改大分类
export const typeupdate = (data) => {return req('post', `${Domain}/${url}/update`,data)}

// 修改小的分类
export const typeUpdateChildren = (data) => {return req('post',`${Domain}/${url}/updatechildren`,data)} 

// 删除个分类
export const typedelete = (params) => {return axios.delete(`${Domain}/${url}/delete/${params}`)}

// 删除条小分类
export const typeDleteChildren = (params) => {return axios.delete(`${Domain}/${url}/children/${params}`)}
