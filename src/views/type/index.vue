<template>
    <div>
        <el-row height="100%">
            <el-col :span="12">
                <div class="grid-content bg-purple">
                    <el-form ref="typeForm" :inline="true" style="margin-top: 35px;">
                        <el-form-item prop="name">
                            <el-input type="text" size="small" v-model="typeName"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button icon="el-icon-search" size="small" type="primary" @click="search">搜索</el-button>
                        </el-form-item>
                    </el-form>
                    <el-table
                            height="580"
                            :data="typeList"
                            border
                            style="width: 100%">
                        <el-table-column
                                type="index"
                                label="序号"
                                width="180">
                        </el-table-column>
                        <el-table-column
                                prop="name"
                                label="名称"
                                width="180">
                        </el-table-column>
                        <el-table-column
                                prop="description"
                                label="描述">
                        </el-table-column>
                        <el-table-column
                                label="操作">
                            <template slot-scope="scope">
                                <el-button type="primary" size="mini" @click="updateType(scope.row.id)">编辑</el-button>
                                <el-button type="danger" size="mini" @click="deleteType(scope.row.id)">删除</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
            </el-col>
            <el-col :span="12">
                <div class="grid-content bg-purple-light" style="padding-left: 200px;">
                    <el-form :model="newType" :rules="rules" label-position="left" style="width: 350px;" status-icon ref="addTypeForm">
                        <el-form-item label="名称" prop="name">
                            <el-input v-model="newType.name" autocomplete="off" size="small" ></el-input>
                        </el-form-item>
                        <el-form-item label="描述" prop="description">
                            <el-input type="textarea" size="small"   width="200" v-model="newType.description"
                                      :autosize="{minRows: 2, maxRows: 4}"
                                      placeholder="请输入描述">

                            </el-input>
                        </el-form-item>
                    </el-form>
                    <div slot="footer" class="dialog-footer">
                        <el-button @click="dialogFormVisible = false" size="small" type="info">取 消</el-button>
                        <el-button type="primary" @click="addData('addTypeForm')" size="small">新 增</el-button>
                    </div>
                </div>
            </el-col>
        </el-row>

        <!-- 弹窗 -->
        <el-dialog title="编辑分类" :visible.sync="dialogFormVisible" center width="20%">
            <el-form :model="type" :rules="rules" label-position="left" style="width: 350px;" status-icon>
                <el-form-item label="名称" prop="name">
                    <el-input v-model="type.name" autocomplete="off" size="small" ></el-input>
                </el-form-item>
                <el-form-item label="描述" prop="description">
                    <el-input type="textarea" size="small"   width="200" v-model="type.description"
                              :autosize="{minRows: 1, maxRows: 3}"
                              placeholder="请输入描述">

                    </el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false" size="small">取 消</el-button>
                <el-button type="primary" @click="updateData" size="small">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import typeApi from "@/api/type"
    export default {
        data() {
            return {
                typeList: [],
                typeName: "",
                dialogFormVisible: false,
                type: {
                    id: null,
                    name: "",
                    description: "",
                },
                newType: {
                    name: "",
                    description: "",
                },
                rules: {
                    name: [{required: true, message: "名称不可为空", trigger: "blur"}]
                }
            }
        },

        created() {
            this.getTypeList();
        },

        methods: {
            getTypeList: function () {
                typeApi.getTypeList(this.typeName).then(response => {
                    const resp = response.data;
                    if(resp.flag) {
                        this.typeList = resp.data;
                    }else {
                        this.$message({
                            message: resp.message,
                            type: "warning"
                        })
                    }
                })
            },

            search: function () {
                this.getTypeList();
            },

            updateType: function (id) {
                typeApi.getTypeById(id).then(response => {
                    const resp = response.data;
                    if(resp.flag) {
                        this.type = resp.data;
                        this.dialogFormVisible = true;
                    }else {
                        this.$message({
                            message: resp.message,
                            type: "warning"
                        })
                    }
                })
            },

            deleteType: function (id) {
                this.$confirm("确定删除此条记录吗?", "提示", {
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                    type: "warning",
                }).then(() => {
                    typeApi.deleteType(id).then(response => {
                        const resp = response.data;
                        if(resp.flag) {
                            this.getTypeList();
                        }else {
                            this.$message({
                                message: resp.message,
                                type: "warning",
                            })
                        }
                    })
                }).catch(() => {
                    this.$message({
                        message: "已取消",
                        type: "info"
                    })
                })
            },

            updateData: function () {
                typeApi.updateData(this.type).then(response => {
                    const resp = response.data;
                    if(resp.flag) {
                        this.getTypeList();
                        this.dialogFormVisible = false;
                    }else {
                        this.$message({
                            message: resp.message,
                            type: "warning"
                        })
                    }
                })
            },

            addData: function (formName) {
                this.$refs[formName].validate(valid => {
                    if(valid) {
                        typeApi.addType(this.newType).then(response => {
                            const resp = response.data;
                            if(resp.flag) {
                                this.$refs[formName].resetFields();
                                this.getTypeList();
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
                });
            }

        },
    }
</script>

<style scoped>

</style>
