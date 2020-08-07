<template>
    <div>
        <template style="margin-top: 36px;">
            <template>
                <el-table
                        :data="messageList"
                        style="width: 100%">
                    <el-table-column type="expand">
                        <template slot-scope="scope">
                            <el-form label-position="left" class="demo-table-expand">
                                <el-form-item label="用户Email：">
                                    <span>{{ scope.row.userEmail }}</span>
                                </el-form-item>
                                <p></p>
                                <el-form-item label="留言内容：">
                                    <span>{{ scope.row.content }}</span>
                                </el-form-item>
                            </el-form>
                        </template>
                    </el-table-column>
                    <el-table-column
                            label="序号"
                            width="180"
                            type="index">
                    </el-table-column>
                    <el-table-column
                            label="留言时间"
                            prop="publishTime">
                    </el-table-column>
                    <el-table-column
                            label="是否已回复"
                            prop="reply">
                        <template slot-scope="scope">
                            {{scope.row.reply === false ? "否" : "是"}}
                        </template>
                    </el-table-column>
                    <el-table-column
                        label="操作"
                        >
                        <template slot-scope="scope">
                            <el-button
                                    size="mini"
                                    type="primary"
                                    @click="handleReply(scope.row.id)">回复</el-button>
                            <el-button
                                    size="mini"
                                    type="danger"
                                    @click="handleDelete(scope.row.id)">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </template>
        </template>
        <el-pagination
                 style="float: right"
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="pageNum"
                :page-sizes="[10, 20, 50]"
                :page-size="pageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total">
        </el-pagination>
    </div>
</template>

<script>

    import messageApi from "@/api/message";

    export default {
        data() {
            return {
                messageList: [{
                    id: null,
                    userEmail: "",
                    publishTime: "",
                    reply: false,
                    content: "",
                }],
                pageNum: 1,
                pageSize: 10,
                total: 0,
                tableRowClassName: 'warning-row',
            };
        },

        created() {
            this.getMessageList();
        },

        methods: {
            getMessageList: function () {
                messageApi.getMessageList(this.pageNum).then(response => {
                    const resp = response.data;
                    console.log(resp);
                    if(resp.flag)  {
                        this.messageList = resp.data.data;
                        this.pageNum = resp.data.pageNum;
                        this.pageSize = resp.data.pageSize;
                        this.total = resp.data.total;
                    }
                });
            },

            handleSizeChange: function (val) {

            },

            handleCurrentChange: function (val) {
                this.pageNum = val;
                this.getMessageList();
            },

            handleReply: function (id) {
                messageApi.replyMessage(id).then(response => {
                    const resp = response.data;
                    if (resp.flag) {
                        this.getMessageList();
                    }
                })
            },

            handleDelete: function (id) {
                this.$confirm("确定删除此条记录吗？", "提示", {
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                    type: "warning"
                }).then(() => {
                    messageApi.deleteMessageById(id).then(response => {
                        const resp = response.data;
                        if(resp.flag) {
                            this.getMessageList();
                        }
                    })
                }).catch(() => {
                    this.$message({
                        message: "已取消",
                        type: "info"
                    })
                })
            },
        },

        filters: {

        }
    }
</script>

<style scoped>

</style>
