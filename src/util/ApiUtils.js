import { ACCESS_TOKEN, API_BASE_URL } from '../constans/Constant';

const request = (options) => {
    let headers = new Headers({
        'Content-Type': 'application/json',
    })
    
    if(localStorage.getItem(ACCESS_TOKEN)) {
        headers.append('Authorization', localStorage.getItem(ACCESS_TOKEN))
    }

    const defaults = {headers: headers};
    options = Object.assign({}, defaults, options);

    return fetch(options.url, options)
    .then(response => 
        response.json().then(json => {
            if(!response.ok) {
                return Promise.reject(json);
            }
            return json;
        })
    );
};

export function login(loginRequest){
    //localStorage.removeItem(ACCESS_TOKEN);
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

export function authenticatedUser(){
    return request({
        url: API_BASE_URL + "/auth/authenticated",
        method: 'GET',
    });
}

export function checkUsernameAvailability(username){
    return request({
        url: API_BASE_URL + "/user/available?username=" + username,
        method: 'GET'
    });
}

export function checkEmailAvailability(email){
    return request({
        url: API_BASE_URL + "/user/available?email="+email,
        method: 'GET'
    });
}

export function change(password){
    return request({
        url: API_BASE_URL + "/change",
        method: 'POST',
        body: JSON.stringify(password)
    });
}

export function forgot(username){
    return request({
        url: API_BASE_URL + "/forgot",
        method: 'POST',
        body: JSON.stringify(username)
    });
}

// Methods

export function post(json, url){
    return request({
        url: API_BASE_URL + url,
        method: 'POST',
        body: JSON.stringify(json)
    });
}

export function get(url){
    return request({
        url: API_BASE_URL + url,
        method: 'GET',
    });
}

export function del(url){
    return request({
        url: API_BASE_URL + url,
        method: 'DELETE',
    });
}

export function put(json, url){
    return request({
        url: API_BASE_URL + url,
        method: 'PUT',
        body: JSON.stringify(json)
    });
}