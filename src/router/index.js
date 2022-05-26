import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "/login",
  },
  {
    path: "/login",
    name: "login",
    component: () => import("../components/login.vue"),
  },
  {
    path: "/home",
    name: "home",
    component: () => import("../views/HomeView.vue"),
    meta: {
      title: "控制台"
    },
    children: [
      {
        path: "/home",
        redirect: "/pageHome",
      },
      {
        path: "/pageHome",
        name: "homePage",
        component: () => import("../components/homePage/homePage.vue"),
      },
      {
        path: "/Circle",
        name: "Circle",
        component: () => import("../components/tidalManagement/tidalList.vue"),
        meta: {
          title: "潮圈管理"
        },
        children: [
          {
            path: "/Circle",
            redirect: "/Circle/listCircle",
          },
          {
            path: "/Circle/listCircle",
            name: "Circle/listCircle",
            component: () => import("../components/tidalManagement/tidalList/tidalListValue.vue"),
            meta: {
              title: "圈子列表"
            },
          },
          {
            path: "/Circle/createCircle",
            name: "Circle/createCircle",
            component: () => import("../components/tidalManagement/createCircle/createCircle.vue"),
            meta: {
              title: "创建圈子"
            },
          },
          {
            path: "/Circle/getCircleShow:id",
            name: "Circle/getCircleShow",
            component: () => import("../components/tidalManagement/TheCircleICreated/TheCircleICreated.vue"),
            meta: {
              title: "查看圈子"
            },
          },
          {
            path: "/Forum/release:id",
            name: "Forum/release",
            component: () => import("../components/tidalManagement/TheCircleICreated/releasePost/release.vue"),
            meta: {
              title: "发布帖子"
            }
          },
          {
            path: "/Forum/showForum:id",
            name: "Forum/showForum",
            component: () => import("../components/tidalManagement/createDetils/createDetils.vue"),
            meta: {
              title: "圈子"
            },
          },
          {
            path: "/Circle/myCircle:id",
            name: "myCircle",
            component: () => import("../components/tidalManagement/management/management.vue"),
            meta: {
              title: "圈子管理"
            },
          },
          {
            path: "/getMember:id",
            name: "getMember",
            component: () => import("../components/tidalManagement/getMember/getMember.vue"),
            meta: {
              title: "成员管理"
            },
          },
          {
            path: "/Circles:id",
            name: "tation",
            component: () => import("../components/tidalManagement/management/managementChildren/invitation.vue"),
            meta: {
              title: "成员管理"
            },
            children: [
              {
                path: "/Circles:id",
                redirect: "/Circles/invitation:id"
              },
              {
                path: "/Circles/invitation:id",
                name: "invitation",
                component: () => import("../components/tidalManagement/management/managementChildren/managementRen/managementRen.vue"),
                meta: {
                  title: "成员邀请"
                },
              },
              {
                path: "/Circles/del:id",
                name: "invitationdel",
                component: () => import("../components/tidalManagement/management/managementChildren/managementRen/managementdel.vue"),
                meta: {
                  title: "成员移除"
                },
              }
            ]
          },
          {
            path: "/Circle/getCircleForum:id",
            name: "getCircleForum",
            component: () => import("../components/tidalManagement/Posts/Posts.vue"),
            meta: {
              title: "帖子管理"
            },
          },
          {
            path: "/Activity/release",
            name: "Activity/release",
            component: () => import("../components/tidalManagement/Activities/Activities.vue"),
            meta: {
              title: "发布活动"
            }
          }
        ]
      },
      {
        path: "/Business",
        name: "Business",
        component: () => import("../components/StoreManagement/listBusiness.vue"),
        meta: {
          title: "门店管理"
        },
        children: [
          {
            path: "/Business",
            redirect: "/Business/listBusiness",
          },
          {
            path: "/Business/listBusiness",
            name: "listBusiness",
            component: () => import("../components/StoreManagement/BusinessList/BusinessList.vue"),
            meta: {
              title: "门店列表"
            },
          }
        ]
      }
    ]
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});
router.beforeEach((to, from, next) => {
  if (to.path === "/login") return next();
  const totoken = window.localStorage.getItem("token");
  if (!totoken) return next("/login");
  next();
});

const originPush = VueRouter.prototype.push
const originReplace = VueRouter.prototype.replace
// 给原型对象上的push指定新函数函数
VueRouter.prototype.push = function (location, onComplete, onAbort) {
  // 判断如果没有指定回调函数, 通过call调用源函数并使用catch来处理错误
  if (onComplete === undefined && onAbort === undefined) {
    return originPush.call(this, location, onComplete, onAbort).catch(() => { })
  } else { // 如果有指定任意回调函数, 通过call调用源push函数处理
    originPush.call(this, location, onComplete, onAbort)
  }
}
// replace同理处理
VueRouter.prototype.replace = function (location, onComplete, onAbort) {
  if (onComplete === undefined && onAbort === undefined) {
    return originReplace.call(this, location, onComplete, onAbort).catch(() => { })
  } else {
    originReplace.call(this, location, onComplete, onAbort)
  }
}


export default router;
