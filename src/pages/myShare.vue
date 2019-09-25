<template>
  <div class="wrap1">
    <div>
      <div class="head_info">
        <div>
          <div>
            <img v-if="info.head_icon!=null" :src="info.head_icon" alt>
            <img  v-if="info.head_icon==null" src="../assets/logo.png" alt>
          </div>
        </div>
        <span>{{info.nickname}}</span>
        <span>{{$t('share.child1.t1')}}：{{info.mining_count}}</span>
        <div class="code_img">
          <qrcode :value="ads"></qrcode>
        </div>
        <span>{{$t('share.child1.t2')}}</span>
      </div>
      <div class="div">
        {{ads}}
        <span class="left"></span>
        <span class="right"></span>
      </div>
      <div>
        <button
          class="btn"
          v-clipboard:copy="ads"
          v-clipboard:success="onCopy"
          v-clipboard:error="onError"
        >{{$t('share.child1.t3')}}</button>
      </div>
    </div>
  </div>
</template>
<script>
import $ from "jquery";
import { Qrcode } from "vux";
export default {
  data() {
    return {
      info:{},
      ads: ""
    };
  },
  components: {
    Qrcode
  },
  mounted() {
    let that = this;
    mui.back = function() {
      that.$router.push({
        name: "mine"
      });
      error;
    };
    that
      .$http({
        url: "/user/invitation",
        method: "post",
        data: {
          token: that.$store.state.user_info.token
        }
      })
      .then(function(res) {
        if (res.data.code == 1) {
          that.info = res.data.data;
          that.ads = res.data.data.invitation_web+"/#/register/code="+res.data.data.inv_code;
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
    onCopy(e) {
      this.$vux.toast.show({
        text: this.$t('tip.copy_suc'),
        type: "success",
        position: "middle",
        time: 1200
      });
    },
    // 复制失败
    onError(e) {
      this.$vux.toast.show({
        text: this.$t('tip.copy_fail'),
        type: "cancel",
        position: "middle",
        time: 1200
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
  background: #242d39;
  overflow: hidden;
  > div {
    margin: 0.8rem 12% 0.5rem;
    border-radius: 8px;
    box-sizing: border-box;
    padding: 0.6rem 0 1rem;
    background: #1a222b;
    .head_info {
      padding-bottom: 0.4rem;
      > div {
        > div {
          border-radius: 50%;
          overflow: hidden;
          border: 2px solid white;
          width: 1.8rem;
          height: 1.8rem;
          margin: 0 auto 0.2rem;
          img {
            width: 100%;
            height: 100%;
          }
        }
      }
      >.code_img{
        text-align: center;
        padding: 0.4rem 0 0.1rem;
        >div{
          display: inline-block;
          border-radius: 0;
          border: 10px solid white;
          width: auto;
          height: auto;
          margin: 0;
          text-align: center;
        }
      }
      > img,
      > span {
        display: block;
        text-align: center;
        font-size: 0.4rem;
        margin-bottom: 0.1rem;
      }
      > img {
        margin: 0.4rem auto;
        width: 3rem;
        height: 3rem;
      }
      > span:last-child {
        color: #878787;
        font-size: 0.36rem;
      }
    }
  }
  .div {
    margin: 0 0.5rem 0rem;
    padding: 0.8rem 0.2rem 0.8rem;
    box-sizing: border-box;
    text-align: center;
    max-width: 100%;
    word-break: break-all;
    position: relative;
    border-top: 1px dashed rgba(255, 255, 255, 0.1);
    .left,
    .right {
      position: absolute;
      width: 0.8rem;
      height: 0.8rem;
      border-radius: 50%;
      background: #242d39;
    }
    .left {
      left: -1rem;
      top: -0.4rem;
    }
    .right {
      right: -1rem;
      top: -0.4rem;
    }
  }
  .btn {
    display: block;
    width: 80%;
    margin: 0 auto;
    line-height: 0.8rem;
    text-align: center;
    color: #fcb90b;
    border-radius: 4px;
    background: transparent;
    border: 1px solid #fcb90b;
  }
}
</style>
