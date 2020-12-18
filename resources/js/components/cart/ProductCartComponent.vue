<template>
    <div class="d-flex align-items-center justify-content-between list-group-item product-cart__item">
        <span class="product-cart__block product-color" :style="{backgroundColor: product.color}">&nbsp;</span>
        <span class="product-cart__block product-cart__block--name">{{ product.name }}</span>
        <span class="product-cart__block">${{ product.price }}</span>
        <div class="btn-group btn-group-sm" role="group" aria-label="Basic example">
            <button type="button" class="btn btn-info" :disabled="countProductsCart > 5" @click="addProduct(product.id)">+</button>
            <button type="button" class="btn btn-info" @click="removeProduct(product.id)">-</button>
        </div>
        <button class="btn-success">{{ product.count }}</button>
<!--        <button type="button" class="close" >
            <span aria-hidden="true">&times;</span>
        </button>-->
    </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex';

export default {
    name: 'ProductCart',
    props: {
        product: {
            type: Object,
            required: true
        }
    },
    methods: {
        ...mapActions([
            'addProductsToCart',
            'removeProductFromCart'
        ]),

        /**
         * Method which will be add product to the cart.
         *
         * @param {Number} id Product id which will be add.
         */
        addProduct() {
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

        /**
         * Method which will be remove product from the cart.
         *
         * @param {Number} id Product id which will be remove.
         */
        removeProduct(id) {
            this.removeProductFromCart(id);
        }
    },
    computed: {
        ...mapGetters([
            'countProductsCart'
        ])
    }
};
</script>

<style scoped>

</style>
