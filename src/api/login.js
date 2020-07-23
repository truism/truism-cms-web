import request from '@/utils/request'

export function login(username, password) {
    return request({
        url: "/user/login",
        method: "POST",
        data: {
            username,
            password
        }
    })
}

export function getUserInfo(token) {
    return request({
        url: `/user/info/${token}`,
        method: "GET"
    })
}

export function logout(token) {
    return request({
        url: '/user/logout',
        method: "POST",
        data: {
            token,
        }
    })
}

export function changePasswd(paramMap) {
    return request({
        url: "/user/passwd",
        method: "PUT",
        data: paramMap
    })
}
