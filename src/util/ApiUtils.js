import { ACCESS_TOKEN, API_BASE_URL } from '../constans/Constant';

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