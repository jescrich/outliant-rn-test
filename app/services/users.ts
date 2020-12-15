import axios from 'axios';
import BaseService from './base';
import { PagedReqResResponse } from './models/PagedReqResResponse';
import User from '../models/user';

const getUsers = async (page = 0): Promise<PagedReqResResponse<User>> => axios.get(`https://reqres.in/api/users?delay=2&page=${page}`)
  .then((result) => result.data as PagedReqResResponse<User>).catch((e) => {
    throw e;
  });

export default {
  getUsers,
};
//
/// An API Service class based example.
// export default class ApiService extends BaseService {
//
//     public static async get<T>(params: ApiFetchParams): Promise<T> {
//
//         let path = params.entityName;
//         path += params.relatedEntity ? "/" + params.relatedEntity : "";
//         path += params.id ? "/" + params.id : "";
//
//         // let apiUrl = BaseService.getUrl("/back/" + path);
//         //
//         // if (params.filter || params.sort) {
//         //     apiUrl += "?";
//         //
//         //     if (params.filter) {
//         //         apiUrl += "q=" + params.filter;
//         //         if (params.sort) {
//         //             apiUrl += "&";
//         //         }
//         //     }
//         //
//         //     if (params.sort) {
//         //         apiUrl += "sort=" + params.sort;
//         //     }
//         // }
//
//         return axios.get(apiUrl, this.getConfig(apiUrl))
//             .then((result) => {
//
//                 return result.data;
//
//             }).catch((error) => {
//                 throw error;
//             });
//     }
// }
