<template>
  <div class="wrap">
    <div class="top">
      <img @click="back" class="back_img" src="../assets/nav_back.png" alt>
      <div>{{title}}</div>
      <span v-if="$route.params.type==0" class="cpt" @click="sub">{{$t('codedialog.c4')}}</span>
    </div>
    <div class="main">
      <ul class="form">
        <li>
          <span class="f_l">{{msg}}</span>
          <div class="f_r up_fr">
            <div class="up_div">
              <span class="icon f_c">+</span>
              <span class="jia">{{$t('wechat.phr.p1')}}</span>
              <img v-if="data1" :src="data1">
              <input
                name="img"
                :disabled="data1!=''"
                type="file"
                id="handcard"
                @change="pushImg1($event)"
                accept="image/jpeg, image/png, image/gif"
                alt
              >
              <span class="clear iconfont icon-shanchu1" v-if="urll" @click="delImg1($event)"></span>
            </div>
          </div>
        </li>
        <li>
          <span class="f_l">{{$t('wechat.label.l2')}}</span>
          <input
            class="f_r"
            type="text"
            v-model="name"
            :placeholder="$t('wechat.phr.p2')"
            :disabled="$route.params.type!=0"
          >
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import $ from "jquery";
export default {
  data() {
    return {
      title: "",
      name: "",
      acc: "",
      data1: "",
      urll: "",
      msg: ""
    };
  },
  components: {},
  mounted() {
    let that = this;
    mui.back = function() {
      that.$router.back();
      error;
    };
    if (that.$route.params.type == 0) {
      that.title = that.$t('wechat.title.t1');
      that.msg = that.$t('wechat.label.l1');
    } else {
      that.msg = that.$t('wechat.label.l3');
      that.title = that.$t('wechat.title.t2');
      that.name = sessionStorage.getItem("wechatnick");
      that.data1=sessionStorage.getItem("wechatimg");
    }
  },
  methods: {
    back() {
      this.$router.back();
    },
    // 上传
    pushImg1: function(e) {
      let file = e.target,
        reader = new FileReader(),
        that = this,
        _name,
        _fileName;
      _name = file.value;
      _fileName = _name.substring(_name.lastIndexOf(".") + 1).toLowerCase();
      // if (_fileName !== "png" && _fileName !== "jpg") {
      //   that.$vux.toast.show({
      //     text: "请上传图片类型文件！",
      //     type: "cancel",
      //     position: "middle",
      //     time: 1200
      //   });
      // }else{
      reader.readAsDataURL(file.files[0]);
      if (file.files[0].size > 10 * 1024 * 1024) {
        that.$vux.toast.show({
          text: that.$t("ups.d"),
          type: "warn",
          position: "middle",
          time: 1500
        });
      } else {
        that.$vux.loading.show({
          text: that.$t('load.uping')
        });
        reader.onload = function() {
          let result = this.result;

          // that.data1 = result;

          var image = new FormData();
          image.append("file", e.target.files[0]);
          image.append("type", "2");
          image.append("token", that.$store.state.user_info.token);
          that
            .$http({
              url: "/user/upload_pic",
              method: "post",
              data: image
            })
            .then(function(res) {
              that.$vux.loading.hide();
              if (res.data.code == 1) {
                that.data1 = result;
                that.urll = res.data.url;
              } else {
                that.$vux.toast.show({
                  text: res.data.msg,
                  type: "cancel",
                  position: "middle",
                  time: 1200
                });
              }
            });
        };
      }

      // }
    },
    delImg1: function(e) {
      this.data1 = "";
      this.urll="";
      let dom = document.getElementById("handcard");
      dom.value = "";
    },
    sub() {
      let that = this;
      if (that.name && that.urll) {
        that.$vux.loading.show({
          text: ""
        });
        that
          .$http({
            url: "/user/add_wechat",
            method: "post",
            data: {
              token: that.$store.state.user_info.token,
              wechat_nick: that.name,
              wechat_img: that.urll
            }
          })
          .then(function(res) {
            that.$vux.loading.hide();
            if (res.data.code == 1) {
              that.$vux.toast.show({
                text: res.data.msg,
                type: "success",
                position: "middle",
                time: 1200
              });
              that.$router.back();
            } else {
              that.$vux.toast.show({
                text: res.data.msg,
                type: "text",
                position: "middle",
                time: 1200
              });
            }
          });
      } else {
        that.$vux.toast.show({
          text: that.$t('tip.full_tip'),
          type: "cancel",
          position: "middle",
          time: 1200
        });
      }
    }
  }
};
</script>
<style lang="less" scoped>
.wrap {
  font-size: 0.36rem;
  width: 100%;
  height: 100%;
  color: white;
  box-sizing: border-box;
  padding: 1.3rem 0 1.5rem;
  overflow: auto;
  .top {
    background: #1a212a;
    .cpt {
      position: absolute;
      right: 4%;
      top: 0;
      font-size: 0.4rem;
      line-height: normal;
      padding: 0.28rem 0 0.25rem;
    }
  }
  .main {
    .form {
      background: #1a212a;
      li {
        overflow: hidden;
        border-bottom: 1px solid #12161c;
        padding: 0 4% 0;
        .f_l,
        .f_r {
          line-height: 1.1rem;
          height: 1.1rem;
        }
        .f_l {
          width: 2rem;
        }
        .up_fr {
          height: auto;
          line-height: normal;
          float: left;
          margin-left: 0.4rem;
          margin-top: 1rem;
          margin-bottom: 0.4rem;
        }
        input {
          width: calc(100% - 2rem);
          line-height: 1.1rem;
          box-sizing: border-box;
          padding: 0 0.2rem 0;
          background: transparent;
        }
        .up_div {
          clear: both;
          width: 4rem;
          height: 3.5rem;
          margin: 0 auto;
          border: 1px solid #fcb90b;
          position: relative;
          text-align: center;
          .icon {
            position: absolute;
            left: 50%;
            top: 0.3rem;
            font-size: 1.4rem;
            transform: translateX(-50%);
          }
          .jia {
            position: absolute;
            left: 50%;
            top: 2.1rem;
            color: #fcb90b;
            transform: translateX(-50%);
            white-space: nowrap;
          }
          img {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
          }
          input {
            opacity: 0;
            width: 100%;
            height: 100%;
            position: absolute;
            left: 0;
            top: 0;
          }
          .clear {
            font-size: 0.72rem;
            color: rgba(255, 255, 255, 0.8);
            position: absolute;
            right: -0.8rem;
            top: -0.4rem;
          }
        }
      }
    }
  }
}
</style>
