import request from "@/utils/request";

export default {

    getAllTag() {
      return request({
          url: "/tag/list",
          method: "GET"
      })
    },

    getTagByName(tagName) {
      return request({
          url: `/tag/name/${tagName}`,
          method: "GET"
      })
    },

    getTagById(id) {
        return request({
            url: `/tag/${id}`,
            method: "GET"
        })
    },

    getTagList(pageNum, pageSize) {
        return request({
            url: `/tag/${pageNum}/${pageSize}`,
            method: "GET"
        })
    },

    deleteTag(id) {
        return request({
            url: `/tag/${id}`,
            method: "DELETE"
        })
    },

    addTag(tag) {
        return request({
            url: "/tag/",
            method: "POST",
            data: tag
        })
    },

    updateTag(tag) {
        return request({
            url: "/tag/",
            method: "PUT",
            data: tag
        })
    }
}
