import React from "react";
import {store} from "../index";
import {LOGOUT_USER, TOKEN_REFRESHED} from "../redux/actiontype/UserActionTypes";
import axios from "axios";
import i18next from "i18next";

const API = axios.create({
    baseURL: process.env.REACT_APP_REST_API_URL,
    timeout: 10000
})

API.interceptors.response.use(
    (response) => {
        return response;
    },
    function (error) {
        const originalRequest = error.config;
        if (
            error.response.status === 401 &&
            store.getState().userState.loggedIn &&
            !originalRequest._retry
        ) {
            originalRequest._retry = true;
            return API
                .get(`${process.env.REACT_APP_REST_API_URL}/auth/access-token`)
                .then((res) => {
                    if (res.status === 200) {
                        store.dispatch({type: TOKEN_REFRESHED, accessToken: res.data.accessToken});
                        return axios(originalRequest);
                    }
                }).catch(error => {
                    store.dispatch({type:LOGOUT_USER})
                    return Promise.reject(error);
                });
        }
        return Promise.reject(error);
    }
);
API.interceptors.request.use(
    (config) => {
        config.headers['Content-Type'] = 'application/json';
        config.headers['Accept-Language'] = i18next.language;
        config.withCredentials = true;
        if (store.getState().userState.accessToken) {
            config.headers['Authorization'] = 'Bearer ' + store.getState().userState.accessToken;
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default API;

export function getUrlParameter(url: string, name: string) {
    name = name.replace(/[\\[]/, '\\[').replace(/[\]]/, '\\]');
    let regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    let results = regex.exec(url);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
};


export function isEmailValid(email: string): boolean {
    let pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
    return pattern.test(email);
}


export function isPasswordValid(password: string): boolean {
    let pattern = new RegExp(/^(?=.*[\d])(?=.*[A-Z])(?=.*[a-z])[\w!@#$%^&*]{8,}$/);
    return pattern.test(password);
}


export function getFormControlClass(validationStarted: boolean, valid: boolean): string {
    return !validationStarted ? 'form-control' : valid ? "form-control is-valid" : "form-control is-invalid";
}

export interface AccountActivationRequest {
    token: string
}
