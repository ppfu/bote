<template>
  <div class="wrap">
    <div class="top">
      <img
        v-if="$route.params.code==0"
        @click="back"
        class="back_img"
        src="../assets/nav_back.png"
        alt
      >
      <div>{{$t('reg.title')}}</div>
      <div class="div" @click="lang_dlg=true">
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
    <div class="d_logo">
      <img src="../assets/logo.png" alt>
      <span class="f_c">BOUDCOIN</span>
      <span>COMMUNITY</span>
    </div>
    <div class="form" v-if="first">
      <div class="d_input">
        <div class="f_l">
          <span>{{$t('reg.label1')}}</span>
        </div>
        <div class="f_r">
          <x-input
            class
            type="text"
            v-model="u_acc"
            :placeholder="$t('reg.input1')"
            @on-focus="focus"
            @on-blur="blur"
          ></x-input>
        </div>
      </div>
      <div class="d_input">
        <div class="f_l">
          <span>{{$t('reg.label2')}}</span>
        </div>
        <div class="f_r">
          <input
            type="text"
            :placeholder="$t('reg.input2')"
            v-model="code"
            @focus="focus1($event)"
            @blur="blur1($event)"
          >
          <span class="code_span" :class="{f_cc:btn_msg!=$t('code')}" @click="getCode">{{btn_msg}}</span>
        </div>
      </div>
    </div>
    <div class="form" v-if="second">
      <div class="d_input">
        <div class="f_l">
          <span>{{$t('reg.label3')}}</span>
        </div>
        <div class="f_r">
          <input
            class
            type="text"
            v-model="yqm"
            :placeholder="$t('reg.input3')"
            @focus="focus1($event)"
            @blur="blur1($event)"
          >
          <!-- <span class="code_span">（必填项）</span> -->
        </div>
      </div>
      <div class="d_input eye_div">
        <div class="f_l">
          <span>{{$t('reg.label4')}}</span>
        </div>
        <div class="f_r">
          <x-input
            class
            :type="types[0]"
            v-model="u_pwd"
            :placeholder="$t('reg.input4')"
            @on-focus="focus"
            @on-blur="blur"
          ></x-input>
          <span class="iconfont icon-yanjingbi" @touchstart="eyepwd($event)"></span>
        </div>
      </div>
      <div class="d_input eye_div">
        <div class="f_l">
          <span>{{$t('reg.label4')}}</span>
        </div>
        <div class="f_r">
          <x-input
            class
            type="password"
            v-model="u_pwd1"
            :placeholder="$t('reg.input5')"
            @on-focus="focus"
            @on-blur="blur"
          ></x-input>
          <span class="iconfont icon-yanjingbi" @touchstart="eyepwd($event)"></span>
        </div>
      </div>
      <div class="d_input eye_div">
        <div class="f_l">
          <span>{{$t('reg.label5')}}</span>
        </div>
        <div class="f_r">
          <x-input
            class
            type="password"
            v-model="uu_pwd"
            :placeholder="$t('reg.input6')"
            @on-focus="focus"
            @on-blur="blur"
          ></x-input>
          <span class="iconfont icon-yanjingbi" @touchstart="eyepwd($event)"></span>
        </div>
      </div>
      <div class="d_input eye_div">
        <div class="f_l">
          <span>{{$t('reg.label6')}}</span>
        </div>
        <div class="f_r">
          <x-input class type="password" v-model="uu_pwd1" :placeholder="$t('reg.input7')"></x-input>
          <span class="iconfont icon-yanjingbi" @touchstart="eyepwd($event)"></span>
        </div>
      </div>
    </div>
    <div class="form_bot" v-if="first">
      <button class="btn" @click="next">{{$t('next')}}</button>
      <div v-if="$route.params.code==0">
        <span class="f_r">
          {{$t('reg.haveAcc')}}？
          <router-link :to="{name:'login'}">{{$t('reg.loginNow')}}</router-link>
        </span>
      </div>
    </div>
    <div class="form_bot" v-if="second">
      <!-- <div>
                <check-icon :value.sync="ifAgree"></check-icon>
                <span>我已阅读并同意<span class="f_c" @click="toProtocal"> 《以太波注册服务协议》</span></span>
      </div>-->
      <button class="btn" @click="sub">{{$t('reg.regSub')}}</button>
      <div v-if="$route.params.code==0">
        <span class="f_r">
          {{$t('reg.haveAcc')}}？
          <router-link :to="{name:'login'}">{{$t('reg.loginNow')}}</router-link>
        </span>
      </div>
    </div>
    <div class="mask">
      <div class="d_top">
        <img @click.stop="hideProtocal" class="back_img" src="../assets/nav_back.png" alt>
        <span>注册服务协议</span>
      </div>
      <div class="d_main">
        <div v-html="protocal"></div>
      </div>
    </div>
    <x-dialog v-model="dialog0" class="default_dialog" @on-hide="dialog=false">
      <div class="dialog">
        <span class="vux-close" @click="dialog0 = false"></span>
        <div class="title">风险提示</div>
        <div class="con ta_l">{{warn}}</div>
        <div>
          <button class="btn" @click="regSuc">确认风险</button>
        </div>
      </div>
    </x-dialog>
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
import { XInput, CheckIcon, XDialog } from "vux";
import $ from "jquery";
export default {
  data() {
    return {
      lang: "",
      lang_dlg: false,
      types: ["password", "password", "password", "password"],
      first: true,
      second: false,
      dialog0: false,
      warn: "",
      u_acc: "",
      u_phone: "",
      u_pwd: "",
      u_pwd1: "",
      uu_pwd: "",
      uu_pwd1: "",
      code: "",
      yqm: "",
      btn_msg: this.$t('code'),
      ifAgree: false,
      time: 60,
      protocal: ""
    };
  },
  components: {
    XInput,
    CheckIcon,
    XDialog
  },
  mounted() {
    let that = this;
    mui.back = function() {
      clearInterval(window.t);
      that.$router.back();
      error;
    };
    that.lang = that.$store.state.lang;
    let height =
      document.documentElement.clientHeight || document.body.clientHeight;
    that.height = height;
    $(".wrap").css("min-height", height);
    if (that.$route.params.code != 0) {
      that.yqm = that.$route.params.code;
    }
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
    focus(v, e) {
      this.$store.commit("focus", { e: e });
    },
    blur(v, e) {
      this.$store.commit("blur", { e: e });
    },
    focus1(e) {
      this.$store.commit("focus", { e: e });
    },
    blur1(e) {
      this.$store.commit("blur", { e: e });
    },
    back() {
      let that = this;
      clearInterval(window.t);
      that.$router.back();
    },
    toProtocal() {
      $(".mask").fadeIn();
    },
    hideProtocal() {
      $(".mask").fadeOut();
    },
    getCode() {
      let that = this;
      let reg = /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/;
      let reg1 = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
      if (reg1.test(that.u_acc)) {
        if (that.btn_msg == that.$t("code")) {
          that.btn_msg = "60" + that.$t("second");
          window.t = setInterval(function() {
            that.time--;
            that.btn_msg = that.time + that.$t("second");
            if (that.time <= 0) {
              that.btn_msg = that.$t("code");
              clearInterval(window.t);
              that.time = 60;
            }
          }, 1000);
          that
            .$http({
              url: "/phone/email_code",
              method: "post",
              data: {
                email: that.u_acc
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
                that.code = res.data.data;
              } else {
                that.$vux.toast.show({
                  text: res.data.msg,
                  type: "text",
                  position: "middle",
                  time: 1200
                });
                that.btn_msg = that.$t("code");
                clearInterval(window.t);
                that.time = 60;
              }
            });
        }
      } else {
        that.$vux.toast.show({
          text: that.$t("tip.email_error"),
          type: "cancel",
          position: "middle",
          time: 1200
        });
      }
    },
    next() {
      let that = this;
      let reg1 = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
      if (!reg1.test(that.u_acc)) {
        that.$vux.toast.show({
          text: that.$t("tip.email_error"),
          type: "cancel",
          position: "middle",
          time: 1200
        });
        return false;
      }
      if (that.code == "") {
        that.$vux.toast.show({
          text: that.$t("tip.code_input"),
          type: "cancel",
          position: "middle",
          time: 1200
        });
        return false;
      }
      that.first = false;
      that.second = true;
    },
    sub() {
      let that = this;
      if (
        that.u_acc &&
        that.u_pwd &&
        that.u_pwd1 &&
        that.uu_pwd &&
        that.uu_pwd1 &&
        that.yqm
      ) {
        if (that.u_pwd == that.u_pwd1) {
          if (that.uu_pwd == that.uu_pwd1) {
            that.regSuc();
          } else {
            that.$vux.toast.show({
              text: that.$t("tip.trade_pwd_again"),
              type: "cancel",
              position: "middle",
              time: 1200
            });
          }
        } else {
          that.$vux.toast.show({
            text: that.$t("tip.login_pwd_again"),
            type: "cancel",
            position: "middle",
            time: 1200
          });
        }
      } else {
        this.$vux.toast.show({
          text: that.$t("tip.full_tip"),
          type: "cancel",
          position: "middle",
          time: 1200
        });
      }
    },
    regSuc() {
      let that = this;
      that.$vux.loading.show({
        text: ""
      });
      let ll = "";
      if (that.$store.state.lang == "cn") {
        ll = 1;
      } else if (that.$store.state.lang == "ct") {
        ll == 2;
      } else {
        ll = 3;
      }
      that
        .$http({
          url: "/phone/userReg",
          method: "post",
          data: {
            email: that.u_acc,
            invitation_code: that.yqm,
            password: that.u_pwd,
            repassword: that.u_pwd1,
            payment_password: that.uu_pwd1,
            repayment_password: that.uu_pwd1,
            code: that.code,
            language: ll
          }
        })
        .then(function(res) {
          that.dialog0 = false;
          that.$vux.loading.hide();
          if (res.data.code == 1) {
            if (that.$route.params.code == 0) {
              that.$vux.alert.show({
                title: that.$t("suc"),
                content: that.$t("confirm.c2"),
                buttonText: that.$t("confirm.b1"),
                onShow() {},
                onHide() {
                  that.dialog0 = false;
                  that.$router.push({
                    name: "login"
                  });
                }
              });
            } else {
              that.$vux.toast.show({
                text: "跳转下载链接",
                type: "text",
                position: "middle",
                time: 1200
              });
              return false;
              window.location.href = "";
            }
          } else {
            that.$vux.toast.show({
              text: res.data.msg,
              type: "cancel",
              position: "middle",
              time: 1200
            });
          }
        });
    }
  }
};
</script>
<style lang="less" scoped>
.wrap {
  font-size: 0.36rem;
  position: absolute;
  width: 100%;
  color: white;
  padding-bottom: 0.6rem;
  box-sizing: border-box;
  .top {
    box-shadow: none;
    >.div{
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

  .lang {
    position: absolute;
    right: 3%;
    top: 0;
    color: #fcb90b;
    font-size: 0.38rem;
    background: transparent;
    border-color: transparent;
    margin: 0.2rem 0 0;
  }

  .d_logo {
    overflow: hidden;
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
        width: 3rem;
        height: 0.8rem;
        line-height: 0.8rem;
        text-align: left;
      }
      > .f_r {
        float: none;
        // width: calc(100% - 3rem);
        border: 1px solid #323c45;
        background: #1f2833;
        padding-right: 0.1rem;
        .code_span {
          float: right;
          line-height: 0.9rem;
          color: #fcb90b;
          padding-right: 0.2rem;
        }
        .f_cc {
          color: rgba(255, 255, 255, 0.5);
        }

        > input {
          width: calc(100% - 106px);
          background: transparent;
          color: white;
          line-height: 0.9rem;
          padding-left: 0.15rem;
          box-sizing: border-box;
        }
      }
    }
  }
  .form_bot {
    padding: 0.6rem 12% 0;
    > div {
      font-size: 0.32rem;
      padding-bottom: 1rem;
      text-align: center;
    }
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
      }
      a {
        color: #fcb90b;
        font-size: 0.32rem;
      }
    }
  }
  .mask {
    position: fixed;
    width: 100%;
    height: 100%;
    background: #010101;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    box-sizing: border-box;
    padding-top: 1.15rem;
    z-index: 2;
    display: none;
    .d_top {
      position: fixed;
      line-height: 1.1rem;
      width: 100%;
      top: 0;
      left: 0;
      text-align: center;
      font-size: 0.38rem;
      background: #010101;
      border-bottom: 0.05rem solid #242424;
    }
    .d_top > .back_img {
      position: absolute;
      left: 3%;
      top: 0.14rem;
      width: 0.8rem;
    }
    .d_main {
      padding: 0.4rem 4% 0.4rem;
      max-height: 100%;
      box-sizing: border-box;
      overflow: auto;
    }
  }
  .default_dialog {
    .dialog {
      color: #333;
      padding: 0.8rem 0.4rem 0.6rem;
      box-sizing: border-box;
      width: 100%;
      .vux-close {
        position: absolute;
        right: 0.2rem;
        top: 0.2rem;
      }
      .title {
        padding: 0.2rem 0 0.4rem;
      }
      .con {
        max-height: 8rem;
        overflow: auto;
      }
      .btn {
        display: block;
        width: 3rem;
        text-align: center;
        background: #ba9870;
        color: white;
        line-height: 0.7rem;
        border-radius: 20px;
        margin: 0.6rem auto 0;
      }
    }
  }
}
</style>
