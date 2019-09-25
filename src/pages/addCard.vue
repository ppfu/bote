<template>
  <div class="wrap">
    <div class="top">
      <img @click="back" class="back_img" src="../assets/nav_back.png" alt>
      <div>{{$t('card.title.t2')}}</div>
      <span class="cpt" @click="sub">{{$t('codedialog.c4')}}</span>
    </div>
    <div class="main">
      <ul class="form">
        <li>
          <span class="f_l">{{$t('card.label.l1')}}</span>
          <input class="f_r" type="text" v-model="name" :placeholder="$t('card.phr.p1')">
        </li>
        <li>
          <span class="f_l">{{$t('card.label.l2')}}</span>
          <!-- <input class="f_r" type="text" v-model="bank" placeholder="请输入开户银行"> -->
          <select class="f_r" :class="{f_c_de:bank==0}" v-model="bank">
            <option value="0">{{$t('card.phr.p2')}}</option>
            <option v-for="(item,index) in list" :key="index" :value="item.id">{{item.bank_name}}</option>
          </select>
        </li>
        <li>
          <span class="f_l">{{$t('card.label.l3')}}</span>
          <input class="f_r" type="number" v-model="card" :placeholder="$t('card.phr.p3')">
        </li>
        <li>
          <span class="f_l">{{$t('card.label.l4')}}</span>
          <input class="f_r" type="text" v-model="ads" :placeholder="$t('card.phr.p4')">
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import Qs from "qs";
export default {
  data() {
    return {
      name: "",
      bank: "0",
      card: "",
      ads: "",
      list: []
    };
  },
  components: {},
  mounted() {
    let that = this;
    mui.back = function() {
      that.$router.back();
      error;
    };
    that
      .$http({
        url: "/bank/all_bank",
        method: "post",
        data: {}
      })
      .then(function(res) {
        if (res.data.code == 1) {
          that.list = res.data.data;
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
    back() {
      this.$router.back();
    },
    sub() {
      let that = this;

      if (that.name && that.bank && that.card && that.ads) {
        that.$vux.loading.show({
          text: ""
        });
        that
          .$http({
            url: "/user/add_bank",
            method: "post",
            data: {
              token: that.$store.state.user_info.token,
              name: that.name,
              bid: that.bank,
              bank_card: that.card,
              bank_add: that.ads
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
              that.$router.back();
            } else {
              that.$vux.toast.show({
                text: res.data.msg,
                type: "text",
                position: "middle",
                time: 1200
              });
            }
          });
      } else {
        that.$vux.toast.show({
          text: that.$t("tip.full_tip"),
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
    .cpt {
      position: absolute;
      right: 4%;
      top: 0;
      font-size: 0.4rem;
      line-height: normal;
      padding: 0.28rem 0 0.25rem;
    }
  }
  .main {
    .form {
      background: #1a212a;
      li {
        overflow: hidden;
        border-bottom: 1px solid #12161c;
        padding: 0 4% 0;
        .f_l,
        .f_r {
          line-height: 1.1rem;
          height: 1.1rem;
        }
        input {
          width: calc(100% - 2rem);
          line-height: 1.1rem;
          box-sizing: border-box;
          padding: 0 0.2rem 0;
          background: transparent;
        }
        .f_c_de {
          color: rgba(255, 255, 255, 0.6);
        }
        select {
          width: calc(100% - 2rem);
          line-height: 1.1rem;
          box-sizing: border-box;
          padding: 0 0.1rem 0;
          background: #1a212a;
          color: white;
          border: 0;
        }
      }
    }
  }
}
</style>
