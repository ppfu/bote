<template>
  <div class="wrap">
    <div class="top">
      <img @click="back" class="back_img" src="../assets/nav_back.png" alt>
      <div>{{$t('book.title')}}</div>
    </div>
    <ul v-if="show">
        <li v-if="$store.state.lang!='en'" @click="toDetail(2)">
          <span class="f_l">BAUDCOIN（波特币）白皮书</span>
          <img class="f_r r_img" src="../assets/right1.png" alt>
        </li>
        <li v-if="$store.state.lang=='en'" @click="toDetail(1)">
          <span class="f_l">BAUDCOIN white-book</span>
          <img class="f_r r_img" src="../assets/right1.png" alt>
        </li>
    </ul>
  </div>
</template>
<script>
import $ from "jquery";

export default {
  data() {
    return {
        show:true,
        list:[]
    };
  },
  components: {

  },
  mounted() {
    let that = this;
    mui.back = function() {
      that.$router.push({
          name:"syssetting"
      });
      error;
    };

  },
  methods: {
    back() {
      this.$router.back(-1);
    },
    toDetail(i){
      this.$router.push({
        name:"bookdetail",
        params:{
          type:i
        }
      })
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
  padding: 1.3rem 0 0;
  overflow: auto;
  .top {
    background: #1a212a;
  }
  ul {
      background: #1a212a;
      li {
        overflow: hidden;
        padding: 0.3rem 4% 0.3rem;
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
}
</style>
