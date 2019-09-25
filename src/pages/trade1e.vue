<template>
  <div class="wrap1">
    <div class="main1">
      <x-table :content-bordered="false" :cell-bordered="false">
        <thead>
          <tr>
            <th>{{$t('market.marketlist.t1')}}</th>
            <th>{{$t('market.marketlist.t2')}} (USD)</th>
            <th>24h{{$t('market.marketlist.t3')}}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <span>{{$store.state.active_market.name}}</span>
              <span>{{$t('market.marketlist.d1')}}：{{coin_info.volume}}</span>
            </td>
            <td>
              <span>{{coin_info.new_price_usd}}</span>
              <span>￥{{coin_info.new_price_cny}}</span>
            </td>
            <td>
              <button
                class="btn"
                :class="[coin_info.day_rise_fall_color!='green'?'up_btn':'down_btn']"
              >{{coin_info.day_rise_fall}}</button>
            </td>
          </tr>
        </tbody>
      </x-table>

      <div class="bs_div">
        <tab
          class="tab"
          :line-width="2"
          bar-active-color="#f0b90b"
          active-color="#f0b90b"
          :scroll-threshold="5"
          v-model="type"
        >
          <tab-item @click.native="navTap(0)">{{$t('trade.btn.b1')}}</tab-item>
          <tab-item @click.native="navTap(1)">{{$t('trade.btn.b2')}}</tab-item>
        </tab>
        <div v-if="type==0" class="form_div">
          <div class="form">
            <!-- <div>
              <span class="f_l">{{$t('trade.child1.buy.l1')}}：</span>
              <div class="f_r">
                <span class="span">{{best_buy_price}}</span>
              </div>
            </div>-->
            <div>
              <span class="f_l">{{$t('trade.child1.buy.l2')}}：</span>
              <div class="f_r po_re">
                <input
                  type="text"
                  v-model="b_price"
                  @input="num($event,1)"
                  :placeholder="$t('trade.child1.buy.i1')"
                >
                <span class="spans">{{$t('trade.child1.buy.t1')}}：{{buyData.cny}} ￥</span>
                <span
                  v-if="Number(b_price)==Number(best_buy_price)"
                  class="po_ab"
                >{{$t('trade.child1.buy.l1')}}</span>
              </div>
            </div>
            <div>
              <span class="f_l">{{$t('trade.child1.buy.l3')}}：</span>
              <div class="f_r">
                <span
                  class="span"
                >{{buyData.min}} - {{buyData.max}} {{$store.state.active_market.name}}</span>
              </div>
            </div>
            <div>
              <span class="f_l">{{$t('trade.child1.buy.l4')}}：</span>
              <div class="f_r">
                <input
                  type="text"
                  v-model="b_num"
                  @input="num($event,2)"
                  :placeholder="$t('trade.child1.buy.i2')"
                >
              </div>
            </div>
            <div>
              <span class="f_l">{{$t('trade.child1.buy.l5')}}：</span>
              <div class="f_r">
                <span class="span">
                  {{buyData.sum1}} USD
                  <span class="f_c_gray">≈ {{buyData.sum2}} ￥</span>
                </span>
              </div>
            </div>
            <div>
              <span class="f_l">{{$t('trade.child1.buy.l6')}}：</span>
              <div class="f_r">
                <input type="password" v-model="b_pwd" :placeholder="$t('trade.child1.buy.i3')">
              </div>
            </div>
          </div>
          <div class="d_btn">
            <button class="btn buy_btn" @click="buySub">{{$t('trade.btn.b1')}}</button>
          </div>
        </div>
        <div v-if="type==1" class="form_div">
          <div class="form">
            <!-- <div>
              <span class="f_l">{{$t('trade.child1.sell.l1')}}：</span>
              <div class="f_r">
                <span class="span">{{best_sell_price}}</span>
              </div>
            </div>-->
            <div>
              <span class="f_l">{{$t('trade.child1.sell.l2')}}：</span>
              <div class="f_r po_re">
                <input
                  type="text"
                  v-model="s_price"
                  @input="num($event,3)"
                  :placeholder="$t('trade.child1.sell.i1')"
                >
                <span class="spans">{{$t('trade.child1.sell.t1')}}：{{sellData.cny}} ￥</span>
                <span
                  v-if="Number(s_price)==Number(best_sell_price)"
                  class="po_ab"
                >{{$t('trade.child1.sell.l1')}}</span>
              </div>
            </div>
            <div>
              <span class="f_l">{{$t('trade.child1.sell.l3')}}：</span>
              <div class="f_r">
                <input
                  type="text"
                  v-model="s_num"
                  @input="num($event,4)"
                  :placeholder="$t('trade.child1.sell.i2')"
                >
                <span class="spans">
                  {{$t('trade.child1.sell.max')}}：{{max_sell_num}}
                  <span
                    class="iconfont icon-iconfontquestion"
                    @click="tip"
                  ></span>
                </span>
              </div>
            </div>
            <div class="choices">
              <button class="btn" @click="percent('0.25')">25%</button>
              <button class="btn" @click="percent('0.5')">50%</button>
              <button class="btn" @click="percent('0.75')">75%</button>
              <button class="btn" @click="percent('1')">100%</button>
            </div>
            <div>
              <span class="f_l">{{$t('trade.child1.sell.l4')}}：</span>
              <div class="f_r">
                <span class="span">
                  {{sellData.sum1}} USD
                  <span class="f_c_gray">≈ {{sellData.sum2}} ￥</span>
                </span>
              </div>
            </div>
            <div>
              <span class="f_l">{{$t('trade.child1.sell.l5')}}：</span>
              <div class="f_r">
                <span class="span">{{sellData.fee}} BAUD</span>
              </div>
            </div>
            <div>
              <span class="f_l">{{$t('trade.child1.sell.l6')}}：</span>
              <div class="f_r">
                <input type="password" v-model="s_pwd" :placeholder="$t('trade.child1.sell.i3')">
              </div>
            </div>
          </div>
          <div class="d_btn">
            <button class="btn sell_btn" @click="sellSub">{{$t('trade.btn.b2')}}</button>
          </div>
        </div>
      </div>
    </div>
    <x-dialog v-model="dialog" class="de_dialog no_dialog" hide-on-blur>
      <div class="dialog">
        <div class="no_title">
          <span class="iconfont icon-icon_wrong" @click="dialog=false"></span>
        </div>
        <div class="no_con">
          <div class="tip_con">{{tips}}</div>
        </div>
      </div>
    </x-dialog>
  </div>
</template>
<script>
import $ from "jquery";
import { Tab, TabItem, XTable, XDialog } from "vux";

export default {
  data() {
    return {
      dialog: false,
      type: 0,
      coin_info: {},
      b_price: "",
      b_num: "",
      b_pwd: "",
      s_price: "",
      s_num: "",
      s_pwd: "",
      best_buy_price: "--",
      best_sell_price: "--",
      ratio: "",
      ratio1: "",
      u_usd: "",
      u_coin: "",
      max_sell_num: "",
      tips: "",
      min_price: 0,
      max_price: 0
    };
  },
  components: {
    Tab,
    TabItem,
    XTable,
    XDialog
  },
  computed: {
    buyData() {
      let that = this;
      let cny = "";
      let max = "";
      let min = "";
      let sum1 = "";
      let sum2 = "";
      // let fee = "";
      if (that.b_price == "") {
        cny = 0;
        max = "--";
        min = "--";
        // if (that.best_buy_price.split(" ")[0] == 0) {
        //   max = 0;
        // } else {
        //   max = (
        //     parseFloat(that.u_usd) /
        //     parseFloat(that.best_buy_price.split(" ")[0])
        //   ).toFixed(2);
        // }
      } else {
        cny = (parseFloat(that.b_price) * parseFloat(that.ratio)).toFixed(2);
        min = "1";
        max = (parseFloat(that.max_price) / parseFloat(that.b_price)).toFixed(
          2
        );
      }
      if (that.b_price == "" || that.b_num == "") {
        sum1 = "0.00";
        sum2 = "0.00";
        // fee = 0;
      } else {
        sum1 = (parseFloat(that.b_price) * parseFloat(that.b_num)).toFixed(2);
        sum2 = (sum1 * parseFloat(that.ratio)).toFixed(2);
        // fee = (parseFloat(sum1)*parseFloat(that.ratio1)).toFixed(2);
      }
      return {
        cny: cny,
        sum1: sum1,
        sum2: sum2,
        max: max,
        min: min
        // fee:fee,
      };
    },
    sellData() {
      let that = this;
      let cny = "";
      let sum1 = "";
      let sum2 = "";
      let fee = "";
      if (that.s_price == "") {
        cny = 0;
      } else {
        cny = (parseFloat(that.s_price) * parseFloat(that.ratio)).toFixed(2);
      }
      if (that.s_price == "" || that.s_num == "") {
        sum1 = "0.00";
        sum2 = "0.00";
        fee = "0.00000";
      } else {
        sum1 = (parseFloat(that.s_price) * parseFloat(that.s_num)).toFixed(2);
        sum2 = (sum1 * parseFloat(that.ratio)).toFixed(2);
        fee = (parseFloat(that.s_num) * parseFloat(that.ratio1)).toFixed(5);
      }
      return {
        cny: cny,
        sum1: sum1,
        sum2: sum2,
        fee: fee
      };
    }
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
    this.$nextTick(() => {
      if (this.$route.params.type) {
        this.type = Number(this.$route.params.type);
      } else {
        this.type = 0;
      }
    });
    that
      .$http({
        url: "http://btsq.qilinpz.com/api/Transaction/buy_range",
        method: "post",
        data: {
          token: that.$store.state.user_info.token
        }
      })
      .then(function(res) {
        if (res.data.code == 1) {
          that.min_price = res.data.data.min;
          that.max_price = res.data.data.max;
        }
      });
    that.getInfo();
    // window.t = setInterval(that.getInfo, 3000);
    // 个人账户资金
    that
      .$http({
        url: "/Transaction/get_user_finance",
        method: "post",
        data: {
          token: that.$store.state.user_info.token,
          cur_id: that.$store.state.active_market.id
        }
      })
      .then(function(res) {
        if (res.data.code == 1) {
          that.ratio = res.data.data.usdt_cny;
          that.ratio1 = res.data.data.service_charge;
          that.u_usd = res.data.data.usdt;
          that.u_coin = res.data.data.other;
        } else {
          that.$vux.toast.show({
            text: res.data.msg,
            type: "text",
            position: "middle",
            time: 1200
          });
        }
      });
    // 最大可卖
    that
      .$http({
        url: "/Transaction/max_sell_num",
        method: "post",
        data: {
          token: that.$store.state.user_info.token,
          cur_id: that.$store.state.active_market.id
        }
      })
      .then(function(res) {
        if (res.data.code == 1) {
          that.max_sell_num = parseFloat(res.data.data).toFixed(5);
        } else {
          that.$vux.toast.show({
            text: res.data.msg,
            type: "text",
            position: "middle",
            time: 1200
          });
        }
      });
    // 最大可卖提示
    that
      .$http({
        url: "/Transaction/max_sell_tips",
        method: "post",
        data: {
          token: that.$store.state.user_info.token
        }
      })
      .then(function(res) {
        if (res.data.code == 1) {
          that.tips = res.data.data;
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
    navTap(i) {
      let that = this;
      this.type = i;
      clearInterval(window.t);
      this.getInfo();
      // window.t = setInterval(that.getInfo, 3000);
    },
    toDetail() {
      this.$router.push({
        name: "coindetail"
      });
    },
    num(e, i) {
      clearInterval(window.t);
      $(e.target).val(
        $(e.target)
          .val()
          .match(/\d+\.?\d{0,5}/)
      );
      switch (i) {
        case 1:
          this.b_price = $(e.target).val();
          break;
        case 2:
          this.b_num = $(e.target).val();
          break;
        case 3:
          this.s_price = $(e.target).val();
          break;
        case 4:
          this.s_num = $(e.target).val();
          break;
      }
    },
    percent(x) {
      let that = this;
      that.s_num = (parseFloat(that.max_sell_num) * parseFloat(x)).toFixed(5);
    },
    tip() {
      this.dialog = true;
    },
    getInfo() {
      let that = this;
      let tt;
      if (that.type == 0) {
        tt = 2;
      } else {
        tt = 1;
      }
      that
        .$http({
          url: "/Transaction/get_info",
          method: "post",
          data: {
            token: that.$store.state.user_info.token,
            type: tt,
            cur_id: that.$store.state.active_market.id
          }
        })
        .then(function(res) {
          if (res.data.code == 1) {
            that.coin_info = res.data.data;
            if (that.type == 0) {
              that.best_buy_price = res.data.data.best_buy_num;
              that.b_price = res.data.data.best_buy_num;
            } else {
              that.best_sell_price = res.data.data.best_sell_num;
              that.s_price = res.data.data.best_sell_num;
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
    buySub() {
      let that = this;
      if (that.b_price && that.b_num && that.b_pwd) {
        that.$vux.loading.show({
          text: ""
        });
        that
          .$http({
            url: "/Transaction/do_trade",
            method: "post",
            data: {
              token: that.$store.state.user_info.token,
              type: 2,
              cur_id: that.$store.state.active_market.id,
              price: that.b_price,
              number: that.b_num,
              pwd: that.b_pwd
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
              that.b_price = "";
              that.b_num = "";
              that.b_pwd = "";
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
          text: that.$t("tip.full_tip"),
          type: "cancel",
          position: "middle",
          time: 1200
        });
      }
    },
    sellSub() {
      let that = this;
      if (that.s_price && that.s_num && that.s_pwd) {
        that.$vux.loading.show({
          text: ""
        });
        that
          .$http({
            url: "/Transaction/do_trade",
            method: "post",
            data: {
              token: that.$store.state.user_info.token,
              type: 1,
              cur_id: that.$store.state.active_market.id,
              price: that.s_price,
              number: that.s_num,
              pwd: that.s_pwd
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
              that.max_sell_num = (parseFloat(that.max_sell_num) - parseFloat(that.s_num)).toFixed(5);
              that.s_price = "";
              that.s_num = "";
              that.s_pwd = "";
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
.wrap1 {
  font-size: 0.36rem;
  width: 100%;
  height: 100%;
  color: white;
  box-sizing: border-box;
  overflow: auto;
  .main1 {
    .bs_div {
      margin-top: 0.3rem;
      background: #1a212a;
      .form_div {
        overflow: hidden;
        .d_btn {
          padding: 0 10% 0.4rem;
          .btn {
            display: block;
            width: 100%;
            line-height: 0.8rem;
            text-align: center;
            color: white;
            border-radius: 4px;
          }
          .buy_btn {
            background: #d40469;
          }
          .sell_btn {
            background: #01b782;
          }
        }
        .form {
          padding: 0.4rem 10% 0.4rem;
          color: #bfbfc8;

          .choices {
            display: flex;
            .btn {
              flex: 1;
              margin: 0 0.1rem 0;
              line-height: 0.8rem;
              text-align: center;
              box-sizing: border-box;
              border-radius: 4px;
              //   color: #01b782;
              background: #01b782;
              color: white;
            }
            .btn.active {
              background: #01b782;
              color: white;
            }
          }
          > div {
            overflow: hidden;
            margin-bottom: 0.3rem;
            > .f_l:first-child {
              width: 2rem;
              line-height: 0.9rem;
            }
            > .f_r {
              width: calc(100% - 2rem);
              text-align: left;
              color: white;
              input {
                line-height: 0.9rem;
                height: 0.9rem;
                border: 1px solid #888;
                width: 100%;
                padding: 0 0.2rem 0;
                box-sizing: border-box;
                background: transparent;
              }
              > .span {
                line-height: 0.9rem;
              }
              > .spans {
                display: block;
                padding-top: 0.1rem;
                color: #878893;
                .iconfont {
                  color: #c2c2ce;
                  font-size: 0.5rem;
                  display: inline-block;
                  transform: translateY(1px);
                  margin-left: 0.1rem;
                }
              }
            }
            .po_re {
              position: relative;
              input {
                padding: 0 2.2rem 0 0.2rem;
              }
              .po_ab {
                position: absolute;
                right: 0;
                top: 0;
                color: #878983;
                line-height: 0.9rem;
                padding-right: 0.1rem;
                font-size: 0.32rem;
              }
            }
          }
        }
      }
    }
  }
  table {
    background: #1a212a;
  }
  thead {
    background: #161d26;
    tr {
      th {
        text-align: left;
        padding-left: 0.4rem;
        color: #8f8f9b;
      }
    }
  }
  tbody {
    tr {
      td {
        text-align: left;
        padding-left: 0.4rem;
        color: #8f8f9b;
        border-bottom: 1px solid #2a333e;
        > span {
          display: block;
        }
        > span:first-child {
          color: white;
          font-size: 0.44rem;
          padding-bottom: 0.1rem;
        }
        .btn {
          border-radius: 4px;
          color: white;
          padding: 0.2rem;
          min-width: 1.8rem;
        }
        .up_btn {
          background: #d40469;
        }
        .down_btn {
          background: #01b782;
        }
      }
    }
    > tr:last-child {
      td {
        border-bottom: 0;
      }
    }
  }
  .no_dialog {
    color: #333;
    .no_title {
      position: relative;
      padding: 0.3rem 0 0.3rem;
      height: 1.2rem;
      box-sizing: border-box;
      .iconfont {
        position: absolute;
        font-size: 0.7rem;
        color: #101010;
        right: 0.3rem;
        top: 0.2rem;
      }
    }
    .no_con {
      .tip_con {
        text-align: left;
        padding: 0 0.4rem 0.4rem;
        font-size: 0.4rem;
        line-height: 0.6rem;
        color: white;
      }
    }
  }
}
</style>
