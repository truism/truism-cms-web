import request from "@/utils/request";

export default {
    getList() {
        return request({
            url: "/supplier/list",
            method: "GET"
        })
    },

    search(page, size, paramMap) {
        return request({
            url: `/supplier/search/${page}/${size}`,
            method: "GET",
            data: paramMap
        })
    },

    getById(id) {
        return request({
            url: `/supplier/${id}`,
            method: "GET"
        })
    },

    add(pojo) {
        return request({
            url: "/supplier",
            method: "POST",
            data: pojo
        })
    },

    update(pojo) {
        return request({
            url: `/supplier/${pojo.id}`,
            method: "PUT",
            data: pojo
        })
    },

    delete(id) {
        return request({
            url: `/supplier/${id}`,
            method: "DELETE"
        })
    },

}
