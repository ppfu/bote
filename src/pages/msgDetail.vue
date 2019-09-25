<template>
    <div class="wrap">
        <div class="top">
            <img @click="back" class="back_img" src="../assets/nav_back.png" alt="">
            <div>{{$t('msg.title.t3')}}</div>
        </div>
        <div class="main">
            <div class="title">{{data.title}}</div>
            <div class="d_time">{{data.time}}</div>
            <div class="con">{{data.content}}</div>
        </div>
    </div>
</template>
<script>
export default {
  data() {
    return {
      data:"",
    };
  },
  components: {},
  mounted() {
    let that = this;
    mui.back = function() {
      that.$router.push({
        name:"msg",
        params:{
          type:that.$route.params.source
        }
      })
      error;
    };
  },
  activated(){
    let that = this;
    that.data = {
      title:"",
      content:"",
    }
    that
      .$http({
        url: "/user/message_detail",
        method: "post",
        data: {
          token:that.$store.state.user_info.token,
          id:that.$route.params.i
        }
      })
      .then(function(res) {
        if (res.data.code == 1) {
          that.data = res.data.data;
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
      let that = this;
      that.$router.push({
        name:"msg",
        params:{
          type:that.$route.params.source
        }
      })
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
  padding: 1.3rem 0 0;
  .top {
    background: #1a212a;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
  }
  .main {
    padding: 0 4% 0.5rem;
    overflow: auto;
    height: 100%;
    background: #1a212a;
    box-sizing: border-box;
    .title {
      font-size: 0.4rem;
      padding: 0.4rem 0 0.1rem;
      text-align: left;
    }
    .d_time{
      text-align: right;
      color: rgba(255, 255, 255, .6);
      padding-bottom: 0.3rem;
      font-size: 0.34rem;
    }
    .con{
      color: #B9B9C1;
    }
  }
}
</style>
