<template>
    <div>
        <transition enter-active-class="animate__animated animate__fadeInRight" leave-active-class="animate__animated animate__fadeOutRight">
            <alert-cart-full-component v-if="countProductsCart > 5" />
        </transition>
        <div class="d-flex spinner-border text-secondary mt-5 ml-auto mr-auto" role="status" v-if="!products.length">
            <span class="sr-only">Loading...</span>
        </div>

        <transition enter-active-class="animate__animated animate__fadeIn" leave-active-class="animate__animated animate__fadeOut">
            <div v-if="products.length" class="btn-group mb-3">
                <button
                    type="button"
                    class="btn btn-info"
                    :class="{active: filter === currentFilter}"
                    v-for="(filter, index) in filters" :key="index"
                    @click="changeFilter(filter)"
                >
                    {{ filter }}
                </button>
            </div>
        </transition>

        <transition-group
            tag="div"
            enter-active-class="animate__animated animate__zoomIn"
            class="row"
        >
            <product-item-component
                v-for="product in filteredProducts"
                :key="product.id"
                :product="product"
            />
        </transition-group>

        <div v-if="products.length" v-observe-visibility="{
            callback: visibilityChanged,
            throttle: 300,
        }" />
    </div>
</template>

<script>
import ProductItemComponent from './ProductItemComponent';
import AlertCartFullComponent from '../alert/AlertCartFullComponent';
import { mapGetters, mapActions, mapState } from 'vuex';

export default {
    name: 'ProductListComponent',
    components: {
        ProductItemComponent,
        AlertCartFullComponent
    },
    data() {
        return {
            countFirstLoadingProducts: 9,
            countPrevLoadingProducts: 0,
            filters: ['all', 'available', 'price'],
            currentFilter: 'all',
        }
    },
    methods: {
        ...mapActions([
            'retrieveProducts',
            'getCurrency'
        ]),

        /**
         * Method defined where is the scroll.
         *
         * @param isVisible
         */
        visibilityChanged(isVisible) {
            if (!isVisible) return;
            if (this.allProducts < this.countPrevLoadingProducts)
                return;

            this.countFirstLoadingProducts += 6;
            this.retrieveProducts({
                countFirstLoadingProducts: this.countFirstLoadingProducts,
                countPrevLoadingProducts: this.countPrevLoadingProducts
            });
            this.countPrevLoadingProducts = this.countFirstLoadingProducts;
        },

        /**
         * Method change current filter.
         *
         * @param {String} filter Filter which will be choose.
         */
        changeFilter(filter) {
            this.getCurrency();
            this.currentFilter = filter;
        }
    },
    computed: {
        ...mapGetters([
            'products',
            'productsCart',
            'countProductsCart'
        ]),
        ...mapState([
            'allProducts'
        ]),

        /**
         * Method filters products by the selected filter.
         *
         * @returns {Array|*[]} Filtered products.
         */
        filteredProducts() {
            let products = [...this.products];
            if (this.currentFilter === 'all') {
                return this.products;
            } else if (this.currentFilter === 'available') {
                return this.products.filter(item => item.available);
            } else if (this.currentFilter === 'price') {
                products.sort((a, b) => a.price > b.price ? 1 : -1);
                return products;
            }
        },
    },
    created() {
        this.retrieveProducts({
            countFirstLoadingProducts: this.countFirstLoadingProducts,
            countPrevLoadingProducts: this.countPrevLoadingProducts
        });
        this.countPrevLoadingProducts = this.countFirstLoadingProducts;
    }
};
</script>

<style scoped>

</style>
