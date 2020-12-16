import Vue from 'vue';
import VueRouter from 'vue-router'; //需要下载cnpm install vue-router --save

//使用
Vue.use(VueRouter);

//解决刷新报错
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err);
};
//创建组件
import Home from '../views/Home/Home.vue';
import Category from '../views/Category/Category.vue';
import Find from '../views/Find/Find.vue';
import Cart from '../views/Cart/Cart'; //可以省掉后缀名
import Mine from '../views/Mine/Mine';

// 配置路由
let routes = [
  {
    path: '/home',
    component: Home,
    children: [
      {
        path: 'index', //首页
        component: () => import('../views/Home/children/Index'), //按需引入，路由懒加载
      },
      {
        path: 'household', //家用电器
        component: () => import('../views/Home/children/Household'), //按需引入，路由懒加载
      },
      {
        path: 'clothing', //男装女装
        component: () => import('../views/Home/children/Clothing'), //按需引入，路由懒加载
      },
      {
        path: 'shoebag', //鞋靴箱包
        component: () => import('../views/Home/children/ShoeBag'), //按需引入，路由懒加载
      },
      {
        path: 'mobilephones', //手机数码
        component: () => import('../views/Home/children/MobilePhones'), //按需引入，路由懒加载
      },
      {
        path: 'computer', //电脑棒
        component: () => import('../views/Home/children/Computer'), //按需引入，路由懒加载
      },
      {
        path: 'hometextiles', //家具家访
        component: () => import('../views/Home/children/HomeTextiles'), //按需引入，路由懒加载
      },
      {
        path: 'personalmakeup', //个人化妆
        component: () => import('../views/Home/children/PersonalMakeup'), //按需引入，路由懒加载
      },
      {
        path: '/home',
        redirect: '/home/index', //路由重定向
      },
    ],
  },
  {
    path: '/category',
    component: Category,
  },
  {
    path: '/find',
    component: Find,
  },
  {
    path: '/cart',
    component: Cart,
  },
  {
    path: '/mine',
    component: Mine,
  },
  {
    path: '/search',
    component: () => import('../views/Search/Search'),
  },
  {
    path: '/categorylist/:cid',
    component: () => import('../views/Category/components/CategoryList'),
  },
  {
    path: '/goodsdetail/:gid',
    component: () => import('../views/Detail/Detail'),
  },
  {
    path: '/searchlist',
    component: () => import('../views/Search/SearchList'),
  },
  {
    path: '/login',
    component: () => import('../views/Login/Login'),
  },
  {
    path: '/register',
    component: () => import('../views/Login/Register'),
  },
  {
    path: '/',
    redirect: '/mine', //路由重定向
  },
];

//创建一个路由对象
let router = new VueRouter({
  routes,
});

//注册一个全局前置守卫
router.beforeEach((to, from, next) => {
  //to: Router 即将要进入的目标，路由对象
  //from: Router 当前导航正要离开的路由
  //next: Function 一定要调用该方法来resolve这个钩子
  // console.log(to);
  if (to.path == '/mine' || to.path == '/login') {
    next();
    return;
  }
  console.log(from);
  // 获取token
  const token = JSON.parse(window.localStorage.getItem('userInfo')).token || {};
  console.log(token);
  if (!token) return next('/login');
  next();
});

//暴露
export default router;
