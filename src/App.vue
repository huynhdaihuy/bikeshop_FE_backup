<script>
import Header from "./components/Header.vue";
import Footer from "./components/Footer.vue";

export default {
  components: {
    Header,
    Footer,
  },
  data() {
    return {
      isLoggin: false,
    };
  },
  computed: {
    getStatusLoggin() {
      this.isLoggin = this.$store.state.auth.status.loggedIn;
      return this.isLoggin;
    },
  },
};
</script>
  <template>
  <div>
    <Header :isLoggin="getStatusLoggin" />
    <router-view />
    <Footer />
  </div>
</template>
<style scoped>
</style>
