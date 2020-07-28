<template>
    <div>
        <!-- 查询表单 -->
        <el-form ref="blogForm" :inline="true" :model="searchParam.paramMap" size="mini" style="margin-top: 30px; margin-bottom: 18px;" status-icon>
            <el-form-item prop="title" label="标题">
                <el-input placeholder="标题" v-model="searchParam.paramMap.title"></el-input>
            </el-form-item>
            <el-form-item prop="typeId">
                <el-select v-model="searchParam.paramMap.typeId" placeholder="分类">
                    <el-option
                            v-for="item in typeList"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item prop="tagsId">
                <el-select v-model="searchParam.paramMap.tagsId" multiple placeholder="标签" size="mini">
                    <el-option
                            v-for="item in tagList"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="发布时间" prop="updateTime">
                <el-date-picker
                        v-model="searchParam.paramMap.updateTime"
                        type="date"
                        placeholder="选择日期">
                </el-date-picker>
            </el-form-item>
            <el-form-item>
                <el-button size="mini" type="primary" icon="el-icon-search" @click="searchBlog">搜索</el-button>
                <el-button size="mini" type="info" icon="el-icon-delete" @click="resetFields('blogForm')">清空</el-button>
            </el-form-item>
        </el-form>

        <!-- 表格 -->
        <el-table
                height="580"
                :data="blogList"
                style="width: 100%"
                :default-sort = "{prop: 'updateTime', order: 'descending'}">
            <el-table-column
                    type="index"
                    label="序号"
                    sortable
                    width="180">
            </el-table-column>
            <el-table-column
                    prop="title"
                    label="博客标题"
                    sortable
                    width="180">
            </el-table-column>
            <el-table-column
                    prop="updateTime"
                    sortable
                    label="发布时间">
            </el-table-column>
            <el-table-column
                    prop="views"
                    sortable
                    label="浏览量">
            </el-table-column>
            <el-table-column
                    label="分类">
                <template slot-scope="scope">
                    {{scope.row.type.name}}
                </template>
            </el-table-column>
            <el-table-column
                    label="标签">
                <template slot-scope="scope">
                    <el-tag
                            effect="light"
                            v-for="tag in scope.row.tagList"
                            :key="tag.id"
                            type="info">
                        {{tag.name}}
                    </el-tag>
                </template>
            </el-table-column>
            <el-table-column
                    prop="draft"
                    label="是否草稿">
                <template slot-scope="scope">
                    {{scope.row.draft ? "否" : "是"}}
                </template>
            </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button
                            size="mini"
                            @click="handleEdit(scope.row.id)">编辑</el-button>
                    <el-button
                            size="mini"
                            type="danger"
                            @click="handleDelete(scope.row.id)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>

        <!-- 分页 -->
        <el-pagination
                 style="float: right; margin-top: 8px;"
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="searchParam.pageNum"
                :page-sizes="[10, 20, 40]"
                :page-size="searchParam.pageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total">
        </el-pagination>
    </div>
</template>

<script>
    import blogApi from "@/api/blog"
    import tagApi from "@/api/tag"
    import typeApi from "@/api/type"

    export default {
        data() {
            return {
                blogList: [],
                typeList: [],
                tagList: [],
                total: 0,
                searchParam: {
                    pageNum: 1,
                    pageSize: 10,
                    paramMap: {
                        title: "",
                        typeId: null,
                        tagsId: [],
                        updateTime: null,
                        draft: null
                    }
                }
            }
        },

        created() {
            this.getBlogList();
            this.getTagList();
            this.getTypeList();
        },

        methods: {
            getTagList: function() {
                tagApi.getAllTag().then(response => {
                    const resp = response.data;
                    if(resp.flag) {
                        this.tagList = resp.data;
                    }
                })
            },

            getTypeList: function() {
                typeApi.getAllType().then(response => {
                    const resp = response.data;
                    if(resp.flag) {
                        this.typeList = resp.data;
                    }
                })
            },

            getBlogList: function () {
                blogApi.getBlogList(this.searchParam).then(response => {
                    const resp = response.data;
                    if(resp.flag) {
                        this.total = resp.data.total;
                        this.blogList = resp.data.data;
                    }
                })
            },

            handleEdit: function (id) {

            },

            handleDelete: function (id) {
                this.$confirm("确定删除此条记录吗？", "提示", {
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                    type: "warning"
                }).then(() => {
                    blogApi.deleteBlogById(id).then(response => {
                        const resp = response.data;
                        if(resp.flag) {
                            this.getBlogList();
                        }
                    })
                }).catch(() => {
                    this.$message({
                        message: "已取消",
                        type: "info"
                    })
                })
            },

            searchBlog: function () {
                this.getBlogList();
            },

            resetFields: function (formName) {
                this.$refs[formName].resetFields();
            },

            handleSizeChange: function (val) {
                this.searchParam.pageSize = val;
                this.getBlogList();
            },

            handleCurrentChange: function (val) {
                this.searchParam.pageNum = val;
                this.getBlogList();
            },
        },

         filters: {
            formatTag: function(tagId, tagList) {
                for (let tag of tagList) {
                    if(id === tag.id) {
                        return tag.name;
                    }
                }
            },
         }
    }
</script>

<style>

</style>
