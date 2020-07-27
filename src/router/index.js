import Vue from "vue";
import VueRouter from "vue-router";
import Login from "../views/login";
// 布局组件
import Layout from "../components/Layout.vue"
import Home from "../views/home"
import Blog from "../views/blog"
import Type from "../views/type"
import Tag from "../views/tag"
import User from "../views/user"
import Sys from "../views/sys"
import AddBlog from "../views/blog/add-blog"
import Draft from "../views/blog/draft"

Vue.use(VueRouter);

const routes = [
  {
    path: "/login",
    name: "login",
    component: Login
  },
  {
    path: "/",
    name: "home",
    component: Layout,
    redirect: "/home",
    children: [
       {
         path: "home",
         component: Home,
         name: "home",
         meta: {title: "首页"}
       }
     ]
  },
  {
    path: "/blog",
    name: "blog",
    component: Layout,
    children: [
      {
        path: "/",
        component: Blog,
        name: "blog",
        meta: {
          title: "博客管理"
        }
      },
      {
        path: "add",
        component: AddBlog,
        name: "add-blog",
        meta: {
          title: "新增博客"
        }
      },
      {
        path: "draft",
        component: Draft,
        name: "draft",
        meta: {
          title: "草稿箱"
        }
      }
    ]
  },
  {
    path: "/type",
    name: "type",
    component: Layout,
    children: [
      {
        path: "/",
        component: Type,
        name: "type",
        meta: {
          title: "分类管理"
        }
      }
    ]
  },
  {
    path: "/tag",
    name: "tag",
    component: Layout,
    children: [
      {
        path: "/",
        component: Tag,
        name: "tag",
        meta: {
          title: "标签管理"
        }
      }
    ]
  },
  {
    path: "/user",
    name: "user",
    component: Layout,
    children: [
      {
        path: "/",
        component: User,
        name: "user",
        meta: {
          title: "用户管理"
        }
      }
    ]
  },
  {
    path: "/sys",
    name: "sys",
    component: Layout,
    children: [
      {
        path: "/",
        component: Sys,
        name: "sys",
        meta: {
          title: "系统管理"
        }
      }
    ]
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
