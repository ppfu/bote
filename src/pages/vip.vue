<template>
  <div class="wrap">
    <div class="top">
      <img @click="back" class="back_img" src="../assets/nav_back.png" alt>
      <div>VIP{{$t('vip.title')}}</div>
    </div>
    <div class="main">
      <tab
        class="tab top_tab"
        :line-width="2"
        bar-active-color="#f0b90b"
        active-color="#f0b90b"
        :scroll-threshold="5"
      >
        <tab-item selected @click.native="i=0">{{$t('vip.s1')}}</tab-item>
        <tab-item @click.native="i=1">{{$t('vip.s2')}}</tab-item>
      </tab>
      <!-- 社区用户等级规定 -->
      <div class="info" v-if="i==0">
        <van-collapse v-model="activeName" accordion>
          <van-collapse-item :title="$t('vip.t0')" name="1">
            <ul>
              <li>
                <span>{{$t('vip.list1.t2')}}：</span>
                <span>{{$t('vip.lt')}}100{{$t('vip.usd')}}</span>
              </li>
              <!-- <li>
                <span>{{$t('vip.list1.t3')}}：</span>
                <span>{{$t('nono')}}</span>
              </li>
              <li>
                <span>{{$t('vip.list1.t4')}}：</span>
                <span>{{$t('nono')}}</span>
              </li>
              <li>
                <span>{{$t('vip.list1.t5')}}：</span>
                <span>{{$t('nono')}}</span>
              </li> -->
            </ul>
          </van-collapse-item>
          <van-collapse-item title="VIP1" name="2">
            <ul>
              <li>
                <span>{{$t('vip.list1.t2')}}：</span>
                <span>100-299{{$t('vip.usd')}}</span>
              </li>
              <!-- <li>
                <span>{{$t('vip.list1.t3')}}：</span>
                <span>{{$t('nono')}}</span>
              </li>
              <li>
                <span>{{$t('vip.list1.t4')}}：</span>
                <span>{{$t('nono')}}</span>
              </li>
              <li>
                <span>{{$t('vip.list1.t5')}}：</span>
                <span>{{$t('nono')}}</span>
              </li> -->
            </ul>
          </van-collapse-item>
          <van-collapse-item title="VIP2" name="3">
            <ul>
              <li>
                <span>{{$t('vip.list1.t2')}}：</span>
                <span>300{{$t('vip.usd')}}{{$t('vip.or')}}{{$t('vip.gt')}}</span>
              </li>
              <!-- <li>
                <span>{{$t('vip.list1.t3')}}：</span>
                <span>{{$t('nono')}}</span>
              </li>
              <li>
                <span>{{$t('vip.list1.t4')}}：</span>
                <span>{{$t('nono')}}</span>
              </li>
              <li>
                <span>{{$t('vip.list1.t5')}}：</span>
                <span>{{$t('nono')}}</span>
              </li> -->
            </ul>
          </van-collapse-item>
          <van-collapse-item title="VIP3" name="4">
            <ul>
              <li>
                <span>{{$t('vip.list1.t2')}}：</span>
                <span>1000{{$t('vip.usd')}}{{$t('vip.or')}}{{$t('vip.gt')}}</span>
              </li>
              <li>
                <span>{{$t('vip.list1.t3')}}：</span>
                <span>10</span>
              </li>
              <li>
                <span>{{$t('vip.list1.t4')}}：</span>
                <span>{{$t('vip.gt_b')}}{{$t('vip.n1')}}{{$t('vip.usd')}}{{$t('vip.gt_a')}}</span>
              </li>
              <!-- <li>
                <span>{{$t('vip.list1.t5')}}：</span>
                <span>{{$t('nono')}}</span>
              </li> -->
            </ul>
          </van-collapse-item>
          <van-collapse-item title="VIP4" name="5">
            <ul>
              <li>
                <span>{{$t('vip.list1.t2')}}：</span>
                <span>3000{{$t('vip.usd')}}{{$t('vip.or')}}{{$t('vip.gt')}}</span>
              </li>
              <li>
                <span>{{$t('vip.list1.t3')}}：</span>
                <span>10</span>
              </li>
              <li>
                <span>{{$t('vip.list1.t4')}}：</span>
                <span>{{$t('vip.gt_b')}}{{$t('vip.n2')}}{{$t('vip.usd')}}{{$t('vip.gt_a')}}</span>
              </li>
              <li>
                <span>{{$t('vip.list1.t5')}}：</span>
                <span>3{{$t('vip.n')}}vip3</span>
              </li>
            </ul>
          </van-collapse-item>
           <van-collapse-item title="VIP5" name="6">
            <ul>
              <li>
                <span>{{$t('vip.list1.t2')}}：</span>
                <span>10000{{$t('vip.usd')}}{{$t('vip.or')}}{{$t('vip.gt')}}</span>
              </li>
              <li>
                <span>{{$t('vip.list1.t3')}}：</span>
                <span>10</span>
              </li>
              <li>
                <span>{{$t('vip.list1.t4')}}：</span>
                <span>{{$t('vip.gt_b')}}{{$t('vip.n3')}}{{$t('vip.usd')}}{{$t('vip.gt_a')}}</span>
              </li>
              <li>
                <span>{{$t('vip.list1.t5')}}：</span>
                <span>3{{$t('vip.n')}}vip4</span>
              </li>
            </ul>
          </van-collapse-item>
          <van-collapse-item title="VIP6" name="7">
            <ul>
              <li>
                <span>{{$t('vip.list1.t2')}}：</span>
                <span>30000{{$t('vip.usd')}}{{$t('vip.or')}}{{$t('vip.gt')}}</span>
              </li>
              <li>
                <span>{{$t('vip.list1.t3')}}：</span>
                <span>10</span>
              </li>
              <li>
                <span>{{$t('vip.list1.t4')}}：</span>
                <span>{{$t('vip.gt_b')}}{{$t('vip.n4')}}{{$t('vip.usd')}}{{$t('vip.gt_a')}}</span>
              </li>
              <li>
                <span>{{$t('vip.list1.t5')}}：</span>
                <span>3{{$t('vip.n')}}vip5</span>
              </li>
            </ul>
          </van-collapse-item>
        </van-collapse>
      </div>
      <!-- 社区用户权益 -->
       <div class="info" v-if="i==1">
        <van-collapse v-model="activeName1" accordion>
          <van-collapse-item :title="$t('vip.t0')" name="1">
            <ul>
              <li>
                <span>{{$t('vip.list2.t2')}}：</span>
                <span>{{$t('vip.play')}}</span>
              </li>
              <!-- <li>
                <span>{{$t('vip.list2.t3')}}：</span>
                <span>{{$t('nono')}}</span>
              </li>
              <li>
                <span>{{$t('vip.list2.t4')}}：</span>
                <span>{{$t('nono')}}</span>
              </li> -->
              <li>
                <span>{{$t('vip.list2.t5')}}：</span>
                <span>2</span>
              </li>
             <!-- <li>
                <span>{{$t('vip.list2.t6')}}：</span>
                <span>{{$t('vip.list3.v0.t1')}},{{$t('vip.list3.v0.t2')}}</span>
              </li> -->
              <!-- <li>
                <span>{{$t('vip.list2.t7')}}：</span>
                <span>{{$t('nono')}}</span>
              </li>
              <li>
                <span>{{$t('vip.list2.t8')}}：</span>
                <span>{{$t('nono')}}</span>
              </li> -->
            </ul>
          </van-collapse-item>
          <van-collapse-item title="VIP1" name="2">
            <ul>
              <li>
                <span>{{$t('vip.list2.t2')}}：</span>
                <span>&#8730;</span>
              </li>
              <!-- <li>
                <span>{{$t('vip.list2.t3')}}：</span>
                <span>{{$t('nono')}}</span>
              </li>
              <li>
                <span>{{$t('vip.list2.t4')}}：</span>
                <span>{{$t('nono')}}</span>
              </li> -->
              <li>
                <span>{{$t('vip.list2.t5')}}：</span>
                <span>3</span>
              </li>
            <!--  <li>
                <span>{{$t('vip.list2.t6')}}：</span>
                <span>{{$t('vip.list3.v1.t1')}},{{$t('vip.list3.v1.t2')}}</span>
              </li> -->
              <!-- <li>
                <span>{{$t('vip.list2.t7')}}：</span>
                <span>{{$t('nono')}}</span>
              </li>
              <li>
                <span>{{$t('vip.list2.t8')}}：</span>
                <span>{{$t('nono')}}</span>
              </li> -->
            </ul>
          </van-collapse-item>
          <van-collapse-item title="VIP2" name="3">
            <ul>
              <li>
                <span>{{$t('vip.list2.t2')}}：</span>
                <span>&#8730;</span>
              </li>
              <li>
                <span>{{$t('vip.list2.t3')}}：</span>
                <span>&#8730;</span>
              </li>
              <!-- <li>
                <span>{{$t('vip.list2.t4')}}：</span>
                <span>{{$t('nono')}}</span>
              </li> -->
              <li>
                <span>{{$t('vip.list2.t5')}}：</span>
                <span>4</span>
              </li>
             <!-- <li>
                <span>{{$t('vip.list2.t6')}}：</span>
                <span>{{$t('vip.list3.v2.t1')}},{{$t('vip.list3.v2.t2')}}</span>
              </li> -->
              <!-- <li>
                <span>{{$t('vip.list2.t7')}}：</span>
                <span>{{$t('nono')}}</span>
              </li>
              <li>
                <span>{{$t('vip.list2.t8')}}：</span>
                <span>{{$t('nono')}}</span>
              </li> -->
            </ul>
          </van-collapse-item>
          <van-collapse-item title="VIP3" name="4">
            <ul>
              <li>
                <span>{{$t('vip.list2.t2')}}：</span>
                <span>&#8730;</span>
              </li>
              <li>
                <span>{{$t('vip.list2.t3')}}：</span>
                <span>&#8730;</span>
              </li>
              <li>
                <span>{{$t('vip.list2.t4')}}：</span>
                <span>6%</span>
              </li>
              <li>
                <span>{{$t('vip.list2.t5')}}：</span>
                <span>4</span>
              </li>
            <!--  <li>
                <span>{{$t('vip.list2.t6')}}：</span>
                <span>{{$t('vip.list3.v3.t1')}},{{$t('vip.list3.v3.t2')}}</span>
              </li> -->
             <!-- <li>
                <span>{{$t('vip.list2.t7')}}：</span>
                <span>{{$t('vip.l1')}}</span>
              </li> -->
              <li>
                <span>{{$t('vip.list2.t8')}}：</span>
                <span>&#8730;</span>
              </li>
            </ul>
          </van-collapse-item>
          <van-collapse-item title="VIP4" name="5">
            <ul>
              <li>
                <span>{{$t('vip.list2.t2')}}：</span>
                <span>&#8730;</span>
              </li>
              <li>
                <span>{{$t('vip.list2.t3')}}：</span>
                <span>&#8730;</span>
              </li>
              <li>
                <span>{{$t('vip.list2.t4')}}：</span>
                <span>9%</span>
              </li>
              <li>
                <span>{{$t('vip.list2.t5')}}：</span>
                <span>5</span>
              </li>
             <!-- <li>
                <span>{{$t('vip.list2.t6')}}：</span>
                <span>{{$t('vip.list3.v4.t1')}},{{$t('vip.list3.v4.t2')}}</span>
              </li> -->
              <!-- <li>
                <span>{{$t('vip.list2.t7')}}：</span>
                <span>{{$t('vip.l2')}}</span>
              </li> -->
              <li>
                <span>{{$t('vip.list2.t8')}}：</span>
                <span>&#8730;</span>
              </li>
            </ul>
          </van-collapse-item>
          <van-collapse-item title="VIP5" name="6">
            <ul>
              <li>
                <span>{{$t('vip.list2.t2')}}：</span>
                <span>&#8730;</span>
              </li>
              <li>
                <span>{{$t('vip.list2.t3')}}：</span>
                <span>&#8730;</span>
              </li>
              <li>
                <span>{{$t('vip.list2.t4')}}：</span>
                <span>12%</span>
              </li>
              <li>
                <span>{{$t('vip.list2.t5')}}：</span>
                <span>5</span>
              </li>
             <!-- <li>
                <span>{{$t('vip.list2.t6')}}：</span>
                <span>{{$t('vip.list3.v5.t1')}},{{$t('vip.list3.v5.t2')}}</span>
              </li> -->
             <!-- <li>
                <span>{{$t('vip.list2.t7')}}：</span>
                <span>{{$t('vip.l3')}}</span>
              </li> -->
              <li>
                <span>{{$t('vip.list2.t8')}}：</span>
                <span>&#8730;</span>
              </li>
            </ul>
          </van-collapse-item>
          <van-collapse-item title="VIP6" name="7">
            <ul>
              <li>
                <span>{{$t('vip.list2.t2')}}：</span>
                <span>&#8730;</span>
              </li>
              <li>
                <span>{{$t('vip.list2.t3')}}：</span>
                <span>&#8730;</span>
              </li>
              <li>
                <span>{{$t('vip.list2.t4')}}：</span>
                <span>12%+{{$t('vip.all')}}</span>
              </li>
              <li>
                <span>{{$t('vip.list2.t5')}}：</span>
                <span>6</span>
              </li>
             <!-- <li>
                <span>{{$t('vip.list2.t6')}}：</span>
                <span>{{$t('vip.list3.v6.t1')}},{{$t('vip.list3.v6.t2')}}</span>
              </li> -->
             <!-- <li>
                <span>{{$t('vip.list2.t7')}}：</span>
                <span>{{$t('vip.l4')}}</span>
              </li> -->
              <li>
                <span>{{$t('vip.list2.t8')}}：</span>
                <span>&#8730;</span>
              </li>
            </ul>
          </van-collapse-item>
        </van-collapse>
      </div>
    </div>
  </div>
</template>
<script>
import $ from "jquery";
import { Tab, TabItem } from "vux";
import { Collapse, CollapseItem } from "vant";
export default {
  data() {
    return {
      info: "",
      i:"0",
      activeName:"0",
      activeName1:"0",
    };
  },
  components: {
    Tab,
    TabItem,
    "van-collapse":Collapse,
    "van-collapse-item":CollapseItem
  },
  mounted() {
    let that = this;
    mui.back = function() {
      that.$router.back();
      error;
    };
    that
      .$http({
        url: "/notice/mining_notice",
        method: "post",
        data: {
          type: 3,
          token: that.$store.state.user_info.token
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
  padding: 1.3rem 0 0.4rem;
  overflow: auto;
  .top {
    background: #1a212a;
  }
  .main {
    height: 100%;
    overflow: auto;
    .info {
      padding: 0.2rem 0 0;
      background: #1a212a;
      box-sizing: border-box;
      width: 100%;
      margin-top: 2px;
      li{
        line-height: .8rem;
        span{
          display: inline-block;
          margin-right: 0.2rem;
        }
      }
    }
  }
}
</style>
