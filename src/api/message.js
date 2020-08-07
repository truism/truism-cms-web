import request from "@/utils/request";


export default ({
    getMessageList(pageNum) {
        return request({
            url: "/message/?pageNum=" + pageNum,
            method: "GET"
        })
    },

    deleteMessageById(id) {
        return request({
            url: `/message/${id}`,
            method: "DELETE",
        })
    },

    replyMessage(id) {
        return request({
            url: `/message/reply/${id}`,
            method: "PUT"
        })
    }
})
