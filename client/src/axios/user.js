import getAxiosClient from '.';

export const getAllUsersFn = async () => (await getAxiosClient().get('users/all')).data;

export const getUsersByFilterFn = async filter => filter.trim().length ? (await getAxiosClient().get(`users/filter/${filter}`)).data : [];