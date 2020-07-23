<template>
    <div>

        <!-- 查询表单 -->
        <el-form :inline="true" :model="paramMap" ref="searchForm" style="margin-top: 20px;">
            <el-form-item prop="name">
                <el-input v-model="paramMap.name" placeholder="请输入名称"></el-input>
            </el-form-item>
            <el-form-item prop="email">
                <el-input v-model="paramMap.email" placeholder="请输入邮箱"></el-input>
            </el-form-item>
            <el-form-item prop="address">
                <el-input v-model="paramMap.address" placeholder="请输入地址"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" icon="el-icon-search" @click="searchData">查询</el-button>
                <el-button type="primary" icon="el-icon-plus" @click="addStaff">新增</el-button>
                <el-button @click="resetForm('searchForm')">重置</el-button>
            </el-form-item>
        </el-form>

        <!-- 表格 -->
        <el-table :data="list" height="680" border style="width: 100%">
            <el-table-column type="index" label="索引" width="60"></el-table-column>
            <el-table-column prop="name" label="姓名" width="160"></el-table-column>
            <el-table-column prop="age" label="年龄" width="60"></el-table-column>
            <el-table-column prop="email" label="邮箱"  width="200"></el-table-column>
            <el-table-column prop="address" label="住址"></el-table-column>
            <el-table-column type="index" prop="操作" width="180">
                <template slot-scope="slot">
                    <el-button size="mini" @click="handleEdit(slot.row.id)">编辑</el-button>
                    <el-button size="mini" @click="handleDelete(slot.row.id)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>

        <!-- 分页 -->
        <el-pagination
            @size-change="sizeChangeHandler"
            @current-change="currentChangeHandler"
            :total="total"
            :page-sizes="[10,20,50]"
            :page-size="pageSize"
            layout="sizes, prev, pager, next, jumper, ->, total, slot"
        >

        </el-pagination>

        <!-- 新增或编辑弹窗 -->
        <el-dialog
            title="员工编辑"
            :visible.sync="dialogVisible"
            width="500px"
        >
            <el-form
                ref="pojoForm"
                status-icon
                :model="pojo"
                label-width="100px"
                label-position="right"
                style="width: 400px;"
                :rules="rules"
            >
                <el-form-item label="姓名" prop="name">
                    <el-input v-model="pojo.name"></el-input>
                </el-form-item>
                <el-form-item label="年龄" prop="age">
                    <el-input v-model="pojo.age"></el-input>
                </el-form-item>
                <el-form-item label="邮箱" prop="email">
                    <el-input v-model="pojo.email"></el-input>
                </el-form-item>
                <el-form-item label="地址" prop="address">
                    <el-input v-model="pojo.address"></el-input>
                </el-form-item>
                <el-form-item>
                    <template>
                        <el-button @click="cancelEdit">取消</el-button>
                        <el-button type="primary" @click="pojo.id === null ? addData('pojoForm') : updateData('pojoForm')">确定</el-button>
                    </template>
                </el-form-item>
            </el-form>
        </el-dialog>
    </div>
</template>

<script>
    import staffApi from "@/api/staff";

    export default {
        data() {
            return {
                list: [],
                total: 0,
                currentPage: 1,
                pageSize: 10,
                paramMap: {
                    name: "",
                    email: "",
                    address: ""
                },
                pojo: {
                    id: null,
                    name: "",
                    age: "",
                    email: "",
                    address: ""
                },
                dialogVisible: false,
                rules: {
                    name: [{required: true, message: '名称不能为空', trigger: 'blur'}],
                    email: [{required: true, message: '邮箱不能为空', trigger: 'blur'}],
                }
            }

        },

        created() {
            this.searchData();
        },

        methods: {
            searchData: function () {
                staffApi.getList(this.currentPage, this.pageSize, this.paramMap).then(response => {
                    const resp = response.data;
                    if(resp.flag) {
                        this.list = resp.data.rows;
                        this.total = resp.data.total;
                    }else {
                        this.$message({
                            message: resp.message,
                            type: "warning"
                        })
                    }
                })
            },

            addStaff: function() {
                this.dialogVisible = true;
                this.$nextTick(() => {
                    this.$refs['pojoForm'].resetFields();
                })
            },

            handleEdit: function (id) {
                staffApi.getById(id).then(response => {
                    const resp = response.data;
                    if(resp.flag) {
                        this.pojo = resp.data;
                    }else {
                        this.$message({
                            message: resp.message,
                            type: "warning"
                        })
                    }
                });
                this.dialogVisible = true;
            },

            handleDelete: function (id) {
                this.$confirm("确定删除此记录吗？", "提示", {
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                    type: "warning"
                }).then(() => {
                    staffApi.delete(id).then(response => {
                        const resp = response.data;
                        if(resp.flag) {
                            this.searchData();
                        }else {
                            this.$message({
                                message: resp.message,
                                type: "warning"
                            })
                        }
                    })
                }).catch(() => {

                })
            },

            sizeChangeHandler: function (pageSize) {
                this.pageSize = pageSize;
                this.searchData();
            },

            currentChangeHandler: function (currentPage) {
                this.currentPage = currentPage;
                this.searchData();
            },

            resetForm:function (formName) {
                this.$refs[formName].resetFields();
            },

            addData: function (formName) {
                this.$refs[formName].validate(valid => {
                    if(valid) {
                        staffApi.add(this.pojo).then(response => {
                            const resp = response.data;
                            if(resp.flag) {
                                this.searchData();
                                this.dialogVisible = false;
                            }else {
                                this.$message({
                                    message: resp.message,
                                    type: "warning"
                                })
                            }
                        })
                    }else {
                        return false;
                    }
                })
            },

            updateData: function (formName) {
                this.$refs[formName].validate(valid => {
                    if(valid) {
                        staffApi.update(this.pojo).then(response => {
                            const resp = response.data;
                            if(resp.flag) {
                                this.dialogVisible = false;
                                this.searchData();
                            }else {
                                this.$message({
                                    message: resp.message,
                                    type: "warning"
                                })
                            }
                        })
                    }else {
                        return false;
                    }
                })
            },

            cancelEdit: function () {
                this.dialogVisible = false;
            }

        },
    }
</script>

<style>

</style>
