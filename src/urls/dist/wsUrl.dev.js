"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.matchShowMatchApi = exports.ForumSetEssApi = exports.ForumSetTopApi = exports.ForumDelForumApi = exports.CircleGetForumApi = exports.ForumListForumApi = exports.Forum_themeGetListApi = exports.CircleGetCircleShowApi = exports.ForumReleaseApi = void 0;

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
};

exports.matchShowMatchApi = matchShowMatchApi;