<template>
  <div class="wrap1">
    <div class="main1">
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
            <x-table :content-bordered="false" :cell-bordered="false">
              <thead>
                <tr>
                  <th>{{$t('trade.child3.list.t1')}}</th>
                  <th>{{$t('trade.child3.list.t2')}}</th>
                  <th>{{$t('trade.child3.list.t3')}}</th>
                  <th>{{$t('trade.child3.list.t4')}}</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item,index) in list" :key="index">
                  <td>{{item.order}}</td>
                  <td :class="[item.trade_type_text_color=='green'?'f_c_green':'f_c_red']">{{item.trade_type_text}}</td>
                  <td>{{item.order_status_text}}</td>
                  <td v-if="item.order_status == 3">--</td>
                  <td @click="toDetail(item)" v-if="item.order_status != 3">{{$t('trade.child3.btn.b1')}}</td>
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
import { XTable, LoadMore } from "vux";

export default {
  data() {
    return {
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
    that.getlist(1);
  },
  methods: {
    navTap(i) {
      this.type = i;
      let that = this;
      that.loading = false;
      that.nif = false;
      that.page = 1;
      that.list = [];
      that.getlist(1);
    },
    toDetail(item) {
      let id="";
      if(item.trade_type_text_color=="green"){
        id = item.id;
      }else{
        id = item.id;
      }
      this.$router.push({
        name: "dealdetail",
        params:{
          id:id
        }
      });
    },
    onRefresh() {
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
      let that = this;
      if (i) {
        that.lif = true;
      }
      that
        .$http({
          url: "/Transaction/order_list",
          method: "post",
          data: {
            token: that.$store.state.user_info.token,
            cur_id: that.$store.state.active_market.id,
            page: that.page
          }
        })
        .then(function(res) {
          that.lif = false;
          that.isLoading = false;
          if (res.data.code == 1) {
            if (res.data.data.length) {
              that.list = that.list.concat(res.data.data);
              console.log(that.list);
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
    box-sizing: border-box;
    .tab {
      z-index: 999;
      position: fixed;
      width: 100%;
      top: 1.3rem;
      left: 0;
      background: #161d26;
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
    background: #161d26;
    tr {
      th {
        text-align: center;
        color: #8f8f9b;
        // font-size: 0.32rem;
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
        // font-size: 0.32rem;
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
