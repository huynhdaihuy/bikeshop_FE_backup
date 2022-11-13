<template>
  <div class="wrapper">
    <div class="content">
      <div class="heading-content">Hồ Sơ Của Tôi</div>
      <div class="desc-heading">
        Quản lý thông tin hồ sơ để bảo mật tài khoản
      </div>
      <hr />
      <div class="form_wrapper">
        <Form
          @submit="handleSubmit"
          class="form_register"
          :validation-schema="userFormSchema"
        >
          <div class="form-group">
            <label class="label_form" for="name">Họ và tên</label>
            <i class="fa-regular fa-user icon_form"></i>
            <Field
              name="name"
              type="text"
              class="form-control"
              :placeholder="`${user.name}`"
            />
            <ErrorMessage name="name" class="error-feedback" />
          </div>
          <div class="form-group">
            <label class="label_form" for="password">Mật khẩu</label>
            <i class="fa-solid fa-lock icon_form"></i>
            <Field
              name="password"
              type="Password"
              class="form-control"
              placeholder="Tối thiểu 9 ký tự"
            />
            <ErrorMessage name="password" class="error-feedback" />
          </div>
          <div class="form-group">
            <label class="label_form" for="email">E-mail</label>
            <i class="fa-regular fa-envelope icon_form"></i>
            <Field
              name="email"
              type="email"
              class="form-control"
              :placeholder="`${user.email}`"
            />
            <ErrorMessage name="email" class="error-feedback" />
          </div>
          <div class="form-group">
            <label class="label_form" for="address">Địa chỉ</label>
            <i class="fa-regular fa-address-card icon_form"></i>
            <Field
              name="address"
              type="text"
              class="form-control"
              :placeholder="`${user.address}`"
            />
            <ErrorMessage name="address" class="error-feedback" />
          </div>
          <div class="form-group">
            <label class="label_form" for="phone">Số điện thoại</label>
            <i class="fa-solid fa-phone icon_form" style="color: white"></i>
            <Field
              name="phone"
              type="tel"
              class="form-control"
              :placeholder="`${user.phone}`"
            />
            <ErrorMessage name="phone" class="error-feedback" />
          </div>
          <div class="form-group">
            <button type="submit" class="btn btn-primary btn-update">
              Cập nhật
            </button>
          </div>
        </Form>
      </div>
    </div>
  </div>
</template>
<style scoped>
.wrapper {
  margin-top: 78px;
  width: 100%;
  display: flex;
  background-color: #f5f5f5;
}
.content {
  width: 80%;
  min-height: 50vh;
  background-color: white;
  margin: 50px auto 50px auto;
  padding: 40px;
  background-color: #fff;
  border-radius: 4px;
}
.heading-content {
  font-size: 20px;
  font-weight: 600;
}
.col-left {
  width: 20%;
  text-align: right;
  font-size: 14px;
  border: none;
  font-weight: 600;
}
.col-right {
  width: 80%;
  font-size: 14px;
  border: none;
}

/* Form Style */
.label_form {
  font-weight: 600;
  margin-right: 10px;
}
.icon_form {
  font-weight: 600;
}
.form-control:focus {
  border-color: black;
  box-shadow: 0 0 0 1px rgba(15, 15, 15, 0.25);
}
.error-feedback {
  color: red;
}
.btn-update {
  background-color: black;
}
</style>
<script>
import { Form, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";
import UserService from "../services/user.service";
export default {
  components: { Form, Field, ErrorMessage, UserService },
  data() {
    const userFormSchema = yup.object().shape({
      name: yup
        .string()
        .required("Tên người dùng phải phải có giá trị.")
        .min(8, "Tên người dùng phải ít nhất 8 ký tự.")
        .max(20, "Tên người dùng có nhiều nhất 30 ký tự."),
      password: yup
        .string()
        .required("Mật khẩu phải có giá trị.")
        .min(9, "Mật khẩu phải ít nhất 9 ký tự.")
        .max(20, "Mật khẩu có nhiều nhất 20 ký tự."),
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
      user: {},
      userFormSchema,
    };
  },
  computed: {
    fillUser() {
      return this.user;
    },
  },
  methods: {
    handleSubmit(value) {
      const result = UserService.update(this.user._id, value);
      if (result)
        this.$swal.fire({
          title: "Thành công!",
          text: "Cập nhật thông tin thành công",
          icon: "success",
          iconColor: "#ff6961",
          confirmButtonText: "Cool",
          color: "white",
          heightAuto: false,
          confirmButtonColor: "#ff6961",
          background: "black",
        });
    },
    retrieveUser() {
      this.user = this.$store.state.auth.user;
    },
  },
  created() {
    this.retrieveUser();
  },
};
</script>