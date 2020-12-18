const getters = {
    /**
     * Get all products.
     *
     * @param {Object} state The current state.
     * @returns {Array} All product from state.
     */
    products(state) {
        return state.products;
    },

    /**
     * Get products in the cart.
     *
     * @param {Object} state The current state.
     * @returns {Array} All product in the cart.
     */
    productsCart(state) {
        return state.productsCart;
    },

    /**
     * Counts products cart.
     *
     * @param {Object} state The current state.
     * @returns {Number} Count products.
     */
    countProductsCart(state) {
        return state.productsCart.reduce((acc, item) => +item.count + acc, 0);
    }

}

export default getters;
