<template>
  <div class="wrap">
    <div class="top">
      <img @click="back" class="back_img" src="../assets/nav_back.png" alt>
      <div>{{$t('uname.title')}}</div>
      <span class="cpt" @click="sub">{{$t('codedialog.c4')}}</span>
    </div>
    <div class="main">
      <ul class="form">
        <li>
          <input type="text" v-model="u_name" :placeholder="$t('uname.p1')">
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
      u_name: ""
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
    sub() {
      let that = this;
      if (that.u_name == "") {
        that.$vux.toast.show({
          text: that.$t('uname.p1'),
          type: "cancel",
          position: "middle",
          time: 1200
        });
        return false;
      }
      that.$vux.loading.show({
          text: ""
        });
      that
        .$http({
          url: "/user/change_user_info",
          method: "post",
          data: {
            token: that.$store.state.user_info.token,
            type: "",
            profile_icon: "",
            nickname: that.u_name
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
        input {
          width: 100%;
          line-height: 1.1rem;
          box-sizing: border-box;
          padding: 0 0.2rem 0 6%;
          background: transparent;
        }
      }
    }
  }
}
</style>
