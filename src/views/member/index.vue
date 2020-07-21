<template>
    <div>
        <!-- 条件域 -->
        <el-form ref="searchForm" :inline="true" :model="searchMap" style="margin-top: 25px;">
            <el-form-item prop="cardNum">
                <el-input v-model="searchMap.cardNum" placeholder="会员卡号" style="width: 200px;"></el-input>
            </el-form-item>
            <el-form-item prop="name">
                <el-input v-model="searchMap.name" placeholder="会员名称" style="width: 200px;"></el-input>
            </el-form-item>
            <el-form-item prop="payType">
                <el-select
                    v-model="searchMap.payType" placeholder="支付类型" style="width: 110px;">
                    <el-option
                        v-for="option in payTypeOptions"
                        :key="option.type"
                        :label="option.name"
                        :value="option.type"
                    >
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item prop="birthday">
                <el-date-picker value-format="yyyy-MM-dd" v-model="searchMap.birthday" type="date" placeholder="出生日期"></el-date-picker>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" icon="el-icon-search" @click="fetchData">查询</el-button>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" icon="el-icon-plus" @click="addMember">新增</el-button>
            </el-form-item>
            <el-form-item>
                <el-button @click="resetForm('searchForm')">重置</el-button>
            </el-form-item>
        </el-form>
        <!-- 表格 -->
        <el-table
            :data="list" height="680" border style="width: 100%">

            <el-table-column type="index" label="序号" width="60"></el-table-column>
            <el-table-column prop="cardNum" label="会员卡号"></el-table-column>
            <el-table-column prop="name" label="会员姓名"></el-table-column>
            <el-table-column prop="birthday" label="会员生日"></el-table-column>
            <el-table-column prop="phone" label="手机号码" width="110"></el-table-column>
            <el-table-column prop="integral" label="可用积分"></el-table-column>
            <el-table-column prop="money" label="开卡金额"></el-table-column>
            <el-table-column prop="payType" label="支付类型">
                <template slot-scope="scope">
                    <span>{{scope.row.payType | payTypeFilter}}</span>
                </template>
            </el-table-column>
            <el-table-column prop="address" label="会员地址" width="180"></el-table-column>

            <el-table-column type="index" label="操作" width="150">
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
            layout="total, sizes, prev, next, jumper"
            :total="total"
            style="float: right; margin-top: 10px;"
        >
        </el-pagination>

        <!-- 编辑域 -->
        <el-dialog title="会员编辑" :visible.sync="dialogFormVisible" width="500px;">
            <el-form
                status-icon
                ref="pojoForm"
                :model="pojo"
                label-width="100px"
                label-position="right"
                style="width: 400px;"
                :rules="rules"
            >
                <el-form-item label="会员卡号" prop="cardNum">
                    <el-input v-model="pojo.cardNum"></el-input>
                </el-form-item>
                <el-form-item label="会员姓名" prop="name">
                    <el-input v-model="pojo.name"></el-input>
                </el-form-item>
                <el-form-item label="会员生日" prop="birthday">
                    <el-date-picker v-model="pojo.birthday" type="date" placeholder="请点击选择"></el-date-picker>
                </el-form-item>
                <el-form-item label="手机号" prop="phone">
                    <el-input v-model="pojo.phone"></el-input>
                </el-form-item>
                <el-form-item label="可用积分" prop="integral">
                    <el-input v-model="pojo.integral"></el-input>
                </el-form-item>
                <el-form-item label="支付方式" prop="payType">
                    <el-select v-model="pojo.payType" class="filter-item" placeholder="请点击选择">
                        <el-option v-for="option in payTypeOptions"
                        :key="option.type"
                        :label="option.name"
                        :value="option.type">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="会员地址">
                    <el-input v-model="pojo.address" type="textarea"
                    :autosize="{minRows: 2, maxRows: 4}" placeholder="请输入地址"
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
import memberApi from "@/api/member"

const payTypeOptions = [
    {type: "1", name: "现金"},
    {type: "2", name: "微信"},
    {type: "3", name: "支付宝"},
    {type: "4", name: "银行卡"}
];

export default {
    data() {
        return {
            list: [],
            total: 0,
            currentPage: 1,
            pageSize: 10,
            searchMap: {
                cardNum: "",
                name: "",
                patType: "",
                birthday: ""
            },
            payTypeOptions: payTypeOptions,
            dialogFormVisible: false,
            pojo: {
                // 如果id == null 说明是新增
                id: null,
                cardNum: "",
                name: "",
                birthday: "",
                phone: "",
                money: "",
                integral: "",
                payType: "",
                address: "",
            },
             rules: {
                 cardNum: [{required: true, message: '卡号不能为空', trigger: 'blur'}],
                 name: [{required: true, message: '姓名不能为空', trigger: 'blur'}],
                 payType: [{required: true, message: '请选择支付类型', trigger: 'change'}],
             }
        };
    },
    created() {
        this.fetchData();
    },
    methods: {
        fetchData: function() {
            /*
            memberApi.getList().then(response => {
                this.list = response.data.data;
            })
            */
           memberApi.search(this.currentPage, this.pageSize, this.searchMap).then(response => {
               const resp = response.data;
               this.total = resp.data.total;
               this.list = resp.data.rows;
           })
        },

        handleEdit: function(id) {
            this.addMember();
            memberApi.getById(id).then(response => {
                const resp = response.data;
                if(resp.flag) {
                    this.pojo = resp.data;
                }
            })
        },

        handleDelete: function(id) {
            this.$confirm("确认删除这条记录吗？", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
            }).then(() => {
                memberApi.deleteById(id).then(response => {
                    const resp = response.data;
                    this.$message({
                        type: resp.flag ? 'success' : 'error',
                        message: resp.message
                    });
                    if(resp.flag) {
                        this.fetchData();
                    }
                }).catch(() => {
                    return;
                })
            })
        },

        handleSizeChange: function(val) {
            this.pageSize = val;
            this.fetchData;
        },

        handleCurrentChange: function(val) {
            this.currentPage = val;
            this.fetchData();
        },

        resetForm: function(formName) {
            this.$refs[formName].resetFields();
        },

        addMember: function() {
            this.dialogFormVisible = true;
            this.$nextTick(() => {
                this.$refs['pojoForm'].resetFields();

            })
        },

        addData: function(formName) {
            this.$refs[formName].validate(valid => {
                if(valid) {
                    memberApi.add(this.pojo).then(response => {
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

        updateData: function(formName) {
            this.$refs[formName].validate(valid => {
                if(valid) {
                    memberApi.update(this.pojo).then(response => {
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

    },

    filters: {
        payTypeFilter(type) {
            const obj = payTypeOptions.find(obj => obj.type === type);
            return obj ? obj.name : null;
        }
    }
}
</script>

<style>

</style>