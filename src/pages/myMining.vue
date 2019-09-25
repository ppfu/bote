<template>
  <div class="wrap1">
    <div>
      <div class="head_info">
        <div>
          <div>
            <img v-if="tinfo.head_img!=null" :src="tinfo.head_img" alt>
            <img  v-if="tinfo.head_img==null" src="../assets/logo.png" alt>
          </div>
        </div>
        <span>{{tinfo.nickname}}</span>
        <span>{{$t('share.child2.title')}}：{{tinfo.count_mining_number}}</span>
        <div class="info">
          <div>
            <span>{{$t('share.child2.t1')}}</span>
            <span>{{tinfo.mining_amount}}USD</span>
          </div>
          <div>
            <span>{{$t('share.child2.t2')}}</span>
            <span>{{tinfo.add_mining}}USD</span>
          </div>
        </div>
      </div>
      <div class="div_title">{{$t('share.child2.t3')}}</div>
      <ul>
        <li v-for="(item,index) in list" :key="index">
          <div class="f_l">
            <img v-if="item.head_img!=null" :src="item.head_img" alt>
            <img  v-if="item.head_img==null" src="../assets/logo.png" alt>
            <span>{{item.nickname}}</span>
          </div>
          <div class="f_l">
            <div>
              <span>{{$t('share.child2.t4')}}：</span>
              <span>{{item.count_mining_number}}</span>
            </div>
            <div>
              <span>{{$t('share.child2.t1')}}：</span>
              <span>{{item.mining_amount}} USD</span>
            </div>
            <div>
              <span>{{$t('share.child2.t2')}}：</span>
              <span>{{item.add_mining}} USD</span>
            </div>
          </div>
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
        tinfo:{},
        list:[],
    };
  },
  components: {},
  mounted() {
    let that = this;
    mui.back = function() {
      that.$router.push({
        name: "mine"
      });
      error;
    };
    that
      .$http({
        url: "/user/share_mining",
        method: "post",
        data: {
            token: that.$store.state.user_info.token,
        }
      })
      .then(function(res) {
        if (res.data.code == 1) {
            that.tinfo = res.data.data.user_info;
            that.list = res.data.data.share;
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
  activated(){
      let that = this;
      
  },
  methods: {}
};
</script>
<style lang="less" scoped>
.wrap1 {
  font-size: 0.36rem;
  width: 100%;
  height: 100%;
  color: white;
  box-sizing: border-box;
  padding-top: 0.3rem;
  > div {
    border-radius: 8px;
    box-sizing: border-box;
    padding: 0.6rem 0 0rem;
    background: #1a222b;
    .head_info {
      > div:first-child {
        > div {
          border-radius: 50%;
          overflow: hidden;
          border: 2px solid white;
          width: 1.8rem;
          height: 1.8rem;
          margin: 0 auto 0.2rem;
          img {
            width: 100%;
            height: 100%;
          }
        }
      }
      > img,
      > span {
        display: block;
        text-align: center;
        font-size: 0.4rem;
        margin-bottom: 0.1rem;
      }
      > img {
        margin: 0.4rem auto;
        width: 3rem;
        height: 3rem;
      }
      > span:last-child {
        font-size: 0.36rem;
      }
      .info {
        padding: 0.4rem 0 0rem;
        display: flex;
        > div {
          background: #161d26;
          padding: 0.4rem 0 0.4rem;
          flex: 1;
          text-align: center;
          > span {
            display: block;
            font-size: 0.4rem;
          }
          > span:first-child {
            color: #878893;
            padding-bottom: 0.2rem;
            font-size: 0.36rem;
          }
        }
        > div:first-child {
          border-right: 1px solid #323b46;
        }
      }
    }
  }
  .div_title {
    background: #12161c;
    padding: 0.3rem 4% 0.1rem;
    color: #b9b9c1;
  }
  ul {
    overflow: hidden;
    li {
      border-bottom: 1px solid #12161c;
      padding: 0.3rem 4% 0.3rem;
      overflow: hidden;
      font-size: 0.32rem;
      box-sizing: border-box;
      img {
        width: 1rem;
        height: 1rem;
      }
      .f_l {
        > img,
        > span {
          display: block;
          text-align: center;
        }
        > img {
          margin-bottom: 0.1rem;
        }
        > div {
          padding-bottom: 0.1rem;
        }
        > div:last-child {
          padding-bottom: 0;
        }
      }
      >.f_l:first-child{
        margin-right: 0.3rem;
        >span:last-child{
          max-width: 2rem;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      }
    }
  }
}
</style>
