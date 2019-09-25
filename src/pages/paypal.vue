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
          <span class="f_l">{{$t('paypal.label.l1')}}</span>
          <input
            class="f_r"
            type="text"
            v-model="acc"
            :placeholder="$t('paypal.phr.p1')"
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
      acc: ""
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
      that.title = that.$t('paypal.title.t1');
    } else {
      that.title = that.$t('paypal.title.t2');
      that.acc = sessionStorage.getItem("paypal");
    }
  },
  methods: {
    back() {
      this.$router.back();
    },
    sub() {
      let that = this;
      if (that.acc) {
        that.$vux.loading.show({
          text: ""
        });
        that
          .$http({
            url: "/user/add_paypal",
            method: "post",
            data: {
              token: that.$store.state.user_info.token,
              paypal: that.acc
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
        input {
          width: calc(100% - 2rem);
          line-height: 1.1rem;
          box-sizing: border-box;
          padding: 0 0.2rem 0;
          background: transparent;
        }
      }
    }
  }
}
</style>
