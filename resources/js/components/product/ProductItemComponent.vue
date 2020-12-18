<template>
    <div class="col-md-4">
        <div class="card mb-4 shadow-sm">
            <div class="card-header">
                <h4 class="my-0 font-weight-normal">{{ product.name }}</h4>
            </div>
            <div class="card-body">
                <h1 class="card-title pricing-card-title">${{ product.price }}</h1>
                <ul class="list-unstyled mt-3 mb-4">
                    <li class="d-flex align-items-center">
                        <span class="card-color">Color:</span>
                        <span class="product-color" :style="{backgroundColor: product.color}">&nbsp;</span>
                    </li>
                    <li>Article: {{ product.article }}</li>
                    <li>
                        <span v-if="product.available">In stock</span>
                        <span v-else>Out of stock</span>
                    </li>
                </ul>
                <button
                    type="button"
                    class="btn btn-lg btn-block btn-primary"
                    :disabled="!product.available || countProductsCart > 5"
                    @click="addToCart"
                >
                    <span v-if="product.available && countProductsCart <= 5">Add to cart</span>
                    <span v-else-if="!product.available">Out of stock</span>
                    <span v-else>Cart is full</span>
                </button>
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions, mapGetters } from  'vuex';

export default {
    name: 'ProductItemComponent',
    props: {
        product: {
            type: Object,
            required: true
        },
    },
    methods: {
        /**
         * Method add product to the cart.
         */
        addToCart() {
            this.addProductsToCart({
                name: this.product.name,
                color: this.product.color,
                price: this.product.price,
                article: this.product.article,
                available: this.product.available,
                count: 1,
                id: Date.now(),
            });
        },
        ...mapActions([
            'addProductsToCart',
        ])
    },
    computed: {
        ...mapGetters([
            'productsCart',
            'countProductsCart'
        ]),
    }
};
</script>

<style scoped>

</style>
