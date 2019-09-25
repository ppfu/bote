<template>
  <div class="wrap">
    <div class="top">
      <div>{{$t('mine.title')}}</div>
    </div>
    <div class="main">
      <div class="head_div">
        <div class="f_l" @click="toAccinfo">
          <img v-if="info.head_icon" :src="info.head_icon" alt>
          <img v-if="!info.head_icon" src="../assets/logo.png" alt>
        </div>
        <div class="f_l">
          <span>
            <span class="u_name f_c">{{info.name}}</span>
            <span class="iconfont icon-VIP"></span>
            <span class="level">{{info.level}}</span>
          </span>
          <span>
            <span class="f_c f_l">ID：{{info.id}}</span>
            <span class="c_span" @click="toContribute">{{$t('mine.top.t1')}}：<span>{{uinfo.contribution}}</span></span>
          </span>
        </div>
      </div>
      <div class="acc_div">
        <div @click="toLink(0)">
          <div>
            <span>{{$t('mine.top.t2')}}（USD）</span>
            <span>{{uinfo.total}}</span>
          </div>
        </div>
        <div @click="toLink(1)">
          <div>
            <span>{{$t('mine.top.t3')}}（BAUD）</span>
            <span>{{uinfo.income}}</span>
          </div>
        </div>
      </div>
      <div class="list_div">
        <ul>
          <li @click="toVip">
            <img src="../assets/m1.png" alt class="f_l">
            <span class="f_l">VIP{{$t('mine.list.l1')}}</span>
            <span class="f_r iconfont icon-youjiantou"></span>
          </li>
          <li @click="toShare">
            <img src="../assets/m2.png" alt class="f_l">
            <span class="f_l">{{$t('mine.list.l2')}}</span>
            <span class="f_r iconfont icon-youjiantou"></span>
          </li>
        </ul>
        <ul>
          <li @click="toSafe">
            <img src="../assets/m3.png" alt class="f_l">
            <span class="f_l">{{$t('mine.list.l3')}}</span>
            <span class="f_r iconfont icon-youjiantou"></span>
          </li>
          <li @click="toSet">
            <img src="../assets/m4.png" alt class="f_l">
            <span class="f_l">{{$t('mine.list.l4')}}</span>
            <span class="f_r iconfont icon-youjiantou"></span>
          </li>
          <li @click="toMsg">
            <img src="../assets/tongzhi.png" alt class="f_l">
            <span class="f_l m_span">{{$t('mine.list.l6')}} <span v-if="ifMsg" class="dot f_c_red"></span> </span>
            <span class="f_r iconfont icon-youjiantou"></span>
          </li>
          <!-- <li @click="toBook">
            <img src="../assets/xiazai.png" alt class="f_l">
            <span class="f_l">{{$t('mine.list.l7')}}</span>
            <span class="f_r iconfont icon-youjiantou"></span>
          </li> -->
        </ul>
        <ul>
          <li @click="toChat">
            <img src="../assets/m5.png" alt class="f_l">
            <span class="f_l">{{$t('mine.list.l5')}}</span>
            <span class="f_r iconfont icon-youjiantou"></span>
          </li>
        </ul>
      </div>
      <div class="btn_div">
        <button class="btn" @click="exit">{{$t('mine.btn.b1')}}</button>
      </div>
    </div>
  </div>
</template>
<script>
import $ from "jquery";

export default {
  data() {
    return {
      uinfo:"",
      info:"",
      ifMsg:0,
    };
  },
  components: {},
  mounted() {
    let that = this;
    mui.back = function() {
      mui.plusReady(function() {
        var main = plus.android.runtimeMainActivity();
        main.moveTaskToBack(false);
      });
      error;
    };
  },
  activated (){
    let that = this;
    that
      .$http({
        url: "/user/user_head_info",
        method: "post",
        data: {
          token: that.$store.state.user_info.token
        }
      })
      .then(function(res) {
        if (res.data.code == 1) {
          that.uinfo = res.data.data;
          that.info = res.data.data.user_info;
        } else {
          that.$vux.toast.show({
            text: res.data.msg,
            type: "text",
            position: "middle",
            time: 1200
          });
        }
      });
      that
      .$http({
        url: "/user/message_list",
        method: "post",
        data: {
          token: that.$store.state.user_info.token,
          visit: 1
        }
      })
      .then(function(res) {
        if (res.data.code == 1) {
          that.ifMsg = res.data.data.length;
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
  methods: {
    exit() {
      let that = this;
      that.$vux.confirm.show({
        title: that.$t('confirm.card.title.t3'),
        confirmText: that.$t('cfm'),
        cancelText: that.$t('cel'),
        content: that.$t('confirm.card.con.c3'),
        onShow() {},
        onHide() {},
        onCancel() {},
        onConfirm() {
          that.$router.push({
            name: "login"
          });
          sessionStorage.removeItem("uinfo");
        }
      });
    },
    toAccinfo() {
      this.$router.push({
        name: "accinfo"
      });
    },
    toVip() {
      this.$router.push({
        name: "vip"
      });
    },
    toShare() {
      this.$store.state.n1 = 0;
      this.$router.push({
        name: "myshare"
      });
    },
    toSafe() {
      this.$router.push({
        name: "safecenter"
      });
    },
    toSet() {
      this.$router.push({
        name: "syssetting"
      });
    },
    toChat() {
      this.$router.push({
        name: "message"
      });
    },
    toMsg(){
      this.$router.push({
        name: "msg",
        params:{
          type:1
        }
      });
    },
     toBook(){
      this.$router.push({
        name: "book"
      });
    },
    toLink(i) {
      if (i) {
        this.$router.push({
          name: "profitacc"
        });
      } else {
        this.$router.push({
          name: "mainacc"
        });
      }
    },
    toContribute(){
      this.$store.state.n1 = 2;
      this.$router.push({
        name:"mycontribute"
      })
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
  padding: 1.3rem 0 2rem;
  overflow: auto;
  .top {
    background: #1a212a;
  }
  .head_div {
    overflow: hidden;
    background: #1a212a;
    padding: 0.4rem;
    > div:first-child {
      margin-right: 0.4rem;
      width: 1.5rem;
      height: 1.5rem;
      border-radius: 50%;
      overflow: hidden;
    }
    >div:last-child{
      width: calc(100% - 2rem);
    }
    img {
      width: 1.5rem;
      height: 1.5rem;
    }
    .level {
      // font-weight: 700;
      margin-left: 2px;
    }
    > div {
      overflow: hidden;
      .c_span{
        float: left;
        width: 50%;
        >span{
          word-break: break-word;
        }
      }
      .u_name {
        font-size: 0.44rem;
        margin-right: 0.2rem;
      }
      .iconfont {
        font-size: 0.32rem;
      }
      > span {
        overflow: hidden;
        width: 100%;
        display: block;
      }
      > span:first-child {
        padding-bottom: 0.4rem;
      }
      > span:last-child {
        > span:first-child {
          margin-right: 2rem;
        }
      }
    }
  }
  .acc_div {
    background: #161d26;
    display: flex;
    > div {
      padding: 0.3rem 0 0.3rem;
      flex: 1;
      text-align: center;
      > div {
        > span {
          display: block;
          color: #b6b7c0;
        }
        > span:last-child {
          color: white;
          font-size: 0.44rem;
          padding-top: 0.3rem;
        }
      }
    }
    > div:first-child {
      > div {
        border-right: 1px solid #323b46;
      }
    }
  }
  .list_div {
    ul {
      margin-bottom: 0.1rem;
      li {
        background: #1a212a;
        margin-bottom: 1px;
        overflow: hidden;
        padding: 0.2rem 4% 0.2rem;
        line-height: 1.1rem;
        .iconfont {
          color: #888;
          font-size: 0.6rem;
        }
        img {
          width: 0.8rem;
          height: 0.8rem;
          transform: translateY(3px);
          margin-right: 0.4rem;
        }
        .m_span{
          position: relative;
          .dot{
            position: absolute;
            width: 6px;
            height: 6px;
            background: #E53917;
            border-radius: 50%;
            right: -8px;
            top: 10px;
          }
        }
      }
      li:last-child {
        margin-bottom: 0;
      }
    }
  }
  .btn_div {
    padding: 0.6rem 0 0;
    .btn {
      display: block;
      width: 90%;
      margin: 0 auto;
      line-height: 0.8rem;
      text-align: center;
      color: #fcb90b;
      border-radius: 4px;
      background: transparent;
      border: 1px solid #fcb90b;
    }
  }
}
</style>
