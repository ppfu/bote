<template>
  <div class="wrap">
    <div class="top">
      <img @click="back" class="back_img" src="../assets/nav_back.png" alt>
      <div>{{$store.state.active_wallet.name}}{{$t('wallet.btn.b1')}}</div>
    </div>
    <div class="main">
      <div class="can_div">
        <span>{{$t('transfer.l1')}}：</span>
        <span>{{info.balance}}{{info.name}}</span>
      </div>
      <div class="form">
        <div class="d_input">
          <div class="f_l">
            <span>{{$t('transfer.l2')}}：</span>
          </div>
          <div class="f_r">
            <x-input class type="text" v-model="w_ads" :placeholder="$t('transfer.p1')"></x-input>
          </div>
        </div>
        <div class="d_input">
          <div class="f_l">
            <span>{{$t('transfer.l3')}}：</span>
          </div>
          <div class="f_r">
            <x-input
              class
              type="text"
              v-model="t_num"
              @input.native="num($event)"
              @on-click-clear-icon="clear"
              :placeholder="$t('transfer.p2')"
            ></x-input>
          </div>
        </div>
        <div class="d_input">
          <div class="f_l">
            <span>{{$t('transfer.l4')}}：</span>
          </div>
          <div class="f_r fee_fr">
            <inline-loading v-if="calc"></inline-loading>
            <span v-if="!calc">{{info.fee}}</span>
            {{$store.state.active_wallet.name}}
          </div>
        </div>
        <div class="d_input">
          <div class="f_l">
            <span>{{$t('transfer.l5')}}：</span>
          </div>
          <div class="f_r">
            <x-input class type="text" v-model="t_other" :placeholder="$t('transfer.p3')"></x-input>
          </div>
        </div>
      </div>
      <div class="form_bot">
        <button class="btn" @click="next">{{$t('transfer.b')}}</button>
      </div>
    </div>
    <x-dialog v-model="show" class="de_dialog" hide-on-blur>
      <div class="dialog">
        <div class="dia_title">{{$t('codedialog.c1')}}</div>
        <div class="dia_con">
          <div class="code_title">{{info.phone}}{{$t('codedialog.c2')}}</div>
          <div>
            <input
              type="text"
              class="code_input"
              v-model="phone_code"
              :placeholder="$t('codedialog.c3')"
            >
          </div>
          <div>
            <button class="btn f_c code_btn" @click="phoneSub">{{$t('codedialog.c4')}}</button>
          </div>
        </div>
      </div>
    </x-dialog>
    <x-dialog v-model="show1" class="de_dialog" hide-on-blur>
      <div class="dialog">
        <div class="dia_title">{{$t('codedialog.c1')}}</div>
        <div class="dia_con">
          <div class="code_title">{{info.email}} {{$t('codedialog.c2')}}</div>
          <div>
            <input
              type="text"
              class="code_input"
              v-model="email_code"
              :placeholder="$t('codedialog.c3')"
            >
          </div>
          <div>
            <button class="btn f_c code_btn" @click="emailSub">{{$t('codedialog.c4')}}</button>
          </div>
        </div>
      </div>
    </x-dialog>
  </div>
</template>
<script>
import $ from "jquery";
import { XInput, XDialog, InlineLoading, debounce } from "vux";
export default {
  data() {
    return {
      info: {},
      w_ads: "",
      t_num: "",
      t_other: "",
      show: false,
      show1: false,
      rate: "",
      calc: false,
      phone_code: "",
      email_code: "",
      ifEmail: false
    };
  },
  components: {
    XInput,
    XDialog,
    InlineLoading
  },
  created() {
    this.num = debounce(this.fnHandle, 1000);
  },
  mounted() {
    let that = this;
    that.getTranInfo();
    mui.back = function() {
      that.$router.back();
      error;
    };
  },
  activated() {

  },
  methods: {
    back() {
      this.$router.back(-1);
    },
    getTranInfo(){
       let that = this;
      that.w_ads = "";
      that.t_num = "";
      that.t_other = "";
      that
        .$http({
          url: "/wallet/transferPage",
          method: "post",
          data: {
            token: that.$store.state.user_info.token,
            id: 1
          }
        })
        .then(function(res) {
          if (res.data.code == 1) {
            that.info = res.data.data;
            that.rate = Number(res.data.data.fee.split("%")[0]);
            that.ifEmail = res.data.data.email_verify;
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
    fnHandle(e) {
      let that = this;
      if (!parseFloat(that.t_num) || that.t_num.split(".").length > 2) {
        that.$vux.toast.show({
          text: that.$t("tip.num_error"),
          type: "text",
          position: "middle",
          time: 1000
        });
        that.fee = "0.00";
        return false;
      }
      that.calc = true;
      that.fee = parseFloat((that.rate / 100) * that.t_num).toFixed(2);
      that.calc = false;
    },
    clear() {
      this.fee = "0.00";
    },
    next() {
      let that = this;
      if (that.w_ads && that.t_num) {
        that.$vux.loading.show({
          text: ""
        });
        that
          .$http({
            url: "/wallet/transferPhone",
            method: "post",
            data: {
              token: that.$store.state.user_info.token
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
              that.phone_code = res.data.data;
              that.show = true;
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
          text: that.$t("tip.full_tip"),
          type: "cancel",
          position: "middle",
          time: 1200
        });
      }
    },
    phoneSub() {
      let that = this;
      that.$vux.loading.show({
        text: ""
      });
      that
        .$http({
          url: "/wallet/checkPhone",
          method: "post",
          data: {
            token: that.$store.state.user_info.token,
            code: that.phone_code
          }
        })
        .then(function(res) {
          that.phone_code = "";
          that.$vux.loading.hide();
          if (res.data.code == 1) {
            that.show = false;
            if (that.ifEmail) {
              that
                .$http({
                  url: "/wallet/transferEmail",
                  method: "post",
                  data: {
                    token: that.$store.state.user_info.token
                  }
                })
                .then(function(res) {
                  that.$vux.loading.hide();
                  if (res.data.code == 1) {
                    that.show = false;
                    that.$vux.toast.show({
                      text: res.data.msg,
                      type: "success",
                      position: "middle",
                      time: 1200
                    });
                    that.email_code = res.data.data;
                    that.show1 = true;
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
              that.transfer();
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
    emailSub() {
      let that = this;
      that.$vux.loading.show({
        text: ""
      });
      that
        .$http({
          url: "/wallet/checkEmail",
          method: "post",
          data: {
            token: that.$store.state.user_info.token,
            code: that.email_code
          }
        })
        .then(function(res) {
          that.email_code = "";
          that.$vux.loading.hide();
          if (res.data.code == 1) {
            that.email_code = "";
            that.show1 = false;
            that.transfer();
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
    transfer() {
      let that = this;
      that.$vux.loading.show({
        text: ""
      });
      that
        .$http({
          url: "/wallet/transferActive",
          method: "post",
          data: {
            token: that.$store.state.user_info.token,
            to_address: that.w_ads,
            number: that.t_num,
            remake: that.t_other,
            id: 1
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
            that.w_ads = "";
            that.t_num = "";
            that.fee = "0.00";
            that.t_other = "";
            that.show = false;
            that.show1 = false;
            that.phone_code = "";
            that.email_code = "";
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
  width: 100%;
  height: 100%;
  color: white;
  box-sizing: border-box;
  padding: 1.3rem 0 1.5rem;
  overflow: hidden;
  .top {
    background: #1a212a;
  }
  .main {
    .can_div {
      padding: 0.8rem 6% 0.8rem;
      background: #1a212a;
      span:first-child {
        display: inline-block;
        width: 2.2rem;
        padding-left: 0.2rem;
      }
      span:last-child {
        font-size: 0.6rem;
      }
    }
    .form {
      margin-top: 0.4rem;
      padding: 0.8rem 6% 0rem;
      box-sizing: border-box;
      background: #1a212a;
      overflow: hidden;
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
      .d_input {
        overflow: hidden;
        // margin-bottom: 0.2rem;
        border-bottom: 1px solid #323b46;
        > .f_l {
          width: 2rem;
          height: 1.2rem;
          line-height: 1.2rem;
          text-align: right;
        }
        > .fee_fr {
          padding-left: 0.2rem;
        }
        > .f_r {
          width: calc(100% - 2.2rem);
          line-height: 1.2rem;
          box-sizing: border-box;
        }
      }
      .d_input:last-child {
        border: 0;
      }
    }
  }
  .form_bot {
    padding: 1rem 6% 0;
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
        color: #ba9870;
        font-size: 0.32rem;
      }
    }
  }
  .de_dialog {
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
      font-size: 0.44rem;
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
      border-top: 1px solid #f0f0f0;
    }
    .code_btn:active {
      background: #f0f0f0;
    }
  }
}
</style>
