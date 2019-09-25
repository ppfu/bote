<template>
  <div class="wrap">
    <div class="top">
      <div>{{$t('mining.title')}}</div>
      <div class="way_div">
        <span :class="{f_c:list.withdraw_status==1}" @click="extract">{{$t('mining.btn.b1')}}</span>
        <span :class="{f_c:auto==true}" @click="show=true">{{$t('mining.btn.b2')}}</span>
      </div>
    </div>
    <div class="notice">
      <div class="d_title">{{$t('mining.des')}}</div>
      <div class="d_con" v-html="str"></div>
    </div>
    <div class="coin_div">
      <!-- <div class="dh">
        <span>{{$t('mining.coinlist.t1')}}</span>
        <span>{{$t('mining.coinlist.t2')}}</span>
        <span>{{$t('mining.coinlist.t3')}}</span>
        <span>{{$t('mining.coinlist.t4')}}</span>
      </div>
      <div v-if="list==''" class="none_data f_c_gray ta_c">{{$t('mining.none')}}...</div>
      <div v-if="list!=''" class="dl">
        <span>{{list.B}}</span>
        <span>{{list.pay_B}}</span>
        <span>
          <van-switch
            :value="list.status"
            size="26px"
            active-color="#fcb90b"
            inactive-color="#f0f0f0"
            @input="onInput"
          />
        </span>
        <span :class="{f_c:list.status}" @click="toLink">{{list.working}}</span>
      </div> -->
      <x-table :content-bordered="false" :cell-bordered="false">
        <thead>
          <tr>
            <th>{{$t('mining.coinlist.t1')}}</th>
            <th>{{$t('mining.coinlist.t2')}}</th>
            <!-- <th>{{$t('mining.coinlist.t3')}}</th> -->
            <th>{{$t('mining.coinlist.t4')}}</th>
            <th>{{$t('mining.coinlist.t5')}}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="list==''" class="none_data f_c_gray ta_c">
           <td colspan='4'>{{$t('mining.none')}}...</td>
          </tr>

          <tr v-if="list!=''" @click="toLink">
            <td>{{list.B}}</td>
            <td>{{list.pay_B}}</td>
            <!-- <td> -->
              <!-- <van-switch
                :value="list.status"
                size="26px"
                active-color="#fcb90b"
                inactive-color="#f0f0f0"
                @input="onInput"
              /> -->
               <!-- <van-switch
                :value="list.status"
                size="26px"
                active-color="#fcb90b"
                inactive-color="#f0f0f0"
                disabled
              /> -->
            <!-- </td> -->
            <td :class="{f_c:list.status}">{{$t('mining.ing')}}{{list.working}}</td>
            <td>{{list.power}}</td>
          </tr>
        </tbody>
      </x-table>
    </div>
    <x-dialog v-model="show" class="de_dialog" hide-on-blur>
      <div class="dialog">
        <!-- <div class="no_title">
          <span class="iconfont icon-icon_wrong" @click="dialog=false"></span>
        </div>-->
        <div class="dia_title">{{$t('mining.btn.b2')}}</div>
        <div class="dia_con" v-html="str1"></div>
        <div class="dia_btns">
          <button class="btn f_c" @click="autoClose">{{$t('close')}}</button>
          <button class="btn f_c" @click="autoSub">{{$t('open')}}</button>
        </div>
      </div>
    </x-dialog>
  </div>
</template>
<script>
import $ from "jquery";
import { Switch } from "vant";
import { XDialog, XTable } from "vux";
export default {
  data() {
    return {
      type: 1,
      value: false,
      str: "",
      str1: "",
      list: "",
      auto: false,
      show: false
    };
  },
  components: {
    XDialog,
    XTable,
    "van-switch": Switch
  },
  mounted() {
    let that = this;
    mui.back = function() {
      mui.plusReady(function() {
        var main = plus.android.runtimeMainActivity();
        main.moveTaskToBack(false);
      });
      error;
    };
    // 挖矿说明
    // if (sessionStorage.getItem("str")) {
    //   that.str = sessionStorage.getItem("str");
    // } else {
    // that
    //   .$http({
    //     url: "/notice/mining_notice",
    //     method: "post",
    //     data: {
    //       type: 1,
    //       token: that.$store.state.user_info.token
    //     }
    //   })
    //   .then(function(res) {
    //     if (res.data.code == 1) {
    //       that.str = res.data.data;
    //       sessionStorage.setItem("str", res.data.data);
    //     } else {
    //       that.$vux.toast.show({
    //         text: res.data.msg,
    //         type: "cancel",
    //         position: "middle",
    //         time: 1200
    //       });
    //     }
    //   });
    // }
    // 费用说明
    // if (sessionStorage.getItem("str1")) {
    //   that.str1 = sessionStorage.getItem("str1");
    // } else {
    // that
    //   .$http({
    //     url: "/notice/mining_notice",
    //     method: "post",
    //     data: {
    //       type: 2,
    //       token: that.$store.state.user_info.token
    //     }
    //   })
    //   .then(function(res) {
    //     if (res.data.code == 1) {
    //       that.str1 = res.data.data;
    //       sessionStorage.setItem("str1", res.data.data);
    //     } else {
    //       that.$vux.toast.show({
    //         text: res.data.msg,
    //         type: "cancel",
    //         position: "middle",
    //         time: 1200
    //       });
    //     }
    //   });
    // }
  },
  activated() {
    let that = this;
    that
      .$http({
        url: "/notice/mining_notice",
        method: "post",
        data: {
          type: 1,
          token: that.$store.state.user_info.token
        }
      })
      .then(function(res) {
        if (res.data.code == 1) {
          that.str = res.data.data;
          console.log(res)
          sessionStorage.setItem("str", res.data.data);
        } else {
          that.$vux.toast.show({
            text: res.data.msg,
            type: "cancel",
            position: "middle",
            time: 1200
          });
        }
      });
    that
      .$http({
        url: "/notice/mining_notice",
        method: "post",
        data: {
          type: 2,
          token: that.$store.state.user_info.token
        }
      })
      .then(function(res) {
        if (res.data.code == 1) {
          that.str1 = res.data.data;
          sessionStorage.setItem("str1", res.data.data);
        } else {
          that.$vux.toast.show({
            text: res.data.msg,
            type: "cancel",
            position: "middle",
            time: 1200
          });
        }
      });
    // 自动提取收益配置
    that
      .$http({
        url: "/user/get_auto_withdraw",
        method: "post",
        data: {
          token: that.$store.state.user_info.token
        }
      })
      .then(function(res) {
        if (res.data.code == 1) {
          that.auto = Boolean(res.data.data.status);

        } else {
          that.$vux.toast.show({
            text: res.data.msg,
            type: "cancel",
            position: "middle",
            time: 1200
          });
        }
      });
    // 矿机列表
    that
      .$http({
        url: "/user/mining",
        method: "post",
        data: {
          token: that.$store.state.user_info.token
        }
      })
      .then(function(res) {
        if (res.data.code == 1) {
          res.data.data.status = Boolean(res.data.data.status);
          that.list = res.data.data;
          console.log(that.list);
        } else {
          that.$vux.toast.show({
            text: res.data.msg,
            type: "cancel",
            position: "middle",
            time: 1200
          });
        }
      });
  },
  methods: {
    onInput(checked) {
      let that = this;
      that.$vux.loading.show({
        text: ""
      });
      that
        .$http({
          url: "/user/mining_total_switch",
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
            that.list.status = checked;
            that.list.working = res.data.data;
          } else {
            that.$vux.toast.show({
              text: res.data.msg,
              type: "cancel",
              position: "middle",
              time: 1200
            });
          }
        });
    },
    toLink() {
      this.$router.push({
        name: "exploit"
      });
    },
    extract() {
      let that = this;
      if(that.list.withdraw_status==0){
        return false;
      }
      that.$vux.confirm.show({
        title: that.$t("confirm.card.title.t4"),
        confirmText: that.$t("cfm"),
        cancelText: that.$t("cel"),
        content: that.$t("confirm.card.con.c4"),
        onShow() {},
        onHide() {},
        onCancel() {},
        onConfirm() {
          that.$vux.loading.show({
            text: ""
          });
          that
            .$http({
              url: "/user/withdraw_mining",
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
      });
    },
    autoSub() {
      let that = this;
      if (that.auto == 0) {
        that.show = false;
        that.$vux.loading.show({
          text: ""
        });
        that
          .$http({
            url: "/user/change_auto_withdraw",
            method: "post",
            data: {
              token: that.$store.state.user_info.token,
              switch: 1
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
              that.auto = !that.auto;
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
          text: that.$t("tip.open_error"),
          type: "text",
          position: "middle",
          time: 1200
        });
      }
    },
    autoClose() {
      let that = this;
      if (that.auto == 1) {
        that.show = false;
        that.$vux.loading.show({
          text: ""
        });
        that
          .$http({
            url: "/user/change_auto_withdraw",
            method: "post",
            data: {
              token: that.$store.state.user_info.token,
              switch: 0
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
              that.auto = !that.auto;
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
          text: that.$t("tip.close_error"),
          type: "text",
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
  .vux-table th {
    background: #161d26;
    color: #d6d7d9;
    text-align: left;
  }

  .vux-table td {
    border-bottom: 1px solid #2a333e;
    color: #8f8f9b;
    text-align: left;
  }
  .vux-table th:first-child,.vux-table td:first-child{
    padding-left: 6%;
  }
  .top {
    background: #1a212a;
    .way_div {
      font-size: 0.36rem;
      position: absolute;
      right: 3%;
      top: 0;
      color: #827d7d;
      > span:last-child {
        margin-left: 0.4rem;
      }
    }
  }
  .notice {
    background: #1a212a;
    padding: 0.5rem 6% 0.5rem;
    .d_title {
      font-size: 0.44rem;
      padding-bottom: 0.3rem;
    }
    .d_con {
      color: #888;
    }
  }

  .coin_div {
    background: #1a212a;
    padding-bottom: 0.5rem;
    > div {
      overflow: hidden;
      padding: 0 6% 0;
      > span {
        float: left;
        width: 22%;
      }
      > span:nth-child(3) {
        width: 34%;
        padding-left: 0.4rem;
        box-sizing: border-box;
      }
    }
    .dh {
      background: #161d26;
      line-height: 1rem;
      color: #d6d7d9;
    }
    .dl {
      color: #8f8f9b;
      padding: 0.4rem 6% 0.2rem;
      border-bottom: 1px solid #2a333e;
      line-height: 30px;
    }
  }
  .none_data td {
    text-align: center;
    padding-left: 0!important;
  }
  .de_dialog {
    .dialog {
      padding: 0;
      .no_title {
        position: relative;
        box-sizing: border-box;
        .iconfont {
          position: absolute;
          font-size: 0.58rem;
          color: #888;
          right: 0.3rem;
          top: 0.3rem;
        }
      }
    }
    color: #333;
    .dia_title {
      font-size: 0.44rem;
      padding: 0.4rem 0 0.2rem;
    }
    .dia_con {
      padding: 0.1rem 0.4rem 0.4rem;
      text-align: left;
    }
    .dia_btns {
      display: flex;
      .btn:first-child {
        border-right: 1px solid #f0f0f0;
        color: #333;
      }
    }
    .btn {
      flex: 1;
      width: 100%;
      line-height: 1.1rem;
      background: transparent;
      font-size: 0.44rem;
      border-top: 1px solid #f0f0f0;
    }
  }
}
</style>
