import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/kota',
    name: 'kota',
    component: () => import(/* webpackChunkName: "about" */ '../views/WisataKota.vue')
  },
  // {
  //   path: '/kota/:id',
  //   name: 'paketkota',
  //   component: () => import(/* webpackChunkName: "about" */ '../views/WisataPaket.vue')
  // },
  {
    path: '/terbaik',
    name: 'terbaik',
    component: () => import(/* webpackChunkName: "about" */ '../views/WisataTerbaik.vue')
  },
  {
    path: '/paket',
    name: 'paket',
    component: () => import(/* webpackChunkName: "about" */ '../views/WisataPaket.vue')
  },
  {
    path: '/hotel',
    name: 'hotel',
    component: () => import(/* webpackChunkName: "about" */ '../views/WisataHotel.vue')
  },
  {
    path: '/tempat',
    name: 'tempat',
    component: () => import(/* webpackChunkName: "about" */ '../views/WisataTempat.vue')
  },
  {
    path: '/riwayat',
    name: 'riwayat',
    component: () => import(/* webpackChunkName: "about" */ '../views/RiwayatView.vue')
  },
  {
    path: '/fasilitas',
    name: 'fasilitas',
    component: () => import(/* webpackChunkName: "about" */ '../views/FasilitasView.vue')
  },
  {
    path: '/partnership',
    name: 'partnership',
    component: () => import(/* webpackChunkName: "about" */ '../views/PartnershipView.vue')
  },
  {
    path: '/testimoni',
    name: 'testimoni',
    component: () => import(/* webpackChunkName: "about" */ '../views/TestimoniView.vue')
  },
  {
    path: '/admin',
    name: 'admin',
    component: () => import(/* webpackChunkName: "about" */ '../views/AdminView.vue')
  },
  {
    path: '/kontak',
    name: 'kontak',
    component: () => import(/* webpackChunkName: "about" */ '../views/KontakView.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "about" */ '../views/LoginView.vue')
  },

]

const router = new VueRouter({
  routes
})

export default router
