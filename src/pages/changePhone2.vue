<template>
  <div class="wrap">
    <div class="top">
      <img @click="back" class="back_img" src="../assets/nav_back.png" alt>
      <div>{{$t('phone.title.t2')}}</div>
      <span class="cpt" @click="sub">{{$t('codedialog.c4')}}</span>
    </div>
    <div class="main">
      <ul class="form">
        <li>
          <span class="f_l">{{$t('phone.label.l5')}}</span>
          <input class="f_r" type="text" v-model="u_email" :placeholder="$t('phone.phr.p5')">
        </li>
        <li>
          <span class="f_l">{{$t('phone.label.l6')}}</span>
          <input class="f_l p_input" type="password" v-model="pwd" :placeholder="$t('phone.phr.p6')">
          <span class="iconfont icon-yanjingbi f_r" @touchstart="eyepwd($event)"></span>
        </li>
        
        <li>
          <span class="f_l">{{$t('phone.label.l4')}}</span>
          <select class="f_l" v-model="p_type">
            <option
              v-for="(item,index) in list"
              :key="index"
              :value="item.ph_pre_id+','+item.pre_code"
            >{{item.pre_code}}</option>
          </select>
          <input class="f_r p_input" type="number" v-model="u_phone" :placeholder="$t('phone.phr.p4')">
        </li>
        <li>
          <span class="f_l">{{$t('phone.label.l2')}}</span>
          <input class="f_l code_input" type="text" v-model="u_code" :placeholder="$t('code')">
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
      u_email:"",
      u_phone: "",
      p_type: "",
      u_code: "",
      pwd: "",
      btn_msg: this.$t('code'),
      list: []
    };
  },
  components: {},
  mounted() {
    let that = this;
    mui.back = function() {
      that.$router.back();
      error;
    };
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
        url: "/phone/country_pre",
        method: "post",
        data: {
          language: ll
        }
      })
      .then(function(res) {
        if (res.data.code == 1) {
          that.list = res.data.data;
          that.p_type =
            res.data.data[0].ph_pre_id + "," + res.data.data[0].pre_code;
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
      let reg = /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/;
      if (reg.test(that.u_phone)) {
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
              url: "/user/new_phone_code",
              method: "post",
              data: {
                token: that.$store.state.user_info.token,
                new_phone: that.u_phone
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
          text: that.$t('tip.phone_error'),
          type: "cancel",
          position: "middle",
          time: 1200
        });
      }
    },
    sub() {
      let that = this;
      if (that.u_email&&that.pwd&&that.u_phone&&that.u_code) {
        that.$vux.loading.show({
          text: ""
        });
        that
            .$http({
              url: "/user/change_phone_email",
              method: "post",
              data: {
                token: that.$store.state.user_info.token,
                email: that.u_email,
                payment_password: that.pwd,
                new_phone:that.u_phone,
                new_phone_code: that.u_code,
                pre_code_id:that.p_type.split(",")[0],
                pre_code:that.p_type.split(",")[1],
              }
            })
            .then(function(res) {
              that.$vux.loading.hide();
              if (res.data.code == 1) {
                that.$vux.toast.show({
                  text: res.data.msg,
                  type: "success",
                  position: "middle",
                  time: 1500
                });
                that.u_phone="";
                that.u_email="";
                that.u_code="";
                that.pwd="";
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
        border-bottom: 1px solid #12161c;
        overflow: hidden;
        padding: 0 4% 0;
        >span:first-child{
          width: 1.5rem;
        }
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
          width: calc(100% - 1.7rem);
          line-height: 1.1rem;
          box-sizing: border-box;
          padding: 0 0.2rem 0;
          background: transparent;
        }
        .iconfont {
          font-size: 0.6rem;
        }
        .p_input {
          width: calc(100% - 3.8rem);
          margin-left: 0.2rem;
        }
        .code_input {
          width: calc(100% - 4rem);
          margin-left: 0.2rem;
        }
      }
    }
  }
}
</style>
