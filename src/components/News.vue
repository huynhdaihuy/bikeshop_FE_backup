<template>
  <div class="news_wrapper mt-4 mb-4">
    <div class="container_img">
      <img src="../assets/img/news/1.jpg" alt="" />
    </div>
    <div class="container_img">
      <img src="../assets/img/news/2.jpg" alt="" />
    </div>
    <div class="container_img">
      <img src="../assets/img/news/3.jpg" alt="" />
    </div>
  </div>
</template>
<style  scoped>
.news_wrapper {
  background-color: black;
  display: flex;
}
.container_img {
  width: calc(100% / 3);
  height: 400px;
}
</style>