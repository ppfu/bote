import Vue from 'vue'
import Router from 'vue-router'
import BotNav from '@/components/botNav'
import Login from '@/pages/login'
import ForgetPwd from '@/pages/forgetPwd'
import Register from '@/pages/register'
import NoticeDetail from '@/pages/noticeDetail'
import Notices from '@/pages/notices'

import Home from '@/pages/home'
import Wallet1 from '@/pages/wallet1'
import PrinAccount from '@/pages/prinAccount' //主账户钱包
import PrinCoinDetail from '@/pages/PrinCoinDetail' //主账户钱包币种详情
import CoinDetail from '@/pages/coindetail'
import Transfer from '@/pages/transfer'
import Proceeds from '@/pages/proceeds'
import TransferDetail from '@/pages/transferdetail'
import Mining from '@/pages/mining'
import Market from '@/pages/market'
import BsMarket from '@/pages/bsMarket'
import Trade1 from '@/pages/trade1'
import Kline from '@/pages/kline'
import Trade1e from '@/pages/trade1e'
import OrderDetail from '@/pages/orderDetail'
import DealHistory from '@/pages/dealhistory'
import DealDetail from '@/pages/dealdetail'
import ToPay from '@/pages/topay'
import Mine from '@/pages/mine'
import MainAcc from '@/pages/mainAcc'
import MainAccDetail from '@/pages/mainAccDetail'
import ProfitAcc from '@/pages/profitAcc'
import ProfitAccDetail from '@/pages/profitAccDetail'
import AccInfo from '@/pages/accInfo'
import ChangeName from '@/pages/changeName'
import Vip from '@/pages/vip'
import Exploit from '@/pages/exploit'
import Share from '@/pages/share'
import Service from '@/pages/service'
import SafeCenter from '@/pages/safecenter'
import SysSetting from '@/pages/sysSetting'
import Msg from '@/pages/msg'
import MsgDetail from '@/pages/msgDetail'
import Book from '@/pages/book'
import BookDetail from '@/pages/BookDetail'
import BankCard from '@/pages/bankcard'
import AddCard from '@/pages/addcard'
import Alipay1 from '@/pages/alipay1'
import WeChat1 from '@/pages/weChat1'
import Paypal from '@/pages/paypal'
import ChangePhone from '@/pages/changePhone'
import ChangePhone1 from '@/pages/changePhone1'
import ChangePhone2 from '@/pages/changePhone2'
import ChangeEmail from '@/pages/changeEmail'
import ChangeLpwd from '@/pages/changeLpwd'
import ChangeTpwd from '@/pages/changeTpwd'
import MyShare from '@/pages/myShare'
import MyMining from '@/pages/myMining'
import MyContribute from '@/pages/myContribute'
import Message from '@/pages/message'
import Jubao from '@/pages/jubao'
import MyMessage from '@/pages/myMessage'
import Reply from '@/pages/reply'



Vue.use(Router)

export default new Router({
  mode:"hash",
  // scrollBehavior(to, from, savedPosition) {
  //   if (savedPosition) {
  //     return savedPosition
  //   } else {
  //     if (from.meta.keepAlive) {
  //       from.meta.savedPosition = document.body.scrollTop;
  //     }
  //     return {
  //       x: 0,
  //       y: to.meta.savedPosition || 0
  //     }
  //   }
  // },
  routes: [{
      path: '/',
      name: 'login',
      components: {
        main: Login,
      },
      meta: {
        index: 1,
      }
    },
    {
      path: '/forgetpwd/type=:type',
      name: 'forgetpwd',
      components: {
        main: ForgetPwd
      },
      meta: {
        index: 2
      }
    },
    {
      path: '/register/code=:code',
      name: 'register',
      components: {
        main: Register
      },
      meta: {
        index: 2
      }
    },
    {
      path: '/home',
      name: 'home',
      components: {
        main: Home,
        footer: BotNav,
      },
      meta: {
        index: 2,
        none: "true",
        keepAlive:true,
      }
    },
    {
      path: '/wallet1',
      name: 'wallet1',
      components: {
        main: Wallet1,
        footer: BotNav,
      },
      meta: {
        index: 2,
        // none: "true",
        // keepAlive:true
      }
    },
	{
	  path: '/prinAccount',
	  name: 'prinAccount',
	  components: {
	    main: PrinAccount,
	  },
	  meta: {
	    index: 3,
	    none: "true",
	    // keepAlive:true
	  }
	},
  {
    path: '/PrinCoinDetail',
    name: 'PrinCoinDetail',
    components: {
      main: PrinCoinDetail,
    },
    meta: {
      index: 4,
      none: "true",
      // keepAlive:true
    }
  },
    {
      path: '/coindetail',
      name: 'coindetail',
      components: {
        main: CoinDetail,
      },
      meta: {
        index: 4,
        // none: "true",
        // keepAlive:true
      }
    },
    {
      path: '/transfer',
      name: 'transfer',
      components: {
        main: Transfer,
      },
      meta: {
        index: 5,
        // keepAlive:true
      }
    },
    {
      path: '/proceeds',
      name: 'proceeds',
      components: {
        main: Proceeds,
      },
      meta: {
        index: 5,
      }
    },
    {
      path: '/transferdetail/id=:id',
      name: 'transferdetail',
      components: {
        main: TransferDetail,
      },
      meta: {
        index: 4,
        keepAlive:true,
      }
    },
    {
      path: '/mining',
      name: 'mining',
      components: {
        main: Mining,
        footer: BotNav,
      },
      meta: {
        index: 2,
        none: "true",
        keepAlive:true,
      }
    },
    {
      path: '/market',
      name: 'market',
      components: {
        main: Market,
        footer: BotNav,
      },
      meta: {
        index: 2,
        none: "true",
        keepAlive:true,
      }
    },
    {
      path: '/bsmarket',
      name: 'bsmarket',
      components: {
        main: BsMarket,
      },
      meta: {
        index: 3,
        none: "true"
      }
    },
    {
      path: '/trade1',
      name: 'trade1',
      components: {
        main: Trade1,
        footer: BotNav,
      },
      meta: {
        index: 2,
      },
      children: [
        {
        path: '/trade1/trade1e/type=:type',
        name: 'trade1e',
        components: {
          child: Trade1e,
        },
        meta: {
          index: 2,
          none: "true"
        }
      }, {
        path: '/trade1/orderdetail/type=:type',
        name: 'orderdetail',
        components: {
          child: OrderDetail,
        },
        meta: {
          index: 2,
          none: "true"
        }
      }, {
        path: '/trade1/dealhistory',
        name: 'dealhistory',
        components: {
          child: DealHistory,
        },
        meta: {
          index: 2,
          none: "true"
        }
      },{
        path: '/trade1/jubao',
        name: 'Jubao',
        components: {
          child: Jubao,
        },
        meta: {
          index: 2,
          none: "true"
        }
      }]
    },
     {
      path: '/kline',
      name: 'kline',
      components: {
        main: Kline,
      },
      meta: {
        index: 3,
        // snone: "true"
      }
    },
    {
      path: '/trade1/dealdetail/id=:id',
      name: 'dealdetail',
      components: {
        main: DealDetail,
      },
      meta: {
        index: 3,
      }
    },
    {
      path: '/trade1/topay/id=:id&id1=:id1',
      name: 'topay',
      components: {
        main: ToPay,
      },
      meta: {
        index: 3,
      }
    },
    {
      path: '/exploit',
      name: 'exploit',
      components: {
        main: Exploit,
      },
      meta: {
        index: 3,
        keepAlive:true,
      }
    },
    {
      path: '/mine',
      name: 'mine',
      components: {
        main: Mine,
        footer: BotNav,
      },
      meta: {
        index: 2,
        none: "true",
        keepAlive:true,
      }
    },
    {
      path: '/mainacc',
      name: 'mainacc',
      components: {
        main: MainAcc,
      },
      meta: {
        index: 3,
        keepAlive:true,
      }
    },
    {
      path: '/mainaccdetail/id=:id',
      name: 'mainaccdetail',
      components: {
        main: MainAccDetail,
      },
      meta: {
        index: 4,
        keepAlive:true,
      }
    },
    {
      path: '/profitacc',
      name: 'profitacc',
      components: {
        main: ProfitAcc,
      },
      meta: {
        index: 3,
        keepAlive:true,
      }
    },
    {
      path: '/profitaccdetail',
      name: 'profitaccdetail',
      components: {
        main: ProfitAccDetail,
      },
      meta: {
        index: 4,
        keepAlive:true,
      }
    },
    {
      path: '/accinfo',
      name: 'accinfo',
      components: {
        main: AccInfo,
      },
      meta: {
        index: 3,
        keepAlive:true,
      }
    },
    {
      path: '/changename',
      name: 'changename',
      components: {
        main: ChangeName,
      },
      meta: {
        index: 4,
      }
    },
    {
      path: '/vip',
      name: 'vip',
      components: {
        main: Vip,
      },
      meta: {
        index: 4,
        keepAlive:true,
      }
    },
    {
      path: '/safecenter',
      name: 'safecenter',
      components: {
        main: SafeCenter,
      },
      meta: {
        index: 4,
        keepAlive:true
      }
    },
    {
      path: '/syssetting',
      name: 'syssetting',
      components: {
        main: SysSetting,
      },
      meta: {
        index: 4,
        keepAlive:true
      }
    },
    {
      path: '/msg/type=:type',
      name: 'msg',
      components: {
        main: Msg,
      },
      meta: {
        index: 4,
        keepAlive:true
      }
    },
    {
      path: '/msgdetail/i=:i&source=:source',
      name: 'msgdetail',
      components: {
        main: MsgDetail,
      },
      meta: {
        index: 5,
        keepAlive:true
      }
    },
    {
      path: '/book/',
      name: 'book',
      components: {
        main: Book,
      },
      meta: {
        index: 5,
        keepAlive:true
      }
    },
    {
      path: '/bookdetail/type=:type',
      name: 'bookdetail',
      components: {
        main: BookDetail,
      },
      meta: {
        index: 6,
        keepAlive:true
      }
    },
    {
      path: '/bankcard',
      name: 'bankcard',
      components: {
        main: BankCard,
      },
      meta: {
        index: 5,
        keepAlive:true
      }
    },
    {
      path: '/alipay1/type=:type',
      name: 'alipay1',
      components: {
        main: Alipay1,
      },
      meta: {
        index: 5,
      }
    },
    {
      path: '/wechat1/type=:type',
      name: 'wechat1',
      components: {
        main: WeChat1,
      },
      meta: {
        index: 5,
      }
    },
    {
      path: '/paypal/type=:type',
      name: 'paypal',
      components: {
        main: Paypal,
      },
      meta: {
        index: 5,
      }
    },
    {
      path: '/addcard',
      name: 'addcard',
      components: {
        main: AddCard,
      },
      meta: {
        index: 6,
      }
    },
    {
      path: '/changephone',
      name: 'changephone',
      components: {
        main: ChangePhone,
      },
      meta: {
        index: 5,
      }
    },
    {
      path: '/changephone1',
      name: 'changephone1',
      components: {
        main: ChangePhone1,
      },
      meta: {
        index: 5,
      }
    },
    {
      path: '/changephone2',
      name: 'changephone2',
      components: {
        main: ChangePhone2,
      },
      meta: {
        index: 6,
      }
    },
    {
      path: '/changeemail',
      name: 'changeemail',
      components: {
        main: ChangeEmail,
      },
      meta: {
        index: 5,
      }
    },
    {
      path: '/changelpwd',
      name: 'changelpwd',
      components: {
        main: ChangeLpwd,
      },
      meta: {
        index: 5,
      }
    },
    {
      path: '/changetpwd',
      name: 'changetpwd',
      components: {
        main: ChangeTpwd,
      },
      meta: {
        index: 5,
      }
    },
    {
      path: '/share',
      name: 'share',
      components: {
        main: Share,
      },
      meta: {
        index: 4,
      },
      children: [{
        path: '/share/myshare',
        name: 'myshare',
        components: {
          child: MyShare,
        },
        meta: {
          index: 4,
        }
      }, {
        path: '/share/mymining',
        name: 'mymining',
        components: {
          child: MyMining,
        },
        meta: {
          index: 4,
        }
      }, {
        path: '/share/mycontribute',
        name: 'mycontribute',
        components: {
          child: MyContribute,
        },
        meta: {
          index: 4,
        }
      }]
    },
    {
      path: '/service',
      name: 'service',
      components: {
        main: Service,
      },
      meta: {
        index: 4,
      },
      children: [{
        path: '/service/message',
        name: 'message',
        components: {
          child: Message,
        },
        meta: {
          index: 4,
        }
      }, {
        path: '/service/mymessage',
        name: 'mymessage',
        components: {
          child: MyMessage,
        },
        meta: {
          index: 4,
        }
      }]
    },
    {
      path: '/reply/id=:id',
      name: 'reply',
      components: {
        main: Reply,
      },
      meta: {
        index: 5,
      }
    },
    {
      path: '/notices',
      name: 'notices',
      components: {
        main: Notices
      },
      meta: {
        index: 5,
        keepAlive:true,
      }
    },
    {
      path: '/noticedetail/i=:i',
      name: 'noticedetail',
      components: {
        main: NoticeDetail
      },
      meta: {
        index: 6,
        keepAlive:true,
      }
    },
  ]
})
