import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/home/home'

import findMusic from '@/views/home/components/right/findMusic.vue'
import FM from '@/views/home/components/right/FM.vue'
import lookLive from '@/views/home/components/right/lookLive.vue'
import video from '@/views/home/components/right/video.vue'
import friends from '@/views/home/components/right/friends.vue'

import localMusic from '@/views/home/components/right/localMusic.vue'
import downloadManagement from '@/views/home/components/right/downloadManagement.vue'

import recommend from '@/views/home/components/right/recommend.vue'
import songList from '@/views/home/components/right/songList.vue'
import hostStation from '@/views/home/components/right/hostStation.vue'
import rankingList from '@/views/home/components/right/rankingList.vue'
import singer from '@/views/home/components/right/singer.vue'
import newMusic from '@/views/home/components/right/newMusic.vue'
import songListContent from '@/comm/songListContent.vue'
import list from '@/comm/list.vue'
import comment from '@/comm/comment.vue'
Vue.use(VueRouter)
// 解决ElementUI导航栏中的vue-router在3.0版本以上重复点菜单报错问题
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}
const originalReplace = VueRouter.prototype.replace
VueRouter.prototype.replace = function replace (location) {
  return originalReplace.call(this, location).catch(err => err)
}
const routes = [{
  path: '/',
  name: 'Home',
  component: Home,
  children: [{
    path: '/11',
    redirect: '/11/recommend',
    name: 'findMusic',
    components: {
      right: findMusic
    },
    children: [{
      path: 'recommend',
      name: 'recommend',
      components: {
        content: recommend
      }
    }, {
      path: 'songList',
      name: 'songList',
      components: {
        content: songList
      }
    }, {
      path: 'hostStation',
      name: 'hostStation',
      components: {
        content: hostStation
      }
    }, {
      path: 'rankingList',
      name: 'rankingList',
      components: {
        content: rankingList
      }
    }, {
      path: 'singer',
      name: 'singer',
      components: {
        content: singer
      }
    }, {
      path: 'newMusic',
      name: 'newMusic',
      components: {
        content: newMusic
      }
    }]
  }, {
    path: '/12',
    name: 'FM',
    components: {
      right: FM
    }
  }, {
    path: '/13',
    name: 'lookLive',
    components: {
      right: lookLive
    }
  }, {
    path: '/14',
    name: 'video',
    components: {
      right: video
    }
  }, {
    path: '/15',
    name: 'friends',
    components: {
      right: friends
    }
  }, {
    path: '/21',
    name: 'localMusic',
    components: {
      right: localMusic
    }
  }, {
    path: '/22',
    name: 'downloadManagement',
    components: {
      right: downloadManagement
    }
  }, {
    path: '/11/songList/:id',
    name: 'songListContent',
    components: {
      right: songListContent
    },
    children: [{
      path: 'list',
      name: 'list',
      components: {
        list: list
      }
    }, {
      path: 'comment',
      name: 'comment',
      components: {
        list: comment
      }
    }]
  }]
}]

const router = new VueRouter({
  routes
})

export default router
