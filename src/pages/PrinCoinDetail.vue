<template>
  <div class="wrap">
    <div class="top">
      <img @click="back" class="back_img" src="../assets/nav_back.png" alt>
      <div>{{cur_coin.cur_amount}}</div>
    </div>
    <div class="total_assets">
      <p class="cur_am"><span>{{cur_coin.amount}} </span><a>{{cur_coin.cur_amount}}</a></p>
      <span>{{cur_coin.usd}} USD ≈ {{cur_coin.cny}} ￥</span>
      <p class="rece_acc">
        <span>{{$t('wallet.wlt.add')}}：</span>
        <span>{{cur_coin.address}}</span>
      </p>
    </div>
    <div class="as_div">
      <tab class="tab" :line-width="2" bar-active-color="#f0b90b" active-color="#f0b90b" :scroll-threshold="5" v-model="navtype">
        <tab-item @click.native="navTap(0)">{{$t('wallet.sorts.s1')}}</tab-item>
        <tab-item @click.native="navTap(1)">{{$t('wallet.sorts.s2')}}</tab-item>
        <tab-item @click.native="navTap(2)">{{$t('wallet.sorts.s3')}}</tab-item>
      </tab>
      <div class="scroll_div">
        <van-pull-refresh v-model="updateLoading" :pulling-text="$t('more.a')" :loosing-text="$t('more.b')"
          :loading-text="$t('more.c')" @refresh="onRefresh">
          <van-list v-model="moreloading" :finished="finished" :immediate-check="true" :finished-text="$t('more.e')"
            @load="onLoad">
            <div class="coin_list" v-for="(item,index) in list" :key="index" @click="toDetail(item.id)">
              <div class="coin_left"><img src="../assets/re02.png"> <p><span>{{item.amount}}</span><span>{{item.create_time}}</span></p></div>
              <p> <span :class="[item.status=='1'?'f_c_red':'f_c_green']">{{item.status_msg}}</span></p>
            </div>
          </van-list>
        </van-pull-refresh>
      </div>
    </div>

    <div class="bot_btn">
      <div>
        <div @click="toProceeds">
          <img src="../assets/receive.png" alt>
          <span>{{$t('wallet.btn.b2')}}</span>
        </div>
        <!-- <div class="line"></div> -->
      </div>
    </div>
  </div>
</template>
<script>
  import $ from "jquery";
  import {
    PullRefresh,
    List
  } from "vant";
  import {
    Tab,
    TabItem,
    LoadMore
  } from "vux";

  export default {
    data() {
      return {
        list: [],
        listTotal: 0,
        pageindex: 1,
        updateLoading: false, //下拉刷新
        moreloading: false, // 加载更多
        finished: false, // 全部加载
        navtype: 0,
        number: "",
        usdt: "",
        cny: "",
        icon: "",
        ifPhone: "",
        name: '',
        cur_id: this.$route.query.id, //币id
        cur_coin: {}, //详情
      };
    },
    components: {
      Tab,
      TabItem,
      LoadMore,
      "van-pull-refresh": PullRefresh,
      [List.name]: List
    },
    mounted() {
      let that = this;
      that.getCurCoin();
      that.getlist();
      mui.back = function() {
        that.$router.back();
        error;
      };
    },
    computed: {

    },

    methods: {
      back() {
        this.$router.back(-1);
      },
      toDetail(id) {
        this.$router.push({
          name: "transferdetail",
          params: {
            id: id
          }
        })
      },
      getCurCoin() {
        let that = this;
        that
          .$http({
            url: "/user/walletPageByCur",
            method: "post",
            data: {
              token: that.$store.state.user_info.token,
              id: that.cur_id,
            }
          })
          .then(function(res) {
            if (res.data.code == 1) {
              that.cur_coin = res.data.data;
            } else {
              that.$vux.toast.show({
                text: res.data.msg,
                type: "text",
                position: "middle",
                time: 1200
              });
            }
          })
      },
      toProceeds() {
        let that = this;
        if (this.ifPhone == null) {
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
      navTap(i) {
        let that = this;
        that.navtype = i;
        that.updateLoading = false;
        that.moreloading = false;
        that.finished = false;
        that.pageindex = 1;
        that.list = [];
        that.getlist(0);
      },
      onRefresh() {
        let that = this;
        that.updateLoading = true;
        that.moreloading = false;
        that.finished = false;
        that.pageindex = 1;
        that.list = [];
        that.listTotal = 0;
        that.getlist(0);
      },
      //上拉加载更多
      onLoad() {
        let that = this;
        that.pageindex += 1;
        that.moreloading = true;
        that.getlist(1);
      },
      getlist(a) {
        let that = this;
        var act_type = (that.navtype).toString();
        var actType = act_type;
        console.log(actType)
        that
          .$http({
            url: "/user/getWalletCoinLog",
            method: "post",
            data: {
              token: that.$store.state.user_info.token,
              id: that.cur_id,
              page: that.pageindex,
              type: actType,
            }
          })
          .then(function(res) {
            console.log(res.data.code)
            if (res.data.code == 1) {
              //成功回调
              if (a == 0) {
                if (res.data.data.data.length > 0) {
                  that.list = res.data.data.data;
                  that.listTotal = res.data.data.total;
                  if (that.list.length >= that.listTotal) {
                    //全部数据已加载
                    that.finished = true;
                  }
                } else {
                  that.finished = true;
                }
                that.updateLoading = false;
              } else {
                that.moreloading = false;
                if (res.data.data.data.length > 0) {
                  that.list = that.list.concat(res.data.data.data);
                  that.listTotal = res.data.data.total;
                } else {
                  that.finished = true;
                }
                if (that.list.length >= that.listTotal) {
                  //全部数据已加载
                  that.finished = true;
                }
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
  .new_add {
    font-size: 0.42rem;
  }

  .wrap {
    font-size: 0.36rem;
    width: 100%;
    height: 100%;
    color: white;
    box-sizing: border-box;
    padding: 1.3rem 0 1.5rem;
    overflow-y: scroll;

    .top {
      background: #1a212a;
    }

    .total_assets {
      background: #1a212a;
      padding: 0.5rem 0 0.8rem;
      height: 3.8rem;
      box-sizing: border-box;

      p.cur_am {
        text-align: center;

        span {
          font-size: 0.66rem;
        }

        a {
          font-size: 0.42rem;
        }

      }

      >span:nth-child(2) {
        text-align: center;
        display: block;
        font-size: 0.42rem;
        margin-bottom: 0.4rem;
      }

      p.rece_acc {
        padding: 0 0.4rem;
        font-size: 0.38rem;

        span:nth-child(2) {
          display: block;
          width: 100%;
          margin-top: 0.16rem;
          word-wrap: break-word;

        }
      }
    }

    // .div_title {
    //   padding: 0.5rem 3% 0.2rem;
    //   font-size: 0.48rem;
    // }

    .as_div {
      // width: 100%;
      margin-top: 0.4rem;
      background: #1a212a;
      box-sizing: border-box;
      height: calc(100% - 3.2rem);
      overflow: hidden;
    /deep/ .vux-tab-wrap{
        z-index: 99;
      }
    .coin_list {
       // width: 100%;
       padding: 0.26rem 0.4rem;
       display: flex;
       justify-content: space-between;
       align-items: center;

       .coin_left{
         display: flex;
         align-items: center;
         img{
           // opacity: 0.6;
           width: 0.8rem;
           height: 0.70rem;
         }
         p{
           display: flex;
           flex-direction: column;
           span{
             padding: 0.06rem;
             font-size: 0.42rem;
           }
           span:nth-child(2){
             font-size: 0.36rem;
             color: rgba(255, 255, 255, 0.6)
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

      >div {
        position: relative;
        display: flex;

        >div {
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
