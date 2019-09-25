<template>
  <div class="wrap">
    <img v-if="$store.state.imgIf" class="start" src="../assets/start.gif" alt>
    <div class="top" v-if="!$store.state.imgIf">
      <!-- 选择语言 -->
      <div @click="lang_dlg=true">
        <span v-if="$store.state.lang=='cn'">{{$t('ch')}}
          <span class="iconfont icon-xiasanjiao"></span>
        </span>
        <span v-if="$store.state.lang=='ct'">{{$t('ch1')}}
          <span class="iconfont icon-xiasanjiao"></span>
        </span>
        <span v-if="$store.state.lang=='en'">{{$t('en')}}
          <span class="iconfont icon-xiasanjiao"></span>
        </span>
      </div>
    </div>
   <!-- logo -->
    <div class="d_logo" v-if="!$store.state.imgIf">
      <img src="../assets/logo.png" alt>
      <span class="f_c">BOUDCOIN</span>
      <span>COMMUNITY</span>
    </div>
    <!-- 输入邮箱与密码 -->
    <div class="form" v-if="!$store.state.imgIf">
      <!-- 输入邮箱 -->
      <div class="d_input">
        <div class="f_l">{{$t('login.email')}}</div>
        <div class="f_r">
          <x-input
            class
            type="text"
            v-model="u_phone"
            :placeholder="$t('login.input1')"
            @on-focus="focus"
            @on-blur="blur"
          ></x-input>
        </div>
      </div>
      <!-- 输入密码 -->
      <div class="d_input eye_div">
        <div class="f_l">{{$t('login.pwd')}}</div>
        <div class="f_r">
          <x-input
            class
            type="password"
            v-model="u_pwd"
            :placeholder="$t('login.input2')"
            @on-focus="focus"
            @on-blur="blur"
          ></x-input>
          <span class="iconfont icon-yanjingbi" @touchstart="eyepwd($event)"></span>
        </div>
      </div>
    </div>
    <!-- 登录按钮 -->
    <div class="form_bot" v-if="!$store.state.imgIf">
      <button class="btn" @click="sub">{{$t('login.sub')}}</button>
      <div>
        <span class="f_r">
          {{$t('login.noneAcc')}}？
          <router-link :to="{name:'register',params:{code:0}}">{{$t('login.regNow')}}</router-link>
        </span>
        <span class="f_l">
          <router-link :to="{name:'forgetpwd',params:{type:0}}">{{$t('login.fgtpwd')}}？</router-link>
        </span>
      </div>
    </div>
    <!-- 拖动滑块 -->
    <div class="v_dialog" v-if="dialog">
      <div>
        <div class="dialog">
          <div>
            <Verify
              :vSpace="0"
              :imgSize="{width:'100%',height:'150px'}"
              :barSize="{width:'100%',height:'40px'}"
              :blockSize="{width:'50px',height:'50px'}"
              :imgUrl="img_url"
              :imgName="img_arr"
              :explain="$t('login.v')"
              @success="sucCode"
              @error="failCode"
              :type="4"
            ></Verify>
          </div>
          <div class="v_icons">
            <span class="iconfont icon-quxiao" @click="dialog=false"></span>
            <span class="iconfont icon-shuaxin" @click="refresh"></span>
          </div>
        </div>
      </div>
    </div>
    <!-- 登录提示 -->
    <x-dialog v-model="show" class="de_dialog" hide-on-blur>
      <div class="dialog">
        <div class="dia_title">{{$t('codedialog.c1')}}</div>
        <div class="dia_con">
          <div class="code_title">{{u_phone}} {{$t('codedialog.c2')}}</div>
          <div>
            <input
              type="text"
              class="code_input"
              :placeholder="$t('codedialog.c3')"
              v-model="email_code"
            >
          </div>
          <div>
            <button class="btn f_c code_btn" @click="sub1">{{$t('codedialog.c4')}}</button>
          </div>
        </div>
      </div>
    </x-dialog>
     <!-- 选择语言弹窗 -->
    <x-dialog v-model="lang_dlg" class="de_dialog lang_dialog" hide-on-blur>
      <div class="dialog">
        <ul>
          <li :class="{active:$store.state.lang == 'en'}" @click="changeLang('en')">
            <span>English</span>
            <span class="iconfont icon-duihao"></span>
          </li>
          <li :class="{active:$store.state.lang == 'ct'}" @click="changeLang('ct')">
            <span>中文繁體</span>
            <span class="iconfont icon-duihao"></span>
          </li>
          <li :class="{active:$store.state.lang == 'cn'}" @click="changeLang('cn')">
            <span>中文简体</span>
            <span class="iconfont icon-duihao"></span>
          </li>
        </ul>
      </div>
    </x-dialog>
  </div>
</template>
<script>
import axios from "axios";
import $ from "jquery";
import { XInput, XDialog } from "vux";
import SIdentify from "../components/icode";
import Verify from "vue2-verify";

export default {
  data() {
    return {
      lang: "",
      lang_dlg: false,
      show: false,
      usercode: "",
      identifyCode: "",
      identifyCodes: "123456789",
      u_phone: "",
      u_pwd: "",
      height: "",
      img_url: "",
      img_arr: [""],
      dialog: false,
      email_code: "",
      type: 0
    };
  },
  components: {
    XInput,
    XDialog,
    SIdentify,
    Verify
  },
  beforeCreate() {
    function plusReady() {
      // 设置系统状态栏背景为黑色
      plus.navigator.setStatusBarBackground("#010101");
    }
    if (window.plus) {
      plusReady();
    } else {
      document.addEventListener("plusready", plusReady, false);
    }
  },
  created() {
    let that = this;
    setTimeout(function() {
      that.$store.state.imgIf = false;
    }, 4000);
  },
  mounted() {
    let that = this;
    //  setTimeout(function () {
    //   that.$store.state.imgIf = false;
    // },4000)
    that.refresh();
    that.lang = that.$store.state.lang;
    let height =
      document.documentElement.clientHeight || document.body.clientHeight;
    that.height = height;
    $(".wrap").css("min-height", height);
    if (window.localStorage.getItem("acc")) {
      that.u_phone = window.localStorage.getItem("acc");
    }
    that.getIcode();
    that
      .$http({
        url: "/Phone/lang",
        method: "post",
        data: {
          lang: that.$store.state.lang
        }
      })
      .then(function(res) {});
  },
  methods: {
    eyepwd(e) {
      $(e.target)
        .toggleClass("icon-yanjingbi")
        .toggleClass("icon-yanjing");
      if (
        $(e.target)
          .parents(".f_r")
          .find("input")
          .attr("type") == "password"
      ) {
        $(e.target)
          .parents(".f_r")
          .find("input")
          .attr("type", "text");
      } else {
        $(e.target)
          .parents(".f_r")
          .find("input")
          .attr("type", "password");
      }
    },
    //更换语言
    changeLang(l) {
      let that = this;
      that.setLang(l);
      that.lang_dlg = false;
      that
        .$http({
          url: "/Phone/lang",
          method: "post",
          data: {
            lang: that.$store.state.lang
          }
        })
        .then(function(res) {});
    },
    sucCode(o) {
      let that = this;
      let ll = "";
      if (that.$store.state.lang == "cn") {
        ll = 1;
      } else if (that.$store.state.lang == "ct") {
        ll = 2;
      } else {
        ll = 3;
      }
      that
        .$http({
          url: "/phone/paths",
          method: "post",
          data: {
            token: that.$store.state.user_info.token,
            type: 1,
            language: ll
          }
        })
        .then(function(res) {
          if (res.data.code == 1) {
            that.$router.push({
              name: "home"
            });
          } else {
            that.$vux.toast.show({
              text: res.data.msg,
              type: "text",
              position: "middle",
              time: 1200
            });
            that
              .$http({
                url: "/phone/img_code",
                method: "post",
                data: {}
              })
              .then(function(res) {
                that.img_url = res.data;
              });
          }
        });
    },
    failCode() {
      let that = this;
      let ll = "";
      if (that.$store.state.lang == "cn") {
        ll = 1;
      } else if (that.$store.state.lang == "ct") {
        ll = 2;
      } else {
        ll = 3;
      }
      that
        .$http({
          url: "/phone/img_code",
          method: "post",
          data: {}
        })
        .then(function(res) {
          that.img_url = res.data;
        });
      that
        .$http({
          url: "/phone/paths",
          method: "post",
          data: {
            token: that.$store.state.user_info.token,
            type: 2,
            language: ll
          }
        })
        .then(function(res) {});
    },
    refresh() {
      let that = this;
      that
        .$http({
          url: "/phone/img_code",
          method: "post",
          data: {}
        })
        .then(function(res) {
          that.img_url = res.data;
        });
    },
    focus(v, e) {
      this.$store.commit("focus", { e: e });
    },
    blur(v, e) {
      this.$store.commit("blur", { e: e });
    },
    getIcode() {
      this.usercode = "";
      this.identifyCode = "";
      this.makeCode(this.identifyCodes, 4);
    },
    // 生成一个随机数
    randomNum(min, max) {
      return Math.floor(Math.random() * (max - min) + min);
    },
    refreshCode() {
      this.identifyCode = "";
      this.makeCode(this.identifyCodes, 4);
    },
    makeCode(o, l) {
      for (let i = 0; i < l; i++) {
        this.identifyCode += this.identifyCodes[
          this.randomNum(0, this.identifyCodes.length)
        ];
      }
    },
    //登录提交
    sub() {
      let that = this;
      if (that.u_phone && that.u_pwd) {
        let reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
        if (!reg.test(that.u_phone)) {
          that.$vux.toast.show({
            text: that.$t("tip.email_error"),
            type: "cancel",
            position: "middle",
            time: 1200
          });
          return false;
        }
        that.$vux.loading.show({
          text: that.$t("load.logining")
        });
        let ll = "";
        if (that.$store.state.lang == "cn") {
          ll = 1;
        } else if (that.$store.state.lang == "ct") {
          ll = 2;
        } else {
          ll = 3;
        }
        that
          .$http({
            url: "/phone/userLogin",
            method: "post",
            data: {
              email: that.u_phone,
              password: that.u_pwd,
              language: ll,
              email_code: ""
            }
          })
          .then(function(res) {
            that.$vux.loading.hide();
            if (res.data.code == 1) {
              that.$store.state.user_info = res.data.data;
              let l;
              if (res.data.data.language == 1) {
                l = "cn";
              } else if (res.data.data.language == 2) {
                l = "ct";
              } else {
                l = "en";
              }
              that.$store.state.lang = l;
              that.setLang(that.lang);
              window.sessionStorage.setItem(
                "uinfo",
                JSON.stringify(res.data.data)
              );
              window.localStorage.setItem("acc", that.u_phone);
              that.dialog = true;
              // that.refresh();
            } else if (res.data.code == 2) {
              that.show = true;
              that
                .$http({
                  url: "/phone/email_code",
                  method: "post",
                  data: {
                    email: that.u_phone
                  }
                })
                .then(function(res) {
                  if (res.data.code == 1) {
                    that.$vux.toast.show({
                      text: res.data.msg,
                      type: "success",
                      position: "middle",
                      time: 1500
                    });
                    that.email_code = res.data.data;
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
                text: res.data.msg,
                type: "cancel",
                position: "middle",
                time: 1200
              });
            }
          });
      } else {
        this.$vux.toast.show({
          text: that.$t("tip.full_tip"),
          type: "cancel",
          position: "middle",
          time: 1200
        });
      }
      that.usercode = "";
    },
    sub1() {
      let that = this;
      that.$vux.loading.show({
        text: that.$t("load.logining")
      });
      let ll;
      if (that.$store.state.lang == "cn") {
        ll = 1;
      } else if (that.$store.state.lang == "ct") {
        ll = 2;
      } else {
        ll = 3;
      }
      that
        .$http({
          url: "/phone/userLogin",
          method: "post",
          data: {
            email: that.u_phone,
            password: that.u_pwd,
            language: ll,
            email_code: that.email_code
          }
        })
        .then(function(res) {
          that.$vux.loading.hide();
          if (res.data.code == 1) {
            that.show = false;
            let l;
            if (res.data.data.language == 1) {
              l = "cn";
            } else if (res.data.data.language == 2) {
              l = "ct";
            } else {
              l = "en";
            }
            that.$store.state.lang = l;
            that.setLang(that.lang);
            that.$store.state.user_info = res.data.data;
            window.sessionStorage.setItem(
              "uinfo",
              JSON.stringify(res.data.data)
            );
            window.localStorage.setItem("acc", that.u_phone);
            that.dialog = true;
            // that.refresh();
          } else {
            that.$vux.toast.show({
              text: res.data.msg,
              type: "cancel",
              position: "middle",
              time: 1200
            });
            that.email_code = "";
            that.show = false;
          }
        });
    }
  }
};
</script>
<style lang="less" scoped>
.start {
  position: fixed;
  z-index: 9999999;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
}
.v_dialog {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 99;
  > div {
    display: block;
    margin: 50vw auto 0;
    background: rgb(145, 144, 144);
    width: 80%;
    border-radius: 4px;
  }
}
.v_icons {
  border-top: 1px solid #f2f2f2;
  padding: 0.25rem 0 0.05rem;
  margin-top: 0.3rem;
  text-align: left;
  .iconfont {
    display: inline-block;
    margin-right: 0.2rem;
    color: whitesmoke;
    font-size: 0.7rem;
  }
}
.verify-img-panel,
.verify-bar-area {
  width: 100% !important;
}
.wrap {
  font-size: 0.38rem;
  position: absolute;
  width: 100%;
  background: #12161c;
  color: white;
  .top {
    box-shadow: none;
    > div {
      position: absolute;
      right: 3%;
      top: 0;
      z-index: 1;
      color: #fcb90b;
      font-size: 0.38rem;
      .iconfont{
        font-size: 0.3rem;
        display: inline-block;
        vertical-align: top;
      }
    }
  }

  .d_logo {
    overflow: hidden;
    padding-bottom: 0.8rem;
    img {
      display: block;
      width: 2.6rem;
      height: 2.6rem;
      margin: 1.4rem auto 0.3rem;
    }
    span {
      display: block;
      text-align: center;
      font-size: 0.6rem;
      color: #68665e;
    }
  }
  .form {
    ::-webkit-input-placeholder {
      color: #556579;
    }
    ::-moz-input-placeholder {
      color: #556579;
    }
    ::-o-input-placeholder {
      color: #556579;
    }
    ::-ms-input-placeholder {
      color: #556579;
    }
    padding: 0 12% 0;
    .d_input {
      overflow: hidden;
      margin-bottom: 0.4rem;
      > .f_l {
        float: none;
        width: 0.8rem;
        padding-bottom: 0.1rem;
        img {
          width: 100%;
          height: 100%;
          display: table-cell;
          vertical-align: middle;
        }
        .img_ {
          transform: translateY(4px);
        }
      }
      > .f_r {
        // width: calc(100% - 0.9rem);
        float: none;
        border: 1px solid #323c45;
        background: #1f2833;
        padding-right: 0.1rem;

        > input {
          width: calc(100% - 106px);
          background: transparent;
          color: white;
          line-height: 0.9rem;
          border-bottom: 1px solid rgba(255, 255, 255, 0.4);
          padding-left: 0.1rem;
          box-sizing: border-box;
        }
      }
    }
  }
  .form_bot {
    padding: 1rem 12% 0;
    .btn {
      display: block;
      width: 100%;
      line-height: 0.8rem;
      text-align: center;
      color: #fcb90b;
      border-radius: 4px;
      background: transparent;
      border: 1px solid #fcb90b;
    }
    > div {
      overflow: hidden;
      > span {
        margin-top: 0.3rem;
        color: #ccc;
        font-size: 0.32rem;
      }
      a {
        color: #fcb90b;
        font-size: 0.32rem;
      }
    }
  }
  .dialog {
    padding: 0.2rem;
  }
  .de_dialog {
    .dialog {
      padding: 0;
    }
    ::-webkit-input-placeholder {
      color: rgb(121, 120, 120);
    }
    ::-moz-input-placeholder {
     color: rgb(121, 120, 120);
    }
    ::-o-input-placeholder {
      color: rgb(121, 120, 120);
    }
    ::-ms-input-placeholder {
      color: rgb(121, 120, 120);
    }
    color: #333;
    .dia_title {
      font-size: 0.44rem;
      padding: 0.4rem 0 0.2rem;
    }
    .code_title {
      font-size: 0.4rem;
    }
    .code_input {
      border: 1px solid #ccc;
      line-height: 0.8rem;
      height: 0.8rem;
      border-radius: 4px;
      padding: 0 0.2rem 0;
      margin: 0.4rem 0 0.4rem;
    }
    .code_btn {
      width: 100%;
      line-height: 1.1rem;
      background: transparent;
      font-size: 0.44rem;
      border-top: 1px solid #bbb;
    }
    .code_btn:active {
      background: #f0f0f0;
    }
  }
}
</style>
