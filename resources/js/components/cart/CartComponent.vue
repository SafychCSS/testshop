<template>
    <div class="cart">
        <button
            type="button"
            class="btn btn-info"
            @click="showProductCart"
            :disabled="productsCart.length === 0"
        >
            <svg class="cart__icon">
                <use xlink:href="images/sprite.svg#icon-cart"></use>
            </svg>
            <span class="badge badge-light">{{ productsCart.length }}</span>
        </button>
        <transition tag="div" enter-active-class="animate__animated animate__fadeIn" leave-active-class="animate__animated animate__fadeOut">
            <transition-group
                tag="div" class="product-cart list-group"
                v-if="isVisibleListProducts"
                enter-active-class="animate__animated animate__zoomIn"
                leave-active-class="animate__animated animate__zoomOut"
            >
                <div :key="666" v-if="productsCart.length" class="list-group-item product-cart__item">Total: {{ productsSum }}</div>
                <product-cart
                    v-for="product in productsCart"
                    :key="product.id"
                    :product="product"
                />

            </transition-group>
        </transition>
    </div>
</template>

<script>
import ProductCart from './ProductCartComponent';
import { mapGetters } from 'vuex';
export default {
    name: 'CartComponent',
    components: {
        ProductCart
    },
    data() {
        return {
            isVisibleListProducts: false
        }
    },
    methods: {
        /**
         * Method shows or hides the cart.
         */
        showProductCart() {
            this.isVisibleListProducts = !this.isVisibleListProducts;
        }
    },
    computed: {
        ...mapGetters([
            'productsCart',
        ]),
        productsSum() {
            return this.productsCart.reduce((acc, item) => +item.price * item.count + acc, 0);
        }
    }
};
</script>

<style scoped>

</style>
