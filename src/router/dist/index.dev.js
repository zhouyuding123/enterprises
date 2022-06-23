"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _vue = _interopRequireDefault(require("vue"));

var _vueRouter = _interopRequireDefault(require("vue-router"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

_vue["default"].use(_vueRouter["default"]);

var routes = [{
  path: "/",
  redirect: "/login"
}, {
  path: "/login",
  name: "login",
  component: function component() {
    return Promise.resolve().then(function () {
      return _interopRequireWildcard(require("../components/login.vue"));
    });
  }
}, {
  path: "/home",
  name: "home",
  component: function component() {
    return Promise.resolve().then(function () {
      return _interopRequireWildcard(require("../views/HomeView.vue"));
    });
  },
  meta: {
    title: "控制台",
    requireAuth: true
  },
  children: [{
    path: "/home",
    redirect: "/pageHome"
  }, {
    path: "/pageHome",
    name: "homePage",
    component: function component() {
      return Promise.resolve().then(function () {
        return _interopRequireWildcard(require("../components/homePage/homePage.vue"));
      });
    }
  }, {
    path: "/Circle",
    name: "Circle",
    component: function component() {
      return Promise.resolve().then(function () {
        return _interopRequireWildcard(require("../components/tidalManagement/tidalList.vue"));
      });
    },
    meta: {
      title: "潮圈管理",
      requireAuth: true
    },
    children: [{
      path: "/Circle",
      redirect: "/Circle/listCircle"
    }, {
      path: "/Circle/listCircle",
      name: "Circle/listCircle",
      component: function component() {
        return Promise.resolve().then(function () {
          return _interopRequireWildcard(require("../components/tidalManagement/tidalList/tidalListValue.vue"));
        });
      },
      meta: {
        title: "圈子列表",
        requireAuth: true
      }
    }, {
      path: "/Circle/createCircle",
      name: "Circle/createCircle",
      component: function component() {
        return Promise.resolve().then(function () {
          return _interopRequireWildcard(require("../components/tidalManagement/createCircle/createCircle.vue"));
        });
      },
      meta: {
        title: "创建圈子",
        requireAuth: true
      }
    }, {
      path: "/Circle/getCircleShow:id",
      name: "Circle/getCircleShow",
      component: function component() {
        return Promise.resolve().then(function () {
          return _interopRequireWildcard(require("../components/tidalManagement/TheCircleICreated/TheCircleICreated.vue"));
        });
      },
      meta: {
        title: "查看圈子",
        requireAuth: true
      }
    }, {
      path: "/circle_notice/getList:id",
      name: "circle_notice/getList",
      component: function component() {
        return Promise.resolve().then(function () {
          return _interopRequireWildcard(require("../components/tidalManagement/TheCircleICreated/Notice/NoticeList.vue"));
        });
      },
      meta: {
        title: "圈子公告",
        requireAuth: true
      }
    }, {
      path: "/Forum/release:id",
      name: "Forum/release",
      component: function component() {
        return Promise.resolve().then(function () {
          return _interopRequireWildcard(require("../components/tidalManagement/TheCircleICreated/releasePost/release.vue"));
        });
      },
      meta: {
        title: "发布帖子",
        requireAuth: true
      }
    }, {
      path: "/Forum/showForum:id",
      name: "Forum/showForum",
      component: function component() {
        return Promise.resolve().then(function () {
          return _interopRequireWildcard(require("../components/tidalManagement/createDetils/createDetils.vue"));
        });
      },
      meta: {
        title: "圈子",
        requireAuth: true
      }
    }, {
      path: "/Circle/myCircle:id",
      name: "myCircle",
      component: function component() {
        return Promise.resolve().then(function () {
          return _interopRequireWildcard(require("../components/tidalManagement/management/management.vue"));
        });
      },
      meta: {
        title: "圈子管理",
        requireAuth: true
      }
    }, {
      path: "/getMember:id",
      name: "getMember",
      component: function component() {
        return Promise.resolve().then(function () {
          return _interopRequireWildcard(require("../components/tidalManagement/getMember/getMember.vue"));
        });
      },
      meta: {
        title: "成员管理",
        requireAuth: true
      }
    }, {
      path: "/Circles:id",
      name: "tation",
      component: function component() {
        return Promise.resolve().then(function () {
          return _interopRequireWildcard(require("../components/tidalManagement/management/managementChildren/invitation.vue"));
        });
      },
      meta: {
        title: "成员管理"
      },
      children: [{
        path: "/Circles:id",
        redirect: "/Circles/invitation:id"
      }, {
        path: "/Circles/invitation:id",
        name: "invitation",
        component: function component() {
          return Promise.resolve().then(function () {
            return _interopRequireWildcard(require("../components/tidalManagement/management/managementChildren/managementRen/managementRen.vue"));
          });
        },
        meta: {
          title: "成员邀请"
        }
      }, {
        path: "/Circles/del:id",
        name: "invitationdel",
        component: function component() {
          return Promise.resolve().then(function () {
            return _interopRequireWildcard(require("../components/tidalManagement/management/managementChildren/managementRen/managementdel.vue"));
          });
        },
        meta: {
          title: "成员移除"
        }
      }]
    }, {
      path: "/Circle/getCircleForum:id",
      name: "getCircleForum",
      component: function component() {
        return Promise.resolve().then(function () {
          return _interopRequireWildcard(require("../components/tidalManagement/Posts/Posts.vue"));
        });
      },
      meta: {
        title: "帖子管理"
      }
    }, {
      path: "/Activity/release",
      name: "Activity/release",
      component: function component() {
        return Promise.resolve().then(function () {
          return _interopRequireWildcard(require("../components/tidalManagement/Activities/Activities.vue"));
        });
      },
      meta: {
        title: "发布活动"
      }
    }]
  }, {
    path: "/Circles",
    name: "CircleS",
    component: function component() {
      return Promise.resolve().then(function () {
        return _interopRequireWildcard(require("../components/Stroll/StrollList.vue"));
      });
    },
    meta: {
      title: "逛逛"
    },
    children: [{
      path: "/Circles",
      redirect: "/Circles/Stroll"
    }, {
      path: "/Circles/Stroll",
      name: "Circles/Stroll",
      component: function component() {
        return Promise.resolve().then(function () {
          return _interopRequireWildcard(require("../components/Stroll/StrollAround/strollAroundList.vue"));
        });
      },
      meta: {
        title: "逛逛列表"
      }
    }, {
      path: "/Circles/release",
      name: "Circles/release",
      component: function component() {
        return Promise.resolve().then(function () {
          return _interopRequireWildcard(require("../components/Stroll/StrollAround/strollRelease/strollRelease.vue"));
        });
      },
      meta: {
        title: "逛逛帖子发布"
      }
    }]
  }, {
    path: "/Local",
    name: "Local",
    component: function component() {
      return Promise.resolve().then(function () {
        return _interopRequireWildcard(require("../components/local/localList.vue"));
      });
    },
    meta: {
      title: "本地"
    },
    children: [{
      path: "/Local",
      redirect: "/Local/local"
    }, {
      path: "/Local/local",
      name: "Local/local",
      component: function component() {
        return Promise.resolve().then(function () {
          return _interopRequireWildcard(require("../components/local/LocalAround/LocalAroundList.vue"));
        });
      },
      meta: {
        title: "本地帖子列表"
      }
    }, {
      path: "/Local/release",
      name: "Local/release",
      component: function component() {
        return Promise.resolve().then(function () {
          return _interopRequireWildcard(require("../components/local/LocalAround/LocalRelease/LocalRelease.vue"));
        });
      },
      meta: {
        title: "本地帖子发布"
      }
    }]
  }, {
    path: "/News",
    name: "News",
    component: function component() {
      return Promise.resolve().then(function () {
        return _interopRequireWildcard(require("../components/News/NewsList.vue"));
      });
    },
    meta: {
      title: "消息"
    },
    children: [{
      path: "/News",
      redirect: "/News/news"
    }, {
      path: "/News/news",
      name: "News/news",
      component: function component() {
        return Promise.resolve().then(function () {
          return _interopRequireWildcard(require("../components/News/NewsAround/NewsAroundList.vue"));
        });
      },
      meta: {
        title: "消息列表"
      }
    }]
  }, {
    path: "/Post",
    name: "Post",
    component: function component() {
      return Promise.resolve().then(function () {
        return _interopRequireWildcard(require("../components/Post/Post.vue"));
      });
    },
    meta: {
      title: "帖子"
    },
    children: [{
      path: "/Post",
      redirect: "/Post/post"
    }, {
      path: "/Post/post",
      name: "Post/post",
      component: function component() {
        return Promise.resolve().then(function () {
          return _interopRequireWildcard(require("../components/Post/postList/postList.vue"));
        });
      },
      meta: {
        title: "帖子管理"
      }
    }]
  }, {
    path: "/Business",
    name: "Business",
    component: function component() {
      return Promise.resolve().then(function () {
        return _interopRequireWildcard(require("../components/StoreManagement/listBusiness.vue"));
      });
    },
    meta: {
      title: "门店管理"
    },
    children: [{
      path: "/Business",
      redirect: "/Business/listBusiness"
    }, {
      path: "/Business/listBusiness",
      name: "listBusiness",
      component: function component() {
        return Promise.resolve().then(function () {
          return _interopRequireWildcard(require("../components/StoreManagement/BusinessList/BusinessList.vue"));
        });
      },
      meta: {
        title: "门店列表"
      }
    }]
  }, {
    path: "/match",
    name: "match",
    component: function component() {
      return Promise.resolve().then(function () {
        return _interopRequireWildcard(require("../components/EventManagement/listEvent.vue"));
      });
    },
    meta: {
      title: "赛事管理"
    },
    children: [{
      path: "/match",
      redirect: "/match/listMacthMF"
    }, {
      path: "/match/listMacthMF",
      name: "listMacthMF",
      component: function component() {
        return Promise.resolve().then(function () {
          return _interopRequireWildcard(require("../components/EventManagement/EventList/EventList.vue"));
        });
      },
      meta: {
        title: "赛事列表"
      }
    }, {
      path: "/match/detial:id",
      name: "match/detial",
      component: function component() {
        return Promise.resolve().then(function () {
          return _interopRequireWildcard(require("../components/EventManagement/EventList/listFlag/detial/detial.vue"));
        });
      },
      meta: {
        title: "赛事详情"
      }
    }, {
      path: "/match/release",
      name: "match/release",
      component: function component() {
        return Promise.resolve().then(function () {
          return _interopRequireWildcard(require("../components/EventManagement/EventList/listFlag/add/addMatch.vue"));
        });
      },
      meta: {
        title: "添加赛事"
      }
    }, {
      path: "/Match/works:id",
      name: "Match/works",
      component: function component() {
        return Promise.resolve().then(function () {
          return _interopRequireWildcard(require("../components/EventManagement/EventList/listFlag/screening/screening.vue"));
        });
      },
      meta: {
        title: "稿件筛选"
      }
    }, {
      path: "/worksShow/:works_id/:id",
      name: "worksShow",
      component: function component() {
        return Promise.resolve().then(function () {
          return _interopRequireWildcard(require("../components/EventManagement/EventList/listFlag/screening/screeningDetial/screeningDetial.vue"));
        });
      },
      meta: {
        title: "稿件详情"
      }
    }]
  }, {
    path: "/brand",
    name: "brand",
    component: function component() {
      return Promise.resolve().then(function () {
        return _interopRequireWildcard(require("../components/BrandManagement/listBrand.vue"));
      });
    },
    meta: {
      title: "品牌管理"
    },
    children: [{
      path: "/brand",
      redirect: "/brand/getList"
    }, {
      path: "/brand/getList",
      name: "getList",
      component: function component() {
        return Promise.resolve().then(function () {
          return _interopRequireWildcard(require("../components/BrandManagement/BrandList/BrandList.vue"));
        });
      },
      meta: {
        title: "品牌列表"
      }
    }, {
      path: "/brand/addOp",
      name: "addOp",
      component: function component() {
        return Promise.resolve().then(function () {
          return _interopRequireWildcard(require("../components/BrandManagement/BrandList/operation/addOp.vue"));
        });
      },
      meta: {
        title: "添加品牌"
      }
    }]
  }, {
    path: "/company_product",
    name: "company_product",
    component: function component() {
      return Promise.resolve().then(function () {
        return _interopRequireWildcard(require("../components/commodity/listCommodity.vue"));
      });
    },
    meta: {
      title: "商品管理"
    },
    children: [{
      path: "/company_product",
      redirect: "/company_product/getList"
    }, {
      path: "/company_product/getList",
      name: "company_product/getList",
      component: function component() {
        return Promise.resolve().then(function () {
          return _interopRequireWildcard(require("../components/commodity/commodityList/commodityList.vue"));
        });
      },
      meta: {
        title: "商品列表"
      }
    }, {
      path: "/custype/getList",
      name: "custype/getList",
      component: function component() {
        return Promise.resolve().then(function () {
          return _interopRequireWildcard(require("../components/commodity/classification/classificationList.vue"));
        });
      },
      meta: {
        title: "分类列表"
      }
    }, {
      path: "/users_service/listService",
      name: "users_service/listService",
      component: function component() {
        return Promise.resolve().then(function () {
          return _interopRequireWildcard(require("../components/commodity/service/serviceList.vue"));
        });
      },
      meta: {
        title: "服务列表"
      }
    }]
  }, {
    path: "/designer_works",
    name: "designer_works",
    component: function component() {
      return Promise.resolve().then(function () {
        return _interopRequireWildcard(require("../components/designer/designer.vue"));
      });
    },
    meta: {
      title: "设计师专区"
    },
    children: [{
      path: "/designer_works",
      redirect: "/designer_works/getListMF"
    }, {
      path: "/designer_works/getListMF",
      name: "getListMF",
      component: function component() {
        return Promise.resolve().then(function () {
          return _interopRequireWildcard(require("../components/designer/free/freeList.vue"));
        });
      },
      meta: {
        title: "免费列表"
      }
    }, {
      path: "/designer_works/getListMF/freeDetil:id",
      name: "freeDetil",
      component: function component() {
        return Promise.resolve().then(function () {
          return _interopRequireWildcard(require("../components/designer/free/freeDetil/freeDetil.vue"));
        });
      },
      meta: {
        title: "免费作品"
      }
    }, {
      path: "/designer_works/getListFF",
      name: "getListFF",
      component: function component() {
        return Promise.resolve().then(function () {
          return _interopRequireWildcard(require("../components/designer/pay/payList.vue"));
        });
      },
      meta: {
        title: "付费列表"
      }
    }]
  }, {
    path: "/Platfrom",
    name: "Platfrom",
    component: function component() {
      return Promise.resolve().then(function () {
        return _interopRequireWildcard(require("../components/designer/designer.vue"));
      });
    },
    meta: {
      title: "官方赛事"
    },
    children: [{
      path: "/Platfrom",
      redirect: "/match/platform"
    }, {
      path: "/match/platform",
      name: "platform",
      component: function component() {
        return Promise.resolve().then(function () {
          return _interopRequireWildcard(require("../components/Platfrom/PlatformEvents/PlatformEvents.vue"));
        });
      },
      meta: {
        title: "平台赛事"
      }
    }]
  }, {
    path: "/enterprise",
    name: "enterprise",
    component: function component() {
      return Promise.resolve().then(function () {
        return _interopRequireWildcard(require("../components/enterprise/listenterprise.vue"));
      });
    },
    meta: {
      title: "企业赛事"
    },
    children: [{
      path: "/enterprise",
      redirect: "/match/enterprise"
    }, {
      path: "/match/enterprise",
      name: "enterprise",
      component: function component() {
        return Promise.resolve().then(function () {
          return _interopRequireWildcard(require("../components/enterprise/enterpriseEvents/enterpriseEvents.vue"));
        });
      },
      meta: {
        title: "企业赛事"
      }
    }]
  }]
}, {
  path: "/register",
  name: "register",
  component: function component() {
    return Promise.resolve().then(function () {
      return _interopRequireWildcard(require("../views/register.vue"));
    });
  }
}, {
  path: "/about",
  name: "about",
  component: function component() {
    return Promise.resolve().then(function () {
      return _interopRequireWildcard(require("../views/About.vue"));
    });
  }
}];
var router = new _vueRouter["default"]({
  mode: "hash",
  base: process.env.BASE_URL,
  routes: routes
});
var originPush = _vueRouter["default"].prototype.push;
var originReplace = _vueRouter["default"].prototype.replace; // 给原型对象上的push指定新函数函数

_vueRouter["default"].prototype.push = function (location, onComplete, onAbort) {
  // 判断如果没有指定回调函数, 通过call调用源函数并使用catch来处理错误
  if (onComplete === undefined && onAbort === undefined) {
    return originPush.call(this, location, onComplete, onAbort)["catch"](function () {});
  } else {
    // 如果有指定任意回调函数, 通过call调用源push函数处理
    originPush.call(this, location, onComplete, onAbort);
  }
}; // replace同理处理


_vueRouter["default"].prototype.replace = function (location, onComplete, onAbort) {
  if (onComplete === undefined && onAbort === undefined) {
    return originReplace.call(this, location, onComplete, onAbort)["catch"](function () {});
  } else {
    originReplace.call(this, location, onComplete, onAbort);
  }
};

var _default = router;
exports["default"] = _default;