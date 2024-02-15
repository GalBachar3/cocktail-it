import getAxiosClient from '.';

export const getAllUsersFn = async () => (await getAxiosClient().get('api/users/all')).data;

export const getUsersByFilterFn = async filter => filter.trim().length ? (await getAxiosClient().get(`api/users/filter/${filter}`)).data : [];