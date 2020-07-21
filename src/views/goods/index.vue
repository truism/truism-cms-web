<template>
    <div>

        <!-- 查询表单 -->
        <el-form ref="searchForm" :inline="true" :model="searchParam" style="margin-top: 20px;">
            <el-form-item prop="name">
                <el-input v-model="searchParam.name" placeholder="商品名称" style="width: 200px;"></el-input>
            </el-form-item>
            <el-form-item prop="code">
                <el-input v-model="searchParam.code" placeholder="商品代码" style="width: 200px;"></el-input>
            </el-form-item>
            <el-form-item prop="spec">
                <el-input v-model="searchParam.spec" placeholder="商品规格" style="width: 200px;"></el-input>
            </el-form-item>
            <el-form-item prop="supplierName">
                <el-input readonly @click.native="dialogSupplierVisible = true"
                          placeholder="供应商" style="width: 200px;"
                          v-model="searchParam.supplierName">

                </el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" icon="el-icon-search" @click="search('searchForm')" >查询</el-button>
                <el-button type="primary" icon="el-icon-plus" @click="handleAdd('pojoForm')">新增</el-button>
                <el-button @click="$refs['searchForm'].resetFields()">重置</el-button>
            </el-form-item>
        </el-form>

        <!-- 表格 -->
        <el-table :data="list" height="680" border style="width: 100%" highlight-current-row>
            <el-table-column type="index" label="序号" width="60"></el-table-column>
            <el-table-column prop="name" label="商品名称"></el-table-column>
            <el-table-column prop="code" label="商品编码" width="80"></el-table-column>
            <el-table-column prop="spec" label="商品规格" width="80"></el-table-column>
            <el-table-column prop="retailPrice" label="零售价" width="120"></el-table-column>
            <el-table-column prop="purchasePrice" label="进货价" width="120"></el-table-column>
            <el-table-column prop="storageNum" label="库存数量" width="120"></el-table-column>
            <el-table-column prop="supplierName" label="供应商"></el-table-column>
            <el-table-column type="index" label="操作" width="150">
                <template slot-scope="scope">
                    <el-button size="mini" @click="handleEdit(scope.row.id)">编辑</el-button>
                    <el-button size="mini" type="danger" @click="handleDelete(scope.row.id)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>

        <!-- 分页 -->
        <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="[10,20,50]"
            :page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
        >
        </el-pagination>

        <!-- 供应商选择 -->
        <el-dialog title="供应商选择" :visible.sync="dialogSupplierVisible" width="500px">
            <app-supplier :isDialog="true" @option-supplier="optionSelect"></app-supplier>
        </el-dialog>

        <!-- 添加或编辑弹框 -->
        <el-dialog title="商品编辑" :visible.sync="dialogFormVisible" width="500px">
            <el-form :rules="rules"
                     status-icon
                     ref="pojoForm"
                     :model="pojo"
                     label-width="100px"
                     label-position="right"
                     style="width: 400px;">
                <el-form-item label="商品名称" prop="name">
                    <el-input v-model="pojo.name" />
                </el-form-item>
                <el-form-item label="商品编码" prop="code">
                    <el-input v-model="pojo.code" />
                </el-form-item>
                <el-form-item label="商品规格" prop="spec">
                    <el-input v-model="pojo.spec" />
                </el-form-item>
                <el-form-item label="零售价" prop="retailPrice">
                    <el-input v-model="pojo.retailPrice" />
                </el-form-item>
                <el-form-item label="进货价" prop="purchasePrice">
                    <el-input v-model="pojo.purchasePrice" />
                </el-form-item>
                <el-form-item label="库存数量" prop="storageNum">
                    <el-input v-model="pojo.storageNum" />
                </el-form-item>
                <el-form-item label="供应商" prop="supplierName">
                    <el-input
                        readonly
                        @click.native="editOptionSupplier"
                        v-model="pojo.supplierName"
                        placeholder="请选择供应商"
                        style="width: 200px;"
                    ></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取消</el-button>
                <el-button type="primary" @click="pojo.id === null ? addData('pojoForm') : updateData('pojoForm')" >确定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import goodsApi from "@/api/goods";
    import Supplier from "@/views/supplier";

    export default {
        data() {
            return {
                list: [],
                total: 0,
                currentPage: 1,
                pageSize: 10,
                searchParam: {
                    name: "",
                    code: "",
                    supplierName: "",
                    supplierId: null,
                },
                dialogFormVisible: false,
                dialogSupplierVisible: false,
                isEdit: false,
                pojo: {
                    id: null,
                    name: "",
                    code: "",
                    spec: "",
                    retailPrice: 0.0,
                    purchasePrice: 0.0,
                    storageNum: 0,
                    supplierName: "",
                    supplierId: null,
                },
                rules: {
                    name: [{required: true, message: "商品名称不能为空", trigger: "blur"}],
                    code: [{required: true, message: "商品编码不能为空", trigger: "blur"}],
                    retailPrice: [{required: true, message: "零售价不能为空", trigger: "blur"}],
                },
            }
        },

        components: {
          'app-supplier' : Supplier,
        },

        created() {
            this.fetchData();
        },

        methods: {
            fetchData: function () {
                goodsApi.search(this.currentPage, this.pageSize, this.searchParam).then(response => {
                    const resp = response.data;
                    if(resp.flag) {
                        this.list = resp.data.rows;
                        this.total = resp.data.total;
                        console.log(this.list);
                    }else {
                        this.$message({
                            message: resp.message,
                            type: "warning"
                        })
                    }
                })
            },

            search: function(formName) {
                this.fetchData();
            },

            handleAdd: function(formName) {
                this.dialogFormVisible = true;
                this.$nextTick(() => {
                    this.$refs[formName].resetFields();
                })
            },

            handleEdit: function (id) {
                this.handleAdd("editForm");
                goodsApi.getById(id).then(response => {
                    const resp = response.data;
                    if(resp.flag) {
                        this.pojo = resp.data;
                    }
                })
            },

            handleDelete: function (id) {
                this.$confirm("确认删除这条记录吗？", '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    goodsApi.delete(id).then(response => {
                        const resp = response.data;
                        this.$message({
                            message: resp.message,
                            type: resp.flag ? 'success':'error'
                        })
                        if(resp.flag) {
                            this.fetchData();
                        }
                    })
                }).catch(() => {

                })
            },

            handleSizeChange: function (pageSize) {
                this.pageSize = pageSize;
                this.fetchData();
            },

            handleCurrentChange: function (currentPage) {
                this.currentPage = currentPage;
                this.fetchData();
            },

            optionSelect: function (row) {
                if(this.isEdit) {
                    this.pojo.supplierName = row.name;
                    this.pojo.supplierId = row.id;
                }else {
                    this.searchParam.supplierName = row.name;
                    this.searchParam.supplierId = row.id;
                }
                this.dialogSupplierVisible = false;
                this.isEdit = false;
            },

            addData: function (formName) {
                this.$refs[formName].validate(valid => {
                    if(valid) {
                        goodsApi.add(this.pojo).then(response => {
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

            editOptionSupplier: function() {
              this.dialogSupplierVisible = true;
              this.isEdit = true;
            },

            updateData: function (formName) {
                this.$refs[formName].validate(valid => {
                    if(valid) {
                        goodsApi.update(this.pojo).then(response => {
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
        },



    }
</script>

<style>

</style>
