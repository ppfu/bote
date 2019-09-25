<template>
  <div class="wrap">
    <div class="top">
      <div>{{$t('wallet.title')}}</div>
    </div>
    <div class="total_assets">
      <span>{{$t('wallet.wlt.total')}}（USD）</span>
      <span>{{total.usd}}</span>
      <span>≈{{total.cny}}￥</span>
    </div>
    <!-- <div class="div_title">{{$t('wallet.wlt.as')}}</div> -->
    <div class="as_div">
      <div class="wat">
        <div @click="toPrinCont({},1)">
          <img src="../assets/wat1.png" alt>
          <div>{{$t('w2')}}</div>
        </div>
        <div @click="toDetail">
          <img src="../assets/wat2.png" alt>
          <div>{{$t('w1')}}</div>
        </div>
      </div>
      <!-- <div class="div">
        <div v-for="(item,index) in wallet" :key="index" @click="toDetail(item)">
          <div class="f_l">
            <img :src="item.icon" alt>
          </div>
          <div class="f_l">
            <span>{{item.name}}</span>
            <span>≈{{item.usdt}}USD</span>
          </div>
          <div class="f_r ta_r">
            <span>{{item.amount}}</span>
            <span>{{item.usdt}}USD</span>
          </div>
        </div>
      </div>-->
    </div>
  </div>
</template>
<script>
import $ from "jquery";
export default {
  data() {
    return {
     total:{}
    };
  },
  components: {},
  mounted() {
    let that = this;
    that.getWalletInfo();
    mui.back = function() {
      mui.plusReady(function() {
        var main = plus.android.runtimeMainActivity();
        main.moveTaskToBack(false);
      });
      error;
    };
  },
  activated() {

  },
  methods: {
    getWalletInfo(){
       let that = this;
      that
        .$http({
          url: "/user/walletPage",
          method: "post",
          data: {
            token: that.$store.state.user_info.token
          }
        })
        .then(function(res) {
          if (res.data.code == 1) {
            that.total = res.data.data.total;
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
    toDetail() {
      // this.$store.state.active_wallet = o;
      this.$router.push({
        name: "coindetail",
        // query: {
        //   type: i
        // }
      });
    },
    toPrinCont(o, i) {
      this.$store.state.active_wallet = o;
      this.$router.push({
        name: "prinAccount",
        query: {
          type: i
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
  }
  .total_assets {
    background: #1a212a;
    text-align: center;
    padding: 0.5rem 0 0.5rem;
    > span {
      display: block;
    }
    > span:first-child {
      font-size: 0.42rem;
    }
    > span:nth-child(2) {
      font-size: 0.8rem;
      padding: 0.2rem 0 0.2rem;
    }
    > span:last-child {
      color: #8f8f9b;
    }
  }

  .div_title {
    padding: 0.5rem 3% 0.2rem;
    font-size: 0.48rem;
  }
  .as_div {
    margin-top: 0.2rem;
    background: #1a212a;
    padding: 0.4rem 3% 0.4rem;
    > .div {
      > div {
        overflow: hidden;
        padding: 0.4rem 0 0.4rem;
        border-bottom: 1px solid #323b46;
        > div {
          img {
            width: 1rem;
            height: 1rem;
            margin-right: 0.2rem;
          }
          > span {
            display: block;
            font-size: 0.42rem;
          }
          > span:last-child {
            color: #8f8f9b;
          }
        }
      }
      > div:last-child {
        border: 0;
      }
    }
    .wat {
      display: flex;
      > div {
        flex: 1;
        text-align: center;
        font-size: 0.38rem;
        color: rgba(255, 255, 255, .8);
        img {
          width: .8rem;
        }
      }
    }
  }
}
</style>
