<template>
  <div class="wrapper">
    <div class="main-content" v-if="fillProductsCount > 0">
      <div class="wrapper-content">
        <div class="cart-heading">GIỎ HÀNG</div>
        <div class="wrapper-items">
          <div
            class="items"
            v-for="(product, index) in fillProducts"
            :key="index"
          >
            <div class="product-thumbnail">
              <img class="item-thumbnail" :src="`${product.path}`" alt="" />
            </div>
            <div class="product-name">
              {{ product.name }}
            </div>
            <div class="product-price">
              {{ ` ${changedPrice(product.price)}` }}
            </div>
            <div class="product-quantity">
              <div class="quantity-minus" @click="minusQuantity(index)">-</div>
              <div class="quantity-value">{{ quantity[index] }}</div>
              <div class="quantity-plus" @click="addQuantity(index)">+</div>
            </div>
            <div class="product-total-price">
              {{ ` ${changedPrice(quantityPrice[index])}` }}
            </div>
            <div class="product-remove" @click="deleteProductCart(index)">
              x
            </div>
          </div>
        </div>
      </div>
      <div class="wrapper-order">
        <div class="heading-ord">
          Đơn hàng của bạn
          <i class="fa-solid fa-file order-icon"></i>
        </div>
        <div style="font-size: 12px; text-align: center">
          Hãy điền thông tin cần thiết để chúng tôi có thể tiến hành tạo đơn
          hàng và liên hệ với bạn !
        </div>
        <div class="form-order">
          <div class="field-order">
            <div class="heading-form">Họ và tên</div>
            <div class="input-form">
              <input type="text" v-model="user.name" />
            </div>
          </div>
          <div class="field-order">
            <div class="heading-form">Email</div>
            <div class="input-form">
              <input
                type="text"
                placeholder="huy12@gmail.com"
                v-model="user.email"
              />
            </div>
          </div>
          <div class="field-order">
            <div class="heading-form">Địa chỉ</div>
            <div class="input-form">
              <textarea
                class="text-aria"
                type="text"
                placeholder=""
                v-model="user.address"
              />
            </div>
          </div>
          <div class="field-order">
            <div class="heading-form">Số điện thoại</div>
            <div class="input-form">
              <input
                type="text"
                placeholder="0542245871"
                v-model="user.phone"
              />
            </div>
          </div>
          <div class="field-order">
            <div class="heading-form">Ghi chú cho đơn hàng</div>
            <div class="input-form">
              <textarea
                class="text-aria"
                type="text"
                placeholder="Nếu bạn có tin nhắn để lại cho vận chuyển xin hãy điền vào đây !"
                v-model="note"
              />
            </div>
          </div>
        </div>
        <div class="wrapper-voucher">
          <input
            type="text"
            name="coupon_code"
            class="input-text"
            placeholder="Coupon code"
            id="coupon_code"
            value=""
          />
          <input
            type="submit"
            class="button-voucher"
            name="apply_coupon"
            value="Apply Coupon"
          />
        </div>
        <div class="wrapper-payment">
          <div class="total-payment">
            Tổng thanh toán :
            <span class="total-payment-price">
              {{ ` ${changedPrice(totalPricePayment)}` }}
            </span>
          </div>
          <button class="btn-payment" @click="handleOrder">Đặt hàng</button>
        </div>
      </div>
    </div>
    <div class="no-cart-heading" style="padding-top: 150px" v-else>
      Rất tiếc bạn chưa có sản phẩm nào trong giỏ hàng, hãy chọn sản phẩm mình
      yêu thích nhé !
      <router-link :to="{ path: '/products' }" class="shopping-heading"
        >Tiếp tục mua sắm ...</router-link
      >
    </div>
  </div>
</template>
<style scoped>
.wrapper {
  margin-top: 80px;
  width: 100%;
  min-height: 50vh;
  background-color: #ebebeb;
}
.main-content {
  display: flex;
  justify-content: space-around;
}
.wrapper-content {
  width: 50%;
}
.wrapper-order {
  width: 30%;
  height: 100%;
  margin: 130px 0 80px 12px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  background-color: #fff;
  padding: 40px 40px 80px 40px;
  border-radius: 4px;
}
.cart-heading {
  font-weight: 600;
  font-size: 28px;
  line-height: 28px;
  text-align: center;
  margin-top: 40px;
  margin-left: 500px;
}
.cart-heading::after {
  content: "";
  width: 139px;
  height: 2px;
  background: url(//demo.sunrisetheme.com/velo/wp-content/themes/velo/assets/css/../img/line.png)
    repeat-x;
  text-align: center;
  display: block;
  margin: 15px auto;
}
.wrapper-items {
  width: 800px;
  min-height: 500px;
  margin-top: 50px;
}
.items {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #fff;
  border-radius: 4px;
  margin-bottom: 20px;
}
.items:hover {
  transform: translateY(-4px);
  box-shadow: 0 20px 40px rgb(0 0 0 / 10%);
  transition: all ease 0.2s;
}
.product-thumbnail {
  width: 20%;
  margin-left: 32px;
}
.item-thumbnail {
  width: 120px;
  height: 120px;
  padding: 12px;
  object-fit: contain;
}
.product-name {
  width: 30%;
  font-size: 14px;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
}
.product-price {
  color: var(--color-price);
  width: 15%;
}
.product-quantity {
  display: flex;
  gap: 16px;
  width: 10%;
}
.quantity-minus:hover,
.quantity-plus:hover {
  cursor: pointer;
  color: var(--color-price);
}
.product-total-price {
  color: var(--color-price);
  width: 15%;
}
.product-remove {
  width: 10%;
  padding: 16px;
}
.product-remove:hover {
  color: var(--color-price);
  cursor: pointer;
}
.wrapper-voucher {
  margin-left: 60px;
}
.input-text {
  width: 40%;
  background-color: transparent;
  border: 2px dashed #959595;
  border-right: transparent;
  border-radius: 0;
  font-family: "PT Serif";
  font-style: italic;
  height: 30px;
  line-height: 60px;
  transform: translateY(1px);
}
.button-voucher {
  padding: 8px;
  font-size: 12px;
  line-height: 14px;
  border-radius: 2px;
  background: var(--color-btn-red);
  margin-left: -1px;
  color: white;
  outline-color: var(--color-btn-red);
  border: 0;
}
.wrapper-payment {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.total-payment-price {
  margin-left: 2px;
  color: var(--color-price);
}
.btn-payment {
  margin: 20px 0;
  width: 240px;
  padding: 8px;
  border: transparent;
  background: var(--color-btn-red);
  color: white;
}
.no-cart-heading {
  margin: auto;
  font-size: 20px;
  font-weight: 600;
  text-align: center;
  color: black;
}
.shopping-heading {
  color: var(--color-btn-red);
  text-decoration: none;
}
.heading-ord {
  font-size: 20px;
  font-weight: 600;
  text-align: center;
}
.order-icon {
  margin-left: 12px;
}
.input-form input {
  width: 78%;
  padding: 8px;
  outline-color: var(--color-btn-red);
}
.form-order {
  margin-left: 60px;
  margin-bottom: 40px;
}
.heading-form {
  font-weight: 600;
  margin-bottom: 8px;
  margin-top: 12px;
}
.text-aria {
  width: 240px;
  min-height: 100px;
  padding: 12px;
}
</style>
<script>
import changePrice from "../helpers/ChangePrice";
import OrdersService from "../services/orders.service";
export default {
  components: {
    changePrice,
  },
  data() {
    return {
      productsCart: [],
      quantity: [],
      quantityPrice: [],
      pricePayment: 0,
      totalPrice: 0,
      user: {},
      note: "",
      method: "",
    };
  },

  computed: {
    fillProducts() {
      return this.productsCart;
    },
    fillProductsCount() {
      return this.productsCart.length;
    },
    totalPricePayment() {
      return this.totalPrice;
    },
  },
  methods: {
    getProductCart() {
      this.productsCart = this.$store.state.auth.itemsCart;
      this.quantity = this.$store.state.auth.quantity;
      if (this.quantity.length === 0)
        for (let i = 0; i < this.productsCart.length; i++) {
          this.quantity.push(1);
        }
      for (let i = 0; i < this.productsCart.length; i++) {
        this.quantity.push(1);
        this.quantityPrice.push(1 * this.productsCart[i].price);
      }

      this.calculateTotalQuantityPrice();
    },
    getUser() {
      this.user = this.$store.state.auth.user;
    },
    minusQuantity(index) {
      this.quantity[index]--;
      this.calculateQuantityPrice(index);
      this.calculateTotalQuantityPrice();
      if (this.quantity[index] < 1) {
        this.deleteProductCart(index);
      }
    },
    addQuantity(index) {
      this.quantity[index]++;
      this.calculateQuantityPrice(index);
      this.calculateTotalQuantityPrice();
    },
    calculateQuantityPrice(index) {
      this.quantityPrice[index] =
        this.quantity[index] * this.productsCart[index].price;
    },
    calculateTotalQuantityPrice() {
      let sum = 0;
      for (let i = 0; i < this.quantityPrice.length; i++)
        sum += this.quantityPrice[i];
      this.totalPrice = sum;
    },
    deleteProductCart(index) {
      for (let i = index; i < this.productsCart.length - 1; i++) {
        this.productsCart[i] = this.productsCart[i + 1];
        this.quantity[i] = this.quantity[i + 1];
        this.quantityPrice[i] = this.quantityPrice[i + 1];
      }
      this.productsCart.length--;
      this.quantity.length--;
      this.quantityPrice.length--;
      this.calculateTotalQuantityPrice();
    },
    changedPrice(price) {
      return changePrice(price);
    },
    handleOrder() {
      this.$store.dispatch("auth/orderItemCart", this.productsCart).then(
        async () => {
          const payload = {
            method: "COD",
            totalPrice: this.totalPrice,
            cart: this.productsCart,
            note: this.note,
            infoUser: this.user,
            quantity: this.quantity,
            status: 0,
          };
          const result = await OrdersService.create(payload);
          this.$swal.fire({
            title: "Đặt hàng thành công",
            text: "Cảm ơn bạn đã tin tưởng chúng tôi, đơn hàng của bạn đã được đặt thành công, trong vòng 24h tới nhân viên bên shop sẽ liên hệ với bạn để xác nhận đơn hàng, hãy chú ý điện thoại bạn nhé ! Chúc bạn thật nhiều sức khỏe <3",
            icon: "success",
            iconColor: "#ff6961",
            confirmButtonText: "Ok",
            color: "white",
            heightAuto: false,
            confirmButtonColor: "#ff6961",
            background: "black",
          });
          setTimeout(() => {
            location.pathname = "/";
          }, 3000);
        },
        (error) => {
          console.log("Add cart product failled !");
        }
      );
    },
  },
  mounted() {
    this.getProductCart();
    this.getUser();
  },
};
</script>