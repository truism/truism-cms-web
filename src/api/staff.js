import request from "@/utils/request";

export default {
    getList(currentPage, pageSize) {
        return request()({
            url: `/staffs/${currentPage}/${pageSize}`,
            method: "GET"
        })
    },

    getById(id) {
        return request({
            url: `/staffs/${id}`,
            method: "GET"
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
    },
}
