<template>
    <div id="app_container">
        <van-tabbar v-model="active">
            <van-tabbar-item icon="home-o" to="/">首页</van-tabbar-item>
            <van-tabbar-item icon="cluster-o" @click="onCategory">分类</van-tabbar-item>
            <van-tabbar-item icon="shopping-cart-o" to="/cart">购物车</van-tabbar-item>
            <van-tabbar-item icon="friends-o" to="/member">我的</van-tabbar-item>
        </van-tabbar>
    </div>
</template>

<script>
import { Tabbar, TabbarItem } from "vant";
export default {
    data() {
        return {
            active: 0
        };
    },
    components: {
        [Tabbar.name]: Tabbar,
        [TabbarItem.name]: TabbarItem
    },
    created() {
        switch (this.$route.path) {
            case "/product":
                this.active = 0;
                break;
            case "/category":
                this.active = 1;
                break;
            case "/cart":
                this.active = 2;
                break;
            case "/member":
                this.active = 3;
                break;
        }
    },
    methods:{
        onCategory(){
            console.log('a')
             this.$router.push('/category');
        }
    },
};
</script>