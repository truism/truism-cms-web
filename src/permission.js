import router from "./router"
import {getUserInfo} from "./api/login"

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
                next();
            }else {
                getUserInfo(token).then((response) => {
                    const resp = response.data;
                    if(resp.flag) {
                        localStorage.setItem("user-info", JSON.stringify(resp.data));
                        next();
                    }else {
                        next("/login");
                    }
                })
            }
        }
    }

})