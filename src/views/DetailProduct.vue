<template>
  <div class="container">
    <div class="row nav_breadcrumb">
      <ul class="breadcrumb">
        <router-link :to="{ path: '/' }">
          <li>
            <i class="fa-solid fa-arrow-left mr-2"></i>
            Trang chủ
            <span class="divider">/</span>
          </li>
        </router-link>
        <router-link :to="{ path: '/products' }">
          <li>Sản phẩm <span class="divider">/</span></li>
        </router-link>
        <li class="active">{{ fillProduct.name }}</li>
      </ul>
    </div>
    <div class="row mt-5">
      <div class="col-7">
        <img :src="`${fillProduct.path}`" alt="" class="img_product" />
      </div>
      <div class="col-5" style="box-shadow: 0 3px 8px rgb(0 0 0 / 20%)">
        <div class="info_product p-4">
          <div
            class="info_brand d-flex align-items-center justify-content-between"
          >
            <div class="brand_item">THƯƠNG HIỆU : {{ fillProduct.brand }}</div>
            <span class="label label-success">RECOMMEND</span>
          </div>
          <div class="info_name">{{ fillProduct.name }}</div>
          <span class="divider_line"></span>
          <div
            class="
              info_wapper
              d-flex
              justify-content-between
              align-items-center
            "
          >
            <div class="info_price">
              Giá :{{ ` ${changedPrice(fillProduct.price)}` }}
            </div>
            <div class="info_status">AVAILABLE</div>
          </div>
          <button
            @click="handleAddItem(product)"
            type="button p-5"
            class="btn btn-dark"
          >
            Thêm vào giỏ hàng
          </button>
        </div>
      </div>
    </div>
    <div class="row desc_wrapper">
      <h4 class="heading_desc">THÔNG TIN SẢN PHẨM</h4>
    </div>
    <div class="row mt-5">
      <p class="detail_desc p-5">{{ fillProduct.desc }}</p>
    </div>
    <div class="row">
      <h4 class="p-2" style="font-weight: 600; border-bottom: 2px solid black">
        Sản phẩm khác
      </h4>
    </div>
    <div class="row mt-5 mb-5">
      <div class="col-12">
        <swiper
          v-if="fillProductsCount > 0"
          class="cate-container"
          :navigation="true"
          :modules="modules"
          :slidesPerView="4"
          :spaceBetween="20"
          :breakpoints="{
            '0': {
              slidesPerView: 1,
            },
            '768': {
              slidesPerView: 2,
            },
            '1020': {
              slidesPerView: 3,
            },
          }"
        >
          <!-- <swiper-wrapper> -->
          <swiper-slide
            v-for="product in products"
            :key="product"
            class="cate-box"
            @click="handleClickOtherProduct(product._id)"
          >
            <div style="cursor: pointer">
              <img class="cate_items" :src="`${product.path}`" alt="" />
              <div class="detail-product text-left border-top">
                <span class="detail-product__brand"
                  >Hãng : {{ product.brand }}</span
                >
                <div class="detail-product__name">{{ product.name }}</div>
                <div
                  class="
                    detail-product__footer
                    d-flex
                    align-items-center
                    justify-content-between
                    mt-2
                  "
                >
                  <div class="footer__price">
                    Giá :{{ ` ${changedPrice(product.price)}` }}
                  </div>
                  <i class="fas fa-cart-shopping"></i>
                </div>
              </div>
            </div>
          </swiper-slide>
        </swiper>
      </div>
    </div>
  </div>
  <!-- Modal Login -->
  <div v-if="isShowModal" class="modal fade" id="exampleModal" tabindex="-1">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">
            Bạn phải đăng nhập !
          </h5>
        </div>
        <div class="modal-body text-center" style="font-size: 12px">
          Bạn phải đăng nhập trước khi thêm sản phẩm vào giỏ hàng !
        </div>
        <div class="modal-footer" style="transform: translatex(-70px)">
          <router-link
            :to="{ path: '/login' }"
            class="text-decoration-none btn-modal"
          >
            <button type="button" class="btn btn-modal">
              Đi tới trang đăng nhập .
            </button>
          </router-link>
        </div>
      </div>
    </div>
  </div>
  <!-- Modal add items -->
  <div
    v-if="isShowAddItemSuccess"
    class="modal fade"
    id="exampleModal"
    tabindex="-1"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">
            Thêm vào giỏ hàng thành công
          </h5>
        </div>
        <div class="modal-body text-center" style="font-size: 18px">
          Sản phẩm đã được thêm vào giỏ hàng !
        </div>
        <div class="modal-footer">
          <button
            @click="handleClose"
            type="button"
            class="text-decoration-none btn btn-modal btn-modal-item"
            style="color: var(--color-btn-red); background-color: transparent"
          >
            Thoát
          </button>
          <router-link
            :to="{ path: '/cart-view' }"
            class="text-decoration-none btn-"
          >
            <button type="button" class="btn btn-modal btn-modal-item">
              Giỏ hàng
            </button>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import ProductService from "@/services/product.service";
import { Swiper, SwiperSlide } from "swiper/vue";
import { Navigation } from "swiper";
import "swiper/css/bundle";
import "swiper/css/navigation";
import changePrice from "../helpers/ChangePrice";

export default {
  components: {
    Swiper,
    SwiperSlide,
    ProductService,
    changePrice,
  },
  setup() {
    return {
      modules: [Navigation],
    };
  },
  props: {
    _id: { type: String },
  },
  data() {
    return {
      product: {},
      productPriceChanged: 0,
      products: [],
      isLogin: false,
      isShowModal: false,
      isShowAddItemSuccess: false,
      productsCart: [],
    };
  },
  computed: {
    fillProduct() {
      return this.product;
    },
    fillProducts() {
      return this.products;
    },
    fillProductsCount() {
      return this.products.length;
    },
  },
  methods: {
    async getProduct() {
      try {
        this.product = await ProductService.get(this.$route.params.id);
        this.isLogin = this.$store.state.auth.status.loggedIn;
      } catch (error) {
        console.log(error);
      }
    },
    async retrieveProducts() {
      try {
        this.products = await ProductService.getAll();
      } catch (error) {
        console.log(error);
      }
    },
    async handleAddItem(product) {
      if (!this.isLogin) {
        this.isShowModal = true;
      } else if (this.isLogin) {
        this.isShowModal = false;
        this.$emit("addProduct", product);
        this.$store.dispatch("auth/addItemCart", this.product).then(
          () => {
            this.isShowAddItemSuccess = true;
            setTimeout(() => {
              this.isShowAddItemSuccess = false;
            }, 2000);
          },
          (error) => {
            console.log("Add product failled !");
          }
        );
      }
    },
    handleClose() {
      this.isShowAddItemSuccess = false;
    },
    changedPrice(price) {
      return changePrice(price);
    },
    async handleClickOtherProduct(id) {
      this.$router.push({
        name: "DetailProductPage",
        params: { id },
      });
      this.product = await ProductService.get(id);
      window.scrollY = 0;
    },
  },
  mounted() {
    this.getProduct();
    this.retrieveProducts();
  },
};
</script>
<style scoped>
.nav_breadcrumb {
  margin-top: 100px;
}
.breadcrumb {
  background-color: transparent;
}
.breadcrumb a {
  padding: 0 8px;
}
.img_product {
  object-fit: contain;
  width: 100%;
  height: 480px;
  border-radius: 5px;
  box-shadow: 0 3px 10px rgb(0 0 0 / 0.2);
}
.brand_item {
  font-size: 18px;
  font-weight: 600;
}
.label-success {
  padding: 6px;
  background-color: black;
  color: white;
  font-weight: 600;
  min-width: 120px;
  text-align: center;
  font-size: 14px;
  position: relative;
}
.label-success::after {
  content: "";
  position: absolute;
  right: 0;
  bottom: 0;
  width: 0;
  height: 0;
  border-color: transparent transparent #fff;
  border-style: solid;
  border-width: 0 0 0.7rem 0.7rem;
}
.info_product {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.info_name {
  font-size: 24px;
  font-weight: 700;
}
.divider_line {
  width: 100%;
  height: 0.1px;
  background-color: black;
}
.info_status {
  font-size: 8px;
  width: 60px;
  color: white;
  padding: 2px 8px;
  border-radius: 2px;
  background-color: #468847;
  text-align: center;
}
.info_price {
  margin: 12px 0;
  font-size: 20px;
  font-weight: 600;
  color: var(--color-price);
}
.desc_wrapper {
  margin: 40px 0;
  background-color: #fafafa;
}
.heading_desc {
  font-weight: 600;
  border-bottom: black 2px solid;
  padding: 8px;
}
.cate-box {
  width: 20%;
  box-shadow: 3px 8px 10px rgb(0 0 0 / 0.2);
  margin-bottom: 24px;
}
.cate-box a {
  text-decoration: none;
  color: black;
}
.cate_items {
  width: 100%;
  height: 250px;
  object-fit: contain;
}
.detail-product {
  font-weight: 600;
  font-size: 18px;
  padding: 40px 28px;
}

.footer__price {
  color: var(--color-price);
  font-weight: 400;
}
.detail-product__name {
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
}
/* Modal style */
.modal {
  display: block;
  opacity: 1;
}
.fade {
  background-color: rgba(0, 0, 0, 0.6);
}
.modal-content {
  margin-top: 20rem;
}
.btn-modal,
.btn-modal {
  width: 320px;
  text-align: center;
  border-color: transparent;
  outline: none;
  background-color: black;
  color: white;
  padding: 4px 0;
  border-radius: 4px;
  font-weight: 600;
}
.modal-header {
  display: flex;
  justify-content: center;
  background-color: black;
  color: white;
  border-radius: 0;
  margin-top: -4px;
}
.modal-footer {
  display: flex;
  align-items: center;
  justify-content: end;
}
.modal-title {
  font-size: 20px;
  font-weight: 600;
  text-align: center;
}
.btn-modal-item {
  max-width: 100px;
  font-size: 10px;
  padding: 8px;
}
</style>