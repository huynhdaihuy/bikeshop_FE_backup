<template>
  <div class="wrapper">
    <div class="heading_sponsor">
      InCycle là nhà phân phối chính thức của SHIMANO tại Cần Thơ
    </div>
    <p>
      Linh kiện và phụ kiện cho xe đạp, mũ bảo hiểm và quần áo xe đạp của các
      thương hiệu cao cấp
    </p>
  </div>
  <div class="container mt-4">
    <div class="row" style="gap: 12px">
      <div class="logo_sponsor">
        <img class="logo-img" src="../assets/img/brand_icons/1.png" alt="" />
      </div>
      <div class="logo_sponsor">
        <img class="logo-img" src="../assets/img/brand_icons/2.png" alt="" />
      </div>
      <div class="logo_sponsor">
        <img class="logo-img" src="../assets/img/brand_icons/3.png" alt="" />
      </div>
      <div class="logo_sponsor">
        <img class="logo-img" src="../assets/img/brand_icons/4.png" alt="" />
      </div>
      <div class="logo_sponsor">
        <img class="logo-img" src="../assets/img/brand_icons/5.png" alt="" />
      </div>
      <div class="logo_sponsor">
        <img class="logo-img" src="../assets/img/brand_icons/6.png" alt="" />
      </div>
    </div>
    <div
      class="
        row
        align-items-center
        justify-content-center
        service_wrapper
        mt-4
        mb-4
        border-top
      "
    >
      <div class="service_sponsor text-center">
        <img src="../assets/img/services/1.png" alt="" class="service-logo" />
        <p class="service-desc">Đổi trả miễn phí trong vòng 30 ngày</p>
      </div>
      <div class="service_sponsor text-center">
        <img src="../assets/img/services/2.png" alt="" class="service-logo" />
        <p class="service-desc">Giao hàng trực tiếp từ nhà phân phối</p>
      </div>
      <div class="service_sponsor text-center">
        <img src="../assets/img/services/3.png" alt="" class="service-logo" />
        <p class="service-desc">Giao hàng siêu tốc trong nội thành 7/24</p>
      </div>
    </div>
  </div>
</template>
<style scoped>
.wrapper {
  background: black;
  color: white;
  text-align: center;
  padding: 48px;
}
.container {
  background: white;
}
.heading_sponsor {
  font-size: 20px;
  font-weight: 600;
  text-align: center;
  padding: 80px 0;
}
.logo_sponsor {
  width: 180px;
  height: 180px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}
.logo_sponsor:hover {
  background: #fff;
  border-color: #e1e1e1;
  box-shadow: 0 1rem 3rem 0 rgb(0 0 0 / 10%);
  cursor: pointer;
}
.logo-img {
  object-fit: cover;
}
.service_wrapper {
  gap: 40px;
}
.service-logo {
  width: 40px;
  height: 40px;
  object-fit: contain;
}
.service_sponsor {
  margin-top: 24px;
}
.service-desc {
  margin-top: 12px;
}
</style>