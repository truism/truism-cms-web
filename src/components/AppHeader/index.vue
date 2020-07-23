<template>
        <div class="header">
            <a href="#/">
                <img class="logo" src="@/assets/logo.png" alt="" width="25px">
                <span class="company">Truism后台管理系统</span>
            </a>

            <el-dropdown @command="handleCommand">
            <span class="el-dropdown-link">
                admin <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item command="a">修改密码</el-dropdown-item>
                    <el-dropdown-item command="b">退出系统</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>

            <el-dialog title="修改密码" :visible.sync="dialogVisible" width="500px">
                <el-form ref="passWdForm"
                         status-icon
                         :rules="rules"
                         :model="paramMap"
                         label-width="100px"
                         style="width: 400px;"
                >
                    <el-form-item label="旧密码" prop="oldPasswd">
                        <el-input type="password" v-model="paramMap.oldPasswd" ></el-input>
                    </el-form-item>
                    <el-form-item label="新密码" prop="newPasswd">
                        <el-input type="password" v-model="paramMap.newPasswd"></el-input>
                    </el-form-item>
                    <el-form-item label="确认新密码" prop="repeatNewPasswd">
                        <el-input type="password" v-model="paramMap.repeatNewPasswd"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <template>
                            <el-button @click="dialogVisible = false">取消</el-button>
                            <el-button @click="changePasswd">确定</el-button>
                        </template>
                    </el-form-item>
                </el-form>
            </el-dialog>
        </div>
</template>

<script>

import {logout, changePasswd} from "@/api/login"

export default {
    data() {
        return {
            paramMap: {
                oldPasswd: "",
                newPasswd: "",
                repeatNewPasswd: "",
            },
            dialogVisible: false,
            rules: {
                oldPasswd: [{required: true, message:"旧密码不可为空",  trigger: 'blur'}],
                newPasswd: [{required: true, message:"新密码不可为空",  trigger: 'blur'}],
                repeatNewPasswd: [{required: true, message:"请重复密码",  trigger: 'blur'}],
            }
        }
    },

    methods: {
        handleCommand: function(command) {
            switch(command) {
                case 'a':
                    this.$nextTick(() => {
                        this.$refs['passWdForm'].resetFields();
                    })
                    this.dialogVisible = true;
                    break;
                case 'b':
                    logout(localStorage.getItem("user-token")).then(response => {
                        localStorage.removeItem("user-info");
                        localStorage.removeItem("user-token");
                        this.$router.push("/login");
                    });
                    break;
                default:
                    break;
            }
        },

        changePasswd: function () {
            changePasswd(this.paramMap).then(response => {
                const resp = response.data;
                this.dialogVisible = false;
                this.$message({
                    message: resp.message,
                    type: "success"
                })
            })
        }
    }
}
</script>

<style scoped>
    .logo {
        vertical-align: middle;
        padding: 0 10px 0 40px;
    }

    .company {
        position: absolute;
        color: white;
    }

    .el-dropdown {
        float: right;
        margin-right: 40px;
    }

    .el-dropdown-link {
        cursor: pointer;
        color: #fff;
    }
</style>
