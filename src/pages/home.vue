<template>
  <div class="wrap">
    <div class="top">
      <div>{{$t('index.title')}}</div>
    </div>
    <div class="award_info" v-if="awdinfo">
      <div>
        <img src="../assets/award.png" alt>
        <span class="f_c">{{awdinfo}}</span>
      </div>
    </div>
    <!-- 轮播 -->
    <div class="banners">
      <swiper loop auto :interval="interval" dots-position="center" style="width:100%;">
        <swiper-item v-for="(item,index) in imgs" :key="index">
          <img :src="item.url" alt>
        </swiper-item>
      </swiper>
    </div>
    <div class="top_notice">
      <!-- 公告 -->
      <div class="notice">
        <div>
          <div class="d_img f_l">
            <span class="iconfont icon-gonggao"></span>
          </div>
          <swiper
            class="f_r"
            height="40px"
            loop
            auto
            :interval="interval"
            direction="vertical"
            :show-dots="false"
            style="width:100%;"
          >
            <swiper-item
              @click.native="toDetail(item)"
              v-for="(item,index) in notices"
              :key="index"
            >
              <p>{{item.title}}</p>
            </swiper-item>
          </swiper>
        </div>
      </div>
    </div>
    <div class="div_title">{{$t('index.society.title')}}</div>
    <div class="list_con">
      <div @click="tip">
        <img src="../assets/01.png" alt>
        <span>{{$t('index.society.s1')}}</span>
      </div>
      <div @click="tip">
        <img src="../assets/02.png" alt>
        <span>{{$t('index.society.s2')}}</span>
      </div>
      <div @click="tip">
        <img src="../assets/03.png" alt>
        <span>{{$t('index.society.s3')}}</span>
      </div>
      <div @click="tip">
        <img src="../assets/04.png" alt>
        <span>{{$t('index.society.s4')}}</span>
      </div>
      <div @click="tip">
        <img src="../assets/05.png" alt>
        <span>{{$t('index.society.s5')}}</span>
      </div>
      <div @click="tip">
        <img src="../assets/06.png" alt>
        <span>{{$t('index.society.s6')}}</span>
      </div>
      <div @click="tip">
        <img src="../assets/07.png" alt>
        <span>{{$t('index.society.s7')}}</span>
      </div>
      <div @click="tip">
        <img src="../assets/08.png" alt>
        <span>{{$t('index.society.s8')}}</span>
      </div>
    </div>
  </div>
</template>
<script>
import $ from "jquery";
import { Swiper, SwiperItem, XDialog } from "vux";
export default {
  data() {
    return {
      nid: this.$store.state.nid,
      nid1: "0",
      dialog: false,
      interval: 2500,
      imgs: [],
      notices: [],
      tabIndex: 0,
      rules: "",
      awdinfo:"",
    };
  },
  components: {
    Swiper,
    SwiperItem,
    XDialog
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
  activated(){
    let that = this;
    // 首页信息
    that
      .$http({
        url: "/Phone/homePage",
        method: "post",
        data: {}
      })
      .then(function(res) {
        if (res.data.code == 1) {
          that.awdinfo = res.data.data.wining;
          that.notices = res.data.data.news;
          that.imgs = res.data.data.banner;
        } else {
          that.$vux.toast.show({
            text: res.data.msg,
            type: "text",
            position: "middle",
            time: 1200
          });
        }
      });
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
  methods: {
    toDetail(o) {
      this.$router.push({
        name: "notices"
      });
    },
    tip() {
      let that = this;
      that.$vux.alert.show({
        title: "",
        content: that.$t('none'),
        buttonText:  that.$t('cfm'),
        onShow() {},
        onHide() {}
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
  padding: 1.1rem 0 1.5rem;
  overflow: auto;
  .top {
    background: #1a212a;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
  }
  .award_info {
    // position: fixed;
    z-index: 9999;
    width: 100%;
    top: 1.1rem;
    left: 0;
    > div {
      background: #1a212a;
      padding: 0 3% 0;
      box-sizing: border-box;

      img {
        width: 0.5rem;
        display: inline-block;
        vertical-align: top;
        transform: translateY(0.1rem);
      }
      span {
        display: inline-block;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        max-width: calc(100% - 0.8rem);
        padding: 0.15rem 0 0.1rem;
        font-size: 12px;
      }
    }
  }
  .banners{
      img{
          width: 100%;
          height: 100%;
      }
  }
  .notice {
    width: 100%;
    background: #1a212a;
    z-index: 1;
    // border-bottom: 1px solid rgba(255, 255, 255, 0.2);
    > div {
      overflow: hidden;
      box-sizing: border-box;
      padding: 0.1rem 3% 0.1rem;
      .d_img {
        .iconfont {
          font-size: 0.6rem;
          display: inline-block;
          transform: translateY(1px);
        }
      }
      .vux-slider {
        width: calc(100% - 0.62rem) !important;
        box-sizing: border-box;
        padding-left: 0.2rem;
      }
      .iconfont {
        font-size: 0.66rem;
        display: block;
        transform: translateY(0.02rem);
      }
    }
  }
  .div_title {
    padding: 0.5rem 3% 0.2rem;
    font-size: 0.48rem;
  }
  .list_con {
    overflow: hidden;
    background: #1a212a;
    > div {
      float: left;
      width: 25%;
      text-align: center;
      padding: 0.4rem 0 0.4rem;
      img {
        display: block;
        width: 28%;
        margin: 0 auto;
      }
      span {
        display: block;
        color: #b9b9c1;
        padding-top: 0.2rem;
      }
    }
  }
}
</style>
