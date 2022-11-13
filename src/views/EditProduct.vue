<template>
  <div class="wrapper-form">
    <Form @submit="submitproduct" :validation-schema="productFormSchema">
      <div class="form-group">
        <label for="name">Tên</label>
        <Field
          name="name"
          type="text"
          class="form-control"
          v-model="this.product.name"
        />
        <ErrorMessage name="name" class="error-feedback" />
      </div>
      <div class="form-group">
        <label for="desc">Mô tả</label>
        <Field
          name="desc"
          type="text"
          class="form-control desc-wrapper"
          v-model="this.product.desc"
        />
        <ErrorMessage name="desc" class="error-feedback" />
      </div>
      <div class="form-group">
        <label for="brand">Thương hiệu</label>
        <Field
          name="brand"
          type="text-aria"
          class="form-control"
          v-model="this.product.brand"
        />
        <ErrorMessage name="brand" class="error-feedback" />
      </div>
      <div class="form-group">
        <label for="price">Giá :</label>
        <Field
          name="price"
          type="number"
          class="form-control"
          v-model="this.product.price"
        />
        <ErrorMessage name="price" class="error-feedback" />
      </div>
      <div class="form-group">
        <label for="selectType">Chọn thể loại</label>
        <select
          class="form-control"
          id="selectType"
          v-model="this.product.type"
        >
          <option>accesories</option>
          <option>bike</option>
          <option>groupset</option>
          <option>frame</option>
          <option>wheels</option>
          <option>tube</option>
          <option>tires</option>
        </select>
      </div>
      <div class="form-group">
        <label for="path">Đường dẫn hình ảnh</label>
        <Field
          name="path"
          type="text"
          class="form-control"
          v-model="this.product.path"
        />
        <ErrorMessage name="phone" class="error-feedback" />
      </div>

      <div class="form-group form-check">
        <input
          name="favorite"
          type="checkbox"
          class="form-check-input"
          v-model="this.product.favorite"
        />
        <label for="favorite" class="form-check-label">
          <strong>Sản phẩm yêu thích</strong>
        </label>
      </div>
      <div class="form-group">
        <button @click="handleSave" class="btn btn-save">Lưu</button>
      </div>
    </Form>
  </div>
  <div
    v-if="isShowEditItemSuccess"
    class="modal fade"
    id="exampleModal"
    tabindex="-1"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">
            Lưu sản phẩm thành công !
          </h5>
        </div>
        <div class="modal-body text-center" style="font-size: 18px">
          Sản phẩm đã được lưu thành công !
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
            <button type="button" class="btn btn-modal btn-modal-item">
              Trở về
            </button>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>
  <script>
import * as yup from "yup";
import { Form, Field, ErrorMessage } from "vee-validate";
import ProductService from "../services/product.service";
export default {
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  emits: ["submit:product", "delete:product"],

  data() {
    const productFormSchema = yup.object().shape({
      name: yup
        .string()
        .required("Tên phải có giá trị.")
        .min(2, "Tên phải ít nhất 2 ký tự.")
        .max(50, "Tên có nhiều nhất 50 ký tự."),
      email: yup
        .string()
        .email("E-mail không đúng.")
        .max(50, "E-mail tối đa 50 ký tự."),
      address: yup.string().max(100, "Địa chỉ tối đa 100 ký tự."),
      phone: yup
        .string()
        .matches(
          /((09|03|07|08|05)+([0-9]{8})\b)/g,
          "Số điện thoại không hợp lệ."
        ),
    });
    return {
      productFormSchema,
      product: {},
      isShowEditItemSuccess: false,
    };
  },
  methods: {
    submitproduct() {
      this.$emit("submit:product", this.productLocal);
    },
    deleteproduct() {
      this.$emit("delete:product", this.productLocal.id);
    },
    async getProduct() {
      this.product = await ProductService.get(this.$route.params.id);
    },
    async handleSave() {
      try {
        await ProductService.update(this.product._id, this.product);
        this.isShowEditItemSuccess = true;
        setTimeout(() => {
          this.$router.push({ name: "ManageProductView" });
        }, 1500);
      } catch (error) {
        console.log(error);
      }
    },
    handleClose() {
      this.isShowEditItemSuccess = false;
    },
  },
  mounted() {
    this.getProduct();
  },
};
</script>
<style scoped>
.wrapper-form {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 160px 0;
}
.desc-wrapper {
  min-width: 300px;
  min-height: 200px;
  font-size: 12px;
}
.btn-save {
  color: white;
  background-color: var(--color-btn-red);
}
.btn-delete {
  color: var(--color-btn-red);
  background-color: transparent;
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