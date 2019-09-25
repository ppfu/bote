<template>
  <div class="wrap">
    <div class="top">
      <img @click="back" class="back_img" src="../assets/nav_back.png" alt>
      <div>{{$t('wallet.btn.b2')}}</div>
    </div>
    <div class="div_div">
      <div class="div">
        <span class="f_l">{{ads}}</span>
        <span
          class="f_r f_c"
          v-clipboard:copy="ads"
          v-clipboard:success="onCopy"
          v-clipboard:error="onError"
        >{{$t('n4')}}</span>
      </div>
    </div>
 <!--  <div class="form">
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
          <span>{{$t('n1')}}：</span>
        </div>
        <div class="f_r">
          <x-input
            class
            type="text"
            v-model="t_num"
            @input.native="num($event)"
            :placeholder="$t('n2')"
          ></x-input>
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
      <button class="btn" @click="next">{{$t('n3')}}</button>
    </div> -->
    <!-- <div>
      <button
        class="btn"
        v-clipboard:copy="ads"
        v-clipboard:success="onCopy"
        v-clipboard:error="onError"
      >{{$t('wallet.btn.b3')}}</button>
    </div> -->
  </div>
</template>
<script>
import $ from "jquery";
import { XInput } from "vux";
export default {
  data() {
    return {
      ads: "",
      w_ads: "",
      t_num: "",
      t_other: ""
    };
  },
  components: {
    XInput
  },
  mounted() {
    let that = this;
    mui.back = function() {
      that.$router.back();
      error;
    };
    that
      .$http({
        url: "/wallet/receivablesPage",
        method: "post",
        data: {
          token: that.$store.state.user_info.token,
          id: 1
        }
      })
      .then(function(res) {
        if (res.data.code == 1) {
          that.ads = res.data.data;
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
    num(e) {
      $(e.target).val(
        $(e.target)
          .val()
          .match(/\d+\.?\d{0,6}/)
      );
      this.t_num = $(e.target).val();
    },
    onCopy(e) {
      this.$vux.toast.show({
        text: this.$t("tip.copy_suc"),
        type: "success",
        position: "middle",
        time: 1200
      });
    },
    // 复制失败
    onError(e) {
      this.$vux.toast.show({
        text: this.$t("tip.copy_error"),
        type: "cancel",
        position: "middle",
        time: 1200
      });
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
  .div_div {
    background: #1a212a;
  }
  .div {
    margin: 0 6% 0;
    box-sizing: border-box;
    border-bottom: 1px solid #323b46;
    text-align: center;
    word-break: break-all;
    overflow: hidden;
    padding: 0.3rem 0 0.3rem;
    .f_l {
      text-align: center;
      word-break: break-all;
      text-align: left;
      width: calc(100% - 2.8rem);
    }
    .f_r {
    }
  }
  .btn {
    display: block;
    width: 88%;
    margin: 0 auto;
    line-height: 0.8rem;
    text-align: center;
    color: #fcb90b;
    border-radius: 4px;
    background: transparent;
    border: 1px solid #fcb90b;
  }
  .form {
    padding: 0 6% 0rem;
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
}
</style>
