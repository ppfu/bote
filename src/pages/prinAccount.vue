<template>
  <div class="wrap">
    <div class="top">
      <img @click="back" class="back_img" src="../assets/nav_back.png" alt>
      <div>{{title}}</div>
    </div>
    <div class="total_assets">
      <!-- <span>{{number}}<span class="new_add"> <span v-if="$route.params.type==1">{{name}}</span><span v-if="$route.params.type==0">{{name}}</span></span></span> -->
      <span>{{total.usd}} USD ≈ {{total.cny}} ￥</span>
      <p class="rece_acc">
        <span>{{$t('wallet.wlt.add')}}：</span>
        <span>{{address}}</span>
      </p>
    </div>
     <div class="as_div">
        <div class="ass_list" v-for="(item,index) in cur_list" :key="index" @click="goCoinDetail(item.id)">
            <span class="tit">{{item.name}}</span>
            <p><span>{{item.usd}}USD</span><span>≈{{item.cny}}0￥</span></p>
        </div>
     </div>
    </div>
  </div>
</template>
<script>
import $ from "jquery";
import { PullRefresh } from "vant";
import { Tab, TabItem, LoadMore } from "vux";

export default {
  data() {
    return {
      total:{},//总额
      address: "",//转账地址
      cur_list: "",//币列表
    };
  },
  components: {
    Tab,
    TabItem,
    LoadMore,
    "van-pull-refresh": PullRefresh
  },
  mounted() {
    let that = this;
    that.getWallet();
    mui.back = function() {
      that.$router.back();
      error;
    };
  },
  computed:{
    title(){
      if(this.$route.params.type==0){
        return this.$t('w1')
      }else{
        return this.$t('w2')
      }
    }
  },
  methods: {
    back() {
      this.$router.back();
    },

    goCoinDetail(id){
      this.$router.push({
        name:"PrinCoinDetail",
        query:{
          id:id
        }
      })
    },

    getWallet() {
      let that = this;
      that
        .$http({
          url: "/user/walletPage",
          method: "post",
          data: {
            token: that.$store.state.user_info.token,
          }
        })
        .then(function(res) {
          if (res.data.code == 1) {
            that.total = res.data.data.total;
            that.address = res.data.data.address;
            that.cur_list = res.data.data.cur_list
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
.new_add{
  font-size: 0.42rem;
}
.wrap {
  font-size: 0.36rem;
  width: 100%;
  height: 100%;
  color: white;
  box-sizing: border-box;
  padding: 1.3rem 0 1.5rem;
  overflow: hidden;
  .top {
    background: #1a212a;
  }
  .total_assets {
    background: #1a212a;
    padding: 0.5rem 0 0.8rem;
    height: 3rem;
    box-sizing: border-box;
    > span {
      display: block;
      text-align: center;
    }
    > span:first-child {
      font-size: 0.46rem;
      margin-bottom: 0.4rem;
    }
    p.rece_acc{
      padding: 0 0.4rem;
      font-size: 0.38rem;
      span:nth-child(2){
        display: block;
        width: 100%;
        margin-top: 0.16rem;
        word-wrap: break-word;

      }
    }
  }

  .div_title {
    padding: 0.5rem 3% 0.2rem;
    font-size: 0.48rem;
  }
  .as_div {
    margin-top: 0.4rem;
    // background: #1a212a;
    box-sizing: border-box;
    // height: calc(100% - 3.2rem);
    overflow: hidden;
    .ass_list{
      padding: 0.2rem 0.4rem;
      background: #1a212a;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 0.06rem;
      span.tit{
        font-size: 0.42rem;
        display: inline-block;
        background: rgba(0, 0, 0, 0.2);
        width: 1.6rem;
        height: 1.4rem;
        line-height: 1.4rem;
        border-radius: 50%;
        text-align: center;
      }
      p{
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        span{
          display: inline-block;
          padding: 0.08rem;
          font-size: 0.4rem;
        }
      }
    }

  }
  .bot_btn {
    position: fixed;
    width: 100%;
    left: 0;
    bottom: 0;
    background: #1f2833;
    box-shadow: 0 0 10px 0 rgba(31, 40, 51, 0.1);
    > div {
      position: relative;
      display: flex;
      > div {
        flex: 1;
        text-align: center;
        font-size: 0.48rem;
        img {
          width: 0.8rem;
          display: inline-block;
          vertical-align: middle;
        }
        span {
          display: inline-block;
          line-height: 1.3rem;
        }
      }
      .line {
        position: absolute;
        left: 50%;
        top: 0.25rem;
        width: 1px;
        height: 0.7rem;
        background: #323b46;
      }
    }
  }
}
</style>
