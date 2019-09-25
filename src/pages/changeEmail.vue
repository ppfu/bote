<template>
  <div class="wrap">
    <div class="top">
      <img @click="back" class="back_img" src="../assets/nav_back.png" alt>
      <div>{{$t('email.title.t2')}}</div>
      <span class="cpt" @click="sub">{{$t('codediaolog.c4')}}</span>
    </div>
    <div class="main">
      <ul class="form">
        <li>
          <span class="f_l">{{$t('email.label.l1')}}</span>
          <input class="f_r" type="text" v-model="u_email" :placeholder="$t('email.phr.p1')">
        </li>
        <li>
          <span class="f_l">{{$t('email.label.l2')}}</span>
          <input class="f_l code_input" type="text" v-model="u_code" :placeholder="$t('email.phr.p2')">
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
      u_email: "",
      p_type: "0",
      u_code: "",
      btn_msg: this.$t('code')
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
    getCode() {
      let that = this;
      let reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
      if (reg.test(that.u_email)) {
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
              url: "/user/edit_email_code",
              method: "post",
              data: {
                token: that.$store.state.user_info.token,
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
                that.u_code = res.data.data;
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
      } else {
        that.$vux.toast.show({
          text: that.$t('tip.email_error'),
          type: "cancel",
          position: "middle",
          time: 1200
        });
      }
    },
    sub() {
      let that = this;
      if (that.u_email == ""||that.u_code =="") {
        that.$vux.toast.show({
          text: that.$t('tip.full_tip'),
          type: "cancel",
          position: "middle",
          time: 1200
        });
        return false;
      }
      that
        .$http({
          url: "/user/change_email",
          method: "post",
          data: {
            token: that.$store.state.user_info.token,
            email: that.u_email,
            code: that.u_code
          }
        })
        .then(function(res) {
          if (res.data.code == 1) {
            that.$vux.toast.show({
              text: res.data.msg,
              type: "success",
              position: "middle",
              time: 3000
            });
            that.u_email="";
            that.u_code="";
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
        border-bottom: 1px solid #12161c;
        overflow: hidden;
        padding: 0 4% 0;
        .f_l,
        .f_r {
          line-height: 1.1rem;
          height: 1.1rem;
        }
        .code_span {
          color: #888;
        }
        select {
          background: transparent;
          border: 0;
          color: #888;
          margin-left: 0.2rem;
        }
        input {
          width: calc(100% - 1.6rem);
          line-height: 1.1rem;
          box-sizing: border-box;
          padding: 0 0.2rem 0;
          background: transparent;
        }
        .p_input {
          width: calc(100% - 3rem);
        }
        .code_input {
          width: calc(100% - 3.6rem);
          margin-left: 0.5rem;
        }
      }
    }
  }
}
</style>
