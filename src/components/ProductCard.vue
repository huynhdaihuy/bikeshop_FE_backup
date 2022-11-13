<template>
  <div class="content-wrapper m-4">
    <div
      class="product_wapper"
      v-for="(product, index) in products"
      :key="index"
    >
      <router-link
        class="router_link"
        :to="{
          name: 'DetailProductPage',
          params: { id: product._id },
        }"
      >
        <div class="product_img">
          <img class="img_item" :src="`${product.path}`" alt="" />
        </div>
        <div class="product_body mt-3 d-flex flex-column">
          <div class="product_name">
            <h3 class="name_item">{{ product.name }}</h3>
          </div>
          <div class="product_brand">
            <h4 class="brand_item">Thương hiệu: {{ product.brand }}</h4>
          </div>
          <div class="product_price">
            <p class="price_item">
              Giá :{{ ` ${changedPrice(product.price)}` }}
            </p>
          </div>
          <div class="product_desc">
            <p class="desc_item">{{ product.desc }}</p>
          </div>
        </div>
      </router-link>
    </div>
  </div>
</template>
<script>
import changePrice from "../helpers/ChangePrice";

export default {
  props: {
    products: { type: Array, required: true },
  },
  components: {
    changePrice,
  },
  methods: {
    changedPrice(price) {
      return changePrice(price);
    },
  },
};
</script>
<style scoped>
.content-wrapper {
  width: 100%;
  display: flex;
  flex-flow: row wrap;
  gap: 20px;
}
.product_wapper {
  width: 22%;
  margin-top: 24px;
  background-color: #fff;
  border-radius: 4px;
}
.product_wapper:hover {
  padding-top: 4px;
}
.product_img {
  border-radius: 4px;
  overflow: hidden;
  width: 100%;
}
.product_body {
  padding: 30px;
  display: flex;
  flex-direction: column;
  gap: 4px;
  width: 100%;
  box-shadow: 0 3px 10px rgb(0 0 0 / 0.2);
}
.img_item {
  width: 100%;
  height: 280px;
  object-fit: contain;
}
.name_item {
  font-weight: 700;
  font-size: 16px;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
}
.brand_item {
  font-weight: 600;
  font-size: 12px;
}
.price_item {
  color: var(--color-price);
}
.product_desc {
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
.desc_item {
  font-size: 12px;
}
.router_link {
  text-decoration: none;
  color: black;
}
</style>