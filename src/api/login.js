import request from '@/utils/request';

export function loginByUsername(username, password) {
    return request({
        url: '/login',
        method: 'post',
        params: {
            'username': username,
            'password': password
        }
    });
}

export function getUserInfo(token) {
    return request({
        url: '/service/user/getUserInfo',
        method: 'get',
        params: {
            token
        }
    });
}

export function logout() {
    return request({
        url: '/logout',
        method: 'post'
    });
}

export function getUrl(params) {
    return request({
        url: '/service/menu/list',
        method: 'get',
        params
    });
}

export function menuList() {
    return request({
        url: '/service/menu',
        method: 'get'
    });
}
