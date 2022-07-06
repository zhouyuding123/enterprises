"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ordersGetOrderStatApi = exports.pay = exports.ordersAddVipApi = exports.MatchVotoCountApi = exports.matchAccessListApi = exports.match_productSelectDelApi = exports.match_productShowProductApi = exports.match_productSelectSetDelApi = exports.match_productSetStatusApi = exports.match_productGetListMyApi = exports.custypeGetListApi = exports.designerGetListApi = exports.designerMyCenterApi = exports.match_productAddProductApi = exports.brandGetListApi = exports.MatchScreenApi = exports.MatchWorksListApi = exports.MatchSetVotoApi = exports.MatchVerVotoApi = exports.MatchWorksApi = exports.matchAddAccessApi = exports.matchListMacthApi = exports.users_companyLoginPWApi = exports.users_companyVerifyUsersApi = exports.users_companyRegisterApi = exports.BusinessDelBusinessApi = exports.designer_worksCommentApi = exports.designer_worksShowApi = exports.designer_worksGetListApi = exports.matchShowMatchApi = exports.ForumSetEssApi = exports.ForumSetTopApi = exports.ForumDelForumApi = exports.CircleGetForumApi = exports.ForumListForumApi = exports.Forum_themeGetListApi = exports.CircleGetCircleShowApi = exports.ForumReleaseApi = void 0;

var ForumReleaseApi = function ForumReleaseApi() {
  return "Forum/release";
}; // 详情


exports.ForumReleaseApi = ForumReleaseApi;

var CircleGetCircleShowApi = function CircleGetCircleShowApi() {
  return "Circle/getCircleShow";
};

exports.CircleGetCircleShowApi = CircleGetCircleShowApi;

var Forum_themeGetListApi = function Forum_themeGetListApi() {
  return "Forum_theme/getList";
}; // 论坛帖子列表


exports.Forum_themeGetListApi = Forum_themeGetListApi;

var ForumListForumApi = function ForumListForumApi() {
  return "Forum/listForum";
}; // 我的帖子


exports.ForumListForumApi = ForumListForumApi;

var CircleGetForumApi = function CircleGetForumApi() {
  return "Circle/getForum";
}; // 删除


exports.CircleGetForumApi = CircleGetForumApi;

var ForumDelForumApi = function ForumDelForumApi() {
  return "Forum/delForum";
}; // 置顶


exports.ForumDelForumApi = ForumDelForumApi;

var ForumSetTopApi = function ForumSetTopApi() {
  return "Forum/setTop";
}; // 精华


exports.ForumSetTopApi = ForumSetTopApi;

var ForumSetEssApi = function ForumSetEssApi() {
  return "Forum/setEss";
}; // 赛事详情


exports.ForumSetEssApi = ForumSetEssApi;

var matchShowMatchApi = function matchShowMatchApi() {
  return "match/showMatch";
}; // 设计师作品列表


exports.matchShowMatchApi = matchShowMatchApi;

var designer_worksGetListApi = function designer_worksGetListApi() {
  return "designer_works/getList";
}; // 作品信息


exports.designer_worksGetListApi = designer_worksGetListApi;

var designer_worksShowApi = function designer_worksShowApi() {
  return "designer_works/show";
}; // 作品评论


exports.designer_worksShowApi = designer_worksShowApi;

var designer_worksCommentApi = function designer_worksCommentApi() {
  return "designer_works/comment";
}; // 删除门店


exports.designer_worksCommentApi = designer_worksCommentApi;

var BusinessDelBusinessApi = function BusinessDelBusinessApi() {
  return "Business/delBusiness";
}; // 注册账号


exports.BusinessDelBusinessApi = BusinessDelBusinessApi;

var users_companyRegisterApi = function users_companyRegisterApi() {
  return "users_company/register";
}; // 注册验证账号


exports.users_companyRegisterApi = users_companyRegisterApi;

var users_companyVerifyUsersApi = function users_companyVerifyUsersApi() {
  return "users_company/verifyUsers";
}; // 登入


exports.users_companyVerifyUsersApi = users_companyVerifyUsersApi;

var users_companyLoginPWApi = function users_companyLoginPWApi() {
  return "users_company/loginPW";
}; // 所有赛事列表（进行中）


exports.users_companyLoginPWApi = users_companyLoginPWApi;

var matchListMacthApi = function matchListMacthApi() {
  return "match/listMacth";
}; // 赛事冠名 


exports.matchListMacthApi = matchListMacthApi;

var matchAddAccessApi = function matchAddAccessApi() {
  return "match/addAccess";
}; // 参赛作品列表（随机排序,赛事预览效果）


exports.matchAddAccessApi = matchAddAccessApi;

var MatchWorksApi = function MatchWorksApi() {
  return "Match/works";
}; // 验证可否投票


exports.MatchWorksApi = MatchWorksApi;

var MatchVerVotoApi = function MatchVerVotoApi() {
  return "Match/verVoto";
}; // 作品投票


exports.MatchVerVotoApi = MatchVerVotoApi;

var MatchSetVotoApi = function MatchSetVotoApi() {
  return "Match/setVoto";
}; // 参赛作品列表（评选期以前只能发布者查看，评选期只有发布者和冠名商查看（可查看投票情况），公示期都可查看（可查看投票情况））


exports.MatchSetVotoApi = MatchSetVotoApi;

var MatchWorksListApi = function MatchWorksListApi() {
  return "Match/worksList";
}; // 作品筛选


exports.MatchWorksListApi = MatchWorksListApi;

var MatchScreenApi = function MatchScreenApi() {
  return "Match/screen";
}; // 品牌列表


exports.MatchScreenApi = MatchScreenApi;

var brandGetListApi = function brandGetListApi() {
  return "brand/getList";
}; // 添加预售商品


exports.brandGetListApi = brandGetListApi;

var match_productAddProductApi = function match_productAddProductApi() {
  return "match_product/addProduct";
}; // 设计师基本信息


exports.match_productAddProductApi = match_productAddProductApi;

var designerMyCenterApi = function designerMyCenterApi() {
  return "designer/myCenter";
}; // 作品列表


exports.designerMyCenterApi = designerMyCenterApi;

var designerGetListApi = function designerGetListApi() {
  return "designer/getList";
}; // 分类列表


exports.designerGetListApi = designerGetListApi;

var custypeGetListApi = function custypeGetListApi() {
  return "custype/getList";
}; // 预售商品列表


exports.custypeGetListApi = custypeGetListApi;

var match_productGetListMyApi = function match_productGetListMyApi() {
  return "match_product/getListMy";
}; // 商品上下架 可批量


exports.match_productGetListMyApi = match_productGetListMyApi;

var match_productSetStatusApi = function match_productSetStatusApi() {
  return "match_product/setStatus";
}; // 进入回收站 可批量操作


exports.match_productSetStatusApi = match_productSetStatusApi;

var match_productSelectSetDelApi = function match_productSelectSetDelApi() {
  return "match_product/selectSetDel";
}; //预算商品详情


exports.match_productSelectSetDelApi = match_productSelectSetDelApi;

var match_productShowProductApi = function match_productShowProductApi() {
  return "match_product/showProduct";
}; // 删除预售商品 可批量


exports.match_productShowProductApi = match_productShowProductApi;

var match_productSelectDelApi = function match_productSelectDelApi() {
  return "match_product/selectDel";
}; // 我冠名的赛事列表


exports.match_productSelectDelApi = match_productSelectDelApi;

var matchAccessListApi = function matchAccessListApi() {
  return "match/accessList";
}; // 当前赛事剩余投票次数


exports.matchAccessListApi = matchAccessListApi;

var MatchVotoCountApi = function MatchVotoCountApi() {
  return "Match/votoCount";
}; // 创建开通vip订单


exports.MatchVotoCountApi = MatchVotoCountApi;

var ordersAddVipApi = function ordersAddVipApi() {
  return "orders/addVip";
}; // pc-微信支付


exports.ordersAddVipApi = ordersAddVipApi;

var pay = function pay() {
  return "https://weisou.chengduziyi.com/pay/Wxpay/pay";
}; // 读取订单明细


exports.pay = pay;

var ordersGetOrderStatApi = function ordersGetOrderStatApi() {
  return "orders/getOrderStat";
};

exports.ordersGetOrderStatApi = ordersGetOrderStatApi;