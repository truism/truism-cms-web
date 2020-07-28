<template>
    <div>
        <!-- 表单 -->
        <el-form :inline="true" ref="tagForm" status-icon
                 style="margin-top: 35px; margin-left: 40px;">
                <el-form-item prop="tagName">
                    <el-input type="text" v-model="tagName" size="small" placeholder="请输入标签名"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" icon="el-icon-search" size="small" @click="searchTag">搜索</el-button>
                    <el-button type="primary" icon="el-icon-plus" size="small" @click="addTag('tag')">新增</el-button>
                </el-form-item>
        </el-form>

        <!-- 表格 -->
        <el-table
                :data="tagList"
                style="width: 100%;" height="580">
                <el-table-column type="index" label="index" width="110"></el-table-column>
                <el-table-column
                        label="Name"
                        prop="name">
                </el-table-column>
                <el-table-column align="right">
                    <template slot-scope="scope">
                        <el-button size="mini" type="primary" @click="updateTag(scope.row.id)">编辑</el-button>
                        <el-button size="mini" type="danger" @click="deleteTag(scope.row.id)">删除</el-button>
                    </template>
                </el-table-column>
        </el-table>

        <!-- 分页 -->
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

        <!-- 弹窗 -->
        <el-dialog title="编辑标签" :visible.sync="dialogFormVisible" width="20%">
            <el-form :model="tag" ref="tag" :inline="true" status-icon>
                <el-form-item label="名称" size="medium" prop="name">
                    <el-input v-model="tag.name" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="addOrUpdate">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>

    import tagApi from "@/api/tag"

    export default {
        data() {
            return {
                tagList: [],
                tagName: "",
                pageNum: 1,
                pageSize: 10,
                total: 0,
                tag: {
                    id: null,
                    name: "",
                },
                dialogFormVisible: false
            }
        },
        created() {
            this.getAllTag();
        },
        methods: {

            getAllTag: function() {
                tagApi.getAllTag().then(response => {
                    const resp = response.data;
                    if(resp.flag) {
                        this.tagList = resp.data;
                        this.pageSize = 10;
                        this.pageNum = 0;
                        this.total = this.tagList.length;
                    }
                })
            },

            getTagList: function () {
                tagApi.getTagList(this.pageNum, this.pageSize).then(response => {
                    const resp = response.data;
                    if(resp.flag) {
                        this.tagList = resp.data.data;
                        this.pageSize = resp.data.pageSize;
                        this.pageNum = resp.data.pageNum;
                        this.total = resp.data.total;
                    }
                })
            },

            handleSizeChange: function (val) {
                this.pageSize = val;
                this.getTagList();
            },

            handleCurrentChange: function (val) {
                this.pageNum = val;
                this.getTagList();
            },

            searchTag: function () {
                tagApi.getTagByName(this.tagName).then(response => {
                    const resp = response.data;
                    if(resp.flag) {
                        this.tagList = resp.data;
                    }
                })
            },

            addTag: function (formName) {
                this.dialogFormVisible = true;
                this.$nextTick(() => {
                    this.$refs[formName].resetFields();
                });
            },

            addData: function () {
                tagApi.addTag(this.tag).then(response => {
                    const resp = response.data;
                    if(resp.flag) {
                        this.dialogFormVisible = false;
                        this.getAllTag();
                    }
                })
            },

            updateTag: function (id) {
                tagApi.getTagById(id).then(response => {
                    const resp = response.data;
                    if(resp.flag) {
                        this.tag = resp.data;
                    }
                });
                this.dialogFormVisible = true;
            },

            updateData: function() {
                tagApi.updateTag(this.tag).then(response => {
                    const  resp = response.data;
                    if(resp.flag) {
                        this.dialogFormVisible = false;
                        this.getAllTag();
                    }
                })
            },

            deleteTag: function (id) {
                this.$confirm("是否删除此记录?", "提示", {
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                    type: "warning"
                }).then(() => {
                    tagApi.deleteTag(id).then(response => {
                        const  resp = response.data;
                        if(resp.flag) {
                            this.getAllTag();
                        }
                    })
                }).catch(() => {
                    this.$message({
                        message: "已取消删除",
                        type: "info"
                    })
                });
            },

            addOrUpdate() {
                if(this.tag.id === null) {
                    this.addData();
                }else {
                    this.updateData();
                }
            }
        }
    }
</script>

<style scoped>

</style>
