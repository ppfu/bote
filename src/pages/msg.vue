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
        <tab-item selected @click.native="getList(1)">{{$t('msg.title.t1')}}</tab-item>
        <tab-item @click.native="getList(2)">{{$t('msg.title.t2')}}</tab-item>
      </tab>
    </div>
    <ul v-if="show">
       <p v-if="list.length >= 1 " class="one_key" @click="oneKey"><x-button plain mini type="warn">一键已读</x-button></p>
       <p v-if="list.length == 0 "  class="one_key" @click="oneKey"><x-button  mini type="primary" disabled >全部已读</x-button></p>
      <li v-for="(item,index) in list" :key="index" @click="toDetail(item.id,1)">
        <span class="f_l">
          <span>
            {{item.title}}
            <div></div>
          </span>
        </span>
        <img class="f_r r_img" src="../assets/right1.png" alt>
      </li>
    </ul>
    <ul v-if="!show">
      <li v-for="(item,index) in list1" :key="index" @click="toDetail(item.id,2)">
        <span class="f_l">{{item.title}}</span>
        <img class="f_r r_img" src="../assets/right1.png" alt>
      </li>
    </ul>
  </div>
</template>
<script>
import $ from "jquery";
import { Tab, TabItem,XButton  } from "vux";

export default {
  data() {
    return {
      show: true,
      list: [],
      list1: [],
      type: 1
    };
  },
  components: {
    Tab,
    TabItem,
    XButton
  },
  mounted() {
    let that = this;
    mui.back = function() {
      that.$router.push({
        name: "mine"
      });
      error;
    };
  },
  activated() {
    let that = this;
    that.$nextTick(function() {
      if(that.$route.params.type==1){
        that.type = 1;
        that.getList(1);
      }else{
        that.type = 2;
        that.getList(2);
      }
    });
  },
  methods: {
    back() {
      this.$router.push({
        name: "mine"
      });
    },
    getList(i){
      let that = this;
      that.type = i;
      if(i==1){
        that.show = true;
      }else{
        that.show = false;
      }
      that
      .$http({
        url: "/user/message_list",
        method: "post",
        data: {
          token: that.$store.state.user_info.token,
          visit: that.type
        }
      })
      .then(function(res) {
        if (res.data.code == 1) {
          if(that.type==1){
            that.list = res.data.data;
          }else{
            that.list1 = res.data.data;
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
    //设置消息一键已读
    oneKey(){
      let that = this;
      that
      .$http({
        url: "/user/set_message_all_read",
        method: "post",
        data: {
          token: that.$store.state.user_info.token,
        }
      })
      .then(function(res) {
         console.log(res.data.code)
        if (res.data.code == 1) {
             that.$vux.toast.show({
               text: res.data.msg,
               type: "text",
               position: "middle",
               time: 1200
             });
             that.getList()
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
    toDetail(id,type){
      let that = this;
      that.$router.push({
        name:"msgdetail",
        params:{
          i:id,
          source:type
        }
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
  padding: 1.3rem 0 0;
  overflow: auto;
  .top {
    background: #1a212a;
  }
  ul {
    background: #1a212a;
    .one_key{
      display: inline-block;
      margin-left: 0.8rem
    }
    li {
      overflow: hidden;
      padding: 0.3rem 4% 0.3rem;
      line-height: 0.7rem;
      border-bottom: 1px solid #242424;
      .f_l {
        width: calc(100% - 1.5rem);
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        padding-right: 10px;
        box-sizing: border-box;
        > span {
          max-width: 100%;
          display: inline-block;
          position: relative;
          > div {
            position: absolute;
            width: 6px;
            height: 6px;
            background: #e53917;
            border-radius: 50%;
            right: -10px;
            top: 2px;
          }
        }
      }
      .r_img {
        width: 0.7rem;
      }
    }
  }
}
</style>
