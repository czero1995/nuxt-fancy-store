<template>
  <div class="page">
        <van-nav-bar title="Fancy Store" fixed />
        
        <van-pull-refresh v-model="isLoading" @refresh="onRefresh">

           
            <div class="container">
                <van-swipe :autoplay="3000" class="swipe">
                    <van-swipe-item v-for="(bannerItem, bannerIndex) in bannerList" :key="bannerIndex">
                        <img class="swipe_img" :src="bannerItem.img" />
                    </van-swipe-item>
                </van-swipe>
                <div class="product_header">推荐</div>
                <div class="content flex">
                    <div v-for="(productItem, productIndex) in productList" class="product_item" :key="productIndex" @click.stop="onProductDetail(productItem.uid)">
                        <img :src="productItem.imgCover" alt />
                        <div class="flex-space">
                            <div class="product_item_text overflow_hidden">
                                <div class="product_title">{{ productItem.title }}</div>
                                <div class="product_price flex">
                                    <div><span class="price_pre">¥</span>{{ productItem.priceNow }}</div>
                                </div>
                            </div>
                            <div class="goods-cartBox">
                                <van-icon size="20px" name="cart-o" @click.stop="onAddCart(productItem)" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </van-pull-refresh>
        <tabs></tabs>
    </div>
</template>

<script>
import { apiGetBanner,apiGetProduct } from '~/api/product'
import { NavBar, Swipe, SwipeItem, PullRefresh, Toast, Icon } from "vant";
import http from "../plugins/http";
import axios from 'axios'
import tabs from '~/components/Tab'
export default {
  components: {
    [NavBar.name]: NavBar,
    [Swipe.name]: Swipe,
    [SwipeItem.name]: SwipeItem,
    [PullRefresh.name]: PullRefresh,
    [Toast.name]: Toast,
    [Icon.name]: Icon,
    tabs
  },
  data(){
    return{
       isLoading: false,
       bannerList:[],
       productList:[]
    }
  },
   async asyncData({app}) {
    let [bannerData, productData] = await Promise.all([
      apiGetBanner(),
      apiGetProduct(0,1),
    ])  
    return { 
      bannerList: bannerData.data.data, 
      productList: productData.data.data, 
    }
  },
  created(){
    console.log('进入created')
    // this.getProduct()
    // this.getBanner()
  },
  methods:{
    async getBanner(){
      let res = await apiGetBanner()
      this.bannerList = res.data.data
      console.log('banner',res.data)
    },
    async getProduct(){
      let res = await apiGetProduct(0,'热门')
      this.productList = res.data.data
      console.log('res',res.data)
    },
    onRefresh() {
            
    },
  },
}
</script>

<style lang="less" scoped>
@import "../static/less/variable.less";
.van-pull-refresh {
    overflow: auto;
}
.swiper {
    height: 160px;
}
.swipe_img {
    width: 100%;
    height: 160px;
    margin-top: 46px;
}
.container {
    padding-bottom: 0;
    font-size: 16px;
}
.content {
    flex-wrap: wrap;
    padding-bottom: 52px;
}
.product_header {
    font-size: 14px;
    padding: 5px;
    border-bottom: 1px solid #ccc;
}
.product_item {
    width: 50%;
    box-sizing: border-box;
    border-right: 1px solid #ccc;
    border-bottom: 1px solid #ccc;
    padding-bottom: 4px;
    background: white;
    &:nth-of-type(even) {
        border-right: none;
    }
    img {
        width: 100%;
        height: 180px;
    }
}
.product_item_text {
    color: #666;
    padding: 1px 8px;
    font-size: 13px;
}
.van-icon-cart-o {
    margin-right: 10px;
}
</style>
