<template>
  <div class="nav_breadcrumb">
    <ul class="breadcrumb d-flex align-items-center">
      <router-link class="m-0" :to="{ path: '/' }">
        <li>
          <i class="fa-solid fa-arrow-left mr-2"></i>
          Trang chủ
          <span class="divider">/</span>
        </li>
      </router-link>
      <li class="active">Sản phẩm</li>
    </ul>
    <div class="input_form">
      <input
        class="input_search"
        type="text"
        v-model="searchText"
        @input="getSearchValue"
        placeholder="Tìm kiếm sản phẩm ..."
      />
      <span class="search_icon">
        <i class="fas fa-search"> </i>
      </span>
    </div>
  </div>
  <div class="page_wrapper">
    <div class="category_nav">
      <ul class="category_list">
        <div class="category_label d-flex align-items-center">
          <i class="fa-solid fa-bars category_icon"></i>
          <span class="label_name">Menu</span>
        </div>
        <span
          class="label_name font-weight-bolder"
          style="cursor: pointer"
          @click="handleChooseType"
        >
          Theo thể loại
        </span>
        <div class="wrapper-type p-0 m-0" v-if="chooseType">
          <li class="category_item" @click="retrieveProducts">Tất cả</li>
          <li class="category_item" @click="chooseCategory('bike')">Xe đạp</li>
          <li class="category_item" @click="chooseCategory('frame')">
            Khung xe đạp
          </li>
          <li class="category_item" @click="chooseCategory('accesories')">
            Phụ kiện khác
          </li>
          <li class="category_item" @click="chooseCategory('wheels')">
            Vành xe
          </li>
          <li class="category_item" @click="chooseCategory('tires')">Lốp xe</li>
          <li class="category_item" @click="chooseCategory('tube')">
            Ruột xe đạp
          </li>
          <li class="category_item" @click="chooseCategory('groupset')">
            Bộ truyền động
          </li>
        </div>
        <div
          class="label_name font-weight-bolder"
          style="cursor: pointer"
          @click="handleChoosePrice"
        >
          Theo giá
        </div>
        <div class="wrapper-type p-0 m-0" v-if="choosePrice">
          <li class="category_item" @click="handleClickChoosePrice('dec')">
            Giá tăng dần
          </li>
          <li class="category_item" @click="handleClickChoosePrice('inc')">
            Giá giảm dần
          </li>
        </div>
      </ul>
    </div>
    <ProductCard
      class="product_list"
      v-if="fillProductsCount > 0 && fillCategoryProductsCount == 0"
      :products="fillProducts"
    />
    <ProductCard
      class="product_list"
      v-else
      :products="filteredCategoryProducts"
    />
  </div>
</template>
<script>
import ProductCard from "../components/ProductCard.vue";
import ProductService from "../services/product.service";
import BubbleSort from "../helpers/BubbleSort";

export default {
  components: {
    ProductCard,
    ProductService,
  },
  data() {
    return {
      products: [],
      searchText: "",
      sortProducts: [],
      productCategory: [],
      chooseType: true,
      choosePrice: true,
    };
  },
  computed: {
    fillProducts() {
      if (!this.searchText) return this.products;
      return this.products.filter((_contact, index) =>
        this.productStrings[index].includes(this.searchText)
      );
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
    filteredCategoryProducts() {
      return this.productCategory;
    },
    fillCategoryProductsCount() {
      return this.productCategory.length;
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
    async chooseCategory(category) {
      try {
        this.products = await ProductService.getByCategory(category);
      } catch (error) {
        console.log(error);
      }
    },
    handleChooseType() {
      this.chooseType = !this.chooseType;
    },
    handleChoosePrice() {
      this.choosePrice = !this.choosePrice;
    },
    handleClickChoosePrice(type) {
      BubbleSort(this.products, type);
    },
  },
  mounted() {
    this.retrieveProducts();
  },
};
</script>
<style scoped>
.page_wrapper {
  margin: 0;
  display: flex;
}
.category_nav {
  width: 30%;
  margin: 100px 12px;
}
.product_list {
  width: 70%;
  margin-left: auto;
}
.category_list {
  width: 100%;
  list-style-type: none;
  background-color: white;
  box-shadow: 0 3px 10px rgb(0 0 0 / 0.2);
  padding-bottom: 24px;
}
.category_label {
  padding: 24px;
  font-size: 18px;
  font-weight: 600;
}
.category_icon {
  margin-right: 10px;
}
.category_item {
  padding: 6px;
}
.category_item:hover {
  cursor: pointer;
}
.nav_breadcrumb a {
  text-decoration: none;
  padding: 8px;
}
.breadcrumb {
  margin-top: 100px;
  margin-left: 200px;

  background-color: white;
}
.input_form {
  position: relative;
  width: 800px;
  display: flex;
  align-items: center;
  margin-left: 464px;
}
.input_search {
  width: 100%;
  padding: 12px;
  margin-top: 28px;
  border: 0.5px solid rgb(0 0 0 / 0.2);
  outline: none;
  border-radius: 4px;
}
.input_search:focus {
  border-color: black;
  box-shadow: 0 0 0 1px rgba(15, 15, 15, 0.25);
}
.search_icon {
  position: absolute;
  right: 12px;
  top: 38px;
  font-weight: 800;
  font-size: 20px;
}
</style>