<template>
  <div class="wrap1">
    <div class="main1">
      <div class="scroll_div">
        <!-- <van-pull-refresh
          v-model="isLoading"
          pulling-text="下拉刷新"
          loosing-text="释放更新"
          loading-text="努力加载中..."
          @refresh="onRefresh"
        >
          <div
            class="div"
            v-infinite-scroll="loadMore"
            infinite-scroll-disabled="loading"
            infinite-scroll-distance="10"
            infinite-scroll-immediate-check="false"
          > -->
          <div class="div">
            <load-more v-if="list.length==0" :show-loading="false" :tip="$t('service.none')"></load-more>
            <x-table v-if="list.length!=0" :content-bordered="false" :cell-bordered="false">
              <thead>
                <tr>
                  <th>{{$t('service.list.t1')}}</th>
                  <th>{{$t('service.list.t2')}}</th>
                  <th>{{$t('service.list.t3')}}</th>
                  <th>{{$t('service.list.t4')}}</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item,index) in list">
                  <td>{{item.f_type}}</td>
                  <td>
                      <span>{{item.time1}}</span>
                      <span>{{item.time2}}</span>
                  </td>
                  <td>{{item.status}}</td>
                  <td @click="toDetail(item.id)">{{$t('service.btn.b2')}}</td>
                </tr>
              </tbody>
            </x-table>
          </div>
          <!-- <load-more v-if="lif" :show-loading="load" tip="正在加载"></load-more>
          <load-more v-if="nif" :show-loading="none" tip="没有更多数据了"></load-more>
        </van-pull-refresh> -->
      </div>
    </div>
  </div>
</template>
<script>
import $ from "jquery";
import { PullRefresh } from "vant";
import { XTable, LoadMore } from "vux";

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
      isLoading: false
    };
  },
  components: {
    XTable,
    LoadMore,
    "van-pull-refresh": PullRefresh
  },
  mounted() {
    let that = this;
    mui.back = function() {
      that.$router.push({
          name:"mine"
      })
      error;
    };
    that.getlist();
  },
  methods: {
    navTap(i) {
      this.type = i;
    },
    toDetail(id) {
        this.$router.push({
            name:"reply",
            params:{
              id:id
            }
        })
    },
    onRefresh() {
      let that = this;
      that.isLoading = true;
      that.page = 1;
      that.list = [];
      that.getlist();
    },
    loadMore() {
      let that = this;
      that.lif = true;
      that.page++;
      that.getlist();
    },
    getlist() {
      let that = this;
      that
        .$http({
          url: "/user/get_feedback",
          method: "post",
          data: {
            token: that.$store.state.user_info.token
          }
        })
        .then(function(res) {
          if (res.data.code == 1) {
            if(res.data.data.length){
              for(let v of res.data.data){
                v.time1 = v.create_time.split(" ")[0];
                v.time2 = v.create_time.split(" ")[1];
              }
              that.list = res.data.data;
            }
          }else {
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
.wrap1 {
  font-size: 0.36rem;
  width: 100%;
  height: 100%;
  color: white;
  box-sizing: border-box;
  overflow: auto;
  .top {
    background: #1a212a;
  }
  .main1 {
    height: 100%;
    box-sizing: border-box;
    .tab {
      z-index: 999;
      position: fixed;
      width: 100%;
      top: 1.3rem;
      left: 0;
      background: #161d26;
    }
    .scroll_div {
      width: 100%;
      height: 100%;
    }
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
        // font-size: 0.32rem;
      }
       th:last-child{
        padding: 0.3rem 0.2rem 0.3rem 0;
      }
    }
  }
  tbody {
    tr {
      td {
        text-align: center;
        color: #8f8f9b;
        border-bottom: 1px solid #2a333e;
        // font-size: 0.32rem;
        > span {
          display: block;
        }
        > span:first-child {
          padding-bottom: 0.1rem;
        }
        .btn {
          border-radius: 4px;
          color: white;
          line-height: .66rem;
          padding: 0 0.3rem 0;
          background: #f0b90b;
          border-radius: 20px;
        }
      }
      td:last-child{
        padding: 0.3rem 0.2rem 0.3rem 0;
      }
    }
    > tr:last-child {
      td {
        border-bottom: 0;
      }
    }
  }
}
</style>
