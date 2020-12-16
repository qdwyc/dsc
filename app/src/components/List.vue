<template>
  <div class="">
    <ul class="list-wrap">
      <li v-for="(list, index) in listdatas" :key="index">
          <router-link :to="'/goodsdetail/'+list.goods_id">
            <img :src="list.goods_thumb" alt />
            <div class="list-title">{{list.title}}</div>
            <div class="list-price">{{list.shop_price_formated}}</div>
          </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: "List",
    components: {},
    props: {
      listdatas: Array,
    }
  }
</script>

<style lang="less">
  .list-wrap {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    li {
      width: 50%;
      text-align: center;
      img {
        width: 17rem;
        height: 17rem;
        border-radius: 1rem;
      }
      .list-title {
        width: 17rem;
        text-align: left;
        font-size: 1.3rem;
        height: 4rem;
        line-height: 2rem;
        overflow: hidden;
        margin: 0.5rem 0;
        margin-left: 1rem;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
      }
      .list-price {
        color: red;
        font-size: 1.6rem;
        line-height: 3rem;
      }
    }
  }
</style>