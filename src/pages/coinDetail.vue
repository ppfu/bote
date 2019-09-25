<template>
  <div class="wrap">
    <div class="top">
      <img @click="back" class="back_img" src="../assets/nav_back.png" alt>
      <div>收益账户钱包</div>
    </div>
    <div class="total_assets">
      <span>{{number}}<span class="new_add"><span>{{name}}</span></span></span>
      <span>{{usdt}} USD ≈ {{cny}} ￥</span>
    </div>
    <div class="as_div">
      <tab
        class="tab"
        :line-width="2"
        bar-active-color="#f0b90b"
        active-color="#f0b90b"
        :scroll-threshold="5"
        v-model="type"
      >
        <tab-item @click.native="navTap(0)">{{$t('wallet.sorts.s1')}}</tab-item>
       <!-- <tab-item v-if="$route.query.type==1" @click.native="navTap(1)">{{$t('wallet.sorts.s2')}}</tab-item> -->
        <tab-item @click.native="navTap(2)">{{$t('wallet.sorts.s3')}}</tab-item>
        <tab-item @click.native="navTap(3)">{{$t('wallet.sorts.s4')}}</tab-item>
      </tab>
      <div class="scroll_div">
        <van-pull-refresh
          v-model="isLoading"
          :pulling-text="$t('more.a')"
          :loosing-text="$t('more.b')"
          :loading-text="$t('more.c')"
          @refresh="onRefresh"
        >
          <div
            class="div"
            v-infinite-scroll="loadMore"
            infinite-scroll-disabled="loading"
            infinite-scroll-distance="10"
            infinite-scroll-immediate-check="false"
          >
            <div v-for="(item,index) in list" :key="index" @click="toDetail(item.id)">
              <div class="f_l">
                <img :src="icon" alt>
              </div>
              <div class="f_l">
                <span>{{item.address}}</span>
                <span>{{item.time}}</span>
              </div>
              <div class="f_r">
                <span :class="[item.c=='+'?'f_c_red':'f_c_green']">{{item.price}}</span>
              </div>
            </div>
          </div>
          <load-more v-if="lif" :show-loading="load" :tip="$t('more.c')"></load-more>
          <load-more v-if="nif" :show-loading="none" :tip="$t('more.d')"></load-more>
        </van-pull-refresh>
      </div>
    </div>

    <div class="bot_btn">
      <div>
        <div  @click="toTransfer">
          <img src="../assets/transfer.png" alt>
          <span>{{$t('wallet.btn.b1')}}</span>
        </div>
       <!-- <div v-if="$route.query.type==1" @click="toProceeds">
          <img src="../assets/receive.png" alt>
          <span>{{$t('wallet.btn.b2')}}</span>
        </div> -->
        <!-- <div class="line"></div> -->
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
      list: [],
      page: 1,
      load: true,
      none: false,
      lif: true,
      nif: false,
      loading: false,
      isLoading: false,
      type: 0,
      number: "",
      usdt: "",
      cny: "",
      icon: "",
      ifPhone:"",
      name:''
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
    that.getlist();
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
  activated() {
    let that = this;
    that
      .$http({
        url: "/user/come_in_sec",
        method: "post",
        data: {
          token: that.$store.state.user_info.token,
        }
      })
      .then(function(res) {
        if (res.data.code == 1) {
          that.ifPhone = res.data.msg.phone;
        } else {
          that.$vux.toast.show({
            text: res.data.msg,
            type: "text",
            position: "middle",
            time: 1200
          });
        }
      });
    this.$nextTick(() => {
      this.type = 0;
      this.page = 1;
      this.lif = true;
      this.nif = false;
      this.loading = false;
      this.getlist(1);
    });
  },
  methods: {
    back() {
      this.$router.back(-1);
    },
    navTap(i) {
      this.list = [];
      this.type = i;
      this.page = 1;
      this.lif = true;
      this.nif = false;
      this.loading = false;
      this.getlist(1);
    },
    toDetail(id){
      this.$router.push({
        name:"transferdetail",
        params:{
          id:id
        }
      })
    },
    toTransfer() {
      let that = this;
      if(this.ifPhone==null){
        this.$vux.toast.show({
            text: that.$t('tip.phone_none'),
            type: "cancel",
            position: "middle",
            time: 1200
          });
          return false;
      }
      this.$router.push({
        name: "transfer"
      });
    },
    toProceeds() {
      let that = this;
      if(this.ifPhone==null){
        this.$vux.toast.show({
            text: that.$t('tip.phone_none'),
            type: "cancel",
            position: "middle",
            time: 1200
          });
          return false;
      }
      this.$router.push({
        name: "proceeds"
      });
    },
    onRefresh() {
      let that = this;
      that.isLoading = true;
      that.loading = false;
      that.nif = false;
      that.page = 1;
      that.list = [];
      that.getlist(0);
    },
    loadMore() {
      let that = this;
      that.lif = true;
      that.page++;
      that.getlist(1);
    },
    getlist(i) {
      let that = this;
      let t = "";
      if (that.type == 0) {
        t = "";
      } else if (that.type == 1||that.type==2) {
        t = "1";
      }else{
        t="2"
      }
      if(i){
          that.lif = true;
      }
      that
        .$http({
          url: "/wallet/curDetails",
          method: "post",
          data: {
            token: that.$store.state.user_info.token,
            p: that.page,
            pase_size:20,
            type: t,
            id: 1,
            wallet_type: that.$route.params.type+1,
          }
        })
        .then(function(res) {
          that.lif = false;
          that.isLoading = false;
          if (res.data.code == 1) {
            that.number = res.data.data.number;
            that.usdt = res.data.data.usdt;
            that.cny = res.data.data.cny;
            that.icon = res.data.data.icon;
            that.name = res.data.data.name;
            if (res.data.data.list != "") {
              for (let v of res.data.data.list) {
                v.c = v.price.toString().substr(0, 1);
              }
              that.list = that.list.concat(res.data.data.list);
            } else {
              that.nif = true;
              that.loading = true;
            }
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
    text-align: center;
    padding: 0.5rem 0 0.8rem;
    height: 3rem;
    box-sizing: border-box;
    > span {
      display: block;
    }
    > span:first-child {
      font-size: 0.66rem;
      margin-bottom: 0.4rem;
    }

    > span:last-child {
      font-size: 0.42rem;
    }
  }

  .div_title {
    padding: 0.5rem 3% 0.2rem;
    font-size: 0.48rem;
  }
  .as_div {
    margin-top: 0.4rem;
    background: #1a212a;
    box-sizing: border-box;
    height: calc(100% - 3.2rem);
    overflow: hidden;
    .scroll_div {
      height: calc(100% - 44px);
      overflow: auto;
      box-sizing: border-box;
    }
    .div {
      padding: 0 3% 0rem;
      height: 100%;
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
            font-size: 0.34rem;
            margin-top: 0.2rem;
          }
        }
        > div:last-child {
          span {
            padding-top: 0.1rem;
            font-size: 0.5rem;
          }
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
