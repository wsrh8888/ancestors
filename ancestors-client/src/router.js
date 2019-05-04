import Vue from 'vue'
import Router from 'vue-router'
import NotFound from './views/404.vue'
import Index from './views/Index.vue'
import Login from './views/Login.vue'
import Register from './views/Register.vue'
import Home from './views/Home.vue'
import InfoShow from './views/InfoShow.vue'
// 游戏基础信息页面
import GameBasis from './views/GameBasis.vue'
// 所有的信息的的页面
import Information from './views/Information.vue'
// 游戏的下载信息页面
import Download from './views/Download.vue'
// 游戏的更新日志页面
import Update from './views/Update.vue'
// 教程
import Course from './views/Course.vue'
// 游戏截图
import Screenshot from './views/Screenshot.vue'

// 文章页面
import Article from './views/Article/Article.vue'
// 类型的页面
import Type from './views/Article/Type.vue'

Vue.use(Router)

const router = new Router({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      redirect: '/index'
    },
    {
      path: '/index',
      component: Index,
      children: [{
        path: '/',
        component: Home
      },{
        path: '/home',
        name: 'home',
        component: Home
      },{
        path: '/infoshow',
        name: 'InfoShow',
        component: InfoShow
      },{
        path: '/gamebasis',
        name: 'GameBasis',
        component: GameBasis
      },{
        path: '/information',
        name: 'Information',
        component: Information
      },
      
      // 游戏下载信息的路由
      {
        path: '/download',
        name: 'Download',
        component: Download
      }, 

      // 游戏的更新日志路由
      {
        path: '/update',
        name: 'Update',
        component: Update
      },
      // 游戏攻略
      {
        path: '/course',
        name: 'Course',
        component: Course
      },{
        path: '/screenshot',
        name: 'Screenshot',
        component: Screenshot
      }, {
        path: '/article',
        name: 'Article',
        component: Article
      }, {
        path: '/type',
        name: 'Type',
        component: Type
      }]
    },
    

    // {
    //   path: '/article',
    //   hildren: [{
    //     path: 'xxxx',
    //     name: 'article',
    //     component: Article
    //   }]
    // },
    // redirect: '/article/index',
    //   children: [{
    //     
    //   }]
    // 注册页面
    {
      path: '/register',
      name: 'register',
      component: Register
    },

    // 登录页面
    {
      path: '/login',
      name: 'login',
      component: Login
    },

    // 404页面
    {
      path: '*',
      name: '/404',
      component: NotFound
    }
  ]
})

// 路由守卫
router.beforeEach((to,from,next) => {
  const isLogin = localStorage.eleToken ? true : false
  if (to.path == '/login' || to.path == '/register' || to.path=='/home') {
    next()
  } else {
    isLogin?next():next('/login')
  }
})
export default router