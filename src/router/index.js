import { createWebHistory, createRouter } from "vue-router";
import MainView from '@/views/MainView.vue'
import ProductPage from '@/views/ProductPage.vue'
import DetailProductPage from '@/views/DetailProduct.vue'
import LoginForm from '@/components/LoginForm.vue'
import RegisterView from '@/views/RegisterView.vue'
import RecommendProductView from '@/views/RecommendProductView.vue'
import CartView from "../views/CartView.vue"
import ManageView from '@/views/ManageView.vue'
import EditProductView from '@/views/EditProduct.vue'
import AddProductView from '@/views/AddProduct.vue'
import ProfileView from '@/views/Profile.vue'
import OrderView from '@/views/OrderView.vue'
import DetailOrderView from '@/views/DetailOrderView.vue'
import ContactView from '@/views/ContactView.vue'
import NewsView from '@/views/NewsView.vue'



const routes = [{
        path: "/",
        name: "MainView",
        component: MainView,
    },
    {
        path: '/recommend-product',
        name: 'RecommendProductView',
        component: RecommendProductView,
    },
    {
        path: '/contact',
        name: 'ContactView',
        component: ContactView,
    },
    {
        path: '/news',
        name: 'NewsView',
        component: NewsView,
    },
    {
        path: '/cart-view',
        name: 'CartView',
        component: CartView,
    },
    {
        path: '/orders/:id',
        name: 'OrderView',
        component: OrderView,
        props: true,
    }, {
        path: '/detail-order/:id',
        name: 'DetailOrderView',
        component: DetailOrderView,
        props: true,
    },
    {
        path: '/login',
        name: 'LoginView',
        component: LoginForm
    },
    {
        path: '/register',
        name: 'RegisterView',
        component: RegisterView
    },
    {
        path: '/profile',
        name: 'ProfileView',
        component: ProfileView
    },
    {
        path: "/products",
        name: "ProductPage",
        component: ProductPage,
    },
    {
        path: "/products-add/",
        name: "AddProductView",
        component: AddProductView,
    },
    {
        path: "/products-edit/:id",
        name: "EditProductView",
        component: EditProductView,
        props: true,
    },
    {
        path: "/manage",
        name: "ManageView",
        component: ManageView,
    },
    {
        path: "/products/:id",
        name: "DetailProductPage",
        component: DetailProductPage,
        props: true,
    },
];
const router = createRouter({
    history: createWebHistory(
        import.meta.env.BASE_URL),
    routes,
});
export default router;