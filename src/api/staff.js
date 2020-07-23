import request from "@/utils/request";

export default {
    getList(page, size, paramMap) {
        return request({
            url: `/staffs/search/${page}/${size}`,
            method: "GET",
            data: paramMap
        })
    },

    getById(id) {
        return request({
            url: `/staffs/${id}`,
            method: "GET"
        })
    },

    add(pojo) {
        return request({
            url: "/staffs",
            method: "POST",
            data: pojo
        })
    },

    update(pojo) {
        return request({
            url: `/staffs/${pojo.id}`,
            method: "PUT",
            data: pojo
        })
    },

    delete(id) {
        return request({
            url: `/staffs/${id}`,
            method: "DELETE"
        })
    }
}
