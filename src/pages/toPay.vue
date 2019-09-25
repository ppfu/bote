<template>
  <div class="wrap">
    <div class="top">
      <img @click="back" class="back_img" src="../assets/nav_back.png" alt>
      <div>{{$t('topay.title')}}</div>
    </div>
    <div class="main">
      <div v-if="info.paypal" class="ul_title">{{$t('topay.t1')}}</div>
      <ul v-if="info.paypal">
        <li>
          <span>Paypal：</span>
          <span>{{info.paypal}}</span>
        </li>
      </ul>
      <div v-if="info.bank_card" class="ul_title">{{$t('topay.t2')}}</div>
      <ul v-if="info.bank_card">
        <li>
          <span>{{$t('topay.list1.l1')}}：</span>
          <span>{{info.bank_card}}</span>
        </li>
        <li>
          <span>{{$t('topay.list1.l2')}}：</span>
          <span>{{info.bank_text}}</span>
        </li>
        <li>
          <span>{{$t('topay.list1.l3')}}：</span>
          <span>{{info.open_name}}</span>
        </li>
        <li>
          <span>{{$t('topay.list1.l4')}}：</span>
          <span>{{info.bank_add}}</span>
        </li>
      </ul>
      <div v-if="info.alipay_name" class="ul_title">{{$t('topay.t3')}}</div>
      <ul v-if="info.alipay_name">
        <li>
          <span>{{$t('topay.list2.l1')}}：</span>
          <span>{{info.alipay_account}}</span>
        </li>
        <li>
          <span>{{$t('topay.list2.l2')}}：</span>
          <span>{{info.alipay_name}}</span>
        </li>
      </ul>
      <div class="ul_title" v-if="info.wechat_nick">{{$t('topay.t4')}}</div>
      <ul>
        <li v-if="info.wechat_nick">
          <span>{{$t('topay.list3.l1')}}：</span>
          <span>{{info.wechat_nick}}</span>
        </li>
        <!-- <li>
          <span>{{$t('topay.list3.l2')}}：</span>
          <span>
            <img src="../assets/logo.png" alt @click="showImg">
          </span>
        </li>-->
      </ul>
      <div class="ul_title" v-if="info.wechat_nick">微信收款码</div>
      <ul v-if="info.wechat_nick">
        <li>
          <span style="opacity:0;">{{$t('new.a')}}：</span>
          <span>
            <div class="up_div">
              <img :src="info.wechat_img">
              <span class="clear iconfont icon-shanchu1" v-if="urll" @click="delImg1($event)"></span>
            </div>
          </span>
        </li>
      </ul>
      <div class="ul_title">{{$t('new.a')}}</div>
      <ul>
        <li>
          <span>{{$t('new.b')}}：</span>
          <span>
            <div
              v-if="$store.state.lang=='cn' && info.alipay_name"
              :class="{f_c:way==0}"
              @click="way=0"
            >
              <span
                class="iconfont"
                :class="[way==0?'icon-danxuanxuanzhong f_c':'icon-yuanxingweixuanzhong']"
              ></span>
              {{$t('new.c')}}
            </div>
            <div
              v-if="$store.state.lang=='cn' && info.wechat_img"
              :class="{f_c:way==1}"
              @click="way=1"
            >
              <span
                class="iconfont"
                :class="[way==1?'icon-danxuanxuanzhong f_c':'icon-yuanxingweixuanzhong']"
              ></span>
              {{$t('new.d')}}
            </div>
            <div
              v-if="$store.state.lang=='cn' && info.bank_text"
              :class="{f_c:way==2}"
              @click="way=2"
            >
              <span
                class="iconfont"
                :class="[way==2?'icon-danxuanxuanzhong f_c':'icon-yuanxingweixuanzhong']"
              ></span>
              {{$t('new.e')}}
            </div>
            <div v-if="$store.state.lang!='cn'" :class="{f_c:way==3}" @click="way=3">
              <span
                class="iconfont"
                :class="[way==3?'icon-danxuanxuanzhong f_c':'icon-yuanxingweixuanzhong']"
              ></span>
              Paypal
            </div>
          </span>
        </li>
        <li>
          <span>{{$t('new.a')}}：</span>
          <span>
            <div class="up_div">
              <span class="icon f_c">+</span>
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
          </span>
        </li>
      </ul>
      <div class="d_btn">
        <button class="btn" @click="sub">{{$t('topay.tip.t1')}}</button>
      </div>
    </div>
    <div class="mask" v-if="big_if" @click="big_if = false">
      <div>
        <img :src="src" alt>
      </div>
    </div>
  </div>
</template>
<script>
import $ from "jquery";
import src from "../assets/logo.png";
export default {
  data() {
    return {
      way: 10,
      data1: "",
      urll: "",
      big_if: false,
      src: src,
      info: {}
    };
  },
  components: {},
  mounted() {
    let that = this;
    mui.back = function() {
      that.$router.push({
        name: "orderdetail",
        params: {
          type: 1
        }
      });
      error;
    };
    that
      .$http({
        url: "/Transaction/pay_info",
        method: "post",
        data: {
          token: that.$store.state.user_info.token,
          seller_id: that.$route.params.id,
          order_id: that.$route.params.id1
        }
      })
      .then(function(res) {
        if (res.data.code == 1) {
          that.info = res.data.data.list;
        } else {
          that.$vux.toast.show({
            text: res.data.msg,
            type: "cancel",
            position: "middle",
            time: 1200
          });
        }
      });
  },
  methods: {
    back() {
      this.$router.push({
        name: "orderdetail",
        params: {
          type: 1
        }
      });
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
          text: that.$t("load.uping")
        });
        reader.onload = function() {
          let result = this.result;

          // that.data1 = result;

          var image = new FormData();
          image.append("file", e.target.files[0]);
          image.append("type", "payimg");
          image.append("token", that.$store.state.user_info.token);
          that
            .$http({
              url: "/Transaction/upload_pic",
              method: "post",
              data: image
            })
            .then(function(res) {
              that.$vux.loading.hide();
              if (res.data.code == 1) {
                that.data1 = result;
                that.urll = res.data.data;
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
      this.urll = "";
      let dom = document.getElementById("handcard");
      dom.value = "";
    },
    showImg() {
      this.big_if = true;
    },
    sub() {
      let that = this;
      if (that.way == 10) {
         that.$vux.toast.show({
            text: "请选择支付方式",
            type: "text",
            position: "middle",
            time: 1200
          });
      } else {
        that.$vux.loading.show({
          text: ""
        });
        that
          .$http({
            url: "/Transaction/do_pay",
            method: "post",
            data: {
              token: that.$store.state.user_info.token,
              order_id: that.$route.params.id1,
              payment_method: Number(that.way) + 1,
              voucher: that.urll
            }
          })
          .then(function(res) {
            that.$vux.loading.hide();
            if (res.data.code == 1) {
              that.$vux.alert.show({
                title: that.$t("topay.tip.t3"),
                content: that.$t("topay.tip.t2"),
                buttonText: that.$t("topay.tip.t4"),
                onShow() {},
                onHide() {
                  that.dialog0 = false;
                  that.$router.push({
                    name: "orderdetail",
                    params: {
                      type: 1
                    }
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
  padding: 1.1rem 0 0rem;
  overflow: auto;
  .mask {
    position: fixed;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: 999;
    div {
      width: 100%;
      height: 100%;
      img {
        max-width: 100%;
        max-height: 100%;
        display: block;
        margin: 0 auto;
      }
    }
  }
  .top {
    background: #1a212a;
  }
  .main {
    .d_btn {
      .btn {
        display: block;
        width: 92%;
        margin: 1rem auto 1rem;
        line-height: 0.8rem;
        text-align: center;
        color: #fcb90b;
        border-radius: 4px;
        background: transparent;
        border: 1px solid #fcb90b;
      }
    }
    .ul_title {
      padding: 0.4rem 4% 0.1rem;
      font-size: 0.4rem;
    }
    ul {
      background: #1a212a;
      padding: 0.2rem 4% 0.2rem;
      li {
        padding: 0.3rem 0 0.3rem;
        border-bottom: 1px solid #323b46;
        overflow: hidden;
        > span {
          float: left;
          width: calc(100% - 2.5rem);
          color: #dee2ea;
          img {
            width: 2rem;
            height: 2rem;
            display: inline-block;
            vertical-align: top;
          }
          > div {
            display: inline-block;
            margin: 0 0.2rem 0;
            > span {
              width: auto !important;
            }
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
              top: 0.8rem;
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
        > span:first-child {
          width: 2.5rem;
          color: #8f8f9b;
        }
      }
      li:last-child {
        border: 0;
      }
    }
  }
}
</style>
