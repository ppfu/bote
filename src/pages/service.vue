<template>
  <div class="wrap">
    <div class="top">
      <img @click="back" class="back_img" src="../assets/nav_back.png" alt>
      <tab
        class="tab top_tab"
        :line-width="2"
        bar-active-color="#f0b90b"
        active-color="#f0b90b"
        :scroll-threshold="5"
      >
        <tab-item selected @click.native="navTap(0)">{{$t('service.title.t1')}}</tab-item>
        <tab-item @click.native="navTap(1)">{{$t('service.title.t2')}}</tab-item>
      </tab>
    </div>
    <router-view name="child" class="child"></router-view>
  </div>
</template>
<script>
import $ from "jquery";
import { Tab, TabItem } from "vux";

export default {
  data() {
    return {};
  },
  components: {
    Tab,
    TabItem
  },
  mounted() {
    let that = this;
    mui.back = function() {
      that.$router.push({
          name:"mine"
      });
      error;
    };
  },
  methods: {
    back() {
      this.$router.push({
          name:"mine"
      });
    },
    navTap(i) {
      if (i == 0) {
        this.$router.push({
          name: "message",
        });
      } else if (i == 1) {
        this.$router.push({
          name: "mymessage",
        });
      }
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
  padding: 1.1rem 0 0;
  overflow: auto;
  .top {
    background: #1a212a;
  }
}
</style>
