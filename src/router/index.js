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
            path: "/circle_notice/getList:id",
            name: "circle_notice/getList",
            component: () => import("../components/tidalManagement/TheCircleICreated/Notice/NoticeList.vue"),
            meta: {
              title: "圈子公告"
            }
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
        path: "/Circles",
        name: "CircleS",
        component: () => import("../components/Stroll/StrollList.vue"),
        meta: {
          title: "逛逛"
        },
        children: [
          {
            path: "/Circles",
            redirect: "/Circles/Stroll",
          },
          {
            path: "/Circles/Stroll",
            name: "Circles/Stroll",
            component: () => import("../components/Stroll/StrollAround/strollAroundList.vue"),
            meta: {
              title: "逛逛列表"
            },
          },
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
      },
      {
        path: "/match",
        name: "match",
        component: () => import("../components/EventManagement/listEvent.vue"),
        meta: {
          title: "赛事管理"
        },
        children: [
          {
            path: "/match",
            redirect: "/match/listMacthMF",
          },
          {
            path: "/match/listMacthMF",
            name: "listMacthMF",
            component: () => import("../components/EventManagement/EventList/EventList.vue"),
            meta: {
              title: "赛事列表"
            },
          },
          {
            path: "/match/release",
            name: "match/release",
            component: () => import("../components/EventManagement/EventList/listFlag/add/addMatch.vue"),
            meta: {
              title: "添加赛事"
            },
          },
          {
            path: "/Match/works:id",
            name: "Match/works",
            component: () => import("../components/EventManagement/EventList/listFlag/screening/screening.vue"),
            meta: {
              title: "稿件筛选"
            },
          },
          {
            path: "/worksShow/:works_id/:id",
            name: "worksShow",
            component: () => import("../components/EventManagement/EventList/listFlag/screening/screeningDetial/screeningDetial.vue"),
            meta: {
              title: "稿件详情"
            },
          }
        ]
      },
      {
        path: "/brand",
        name: "brand",
        component: () => import("../components/BrandManagement/listBrand.vue"),
        meta: {
          title: "品牌管理"
        },
        children: [
          {
            path: "/brand",
            redirect: "/brand/getList",
          },
          {
            path: "/brand/getList",
            name: "getList",
            component: () => import("../components/BrandManagement/BrandList/BrandList.vue"),
            meta: {
              title: "品牌列表"
            },
          },
          {
            path: "/brand/addOp",
            name: "addOp",
            component: () => import("../components/BrandManagement/BrandList/operation/addOp.vue"),
            meta: {
              title: "添加品牌"
            },
          }
        ]
      },
      {
        path: "/company_product",
        name: "company_product",
        component: () => import("../components/commodity/listCommodity.vue"),
        meta: {
          title: "商品管理"
        },
        children: [
          {
            path: "/company_product",
            redirect: "/company_product/getList",
          },
          {
            path: "/company_product/getList",
            name: "company_product/getList",
            component: () => import("../components/commodity/commodityList/commodityList.vue"),
            meta: {
              title: "商品列表"
            },
          },
          {
            path: "/custype/getList",
            name: "custype/getList",
            component: () => import("../components/commodity/classification/classificationList.vue"),
            meta: {
              title: "分类列表"
            },
          },
          {
            path: "/users_service/listService",
            name: "users_service/listService",
            component: () => import("../components/commodity/service/serviceList.vue"),
            meta: {
              title: "服务列表"
            },
          }

        ]
      },
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
