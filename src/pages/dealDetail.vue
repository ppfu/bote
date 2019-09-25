<template>
  <div class="wrap">
    <div class="top">
      <img @click="back" class="back_img" src="../assets/nav_back.png" alt>
      <div>{{$t('trade.child3.detail')}}</div>
    </div>
    <div class="main">
        <ul>
            <li>
                <span>{{$t('trade.child3.list.t1')}}：</span>
                <span>{{info.order}}</span>
            </li>
            <li v-if="info.trade_type == 1">
                <span>买家手机：</span>
                <span>{{info.buyer_phone}}</span>
            </li>
            <li v-if="info.trade_type == 2">
                <span>卖家手机：</span>
                <span>{{info.seller_phone}}</span>
            </li>
            
            <li>
                <span>{{$t('trade.child3.list.t2')}}：</span>
                <span :class="[info.trade_type_text_color=='red'?'f_c_red':'f_c_green']">{{info.trade_type_text}}</span>
            </li>
            <li>
                <span>{{$t('trade.child2.list.t2')}}：</span>
                <span>{{info.price}}</span>
            </li>
            <li>
                <span>{{$t('trade.child2.list.t3')}}：</span>
                <span>{{info.number}}</span>
            </li>
            <li>
                <span>{{$t('trade.child2.list.t6')}}：</span>
                <span>{{info.total}}</span>
            </li>
            <li>
                <span>创建时间：</span>
                <span>{{info.addtime}}</span>
            </li>
            <li>
                <span>支付时间：</span>
                <span>{{info.pay_time}}</span>
            </li>
            <li>
                <span>确认时间：</span>
                <span>{{info.done_time}}</span>
            </li>
            <li>
                <span>{{$t('trade.child3.list.t3')}}：</span>
                <span>{{info.order_status_text}}</span>
            </li>
            <li v-if="info.order_status_text == '已支付'">
                <span>支付凭证：</span>
                <img :src="info.voucher" @click="imgClick" alt="">
            </li>
            
        </ul>
    </div>
    <div class="img-module" @click="imgHide">
      <img :src="info.voucher" alt="">
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
  components: {
    
  },
  mounted() {
    let that = this;
    mui.back = function() {
      that.$router.back();
      error;
    };
    that
      .$http({
        url: "/Transaction/view_details",
        method: "post",
        data: {
          token: that.$store.state.user_info.token,
          trade_id: that.$route.params.id
        }
      })
      .then(function(res) {
        if (res.data.code == 1) {
          that.info = res.data.data;
          console.log(that.info);
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
    // 图片点击放大
    imgClick(){
      $(".img-module").fadeIn(100);
    },
    // 图片点击隐藏
    imgHide(){
      $(".img-module").fadeOut(100);
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
  .main{
      ul{
          background: #1a212a;
          padding: 0.2rem 10% 0.2rem;
          li{
              padding: 0.2rem 0 0.2rem;
              span{
                  display: inline-block;
              }
              span:first-child{
                  width: 2rem;
              }
              span:last-child{
                  color: #8f8f9b;
              }
              img{
                display: block;
                width: 80%;
                height: auto;
                margin: 15px auto 0;
              }
          }
      }
  }
  .img-module{
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(0,0,0,0.3);
    display: none;
    img{
      position: absolute;
      top: 20%;
      width: 80%;
      height: auto;
      left: 0;
      right: 0;
      margin: 0 auto;
    }
  }

}
</style>
