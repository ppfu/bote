<template>
  <div class="wrap">
    <div class="top">
      <div>{{$t('market.title')}}</div>
    </div>
    <div class="main">
      <x-table :content-bordered="false" :cell-bordered="false">
        <thead>
          <tr>
            <th>{{$t('market.marketlist.t1')}}</th>
            <th>{{$t('market.marketlist.t2')}} (USD)</th>
            <th>24h{{$t('market.marketlist.t3')}}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item,index) in list" :key="index" @click="toBs(item)">
            <td>
              <span>BAUD/{{item.name}}</span>
              <span>{{$t('market.marketlist.d1')}}：{{item.twenty_four_volume}}</span>
            </td>
            <td>
              <span>{{item.price_new}}</span>
              <span>￥{{item.cny}}</span>
            </td>
            <td>
              <button
                class="btn"
                :class="[item.fall_type==2?'up_btn':'down_btn']"
              >{{item.day_rise_fall}}</button>
            </td>
          </tr>
        </tbody>
      </x-table>
    </div>
  </div>
</template>
<script>
import $ from "jquery";
import { XTable } from "vux";

export default {
  data() {
    return {
      list: []
    };
  },
  components: {
    XTable
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
  },
  activated() {
    let that = this;
    that.getList();
    window.t = setInterval(that.getList,3000);
  },
  methods: {
    getList() {
      let that = this;
      that
        .$http({
          url: "/market/index",
          method: "post",
          data: {
            token: that.$store.state.user_info.token
          }
        })
        .then(function(res) {
          if (res.data.code == 1) {
            that.list = res.data.data;

            that.$store.state.active_market = res.data.data[0];
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
    toBs(item) {
      this.$store.state.active_market = item;
      this.$router.push({
        name: "bsmarket"
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
}
</style>
