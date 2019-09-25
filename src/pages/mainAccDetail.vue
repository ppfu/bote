<template>
  <div class="wrap">
    <div class="top">
      <img @click="back" class="back_img" src="../assets/nav_back.png" alt>
      <div>{{$t('mainacc.detail.title')}}</div>
    </div>
    <div class="main">
        <ul>
            <li>
                <span>{{$t('mainacc.list.t1')}}：</span>
                <span :class="[info.amount_text>0?'f_c_red':'f_c_green']">{{info.amount_text}}</span>
            </li>
            <li>
                <span>{{$t('mainacc.list.t2')}}：</span>
                <span>{{info.price}}</span>
            </li>
            <li>
                <span>{{$t('mainacc.list.t6')}}(USD)：</span>
                <span>{{info.total}}</span>
            </li>
            <!-- <li>
                <span>CNY{{$t('mainacc.list.t3')}}：</span>
                <span>{{info.cny_total}}</span>
            </li> -->
            <li>
                <span>{{$t('mainacc.detail.time')}}：</span>
                <span>{{info.create_time}}</span>
            </li>
            <!-- <li>
                <span>类型：</span>
                <span>已成交</span>
            </li> -->
        </ul>
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
  },
  activated(){
     let that = this;
    that
      .$http({
        url: "/User/user_finance_detail",
        method: "post",
        data: {
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
  padding: 1.3rem 0 0;
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
          }
      }
  }

}
</style>
