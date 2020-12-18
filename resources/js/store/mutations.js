const mutations = {
    /**
     * Mutation which will be change product.
     *
     * @param {Object} state The current state.
     * @param {Object} products Products which will be add to the state.
     */
    retrieveProducts(state, products) {
        state.products.push(...products);
    },

    /**
     * Mutation which will be change product to cart.
     *
     * @param {Object} state The current state.
     * @param {Object} product Product which will be add to the cart.
     */
    addProductsToCart(state, product) {
        if (state.productsCart.length === 0) {
            state.productsCart.push(product);
            return;
        }
        let isEqual = false;
        state.productsCart.map(item => {
            Object.values(item).some(val => {
                if (val === product.article) {
                    item.count += 1;
                    isEqual = true;
                    return;
                }
            });
        });
        if (!isEqual)
            state.productsCart.push(product);
    },

    /**
     * Mutation which will be change first loading
     *
     * @param {Object} state The current state.
     * @param {Boolean} isFirstLoading
     */
    firstLoading(state, isFirstLoading) {
        state.isFirstLoading = isFirstLoading;
    },

    /**
     * Mutation change count products.
     *
     * @param {Object} state The current state.
     * @param {Number} n Count products from api.
     */
    countAllProducts(state, n) {
        state.allProducts = n;
    },

    /**
     * Mutation change product to the cart.
     *
     * @param {Object} state The current state.
     * @param {Number} id Product id which will be remove.
     */
    removeProductFromCart(state, id) {
        const index = state.productsCart.findIndex(item => item.id === id);
        if (state.productsCart[index].count > 1) {
            state.productsCart[index].count -= 1;
        } else {
            state.productsCart.splice(index, 1);
        }
    }
}

export default mutations;
