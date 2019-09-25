<template>
  <div class="wrap1">
    <div>
      <div class="questions">
        <span
          v-for="(item,index) in list"
          :key="index"
          :class="{active:qid == item.type}"
          @click="change(item.type)"
        >{{item.name}}</span>
      </div>
      <div class="detail">
        <!-- phr -->
        <!-- <textarea cols="30" rows="8" :placeholder="$t('service.phr.p1')" v-model="detail"></textarea> -->
        <textarea cols="30" rows="8" :placeholder="phr" v-model="detail"></textarea>
      </div>
      <div class="upload">
        <div class="up_div">
          <span class="icon f_c">+</span>
          <span class="jia">{{$t('service.phr.p2')}}</span>
          <img v-if="data1" :src="data1">
          <input
            name="img"
            :disabled="data1!=''"
            type="file"
            id="handcard1"
            @change="pushImg1($event,0)"
            accept="image/jpeg, image/png, image/gif"
            alt
          >
          <span class="clear iconfont icon-shanchu1" v-if="data1" @click="delImg1($event,0)"></span>
        </div>
        <div class="up_div" v-show="data1 != ''">
          <span class="icon f_c">+</span>
          <span class="jia">{{$t('service.phr.p2')}}</span>
          <img v-if="data2" :src="data2">
          <input
            name="img"
            :disabled="data2!=''"
            type="file"
            id="handcard2"
            @change="pushImg1($event,1)"
            accept="image/jpeg, image/png, image/gif"
            alt
          >
          <span class="clear iconfont icon-shanchu1" v-if="data2" @click="delImg1($event,1)"></span>
        </div>
      </div>
      <div class="upload" v-show="data1 != '' && data2 != ''">
        <div class="up_div" v-show="data2 != ''">
          <span class="icon f_c">+</span>
          <span class="jia">{{$t('service.phr.p2')}}</span>
          <img v-if="data3" :src="data3">
          <input
            name="img"
            :disabled="data3!=''"
            type="file"
            id="handcard3"
            @change="pushImg1($event,2)"
            accept="image/jpeg, image/png, image/gif"
            alt
          >
          <span class="clear iconfont icon-shanchu1" v-if="data3" @click="delImg1($event,2)"></span>
        </div>
        <div class="up_div" v-show="data3 != ''">
          <span class="icon f_c">+</span>
          <span class="jia">{{$t('service.phr.p2')}}</span>
          <img v-if="data4" :src="data4">
          <input
            name="img"
            :disabled="data4!=''"
            type="file"
            id="handcard4"
            @change="pushImg1($event,3)"
            accept="image/jpeg, image/png, image/gif"
            alt
          >
          <span class="clear iconfont icon-shanchu1" v-if="data4" @click="delImg1($event,3)"></span>
        </div>
      </div>
      <div class="upload" v-show="data4 != ''">
        <div class="up_div">
          <span class="icon f_c">+</span>
          <span class="jia">{{$t('service.phr.p2')}}</span>
          <img v-if="data5" :src="data5">
          <input
            name="img"
            :disabled="data5!=''"
            type="file"
            id="handcard5"
            @change="pushImg1($event,4)"
            accept="image/jpeg, image/png, image/gif"
            alt
          >
          <span class="clear iconfont icon-shanchu1" v-if="data5" @click="delImg1($event,4)"></span>
        </div>
        <div class="up_div" style="display:none;">
          <!-- <span class="icon f_c">+</span>
          <span class="jia">{{$t('service.phr.p2')}}</span>
          <img v-if="data1" :src="data1">
          <input
            name="img"
            :disabled="data1!=''"
            type="file"
            id="handcard"
            @change="pushImg1($event)"
            accept="image/jpeg, image/png, image/gif"
            alt
          >
          <span class="clear iconfont icon-shanchu1" v-if="data1" @click="delImg1($event)"></span> -->
        </div>
      </div>
      <div class="d_btn">
        <button class="btn" @click="sub">{{$t('service.btn.b1')}}</button>
      </div>
    </div>
  </div>
</template>
<script>
import $ from "jquery";

export default {
  data() {
    return {
      phr:"请详细描述您的问题",
      qid: 0,
      detail: "",
      data1: "",
      data2: "",
      data3: "",
      data4: "",
      data5: "",
      src1:"",
      src2:"",
      src3:"",
      src4:"",
      src5:"",
      srcs:[],
      urll: [],
      list: [],
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
        url: "/user/feedbackType",
        method: "post",
        data: {
          token: that.$store.state.user_info.token
        }
      })
      .then(function(res) {
        if (res.data.code == 1) {
          that.list = res.data.data;
          that.qid = res.data.data[0].type;
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
    //改变问题方式
    change(id){
      let that = this;
      // qid=
      that.qid = id;
      if(that.qid == 2){
        that.phr = "请详细描述您的问题";
      }else{
        that.phr = "请详细描述您的问题";
      }
    },
    // 上传
    pushImg1: function(e,index) {
      let file = e.target,
        reader = new FileReader(),
        that = this,
        _name,
        _fileName;
      _name = file.value;
      _fileName = _name.substring(_name.lastIndexOf(".") + 1).toLowerCase();
      reader.readAsDataURL(file.files[0]);
      if (file.files[0].size > 10 * 1024 * 1024) {
        that.$vux.toast.show({
          text: that.$t("ups.d"),
          type: "warn",
          position: "middle",
          time: 1500
        });
      } else {
        that.$vux.loading.show({
          text: that.$t('load.uping')
        });
        reader.onload = function() {
          let result = this.result;

          // that.data1 = result;

          var image = new FormData();
          image.append("file", e.target.files[0]);
          image.append("type", "1");
          image.append("token", that.$store.state.user_info.token);
          that
            .$http({
              url: "/user/upload_pic",
              method: "post",
              data: image
            })
            .then(function(res) {
              that.$vux.loading.hide();
              if (res.data.code == 1) {
                if(index == 0){
                  that.data1 = result;
                  that.src1 = res.data.url;
                }else if(index == 1){
                  that.data2 = result;
                  that.src2 = res.data.url;
                }else if(index == 2){
                  that.data3 = result;
                  that.src3 = res.data.url;
                }else if(index == 3){
                  that.data4 = result;
                  that.src4 = res.data.url;
                }else if(index == 4){
                  that.data5 = result;
                  that.src5 = res.data.url;
                }


              } else {
                that.$vux.toast.show({
                  text: res.data.msg,
                  type: "cancel",
                  position: "middle",
                  time: 1200
                });
              }
            });
        };
      }
      // }
    },
    delImg1: function(e,index) {
      if(index == 0){
        this.data1 = "";
        let dom = document.getElementById("handcard1");
        this.src1="";
      }else if(index == 1){
        this.data2 = "";
        let dom = document.getElementById("handcard2");
        this.src2="";
      }else if(index == 2){
        this.data3 = "";
        let dom = document.getElementById("handcard3");
        this.src3="";
      }else if(index == 3){
        this.data4 = "";
        let dom = document.getElementById("handcard4");
        this.src4="";
      }else if(index == 4){
        this.data5 = "";
        let dom = document.getElementById("handcard5");
        this.src5="";
      }
      dom.value = "";
      that.srcs = [];
    },
    sub() {
      let that = this;
      if(that.src1 != ""){
        that.srcs.push(that.src1);
      }
      if(that.src2 != ""){
        that.srcs.push(that.src2);
      }
      if(that.src3 != ""){
        that.srcs.push(that.src3);
      }
      if(that.src4 != ""){
        that.srcs.push(that.src4);
      }
      if(that.src5 != ""){
        that.srcs.push(that.src5);
      }
      var srcs = (that.srcs).toString();
      if (that.detail) {
        that.$vux.loading.show({
          text: ""
        });
        that
          .$http({
            url: "/user/feedback",
            method: "post",
            data: {
              token: that.$store.state.user_info.token,
              type: that.qid,
              img_url: srcs,
              content: that.detail
            }
          })
          .then(function(res) {
            that.$vux.loading.hide();
            if (res.data.code == 1) {
              that.$vux.toast.show({
                text: res.data.msg,
                type: "success",
                position: "middle",
                time: 1200
              });
              that.srcs = [];
              let dom1 = document.getElementById("handcard1");
              dom1.value = "";
              that.data1="";
              that.src1="";

              let dom2 = document.getElementById("handcard2");
              dom2.value = "";
              that.data2="";
              that.src2="";

              let dom3 = document.getElementById("handcard3");
              dom3.value = "";
              that.data3="";
              that.src3="";

              let dom4 = document.getElementById("handcard4");
              dom4.value = "";
              that.data4="";
              that.src4="";

              that.detail="";
              let dom5 = document.getElementById("handcard5");
              dom5.value = "";
              that.data5="";
              that.src5="";
            } else {
              that.$vux.toast.show({
                text: res.data.msg,
                type: "cancel",
                position: "middle",
                time: 1200
              });
            }
          });
      } else {
        that.$vux.toast.show({
          text: that.$t('tip.full_tip'),
          type: "cancel",
          position: "middle",
          time: 1200
        });
      }
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
  background: #1a212a;
  > div {
    background: #1a212a;
    padding: 0.6rem 4% 0.4rem;
    .questions {
      overflow: hidden;
      box-sizing: border-box;
      text-align: left;
      > span {
        box-sizing: border-box;
        // float: left;
        // width: 30%;
        display: inline-block;
        padding: 0 0.4rem 0;
        margin-right: 0.5rem;
        line-height: 0.66rem;
        border: 1px solid #827d7d;
        border-radius: 4px;
        text-align: center;
        margin-bottom: 0.4rem;
        color: #827d7d;
      }
      > .active {
        border: 1px solid #ffc200;
        color: #ffc200;
      }
    }
    .detail {
      textarea {
        width: 100%;
        box-sizing: border-box;
        padding: 0.2rem;
        border: 1px solid #495666;
        background: transparent;
        color: white;
        outline: 0;
      }
    }
    .d_btn {
      .btn {
        display: block;
        width: 100%;
        margin: 0.8rem auto;
        line-height: 0.8rem;
        text-align: center;
        color: #fcb90b;
        border-radius: 4px;
        background: transparent;
        border: 1px solid #fcb90b;
      }
    }
  }
  .upload{
    width: 100%;
    display: flex;
    justify-content: space-between;
    margin-top: 0.4rem;
  }
  .up_div {
    clear: both;
    width: 48%;
    height: 3.5rem;
    border: 1px solid #495666;
    position: relative;
    text-align: center;
    .icon {
      position: absolute;
      left: 50%;
      top: 0.3rem;
      font-size: 1.4rem;
      transform: translateX(-50%);
    }
    .jia {
      position: absolute;
      left: 50%;
      top: 2.1rem;
      color: #fcb90b;
      transform: translateX(-50%);
      white-space: nowrap;
    }
    img {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }
    input {
      opacity: 0;
      width: 100%;
      height: 100%;
      position: absolute;
      left: 0;
      top: 0;
    }
    .clear {
      font-size: 0.72rem;
      color: rgba(255, 255, 255, 0.8);
      position: absolute;
      right: -0.8rem;
      top: -0.4rem;
    }
  }
}
</style>
