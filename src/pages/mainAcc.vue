<template>
  <div class="wrap">
    <div class="top">
      <img @click="back" class="back_img" src="../assets/nav_back.png" alt>
      <div>{{$t('mainacc.title')}}</div>
    </div>
    <div class="main">
      <div class="head_info">
        <span>
          <span>{{usd}}</span> USD
        </span>
        <!-- <div class="info">
          <div>
            <span>可用(USD)：</span>
            <span>0.00</span>
          </div>
          <div>
            <span>冻结(USD)：</span>
            <span>0.00</span>
          </div>
        </div> -->
      </div>
      <div class="div_title">{{$t('mainacc.t0')}}</div>
      <x-table :content-bordered="false" :cell-bordered="false">
        <thead>
          <tr>
            <th>{{$t('mainacc.list.t7')}}</th>
            <th>{{$t('mainacc.list.t1')}}</th>
            <th>{{$t('mainacc.list.t2')}}</th>
            <!-- <th>USD{{$t('mainacc.list.t3')}}</th>
            <th>CNY{{$t('mainacc.list.t3')}}</th> -->
            <th>{{$t('mainacc.list.t6')}}(USD)</th>
            <th>{{$t('profitacc.list.t3')}}</th>
            <!-- <th>{{$t('mainacc.list.t5')}}</th> -->
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item,index) in list" :key="index">
            <td>{{item.create_time}}</td>
            <td :class="[item.amount_text>0?'f_c_red':'f_c_green']">{{item.amount_text}}</td>
            <td>{{item.price}}</td>
            <!-- <td>{{item.total}}</td>
            <td>{{item.cny_total}}</td> -->
            <td>{{item.total}}</td>
            <td>{{item.type_text}}</td>
            <!-- <td @click="toDetail(item.id)">{{$t('mainacc.btn.b1')}}</td> -->
          </tr>
        </tbody>
      </x-table>
    </div>
  </div>
</template>
<script>
  import $ from "jquery";
  import {
    XTable
  } from "vux";

  export default {
    data() {
      return {
        usd: "0.00",
        list: []
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
    //获取投资额记录
    activated() {
      let that = this;
      that
        .$http({
          url: "/User/user_finance_list",
          method: "post",
          data: {
            token: that.$store.state.user_info.token,
            page: ""
          }
        })
        .then(function(res) {
          console.log(res)
          if (res.data.code == 1) {
            that.usd = res.data.data.usd;
            if(res.data.data.list.length != 0){
              var arr = res.data.data.list;
               $.each(arr,function (index,item) {
                 item.create_time = that.timesToTime(item.create_time);
               });
              that.list = arr;

            }else{
              that.list = [];
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
    },
    methods: {
      back() {
        this.$router.back();
      },
      // 时间戳 转化为时间
      timesToTime(timestamp) {
        var date = new Date(timestamp * 1000); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
        var Y = date.getFullYear() + "-";
        var M = (date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1) + "-";
        var D = date.getDate() + " ";
        if (date.getHours() < 10) {
          var h = "0" + date.getHours() + ":";
        } else {
          var h = date.getHours() + ":";
        }
        if (date.getMinutes() < 10) {
          var m = "0" + date.getMinutes() + ":";
        } else {
          var m = date.getMinutes() + ":";
        }
        var s = date.getSeconds();
        if (s == 0) {
          s = "00";
        }else if(s < 10){
           s = "0" + s;
        }
        return Y + M + D + h + m + s;
      },
      toDetail(id) {
        this.$router.push({
          name: "mainaccdetail",
          params: {
            id: id
          }
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
    padding: 1.3rem 0 0;
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
        padding-bottom: 0.5rem;

        >span {
          display: block;
          text-align: center;
          font-size: 0.44rem;
          margin-bottom: 0.1rem;

          >span {
            font-size: 0.58rem;
          }
        }

        >img {
          margin: 0.4rem auto;
          width: 3rem;
          height: 3rem;
        }

        >span:last-child {
          font-size: 0.36rem;
        }

        .info {
          padding: 0.4rem 0 0rem;
          display: flex;

          >div {
            background: #161d26;
            padding: 0.3rem 0 0.3rem;
            flex: 1;
            text-align: center;

            >span {
              font-size: 0.4rem;
            }

            >span:first-child {
              font-size: 0.32rem;
            }
          }

          >div:first-child {
            border-right: 1px solid #323b46;
          }
        }
      }
    }

    .div_title {
      background: #12161c;
      padding: 0.3rem 4% 0.1rem;
      color: #b9b9c1;
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
          color: #8f8f9b;
        }
      }
    }

    tbody {
      tr {
        td {
          text-align: center;
          color: #8f8f9b;
          font-size: 0.32rem;
          border-bottom: 1px solid #2a333e;
        }
      }
    }
  }
</style>
