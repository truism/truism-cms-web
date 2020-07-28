<template>
    <div>
        <!-- 表单 -->
        <el-form :model="blog" ref="blogForm" :inline="true" :rules="rules"  size="small" style="margin-top: 35px; margin-bottom: 12px;">
            <el-form-item prop="title" label="标题">
                <el-input v-model="blog.title" placeholder="请输入标题" style="width: 300px;" ></el-input>
            </el-form-item>
            <el-form-item prop="source">
                <el-select v-model="blog.source" placeholder="类型" style="width: 80px;">
                    <el-option
                            v-for="item in sourceList"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item prop="typeId">
                <el-select v-model="blog.typeId" placeholder="分类">
                    <el-option
                            v-for="item in typeList"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item prop="tagsId">
                <el-select v-model="blog.tagsId" multiple placeholder="标签" size="small">
                    <el-option
                            v-for="item in tagList"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="success" @click="addBlog('blogForm')">新增</el-button>
                <el-button type="primary" @click="saveDraft('blogForm')">保存草稿</el-button>
                <el-button type="info" @click="$refs['blogForm'].resetFields()">重置</el-button>
            </el-form-item>
        </el-form>

        <!-- markdown文档-->
        <mavon-editor
            :toolbars="toolbars"
            @imgAdd="handleEditorImgAdd"
            @imgDel="handleEditorImgDel"
            style="height: 680px;"
            v-model="blog.content"
            @change="change"
            ref="md"
        >

        </mavon-editor>
    </div>
</template>

<script>
    import tagApi from "@/api/tag"
    import typeApi from "@/api/type"
    import blogApi from "@/api/blog"

    export default {
        data() {
            return {
                sourceList: [
                    {
                        id: 1,
                        name: "原创"
                    },
                    {
                        id: 2,
                        name: "翻译"
                    },
                    {
                        id: 3,
                        name: "转载"
                    }
                ],
                toolbars: {
                    bold: true, // 粗体
                    italic: true, // 斜体
                    header: true, // 标题
                    underline: true, // 下划线
                    strikethrough: true, // 中划线
                    mark: true, // 标记
                    superscript: true, // 上角标
                    subscript: true, // 下角标
                    quote: true, // 引用
                    ol: true, // 有序列表
                    ul: true, // 无序列表
                    link: true, // 链接
                    imagelink: true, // 图片链接
                    code: false, // code
                    table: true, // 表格
                    fullscreen: true, // 全屏编辑
                    readmodel: true, // 沉浸式阅读
                    htmlcode: true, // 展示html源码
                    help: true, // 帮助
                    /* 1.3.5 */
                    undo: true, // 上一步
                    redo: true, // 下一步
                    trash: true, // 清空
                    save: true, // 保存（触发events中的save事件）
                    /* 1.4.2 */
                    navigation: true, // 导航目录
                    /* 2.1.8 */
                    alignleft: true, // 左对齐
                    aligncenter: true, // 居中
                    alignright: true, // 右对齐
                    /* 2.2.1 */
                    subfield: true, // 单双栏模式
                    preview: true, // 预览
                },
                tagList: [],
                typeList: [],
                blog: {
                    title: "",
                    typeId: null,
                    tagsId: [],
                    draft: false,
                    source: "",
                    content: "",
                },
                rules: {
                    title: [{required: true, message: "标题不可为空", trigger: "blur"}],
                    typeId: [{required: true, message: "请为博客选择一个分类", trigger: "blur"}],
                    tagsId: [{required: true, message: "请选择标签", trigger: "blur"}],
                }
            }
        },

        created() {
            this.getTypeList();
            this.getTagList();
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

            addBlog: function(formName) {
                this.$refs[formName].validate(valid => {
                    if(valid) {
                        this.blog.draft = true;
                        blogApi.addBlog(this.blog).then(response => {
                            const resp = response.data;
                            if(resp.flag) {
                                this.$refs['blogForm'].resetFields();
                                this.blog.content = "";
                                this.$message({
                                    message: resp.message,
                                    type: "success"
                                })
                            }
                        })
                    }else {
                        return false;
                    }
                })
            },

            saveDraft: function(formName) {
                this.$refs[formName].validate(valid => {
                    if(valid) {
                        this.blog.draft = false;
                        blogApi.addBlog(this.blog).then(response => {
                            const resp = response.data;
                            if(resp.flag) {
                                this.$refs['blogForm'].resetFields();
                                this.blog.content = "";
                                this.$message({
                                    message: resp.message,
                                    type: "success"
                                })
                            }
                        })
                    }else {
                        return false;
                    }
                })
            },


            //监听markdown变化
            change(value, render) {
                this.html = render;
                this.blog.content = value;
                this.blog.content = render;
            },
            //上传图片接口pos 表示第几个图片
            handleEditorImgAdd(pos , $file){
                var formdata = new FormData();
                formdata.append('file' , $file);
                this.$axios
                    .post("http://localhost:8000/blogs/image/upload/", formdata)
                    .then(res => {
                        var url = res.data.data;
                        this.$refs.md.$img2Url(pos, url);  //这里就是引用ref = md 然后调用$img2Url方法即可替换地址
                    });
            },
            handleEditorImgDel(){
                console.log('handleEditorImgDel');    //我这里没做什么操作，后续我要写上接口，从七牛云CDN删除相应的图片
            }
        }
    }
</script>

<style scoped>

</style>
