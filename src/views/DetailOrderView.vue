<template>
  <div class="wrapper">
    <div class="wrapper-content" v-if="this.order.infoUser">
      <div
        class="heading-nav d-flex align-items-center justify-content-between"
      >
        <router-link
          class="text-decoration-none font-weight-bolder color-red-primary"
          :to="{ name: 'OrderView' }"
          >Trở lại</router-link
        >
        <div class="content-order d-flex justify-content-between">
          <div class="date-order mr-3">
            <span class="font-weight-bolder">Ngày đặt :</span>
            {{ ` ${changedDate(order.dateAdded)}` }}
          </div>
          <div class="id-order mr-3">
            <span class="font-weight-bolder">ID đơn hàng :</span>
            {{ order._id }}
          </div>
          <div class="status-order color-red-primary font-weight-bolder">
            {{ steps[fillStateOrder] }}
          </div>
        </div>
      </div>
      <div
        class="wrapper-change_status mt-5 font-weight-bolder"
        v-if="getStatusAdmin"
      >
        Cập nhật trạng thái đơn hàng
        <div class="wrapper-btn_update mt-2">
          <button
            class="btn-update-status mr-3 btn-update-status-prev"
            @click="handleChangeStatusOrder('prev')"
          >
            Trạng thái trước
          </button>
          <button
            class="btn-update-status btn-update-status-next"
            @click="handleChangeStatusOrder('next')"
          >
            Trạng thái tiếp theo
          </button>
        </div>
      </div>
      <div class="process-order mt-5 mb-5">
        <step-progress
          :steps="steps"
          :current-step="fillStateOrder"
          icon-class="fa fa-check"
          active-color="#579981"
          passive-color="black"
          active-thickness="5"
          passive-thickness="2"
          line-thickness="5"
        ></step-progress>
      </div>
      <div class="info-order" style="margin-top: 80px">
        <div class="name-order">
          <div
            class="heading-address font-weight-bolder mb-2"
            style="font-size: 20px"
          >
            Họ và tên
          </div>
          <div class="desc-address mb-5">{{ order.infoUser.name }}</div>
        </div>
        <div class="name-order">
          <div
            class="heading-address font-weight-bolder mb-2"
            style="font-size: 20px"
          >
            Địa chỉ
          </div>
          <div class="desc-address mb-5">{{ order.infoUser.address }}</div>
        </div>
        <div class="products-order scroll-bar">
          <div
            class="heading-address font-weight-bolder mb-2"
            style="font-size: 20px"
          >
            Sản phẩm đã mua
          </div>
          <div class="desc-products mb-5">
            <div
              class="item-product d-flex"
              v-for="(item, index) in order.cart"
              :key="index"
            >
              <div class="img-product">
                <img class="img-item" :src="`${item.path}`" alt="" />
              </div>
              <div class="content-item">
                <div class="item-name">
                  {{ item.name }}
                </div>
                <div
                  class="
                    brand-item
                    d-flex
                    align-items-center
                    justify-content-between
                  "
                >
                  <div
                    class="desc-brand"
                    style="font-size: 14px; color: #757575"
                  >
                    <span class="font-weight-bold">Thương hiệu :</span>
                    {{ item.brand }}
                  </div>
                  <div class="price-item" style="color: var(--color-price)">
                    {{ ` ${changedPrice(item.price)}` }}
                  </div>
                </div>
                <div class="quantity-item">Số lượng : 2</div>
              </div>
            </div>
          </div>
        </div>
        <div class="note-order">
          <div
            class="heading-note font-weight-bolder mb-2"
            style="font-size: 20px"
          >
            Ghi chú
          </div>
          <div class="desc-note mb-5">{{ order.note }}</div>
        </div>
        <div class="list-order"></div>
        <div
          class="
            payment-order
            d-flex
            align-items-center
            justify-content-between
          "
        >
          <div class="wrapper-payment">
            <div
              class="heading-payment font-weight-bolder mb-2"
              style="font-size: 20px"
            >
              Phương thức thanh toán
            </div>
            <div class="desc-payment mb-5">{{ order.method }}</div>
          </div>
          <div class="total-price color-red-primary">
            <span class="font-weight-bolder"
              >Tổng tiền:
              {{ ` ${changedPrice(order.totalPrice)}` }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.wrapper {
  margin-top: 100px;
  width: 100%;
  min-height: 50vh;
  display: flex;
}
.wrapper-content {
  margin: auto;
  min-width: 1000px;
}
/*Product List Style */
.products-order {
  height: 500px;
  overflow-y: scroll;
}
.item-product {
  height: 100px;
  padding: 24px;
  border-radius: 4px;
}
.item-product:hover {
  transform: translateY(-4px);
  box-shadow: 0 20px 40px rgb(0 0 0 / 10%);
  transition: all ease 0.2s;
}
.img-product {
  width: 10%;
  padding: 8px;
}
.img-item {
  width: 62px;
  height: 62px;
  object-fit: contain;
}
.content-item {
  width: 80%;
}
.item-name {
  font-size: 14px;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
}
/* Scroll bar css */
/* scrollbar-css */
.scroll-bar::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  background-color: #f5f5f5;
  border-radius: 6px;
}

.scroll-bar::-webkit-scrollbar {
  background-color: #f5f5f5;
  border-radius: 6px;
  width: 4px;
}
.scroll-bar::-webkit-scrollbar-thumb {
  background-color: var(--color-btn-red);
}
/* Button update status order */
.btn-update-status {
  background-color: var(--color-btn-red);
  color: white;
  font-weight: 550;
  font-size: 12px;
  padding: 10px;
  min-width: 160px;
  border: none;
}
.disable {
  color: white;
  background-color: black;
  cursor: default;
}
</style>
<script>
import OrderService from "../services/orders.service";
import changePrice from "../helpers/ChangePrice";
import StepProgress from "vue-step-progress";
import "../../node_modules/vue-step-progress/dist/main.css";

export default {
  components: {
    OrderService,
    changePrice,
    "step-progress": StepProgress,
  },
  props: {
    id: { type: String, required: true },
  },
  data() {
    return {
      order: {},
      steps: [
        "Xác nhận đơn hàng",
        "Chờ vận chuyển",
        "Đang vận chuyển",
        "Đã giao",
      ],
      quantity: [],
      isAdmin: false,
    };
  },
  computed: {
    fillOrder() {
      return this.order;
    },
    fillOrderCount() {
      return this.order.length;
    },
    fillStateOrder() {
      return this.order.status;
    },
    getStatusAdmin() {
      return this.isAdmin;
    },
  },
  methods: {
    async retrieveOrder() {
      try {
        this.order = await OrderService.get(this.id);
        this.quantity = this.order.quantity;
        setTimeout(() => {
          if (this.getStatusAdmin) {
            if (this.order.status === 0) {
              document
                .querySelector(".btn-update-status-prev")
                .classList.add("disable");
              document
                .querySelector(".btn-update-status-next")
                .classList.remove("disable");
            }
            if (this.order.status === 3) {
              document
                .querySelector(".btn-update-status-prev")
                .classList.remove("disable");
              document
                .querySelector(".btn-update-status-next")
                .classList.add("disable");
            }
          }
        }, 10);
      } catch (error) {
        console.log(error);
      }
    },
    getRightAdmin() {
      this.isAdmin = this.$store.state.auth.user.role === "admin";
    },
    async handleChangeStatusOrder(type) {
      let state = this.order.status;
      if (type === "prev") {
        if (state > 0) state--;
      } else if (type === "next") {
        if (state < 3) state++;
      }
      try {
        const result = await OrderService.update(this.order._id, {
          status: state,
        });
        this.retrieveOrder();
        console.log(
          "🚀 ~ file: DetailOrderView.vue ~ line 319 ~ handleChangeStatusOrder ~ result",
          result
        );
      } catch (error) {
        console.log("FAILLED !");
      }
    },
    changedDate(date) {
      if (date) return date.split("T")[0];
    },
    changedPrice(price) {
      return changePrice(price);
    },
  },
  mounted() {
    this.retrieveOrder();
    this.getRightAdmin();
  },
};
</script>