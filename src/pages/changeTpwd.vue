<template>
  <div class="wrap">
    <div class="top">
      <img @click="back" class="back_img" src="../assets/nav_back.png" alt>
      <div>{{$t('tpwd.title')}}</div>
      <span class="cpt" @click="sub">{{$t('codedialog.c4')}}</span>
    </div>
    <div class="main">
      <ul class="form">
        <li>
          <span class="f_l">{{$t('tpwd.label.l1')}}</span>
          <input class="f_l" type="password" v-model="pwd" :placeholder="$t('tpwd.phr.p1')">
          <span class="iconfont icon-yanjingbi f_r" @touchstart="eyepwd($event)"></span>
        </li>
        <li>
          <span class="f_l">{{$t('tpwd.label.l2')}}</span>
          <input class="f_l" type="password" v-model="pwd1" :placeholder="$t('tpwd.phr.p2')">
          <span class="iconfont icon-yanjingbi f_r" @touchstart="eyepwd($event)"></span>
        </li>
        <li>
          <span class="f_l">{{$t('tpwd.label.l3')}}</span>
          <input class="f_l" type="password" v-model="pwd2" :placeholder="$t('tpwd.phr.p3')">
          <span class="iconfont icon-yanjingbi f_r" @touchstart="eyepwd($event)"></span>
        </li>
        <li>
          <span class="f_l">{{$t('tpwd.label.l4')}}</span>
          <input class="f_l code_input" type="text" v-model="u_code" :placeholder="$t('tpwd.phr.p4')">
          <span class="code_span f_r" :class="{f_c:btn_msg==$t('code')}" @click="getCode">{{btn_msg}}</span>
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
      pwd: "",
      pwd1: "",
      pwd2: "",
      u_code: "",
      btn_msg: this.$t('code'),
      time:60,
    };
  },
  components: {},
  mounted() {
    let that = this;
    mui.back = function() {
      that.$router.back();
      error;
    };
  },
  methods: {
    back() {
      this.$router.back();
    },
    eyepwd(e) {
      $(e.target)
        .toggleClass("icon-yanjingbi")
        .toggleClass("icon-yanjing");
      if (
        $(e.target)
          .parents("li")
          .find("input")
          .attr("type") == "password"
      ) {
        $(e.target)
          .parents("li")
          .find("input")
          .attr("type", "text");
      } else {
        $(e.target)
          .parents("li")
          .find("input")
          .attr("type", "password");
      }
    },
    getCode() {
      let that = this;
      if (that.btn_msg == that.$t('code')) {
        that.btn_msg = "60"+that.$t('second');
        window.t = setInterval(function() {
          that.time--;
          that.btn_msg = that.time + that.$t('second');
          if (that.time <= 0) {
            that.btn_msg = that.$t('code');
            clearInterval(window.t);
            that.time = 60;
          }
        }, 1000);
        that
          .$http({
            url: "/user/user_send_email",
            method: "post",
            data: {
              token: that.$store.state.user_info.token
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
              that.u_code = res.data.data.code;
            } else {
              that.$vux.toast.show({
                text: res.data.msg,
                type: "text",
                position: "middle",
                time: 1200
              });
              that.btn_msg = that.$t('code');
              clearInterval(window.t);
              that.time = 60;
            }
          });
      }
    },
    sub() {
      let that = this;
      if (that.pwd&&that.pwd1&&that.pwd2&&that.u_code) {
        that
          .$http({
            url: "/user/change_pay_password",
            method: "post",
            data: {
              token: that.$store.state.user_info.token,
              old_password:that.pwd,
              new_password:that.pwd1,
              re_new_password:that.pwd2,
              email_code:that.u_code
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
              that.pwd="";
              that.pwd1="";
              that.pwd2="";
              that.u_code="";
            } else {
              that.$vux.toast.show({
                text: res.data.msg,
                type: "cancel",
                position: "middle",
                time: 1200
              });
            }
          });
      }else{
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
        .code_span {
          color: #888;
        }
        input {
          width: calc(100% - 3rem);
          line-height: 1.1rem;
          box-sizing: border-box;
          padding: 0 0.2rem 0;
          background: transparent;
          margin-left: 0.2rem;
        }
        .iconfont {
          font-size: 0.6rem;
        }
        .code_input {
          width: calc(100% - 4rem);
        }
      }
    }
  }
}
</style>
