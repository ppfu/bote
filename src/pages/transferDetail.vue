<template>
  <div class="wrap">
    <div class="top">
      <img @click="back" class="back_img" src="../assets/nav_back.png" alt>
      <div>{{$t('wallet.detail.title')}}</div>
    </div>
    <div class="top_info">
      <span v-if="info.status!=6" class="iconfont icon-chenggong"></span>
      <span v-if="info.status==6" class="iconfont icon-shibai"></span>
      <span>{{info.statusText}}</span>
      <span>{{info.time}}</span>
    </div>
    <div class="detail_info">
      <ul>
        <li>
          <span>{{$t('wallet.detail.l1')}}：</span>
          <span>{{info.money}}</span>
        </li>
        <li>
          <span>{{$t('wallet.detail.l2')}}：</span>
          <span>{{info.miner_fee}}</span>
        </li>
        <li>
          <span>{{$t('wallet.detail.l3')}}：</span>
          <span>{{info.receipt_address}}</span>
        </li>
        <li>
          <span>{{$t('wallet.detail.l4')}}：</span>
          <span>{{info.payment_address}}</span>
        </li>
        <li>
          <span>{{$t('wallet.detail.l5')}}：</span>
          <span>{{info.remarks}}</span>
        </li>
      </ul>
      <div class="order_info">
        <ul>
          <li>
            <span>{{$t('wallet.detail.l6')}}：</span>
            <span>{{info.order_number}}</span>
          </li>
          <li>
            <span>{{$t('wallet.detail.l7')}}：</span>
            <span>{{info.block}}</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import $ from "jquery";

export default {
  data() {
    return {
      info:{},
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
  activated(){
    let that = this;
    that
        .$http({
          url: "/wallet/transferDetails",
          method: "post",
          data: {
            type: 1,
            token: that.$store.state.user_info.token,
            id:that.$route.params.id
          }
        })
        .then(function(res) {
          if (res.data.code == 1) {

            that.info = res.data.data;
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
    back() {
      this.$router.back();
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
  padding: 1.3rem 0 0.5rem;
  .top {
    background: #1a212a;
  }
  .top_info {
    padding: 0.5rem 0 0.5rem;
    background: #1a212a;
    > span {
      display: block;
      text-align: center;
    }
    > span:nth-child(2) {
      font-size: 0.44rem;
      padding: 0.2rem 0 0.2rem;
    }
    > span:last-child {
      color: #6f6f6f;
    }
    .icon-chenggong {
      font-size: 1.8rem;
      color: #f0b90b;
    }
    .icon-shibai {
      font-size: 1.8rem;
      color: #d40469;
    }
  }
  .detail_info{
    background: #1a212a;
    margin-top: 2px;
    padding: 0rem 6% 0.2rem;
    ul{
      padding: 0.4rem 0 0.4rem;
      li{
        padding: 0.2rem 0 0.2rem;
        span{
          display: inline-block;
          font-size: 0.42rem;
          word-break: break-all;
        }
        span:first-child{
          color: #bfbfc8;
          width: 2rem;
          font-size: 0.36rem;
        }
      }
    }
    >ul{
      border-bottom: 1px solid #323346;
    }
    .order_info{
      overflow: hidden;
    }
  }
}
</style>
