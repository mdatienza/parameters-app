import Vue from 'vue'
import Router from 'vue-router'
import firebase from 'firebase'
Vue.use(Router)
const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      redirect: 'login',
      name: ''
    },
    {
      path: '/login',
      name: 'login',
      component: () => import(/* webpackChunkName: "about" */ './views/Login')
    },
    {
      path: '/register',
      name: 'register',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/Register')
    },
    {
      path: '/student',
      name: 'student',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/Student'),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/blog',
      name: 'blog',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/Blog'),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/view-blog',
      name: 'view-blog',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/ViewBlog'),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/image-editor',
      name: 'image-editor',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/ImageEditor'),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/book',
      name: 'book',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/Book'),
      meta: {
        requiresAuth: true
      }
    }
  ]
})

router.beforeEach((to, from, next) => {
  const currentUser = firebase.auth().currentUser
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  if (requiresAuth && !currentUser) next('login')
  else if (!requiresAuth && currentUser) next('/student')
  else next()
})
export default router
