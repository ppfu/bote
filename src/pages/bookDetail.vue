<template>
  <div class="wrap">
    <div class="top">
      <img @click="back" class="back_img" src="../assets/nav_back.png" alt>
      <div>{{title}}</div>
    </div>
    <div class="main">
      <img :src="link" alt="">
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      data: "",
      link: ""
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
  computed: {
    title() {
      if (this.$route.params.type == 2) {
        return "BAUDCOIN（波特币）白皮书";
      } else {
        return "BAUDCOIN white-book";
      }
    }
  },
  activated() {
    let that = this;
    that
      .$http({
        url: "/Phone/bps",
        method: "post",
        data: {
          type: that.$route.params.type
        }
      })
      .then(function(res) {
        if (res.data.code == 1) {
          that.link = res.data.data;
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
      that.$router.back();
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
    overflow: auto;
    height: 100%;
    background: #1a212a;
    box-sizing: border-box;
    img {
      width: 100%;
    }
    .title {
      font-size: 0.4rem;
      padding: 0.4rem 0 0.1rem;
    }
    .d_time {
      text-align: right;
      color: rgba(255, 255, 255, 0.6);
      padding-bottom: 0.3rem;
      font-size: 0.34rem;
    }
    .con {
      color: #b9b9c1;
    }
  }
}
</style>
