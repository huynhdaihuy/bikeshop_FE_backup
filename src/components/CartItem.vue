<template>
  <div class="item-wrapper" v-for="(item, index) in cartItems" :key="index">
    <div class="item-img">
      <img :src="`${item.path}`" alt="" />
    </div>
    <div class="item-name">
      {{ item.name }}
    </div>
    <div class="item-price">{{ ` ${changedPrice(item.price)}` }}</div>
  </div>
</template>
<style scoped>
.item-wrapper {
  margin-top: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
}
.item-img {
  width: 18%;
  object-fit: contain;
}
.item-img img {
  max-width: 42px;
  max-height: 42px;
}
.item-name {
  width: 50%;
  font-size: 12px;
  line-height: 16px;
  max-height: 32px;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
.item-price {
  width: 32%;
  font-size: 12px;
  color: var(--color-price);
  margin-left: 20px;
}
</style>
<script>
import changePrice from "../helpers/ChangePrice";

export default {
  props: {
    cartItems: { type: Array },
  },
  components: {
    changePrice,
  },
  methods: {
    changedPrice(price) {
      return changePrice(price);
    },
  },
};
</script>