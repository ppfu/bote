<template>
  <div v-if="$store.state.bshow" class="footer">
    <div class="con d-flex">
        <router-link tag="div"  class="flex1"  @click.native="navTap(0,'')" :to="{ name:'home' }">
          <p>
            <span class="iconfont icon-weibiaoti1"></span>
          </p>
          {{$t('navbar.home')}}
        </router-link>
        <router-link tag="div"  class="flex1"  @click.native="navTap(1,'')" :to="{ name:'wallet1' }">
          <p>
            <span class="iconfont icon-qianbao"></span>
          </p>
          {{$t('navbar.wallet')}}
        </router-link>
        <router-link tag="div"  class="flex1"  @click.native="navTap(2,'')" :to="{ name:'mining' }">
          <p>
            <span class="iconfont icon-wakuang_xuanzhong"></span>
          </p>
          {{$t('navbar.mining')}}
        </router-link>
        <router-link tag="div"  class="flex1"  @click.native="navTap(3,'')" :to="{ name:'market' }">
          <p>
            <span class="iconfont icon-zhuzhuangtu"></span>
          </p>
          {{$t('navbar.market')}}
        </router-link>
        <router-link tag="div"  class="flex1"   @click.native="navTap(4,'')" :to="{ name:'trade1' }">
          <p>
            <span class="iconfont icon-jiaoyi"></span>
          </p>
          {{$t('navbar.trade')}}
        </router-link>
        <router-link tag="div"  class="flex1"  @click.native="navTap(5,)" :to="{ name:'mine' }">
          <p>
            <span class="iconfont icon-wode2"></span>
          </p>
          {{$t('navbar.mine')}}
        </router-link>
    </div>
  </div>
</template>
<script>
import $ from "jquery"
export default {
  data() {
    return {
      nid: 0,
    };
  },
  mounted(){
    let that = this;
    // $(window).resize(function () {
    //   that.$store.state.bshow = !that.$store.state.bshow;
    // })
  },
  methods: {
    navTap(id,text) {
      this.nid = id;
      this.$store.state.bot = text;
      this.$store.state.n = 0;
    }
  }
};
</script>
<style scoped>
.footer {
  width: 100%;
  height: 1.3rem;
  position: fixed;
  bottom: 0;
  background: #1f2833;
  z-index: 999;
  font-size: 0.34rem;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, .1);
}
.con{
  width: 100%;
  padding-top: 0.1rem;
  color:#70757E;
  text-align: center;
}
.flex1 .iconfont{
  font-size: 0.64rem;
  color: #70757E;
}

.router-link-exact-active{
  color: #fcb90b;
}
.router-link-exact-active .iconfont{
  color: #fcb90b;
}
</style>
