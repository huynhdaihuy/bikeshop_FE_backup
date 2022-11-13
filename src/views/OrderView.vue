<template>
  <div class="wrapper">
    <div class="heading-wrapper">Đơn hàng của tôi</div>
    <table class="table-wrapper">
      <thead class="heading-table">
        <tr>
          <th scope="col">ID</th>
          <th scope="col">Ngày đặt</th>
          <th scope="col">Phương thức thanh toán</th>
          <th scope="col">Ghi chú</th>
          <th scope="col">Tổng tiền</th>
          <th scope="col">Hành động</th>
        </tr>
      </thead>
      <tbody v-if="fillOrdersCount > 0">
        <tr class="item" v-for="(order, index) in fillOrders" :key="index">
          <td style="transform: translateY(-25px)">{{ order._id }}</td>
          <td class="name-order" style="transform: translateY(-25px)">
            {{ ` ${changeDate(order.dateAdded)}` }}
          </td>
          <td
            class="type-order"
            style="transform: translateY(-25px); color: var(--color-btn-red)"
          >
            {{ order.method }}
          </td>
          <td class="note-order" style="transform: translateY(-25px)">
            {{ order.note }}
          </td>
          <td class="price-order" style="transform: translateY(-25px)">
            {{ ` ${changedPrice(order.totalPrice)}` }}
          </td>
          <td class="handling" style="transform: translateY(-25px)">
            <span class="edit-handle mr-3">
              <router-link
                class="link-edit"
                :to="{
                  name: 'DetailOrderView',
                  params: { id: order._id },
                }"
                >Xem chi tiết</router-link
              >
            </span>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <div
    v-if="isShowDeleteItem"
    class="modal fade"
    id="exampleModal"
    tabindex="-1"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Xóa sản phẩm !</h5>
        </div>
        <div class="modal-body text-center" style="font-size: 18px">
          Bạn có chắc chắn muốn xóa sản phẩm này ?
        </div>
        <div class="modal-footer">
          <button
            @click="handleClose"
            type="button"
            class="text-decoration-none btn btn-modal btn-modal-item"
            style="background-color: var(--color-btn-red)"
          >
            Thoát
          </button>
          <router-link
            :to="{ name: 'ManageProductView' }"
            class="text-decoration-none btn-"
          >
            <button
              type="button"
              class="btn btn-modal btn-modal-item btn-confirm-delete"
            >
              Xóa
            </button>
          </router-link>
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
}
.heading-wrapper {
  font-size: 30px;
  font-weight: 600;
  text-align: center;
}
.table-wrapper {
  min-width: 1300px;
  margin-left: 10%;
  margin-top: 40px;
}

.heading-table th {
  padding: 32px;
  text-align: center;
}
.item {
  width: 100%;
  max-height: 100px !important;
  overflow: hidden;
  font-size: 14px;
}
.item td {
  text-align: center;
}

.name-order {
  max-width: 240px;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  margin: 0;
}

.price-order {
  color: var(--color-price);
}

.handling {
  font-size: 12px;
  color: var(--color-btn-red);
}
.link-edit {
  text-decoration: none;
  color: var(--color-btn-green);
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
/* End modal */
</style>
<script>
import Orderservice from "../services/orders.service";
import changePrice from "../helpers/ChangePrice";

export default {
  components: {
    Orderservice,
    changePrice,
  },

  data() {
    return {
      orders: [],
      isShowDeleteItem: false,
      isConfirmDelete: false,
    };
  },
  computed: {
    fillOrders() {
      return this.orders;
    },
    fillOrdersCount() {
      return this.orders.length;
    },
    isConfirmDeleted() {
      return this.isConfirmDelete;
    },
  },
  methods: {
    async retrieveOrders() {
      try {
        const allOrders = await Orderservice.getAll();
        const infoUser = this.$store.state.auth.user;
        allOrders.forEach((cur, index) => {
          if (JSON.stringify(cur.infoUser._id) === JSON.stringify(infoUser._id))
            this.orders.push(cur);
        });
      } catch (error) {
        console.log(error);
      }
    },
    changedPrice(price) {
      return changePrice(price);
    },
    changeDate(date) {
      return date.split("T")[0];
    },
  },
  mounted() {
    this.retrieveOrders();
  },
};
</script>