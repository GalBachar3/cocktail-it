import getAxiosClient from '.';

export const registerUserFn = async newUser => await getAxiosClient().post(`auth/register`, newUser);

export const loginUserFn = async user => await getAxiosClient().post(`auth/login`, user);

export const googleSignin = (credentialResponse) => {
    return new Promise((resolve, reject) => {
        console.log("googleSignin ...")
        getAxiosClient().post("/auth/google", credentialResponse).then((response) => {
            console.log(response)
            resolve(response.data)
        }).catch((error) => {
            console.log(error)
            reject(error)
        })
    })
}