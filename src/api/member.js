import request from "@/utils/request"

export default {
    getList() {
        return request({
            url: "/member/list",
            method: "GET",
        })
    },

    search(page, size, searchMap) {
        return request({
            url: `/member/list/search/${page}/${size}`,
            method: "GET",
            data: searchMap
        })
    },

    add(pojo) {
        return request({
            url: "/member",
            method: "POST",
            data: pojo
        })
    },

    getById(id) {
        return request({
            url: `/member/${id}`,
            method: "GET"
        })
    },

    update(pojo) {
        return request({
            url: `/member/${pojo.id}`,
            method: "PUT",
            data: pojo
        })
    },

    deleteById(id) {
        return request({
            url: `/member/${id}`,
            method: 'DELETE'
        })
    }
}