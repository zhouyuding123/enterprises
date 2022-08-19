export function styleModify() {
  return "background: #FFFFFF;box-shadow: 0px 2px 5px 1px rgba(0, 0, 0, 0.05);border-radius: 10px 10px 10px 10px;opacity: 1;";
}
export function styleModifytwo() {
  return "box-shadow: 0px 2px 5px 1px rgba(0, 0, 0, 0.05);border-radius: 10px 10px 10px 10px;opacity: 1;";
}

export function imgUrl() {
  return "https://weisoutc.oss-cn-shanghai.aliyuncs.com/"
}
export function imgUrls() {
  return "https://weisou.chengduziyi.com/"
}

export function beforeAvatar(file) {
  const isJPG = file.type === "image/jpeg" || file.type === "image/gif" || file.type === "image/jpg" || file.type === "image/x-pn" || file.type === "image/png";
  const isLt2M = file.size / 1024 / 1024 < 2;

  if (!isJPG) {
    this.$message.error("上传头像图片只能是 图片 格式!");
  }
  if (!isLt2M) {
    this.$message.error("上传头像图片大小不能超过 2MB!");
  }
  return isJPG && isLt2M;
}

export function matchType(name) {
  //后缀获取
  let suffic = '';
  //获取类型结果
  let result = '';
  try {
    let fileArr = name.split('.');
    suffic = fileArr[fileArr.length - 1]
    // console.log('suffic',suffic);
  } catch (error) {
    suffic = ''
  }
  //图片格式
  var imgList = ['png', 'jpg', 'jpeg', 'bmp', 'gif'];
  //进行图片匹配
  result = imgList.some(item => {
    return item === suffic
  })
  // console.log('结果',result);
  if (result) {
    result = 'image';
    // console.log('结果',result);
    return result
  }
}

// 异步js
export const asyncJS = (src) => {
  var jsapi = document.createElement('script');
  jsapi.charset = 'utf-8';
  jsapi.src = src;
  document.head.appendChild(jsapi);
};