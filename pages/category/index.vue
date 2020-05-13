<template>
    <div class="page">
        <van-nav-bar title="分类" fixed />
        <div class="container flex" id="container">
            <van-tabs @click="onBar" animated sticky>
                <van-tab :title="menuItem.title" v-for="(menuItem, menuIndex) in menuList" :key="menuIndex">
                    <div class="rightItem" v-for="(categoryItem, categoryIndex) in categoryList" @click="onDetail(categoryItem.uid)" :key="categoryIndex">
                        <div class="category-item flex">
                            <div class="item flex overflow_hidden">
                                <img class="goods-img" :src="categoryItem.imgCover" />
                                <div>
                                    <p class="product_title">{{ categoryItem.title }}</p>
                                    <p class="product_price"><span class="price_pre">¥</span> {{ categoryItem.priceNow }}</p>
                                    <van-icon size="20px" name="cart-o" @click.stop="onAddCart(categoryItem)" />
                                </div>
                            </div>
                        </div>
                    </div>
                </van-tab>
            </van-tabs>
        </div>
         <tabs></tabs>
    </div>
</template>

<script>
import { apiGetProduct } from "@/api/product.js";
import { apiGetCategoryMenu } from "@/api/category.js";
import { NavBar, Tab, Tabs, Toast, Icon } from "vant";
import tabs from '~/components/Tab'
import http from "../../plugins/http";
export default {
    data() {
        return {
            menuList: [],
            categoryContent: [],
            pageNum: 0,
            catetoryUid: 2
        };
    },
    components: {
        [NavBar.name]: NavBar,
        [Tab.name]: Tab,
        [Tabs.name]: Tabs,
        [Toast.name]: Toast,
        [Icon.name]: Icon,
        tabs
    },
    async asyncData({app}) {
    let [menuData,categoryData] = await Promise.all([
      apiGetCategoryMenu(),
      apiGetProduct(0,2)
    ])  
    return { 
      menuList: menuData.data.data.slice(1), 
      categoryList: categoryData.data.data
    }
  },
    created(){
    },
    mounted(){
        console.log('进入mounted')
    },
    methods: {
        async getCategoryList() {
            console.log('abcd')
            let res = await apiGetProduct(0,this.catetoryUid)
            this.categoryList = res.data.data;
        },
        onBar(index, title) {
            let menuItem = this.menuList.find(function(item) {
                return item.title === title;
            });
            this.catetoryUid = menuItem.uid;
            this.getCategoryList();
        },
        async onAddCart(item) {
            let res = await apiAddCart(item.uid);
            if (res.data.code === 0) {
                Toast.success({
                    message: this.$t("m.message.addSuccess"),
                    duration: 500
                });
            } else {
                Toast.fail({
                    message: res.data.msg,
                    position: "bottom"
                });
            }
        },
        onDetail(uid) {
            this.$router.push({
                path: "/detail",
                query: { uid }
            });
        }
    }
};
</script>

<style lang="less" scoped>
@import "../../static/less/variable.less";
.container {
    display: flex;
    align-items: flex-start;
    padding-top: 40px;
    // padding-bottom: 52px;
}
.van-tab__pane {
    padding-bottom: 52px;
}
.van-nav-bar {
    z-index: 1000 !important;
}
.category-item {
    border-bottom: 1px solid #ccc;
    height: 110px;
    width: 100%;
    background: white;
}

.goods-img {
    margin-right: 10px;
    width: 120px;
    height: 100px;
}
.product_price {
    margin: 10px 0;
}

.van-tabs--line {
    width: 100%;
}
</style>
