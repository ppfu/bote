<template>
  <div class="wrap">
    <div class="top">
      <img @click="back" class="back_img" src="../assets/nav_back.png" alt>
      <div>{{$t('profitacc.title')}}</div>
    </div>
    <div class="main">
      <div class="head_info">
        <!-- <span>
          <span>{{baud}}</span> （BAUD）
        </span> -->
        <div class="ta_c">
         <!-- <span>{{baud}} BAUD</span> ≈ <span>{{usd}} USD</span> -->
           <span>{{baud}} BAUD</span>
        </div>
        <!-- <div class="info">
          <div>
            <span :class="{f_c:type==0}" @click="navTap(0)">收款</span>
          </div>
          <div>
            <span :class="{f_c:type==1}" @click="navTap(1)">转出</span>
          </div>
        </div> -->
      </div>
      <div class="div_title">{{$t('profitacc.t0')}}</div>
      <div class="con" v-if="type==1">
        <x-table :content-bordered="false" :cell-bordered="false">
            <thead>
            <tr>
                <th>数量</th>
                <th>价格</th>
                <th>USD总额</th>
                <th>CNY总额</th>
                <th>操作</th>
            </tr>
            </thead>
            <tbody>
            <tr>
                <td class="f_c_red">+2.00</td>
                <td>6666.66</td>
                <td>1200.00</td>
                <td>1200.00</td>
                <td @click="toDetail">查看详情</td>
            </tr>
            <tr>
                <td class="f_c_red">+2.00</td>
                <td>6666.66</td>
                <td>1200.00</td>
                <td>1200.00</td>
                <td @click="toDetail">查看详情</td>
            </tr>
            </tbody>
        </x-table>
      </div>
      <div class="con" v-if="type==0">
          <x-table :content-bordered="false" :cell-bordered="false">
            <thead>
            <tr>
                <th>{{$t('profitacc.list.t1')}}</th>
                <th>{{$t('profitacc.list.t2')}}</th>
                <th>{{$t('profitacc.list.t3')}}</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(item,index) in list">
            <td :class="[item.amount_text>=0?'f_c_red':'f_c_green']">{{item.amount_text}}</td>
                <td>
                    <span>{{item.time1}}</span>
                    <span>{{item.time2}}</span>
                </td>
                <td>{{item.type_text}}</td>
            </tr>
            </tbody>
        </x-table>
      </div>
    </div>
  </div>
</template>
<script>
import $ from "jquery";
import { XTable } from "vux";

export default {
  data() {
    return {
        type:0,
        usd:"0.00",
        baud:"0.00",
        list:[]
    };
  },
  components: {
      XTable
  },
  mounted() {
    let that = this;
    mui.back = function() {
      that.$router.push({
        name: "mine"
      });
      error;
    };
  },
  activated(){
    let that = this;
    that
      .$http({
        url: "/User/revenue_finance",
        method: "post",
        data: {
          token: that.$store.state.user_info.token,
          page:""
        }
      })
      .then(function(res) {
        if (res.data.code == 1) {
          that.usd = res.data.data.usd;
          that.baud = res.data.data.baud;
          for(let v of res.data.data.list){
            v.time1 = v.create_time.split(" ")[0];
            v.time2 = v.create_time.split(" ")[1];
          }
          that.list = res.data.data.list;
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
    navTap(i){
        this.type = i;
    },
    toDetail(){
        this.$router.push({
            name:"profitaccdetail"
        })
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
  .main {
    border-radius: 8px;
    box-sizing: border-box;
    padding: 0.6rem 0 0.6rem;
    background: #1a222b;
    .head_info {
      > span {
        display: block;
        text-align: center;
        font-size: 0.44rem;
        padding-bottom: 0.3rem;
        > span {
          font-size: 0.58rem;
        }
      }
      >div{
        font-size: 0.44rem;
        padding-top: 0.1rem;
        padding-bottom: 0.8rem;
      }
      > img {
        margin: 0.4rem auto;
        width: 3rem;
        height: 3rem;
      }
      > span:last-child {
        font-size: 0.36rem;
      }
      .info {
        padding: 0.4rem 0 0rem;
        display: flex;
        > div {
          background: #161d26;
          padding: 0.3rem 0 0.3rem;
          flex: 1;
          text-align: center;
          > span {
            font-size: 0.4rem;
            color: rgba(255, 255, 255, .6);
          }
        }
        > div:first-child {
          border-right: 1px solid #323b46;
        }
      }
    }
    .con{
      padding-top: 0.1rem;
    }
  }
  .div_title {
    background: #12161c;
    padding: 0.3rem 4% 0.1rem;
    color: #b9b9c1;
    background: #161d26;
    font-size: 0.4rem;
  }

   table {
    background: #1a212a;
  }
  thead {
    // background: #161d26;
    tr {
      th {
        text-align: center;
        color: #d9d9d9;
      }
    }
  }
  tbody {
    tr {
      td {
        text-align: center;
        color: #8f8f9b;
        // font-size: 0.32rem;
        border-bottom: 1px solid #2a333e;
        >span{
            display: block;
        }
      }
    }
  }
}
</style>
