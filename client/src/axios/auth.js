import {getUnauthenticatedClient} from '.';

export const registerUserFn = async newUser => await getUnauthenticatedClient().post(`auth/register`, newUser);

export const loginUserFn = async user => await getUnauthenticatedClient().post(`auth/login`, user);

export const googleSignin = (credentialResponse) => {
    return new Promise((resolve, reject) => {
        console.log("googleSignin ...")
        getUnauthenticatedClient().post("/auth/google", credentialResponse).then((response) => {
            console.log(response)
            resolve(response.data)
        }).catch((error) => {
            console.log(error)
            reject(error)
        })
    })
}