<template>
  <div class="container_wrapper m-0">
    <div class="row align-items-center justify-content-around header_wrapper">
      <div class="col-3 p-3 logo_header">
        <img class="logo_header" src="../assets/img/logo/1.png" alt="" />
      </div>
      <div class="col-6">
        <div class="row">
          <div class="col-3">
            <router-link :to="{ path: '/' }" class="text-decoration-none">
              GIỚI THIỆU
            </router-link>
          </div>
          <div class="col-3">
            <router-link
              :to="{ path: '/products' }"
              class="text-decoration-none"
            >
              SẢN PHẨM
            </router-link>
          </div>
          <div class="col-3">
            <router-link
              class="text-decoration-none"
              style="opacity: 1"
              :to="{ name: 'NewsView' }"
              >TIN TỨC</router-link
            >
          </div>
          <div class="col-3">
            <router-link
              class="text-decoration-none"
              style="opacity: 1"
              :to="{ name: 'ContactView' }"
              >LIÊN HỆ</router-link
            >
          </div>
        </div>
      </div>
      <div class="col-3">
        <router-link :to="{ name: 'RecommendProductView' }">
          <button class="recommend-btn">Bạn cần tư vấn ?</button>
        </router-link>
        <span v-if="isLoggin" class="logo_tail">
          <i class="fa-solid fa-user-tie avatar_logo">
            <ul class="detail-avatar">
              <li class="detail-item">Đăng nhập</li>
              <li class="detail-item">Đăng ký</li>
            </ul>
            <ul class="detail-avatar">
              <li class="detail-item">
                <router-link
                  :to="{ name: 'ProfileView' }"
                  style="font-weight: 600"
                  >Tài khoản</router-link
                >
              </li>
              <hr />
              <li class="detail-item" v-if="getStatusAdmin === false">
                <router-link
                  :to="{ path: `/orders/${user._id}` }"
                  style="font-weight: 600"
                  >Đơn hàng của tôi</router-link
                >
              </li>
              <hr />
              <li class="detail-item" v-if="getStatusAdmin">
                <router-link
                  class="link"
                  :to="{ name: 'ManageView' }"
                  style="padding: 12px; font-weight: 600"
                >
                  Quản lý
                </router-link>
              </li>
              <hr />
              <li @click="handleLogout" class="detail-item">Đăng xuất</li>
            </ul>
          </i>
          <router-link class="cart-link" :to="{ path: '/cart-view' }">
            <i class="fa-solid fa-cart-shopping ml-4 icon-cart">
              <div class="cart-wrapper scroll-bar">
                <div class="cart-heading">Sản phẩm đã thêm ...</div>
                <CartItem :cartItems="getItemsCart" />
              </div>
            </i>
          </router-link>
        </span>
        <span v-else class="login-wrapper ml-4">
          <router-link
            class="text-decoration-none p-0"
            :to="{ path: '/login' }"
          >
            <span class="loggin-title"> Đăng nhập ?</span>
          </router-link>
        </span>
      </div>
    </div>
  </div>
  <hr />
</template>
<style scoped>
.container_wrapper {
  position: fixed;
  z-index: 1030;
  width: 100%;
  height: 80px;
  font-size: 14px;
  background: #e6e6e6;
  padding: 0;
  margin: 0;
}
.header_wrapper {
  width: 100%;
  height: 100%;
  background: black;
  color: #e6e6e6;
  margin: 0;
}
.logo_header {
  width: 100%;
  height: 100%;
  position: relative;
}
.logo_header img {
  position: absolute;
  top: -8px;
  object-fit: contain;
  width: 240px;
  height: 90px;
}
a {
  color: #e6e6e6;
  font-weight: 500;
  padding: 8px;
}
a:hover {
  opacity: 0.6;
}

.logo_tail {
  z-index: 1;
  position: absolute;
  margin-left: 10px;
}
form input:focus-visible {
  outline: none;
}
hr {
  margin: 0;
}
i {
  font-size: 18px;
  cursor: pointer;
}

input {
  padding: 12px 0 12px 24px;
}
.avatar_logo {
  margin-right: 12px;
}
.avatar_logo:hover .detail-avatar {
  display: block;
  min-width: 160px;
  min-height: 80px;
  border-radius: 4px;
  transition: all 0.3s linear;
  transform: translateX(0);
}
.detail-avatar {
  z-index: 1040;
  min-width: 140px;
  background-color: white;
  box-shadow: 0 3px 10px rgb(0 0 0 / 0.2);
  list-style-type: none;
  font-size: 14px;
  padding: 0;
  position: absolute;
  right: 44px;
  top: 30px;
  border-radius: 2px;
  transform: translateX(180%);
}
.detail-avatar::after {
  position: absolute;
  display: block;
  content: "";
  border-style: solid;
  border-color: transparent transparent white transparent;
  border-width: 9px;
  top: -16px;
  right: 2px;
}
.detail-avatar::before {
  position: absolute;
  top: -12px;
  display: block;
  content: "";
  width: 140px;
  height: 15px;
}
.detail-item {
  font-family: "Poppins", sans-serif;
  width: 100%;
  text-align: center;
  padding: 12px;
  color: black;
  font-weight: 600;
  font-size: 12px;
}
.detail-item a {
  color: black;
  text-decoration: none;
  font-weight: 500;
}
.detail-item a:hover {
  color: var(--color-btn-red);
}
.detail-item:hover {
  color: var(--color-btn-red);
}
.login-wrapper {
  margin-left: 2px;
  cursor: pointer;
}
.icon-cart {
  position: relative;
  margin: 0;
}
.icon-cart:hover .cart-wrapper {
  display: block;
  transition: all 0.3s linear;
  transform: translateX(0);
}
.cart-wrapper {
  position: absolute;
  font-size: 16px;
  color: black;
  height: 400px;
  width: 400px;
  overflow-y: scroll;
  padding: 20px;
  background-color: white;
  top: 18px;
  right: 0;
  border-radius: 4px;
  font-family: "Poppins", sans-serif;
  font-weight: 400;
  box-shadow: 0 3px 10px rgb(0 0 0 / 0.2);
  transform: translateX(120%);
}

.cart-heading {
  color: var(--vt-c-text-light-2);
  font-size: 12px;
  margin: 4px 0;
}
.recommend-btn {
  margin-top: -10px;
  width: 200px;
  border-radius: 4px;
  padding: 4px;
  color: white;
  font-size: 14px;
  font-weight: 400;
  background-color: var(--color-btn-red);
  outline: none;
}
.recommend-btn:hover {
  opacity: 0.9;
}
.cart-link {
  padding: 0;
}
.cart-link:hover {
  opacity: 1;
}
.link {
  text-decoration: none;
  font-weight: 500;
}
/* scrollbar-css */
.scroll-bar::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  background-color: #f5f5f5;
  border-radius: 10px;
}

.scroll-bar::-webkit-scrollbar {
  width: 34x;
  background-color: #f5f5f5;
  border-radius: 10px;
}
.scroll-bar::-webkit-scrollbar-thumb {
  background-color: var(--color-btn-red);
}
</style>

<script>
import CartItem from "../components/CartItem.vue";
export default {
  props: {
    isLoggin: { type: Boolean },
  },
  components: {
    CartItem,
  },
  data() {
    return {
      itemsCart: [],
      isAdmin: false,
      user: {},
    };
  },
  computed: {
    getItemsCart() {
      this.itemsCart = this.$store.state.auth.itemsCart;
      return this.itemsCart;
    },
    getCurrentUser() {
      return this.user;
    },
    getStatusAdmin() {
      return this.isAdmin;
    },
  },
  methods: {
    handleLogout() {
      this.$store.dispatch("auth/logout").then(
        () => {
          console.log("LOGOUT SUCCESSFULLY!");
        },
        (error) => {
          console.log("LOGOUT FAILLED !");
        }
      );
    },
    getRightAdmin() {
      if (this.$store.state.auth.user)
        if (this.$store.state.auth.user.role == "admin") this.isAdmin = true;
    },
    getRightUser() {
      if (this.$store.state.auth.user) this.user = this.$store.state.auth.user;
    },
  },
  mounted() {
    this.getRightAdmin();
    this.getRightUser();
  },
};
</script>