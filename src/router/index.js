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
      title: "控制台",
      requireAuth: true
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
        path: "/capital",
        name: "capital",
        component: () => import("../components/capital/capitals.vue"),
        meta: {
          title: "钱包",
          requireAuth: true
        },
        children: [{
          path: "/capital",
          redirect: "/capital/capitalval",
        },
        {
          path: "/capital/capitalval",
          name: "capitalval",
          component: () => import("../components/capital/capitalVal/capital.vue"),
          meta: {
            title: "钱包管理",
            requireAuth: true
          },
        },
        {
          path: "/capital/addcard",
          name: "addcard",
          component: () => import("../components/capital/capitalVal/addcard.vue"),
          meta: {
            title: "银行卡",
            requireAuth: true
          },
        }
        ]
      },
      {
        path: "/personal",
        name: "personal",
        component: () => import("../components/personal/personal.vue"),
        meta: {
          title: "个人中心",
          requireAuth: true
        },
        children: [
          {
            path: "/personal",
            redirect: "/personal/personallist",
          },
          {
            path: "/personal/personallist",
            name: "personallist",
            component: () => import("../components/personal/personallist/personallist.vue"),
            meta: {
              title: "账号设置",
              requireAuth: true
            },
          }
        ]
      },
      {
        path: "/Circle",
        name: "Circle",
        component: () => import("../components/tidalManagement/tidalList.vue"),
        meta: {
          title: "潮圈管理",
          requireAuth: true
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
              title: "圈子列表",
              requireAuth: true
            },
          },
          {
            path: "/Circle/createCircle",
            name: "Circle/createCircle",
            component: () => import("../components/tidalManagement/createCircle/createCircle.vue"),
            meta: {
              title: "创建圈子",
              requireAuth: true
            },
          },
          {
            path: "/Circle/getCircleShow:id",
            name: "Circle/getCircleShow",
            component: () => import("../components/tidalManagement/TheCircleICreated/TheCircleICreated.vue"),
            meta: {
              title: "查看圈子",
              requireAuth: true
            },
          },
          {
            path: "/circle_notice/getList:id",
            name: "circle_notice/getList",
            component: () => import("../components/tidalManagement/TheCircleICreated/Notice/NoticeList.vue"),
            meta: {
              title: "圈子公告",
              requireAuth: true
            }
          },
          {
            path: "/Forum/release:id",
            name: "Forum/release",
            component: () => import("../components/tidalManagement/TheCircleICreated/releasePost/release.vue"),
            meta: {
              title: "发布帖子",
              requireAuth: true
            }
          },
          {
            path: "/Forum/showForum:id",
            name: "Forum/showForum",
            component: () => import("../components/tidalManagement/createDetils/createDetils.vue"),
            meta: {
              title: "圈子",
              requireAuth: true
            },
          },
          {
            path: "/Circle/myCircle:id",
            name: "myCircle",
            component: () => import("../components/tidalManagement/management/management.vue"),
            meta: {
              title: "圈子管理",
              requireAuth: true
            },
          },
          {
            path: "/getMember:id",
            name: "getMember",
            component: () => import("../components/tidalManagement/getMember/getMember.vue"),
            meta: {
              title: "成员管理",
              requireAuth: true
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
            path: "/Activity/release:style",
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
          {
            path: "/Circles/release",
            name: "Circles/release",
            component: () => import("../components/Stroll/StrollAround/strollRelease/strollRelease.vue"),
            meta: {
              title: "逛逛帖子发布"
            },
          },
        ]
      },
      {
        path: "/Local",
        name: "Local",
        component: () => import("../components/local/localList.vue"),
        meta: {
          title: "本地"
        },
        children: [
          {
            path: "/Local",
            redirect: "/Local/local",
          },
          {
            path: "/Local/local",
            name: "Local/local",
            component: () => import("../components/local/LocalAround/LocalAroundList.vue"),
            meta: {
              title: "本地帖子列表"
            },
          },
          {
            path: "/Local/release",
            name: "Local/release",
            component: () => import("../components/local/LocalAround/LocalRelease/LocalRelease.vue"),
            meta: {
              title: "本地帖子发布"
            },
          },
        ]
      },
      {
        path: "/News",
        name: "News",
        component: () => import("../components/News/NewsList.vue"),
        meta: {
          title: "消息"
        },
        children: [
          {
            path: "/News",
            redirect: "/News/news",
          },
          {
            path: "/News/news",
            name: "News/news",
            component: () => import("../components/News/NewsAround/NewsAroundList.vue"),
            meta: {
              title: "消息列表"
            },
          }
        ]
      },
      {
        path: "/Post",
        name: "Post",
        component: () => import("../components/Post/Post.vue"),
        meta: {
          title: "帖子"
        },
        children: [
          {
            path: "/Post",
            redirect: "/Post/post",
          },
          {
            path: "/Post/post",
            name: "Post/post",
            component: () => import("../components/Post/postList/postList.vue"),
            meta: {
              title: "帖子管理"
            },
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
          },
        ]
      },
      {
        path: "/StoreArea",
        name: "StoreArea",
        component: () => import("../components/Storearea/StoreArea.vue"),
        meta: {
          title: "门店专区"
        },
        children: [
          {
            path: "/StoreArea",
            redirect: "/business/getList",
          },
          {
            path: "/business/getList",
            name: "getList",
            component: () => import("../components/Storearea/StoreAreaList/StoreAreaList.vue"),
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
            path: "/match/detial:id",
            name: "match/detial",
            component: () => import("../components/EventManagement/EventList/listFlag/detial/detial.vue"),
            meta: {
              title: "赛事详情"
            },
          },
          {
            path: "/matchs/detialtwo:id",
            name: "match/detialtwo",
            component: () => import("../components/EventManagement/EventList/listFlag/detial/detialtwo.vue"),
            meta: {
              title: "我的赛事详情"
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
          },
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
            name: "brand/getList",
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
          },
          {
            path: "/matchProduct/getListMy",
            name: "matchProduct/getListMy",
            component: () => import("../components/Preorderlist/PreorderList.vue"),
            meta: {
              title: "预购列表"
            },
          }
        ]
      },
      {
        path: "/designer_works",
        name: "designer_works",
        component: () => import("../components/designer/designer.vue"),
        meta: {
          title: "设计师专区"
        },
        children: [
          {
            path: "/designer_works",
            redirect: "/designer_works/getListMF",
          },
          {
            path: "/designer_works/getListMF",
            name: "getListMF",
            component: () => import("../components/designer/free/freeList.vue"),
            meta: {
              title: "免费列表"
            },
          },
          {
            path: "/designer/myCenter/:name",
            name: "designer/myCenter",
            component: () => import("../components/designer/free/freeDetil/myDetil/myDetil.vue"),
            meta: {
              title: "设计师信息"
            },
          },
          {
            path: "/designer_works/getListMF/freeDetil:id",
            name: "freeDetil",
            component: () => import("../components/designer/free/freeDetil/freeDetil.vue"),
            meta: {
              title: "免费作品"
            },
          },
          {
            path: "/designer_works/getListFF",
            name: "getListFF",
            component: () => import("../components/designer/pay/payList.vue"),
            meta: {
              title: "付费列表"
            },
          },
          {
            path: "/designer_works/getListMF/payDetil:id",
            name: "payDetil",
            component: () => import("../components/designer/pay/freeDetil/payDetil.vue"),
            meta: {
              title: "付费作品"
            },
          },
          {
            path: "/orders/addVip",
            name: "addVip",
            component: () => import("../components/designer/addVip/addVip.vue"),
            meta: {
              title: "会员"
            }
          },
          {
            path:"/Ranking",
            name:"Ranking",
            component:()=>import("../components/designer/Ranking/Ranking.vue"),
            meta: {
              title: "排行榜"
            },
          }
        ]
      },
      {
        path: "/Platfrom",
        name: "Platfrom",
        component: () => import("../components/Platfrom/listPlatfrom.vue"),
        meta: {
          title: "官方赛事"
        },
        children: [
          {
            path: "/Platfrom",
            redirect: "/match/platform",
          },
          {
            path: "/match/platform",
            name: "platform",
            component: () => import("../components/Platfrom/PlatformEvents/PlatformEvents.vue"),
            meta: {
              title: "平台赛事"
            },
          },
          {
            path: "/match/oder/:accept_id/:match_id/:works_id",
            name: "oder",
            component: () => import("../components/Platfrom/PlatformEvents/oder/addOder.vue"),
            meta: {
              title: "发起预购"
            },
          },
        ],
      },
      {
        path: "/enterprise",
        name: "enterprise",
        component: () => import("../components/enterprise/listenterprise.vue"),
        meta: {
          title: "企业赛事"
        },
        children: [
          {
            path: "/enterprise",
            redirect: "/match/enterprise",
          },
          {
            path: "/match/enterprise",
            name: "match/enterprise",
            component: () => import("../components/enterprise/enterpriseEvents/enterpriseEvents.vue"),
            meta: {
              title: "企业赛事"
            },
          }
        ]
      },
      {
        path: "/users_company",
        name: "users_company",
        component: () => import("../components/Enterprisecertification/Enterprisecertification.vue"),
        meta: {
          title: "企业管理"
        },
        children: [
          {
            path: "/users_company",
            redirect: "/users_company/getAuth"
          },
          {
            path: "/users_company/getAuth",
            name: "users_company/getAuth",
            component: () => import("../components/Enterprisecertification/Enterprisecertificationval/Enterprisecertificationval.vue"),
            meta: {
              title: "企业认证"
            },
          }
        ]
      }
    ]
  },
  {
    path: "/register",
    name: "register",
    component: () => import("../views/register.vue"),
  },
  {
    path: "/about",
    name: "about",
    component: () => import("../views/About.vue"),
  },
  {
    path: "/vip",
    name: "vip",
    component: () => import("../views/vip.vue"),
  }
];

const router = new VueRouter({
  mode: "hash",
  base: process.env.BASE_URL,
  routes,
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
