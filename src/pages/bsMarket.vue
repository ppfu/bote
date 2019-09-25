<template>
  <div class="wrap">
    <div class="top">
      <img @click="back" class="back_img" src="../assets/nav_back.png" alt>
      <div>BAUD/{{$store.state.active_market.name}}</div>
    </div>
    <div class="main">
      <div class="top_info">
        <div>
          <span class="f_l">{{$t('market.topinfo.t1')}}：{{t_info.price_new}}</span>
          <span
            class="f_r"
            :class="[t_info.fall_type==2?'f_c_red':'f_c_green']"
          >{{$t('market.topinfo.t2')}}：{{t_info.day_rise_fall}}</span>
        </div>
        <div>
          <span class="f_l">{{$t('market.topinfo.t3')}}：{{t_info.high}}&nbsp;&nbsp;&nbsp;</span>
          <span class="f_l">{{$t('market.topinfo.t4')}}：{{t_info.low}}</span>
          <span
            class="f_r"
          >24H{{$t('market.topinfo.t5')}}：{{t_info.twenty_four_volume}} BAUD</span>
        </div>
      </div>
      <!-- 图 -->
      <div class="k_sort">
        <span :class="{f_c:k_type==0}" @click="timeline">{{$t('market.chart.c1')}}</span>
        <select v-model="s_type" @click="deKline" @change="kline" :class="{f_c:k_type!=0}">
          <option value="1">1{{$t('market.chart.c2')}}</option>
          <option value="2">1{{$t('market.chart.c3')}}</option>
          <option value="3">1{{$t('market.chart.c4')}}</option>
          <option value="4">1{{$t('market.chart.c5')}}</option>
          <option value="5">5{{$t('market.chart.c5')}}</option>
          <option value="6">15{{$t('market.chart.c5')}}</option>
          <option value="7">30{{$t('market.chart.c5')}}</option>
          <option value="8">1{{$t('market.chart.c6')}}</option>
        </select>
      </div>
      <div class="chart_div">
        <div id="kline" style="height:100%"></div>
      </div>

      <div class="order_div">
        <div class="tab_div">
          <span :class="o_type==1?'active':''" @click="tap(1)">{{$t('market.order.t1')}}</span>
          <span :class="o_type==2?'active':''" @click="tap(2)">{{$t('market.order.t2')}}</span>
        </div>
        <div v-if="o_type==1" class="bs_info">
          <div class="line"></div>
          <div>
            <div>
              {{$t('market.order.list1.t1')}}(USD)
              <span class="total">{{$t('total')}}{{b_total}}</span>
            </div>
            <ul>
              <li v-for="(item,index) in b_list" :key="index">
                <span class="f_l">{{item.price}}</span>
                <span class="f_r f_c_red">{{item.number}}</span>
              </li>
            </ul>
          </div>
          <div>
            <div>
              {{$t('market.order.list1.t2')}}(USD)
              <span class="total">{{$t('total')}}{{s_total}}</span>
            </div>
            <ul>
              <li v-for="(item,index) in s_list" :key="index">
                <span class="f_l">{{item.price}}</span>
                <span class="f_r f_c_green">{{item.number}}</span>
              </li>
            </ul>
          </div>
        </div>
        <div v-if="o_type==2">
          <x-table :content-bordered="false" :cell-bordered="false">
            <thead>
              <tr>
                <th>{{$t('market.order.list2.t1')}}</th>
                <th>{{$t('market.order.list2.t2')}}</th>
                <th>{{$t('market.order.list2.t3')}}</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item,index) in l_list" :key="index">
                <td>{{item.done_time}}</td>
                <td>{{item.price}}</td>
                <td>{{item.order_number}}</td>
              </tr>
            </tbody>
          </x-table>
        </div>
      </div>
    </div>
    <div class="bot_btn">
      <div>
        <button class="btn" @click="toTrade(0)">{{$t('market.btn.b1')}}</button>
        <button class="btn" @click="toTrade(1)">{{$t('market.btn.b2')}}</button>
      </div>
    </div>
  </div>
</template>
<script>
import $ from "jquery";
import { XTable } from "vux";
import echarts from "echarts";
export default {
  data() {
    return {
      k_type: 1,
      s_type: 1,
      o_type: 1,
      t_info: {},
      b_list: [],
      s_list: [],
      l_list: [],
      b_total: 0,
      s_total: 0,
      cur_id_a:'' ,//a id
      cur_id_b:'', //b id
    };
  },
  components: {
    XTable
  },
  mounted() {
    let that = this;
    mui.back = function() {
      that.$router.back();
      error;
    };

    that.kline();
    // 页面信息
    that.getInfo();
    window.t = setInterval(that.getInfo, 3000);
    window.t = setInterval(that.kline,9000);
  },
  watch: {
    k_type(n, o) {
      if (o == 0) {
        this.kline();
      }
    }
  },
  methods: {
    back() {
      this.$router.back();
    },
    tap(i) {
      this.o_type = i;
    },
    getInfo() {
      let that = this;
      that.cur_id_a = that.$store.state.active_market.cur_id_a;
      that.cur_id_b = that.$store.state.active_market.cur_id_b;
      that
        .$http({
          url: "/market/marketData",
          method: "post",
          data: {
            token: that.$store.state.user_info.token,
            cur_id_a: that.cur_id_a,
            cur_id_b: that.cur_id_b,
          }
        })
        .then(function(res) {
          console.log(res)
          if (res.data.code == 1) {
            that.t_info = res.data.data.market;
            that.b_list = res.data.data.buy_list;
            that.s_list = res.data.data.sell_list;
            that.l_list = res.data.data.latest_deal;
            if (that.b_list) {
              that.b_total = 0;
              for (let v of that.b_list) {
                that.b_total += parseFloat(v.number);
              }
              if (that.b_total < 1000) {
                that.b_total = parseFloat(that.b_total).toFixed(5);
              }
              if (that.b_total > 1000 && that.b_total < 10000) {
                that.b_total =
                  parseFloat(that.b_total / 1000).toFixed(5) + "k";
              }
              if (that.b_total > 1000000) {
                that.b_total =
                  parseFloat(that.b_total / 1000000).toFixed(5) + "m";
              }
            }
            if (that.s_list) {
              that.s_total = 0;
              for (let v of that.s_list) {
                that.s_total += Number(v.number);
              }
               if (that.s_total < 1000) {
                that.s_total = parseFloat(that.s_total).toFixed(5);
              }
              if (that.s_total > 1000 && that.s_total < 10000) {
                that.s_total =
                  parseFloat(that.s_total / 1000).toFixed(5) + "k";
              }
              if (that.s_total > 1000000) {
                that.s_total =
                  parseFloat(that.s_total / 1000000).toFixed(5) + "m";
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
    },
    toTrade(i) {
      this.$store.state.bot = "trade";
      this.$router.push({
        name: "trade1",
        params: {
          type: i
        }
      });
    },
    timeline() {
      this.k_type = 0;
      let that = this;
      that.$vux.loading.show({
        text: ""
      });
      timelineAjax();
      function timelineAjax() {
        that
          .$http({
            url: "/show_kline/line_graph",
            method: "post",
            data: {
              token: that.$store.state.user_info.token,
              cur_id_a: that.cur_id_a,
              cur_id_b: that.cur_id_b,
              type: 4
            }
          })
          .then(function(res) {
            // console.log(res)
            that.$vux.loading.hide();
            var time_line_data = that.splitData1(res.data);
            that.build_timeline(time_line_data);
          });
        // var test_data=[
        //   {time: "2019.01.04 10:03", open: 1, low: 10, high: 10, vol: 55, close: 10},
        //   {time: "2019.01.04 10:05", open: 10, low: 0, high: 0, vol: 10, close: 20},
        //   {time: "2019.01.04 10:06", open: 20, low: 0, high: 0, vol: 20, close: 20},
        //   {time: "2019.01.04 10:07", open: 30, low: 0, high: 0, vol: 10, close: 20},
        //   {time: "2019.01.04 10:08", open: 20, low: 0, high: 0, vol: 20, close: 20},
        //   {time: "2019.01.04 10:09", open: 20, low: 0, high: 0, vol: 10, close: 20},
        //   {time: "2019.01.04 10:10", open: 20, low: 0, high: 0, vol: 20, close: 20},
        //   {time: "2019.01.04 10:11", open: 20, low: 0, high: 0, vol: 10, close: 30},
        //   {time: "2019.01.04 10:12", open: 20, low: 0, high: 0, vol: 20, close: 30},
        //   {time: "2019.01.04 10:13", open: 20, low: 0, high: 0, vol: 10, close: 30},
        //   {time: "2019.01.04 10:14", open: 20, low: 0, high: 0, vol: 20, close: 30},
        //   {time: "2019.01.04 10:15", open: 20, low: 0, high: 0, vol: 10, close: 30},
        //   {time: "2019.01.04 10:16", open: 20, low: 0, high: 0, vol: 20, close: 30},
        //   {time: "2019.01.04 10:17", open: 20, low: 0, high: 0, vol: 20, close: 30},
        //   {time: "2019.01.04 10:18", open: 20, low: 0, high: 0, vol: 10, close: 30},
        //   {time: "2019.01.04 10:19", open: 20, low: 0, high: 0, vol: 20, close: 30},
        // ]
        // that.$vux.loading.hide();
        // var time_line_data = that.splitData1(test_data);
        // that.build_timeline(time_line_data);
      }
    },
    deKline() {
      this.k_type = this.s_type;
    },
    kline() {
      let that = this;
      that.k_type = that.s_type;
      that.$vux.loading.show({
        text: ""
      });
      klineAjax();
      function klineAjax() {
        that
          .$http({
            url: "/show_kline/line_graph",
            method: "post",
            data: {
              token: that.$store.state.user_info.token,
              cur_id_a: that.cur_id_a,
              cur_id_b: that.cur_id_b,
              type: that.s_type
            }
          })
          .then(function(res) {
            console.log(res)
            that.$vux.loading.hide();
            var all_data = that.build_all_data(res.data);
            console.log(all_data)
            var data = that.splitData(all_data);
            that.build_kline(data);
          });
      }
    },
    /*****************计算macd**************macd*/
    //指标参数m_short,m_long  data数据
    build_diff(m_short, m_long, data) {
      var result = [];
      var pre_emashort = 0;
      var pre_emalong = 0;
      for (var i = 0; i < data.length; i++) {
        var ema_short = data[i][2]; //收盘价
        var ema_long = data[i][2]; //收盘价
        if (i != 0) {
          ema_short =
            (1.0 / m_short) * data[i][2] + (1 - 1.0 / m_short) * pre_emashort;
          ema_long =
            (1.0 / m_long) * data[i][2] + (1 - 1.0 / m_long) * pre_emalong;
        }
        pre_emashort = ema_short;
        pre_emalong = ema_long;
        var diff = parseInt((ema_short - ema_long) * 100) / 100;
        result.push(diff);
      }
      return result;
    },
    //指标3 长度
    build_dea(m, diff) {
      var result = [];
      var pre_ema_diff = 0;
      for (var i = 0; i < diff.length; i++) {
        var ema_diff = diff[i];
        if (i != 0) {
          ema_diff = (1.0 / m) * diff[i] + (1 - 1.0 / m) * pre_ema_diff;
        }
        pre_ema_diff = ema_diff;
        ema_diff = parseInt(ema_diff * 100) / 100;
        result.push(ema_diff);
      }
      return result;
    },
    //计算 MACD
    build_macd(data, diff, dea) {
      var result = [];
      for (var i = 0; i < data.length; i++) {
        var macd = 2 * (diff[i] - dea[i]);
        macd = parseInt(macd * 100) / 100;
        result.push(macd);
      }
      return result;
    },
    /*****************计算macd***************/
    build_all_data(res) {
      let that = this;
      var line_data = [];
      for (var i = 0; i < res.length; i++) {
        //数据模型 time0 open1 close2 min3 max4 vol5
        //var time = timestampToTime(res[i].Date);
        var time = res[i].time;
        var line_arr = [
          time,
          res[i].open,
          res[i].close,
          res[i].low,
          res[i].high,
          res[i].vol
        ];
        line_data.push(line_arr);
      }
      var diff = that.build_diff(12, 26, line_data);
      var dea = that.build_dea(9, diff);
      var macd = that.build_macd(line_data, diff, dea);
      var all_data = [];
      for (var i = 0; i < line_data.length; i++) {
        //数据模型 time0 open1 close2 min3 max4 vol5 tag6 macd7 dif8 dea9
        var arr = [
          line_data[i][0],
          line_data[i][1],
          line_data[i][2],
          line_data[i][3],
          line_data[i][4],
          line_data[i][5],
          macd[i],
          diff[i],
          dea[i]
        ];
        all_data.push(arr);
      }
      return all_data;
    },
    //数组处理
    splitData(rawData) {
      let that = this;
      var type = Number(that.s_type);
      var datas = [];
      var times = [];
      var vols = [];
      var macds = [];
      var difs = [];
      var deas = [];
      for (var i = 0; i < rawData.length; i++) {
        datas.push(rawData[i]);
        vols.push(parseInt(rawData[i][5]));
        macds.push(rawData[i][6]);
        difs.push(rawData[i][7]);
        deas.push(rawData[i][8]);
        times.push(rawData[i].splice(0, 1)[0]);
      }
      if (type !== 1 && type !== 2 && type !== 3) {
        var time1 = [];
        $.each(times, function(i, item) {
          var arr = item.split(" ");
          time1.push(arr[1]);
        });
        times = time1;
      }
      return {
        datas: datas,
        times: times,
        vols: vols,
        macds: macds,
        difs: difs,
        deas: deas
      };
    },

    //MA计算公式
    calculateMA(dayCount, data) {
      var result = [];

      for (var i = 0, len = data.times.length; i < len; i++) {
        if (i < dayCount) {
          result.push("-");
          continue;
        }
        var sum = 0;
        for (var j = 0; j < dayCount; j++) {
          sum += parseFloat(data.datas[i - j][1]);
        }

        result.push((sum / dayCount).toFixed(2));
      }
      return result;
    },

    build_kline(data) {
      let that = this;
      var option = {
        backgroundColor: "transparent",
        tooltip: {
          show: true,
          trigger: "axis",
          axisPointer: {
            type: "cross",
            lineStyle: {
              type: "dashed",
              color: "#9394a3"
            },
            crossStyle: {
              type: "dashed",
              color: "#9394a3"
            },
            label: {
              show: true,
              precision: 2,
              backgroundColor: "#585858"
            }
          },
          textStyle: {
            color: "white",
            fontSize: "12"
          },
          backgroundColor: "transparent",
          showContent: true,
          position: [0, 0],
          formatter: function(params) {
            if (params[0].seriesIndex == 0) {
              return (
                that.$t("market.chart.tool.t1") +
                params[0].name +
                "&nbsp;&nbsp;&nbsp;" +
                that.$t("market.chart.tool.t2") +
                params[0].data[5] +
                "<br/>" +
                that.$t("market.chart.tool.t3") +
                params[0].data[1] +
                " &nbsp;&nbsp;" +
                that.$t("market.chart.tool.t4") +
                params[0].data[4] +
                " &nbsp;&nbsp;" +
                that.$t("market.chart.tool.t5") +
                params[0].data[3] +
                " &nbsp;&nbsp;" +
                that.$t("market.chart.tool.t6") +
                params[0].data[2] +
                "<br/>"
              );
            } else {
              return (
                that.$t("market.chart.tool.t1") +
                params[1].name +
                "&nbsp;&nbsp;&nbsp;" +
                that.$t("market.chart.tool.t2") +
                params[1].data[5] +
                "<br/>" +
                that.$t("market.chart.tool.t3") +
                params[1].data[1] +
                " &nbsp;&nbsp;" +
                that.$t("market.chart.tool.t4") +
                params[1].data[4] +
                " &nbsp;&nbsp;" +
                that.$t("market.chart.tool.t5") +
                params[1].data[3] +
                " &nbsp;&nbsp;" +
                that.$t("market.chart.tool.t6") +
                params[1].data[2] +
                "<br/>"
              );
            }
          },
          crossStyle: {
            opacity: 1
          }
        },
        axisPointer: {
          link: {
            xAxisIndex: "all"
          }
        },
        grid: [
          {
            left: "4%",
            right: "50",
            height: "58%",
            top: "10px"
          },
          {
            left: "4%",
            right: "50",
            top: "66%",
            height: "26%"
          }
        ],
        xAxis: [
          {
            type: "category",
            data: data.times,
            scale: true,
            boundaryGap: true,
            axisLine: {
              show: true,
              lineStyle: {
                color: "rgba(255,255,255,.7)"
              }
            },
            splitLine: {
              show: false,
              lineStyle: {
                color: "rgba(255,0,0,.3)",
                type: "dashed"
              }
            },
            axisLabel: {
              show: false
            },
            axisTick: {
              show: true
            },
            splitNumber: 20,
            min: "dataMin",
            max: "dataMax",
            axisPointer: {
              label: {
                show: true
              }
            }
          },
          {
            type: "category",
            gridIndex: 1,
            boundaryGap: true,
            data: data.times,
            axisLabel: {
              show: true
            },
            splitLine: {
              show: false,
              lineStyle: {
                color: "rgba(255,0,0,.3)",
                type: "dashed"
              }
            },
            axisLine: {
              show: true,
              lineStyle: {
                color: "rgba(255,255,255,.7)"
              }
            },
            axisPointer: {
              label: {
                show: true
              }
            },
            axisTick: {
              show: true
            }
          }
        ],
        yAxis: [
          {
            scale: true,
            position: "right",
            boundaryGap: true,
            splitArea: {
              show: false
            },
            axisLine: {
              show: true,
              lineStyle: {
                color: "rgba(255,255,255,.7)"
              }
            },
            splitLine: {
              show: false,
              lineStyle: {
                color: "rgba(255,0,0,.3)",
                type: "dashed"
              }
            }
          },
          {
            gridIndex: 1,
            splitNumber: 3,
            position: "right",
            boundaryGap: true,
            axisLine: {
              onZero: false
            },
            axisTick: {
              show: false
            },
            axisLine: {
              show: true,
              lineStyle: {
                color: "rgba(255,255,255,.7)"
              }
            },
            splitLine: {
              show: false,
              lineStyle: {
                color: "rgba(255,0,0,.3)",
                type: "dashed"
              }
            },
            axisLabel: {
              show: true
            }
          }
        ],
        dataZoom: [
          {
            type: "inside",
            xAxisIndex: [0, 1],
            startValue: data.times.length > 30 ? data.times.length - 30 : 0,
            endValue: data.times.length - 1
          }
        ],
        series: [
          {
            name: "K线周期图表(matols.com)",
            type: "candlestick",
            data: data.datas,
            splitLine: {
              show: true,
              lineStyle: {
                color: "rgba(255,0,0,.3)",
                type: "dashed"
              }
            },
            itemStyle: {
              normal: {
                color: "#d40469",
                color0: "#01b782",
                borderColor: "#d40469",
                borderColor0: "#01b782",
                opacity: 1
              }
            }
          },
          {
            name: "MA5",
            type: "line",
            data: that.calculateMA(5, data),
            smooth: true,
            symbol: "none",
            hoverAnimation: false,
            showSymbol: false,
            showAllSymbol: false,
            lineStyle: {
              type: "solid"
            },
            splitLine: {
              show: true,
              lineStyle: {
                color: "rgba(255,0,0,.3)",
                type: "dashed"
              }
            },
            itemStyle: {
              type: "solid"
            }
          },
          {
            name: "Volumn",
            type: "bar",
            xAxisIndex: 1,
            yAxisIndex: 1,
            data: data.vols,
            splitLine: {
              show: true,
              lineStyle: {
                color: "rgba(255,0,0,.3)",
                type: "dashed"
              }
            },
            itemStyle: {
              normal: {
                color: function(params) {
                  var colorList;
                   if(data.datas.length <= 1){
                      colorList = "#01b782";
                      return colorList;
                  }else{
                      if (params.dataIndex == 0) {
                      if (data.datas[1][1] > data.datas[0][1]) {
                        colorList = "#01b782";
                      } else {
                        colorList = "#d40469";
                      }
                      return colorList;
                    }
                    if (params.dataIndex != 0) {
                      if (
                        data.datas[params.dataIndex][1] >
                        data.datas[params.dataIndex - 1][1]
                      ) {
                        colorList = "#d40469";
                      } else {
                        colorList = "#01b782";
                      }
                      return colorList;
                    }
                  }

                }
              }
            }
          }
        ]
      };
      var myChart = echarts.init(document.getElementById("kline"));
      myChart.clear(option);
      myChart.setOption(option, true);
    },

    //数组处理
    splitData1(rawData) {
      var times = [];
      var price = [];
      var vols = [];
      var datas = [];
      for (var i = 0; i < rawData.length; i++) {
        datas.push(rawData[i]);
        price.push(parseFloat(rawData[i].close));
        vols.push(parseInt(rawData[i].vol));
        times.push(rawData[i].time.split(" ")[1]);
      }
      return {
        datas: datas,
        times: times,
        price: price,
        vols: vols
      };
    },
    build_timeline(data) {
      let that = this;
      var option = {
        animation: false,
        tooltip: {
          show: true,
          trigger: "axis",
          axisPointer: {
            type: "cross",
            lineStyle: {
              type: "dashed",
              color: "#9394a3"
            },
            crossStyle: {
              type: "dashed",
              color: "#9394a3"
            },
            label: {
              show: true,
              precision: 2,
              backgroundColor: "#585858"
            }
          },
          textStyle: {
            color: "white",
            fontSize: "12"
          },
          backgroundColor: "transparent",
          showContent: true,
          position: [0, 0],
          formatter: function(params) {
            var time = params[0].name;
            var price = params[1].value;
            var vols = params[0].value;
            return (
              that.$t("market.chart.tool.t1") +
              time +
              "&nbsp;&nbsp;" +
              that.$t("market.chart.tool.t7") +
              price +
              "<br>" +
              that.$t("market.chart.tool.t2") +
              vols
            );
          },
          crossStyle: {
            opacity: 1
          }
        },
        axisPointer: {
          link: {
            xAxisIndex: "all"
          }
        },
        grid: [
          {
            left: "4%",
            right: "50",
            height: "54%",
            top: "20"
          },
          {
            left: "4%",
            right: "50",
            top: "66%",
            height: "28%"
          }
        ],
        xAxis: [
          {
            type: "category",
            data: data.times,
            scale: true,
            boundaryGap: true,
            axisLine: {
              show: true,
              lineStyle: {
                color: "rgba(255,255,255,.4)"
              }
            },
            splitLine: {
              show: false,
              lineStyle: {
                color: "rgba(255,0,0,.3)",
                type: "dashed"
              }
            },
            axisLabel: {
              show: false
            },
            axisTick: {
              show: false
            },
            splitNumber: 20,
            min: "dataMin",
            max: "dataMax",
            axisPointer: {
              label: {
                show: false
              }
            }
          },
          {
            type: "category",
            gridIndex: 1,
            boundaryGap: true,
            data: data.times,
            axisLine: {
              show: true,
              lineStyle: {
                color: "rgba(255,255,255,.7)"
              }
            },
            axisLabel: {
              show: true
            },
            splitLine: {
              show: false,
              lineStyle: {
                color: "rgba(255,0,0,.3)",
                type: "dashed"
              }
            }
          }
        ],
        yAxis: [
          {
            scale: true,
            position: "right",
            boundaryGap: true,
            splitArea: {
              show: false
            },
            axisLine: {
              show: true,
              lineStyle: {
                color: "rgba(255,255,255,.7)"
              }
            },
            splitLine: {
              show: false,
              lineStyle: {
                color: "rgba(255,0,0,.3)",
                type: "dashed"
              }
            }
          },
          {
            gridIndex: 1,
            splitNumber: 3,
            position: "right",
            boundaryGap: true,
            axisLine: {
              show: true,
              lineStyle: {
                color: "rgba(255,255,255,.7)"
              }
            },
            axisTick: {
              show: false
            },
            splitLine: {
              show: false,
              lineStyle: {
                color: "rgba(255,0,0,.3)",
                type: "dashed"
              }
            },
            axisLabel: {
              show: true
            }
          }
        ],
        dataZoom: [
          {
            type: "inside",
            xAxisIndex: [0, 1],
            startValue: data.times.length > 30 ? data.times.length - 30 : 0,
            endValue: data.times.length - 1
          }
        ],
        series: [
          {
            name: "price",
            type: "line",
            smooth: true,
            data: data.price,
            hoverAnimation: false,
            showSymbol: false,
            showAllSymbol: false,
            itemStyle: {
              normal: {
                color: "#ccc"
              }
            },
            areaStyle: {
              //区域填充样式
              normal: {
                color: {
                  type: "linear",
                  x: 0,
                  y: 0,
                  x2: 0,
                  y2: 1,
                  colorStops: [
                    {
                      offset: 0,
                      color: "rgba(255,255,255,.5)"
                    },
                    {
                      offset: 1,
                      color: "rgba(255,255,255,.2)"
                    }
                  ],
                  globaCoord: false
                }
              }
            }
          },
          {
            name: "Volumn",
            type: "bar",
            xAxisIndex: 1,
            yAxisIndex: 1,
            data: data.vols,
            itemStyle: {
              normal: {
                color: function(params) {
                  var colorList;
                  if (params.dataIndex == 0) {
                    if (data.datas[1].close > data.datas[0].close) {
                      colorList = "#01b782";
                    } else {
                      colorList = "#d40469";
                    }
                  }
                  if (params.dataIndex != 0) {
                    if (
                      data.datas[params.dataIndex].close >
                      data.datas[params.dataIndex - 1].close
                    ) {
                      colorList = "#d40469";
                    } else {
                      colorList = "#01b782";
                    }
                  }
                  return colorList;
                }
              }
            }
          }
        ]
      };
      var myChart = echarts.init(document.getElementById("kline"));
      myChart.clear(option);
      myChart.setOption(option, true);
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
  padding: 1.3rem 0 1.5rem;
  overflow: auto;

  .main {
    .top_info {
      background: #1a212a;
      padding: 0.4rem 4% 0.4rem;
      > div {
        overflow: hidden;
      }
      > div:first-child {
        padding-bottom: 0.3rem;
        font-size: 0.4rem;
      }
    }
    .k_sort {
      padding: 0.2rem 4% 0.2rem;
      background: #151a21;
      > span {
        display: inline-block;
        margin-right: 0.5rem;
        line-height: 0.7rem;
      }
      > select {
        background: #151a21;
        color: white;
        height: 0.7rem;
        width: 2rem;
      }
    }
    .chart_div {
      margin-top: 0.2rem;
      height: 9rem;
    }
    .order_div {
      background: #12161c;
      margin-top: 0.2rem;
      .tab_div {
        padding: 0 4% 0;
        background: #1a212a;
        margin-bottom: 1px;
        > span {
          padding: 0.3rem 0.1rem 0.3rem;
          display: inline-block;
          margin-right: 0.4rem;
          color: #b9b9c1;
          border-bottom: 2px solid transparent;
        }
        > span.active {
          color: #f0b90b;
          border-bottom: 2px solid #f0b90b;
        }
      }
      .bs_info {
        padding: 0 2% 0;
        display: flex;
        position: relative;
        .total {
          float: right;
        }
        > .line {
          position: absolute;
          height: 100%;
          width: 1px;
          background: #282828;
          left: 50%;
          top: 0;
        }
        > div {
          flex: 1;
          > div {
            line-height: 1.1rem;
            color: #b9b9c1;
            border-bottom: 1px solid #282828;
            padding: 0 0.2rem 0;
          }
          ul {
            padding: 0.2rem;
            li {
              overflow: hidden;
              > span {
                padding: 0.1rem 0 0.1rem;
              }
            }
          }
        }
      }
    }
  }

  .top {
    background: #1a212a;
  }
  table {
    background: #1a212a;
  }
  thead {
    background: #161d26;
    tr {
      th {
        text-align: center;
        color: #8f8f9b;
      }
      th:last-child {
        padding-right: 0.5rem;
      }
    }
  }
  tbody {
    tr {
      td {
        text-align: center;
        color: #8f8f9b;
        border-bottom: 1px solid #2a333e;
      }
      td:last-child {
        padding-right: 0.5rem;
      }
    }
    > tr:last-child {
      td {
        border-bottom: 0;
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
      display: flex;
      > .btn {
        flex: 1;
        text-align: center;
        font-size: 0.48rem;
        line-height: 1.1rem;
      }

      > .btn:first-child {
        background: #d40469;
      }
      > .btn:last-child {
        background: #01b782;
      }
    }
  }
}
</style>
