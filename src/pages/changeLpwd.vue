<template>
  <div class="wrap">
    <div class="top">
      <img @click="back" class="back_img" src="../assets/nav_back.png" alt>
      <div>{{$t('lpwd.title')}}</div>
      <span class="cpt" @click="sub">{{$t('codedialog.c4')}}</span>
    </div>
    <div class="main">
      <ul class="form">
        <li>
          <span class="f_l">{{$t('lpwd.label.l1')}}</span>
          <input class="f_l" type="password" v-model="pwd" :placeholder="$t('lpwd.phr.p1')">
          <span class="iconfont icon-yanjingbi f_r" @touchstart="eyepwd($event)"></span>
        </li>
        <li>
          <span class="f_l">{{$t('lpwd.label.l2')}}</span>
          <input class="f_l" type="password" v-model="pwd1" :placeholder="$t('lpwd.phr.p2')">
          <span class="iconfont icon-yanjingbi f_r" @touchstart="eyepwd($event)"></span>
        </li>
        <li>
          <span class="f_l">{{$t('lpwd.label.l3')}}</span>
          <input class="f_l" type="password" v-model="pwd2" :placeholder="$t('lpwd.phr.p3')">
          <span class="iconfont icon-yanjingbi f_r" @touchstart="eyepwd($event)"></span>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import $ from "jquery";
import Qs from "qs";
export default {
  data() {
    return {
      title: "",
      pwd: "",
      pwd1: "",
      pwd2: ""
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
    sub() {
      let that = this;
      if (that.pwd && that.pwd1 && that.pwd2) {
        if (that.pwd1 != that.pwd2) {
          that.$vux.toast.show({
            text: that.$t('tip.pwd_again1'),
            type: "cancel",
            position: "middle",
            time: 1200
          });
          return false;
        }
        that
          .$http({
            url: "/user/change_password",
            method: "post",
            data: {
              token: that.$store.state.user_info.token,
              old_password: that.pwd,
              new_password: that.pwd1,
              re_new_password: that.pwd2
            }
          })
          .then(function(res) {
            if (res.data.code == 1) {
              that.$vux.alert.show({
                title: that.$t('suc'),
                content: that.$t('confirm.c1'),
                buttonText: that.$t('confirm.b1'),
                onShow() {},
                onHide() {
                  that.dialog0 = false;
                  that.$router.push({
                    name: "login"
                  });
                }
              });
              that.pwd = "";
              that.pwd1 = "";
              that.pwd2 = "";
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
      }
    }
  }
}
</style>
