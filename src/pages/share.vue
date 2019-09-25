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
        v-model.number="type"
      >
        <tab-item selected @click.native="navTap(0)">{{$t('share.child1.title')}}</tab-item>
        <tab-item @click.native="navTap(1)">{{$t('share.child2.title')}}</tab-item>
        <tab-item @click.native="navTap(2)">{{$t('share.child3.title')}}</tab-item>
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
    return {
      type:0,
    };
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
    this.$nextTick(() => {
      if (this.$store.state.n1) {
        this.type = Number(this.$store.state.n1);
      } else {
        this.type = 0;
      }
    });
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
          name: "myshare",
        });
      } else if (i == 1) {
        this.$router.push({
          name: "mymining",
        });
      } else {
        this.$router.push({
          name: "mycontribute"
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
