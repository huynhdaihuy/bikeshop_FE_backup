<template>
  <div class="main_theme">
    <img src="../assets/img/main_theme/1.jpg" alt="" class="image_theme" />
  </div>
  <div class="cate mb-4">
    <p class="p-4 text-center" style="font-size: 24px; font-weight: 600">
      Sản phẩm mới về
      <a
        href="/"
        class="text-decoration-none float-right"
        style="font-size: 14px"
      >
        Xem tất cả -></a
      >
    </p>
    <div></div>
    <swiper
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
      <swiper-slide class="cate-box">
        <img class="cate_items" src="../assets/img/products/1.jpeg" alt="" />
        <div class="detail-product text-left border-top">
          <span class="detail-product__brand">Fizik</span>
          <div class="detail-product__name">Yên xe đạp Road Fizik</div>
          <div
            class="
              detail-product__footer
              d-flex
              align-items-center
              justify-content-between
              mt-2
            "
          >
            <div class="footer__price">500.000 đ</div>
            <i class="fas fa-cart-shopping"></i>
          </div>
        </div>
      </swiper-slide>

      <swiper-slide class="cate-box">
        <img class="cate_items" src="../assets/img/products/2.jpeg" alt="" />
        <div class="detail-product text-left border-top">
          <span class="detail-product__brand">Michelin</span>
          <div class="detail-product__name">Lốp bánh xe 27inch cho MTB</div>
          <div
            class="
              detail-product__footer
              d-flex
              align-items-center
              justify-content-between
              mt-2
            "
          >
            <div class="footer__price">850.000 đ</div>
            <i class="fas fa-cart-shopping"></i>
          </div>
        </div>
      </swiper-slide>

      <swiper-slide class="cate-box">
        <img class="cate_items" src="../assets/img/products/3.jpeg" alt="" />
        <div class="detail-product text-left border-top">
          <span class="detail-product__brand">Santic</span>
          <div class="detail-product__name">
            Áo khoác dạ quang cho người đi xe đạp
          </div>
          <div
            class="
              detail-product__footer
              d-flex
              align-items-center
              justify-content-between
              mt-2
            "
          >
            <div class="footer__price">1.200.000 đ</div>
            <i class="fas fa-cart-shopping"></i>
          </div>
        </div>
      </swiper-slide>

      <swiper-slide class="cate-box">
        <img class="cate_items" src="../assets/img/products/4.jpeg" alt="" />
        <div class="detail-product text-left border-top">
          <span class="detail-product__brand">KNOX</span>
          <div class="detail-product__name">
            Mũ cho người đi xe đạp địa hình
          </div>
          <div
            class="
              detail-product__footer
              d-flex
              align-items-center
              justify-content-between
              mt-2
            "
          >
            <div class="footer__price">450.000 đ</div>
            <i class="fas fa-cart-shopping"></i>
          </div>
        </div>
      </swiper-slide>
      <swiper-slide class="cate-box">
        <img class="cate_items" src="../assets/img/products/5.jpeg" alt="" />
        <div class="detail-product text-left border-top">
          <span class="detail-product__brand">ParkTool</span>
          <div class="detail-product__name">Trụ sửa chữa cao cấp</div>
          <div
            class="
              detail-product__footer
              d-flex
              align-items-center
              justify-content-between
              mt-2
            "
          >
            <div class="footer__price">2.200.000 đ</div>
            <i class="fas fa-cart-shopping"></i>
          </div>
        </div>
      </swiper-slide>
    </swiper>
  </div>
</template>

<script>
// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from "swiper/vue";
import { Navigation } from "swiper";

// Import Swiper styles
import "swiper/css/bundle";
import "swiper/css/navigation"; // core Swiper

export default {
  components: {
    Swiper,
    SwiperSlide,
  },
  setup() {
    return {
      modules: [Navigation],
    };
  },
};
</script>

<style  scoped>
.main_theme {
  position: relative;
  margin-top: -10px;
}
.image_theme {
  object-fit: fill;
  width: 100%;
}

.cate {
  background-color: white;
  padding: 80px 0;
}
.cate_items {
  margin: 1rem 0;
  max-height: 280px;
  max-width: 280px;
  object-fit: contain;
}
span {
  font-size: 2rem;
  font-weight: bold;
}
.cate-box {
  width: 450px;
  border: 2px solid var(--black);
  border-radius: 0.5rem;
  text-align: center;
  cursor: pointer;
  border: 0.1rem solid #e1e1e1;
}
.cate-box:hover {
  box-shadow: 0 1rem 3rem 0 rgb(0 0 0 / 10%);
}
.img_desc {
  font-size: 14px;
  font-weight: 500;
}
.detail-product {
  padding: 12px 48px;
}
.footer__price {
  color: #ee4d2d;
}
i {
  font-size: 24px;
}
i:hover {
  opacity: 0.8;
}
.detail-product__brand {
  font-size: 20px;
}
.cate-container {
  margin-left: 40px;
}
</style>
