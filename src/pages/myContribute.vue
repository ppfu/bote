<template>
  <div class="wrap1">
    <div>
      <div class="head_info">
        <div>
          <div>
            <img v-if="img!=null" :src="img" alt>
            <img  v-if="img==null" src="../assets/logo.png" alt>
          </div>
        </div>
        <span>{{name}}</span>
        <span>{{$t('share.child3.t1')}}：{{today||"0"}}</span>
      </div>
      <div class="div_title">{{$t('share.child3.t2')}}</div>
      <div class="d_chart">
        <div class="chart">
          <div id="myChart" :style="{width: '100%', height: '240px'}"></div>
        </div>
      </div>
      <div class="tip f_c_red">*{{$t('share.child3.t3')}}</div>
    </div>
  </div>
</template>
<script>
import $ from "jquery";
import echarts from "echarts";
export default {
  data() {
    return {
      name:"",
      today:"",
      times:[],
      yvalues:[],
      img:"",
    };
  },
  components: {},
  mounted() {
    let that = this;
    mui.back = function() {
      that.$router.push({
        name: "mine"
      });
      error;
    };
    // 图表
    that
      .$http({
        url: "/user/get_contribution_his",
        method: "post",
        data: {
          token: that.$store.state.user_info.token
        }
      })
      .then(function(res) {
        console.log(res)
        that.name = res.data.data.name;
        that.img = res.data.data.head_icon;
        that.today = res.data.data.today;
        that.times = res.data.data.times;
        that.yvalues = res.data.data.values;
        that.drawChart("myChart");
      });
  },
  methods: {
    drawChart(id) {
      var myChart = echarts.init(document.getElementById(id));
      let that = this;
      // 指定图表的配置项和数据
      var option = {
        grid: {
          left: "20%",
          top: "20",
          height: "160",
          width: "76%"
        },
        textStyle: {
          color: "rgba(255,255,255,.6)"
        },
        tooltip: {
            trigger: 'axis',
            axisPointer:{
              type:"line",
              snap:true,
            }
        },
        xAxis: {
          type: "category",
          data: that.times,
          axisLine: {
            onZero: false,
            lineStyle: {
              color: "rgba(255,255,255,.6)"
            }
          },
          // axisTick: {//刻度线
          //   show: false,//去掉刻度线
          // },
        },
        yAxis: {
          type: "value",
          name:"",
           max: 100,
           min: 0,
          nameLocation:"start",
          nameGap:10,
          nameTextStyle:{
            padding:[-16,100,0,0]
          },
          axisLine: {
            onZero: false,
            lineStyle: {
              color: "rgba(255,255,255,.6)"
            }
          },
          splitLine: {
            show:false,
            lineStyle: {
              type: "solid",
              color: "rgba(255,255,255,.3)"
            }
          },
          axisLabel: {
            formatter: function(value, index) {
              return value.toFixed(2);
            }
          },
          // axisTick: {//刻度线
          //   show: false,//去掉刻度线
          // },
        },
        dataZoom: [
          {
            type: "inside",
            startValue: that.times.length-7>0?that.times.length-7:0,
            endValue: that.times.length-1
          }
        ],
        series: [
          {
            data: that.yvalues,
            type: "bar",
            barMaxWidth:30,
            lineStyle:{
              color:"white"
            },
            itemStyle:{
              color:"white"
            }
          }
        ]
      };

      // 使用刚指定的配置项和数据显示图表。
      myChart.clear(option, true);
      myChart.setOption(option, true);
    }
  }
};
</script>
<style lang="less" scoped>
.wrap1 {
  font-size: 0.36rem;
  width: 100%;
  color: white;
  box-sizing: border-box;
  > div {
    margin-top: 0.3rem;
    border-radius: 8px;
    box-sizing: border-box;
    padding: 0.6rem 0 0rem;
    background: #1a222b;
    .head_info {
      padding-bottom: 0.4rem;
      > div:first-child {
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
        font-size: 0.36rem;
      }
    }
  }
  .tip{
    padding: 0 4% 1rem;
  }
  .div_title {
    background: #12161c;
    padding: 0.3rem 4% 0.1rem;
    color: #b9b9c1;
  }
}
</style>
