<template>
  <div class="wrap">
    <div class="top">
      <img @click="back" class="back_img" src="../assets/nav_back.png" alt>
      <div>{{$t('notice.a')}}</div>
    </div>
    <div class="main">
      <van-pull-refresh
        v-model="isLoading"
        :pulling-text="$t('more.a')"
        :loosing-text="$t('more.b')"
        :loading-text="$t('more.c')"
        @refresh="onRefresh"
      >
        <ul
          v-infinite-scroll="loadMore"
          infinite-scroll-disabled="loading"
          infinite-scroll-distance="10"
          infinite-scroll-immediate-check="false"
        >
          <li v-for="(item,index) in list" :key="index" @click="toDetail(item.id)">
            <span class="f_l">【{{item.time}}】{{item.title}}</span>
            <img class="f_r r_img" src="../assets/right1.png" alt>
          </li>
        </ul>
        <load-more v-if="lif" :show-loading="load" :tip="$t('more.c')"></load-more>
        <load-more v-if="nif" :show-loading="none" :tip="$t('more.d')"></load-more>
      </van-pull-refresh>
    </div>
  </div>
</template>
<script>
import { PullRefresh } from "vant";
import { LoadMore } from "vux";

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
    LoadMore,
    "van-pull-refresh": PullRefresh
  },
  mounted() {
    let that = this;
    mui.back = function() {
      that.$router.back();
      error;
    };
    that.getlist();
  },
  methods: {
    back() {
      let that = this;
      that.$router.back();
    },
    onRefresh() {
      let that = this;
      that.isLoading = true;
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
    getlist(type) {
      let that = this;
      if(type){
        that.lif = true;
      }
      that
        .$http({
          url: "/news/NewsListPage",
          method: "post",
          data: {
            token: that.$store.state.user_info.token,
            p: that.page
          }
        })
        .then(function(res) {
          that.isLoading = false;
          that.lif = false;
          if (res.data.code == 1) {
            if (res.data.data.list != "") {
              that.list = that.list.concat(res.data.data.list);
            } else {
              that.loading = true;
              that.nif = true;
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
    toDetail(id) {
      this.$router.push({
        name: "noticedetail",
        params: {
          i: id
        }
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
  padding: 1.3rem 0 0;
  .top {
    background: #1a212a;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
  }
  .main {
    box-sizing: border-box;
    height: 100%;
    ul {
      background: #1a212a;
      li {
        overflow: hidden;
        padding: 0.2rem 4% 0.2rem;
        line-height: 0.7rem;
        border-bottom: 1px solid #242424;
        .f_l {
          width: calc(100% - 1rem);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .r_img {
          width: 0.7rem;
        }
      }
    }
    .bot {
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      .btn {
        display: block;
        width: 6rem;
        text-align: center;
        background: #ba9870;
        color: white;
        line-height: 0.9rem;
        border-radius: 20px;
        margin: 0.6rem auto 0;
      }
      div {
        font-size: 0.32rem;
        padding: 0.6rem 0 0.6rem;
      }
    }
  }
}
</style>
