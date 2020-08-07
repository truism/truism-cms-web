<template>
    <div class="navbar">
        <el-menu
            :router="true"
            :default-active="$router.path"
            class="el-menu-vertical-demo"
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b"
        >
            <el-menu-item index="/home">
                <i class="el-icon-s-home"></i>
                <span slot="title">首页</span>
            </el-menu-item>
            <el-submenu index="blog">
                <template slot="title">
                    <i class="el-icon-s-unfold"></i>
                    <sapn>博客管理</sapn>
                </template>
                <el-menu-item index="/blog/">
                    <i class="el-icon-user-solid"></i>
                    <span slot="title">博客列表</span>
                </el-menu-item>
                <el-menu-item index="/blog/add">
                    <i class="el-icon-star-on"></i>
                    <span slot="title">新增博客</span>
                </el-menu-item>
            </el-submenu>
            <el-submenu index="type">
                <template slot="title">
                    <i class="el-icon-s-order"></i>
                    <sapn>分类管理</sapn>
                </template>
                <el-menu-item index="/type/">
                    <i class="el-icon-s-grid"></i>
                    <span slot="title">分类列表</span>
                </el-menu-item>
            </el-submenu>
            <el-submenu index="tag" >
                <template slot="title">
                    <i class="el-icon-menu"></i>
                    <sapn>标签管理</sapn>
                </template>
                <el-menu-item index="/tag/">
                    <i class="el-icon-tickets"></i>
                    <span slot="title">标签列表</span>
                </el-menu-item>
            </el-submenu>
            <el-submenu index="msg" >
                <template slot="title">
                    <i class="el-icon-menu"></i>
                    <sapn>留言管理</sapn>
                </template>
                <el-menu-item index="/message/">
                    <i class="el-icon-tickets"></i>
                    <span slot="title">留言列表</span>
                </el-menu-item>
            </el-submenu>
            <el-submenu index="user">
                <template slot="title">
                    <i class="el-icon-chat-dot-round"></i>
                    <sapn>成员管理</sapn>
                </template>
                <el-menu-item index="/user/">
                    <i class="el-icon-chat-dot-square"></i>
                    <span slot="title">成员列表</span>
                </el-menu-item>
            </el-submenu>
            <el-submenu index="sys">
                <template slot="title">
                    <i class="el-icon-setting"></i>
                    <sapn>系统管理</sapn>
                </template>
                <el-menu-item index="/sys/">
                    <i class="el-icon-s-tools"></i>
                    <span slot="title">服务器信息</span>
                </el-menu-item>
            </el-submenu>
        </el-menu>
    </div>
</template>

<script>
export default {

}
</script>

<style scoped>

</style>
