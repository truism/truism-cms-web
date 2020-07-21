<template>
    <div>

        <!--   条件域     -->
        <el-form ref="searchForm" :inline="true" style="margin-top: 25px;" :model="searchMap">
            <el-form-item prop="name">
                <el-input v-model="searchMap.name" placeholder="请输入供应商名称" ></el-input>
            </el-form-item>
            <el-form-item prop="linkman" v-if="!isDialog">
                <el-input v-model="searchMap.linkman" placeholder="请输入联系人"></el-input>
            </el-form-item>
            <el-form-item prop="mobile" v-if="!isDialog">
                <el-input v-model="searchMap.mobile" placeholder="请输入手机号"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="searchData">查询</el-button>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="addSupplier" v-if="!isDialog">新增</el-button>
            </el-form-item>
            <el-form-item>
                <el-button @click="resetFormData('searchForm')" v-if="!isDialog">重置</el-button>
            </el-form-item>
        </el-form>

        <!--    表格    -->
        <el-table :data="list" height="680"  border style="width: 100%"
                  :highlighht-current-row="isDialog" @current-change="clickCurrentChange">
            <el-table-column type="index" label="序号" width="60"></el-table-column>
            <el-table-column prop="name" label="供应商名称"></el-table-column>
            <el-table-column prop="linkman" label="联系人" width="80"></el-table-column>
            <el-table-column prop="mobile" v-if="!isDialog" label="手机号" width="120"></el-table-column>
            <el-table-column prop="remark" v-if="!isDialog" label="注释"></el-table-column>
            <el-table-column type="index" label="操作" v-if="!isDialog" width="150">
                <template slot-scope="scope">
                    <el-button size="mini" @click="handleEdit(scope.row.id)">编辑</el-button>
                    <el-button size="mini" type="danger" @click="handleDelete(scope.row.id)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>

        <!-- 分页插件 -->
        <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="[10,20,50]"
            :page-size="pageSize"
            :layout="!isDialog ? 'total, sizes, prev, pager, next, jumper' : 'prev, pager, next'"
            :total="total"
        >

        </el-pagination>

        <!-- 编辑域 -->
        <el-dialog title="供应商编辑" :visible.sync="dialogFormVisible" width="500px;">
            <el-form
                status-icon
                ref="editForm"
                :model="pojo"
                label-width="100px"
                label-position="right"
                style="width: 400px;"
                :rules="rules"
            >
                <el-form-item label="供应商名称" prop="name">
                    <el-input v-model="pojo.name"></el-input>
                </el-form-item>
                <el-form-item label="供应商联系人" prop="linkman">
                    <el-input v-model="pojo.linkman"></el-input>
                </el-form-item>
                <el-form-item label="手机号" prop="mobile">
                    <el-input v-model="pojo.mobile"></el-input>
                </el-form-item>
                <el-form-item label="描述" prop="remark">
                    <el-input type="textarea" v-model="pojo.remark" :autosize="{minRows: 2, maxRows: 4}"
                              placeholder="请输入描述"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取消</el-button>
                <el-button type="primary" @click="pojo.id === null ? addData('editForm') : editData('editForm')">确定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>

    import supplier from "@/api/supplier";

    export default {
        data() {
            return {
                list: [],
                currentPage: 1,
                pageSize: 10,
                total: 0,
                searchMap: {
                    id: null,
                    name: "",
                    linkman: "",
                    mobile: "",
                },
                dialogFormVisible: false,
                pojo: {
                  id: null,
                  name: "",
                  linkman: "",
                  mobile: "",
                  remark: "",
                },
                rules: {
                    name: [{required: true, message: "供应商名称不能为空", trigger: "blur"}],
                    linkman: [{required: true, message: "联系人不能为空", trigger: "blur"}],
                    mobile: [{required: true, message: "手机号不能为空", trigger: "blur"}],
                }
            }
        },

        props: {
            isDialog: Boolean,
        },

        created() {
            this.fetchData();
        },

        methods: {
            fetchData: function () {
                supplier.search(this.currentPage, this.pageSize, this.searchMap).then(response => {
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

            searchData: function() {
                supplier.search(this.currentPage, this.pageSize, this.searchMap).then(response => {
                    const  resp = response.data;
                    if(resp.flag) {
                        this.total = resp.data.total;
                        this.list = resp.data.rows;
                    }else {
                        this.$message({
                            message: resp.message,
                            type: "warning"
                        })
                    }
                })
            },

            addSupplier: function() {
                this.dialogFormVisible = true;
                this.$nextTick(() => {
                    this.$refs['editForm'].resetFields();
                })
            },

            addData: function(formName) {
                this.$refs[formName].validate(valid => {
                    if(valid) {
                        supplier.add(this.pojo).then(response => {
                            const resp = response.data;
                            if(resp.flag) {
                                this.fetchData();
                                this.dialogFormVisible = false;
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

            editData: function(formName) {
                this.$refs[formName].validate(valid => {
                    if(valid){
                        supplier.update(this.pojo).then(response => {
                            const resp = response.data;
                            if(resp.flag) {
                                this.fetchData();
                                this.dialogFormVisible = false;
                                this.$message({
                                    message: resp.message,
                                    type: "success"
                                })
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


            handleEdit: function (id) {
                supplier.getById(id).then(response => {
                    const resp = response.data;
                    if(resp.flag) {
                        this.pojo = resp.data;
                        this.dialogFormVisible = true;
                    }
                })
            },

            handleDelete: function (id) {
                supplier.delete(id).then(response => {
                    const resp = response.data;
                    if(resp.flag) {
                        this.fetchData();
                    }else {
                        this.$message({
                            message: resp.message,
                            type: "warning"
                        })
                    }
                })
            },

            handleSizeChange: function (pageSize) {
                this.pageSize = pageSize;
                this.searchData();
            },

            handleCurrentChange: function (currentPage) {
                this.currentPage = currentPage;
                this.searchData();
            },

            resetFormData: function (formName) {
                this.$refs[formName].resetFields();
            },

            clickCurrentChange: function (row) {
                this.$emit('option-supplier', row);
            },
        }
    }

</script>

<style scoped>

</style>
