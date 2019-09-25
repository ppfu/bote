<template>
  <div class="wrap">
    <div class="top">
      <img @click="back" class="back_img" src="../assets/nav_back.png" alt>
      <div>{{$t('card.title.t1')}}</div>
    </div>
    <div class="main">
      <div class="card_div">
        <div class="card" v-for="(item,index) in list" :key="index">
          <span>{{item.bank_name}}</span>
          <!-- <span v-if="item.bank_type==1">{{$t('card.info.t1')}}</span>
          <span v-if="item.bank_type==2">{{$t('card.info.t2')}}</span> -->
          <span>{{item.open_name}} -- {{item.bank_add}}</span>
          <span>{{item.bank_card}}</span>
          <!-- <span v-html="item.bank_card1"></span> -->
          <div class="do_div">
            <span v-if="item.default==1" class="f_c">{{$t('card.info.b1')}}</span>
            <span v-if="item.default==0" @click="setDefault(item.id,index)">{{$t('card.info.b2')}}</span>
            <span class="iconfont icon-shanchu2" @click="deleteCard(item.id,index,item.default)"></span>
          </div>
        </div>
      </div>
    </div>
    <div class="bot_btn">
      <div class="f_c" @click="addCard">
        <span class="iconfont icon-jia f_c"></span>
        {{$t('card.title.t2')}}
      </div>
    </div>
    <x-dialog v-model="show" class="de_dialog" hide-on-blur>
      <div class="dialog">
        <div class="dia_title">{{$t('codedialog.c1')}}</div>
        <div class="dia_con">
          <div class="code_title">{{email}} {{$t('codedialog.c2')}}</div>
          <div>
            <input type="text" class="code_input" :placeholder="$t('codedialog.c3')" v-model="code">
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
import Qs from "qs";
import { XDialog } from "vux";
export default {
  data() {
    return {
      show: false,
      list: [],
      code: "",
      email: ""
    };
  },
  components: {
    XDialog
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
        url: "/user/user_bank",
        method: "post",
        data: {
          token: that.$store.state.user_info.token
        }
      })
      .then(function(res) {
        if (res.data.code == 1) {
          that.email = res.data.data.email;
          if (res.data.data.list.length) {
            for (let v of res.data.data.list) {
              let str = "",
                arr = [];
              let n = parseInt(v.bank_card.length / 4);
              let nn=n;
              if(v.bank_card.length%4==0){
                nn=n-1;
              }
              for (let i = 0; i < nn; i++) {
                arr.push("****&nbsp;&nbsp;&nbsp;");
              }
              arr.push(v.bank_card.substr(nn*4));
              v.bank_card1 = arr.join("");
            }
            that.list = res.data.data.list;
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
  methods: {
    back() {
      this.$router.back();
    },
    deleteCard(id, i, type) {
      let that = this;
      if (type == 1) {
        that.$vux.toast.show({
          text: that.$t("tip.card.t1"),
          type: "text",
          position: "middle",
          time: 1200
        });
        return false;
      }
      that.$vux.confirm.show({
        title: that.$t("confirm.card.title.t1"),
        confirmText: that.$t("cfm"),
        cancelText: that.$t("cel"),
        content: that.$t("confirm.card.con.c1"),
        onShow() {},
        onHide() {},
        onCancel() {},
        onConfirm() {
          that
            .$http({
              url: "/user/del_user_bank",
              method: "post",
              data: {
                token: that.$store.state.user_info.token,
                id: id
              }
            })
            .then(function(res) {
              if (res.data.code == 1) {
                that.list.splice(i, 1);
                that.$vux.toast.show({
                  text: res.data.msg,
                  type: "success",
                  position: "middle",
                  time: 1200
                });
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
    addCard() {
      let that = this;
      that.$vux.confirm.show({
        title: that.$t("confirm.card.title.t2"),
        confirmText: that.$t("cfm"),
        cancelText: that.$t("cel"),
        content: that.$t("confirm.card.con.c2"),
        onShow() {},
        onHide() {},
        onCancel() {},
        onConfirm() {
          that.$vux.loading.show({
            text: ""
          });
          that
            .$http({
              url: "/user/user_send_email",
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
                that.code = res.data.data.code;
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
        }
      });
    },
    setDefault(id, i) {
      let that = this;
      that.$vux.loading.show({
        text: ""
      });
      that
        .$http({
          url: "/user/default_bank",
          method: "post",
          data: {
            token: that.$store.state.user_info.token,
            id: id
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
            for(let x in that.list){
              if(x==i){
                that.list[i].default = 1;
              }else{
                that.list[x].default = 0;
              }
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
    sub() {
      let that = this;
      if (that.code == "") {
        that.$vux.toast.show({
          text: that.$t("codedialog.c3"),
          type: "cancel",
          position: "middle",
          time: 1200
        });
        return false;
      }
      that
        .$http({
          url: "/user/check_email_code",
          method: "post",
          data: {
            token: that.$store.state.user_info.token,
            code: that.code
          }
        })
        .then(function(res) {
          if (res.data.code == 1) {
            that.$router.push({
              name: "addcard"
            });
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
  padding: 1.3rem 0 2rem;
  overflow: auto;
  .top {
    background: #1a212a;
  }
  .bot_btn {
    position: fixed;
    bottom: 0;
    width: 100%;
    height: 1.8rem;
    background: #12161c;
    > div {
      text-align: center;
      font-size: 0.44rem;
      .iconfont {
        font-size: 0.9rem;
        display: inline-block;
        vertical-align: sub;
        transform: translateY(2px);
      }
    }
  }
  .main {
    height: 100%;
    padding: 0 4% 0;
    box-sizing: border-box;
    overflow: auto;
    .card_div {
      .card {
        margin-bottom: 0.4rem;
        background: url(../assets/card.png);
        background-size: 100% 100%;
        position: relative;
        box-sizing: border-box;
        padding: 0.4rem;
        > span {
          display: block;
          margin-bottom: 0.2rem;
        }
        > span:first-child {
          font-size: 0.4rem;
        }
        > span:nth-child(2) {
          color: #a4a4a4;
          font-size: 0.34rem;
          margin-bottom: 0.4rem;
        }
        > span:nth-child(3) {
          font-size: 0.44rem;
        }
        .do_div {
          position: absolute;
          right: 0.4rem;
          top: 0.3rem;
          color: rgba(255, 255, 255, 0.6);
          .iconfont {
            font-size: 0.7rem;
            color: rgba(255, 255, 255, 0.6);
            display: inline-block;
            vertical-align: sub;
            margin-left: 0.4rem;
          }
        }
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
