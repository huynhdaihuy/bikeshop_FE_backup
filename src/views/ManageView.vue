<template>
  <div class="wrapper">
    <div class="type-manage d-flex ml-5 mt-5 mb-3">
      <div class="products-manage" @click="handleManage('.products-manage')">
        Sản Phẩm
      </div>
      <div class="orders-manage ml-3" @click="handleManage('.orders-manage')">
        Đơn hàng
      </div>
    </div>
    <div class="wrapper-content" v-if="manageProducts">
      <div class="heading-wrapper">Danh sách sản phẩm</div>
      <router-link
        :to="{ name: 'AddProductView' }"
        class="add-product-wrapper d-flex"
      >
        <button class="btn-add-product">Thêm sản phẩm</button>
      </router-link>
      <div class="input_form">
        <input
          class="input_search"
          type="text"
          v-model="searchText"
          @input="getSearchValue"
          placeholder="Tìm kiếm sản phẩm ..."
        />
        <span class="search_icon">
          <i class="fas fa-search icon-item"> </i>
        </span>
      </div>
      <!-- Sản phẩm -->
      <table class="table-wrapper">
        <thead class="heading-table">
          <tr>
            <th scope="col">STT</th>
            <th scope="col">Sản phẩm</th>
            <th scope="col">Tên</th>
            <th scope="col">Thể loại</th>
            <th scope="col">Giá</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody v-if="fillProductsCount > 0">
          <tr
            class="item"
            v-for="(product, index) in filteredProducts"
            :key="index"
          >
            <th
              scope="row"
              class="index-product"
              style="text-align: center; transform: translateY(-25%)"
            >
              {{ index }}
            </th>
            <td><img class="img-product" :src="`${product.path}`" alt="" /></td>
            <td class="name-product">{{ product.name }}</td>
            <td class="type-product" style="transform: translateY(-25px)">
              {{ product.type }}
            </td>
            <td class="price-product" style="transform: translateY(-25px)">
              {{ ` ${changedPrice(product.price)}` }}
            </td>
            <td class="handling" style="transform: translateY(-25px)">
              <span class="edit-handle mr-3">
                <router-link
                  class="link-edit"
                  :to="{
                    name: 'EditProductView',
                    params: { id: product._id },
                  }"
                  >Sửa</router-link
                >
              </span>
              <span class="delete-handle" @click="handleDeleteItem(product._id)"
                >Xóa</span
              >
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <!-- Đơn hàng -->
    <div class="wrapper-content" v-else>
      <div class="heading-wrapper">Danh sách đơn hàng</div>
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
  </div>
  <!-- Modal -->
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
}
.heading-wrapper {
  font-size: 30px;
  font-weight: 600;
  text-align: center;
}
.table-wrapper {
  min-width: 1200px;
  margin-left: 10%;
  margin-top: 40px;
}
.add-product-wrapper {
  display: flex;
  width: 200px;
  height: 40px;
  margin: 12px auto 40px auto;
}
.btn-add-product {
  width: 100%;
  height: 100%;
  padding: 8px;
  margin: 20px auto 20px auto;
  color: white;
  background-color: black;
  outline: none;
  border-radius: 4px;
}
.heading-table th {
  padding: 32px;
}
.item {
  width: 100%;
  max-height: 100px !important;
  overflow: hidden;
}

.img-product {
  width: 80px;
  height: 80px;
  object-fit: contain;
  transform: translateY(-25%);
}
.name-product {
  max-width: 240px;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  margin: 0;
}

.price-product {
  color: var(--color-price);
}
.input_form {
  position: relative;
  width: 800px;
  display: flex;
  align-items: center;
  margin-left: 400px;
}
.input_search {
  width: 100%;
  padding: 12px;
  margin-top: 28px;
  border: 0.5px solid rgb(0 0 0 / 0.2);
  outline: none;
}
.search_icon {
  position: absolute;
  right: 12px;
  top: 38px;
  font-weight: 800;
  font-size: 20px;
}

.handling {
  font-size: 12px;
  color: var(--color-btn-red);
}
.link-edit {
  text-decoration: none;
  color: var(--color-btn-red);
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
.delete-handle {
  cursor: pointer;
}
.products-manage:hover,
.orders-manage:hover {
  cursor: pointer;
}
.border-bot {
  border-bottom: 4px solid black;
  font-weight: 600;
}
/* Order Table Style */
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
</style>
<script>
import ProductService from "@/services/product.service";
import changePrice from "../helpers/ChangePrice";

import Orderservice from "../services/orders.service";

export default {
  components: {
    ProductService,
    changePrice,
  },

  data() {
    return {
      products: [],
      orders: [],
      searchText: "",
      isShowDeleteItem: false,
      isConfirmDelete: false,
      manageProducts: false,
    };
  },
  computed: {
    fillProducts() {
      return this.products;
    },
    fillOrders() {
      return this.orders;
    },
    fillOrdersCount() {
      return this.orders.length;
    },
    fillProductsCount() {
      return this.products.length;
    },
    productStrings() {
      return this.products.map((product) => {
        const { name, price, brand, desc, type } = product;
        return [name, price, brand, desc, type].join("");
      });
    },
    filteredProducts() {
      if (!this.searchText) return this.products;
      return this.products.filter((_contact, index) =>
        this.productStrings[index].includes(this.searchText)
      );
    },
    isConfirmDeleted() {
      return this.isConfirmDelete;
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
    async retrieveOrders() {
      try {
        this.orders = await Orderservice.getAll();
      } catch (error) {
        console.log(error);
      }
    },
    handleClose() {
      this.isShowDeleteItem = false;
    },
    confirmDelete(id) {
      let isConfirm = document.querySelector(".btn-confirm-delete");
      isConfirm.addEventListener("click", async () => {
        try {
          await ProductService.delete(id);
          setTimeout(() => {
            this.isShowDeleteItem = false;
          }, 500);
        } catch (error) {
          console.log(error);
        }
      });
    },
    showModalDelete() {
      this.isShowDeleteItem = true;
    },
    async handleDeleteItem(id) {
      await this.showModalDelete();
      this.confirmDelete(id);
    },
    handleManage() {
      this.manageProducts = !this.manageProducts;
      const itemBorder = document.querySelector(".border-bot");
      if (this.manageProducts) {
        if (itemBorder) itemBorder.classList.remove("border-bot");
        document.querySelector(".products-manage").classList.add("border-bot");
      } else {
        if (itemBorder) itemBorder.classList.remove("border-bot");
        document.querySelector(".orders-manage").classList.add("border-bot");
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
    this.retrieveProducts();
    this.retrieveOrders();
  },
};
</script>