<<template>
    <div>
        <h1>欢迎访问Truism管理系统</h1>
    </div>
</template>

<script>
    import menuApi from "@/api/menu";
    export default {
        methods: {
            getMenus: function () {
                let userInfo = localStorage.getItem("user-info");
                // 获取菜单列表
                menuApi.getMenu().then(response => {
                    const resp = response.data;
                    if(resp.flag) {
                        this.$message({
                            message: resp.message,
                            type: "success",
                        })
                        alert(resp.data);
                    }else {
                        this.$message({
                            message: resp.message,
                            type: "warning",
                        })
                    }
                });
            }
        }
    }
</script>

<style scoped>

</style>
