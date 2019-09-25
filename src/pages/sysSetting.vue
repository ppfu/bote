<template>
  <div class="wrap">
    <div class="top">
      <img @click="back" class="back_img" src="../assets/nav_back.png" alt>
      <div>{{$t('sysset.title')}}</div>
    </div>
    <div class="main">
      <div class="list_div">
        <ul>
        <!--  <li @click="toCard" v-if="$store.state.lang=='cn'">
            <span class="f_l">{{$t('sysset.list.l1')}}</span>
            <span class="f_r iconfont icon-youjiantou"></span>
            <span v-if="bank" class="f_r f_c">{{$t('bind')}}</span>
            <span v-if="!bank" class="f_r">{{$t('unbind')}}</span>
          </li> -->
          <li @click="toAlipay" v-if="$store.state.lang=='cn'">
            <span class="f_l">{{$t('sysset.list.l2')}}</span>
            <span class="f_r iconfont icon-youjiantou"></span>
            <span v-if="alipay" class="f_r f_c">{{$t('bind')}}</span>
            <span v-if="!alipay" class="f_r">{{$t('unbind')}}</span>
          </li>
         <!-- <li @click="toWx" v-if="$store.state.lang=='cn'">
            <span class="f_l">{{$t('sysset.list.l3')}}</span>
            <span class="f_r iconfont icon-youjiantou"></span>
            <span v-if="wechat" class="f_r f_c">{{$t('bind')}}</span>
            <span v-if="!wechat" class="f_r">{{$t('unbind')}}</span>
          </li> -->
          <li @click="toPaypal" v-if="$store.state.lang!='cn'">
            <span class="f_l">{{$t('sysset.list.l5')}}</span>
            <span class="f_r iconfont icon-youjiantou"></span>
            <span v-if="paypal" class="f_r f_c">{{$t('bind')}}</span>
            <span v-if="!paypal" class="f_r">{{$t('unbind')}}</span>
          </li>
          <li>
            <span class="f_l">{{$t('sysset.list.l4')}}</span>
            <span class="f_r lang" @click="lang_dlg=true">
              <span v-if="$store.state.lang=='cn'">
                {{$t('ch')}}
                <span class="iconfont icon-xiasanjiao"></span>
              </span>
              <span v-if="$store.state.lang=='ct'">
                {{$t('ch1')}}
                <span class="iconfont icon-xiasanjiao"></span>
              </span>
              <span v-if="$store.state.lang=='en'">
                {{$t('en')}}
                <span class="iconfont icon-xiasanjiao"></span>
              </span>
            </span>
          </li>
          <li @click="toBook">
            <!-- <img src="../assets/xiazai.png" alt class="f_l"> -->
            <span class="f_l">{{$t('mine.list.l7')}}</span>
            <span class="f_r iconfont icon-youjiantou"></span>
          </li>
        </ul>
      </div>
    </div>
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
import $ from "jquery";
import {XDialog } from "vux";

export default {
  data() {
    return {
      lang: "",
      lang_dlg: false,
      alipay: "",
      wechat: "",
      bank: "",
      paypal: ""
    };
  },
  components: {XDialog},
  mounted() {
    let that = this;
    mui.back = function() {
      that.$router.back();
      error;
    };
  },
  activated() {
    this.lang = this.$store.state.lang;
    let that = this;
    that
      .$http({
        url: "/user/get_alipay",
        method: "post",
        data: {
          token: that.$store.state.user_info.token
        }
      })
      .then(function(res) {
        if (res.data.code == 1) {
          that.alipay = res.data.data.alipay_account;
          that.wechat = res.data.data.wechat_img;
          that.bank = res.data.data.bank;
          that.paypal = res.data.data.paypal;
          if (res.data.data.alipay_account) {
            sessionStorage.setItem("alipayname", res.data.data.alipay_name);
            sessionStorage.setItem("alipayacc", res.data.data.alipay_account);
          }
          if (res.data.data.wechat_img) {
            sessionStorage.setItem("wechatnick", res.data.data.wechat_nick);
            sessionStorage.setItem("wechatimg", res.data.data.wechat_img);
          }
          if (res.data.data.paypal) {
            sessionStorage.setItem("paypal", res.data.data.paypal);
          }
        } else {
          that.$vux.toast.show({
            text: res.data.msg,
            type: "text",
            position: "middle",
            time: 1200
          });
        }
      });
  },
  methods: {
    back() {
      this.$router.back();
    },
    toBook() {
      this.$router.push({
        name: "book"
      });
    },
    toCard() {
      this.$router.push({
        name: "bankcard"
      });
    },
    toAlipay() {
      let t;
      if (this.alipay) {
        t = 1;
      } else {
        t = 0;
      }
      this.$router.push({
        name: "alipay1",
        params: {
          type: t
        }
      });
    },
    toWx() {
      let t;
      if (this.wechat) {
        t = 1;
      } else {
        t = 0;
      }
      this.$router.push({
        name: "wechat1",
        params: {
          type: t
        }
      });
    },
    toPaypal() {
      let t;
      if (this.paypal) {
        t = 1;
      } else {
        t = 0;
      }
      this.$router.push({
        name: "paypal",
        params: {
          type: t
        }
      });
    },
    changeLang(l) {
      this.setLang(l);
      let that = this;
      that.$vux.loading.show({
        text: ""
      });
      that
        .$http({
          url: "/Phone/lang",
          method: "post",
          data: {
            token: that.$store.state.user_info.token,
            lang: l
          }
        })
        .then(function(res) {
          that.$vux.loading.hide();
          if (res.data.code == 1) {
            that.lang_dlg = false;
          } else {
            that.$vux.toast.show({
              text: res.data.msg,
              type: "text",
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
  width: 100%;
  height: 100%;
  color: white;
  box-sizing: border-box;
  padding: 1.3rem 0 0.4rem;
  overflow: auto;
  .top {
    background: #1a212a;
  }
  .main {
    height: 100%;
    overflow: auto;
    .div_title {
      padding: 0.3rem 4% 0.1rem;
      color: #8f8f9b;
    }
    .list_div {
      ul {
        margin-bottom: 0.1rem;
        li {
          background: #1a212a;
          margin-bottom: 1px;
          overflow: hidden;
          padding: 0.1rem 4% 0.1rem;
          line-height: 1.1rem;
          .iconfont {
            color: #888;
            font-size: 0.6rem;
            margin-left: 0.2rem;
          }
          .lang {
            >span{
              display: inline-block;
              vertical-align: sub;
              border: 1px solid #fcb90b;
              height: .8rem;
              line-height: .8rem;
              box-sizing: border-box;
              padding: 0 0.1rem 0;
              margin-top: 0.1rem;
            }
            color: #fcb90b;
            .iconfont {
              font-size: 0.3rem;
              color: #fcb90b;
            }
          }
        }
        li:last-child {
          margin-bottom: 0;
        }
      }
    }
  }
}
</style>
