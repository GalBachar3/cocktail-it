import getAxiosClient from '.';

export const registerUserFn = async newUser => await getAxiosClient().post(`auth/register`, newUser);

export const loginUserFn = async user => await getAxiosClient().post(`auth/login`, user);