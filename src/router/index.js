import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Bottom from '../views/Bottom.vue'
import Classify from '../views/classify/Classify.vue'

Vue.use(VueRouter)

const routes = [{
        path: '/',
        redirect: '/home'
    },
    {
        path: '/home',
        // redirect: '/',
        // alias: '/',
        component: Bottom,
        children: [{
            path: '/',
            name: 'home',
            meta: {
                title: "首页"
            },
            component: Home
        }]
    },
    {
        //分类
        path: '/classify',
        component: Bottom,
        children: [{
            path: '',
            name: 'classify',
            meta: {
                title: "分类"
            },
            component: Classify,
        }]
    },
    {
        path: '/my',
        component: Bottom,
        children: [
            // 我的
            {
                path: '',
                name: 'my',
                meta: {
                    title: "我的"
                },
                // route level code-splitting
                // this generates a separate chunk (about.[hash].js) for this route
                // which is lazy-loaded when the route is visited.
                component: () =>
                    import ( /* webpackChunkName: "about" */ '../views/my/My.vue')
            },
        ]
    },
    {
        path: '/shoppingcart',
        component: Bottom,
        children: [
            //购物车
            {
                path: '',
                name: 'shoppingcart',
                meta: {
                    title: "购物车"
                },
                // route level code-splitting
                // this generates a separate chunk (about.[hash].js) for this route
                // which is lazy-loaded when the route is visited.
                component: () =>
                    import ( /* webpackChunkName: "about" */ '../views/shoppingcart/ShoppingCart.vue')
            },
        ]
    },
    //商品详情页
    {
        path: '/commoditydetails',
        name: 'commoditydetails',
        meta: {
            title: "商品详情"
        },
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import ( /* webpackChunkName: "about" */ '../views/commoditydetails/CommodityDetails.vue')
    },
    //结算页面
    {
        path: '/settlementpage',
        name: 'settlementpage',
        meta: {
            title: "结算"
        },
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import ( /* webpackChunkName: "about" */ '../views/settlementpage/SettlementPage.vue')
    },
    // 评价中心
    {
        path: '/evaluationcenter',
        name: 'evaluationcenter',
        meta: {
            title: "评价中心"
        },
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import ( /* webpackChunkName: "about" */ '../views/my/evaluationcenter/EvaluationCenter.vue')
    },
    // 发布评价
    {
        path: '/postevaluation',
        name: 'postevaluation',
        meta: {
            title: "发布评价"
        },
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import ( /* webpackChunkName: "about" */ '../views/my/evaluationcenter/PostEvaluation.vue')
    },
    // 评价详情
    {
        path: '/evaluationdetails',
        name: 'evaluationdetails',
        meta: {
            title: "评价详情"
        },
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import ( /* webpackChunkName: "about" */ '../views/my/evaluationcenter/EvaluationDetails.vue')
    },
    // 收藏页面
    {
        path: '/collection',
        name: 'collection',
        meta: {
            title: "收藏"
        },
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import ( /* webpackChunkName: "about" */ '../views/my/collection/Collection.vue')
    },
    // 历史浏览
    {
        path: '/browsinghistory',
        name: 'browsinghistory',
        meta: {
            title: "历史浏览"
        },
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import ( /* webpackChunkName: "about" */ '../views/my/browsinghistory/BrowsingHistory.vue')
    },
    // 我的订单
    {
        path: '/myorder',
        name: 'myorder',
        meta: {
            title: "我的订单"
        },
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import ( /* webpackChunkName: "about" */ '../views/my/myorder/MyOrder.vue')
    },
    // 关于地址的操作
    {
        //地址列表
        path: '/addresslist',
        name: 'addresslist',
        meta: {
            title: "地址"
        },
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import ( /* webpackChunkName: "about" */ '../views/address/AddressList.vue')
    },
    {
        //编辑列表
        path: '/editaddress',
        name: 'editaddress',
        meta: {
            title: "地址编辑"
        },
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import ( /* webpackChunkName: "about" */ '../views/address/EditAddress.vue')
    },
    {
        //登录注册
        path: '/login',
        name: 'login',
        meta: {
            title: "登录注册"
        },
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import ( /* webpackChunkName: "about" */ '../views/login/Login.vue')
    },
    {
        //编辑列表
        path: '/city',
        name: 'city',
        meta: {
            title: "城市"
        },
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import ( /* webpackChunkName: "about" */ '../views/city/City.vue')
    },
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

router.beforeEach((to, from, next) => {
    document.title = to.meta.title
    next()

})

export default router