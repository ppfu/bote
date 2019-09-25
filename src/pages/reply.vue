<template>
  <div class="wrap">
    <div class="top">
      <img @click="back" class="back_img" src="../assets/nav_back.png" alt>
      <div>{{$t('service.title.t2')}}</div>
    </div>
    <div class="main">
        <div>
            <div class="ask f_c">{{$t('service.ask')}}：{{info.content}}</div>
            <div class="answer">{{$t('service.asw')}}：{{info.reply}}</div>
            <div class="time f_r">{{info.update_time}}</div>
        </div>
    </div>
  </div>
</template>
<script>
import $ from "jquery";
export default {
  data() {
    return {
      info:{}
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
        url: "/user/one_feedback",
        method: "post",
        data: {
          token:that.$store.state.user_info.token,
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
  padding: 1.3rem 0 1.5rem;
  overflow: auto;
  .top {
    background: #1a212a;
  }
  .main{
      background: #1a212a;
      color: #6f6f6f;
      padding: 0.4rem 4% 0.4rem;
      box-sizing: border-box;
      min-height: 8rem;
      >div{
          box-sizing: border-box;
          .ask,.answer{
              font-size: 0.4rem;
              padding-bottom: 0.2rem;
          }
      }
  }

}
</style>
