<template>
  <div class="perpdding">
    <div class="line1">
      <el-tabs v-model="activeName" @tab-click="clearMapstores">
        <el-tab-pane label="个人信息" name="first"> </el-tab-pane>
        <el-tab-pane label="账号与安全" name="second"> </el-tab-pane>
        <el-tab-pane label="隐私" name="third"> </el-tab-pane>
      </el-tabs>
    </div>
    <div class="lineone" v-if="activeName == 'first'">
      <div class="lineongpadding">
        <el-form
          :model="personalruleForm"
          :rules="personalrules"
          ref="personalruleForm"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="头像">
            <el-upload
              action="https://weisou.chengduziyi.com/admin/Uploads/uploadFile"
              :show-file-list="false"
              :data="{ fileType: this.fileType }"
              multiple
              :on-success="handleAvatarSuccesser"
              :before-upload="beforeAvatarUpload"
            >
              <img
                v-if="valueData.headimage"
                :src="imagesValue + valueData.headimage"
                class="avatar"
              />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <el-form-item label="企业名称">
            <el-input v-model="valueData.nickname"></el-input>
          </el-form-item>
          <el-form-item label="企业电话">
            <el-input v-model="valueData.tel"></el-input>
          </el-form-item>
          <div class="typetext">
            <el-form-item label="企业简介">
              <el-input
                v-model="valueData.description.introduce"
                type="textarea"
              ></el-input>
            </el-form-item>
          </div>
          <el-form-item label="微信账号">
            <div class="vx">
              <div class="vxgr">
                <img src="@/assets/myimger/微信个人.png" alt="" />
              </div>
              <div class="ljbd">立即绑定</div>
            </div>
          </el-form-item>
          <div>
            <div
              class="mapint"
              style="
                padding-left: 40px;
                padding-right: 40px;
                padding-bottom: 40px;
              "
            >
              <div class="map-search_wrapper" id="bmapSearch">
                <div class="header">
                  <div style="width: 150px">地址：</div>
                  <el-tooltip
                    class="item"
                    effect="dark"
                    :content="textTip"
                    placement="top"
                    :value="isshowTip"
                    manual
                  >
                    <el-input
                      type="text"
                      placeholder="请输入内容"
                      @focus="editText"
                      v-model="keyWord"
                      @keyup.native.13="search"
                      clearable
                      class="search-input"
                    >
                    </el-input>
                  </el-tooltip>
                  <el-button type="primary" size="medium" @click="search"
                    >查询</el-button
                  >
                  <div style="margin-left: 10px; width: 103px">经纬：</div>
                  <el-input
                    type="text"
                    v-model="longAndLat"
                    ref="long"
                    class="search-input"
                  >
                  </el-input>
                </div>
                <div id="container" style="overflow: hidden"></div>
              </div>
            </div>
          </div>
        </el-form>
      </div>
    </div>
    <div v-if="activeName == 'first'" class="bc">
      <div @click="preservation">
        <span>保存</span>
      </div>
    </div>
  </div>
</template>

<script>
import { getInfoApi, editInfoApi } from "@/urls/wsUrl.js";
import { postD } from "@/api";
import { imgUrl, asyncJS } from "@/assets/js/modifyStyle";
export default {
  inject: ["reload"],
  data() {
    return {
      imagesValue: "",
      activeName: "first",
      personalruleForm: {},
      personalrules: {},
      fileType: "images",
      pass: {
        username: "",
      },
      valueData: {
        headimage: "",
        nickname: "",
        tel: "",
        province: "",
        city: "",
        area: "",
        detail: "",
        lng: JSON.parse(localStorage.getItem("data")).lng,
        lat: JSON.parse(localStorage.getItem("data")).lat,
        description: {
          introduce: "",
          photo: "",
          qualifications: "",
          video: "",
        },
      },
      selectedOptions: [],
      selectedOptionss: "",
      address: "",
      selectedOptionsshow: "1",
      // 地图
      keyWord: "",
      longAndLat: "",
      map: null,
      mapMark: null,
      localSearch: "",
      textTip: "",
      isshowTip: false,
      jwd: JSON.parse(localStorage.getItem("data")),
    };
  },
  created() {
    this.myUser();
    this.imagesValue = imgUrl();
    this.clearMapstore();
  },
  mounted() {
    window.onLoadMap = () => {
      if (
        this.jwd.lat == null ||
        this.jwd.lat == "0" ||
        (this.jwd.lat == "" && this.jwd.lng == null) ||
        this.jwd.lng == "0" ||
        this.jwd.lng == ""
      ) {
        this.jwd = {
          lng: "121.547355",
          lat: "29.809097",
        };
      }
      this.ready();
    };
    // key 值需要去高德地图去申请才可以
    asyncJS(
      "https://webapi.amap.com/maps?v=1.4.15&key=4809a108fd29d9ff15029338f2e1f49a&callback=onLoadMap"
    );
  },
  methods: {
    clearMapstores(tab, event) {
      if (this.activeName === "first") {
        this.clearMapstore();
        window.onLoadMap = () => {
          if (
            this.jwd.lat == null ||
            (this.jwd.lat == "0" && this.jwd.lng == null) ||
            this.jwd.lng == "0"
          ) {
            this.jwd = {
              lng: "121.547355",
              lat: "29.809097",
            };
          }
          this.ready();
        };
        // key 值需要去高德地图去申请才可以
        asyncJS(
          "https://webapi.amap.com/maps?v=1.4.15&key=4809a108fd29d9ff15029338f2e1f49a&callback=onLoadMap"
        );
      }
    },
    clearMapstore() {
      localStorage.removeItem("_AMap_vectorlayer");
      localStorage.removeItem("_AMap_wgl");
      localStorage.removeItem("_AMap_sync");
      localStorage.removeItem("_AMap_raster");
      localStorage.removeItem("_AMap_overlay");
      localStorage.removeItem("_AMap_mouse");
      localStorage.removeItem("_AMap_AMap.ToolBar");
      localStorage.removeItem("_AMap_AMap.Scale");
      localStorage.removeItem("_AMap_AMap.RangingTool");
      localStorage.removeItem("_AMap_AMap.PolyEditor");
      localStorage.removeItem("_AMap_AMap.PlaceSearch");
      localStorage.removeItem("_AMap_AMap.OverView");
      localStorage.removeItem("_AMap_AMap.MouseTool");
      localStorage.removeItem("_AMap_AMap.MarkerClusterer");
      localStorage.removeItem("_AMap_AMap.MapType");
      localStorage.removeItem("_AMap_AMap.Geolocation");
      localStorage.removeItem("_AMap_AMap.CitySearch");
      localStorage.removeItem("_AMap_AMap.CircleEditor");
      localStorage.removeItem("_AMap_AMap.Autocomplete");
      localStorage.removeItem("_AMap_AMap.IndoorMap3D");
      localStorage.removeItem("_AMap_Map3D");
      localStorage.removeItem("_AMap_labelcanvas");
      localStorage.removeItem("_AMap_labelDir");
      localStorage.removeItem("_AMap_data.tileKeys");
      localStorage.removeItem("_AMap_AMap.CustomLayer");
      localStorage.removeItem("_AMap_AMap.Geocoder");
      localStorage.removeItem("_AMap_AMap.CustomLayer");
      localStorage.removeItem("_AMap_AMap.IndoorMap");
      localStorage.removeItem("_AMap_anole");
      localStorage.removeItem("_AMap_cmng");
      localStorage.removeItem("_AMap_cvector");
    },
    myUser() {
      this.pass.username = localStorage.getItem("use");
      postD(getInfoApi(), this.pass).then((res) => {
        this.valueData.headimage = res.data.headimage;
        this.valueData.nickname = res.data.nickname;
        this.valueData.tel = res.data.tel;
        this.valueData.province = res.data.province;
        this.valueData.city = res.data.city;
        this.valueData.area = res.data.area;
        this.valueData.detail = res.data.detail;
        console.log(this.valueData.detail );
        if(res.data.description != null) {
          let des =JSON.parse(res.data.description)
          var introduce = "";
        if (
          des.introduce == "" ||
          des.introduce == 0 ||des.introduce == null
        ) {
          introduce = "";
        } else {
          introduce = des.introduce;
        }
        this.valueData.description.introduce = introduce;
        var photo = "";
        if (res.data.description.photo == "" || res.data.description.photo) {
          photo = "";
        }
        this.valueData.description.photo =
          photo || JSON.parse(res.data.description).photo;
        var qualifications = "";
        if (
          res.data.description.qualifications == "" ||
          res.data.description.qualifications
        ) {
          qualifications = "";
        }
        this.valueData.description.qualifications =
          qualifications || JSON.parse(res.data.description).qualifications;
        var video = "";
        if (res.data.description.video == "" || res.data.description.video) {
          video = "";
        }
        this.valueData.description.video =
          video || JSON.parse(res.data.description).video;

        }
        var lng = "";
        if (res.data.lng == 0) {
          lng = "";
        } else {
          lng = res.data.lng;
        }
        var lat = "";
        if (res.data.lat == 0) {
          lat = "";
        } else {
          lat = res.data.lat;
        }
        this.valueData.lng = lng || "";
        this.valueData.lat = lat || "";
        this.keyWord =
          this.valueData.province +
            this.valueData.city +
            this.valueData.area +
            this.valueData.detail || "";
        if (res.data.lng == 0 || res.data.lat == 0) {
          this.longAndLat == "";
        } else {
          this.longAndLat = this.valueData.lng + "," + this.valueData.lat;
        }
        
      });
    },
    handleAvatarSuccesser(res, file) {
      this.valueData.headimage = res.url;
    },
    beforeAvatarUpload(file) {
      const isJPG =
        file.type === "image/jpeg" ||
        file.type === "image/gif" ||
        file.type === "image/jpg" ||
        file.type === "image/x-pn" ||
        file.type === "image/png";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 图片 格式!");
      }
      if (!isLt2M) {
        this.$message.error("这是一条消息提示");
      }
      return isJPG && isLt2M;
    },
    preservation() {
      this.$refs.personalruleForm.validate((v) => {
        if (!v) return;
        this.personalruleForm = this.valueData;
        this.personalruleForm.description = JSON.stringify(
          this.valueData.description
        );
        this.personalruleForm.lat = this.valueData.lat;
        this.personalruleForm.lng = this.valueData.lng;
        console.log(this.personalruleForm);
        postD(editInfoApi(), this.personalruleForm).then((res) => {
          if (res.code == "200") {
            this.$message.success("保存成功");
            this.reload();
          } else {
            this.$message.error("保存时出现问题");
          }
        });
      });
    },
    closeBmap() {
      this.$emit("closeBmap");
    },
    comfirmBmap() {
      this.$emit("comfirmBmap", this.longAndLat);
    },
    ready() {
      var zxcthis = this;
      zxcthis.map = new window.AMap.Map("container", {
        resizeEnable: true,
        zoom: 50, //级别
        center: [zxcthis.jwd.lng, zxcthis.jwd.lat], //中心点坐标
        viewMode: "3D", //使用3D视图
      });

      zxcthis.search();
      let _this = zxcthis;
      // 为地图注册click事件获取鼠标点击出的经纬度坐标
      zxcthis.map.on("click", function (e) {
        let lng = e.lnglat.getLng();
        let lat = e.lnglat.getLat();
        _this.longAndLat = lng + "," + lat;
        // 打新的标记
        _this.addMarker(lng, lat);
      });
    },
    search() {
      let _this = this;
      window.AMap.plugin("AMap.PlaceSearch", function () {
        var autoOptions = {
          city: "全国",
          map: _this.map, // 展现结果的地图实例
          pageSize: 1, // 单页显示结果条数
          pageIndex: 1, // 页码
          autoFitView: true, // 是否自动调整地图视野使绘制的 Marker点都处于视口的可见范围
        };
        var placeSearch = new window.AMap.PlaceSearch(autoOptions);
        placeSearch.search(_this.keyWord, function (status, result) {
          // 搜索成功时，result即是对应的匹配数据
          if (status == "complete") {
            if (result.poiList.pois.length > 0) {
              let lng = result.poiList.pois[0].location.lng;
              let lat = result.poiList.pois[0].location.lat;
              _this.longAndLat = lng + "," + lat;
              _this.addMarker(lng, lat);
            } else {
              _this.$message({
                message: "没有查询到对应的地址",
                type: "warning",
              });
            }
          } else if (status == "no_data") {
            _this.$message({
              message: "没有查询到对应的地址",
              type: "warning",
            });
          }
        });
      });
    },
    // 清除 marker
    clearMarker() {
      if (this.mapMark) {
        this.mapMark.setMap(null);
        this.mapMark = null;
      }
    },
    // 实例化点标记
    addMarker(lng, lat) {
      let _this = this;
      this.mapMark = new window.AMap.Marker({
        position: [lng, lat],
        map: _this.map,
      });
      this.mapMark.setMap(this.map);
      let lnglatXY = [lng, lat];
      AMap.plugin("AMap.Geocoder", function () {
        var that = _this;

        var geocoder = new AMap.Geocoder({
          radius: 1000,
          extensions: "all",
        });

        geocoder.getAddress(lnglatXY, (status, result) => {
          var asd = result.regeocode.formattedAddress;
          that.keyWord = asd;
          that.valueData.province = result.regeocode.addressComponent.province;
          that.valueData.city = result.regeocode.addressComponent.city;
          that.valueData.area = result.regeocode.addressComponent.district;
          that.valueData.detail =
            result.regeocode.addressComponent.township +
            result.regeocode.aois[0].name;
          that.valueData.lng = lnglatXY[0];
          that.valueData.lat = lnglatXY[1];
        });
        // 清除所有标记

        that.map.clearMap();

        var marker = new AMap.Marker();

        that.map.add(marker);

        marker.setPosition(lnglatXY);
      });
    },
    editText() {
      this.isshowTip = false;
    },
  },
};
</script>

<style lang="less" scoped>
@import url("./personallist.less");
.map-search_wrapper {
  z-index: 500;
  border-radius: 5px;
  width: 100%;
  min-height: 50%;
  min-width: 300px;

  background: #050742;
  color: #000000;
  .header {
    width: 100%;
    height: 60px;
    top: 0;
    left: 0;
    line-height: 4.5;
    font-size: 14px;
    color: #fff;
    display: flex;
    margin-left: 20px;
  }
  /deep/.el-button--primary {
    margin-top: 13px;
  }
  #container {
    width: 100%;
    height: 88vh;
    background-color: #ffffff;
  }
}
/deep/.map-search_wrapper[data-v-c25aea90] .el-button--primary {
  margin-left: -30px;
}
.mapint {
  /deep/.el-input__inner {
    width: 390px !important;
  }
}
</style>