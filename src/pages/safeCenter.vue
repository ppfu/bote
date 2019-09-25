<template>
  <div class="wrap">
    <div class="top">
      <img @click="back" class="back_img" src="../assets/nav_back.png" alt>
      <div>{{$t('safecenter.title')}}</div>
    </div>
    <div class="main">
      <div class="list_div">
        <ul>
          <li @click="toPhone(info.phone)">
            <span class="f_l">{{$t('safecenter.t1')}}</span>
            <span class="f_r iconfont icon-youjiantou"></span>
            <span v-if="info.phone==null" class="f_r f_c">{{$t('safecenter.t9')}}</span>
            <span v-if="info.phone!=null" class="f_r">{{info.phone}}</span>
          </li>
          <li @click="toEmail">
            <span class="f_l">{{$t('safecenter.t2')}}</span>
            <span class="f_r iconfont icon-youjiantou"></span>
            <span class="f_r">{{info.email}}</span>
          </li>
          <li @click="toPwd">
            <span class="f_l">{{$t('safecenter.t3')}}</span>
            <span class="f_r iconfont icon-youjiantou"></span>
          </li>
          <li @click="toPwd1">
            <span class="f_l">{{$t('safecenter.t4')}}</span>
            <span class="f_r iconfont icon-youjiantou"></span>
          </li>
        </ul>
        <div class="div_title">{{$t('safecenter.t5')}}</div>
        <ul>
          <li>
            <span class="f_l">{{$t('safecenter.t6')}}</span>
            <span class="f_r sth">
              <van-switch
                :value="value1"
                size="26px"
                active-color="#fcb90b"
                inactive-color="#f0f0f0"
                @input="onInput"
              />
            </span>
          </li>
          <li>
            <span class="f_l">{{$t('safecenter.t7')}}</span>
            <span class="f_r sth">
              <van-switch
                :value="value2"
                size="26px"
                active-color="#fcb90b"
                inactive-color="#f0f0f0"
                @input="onInput1"
                disabled
              />
            </span>
          </li>
          <li>
            <span class="f_l">{{$t('safecenter.t8')}}</span>
            <span class="f_r sth">
              <van-switch
                :value="value3"
                size="26px"
                active-color="#fcb90b"
                inactive-color="#f0f0f0"
                @input="onInput2"
                disabled
              />
            </span>
          </li>
        </ul>
      </div>
    </div>
    <x-dialog v-model="show" class="de_dialog" hide-on-blur>
      <div class="dialog">
        <div class="dia_title">{{$t('codedialog.c1')}}</div>
        <div class="dia_con">
          <div class="code_title">{{info.email}}{{$t('codedialog.c2')}}</div>
          <div>
            <input type="text" class="code_input" :placeholder="$t('codedialog.c3')" v-model="email_code">
          </div>
          <div>
            <button class="btn f_c code_btn" @click="sub">{{$t('codedialog.c4')}}</button>
          </div>
        </div>
      </div>
    </x-dialog>
  </div>
</template>
<script>
import $ from "jquery";
import { Switch } from "vant";
import { XDialog } from "vux";
export default {
  data() {
    return {
      info: "",
      type: 1,
      show: false,
      value1: false,
      value2: true,
      value3: true,
      active: "",
      i: "",
      email_code: ""
    };
  },
  components: {
    XDialog,
    "van-switch": Switch
  },
  mounted() {
    let that = this;
    mui.back = function() {
      that.$router.back();
      error;
    };
  },
  activated() {
    let that = this;
    that
      .$http({
        url: "/user/come_in_sec",
        method: "post",
        data: {
          token: that.$store.state.user_info.token
        }
      })
      .then(function(res) {
        if (res.data.code == 1) {
          that.info = res.data.msg;
        } else {
          that.$vux.toast.show({
            text: res.data.msg,
            type: "text",
            position: "middle",
            time: 1200
          });
        }
      });
    that
      .$http({
        url: "/user/user_config",
        method: "post",
        data: {
          token: that.$store.state.user_info.token
        }
      })
      .then(function(res) {
        console.log(res)
        if (res.data.code == 1) {
          that.value1 = Boolean(res.data.data.login_email);
          that.value2 = Boolean(res.data.data.transfer);
          that.value3 = Boolean(res.data.data.change_pay_pwd);
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
    toPhone(o) {
      if (o == null) {
        this.$router.push({
          name: "changephone"
        });
      } else {
        this.$router.push({
          name: "changephone1"
        });
      }
    },
    toEmail() {
      this.$router.push({
        name: "changeemail"
      });
    },
    toPwd() {
      this.$router.push({
        name: "changelpwd"
      });
    },
    toPwd1() {
      let that = this;
      this.type = 2;
      if (this.value3) {
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
            time: 1200
          });
          that.email_code = res.data.data.code;
        } else {
          that.$vux.toast.show({
            text: res.data.msg,
            type: "text",
            position: "middle",
            time: 1200
          });
        }
      });
        this.show = true;
      } else {
        this.$router.push({
          name: "changetpwd"
        });
      }
    },
    onInput(checked) {
      let that = this;
      that.type = 1;
      that.$vux.confirm.show({
        title: that.$t('confirm.card.title.t6'),
        confirmText: that.$t('cfm'),
        cancelText: that.$t('cel'),
        content: that.$t('confirm.card.con.c6'),
        onShow() {},
        onHide() {},
        onCancel() {},
        onConfirm() {
          that.value1 = checked;
          that
            .$http({
              url: "/user/change_config",
              method: "post",
              data: {
                token: that.$store.state.user_info.token,
                type: 1
              }
            })
            .then(function(res) {
              if (res.data.code == 1) {
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
      });
    },
    onInput1(checked) {
      if (this.info.email == "") {
        this.$vux.toast.show({
          text: that.$t('tip.email_none'),
          type: "text",
          position: "middle",
          time: 1200
        });
        return false;
      }
      let that = this;
      that.type = 1;
      that.$vux.confirm.show({
        title: that.$t('confirm.card.title.t6'),
        confirmText: that.$t('cfm'),
        cancelText: that.$t('cel'),
        content: that.$t('confirm.card.con.c6'),
        onShow() {},
        onHide() {},
        onCancel() {},
        onConfirm() {
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
                that.email_code = res.data.data.code;
              } else {
                that.$vux.toast.show({
                  text: res.data.msg,
                  type: "text",
                  position: "middle",
                  time: 1200
                });
              }
            });
          that.i = 1;
          that.active = checked;
          that.show = true;
        }
      });
    },
    onInput2(checked) {
      if (this.info.email == "") {
        this.$vux.toast.show({
          text: that.$t('tip.email_none'),
          type: "text",
          position: "middle",
          time: 1200
        });
        return false;
      }
      let that = this;
      that.$vux.confirm.show({
        title: that.$t('confirm.card.title.t6'),
        confirmText: that.$t('cfm'),
        cancelText: that.$t('cel'),
        content: that.$t('confirm.card.con.c6'),
        onShow() {},
        onHide() {},
        onCancel() {},
        onConfirm() {
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
                  time: 1200
                });
                that.email_code = res.data.data.code;
              } else {
                that.$vux.toast.show({
                  text: res.data.msg,
                  type: "text",
                  position: "middle",
                  time: 1200
                });
              }
            });
          that.i = 2;
          that.active = checked;
          that.show = true;
        }
      });
    },
    sub() {
      let that = this;
      if (that.email_code == "") {
        that.$vux.toast.show({
          text: that.$t('tip.code_input'),
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
          url: "/user/check_email_code",
          method: "post",
          data: {
            token: that.$store.state.user_info.token,
            code: that.email_code
          }
        })
        .then(function(res) {
          that.$vux.loading.hide();
          if (res.data.code == 1) {
            if (that.type == 1) {
              if (that.i == 1) {
                that.value2 = that.active;
              } else {
                that.value3 = that.active;
              }
              that
                .$http({
                  url: "/user/change_config",
                  method: "post",
                  data: {
                    token: that.$store.state.user_info.token,
                    type: that.i + 1
                  }
                })
                .then(function(res) {
                  if (res.data.code == 1) {
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
              that.$router.push({
                name: "changetpwd"
              });
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
          img {
            width: 0.8rem;
            height: 0.8rem;
            transform: translateY(3px);
            margin-right: 0.4rem;
          }
          .sth {
            padding-top: 0.15rem;
            line-height: normal;
          }
        }
        li:last-child {
          margin-bottom: 0;
        }
      }
    }
  }
  .de_dialog {
    .dialog {
      padding: 0;
    }
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
