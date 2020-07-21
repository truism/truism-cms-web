import request from "@/utils/request";

export default {
    search(page, size, searchParam) {
        return request({
            url: `/goods/search/${page}/${size}`,
            method: "GET",
            data: searchParam
        })
    },

    add(pojo) {
        return request({
            url: "/goods",
            method: "POST",
            data: pojo
        })
    },

    getById(id) {
        return request ({
            url: `/goods/${id}`,
            method: "GET"
        })
    },

    update(pojo) {
        return request({
            url: `/goods/${pojo.id}`,
            method: "PUT",
            data: pojo
        })
    },

    delete(id) {
        return request({
            url: `/goods/{id}`,
            method: "DELETE"
        })
    },
}
