<template>
  <div class="footer d-flex">
    <div class="owner_footer d-flex flex-column">
      <img src="../assets/img/logo/1.png" alt="" class="logo_footer" />
      <label for="logo_footer" class="logo_label"
        >Cửa hàng chính hãng TREK</label
      >
      <p class="logo_desc text-justify">
        Chuyên cung cấp xe đạp, linh kiện chính hãng, cơ sở chăm sóc khách hàng
        dành cho những người yêu xe đạp.
        <br />
        Thông tin tài khoản:<br />
        Chủ tài khoản: Huy dzai<br />
        Ngân hàng SCB chi nhánh Cần Thơ, Số tài khoản: 6767676767
      </p>
    </div>
    <div class="list_footer">
      <ul class="list_items list-unstyled">
        <span class="heading_items">Giới thiệu</span>
        <li class="items mt-2">
          <router-link :to="{ name: 'MainView' }"> Trang chủ </router-link>
        </li>
        <li class="items">
          <router-link :to="{ name: 'ProductPage' }"> Sản phẩm </router-link>
        </li>
      </ul>
    </div>
    <div class="list_footer">
      <ul class="list_items list-unstyled">
        <span class="heading_items">Hỗ Trợ</span>
        <li class="items mt-2">
          <router-link :to="{ name: 'NewsView' }"> Tin tức </router-link>
        </li>
      </ul>
    </div>
    <div class="list_footer">
      <ul class="list_items list-unstyled">
        <span class="heading_items">Thông Tin</span>
        <li class="items mt-2">
          <router-link :to="{ name: 'LoginView' }"> Đăng nhập </router-link>
        </li>
        <li class="items">
          <router-link :to="{ name: 'RegisterView' }"> Đăng ký </router-link>
        </li>
      </ul>
    </div>
    <div class="list_footer">
      <ul class="list_items list-unstyled">
        <span class="heading_items">Liên Hệ</span>
        <li class="items mt-2 d-flex align-items-center justify-content-start">
          <i class="fa-solid fa-location-dot logo_info"></i>
          <p class="ml-4">
            Chi nhánh 1: 305 Bùi Hữu Nghĩa, P1, Bình Thạnh, CT <br />
            Chi nhánh 2: 1001 Quang Trung,Nghĩa Chánh,TP HCM
          </p>
        </li>
        <li class="items mt-2 d-flex align-items-center justify-content-start">
          <i class="fa-solid fa-phone logo_info"></i>
          <p class="ml-4">SĐT: 0678956542</p>
        </li>
        <li class="items mt-2 d-flex align-items-center justify-content-start">
          <i class="fa-solid fa-envelope logo_info"></i>
          <p class="ml-4">Email: huytotbung@student.ctu.edu.vn</p>
        </li>
      </ul>
    </div>
  </div>
</template>
<style scoped>
.footer {
  background: black;
  color: #aaa;
  padding: 50px 60px;
  gap: 50px;
}
.owner_footer {
  width: calc(100% / 5);
}
.logo_footer {
  width: 200px;
  height: 100px;
}
.logo_label {
  margin-top: 20px;
  font-size: 18px;
  font-weight: 600;
}
.logo_desc {
  font-size: 12px;
}
.list_footer {
  margin: 0 20px;
  color: white;
}
.heading_items {
  font-size: 18px;
  font-weight: 600;
}
.items a {
  margin-left: 8px;
  text-decoration: none;
  color: #aaa;
}
.logo_info {
  transform: translateY(-50%);
}
</style>