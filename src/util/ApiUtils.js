import {API_BASE_URL} from '../constans'
import { ACCESS_TOKEN } from '../constans/constant';

const request = (options) =>{
    const headers = new Headers({
        'Content-Type': 'application/json'
    })

    if(localStorage.getItem(ACCESS_TOKEN)){
        headers.append('Authorization', localStorage.getItem(ACCESS_TOKEN))
    }

    const defaults = {headers : headers};
    options = Object.assign({}, defaults, options);

    return fetch(options.url, options)
        .then(response => response.json().then(json =>{
            if(!response.ok){
                return Promise.reject(json);
            }
            return json;
        })
    );
};

export function login(loginRequest){
    return request({
        url: API_BASE_URL + "/auth/login",
        method: 'POST',
        body: JSON.stringify(loginRequest)
    });
}

export function signUp(signUpRequest){
    return request({
        url: API_BASE_URL + "/auth/sign-up",
        method: 'POST',
        body: JSON.stringify(signUpRequest)
    });
}

export function checkUsernameAvailability(username){
    return request({
        url: API_BASE_URL + "/user/available?username=" + username,
        method: 'GET'
    })
}

export function checkEmailAvailability(email){
    return({
        url: API_BASE_URL + "/user/available?email="+email,
        method: 'GET'
    });
}