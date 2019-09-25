<template>
  <div class="wrap">
    <div class="top">
      <img @click="back" class="back_img" src="../assets/nav_back.png" alt>
      <div>详情</div>
    </div>
    <div class="main">
        <ul>
            <li>
                <span>数量：</span>
                <span class="f_c_red">13300000001</span>
            </li>
            <li>
                <span>价格：</span>
                <span>买入</span>
            </li>
            <li>
                <span>金额：</span>
                <span>1200.00</span>
            </li>
            <li>
                <span>旷工费：</span>
                <span>1200.00</span>
            </li>
            <li>
                <span>总额：</span>
                <span>1200.00</span>
            </li>
            <li>
                <span>时间：</span>
                <span>2018.12.12 22:00:02</span>
            </li>
            <li>
                <span>类型：</span>
                <span>已成交</span>
            </li>
            
        </ul>
    </div>
  </div>
</template>
<script>
import $ from "jquery";
export default {
  data() {
    return {
    };
  },
  components: {
    
  },
  mounted() {
    let that = this;
    mui.back = function() {
      that.$router.back();
      error;
    };
  },
  methods: {
    back() {
      this.$router.back();
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
  .main{
      ul{
          background: #1a212a;
          padding: 0.2rem 10% 0.2rem;
          li{
              padding: 0.2rem 0 0.2rem;
              span{
                  display: inline-block;
              }
              span:first-child{
                  width: 2rem;
              }
              span:last-child{
                  color: #8f8f9b;
              }
          }
      }
  }

}
</style>
