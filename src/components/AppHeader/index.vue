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
    </div> 
</template>

<script>

import {logout} from "@/api/login"

export default {
    methods: {
        handleCommand: function(command) {
            switch(command) {
                case 'a':
                    // 修改密码
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