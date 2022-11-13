<template>
  <MainSlider />
  <News />
  <Sponsor />
</template>
<script>
import MainHeader from "../components/Header.vue";
import MainSlider from "../components/MainSlider.vue";
import Sponsor from "../components/Sponsor.vue";
import News from "../components/News.vue";

export default {
  data() {
    return {
      products: [],
    };
  },
  components: { MainHeader, MainSlider, Sponsor, News },
  methods: {},
};
</script>
