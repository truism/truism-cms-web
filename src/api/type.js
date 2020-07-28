import request from "@/utils/request";

export default {

    getAllType() {
        return request({
            url: "/type/all",
            method: "GET"
        })
    },

    getTypeList(typeName) {
        return request({
            url: "/type/list" + "?name=" + typeName,
            method: "GET"
        })
    },

    getTypeById(id) {
        return request({
            url: `/type/${id}`,
            method: "GET"
        })
    },

    updateData(type) {
        return request({
            url: "/type/",
            method: "PUT",
            data: type
        })
    },

    deleteType(id) {
        return request({
            url: `/type/${id}`,
            method: "DELETE"
        })
    },

    addType(type) {
        return request({
            url: "/type/",
            method: "POST",
            data: type
        })
    }
}
