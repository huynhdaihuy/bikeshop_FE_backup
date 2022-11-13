<template>
  <div class="wrapper">
    <div class="input_form">
      <InputSearch v-model="totalMoney" @submit-recommend="getProductsGreedy" />
      <div class="price-descs">
        Số tiền bạn muốn chi : {{ ` ${changedPrice(totalMoney)}` }}
      </div>
    </div>
    <div v-if="fillRecommendProductsCount > 0" class="recommend-wrapper">
      <div class="recommend-heading">
        Sản phẩm được chọn dành cho bạn
        <i class="fa-solid fa-cart-shopping"></i>
      </div>
      <div class="recommend_wrap">
        <div
          class="product_wapper"
          v-for="(product, index) in fillRecommendProducts"
          :key="product"
        >
          <router-link
            class="router_link"
            :to="{
              name: 'DetailProductPage',
              params: { id: product._id },
            }"
          >
            <span class="product_img">
              <img class="img_item" :src="`${product.path}`" alt="" />
            </span>
            <div class="product_body mt-3 d-flex flex-column ml-5 p-5">
              <div class="product_name">
                <div class="name_item">
                  {{ product.name }}
                  <span class="quantity"
                    >SL: x {{ fillQuantityRecommendProducts[index] }}</span
                  >
                </div>
              </div>
              <div class="product_brand">
                <div class="brand_item">Thương hiệu: {{ product.brand }}</div>
              </div>
              <div class="product_price">
                <p class="price_item">
                  Giá :{{ ` ${changedPrice(product.price)}` }}
                </p>
              </div>
              <div class="product_desc">
                <p class="desc_item">Mô tả sản phẩm :{{ product.desc }}</p>
              </div>
            </div>
          </router-link>
        </div>
      </div>
      <router-link :to="{ path: '/cart-view' }" @click="handleClickCartView">
        <button class="btn-payment" @click="handleClickCartView">
          Đặt hàng !
        </button>
      </router-link>
    </div>
  </div>
</template>
<style scoped>
.wrapper {
  margin-top: 120px;
  width: 100%;
  min-height: 50vh;
  margin-left: 400px;
}
.input_form {
  width: 50%;
  height: 40px;
}
.input_form input {
  width: 500px;
  height: 40px;
}
.price-descs {
  margin-top: 12px;
  margin-left: 8px;
  font-weight: 550;
}
.recommend-wrapper {
  margin-top: 100px;
}
.recommend-heading {
  font-size: 20px;
  font-weight: 500;
}
.recommend_wrap {
  margin-top: 40px;
  margin-bottom: 100px;
}
.router_link {
  text-decoration: none;
  color: black;
  display: flex;
  margin-bottom: 12px;
  align-items: center;
  justify-content: start;
  min-width: 500px;
  max-width: 920px;
  box-shadow: 0 3px 10px rgb(0 0 0 / 0.2);
  height: 160px;
  overflow: hidden;
}
.product_wapper {
  width: 100%;
  max-height: 100vh;
}
.product_img {
  min-width: 10%;
  min-height: 10%;
  display: flex;
  margin-left: 40px;
}
.img_item {
  margin: auto;
  object-fit: contain;
  width: 120px;
  height: 120px;
}
.name_item {
  font-weight: 600;
}

.quantity {
  color: var(--color-price);
  font-size: 12px;
  margin-left: 40px;
}

.brand_item {
  font-weight: 600;
  font-size: 12px;
}
.price_item {
  color: var(--color-price);
  font-size: 12px;
  margin-top: 4px;
}
.desc_item {
  font-size: 12px;
  margin-top: -8px;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
.btn-payment {
  width: 400px;
  height: 40px;
  background-color: var(--color-btn-red);
  color: white;
  outline: none;
  border: none;
  border-radius: 4px;
  margin-left: 240px;
  margin-bottom: 200px;
}
</style>
<script>
import ProductService from "../services/product.service";
import InputSearch from "../components/InputSearch.vue";
import BubbleSort from "../helpers/BubbleSort";
import Greedy from "../helpers/Greedy";
import changePrice from "../helpers/ChangePrice";
import ProductCard from "../components/ProductCard.vue";
export default {
  components: {
    ProductService,
    InputSearch,
    BubbleSort,
    Greedy,
    changePrice,
    ProductCard,
  },
  data() {
    return {
      products: [],
      totalMoney: 0,
      productsGreedy: [],
    };
  },
  computed: {
    fillProducts() {
      return this.products;
    },
    fillProductsCount() {
      return this.products.length;
    },
    fillRecommendProducts() {
      let productRecommend = [];
      this.productsGreedy.forEach((select) => {
        productRecommend.push(select.product);
      });
      return productRecommend;
    },
    fillQuantityRecommendProducts() {
      let quantityProductRecommend = [];
      this.productsGreedy.forEach((select) =>
        quantityProductRecommend.push(select.quantity)
      );
      return quantityProductRecommend;
    },
    fillRecommendProductsCount() {
      return this.productsGreedy.length;
    },
  },
  methods: {
    async retrieveProducts() {
      try {
        this.products = await ProductService.getAll();
      } catch (error) {
        console.log(error);
      }
    },
    getProductsGreedy() {
      this.productsGreedy = Greedy(
        this.totalMoney,
        BubbleSort(this.products, "inc")
      );
    },
    handleClickCartView() {
      let productCart = [];
      let quantityCart = [];
      this.productsGreedy.forEach((e) => {
        productCart.push(e.product);
        quantityCart.push(e.quantity);
      });
      this.$store.dispatch("auth/orderItemRecommendCart", {
        productCart,
        quantityCart,
      });
    },
    changedPrice(price) {
      return changePrice(price);
    },
  },
  created() {
    this.retrieveProducts();
  },
};
</script>