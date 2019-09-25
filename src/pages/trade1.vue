<template>
  <div class="wrap" :class="{wrapp:!$store.state.bshow}">
    <div class="top">
      <div class="look_detail" @click="showPopup">
        <img src="../assets/details.png" />
        <!-- <span>{{curr_name}}</span> -->
      </div>
      <!-- 左侧弹出层 切换币种 -->
      <div class="currency">
        <van-popup v-model="show" position="left" get-container="#app" :style="{ width: '60%', height: '100%' }">
          <h4>BAUD</h4>
          <div class="curr_con">
            <div v-for="(item,index) in currencyList" :key="item.index" @click="choiceCu(item)" class="curr_list">
              <span>{{item.name}}</span>
              <span>{{item.price}}</span>
            </div>
          </div>
        </van-popup>
      </div>
    </div>
    <div class="t_content">
      <div class="deal_content">
        <div class="deal_left">
          <button-tab v-model="type2">
            <button-tab-item @click.native="navTap(0)" selected>{{$t('trade.btn.b1')}}</button-tab-item>
            <button-tab-item @click.native="navTap(1)">{{$t('trade.btn.b2')}}</button-tab-item>
          </button-tab>
          <div v-if="type2==0">
            <select v-model="price_type" class="selectpicker" @change="selectChange($event)">
              <option value="1">{{$t('trade.select.s1')}}</option>
              <option value="2">{{$t('trade.select.s2')}}</option>
            </select>
            <div class="deal_form">
              <!-- 限价 -->
              <div class="form_mun" v-if="price_type == 1">
                <div class="form_list">
                  <x-number :fillable="true" v-model="price_d" :min="0" width="2.1rem" :step="0.5" @on-change="change"></x-number>
                </div>
                <span>≈ ¥{{price_rm}}</span>
              </div>
              <!-- 市价-->
              <div class="form_mun" v-if="price_type == 2">
                <div class="form_list">
                  <x-number :min="price_d" :max="price_d" v-model="price_d" width="2.1rem" :step="0.5"></x-number>
                </div>
                <span>≈ {{price.price_new_cny}}</span>
              </div>
              <div class="form_list form_input">
                <span class="s_left">{{$t('trade.child2.list.t3')}}</span>
                <input type="text" v-model="bt_number" @input="OnInput($event)" placeholder="" />
                <span class="s_right">{{currency.a}}</span>
              </div>
              <div class="form_range">
                <div class="choices">
                  <button class="btn" @click="percent('0.25')">25%</button>
                  <button class="btn" @click="percent('0.5')">50%</button>
                  <button class="btn" @click="percent('0.75')">75%</button>
                  <button class="btn" @click="percent('1')">100%</button>
                </div>
              </div>
              <div class="form_info">
                <div class="list_info">
                  <span>{{$t('trade.child2.list.t8')}}</span>
                  <span>{{b}}{{currency.b}}</span>
                </div>
                <div class="list_info">
                  <span>{{$t('trade.child2.list.t9')}}</span>
                  <span>{{usdt_mumber}}{{currency.b}}</span>
                </div>
              </div>
              <div class="submit_b">
                <button @click="show_buy">{{$t('trade.btn.b1')}}</button>
              </div>
            </div>
          </div>
          <div v-if="type2 == 1">
            <select v-model="price_type" class="selectpicker" @change="selectChange($event)">
              <option value="1">{{$t('trade.select.s1')}}</option>
              <option value="2">{{$t('trade.select.s2')}}</option>
            </select>
            <div class="deal_form">
              <!-- 限价 -->
              <div class="form_mun" v-if="price_type == 1">
                <div class="form_list">
                  <x-number :fillable="true" v-model="price_d" :value="price_d" :min="0" width="2.1rem" :step="0.5"
                    @on-change="change"></x-number>
                </div>
                <span>≈ ¥{{price_rm}}</span>
              </div>
              <!-- 市价-->
              <div class="form_mun" v-if="price_type == 2">
                <div class="form_list">
                  <x-number :min="price_d" :max="price_d" v-model="price_d" :value="price_d" width="2.1rem" :step="0.5"></x-number>
                </div>
                <span>≈ {{price.price_new_cny}}</span>
              </div>
              <div class="form_list form_input">
                <span class="s_left">{{$t('trade.child2.list.t3')}}</span>
                <input type="text" v-model="bt_number" @input="OnInput($event)" placeholder="" />
                <span class="s_right">{{currency.a}}</span>
              </div>
              <div class="form_range">
                <!-- <range style="position: relative; margin-right: 0; margin-left: 0;" v-model="data3" @on-change="onChange"></range>
                <span class="jindu"></span>
                <span class="jindu2"></span>
                <span class="jindu3"></span>
                <span class="jindu4"></span>
                <span class="jindu5"></span>
                <span class="percent">{{data3}}%</span>
                <span class="percent2">100%</span> -->
                <div class="choices">
                  <button class="btn" @click="percent('0.25')">25%</button>
                  <button class="btn" @click="percent('0.5')">50%</button>
                  <button class="btn" @click="percent('0.75')">75%</button>
                  <button class="btn" @click="percent('1')">100%</button>
                </div>
              </div>
              <div class="form_info">
                <div class="list_info">
                  <span>{{$t('trade.child2.list.t8')}}</span>
                  <span>{{a}}{{currency.a}}</span>
                </div>
                <div class="list_info">
                  <span>{{$t('trade.child2.list.t9')}}</span>
                  <span>{{usdt_mumber}}{{currency.b}}</span>
                </div>
              </div>
              <div class="submit_b">
                <button @click="show_sell">{{$t('trade.btn.b2')}}</button>
              </div>
            </div>
          </div>
        </div>
        <div class="deal_right">
          <div class="right_title">
            <div class="title_money">
              <span class="big_text">{{t_info.price_new}}</span>
              <span class="s_text">≈ ¥{{t_info.price_new_cny}}</span>
            </div>
            <div class="tubiao" @click="showK"><img src="../assets/biao.png"></div>
          </div>
          <div class="deal_list">
            <div class="or_title">
              <span>{{$t('trade.child3.list.t2')}}</span>
              <span>{{$t('trade.child2.list.t2')}}</span>
              <span>{{$t('trade.child2.list.t3')}}</span>
            </div>
            <div class="or_list">
              <div class="deal_sell" v-for="(sellitem,index) in sellList" :key="sellitem.index">
                <span style="color: #01B782;">{{$t('trade.child2.list.u2')}}{{sellList.length - index}}</span>
                <span>{{sellitem.price}}</span>
                <span>{{sellitem.number}}</span>
              </div>
            </div>
            <div class="or_line"><span></span></div>
            <div class="or_list">
              <div class="deal_sell" v-for="(buyitem,index) in buyList" :key="buyitem.index">
                <span style="color: #E12961;">{{$t('trade.child2.list.u1')}}{{index+1}}</span>
                <span>{{buyitem.price}}</span>
                <span>{{buyitem.number}}</span>
              </div>
            </div>
            </table>
          </div>
          <!-- <div class="lable_tag">
            <van-tag  color="#FFFFFF">0{{$t('trade.child2.list.u3')}}</van-tag>
            <van-tag  color="#FFFFFF">2{{$t('trade.child2.list.u3')}}</van-tag>
            <van-tag  color="#FFFFFF">4{{$t('trade.child2.list.u3')}}</van-tag>
          </div> -->
        </div>
      </div>
      <div class="entrust">
        <tab class="tab" :line-width="2" bar-active-color="#f0b90b" active-color="#f0b90b" :scroll-threshold="5"
          v-model="type1">
          <tab-item @click.native="navTapEn(0)">{{$t('trade.child1.ent.e1')}}</tab-item>
          <tab-item @click.native="navTapEn(1)">{{$t('trade.child1.ent.e2')}}</tab-item>
        </tab>

        <div v-if="type1 == 0">
          <div class="scroll_div">
            <van-pull-refresh v-model="updateLoading" :pulling-text="$t('more.a')" :loosing-text="$t('more.b')"
              :loading-text="$t('more.c')" @refresh="onRefresh">
              <van-list v-model="moreloading" :finished="finished" :immediate-check="true" :finished-text="$t('more.e')"
                @load="onLoad">
                <div class="entrust_list">
                  <div>
                    <table style="border-collapse:collapse;">
                      <tr class="or_title">
                        <th>{{$t('trade.child1.ent.e3')}}</th>
                        <!-- <th>{{$t('trade.child1.ent.e4')}}</th> -->
                        <th>{{$t('trade.child1.ent.e5')}}</th>
                        <th>{{$t('trade.child1.ent.e8')}}</th>
                        <th>{{$t('trade.child1.ent.e6')}}</th>
                        <th>{{$t('trade.child1.ent.e9')}}</th>
                        <th>{{$t('trade.child2.list.t4')}}</th>
                      </tr>
                      <tr v-for="(tradeitem,index) in tradeList" :key="tradeitem.index" v-if=" type2 == 0 && tradeitem.trade_type == 2">
                        <td>{{tradeitem.start_time}}</td>
                        <!--  <td>{{tradeitem.cur}}</td> -->
                        <!-- <td   :class="[tradeitem.trade_type_value =='买入' ? 'f_c_red':'f_c_green']">{{tradeitem.trade_type_value}}</td> -->
                        <td :class="'f_c_red'">{{$t('trade.btn.b1')}}</td>
                        <td>{{tradeitem.trade_number}}</td>
                        <td>{{tradeitem.all_number}}</td>
                        <td>{{tradeitem.price}}</td>
                        <td style="color: #01B782;"  @click="showRepeal(tradeitem.id)">{{$t('trade.child2.btn.b1')}}</td>
                      </tr>
                    </table>
                  </div>
                </div>
                 </van-list>
                  </van-pull-refresh>
                </div>
          </div>
          <div v-if="type1 == 1" class="tab-swiper vux-center">
             <div class="scroll_div">
              <!-- <van-pull-refresh v-model="isLoading" :pulling-text="$t('more.a')" :loosing-text="$t('more.b')" :loading-text="$t('more.c')"
                      @refresh="onRefresh">
                      <div class="div" v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="10"
                        infinite-scroll-immediate-check="false"> -->
              <van-pull-refresh v-model="updateLoading" :pulling-text="$t('more.a')" :loosing-text="$t('more.b')"
                :loading-text="$t('more.c')" @refresh="onRefresh">
                <van-list v-model="moreloading" :finished="finished" :immediate-check="true" :finished-text="$t('more.e')"
                  @load="onLoad">
            <div class="entrust_list">
              <div>
                <table style="border-collapse:collapse;">
                  <tr class="or_title">
                    <th>{{$t('trade.child1.ent.e3')}}</th>
                    <!--  <th>{{$t('trade.child1.ent.e4')}}</th> -->
                    <th>{{$t('trade.child1.ent.e5')}}</th>
                    <th>{{$t('trade.child1.ent.e8')}}</th>
                    <th>{{$t('trade.child1.ent.e6')}}</th>
                    <th>{{$t('trade.child1.ent.e9')}}</th>
                    <th v-if="type2== 1">{{$t('trade.child1.sell.l7')}}</th>
                  </tr>
                  <tr v-for="(tradeitem,index) in tradeList" :key="tradeitem.index" v-if="type2 == 1 && tradeitem.trade_type == 1">
                    <td>{{tradeitem.start_time}}</td>
                    <!-- <td>{{tradeitem.cur}}</td> -->
                    <td :class="'f_c_green'">{{$t('trade.btn.b2')}}</td>
                    <td>{{tradeitem.trade_number}}</td>
                    <td>{{tradeitem.all_number}}</td>
                    <td>{{tradeitem.price}}</td>
                    <td>{{fee}}</td>
                  </tr>
                </table>
              </div>
            </div>
              </van-list>
              </van-pull-refresh>
            </div>
          </div>
      <!--  </div>
        <load-more v-if="lif" :show-loading="load" :tip="$t('more.c')"></load-more>
        <load-more v-if="nif" :show-loading="none" :tip="$t('more.d')"></load-more>
        </van-pull-refresh>
      </div> -->
    </div>
  </div>
  <!-- 买入 -->
  <x-dialog v-model="Blang_dlg" class="de_dialog lang_dialog" hide-on-blur>
    <div class="dialog_buy">
      <div class="head_dlg">
        <span>{{$t('trade.btn.b1')}}{{currency.a}}</span>
        <span class="close_dlg" @click="closeBlang"><img src="../assets/close.png"></span>
      </div>
      <div class="info_dlg">
        <div class="info_list">
          <span>{{$t('trade.child1.buy.l2')}}：</span>
          <span>{{price_d}}</span>
        </div>
        <div class="info_list">
          <span>{{$t('trade.child1.buy.l4')}}：</span>
          <span>{{bt_number}}</span>
        </div>
        <div class="info_list">
          <span>{{$t('trade.child1.buy.l6')}}：</span>
          <input type="password" v-model="password" :placeholder="$t('trade.child1.buy.i3')" />
        </div>
      </div>
      <div class="but_dlg">
        <button @click="deal">{{$t('trade.child2.list.u4')}}</button>
        <button @click="closeBlang">{{$t('trade.child2.list.u5')}}</button>
      </div>
    </div>
  </x-dialog>
  <!-- 卖出 -->
  <x-dialog v-model="Slang_dlg" class="de_dialog lang_dialog" hide-on-blur>
    <div class="dialog_buy">
      <div class="head_dlg">
        <span>{{$t('trade.btn.b2')}}{{currency.a}}</span>
        <span class="close_dlg" @click="closeSlang"><img src="../assets/close.png"></span>
      </div>
      <div class="info_dlg">
        <div class="info_list">
          <span>{{$t('trade.child1.sell.l2')}}：</span>
          <span>{{price_d}}</span>
        </div>
        <div class="info_list">
          <span>{{$t('trade.child1.sell.l3')}}：</span>
          <span>{{bt_number}}</span>
        </div>
        <div class="info_list">
          <span>{{$t('trade.child1.sell.l7')}}：</span>
          <span>{{fee}}</span>
        </div>
        <div class="info_list">
          <span>{{$t('trade.child1.sell.l6')}}：</span>
          <input type="password" v-model="password" :placeholder="$t('trade.child1.sell.i3')" />
        </div>
      </div>
      <div class="but_dlg">
        <button @click="deal">{{$t('trade.child2.list.u4')}}</button>
        <button @click="closeSlang">{{$t('trade.child2.list.u5')}}</button>
      </div>
    </div>
  </x-dialog>
  <!-- 确定撤销 -->
  <x-dialog v-model="lang_dlg" class="de_dialog lang_dialog" hide-on-blur>
    <div class="dialog_buy dialog">
      <div class="head_dlg">
        <span>{{$t('trade.child2.btn.b1')}}</span>
        <span class="close_dlg" @click="closelang"><img src="../assets/close.png"></span>
      </div>
      <p>{{$t('trade.child1.ent.e7')}}?</p>
      <div class="but_dlg">
        <button @click="repeal">{{$t('trade.child2.list.u4')}}</button>
        <button @click="closelang">{{$t('trade.child2.list.u5')}}</button>
      </div>
    </div>
  </x-dialog>

  </div>
</template>
<script>
  import $ from "jquery";
  import {
    Tab,
    TabItem,
    ButtonTab,
    ButtonTabItem,
    XNumber,
    Range,
    Toast,
    LoadMore,
    XDialog
  } from "vux";
  import {
    Stepper,
    Tag,
    Button,
    Popup,
    PullRefresh,
    List
  } from 'vant';
  export default {
    data() {
      return {
        lang_dlg: false, //撤销
        Blang_dlg: false, //买入
        Slang_dlg: false, //卖出
        type2: 0, //买入、卖出
        fillable: true,
        value: 1, //价格加减
        type1: 0, // 未完成委托，已完成委托
        show: false, //左侧弹出层\
        curr_name: '',
        currencyList: [],
        t_info: [],
        price_d: 0.00, //a价格
        price_rm: 0, //限价时人民币价格
        price_new: 0, //市价时价格
        bt_number: 0, //数量
        a: '', //当前用户币a的数量
        b: '', //当前用户币b的数量
        usdt_mumber: 0,
        price_type: 1,
        options: [{
            //价格类型
            id: 1,
            name: "限价"
          },
          {
            id: 2,
            name: "市价"
          }
        ],
        cur_id: '',
        cur_id_a: '',
        cur_id_b: '',
        currency: '', //交易币名称
        user_money: '', //当前用户币a的数量
        price: '', //a/b交易价格
        a_cny: '', //币a对人民币价格
        password: '',
        sellList: [], //卖出挂单列表
        fallIndex: '', //倒叙
        buyList: [], //卖出挂单列表
        trade_status: '', //交易状态
        tradeList: [], //挂单列表
        tradeTotal:0, //挂单总数
        pageindex: 1,
        order_id: '', //挂单id
        fee: '', //手续费
     updateLoading: false, //下拉刷新
     moreloading: false, // 加载更多
     finished: false, // 全部加载

      };
    },
    components: {
      Tab,
      TabItem,
      ButtonTab,
      ButtonTabItem,
      XNumber,
      Range,
      Toast,
      LoadMore,
      XDialog,
      [Stepper.name]: Stepper,
      [Tag.name]: Tag,
      [Button.name]: Button,
      [Popup.name]: Popup,
      [PullRefresh.name]: PullRefresh,
      [List.name]: List
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
      this.$nextTick(() => {
        if (this.$route.params.type) {
          this.type = Number(this.$route.params.type);
        } else {
          this.type = 0;
        }
      });
      that.cur_id_a = that.$store.state.trade_a;
      that.cur_id_b = that.$store.state.trade_b;

      that.getTradeInfo();
      // that.getInfo();
      that.getTradeList();
      that.getCurrencyList();
      window.t = setInterval(that.getInfo, 2000);
    },
    methods: {
      //选择
      selectChange(i) {
        let that = this;
        that.bt_number = 0;
        that.usdt_mumber = 0;
        that.price_type = Number(i.target.value);
        if (that.price_type == 1) {
          that.price_d = 0;
        } else if (that.price_type == 2) {
          that.price_d = Number(that.price_new);
          console.log(that.price_new)
        }
      },
      //监听价格
      change(e) {
        let that = this;
        // 通过正则过滤小数点后两位
        e !== 0.00;
        e = e.toString();
        if (e != "" && e.key == '.' && -1 == e.indexOf('.')) {
          //兼容火狐，数字输入框输入点 value 值自动隐藏‘.’，再进行正则会丢失‘.’
          return
        }
        if (e.toString() !== (e.match(/^\d*(\.?\d{0,2})/g)[0])) {
          e = (e.match(/^\d*(\.?\d{0,2})/g)[0]) || null;
          that.price_d = Number(e);
        }
        that.price_rm = (that.price_d * that.a_cny).toFixed(2);
        if (that.type2 == 0) {
          that.bt_number = (Number(that.b) / that.price_d).toFixed(5);
          if (that.price_d == '') {
            that.bt_number = 0;
          }
        }
        if (that.type2 == 1) {
          var percent = that.fee; //申明要放在函数前
          function toPoint(percent) {
            var str = percent.replace("%", "");
            str = str / 100;
            return str;
          }
          toPoint(percent);
          var result = toPoint(percent);
          that.usdt_mumber = Number(that.price_d) * (1 - result) * Number(that.bt_number);
          that.usdt_mumber = (that.usdt_mumber).toFixed(5)
        }

      },
      //监听input输入
      OnInput(e) {
        let that = this;
        console.log(e.target.value)
        if (e.target.value != "" && e.key == '.' && -1 == e.target.value.indexOf('.')) {
          //兼容火狐，数字输入框输入点 value 值自动隐藏‘.’，再进行正则会丢失‘.’
          return
        }
        if (e.target.value.toString() !== (e.target.value.match(/^\d*(\.?\d{0,5})/g)[0])) {
          e.target.value = (e.target.value.match(/^\d*(\.?\d{0,5})/g)[0]) || null;

          that.bt_number = Number(e.target.value);
        }

        //百分号转换为小数点
        var percent = that.fee; //申明要放在函数前
        function toPoint(percent) {
          var str = percent.replace("%", "");
          str = str / 100;
          return str;
        }
        toPoint(percent);
        var result = toPoint(percent);
        that.usdt_mumber = Number(that.price_d) * (1 - result) * Number(that.bt_number);
        that.usdt_mumber = (that.usdt_mumber).toFixed(5)
        console.log(that.bt_number)
      },
      //监听滑块
      //       onChange(val) {
      //         // console.log('change', val)
      //         let that = this;
      //         // console.log(that.type)
      //         that.data3 = val;
      //         if (that.type2 == 0) {
      //           that.bt_number = (Number(that.b) * (that.data3) / 100).toFixed(5);
      //           // console.log(that.bt_number)
      //         }
      //         if (that.type2 == 1) {
      //           that.bt_number = (Number(that.a) * (that.data3) / 100).toFixed(5);
      //
      //           }
      //
      //
      //       },
      percent(x) {
        let that = this;
        if (that.type2 == 0) {
          that.bt_number = parseFloat(Number(that.b) * parseFloat(x)).toFixed(5);
          // console.log(that.bt_number)
        }
        if (that.type2 == 1) {
          that.bt_number = parseFloat(Number(that.a) * parseFloat(x)).toFixed(5);
          //百分号转换为小数点
          var percent = that.fee; //申明要放在函数前
          function toPoint(percent) {
            var str = percent.replace("%", "");
            str = str / 100;
            return str;
          }
          toPoint(percent);
          var result = toPoint(percent);
          that.usdt_mumber = Number(that.price_d) * (1 - result) * Number(that.bt_number);
          that.usdt_mumber = (that.usdt_mumber).toFixed(5)
          console.log(that.bt_number)
        }

        // that.s_num = (parseFloat(that.max_sell_num) * parseFloat(x)).toFixed(5);
      },
      //显示交易对列表
      showPopup() {
        let that = this;
        that.show = true;
      },
      //选择交易对
      choiceCu(item) {
        let that = this;
        that.curr_name = item.name;
        that.$store.state.trade_a = item.cur_id_a;
        that.$store.state.trade_b = item.cur_id_b;
        that.show = false;
      },
      // 前往k线图页面
      showK() {
        let that = this;
        that.$router.push({
          path: "/bsMarket"
        });
      },

      //获取交易页面信息
      getTradeInfo() {
        let that = this;
        that
          .$http({
            url: "/transaction_new/get_trade_info",
            method: "post",
            data: {
              token: that.$store.state.user_info.token,
            }
          })
          .then(function(res) {
            if (res.data.code == 1) {
              //成功回调
              that.currency = res.data.data.currency;
              that.curr_name = that.currency.a + "/" + that.currency.b;
              that.cur_id = res.data.data.cur_id;
              that.cur_id_a = that.cur_id.a;
              that.cur_id_b = that.cur_id.b;
              that.fee = res.data.data.fee;
              that.$store.state.trade_a = that.cur_id_a;
              that.$store.state.trade_b = that.cur_id_b;
              that.user_money = res.data.data.user_money;
              that.a = that.user_money.a;
              that.a = Number(that.a).toFixed(5)
              that.b = that.user_money.b;
              that.b = Number(that.b).toFixed(5)
              that.price = res.data.data.price;
              that.$store.state.active_trade = that.price;
              that.a_cny = that.price.a_cny;
              that.price_new = that.price.price_new;
              that.sellList = res.data.data.trade.sell;
              $.each(that.sellList, function(i, item) {
                item.number = parseFloat(item.number).toFixed(5)
                // jsonSell.push({
                //   id: item.id,
                //   name: item.name
                // }); //数组对象
              });
              // that.sellList = seill.reverse();
              // console.log(that.sellList)
              that.buyList = res.data.data.trade.buy;
            } else {
              //失败
              that.$vux.toast.show({
                text: res.data.msg,
                type: "text",
                position: "middle",
                time: 1200
              });
            }
          });
      },
      getInfo() {
        let that = this;
        that.cur_id_a = that.$store.state.trade_a;
        that.cur_id_b = that.$store.state.trade_b;
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
            // console.log(res)
            if (res.data.code == 1) {
              that.t_info = res.data.data.market;
              // console.log(res)
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
      //买入卖出
      deal() {
        let that = this;
        var type_d = that.type2 == 0 ? 2 : 1;
        if (!that.price_d || that.price_d == 0) {
          that.$vux.toast.show({
            text: "请输入价格",
            type: "text",
          });
        } else if (!that.bt_number || that.bt_number == 0) {
          that.$vux.toast.show({
            text: "请输入购买数量",
            type: "text",
          });
        } else if (!that.password || that.password == null) {
          that.$vux.toast.show({
            text: "密码不能为空",
            type: "text",
          });
        } else {
          that
            .$http({
              url: "/transaction/do_trade",
              method: "post",
              data: {
                token: that.$store.state.user_info.token,
                type: type_d,
                cur_id_a: that.cur_id_a,
                cur_id_b: that.cur_id_b,
                price: that.price_d,
                number: that.bt_number,
                pwd: that.password
              }
            })
            .then(function(res) {
              if (res.data.code == 1) {
                //成功回调
                that.getTradeInfo();
                that.$vux.toast.show({
                  text: res.data.msg,
                  type: "text",
                  position: "middle",
                  time: 1200
                });

                that.password = '';
              } else {
                //失败
                that.$vux.toast.show({
                  text: res.data.msg,
                  type: "text",
                  position: "middle",
                  time: 1200
                });
              }
            })
        }

      },
      //获取虚拟币交易对列表
      getCurrencyList() {
        let that = this;
        that
          .$http({
            url: "transaction_new/get_currency_list",
            method: "post",
            data: {
              token: that.$store.state.user_info.token,
            }
          })
          .then(function(res) {
            if (res.data.code == 1) {
              //成功回调
              that.currencyList = res.data.data;
              console.log(that.currencyList)
            } else {
              //失败
              that.$vux.toast.show({
                text: res.data.msg,
                type: "text",
                position: "middle",
                time: 1200
              });
            }
          })
      },
      //买入弹窗
      show_buy() {
        let that = this;
        that.Blang_dlg = true;

      },
      //关闭买入弹窗
      closeBlang() {
        let that = this;
        that.Blang_dlg = false;
        that.password = '';
      },
      //卖出弹窗
      show_sell() {
        let that = this;
        that.Slang_dlg = true;
      },
      //关闭卖出弹窗
      closeSlang() {
        let that = this;
        that.Slang_dlg = false;
        that.password = '';
      },
      navTap(i) {
        let that = this;
        that.type2 = i;
        that.price_d = 0;
        that.bt_number = 0;
        // if (i == 0) {
        //  that.bt_number = parseFloat(Number(that.b) * parseFloat(x)).toFixed(5);
        // } else if (i == 1) {
        //   that.bt_number = parseFloat(Number(that.a) * parseFloat(x)).toFixed(5);
        //   }
        //百分号转换为小数点
        var percent = that.fee; //申明要放在函数前
        function toPoint(percent) {
          var str = percent.replace("%", "");
          str = str / 100;
          return str;
        }
        toPoint(percent);
        var result = toPoint(percent);
        that.usdt_mumber = Number(that.price_d) * (1 - result) * Number(that.bt_number);
        console.log(that.usdt_mumber)


      },
      navTapEn(i) {
        let that = this;
        that.type1 = i;
        that.updateLoading = false;
        that.moreloading = false;
        that.finished = false;
        that.pageindex = 1;
        that.tradeList = [];
        that.getTradeList(1);
      },
      // 下拉刷新
      onRefresh() {
        let that = this;
       that.updateLoading = true;
       that.moreloading = false;
       that.finished = false;
        that.pageindex = 1;
        that.tradeList = [];
        that.tradeTotal = 0;
        that.getTradeList(0);
      },
      //上拉加载更多
      onLoad() {
        let that = this;
        that.pageindex += 1;
        that.moreloading = true;
        that.getTradeList(1);
      },
      //获取我的挂单列表(委托)
      getTradeList(i) {
        let that = this;
        that.trade_status = that.type1 == 0 ? 2 : 1;
        that
          .$http({
            url: "/transaction_new/get_my_trade_list",
            method: "post",
            data: {
              token: that.$store.state.user_info.token,
              trade_status: that.trade_status,
              page: that.pageindex
            }
          })
          .then(function(res) {
            if (res.data.code == 1) {
              //成功回调
              if(i == 0){
                if (res.data.data != "") {
                  that.tradeList = res.data.data;
                } else {
                  that.finished = true;
                }
                that.updateLoading = false;
              }else{
                that.moreloading = false;
                if (res.data.data != "") {
                  that.tradeList = that.tradeList.concat(res.data.data);
                } else {
                  that.finished = true;
                }
              }

              //      if (i == 0) {
              //   if (res.data.data.length > 0) {
              //     that.tradeList = res.data.data;
              //     that.tradeTotal = res.data.total;
              //     if (that.detailList.length >= that.detailTotal) {
              //       //全部数据已加载
              //       that.finished = true;
              //     }
              //   } else {
              //     that.finished = true;
              //   }
              //   that.updateLoading = false;
              // } else {
              //   that.moreloading = false;
                // if (res.data.data.data.length > 0) {
                //   that.detailList = that.detailList.concat(res.data.data.data);
                //   that.detailTotal = res.data.data.total;
                //   // console.log(res.data.data.total)
                // } else {
                //   that.finished = true;
                // }
                // if (that.detailList.length >= that.detailTotal) {
                //   //全部数据已加载
                //   that.finished = true;
                // }
              // }
              // that.tradeList = res.data.data;
              // console.log(that.tradeList)
            } else {
              //失败
              that.$vux.toast.show({
                text: res.data.msg,
                type: "text",
                position: "middle",
                time: 1200
              });
            }
          })
      },
      //关闭撤销弹窗
      closelang() {
        let that = this;
        that.lang_dlg = false;
      },
      //撤销弹窗
      showRepeal(id) {
        let that = this;
        that.order_id = id;
        that.lang_dlg = true;
      },
      //撤销挂单
      repeal() {
        let that = this;
        that
          .$http({
            url: "transaction_new/set_trade_cancel",
            method: "post",
            data: {
              token: that.$store.state.user_info.token,
              id: that.order_id
            }
          })
          .then(function(res) {
            if (res.data.code == 1) {
              //成功回调
              that.getTradeList(0);
              that.$vux.toast.show({
                text: res.data.msg,
                type: "text",
                position: "middle",
                time: 1200
              });

              that.lang_dlg = false;
            } else {
              //失败
              that.$vux.toast.show({
                text: res.data.msg,
                type: "text",
                position: "middle",
                time: 1200
              });
            }
          })
      }

    }
  };
</script>
<style lang="less" scoped="scoped">
  .wrap {
    font-size: 0.36rem;
    width: 100%;
    height: 100%;
    color: white;
    box-sizing: border-box;
    padding: 1.3rem 0 1.5rem;
    overflow: scroll;

    .top {
      background: #1a212a;


      .look_detail {
        display: flex;
        // flex-direction: row;
        height: 1.1rem;
        align-items: center;
        padding-left: 0.2rem;

        img {
          display: inline-block;
          width: 0.46rem;
          height: 0.46rem;
        }

        span {
          font-size: 0.4rem;
          padding-left: 0.2rem;
          color: #f0b90b;
          display: inline-block;

        }
      }

      .currency {
        // width: 100%;
        // height: 100%;
        color: #101010;
        line-height: 0.6rem;

        /deep/ .van-popup--left {
          top: 49%;

          span {
            font-size: 0.4rem;
            text-align: left;
            padding: 0.6rem;
          }

          .curr_con {
            text-align: left;
            padding: 0 0.4rem;
            font-size: 0.36rem;
            font-weight: normal;

            .curr_list {
              display: flex;
              justify-content: space-between;
            }
          }
        }
      }
    }

    .t_content {
      width: 100%;
      height: 100%;

      .deal_content {
        width: 94%;
        margin: 0 auto;
        // margin: 0 0.3%;
        display: flex;
        justify-content: space-between;
        padding-bottom: 0.32rem;
        // border-bottom: 1px solid rgba(255, 255, 255, 0.4);

        .deal_left {
          width: 50%;
          margin: 0 auto;

          .vux-button-group {
            width: 100%;
          }

          .vux-button-group>a.vux-button-group-current {
            background: #f0b90b;
          }

          .vux-button-group>a.vux-button-tab-item-first,
          .vux-button-group>a.vux-button-tab-item-last {
            border-radius: 0.12rem;
            margin: 0 0.04rem;
          }

          .vux-button-group>a.vux-button-tab-item-last:after,
          .vux-button-group>a.vux-button-tab-item-first:after {
            border: 1px solid #f0b90b;
            z-index: 0;
            border-radius: 0.12rem;
          }

          .selectpicker {
            width: 44%;
            height: 0.8rem;
            border-radius: 0.2rem;
            margin-top: 0.4rem;
          }

          .deal_form .form_mun {
            margin: 0.26rem 0;

            /deep/ .weui-cell {
              padding: 0;
              width: 100%;
              height: 0.8rem;
              border: none;

              /deep/ .weui-cell__ft {
                text-align: left;
              }

              /deep/ .vux-cell-primary {
                flex: none;
              }

              /deep/ .vux-number-input {
                height: 0.66rem;
                color: #fff;
              }

              /deep/ .vux-number-selector {
                height: 0.66rem;
                line-height: 0.66rem;
              }

              /deep/ .vux-number-selector-plus {
                margin-right: 0;
                padding: 4px 0.28rem 2px 0.28rem;
                border-radius: 0 0.12rem 0.12rem 0;
              }

              /deep/ .vux-number-selector-sub {
                padding: 4px 0.28rem 2px 0.28rem;
                border-radius: 0.12rem 0 0 0.12rem;
              }
            }

            .form_list {
              border: none;

              .vux-number-input {
                color: #fff;
              }
            }

            span {
              font-size: 0.36rem;
            }
          }


          .deal_form .form_list {
            height: 0.84rem;
            // border: 1px solid #fff;
            margin-bottom: 0.12rem;
            position: relative;
            line-height: 0.84rem;
            border-radius: 0.12rem;
          }

          .deal_form .form_input {
            border: 1px solid #fff;

            input {
              height: 100%;
              width: 60%;
              margin-left: 0.88rem;
              background: none;
              padding: 0 0.22rem;
            }

            .s_left,
            .s_right {
              position: absolute;
            }

            .s_left {
              left: 0.2rem;
              top: 0.014rem;
            }

            .s_right {
              right: 0.2rem;
              top: 0.014rem;
            }
          }


          .form_info {
            margin-top: 0.4rem;

            .list_info {
              display: flex;
              justify-content: space-between;
              padding: 0.1rem 0;
              font-size: 0.38rem;
            }
          }

          .form_range {
            width: 100%;
            margin-top: 0.2rem;
            display: flex;
            flex-direction: column;
            justify-content: center;
            position: relative;

            //             /deep/ .vux-range-input-box {
            //               margin: 0;
            //
            //               /deep/ .range-handle {
            //                 width: 0.48rem;
            //                 height: 0.48rem;
            //                 background: url(../assets/jindu.png) no-repeat;
            //                 background-size: 100% 100%;
            //                 top: -0.22rem !important;
            //                 margin-left: 0.04rem;
            //                 ;
            //                 z-index: 0;
            //               }
            //
            //               /deep/ .range-min {
            //                 display: none;
            //                 // color: #fff;
            //                 // left: 0;
            //                 // width: 0;
            //                 // top: 0.4rem;
            //               }
            //
            //               /deep/ .range-max {
            //                 display: none;
            //                 // color: #fff;
            //                 // right: 0.6rem;
            //                 // width: 0;
            //                 // top: 0.4rem;
            //               }
            //             }
            //
            //             .percent {
            //               position: absolute;
            //               left: 0;
            //               top: 0.8rem;
            //               font-size: 0.36rem;
            //             }
            //
            //             .percent2 {
            //               position: absolute;
            //               right: 0rem;
            //               top: 0.8rem;
            //               font-size: 0.36rem;
            //             }
            //
            //             .jindu,
            //             .jindu2,
            //             .jindu3,
            //             .jindu4 {
            //               position: absolute;
            //               top: 0.4rem;
            //               display: inline-block;
            //               width: 0.08rem;
            //               height: 0.22rem;
            //               background: #fff;
            //               border-radius: 2rem;
            //             }
            //
            //             .jindu {
            //               left: 0;
            //             }
            //
            //             .jindu2 {
            //               right: 0;
            //             }
            //
            //             .jindu3 {
            //               left: 33%;
            //               top: 0.46rem;
            //             }
            //
            //             .jindu4 {
            //               left: 67%;
            //               top: 0.46rem;
            //             }
            .choices {
              display: flex;
              flex-wrap: wrap;

              .btn {
                width: 44%;
                margin: 0.12rem;
                line-height: 0.56rem;
                text-align: center;
                box-sizing: border-box;
                border-radius: 4px;
                //   color: #01b782;
                background: #01b782;
                color: white;
                font-size: 0.38rem;
              }

              .btn.active {
                background: #01b782;
                color: white;
              }
            }
          }

          .submit_b {
            margin-top: 0.4rem;
            text-align: center;

            button {
              width: 100%;
              height: 0.88rem;
              border: none;
              background: #E12961;
              border-radius: 0.06rem;
            }
          }
        }

        .deal_right {
          width: 54%;
          padding-left: 0.26rem;

          .right_title {
            display: flex;
            justify-content: space-between;
            margin-bottom: 0.3rem;

            .title_money {
              display: flex;
              flex-direction: column;
              color: #E12961;

              .big_text {
                font-size: 0.52rem;
              }

              .s_text {
                font-size: 0.34rem;
              }
            }

            .tubiao {
              img {
                width: 0.48rem;
                height: 0.48rem;

              }
            }
          }

          .deal_list {
            width: 100%;

            // display: flex;
            // flex-direction: column;
            // align-items: center;
            .or_title {
              width: 100%;
              display: flex;
              padding: 0.26rem 0;

              span {
                display: inline-block;
                width: 33.334%;
                text-align: center;
                font-size: 0.4rem;
                font-weight: normal;
              }

              span:nth-child(3) {
                text-align: right;
              }
            }

            .or_list {
              .deal_sell {
                display: flex;
                padding-top: 0.16rem;

                span {
                  display: inline-block;
                  width: 33.334%;
                  text-align: center;
                  font-size: 0.38rem;
                }

                span:nth-child(3) {
                  text-align: right;
                }
              }
            }

            .or_line {
              text-align: right;

              // margin-bottom: 0.2rem;
              span {
                display: inline-block;
                width: 4.26rem;
                margin: 0;
                padding: 0;
                height: 1px;
                background: rgba(255, 255, 255, 0.4);
                padding: 0;
              }
            }


          }

          .lable_tag {
            margin-top: 0.4rem;
            display: flex;
            justify-content: space-around;
            font-size: 0.4rem;

            /deep/ .van-tag {
              padding: 0.04rem 0.32rem;
              color: #999;
            }
          }
        }
      }
    }

    .entrust {
      width: 100%;
      height: 4rem;
      margin-top: 0.6rem;
      text-align: center;

      .scroll_div {
        height: 100%;

        overflow-x: scroll;
        overflow-y: scroll;
        margin-bottom: 2rem;

        /deep/ .van-pull-refresh__head {
          top: -0.4rem;
          height: 0.4rem;
          line-height: 0;
        }

        table {
          width: 110%;
          margin: 0 auto;
          overflow: auto;

          tr th {
            padding: 0.32rem 0;
            text-align: center;
            font-weight: normal;
          }

          tr td {
            text-align: center;
            font-size: 0.36rem;
            padding: 0.12rem 0;
          }

          // tr td:nth-child(5) {
          //   color: #0AB480;
          // }
        }
      }
    }

    /deep/ .weui-dialog {
      width: 6rem;
      height: 5.6rem;
      background: #fff;
      border-radius: 0.1rem;

      .dialog_buy {
        width: 100%;
        margin: 0 auto;

        .head_dlg {
          width: 100%;
          height: 0.68rem;
          background: #FDF7E4;
          display: flex;
          justify-content: space-between;
          align-items: center;
          color: #1a212a;
          font-size: 0.2rem;

          span {
            padding: 0 0.2rem;

            img {
              width: 0.36rem;
              height: 0.36rem;
            }
          }
        }

        p {
          color: #1a212a;
          padding: 1rem;
        }

        .info_dlg {
          width: 100%;
          margin-top: 0.3rem;

          .info_list {
            padding: 0.2rem 0.4rem;
            color: #333;
            font-size: 0.14rem;
            display: flex;
            justify-content: space-between;
            align-items: center;

            input {
              height: 0.6rem;
              width: 3.2rem;
              background: none;
              border: 1px solid #D8D8D8;
              border-radius: 0.1rem;
              color: #999;
              padding-left: 0.2rem;
            }

          }
        }


        .but_dlg {
          margin-top: 0.2rem;

          button {
            width: 1.6rem;
            height: 0.66rem;
            margin: 0 0.12rem;
            border-radius: 0.1rem;
            border: none;
          }

          button:nth-child(1) {
            background: #f0b90b;
          }

          button:nth-child(2) {
            background: #999;
          }
        }
      }

    }

  }

  .wrapp {
    padding: 1.3rem 0 0.1rem;
  }
</style>
