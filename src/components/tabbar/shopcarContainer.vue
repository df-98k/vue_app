<template>
  <div class="shopcar-container">
    <!-- 商品列表区域 -->
    <div class="goods-list">
      <div class="mui-card" v-for="(item,i) in goodslist" :key="item.id">
        <div class="mui-card-content">
          <div class="mui-card-content-inner jiesuan">
            <!-- 开关按钮 -->
           <mt-switch
           v-model="$store.getters.getGoodsSelected[item.id]"
            @change="selectedChanged(item.id, $store.getters.getGoodsSelected[item.id])"
           ></mt-switch>

            <img :src="item.thumb_path" alt />

            <div class="info">
              <h3>{{item.title}}  </h3>
              <p>

                <span>￥{{item.sell_price}} </span>
                <!-- :initcount="$store.getters.getGoodsCount[item.id]" --> 
                <number :initcount="$store.getters.getGoodsCound[item.id]" :goodsid="item.id"></number>
                <a href="#" @click.prevent="remove(item.id,i)">删除</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  


    <!-- 商品结算区域 -->
    <div class="mui-card">
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
            <div >

               <p class="allprice">结算清单:</p>
              <p>已勾选商品 <span class="red">  {{$store.getters.getAllgoodsPlay.number}} </span>件</p>
              <p>总价<span>￥  {{$store.getters.getAllgoodsPlay.price}} </span></p>

            </div>
           <mt-button type="danger" class="frigt">去结算</mt-button> 
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import number from "../subcomponents/shopcarnumber.vue";

export default {
  data() {
    return {
      goodslist: []
    };
  },
  created() {
    this.getgoodsList();
  },
  methods: {
    getgoodsList() {
      // 先根据ID判断购物车里面是否有这个商品
      // 所以建个空数组，存放每组的ID
      var IDarr = [];
      this.$store.state.car.forEach(element => {
        IDarr.push(element.id);
        if (IDarr.length <= 0) {
          return;
        }
      });

      this.$http
        .get("api/goods/getshopcarlist/" + IDarr.join(","))
        .then(result => {
          console.log(result);
          if (result.body.status === 0) {
            this.goodslist = result.body.message;
          }
        });
    },
    remove(id,index){
      
      // 删除两个，一是store中的ID，二是组件中的 goodslist 中，对应要删除的那个商品，使用 index 来删除
      this.goodslist.splice(index,1)//splice 从第i开始删除一个
      this.$store.commit("removeFormCar",id)
    },
    selectedChanged(id,val){
        // 每当点击开关，把最新的 快关状态，同步到 store 中
      this.$store.commit("updateGoodsSelected",{id,selected:val})
    }
  },
  components: {
    number
  }
};
</script>

<style lang="scss" scoped>
.shopcar-container{
	 background-color: #eee;
  overflow: hidden;
};
.mui-card-content-inner img {

  width: 50px;
};
h3 {
	color: rgb(75, 78, 99);
  font-size: 13px;
};
span {
  color: red;
};
.mui-card-content-inner {
  display: flex;
  align-items: center;

};

  .red {
      color: red;
      font-weight: bold;
      font-size: 16px;
    }
.frigt{
  margin-left: 80px;
  
}
.allprice{
  font-size: 20px
}

</style>