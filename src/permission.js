import router from "./router"
import axios from "axios"

router.beforeEach((to, from, next) => {

    const token = localStorage.getItem("user-token");
    if(!token) {
        if(to.path !== "/login") {
            next({path: "/login"});
        }else {
            next();
        }
    }else {
        if(to.path === "/login") {
            next();
        }else {
            const userInfo = localStorage.getItem("user-info");
            if(userInfo) {
                axios.defaults.headers['Authorization'] = token;
                next();
            }else {
                next("/login");
            }
        }
    }

});
