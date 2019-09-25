<template>
  <div class="wrap1">
    <div>
      <div class="detail">
        <textarea cols="30" rows="8" :placeholder="$t('service.phr.p1')" v-model="detail"></textarea>
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
            id="handcard"
            @change="pushImg1($event)"
            accept="image/jpeg, image/png, image/gif"
            alt
          >
          <span class="clear iconfont icon-shanchu1" v-if="data1" @click="delImg1($event)"></span>
        </div>
      </div>
      <div class="d_btn">
        <button class="btn" @click="sub">举报</button>
      </div>
    </div>
  </div>
</template>
<script>
import $ from "jquery";

export default {
  data() {
    return {
      qid: 0,
      detail: "",
      data1: "",
      urll: "",
      list: []
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
    // 上传
    pushImg1: function(e) {
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
                that.data1 = result;
                that.urll = res.data.url;
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
    delImg1: function(e) {
      this.data1 = "";
      let dom = document.getElementById("handcard");
      dom.value = "";
      this.urll="";
    },
    sub() {
      let that = this;
      if (that.detail) {
        that.$vux.loading.show({
          text: ""
        });
        that
          .$http({
            url: "/Transaction/report_order",
            method: "post",
            data: {
              token: that.$store.state.user_info.token,
              order_id: sessionStorage.getItem("orderId"),
              report_img: that.urll,
              report_content: that.detail
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
              that.detail="";
              let dom = document.getElementById("handcard");
              dom.value = "";
              that.data1="";
              that.urll="";
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
  .up_div {
    margin-top: 0.4rem;
    clear: both;
    width: 4rem;
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
