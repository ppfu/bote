<template>
  <div class="wrap1">
    <div class="main1">
      <tab
        class="tab fix_tab"
        :line-width="0"
        bar-active-color="#f0b90b"
        active-color="#f0b90b"
        :scroll-threshold="5"
        v-model="type"
      >
        <tab-item selected @click.native="navTap(0)">{{$t('trade.child2.tab.t1')}}</tab-item>
        <tab-item @click.native="navTap(1)">{{$t('trade.child2.tab.t3')}}</tab-item>
        <tab-item @click.native="navTap(2)">{{$t('trade.child2.tab.t2')}}</tab-item>
        <tab-item @click.native="navTap(3)">{{$t('trade.child2.tab.t4')}}</tab-item>
      </tab>
      <div class="scroll_div">
        <van-pull-refresh
          v-model="isLoading"
          :pulling-text="$t('more.a')"
          :loosing-text="$t('more.b')"
          :loading-text="$t('more.c')"
          @refresh="onRefresh"
        >
          <div
            class="div"
            v-infinite-scroll="loadMore"
            infinite-scroll-disabled="loading"
            infinite-scroll-distance="10"
            infinite-scroll-immediate-check="false"
          >
            <x-table v-if="type==0 || type==2" :content-bordered="false" :cell-bordered="false">
              <thead>
                <tr>
                  <th>{{$t('trade.child2.list.t1')}}</th>
                  <th>{{$t('trade.child2.list.t2')}}</th>
                  <th>{{$t('trade.child2.list.t3')}}（{{$store.state.active_market.name}}）</th>
                  <th>{{$t('trade.child2.list.t4')}}</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item,index) in list" :key="index">
                  <td>
                    <span>{{item.time1}}</span>
                    <span>{{item.time2}}</span>
                  </td>
                  <td>{{item.price}}</td>
                  <td>{{item.number}}</td>
                  <td @click="cancel(item.id)">{{$t('trade.child2.btn.b1')}}</td>
                </tr>
              </tbody>
            </x-table>
            <x-table v-if="type==1||type==3" :content-bordered="false" :cell-bordered="false">
              <thead>
                <tr>
                  <th>{{$t('trade.child1.pgs.p1')}}</th>
                  <th>{{$t('trade.child1.pgs.p2')}}({{$store.state.active_market.name}}≈CNY)</th>
                  <!-- <th>{{$t('trade.child1.pgs.p3')}}</th> -->
                  <th>剩余时间</th>
                  <th>{{$t('trade.child1.pgs.p4')}}</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item,index) in list">
                  <td>{{item.order}}</td>
                  <td>
                    <span>{{item.total_usdt}}</span>
                    <span>≈{{item.total_cny}}</span>
                  </td>
                  <td>{{item.left_time}}</td>
                  <td>
                    <button
                      v-if="type==1&&item.operation_type==1"
                      class="btn"
                      @click="toPay(item.seller_id,item.order_id,item.t_type)"
                    >{{$t('trade.child1.pgs.b1')}}</button>
                    <!-- <button
                      v-if="type==1&&item.operation_type==2"
                      class="btn"
                      :class="{btn_:item.t_type}"
                      @click="confirmReceive(item.order_id,item.t_type)"
                    >{{item.operation_text}}</button>-->
                    <!-- <button
                      v-if="type==1&&item.operation_type==2"
                      class="btn"
                      @click="goJubao(item.order_id)"
                    >举报</button>-->
                    <!-- <button
                      v-if="type==1&&item.operation_type==5"
                      class="btn"
                      :class="{btn_:item.operation_type==5}"
                    >{{item.operation_text}}</button>-->
                    <!-- <button
                      v-if="type==1&&item.operation_type==5"
                      class="btn"
                      @click="cancelJubao(item.order_id)"
                    >取消举报</button>-->
                    <!-- <span v-if="item.operation_type==3">{{item.operation_text}}</span> -->

                    <span v-if="type==1&&item.operation_type==3">{{item.operation_text}}</span>
                    <span v-if="type==1&&item.operation_type==2">{{item.operation_text}}</span>
                    <span v-if="type==1&&item.operation_type==5">{{item.operation_text}}</span>
                    <!-- <span v-if="type==1&&item.operation_type==2">{{item.operation_text}}</span> -->
                    <!-- <span v-if="type==1&&item.operation_type==5">{{item.operation_text}}</span> -->
                    <!-- 卖出进度  operation_type=>1等待付款 =>2确认收款  =>3已确认 =>3已确认 =>5举报审核中-->
                    <button
                      v-if="type==3&&item.operation_type==2"
                      class="btn"
                      @click="goJubao(item.order_id)"
                    >举报</button>
                    <!--  :class="{btn_:item.t_type}" -->
                    <button
                      v-if="type==3&&item.operation_type==2"
                      class="btn"
                      @click="confirmReceive(item.order_id,item.t_type)"
                    >{{item.operation_text}}</button>
                    <button
                      v-if="type==3&&item.operation_type==5"
                      class="btn"
                      @click="cancelJubao(item.order_id)"
                    >取消举报</button>
                    <span v-if="type == 3 && item.operation_type == 1">{{item.operation_text}}</span>
                    <span v-if="type == 3 && item.operation_type == 3">{{item.operation_text}}</span>
                    <span v-if="type == 3 && item.operation_type == 5">{{item.operation_text}}</span>
                  </td>
                </tr>
              </tbody>
            </x-table>
          </div>
          <load-more v-if="lif" :show-loading="load" :tip="$t('more.c')"></load-more>
          <load-more v-if="nif" :show-loading="none" :tip="$t('more.d')"></load-more>
        </van-pull-refresh>
      </div>
    </div>
  </div>
</template>
<script>
import $ from "jquery";
import { PullRefresh } from "vant";
import { Tab, TabItem, XTable, LoadMore } from "vux";

export default {
  data() {
    return {
      type: 0,
      list: [],
      page: 1,
      load: true,
      none: false,
      lif: true,
      nif: false,
      loading: false,
      isLoading: false
    };
  },
  components: {
    Tab,
    TabItem,
    XTable,
    LoadMore,
    "van-pull-refresh": PullRefresh
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
      that.getlist(1);
    });
  },
  methods: {
    navTap(i) {
      clearInterval(window.t);
      this.type = i;
      console.log(this.type);
      let that = this;
      that.loading = false;
      that.nif = false;
      that.page = 1;
      that.list = [];
      that.getlist(1);
    },
	//时间格式转换
    timeArr() {
      let that = this;
      window.t = setInterval(function() {
        for (let i in that.list) {
          let h, m, s;
          let now = new Date().getTime();
          let leftTime = that.list[i].left_times - now / 1000;
          if (leftTime > 0) {
            h = Math.floor((leftTime / 60 / 60) % 24);
            m = Math.floor((leftTime / 60) % 60);
            s = Math.floor(leftTime % 60);
            if (m < 10) {
              m = "0" + m;
            }
            if (s < 10) {
              s = "0" + s;
            }
            that.list[i].left_time = h + ":" + m + ":" + s;
          } else {
            h = "00";
            m = "00";
            s = "00";
            that.list[i].left_time = h + ":" + m + ":" + s;
            if (that.list[i].operation_type != 3) {
              that.list[i].t_type = 1;
              // that.list.splice(i, 1);
            }
          }
        }
      }, 1000);
    },
    cancel(id) {
      let that = this;
      that.$vux.confirm.show({
        title: that.$t("confirm.card.title.t5"),
        confirmText: that.$t("cfm"),
        cancelText: that.$t("cel"),
        content:
          "<div style='text-align:left'>" +
          that.$t("confirm.card.con.c5") +
          "</div>",
        onShow() {},
        onHide() {},
        onCancel() {},
        onConfirm() {
          that.$vux.loading.show({
            text: ""
          });
          that
            .$http({
              url: "/Transaction/cancel_trade",
              method: "post",
              data: {
                token: that.$store.state.user_info.token,
                trade_id: id
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
                that.list = [];
                that.getlist(1);
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
    toPay(id, id1, bool) {
      if (bool) {
        return false;
      }
      this.$router.push({
        name: "topay",
        params: {
          id: id,
          id1: id1
        }
      });
    },
    confirmReceive(id, bool) {
      if (bool) {
        return false;
      }
      let that = this;
      that.$vux.confirm.show({
        title: "确认收款",
        confirmText: "确认",
        cancelText: "取消",
        content: "已收到买家款项,允许订单完成,是否确定?",
        onShow() {},
        onHide() {},
        onCancel() {},
        onConfirm() {
          that.$vux.loading.show({
            text: ""
          });
          that
            .$http({
              url: "/Transaction/do_done",
              method: "post",
              data: {
                token: that.$store.state.user_info.token,
                order_id: id
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
                for (let v of that.list) {
                  if (v.order_id == id) {
                    v.operation_type = 3;
                    let tt = new Date().getTime() / 1000;
                    v.left_times = tt;
                    break;
                  }
                }
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
    onRefresh() {
      clearInterval(window.t);
      let that = this;
      that.isLoading = true;
      that.loading = false;
      that.nif = false;
      that.page = 1;
      that.list = [];
      that.getlist(0);
    },
    loadMore() {
      let that = this;
      that.lif = true;
      that.page++;
      that.getlist();
    },
    getlist(i) {
      clearInterval(window.t);
      let that = this;
      if (i) {
        that.lif = true;
      }
      let tt;
      if (that.type == 0) {
        tt = 2;
      } else if (that.type == 1) {
        tt = 4;
      } else if (that.type == 2) {
        tt = 1;
      } else {
        tt = 3;
      }
      that
        .$http({
          url: "/Transaction/trade_list",
          method: "post",
          data: {
            token: that.$store.state.user_info.token,
            cur_id: that.$store.state.active_market.id,
            page: that.page,
            type: tt
          }
        })
        .then(function(res) {
          that.lif = false;
          that.isLoading = false;
          if (res.data.code == 1) {
            console.log(res.data);
            var arr = [];
            if (that.type == 1 || that.type == 3) {
              that.timeArr();
            }
            if (res.data.data.list.length) {
              if (that.type == 0 || that.type == 2) {
                for (let v of res.data.data.list) {
                  v.time1 = v.start_date.toString().split(" ")[0];
                  v.time2 = v.start_date.toString().split(" ")[1];
                  // arr.push(v);
                }
              }
              // console.log(arr)
              // that.list = that.list.concat(res.data.data.list);
              that.list = res.data.data.list;
            } else {
              that.nif = true;
              that.loading = true;
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
    //取消举报
    cancelJubao(orderId) {
      let that = this;
      that.$vux.confirm.show({
        title: "取消举报",
        confirmText: "确认",
        cancelText: "取消",
        content: "确认取消举报？",
        onShow() {},
        onHide() {},
        onCancel() {},
        onConfirm() {
          that.$vux.loading.show({
            text: ""
          });
          that
            .$http({
              url: "/Transaction/report_revoke",
              method: "post",
              data: {
                token: that.$store.state.user_info.token,
                order_id: orderId
              }
            })
            .then(function(res) {
              that.$vux.loading.hide();
              if (res.data.code == 1) {
                that.getlist(1);
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
    //举报
    goJubao(orderId) {
      let that = this;
      that.$vux.confirm.show({
        title: "举报",
        confirmText: "确认",
        cancelText: "取消",
        content: "举报后请尽快到联系客服的交易问题专区提交资料，客服会在举报24小时后作出判定,确认举报?",
        onShow() {},
        onHide() {},
        onCancel() {},
        onConfirm() {
          //订单id
          that
            .$http({
              url: "/Transaction/report_order",
              method: "post",
              data: {
                token: that.$store.state.user_info.token,
                order_id: orderId
              }
            })
            .then(function(res) {
              that.$vux.loading.hide();
              if (res.data.code == 1) {
                // that.$vux.alert.show({
                //   title: that.$t("举报成功"),
                //   content: that.$t(res.data.msg),
                //   buttonText: that.$t("确定"),
                //   onShow() {},
                //   onHide() {
                //     that.dialog0 = false;
                //   }
                // });
                that.getlist(1);
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
  .top {
    background: #1a212a;
  }
  .main1 {
    height: 100%;
    padding-top: 44px;
    box-sizing: border-box;
    .tab {
      z-index: 999;
      position: fixed;
      width: 100%;
      top: 1.3rem;
      left: 0;
      > div {
        background: #161d26;
      }
    }
    .scroll_div {
      width: 100%;
      height: 100%;
    }
  }

  table {
    background: #1a212a;
  }
  thead {
    // background: #161d26;
    tr {
      th {
        text-align: center;
        color: #8f8f9b;
        // padding: 0.3rem 0.2rem 0.3rem;
        font-size: 0.32rem;
        border-bottom: 1px solid #2a333e;
      }
      th:last-child {
        padding: 0.3rem 0.2rem 0.3rem 0;
      }
    }
  }
  tbody {
    tr {
      td {
        text-align: center;
        color: #8f8f9b;
        border-bottom: 1px solid #2a333e;
        // padding: 0.3rem 0.2rem 0.3rem;
        font-size: 0.32rem;
        > span {
          display: block;
        }
        > span:first-child {
          padding-bottom: 0.1rem;
        }
        .btn {
          border-radius: 4px;
          color: white;
          line-height: 0.66rem;
          padding: 0 0.3rem 0;
          background: #f0b90b;
          border-radius: 20px;
          display: block;
          margin: 0 auto 0;
          width: 80px;
        }
        .btn:nth-child(2) {
          margin-top: 10px;
        }
        .btn_ {
          background: #ccc;
        }
      }
      td:last-child {
        padding: 0.3rem 0.2rem 0.3rem 0;
      }
    }
    > tr:last-child {
      td {
        border-bottom: 0;
      }
    }
  }
}
</style>
