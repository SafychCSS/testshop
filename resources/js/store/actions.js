import axios from 'axios';

const actions = {
    /**
     * Get products from api.
     *
     * @param {Object} context
     * @param {Number} countFirstLoadingProducts First loading.
     * @param {Number} countPrevLoadingProducts Count item loading onscroll.
     */
    retrieveProducts(context, {countFirstLoadingProducts, countPrevLoadingProducts}) {
        let products = [];

        axios.get('product.json')
            .then(response => {

                context.commit('countAllProducts', response.data.length)

                if (context.state.isFirstLoading) {
                    for(let i = 0; i < countFirstLoadingProducts; i += 1) {
                        products.push(response.data[i]);
                    }
                    context.commit('firstLoading', false);
                } else {
                    for(let i = countPrevLoadingProducts; i < countFirstLoadingProducts; i += 1) {
                        if (i >= context.state.allProducts)
                            break;
                        products.push(response.data[i]);
                    }
                }

                context.commit('retrieveProducts', products);
            })
            .catch(e => {
                console.log(e);
            });
    },

    /**
     * Commit new product to cart.
     *
     * @param {Function} commit.
     * @param {Object} product Product which will be added to cart.
     */
    addProductsToCart({ commit }, product) {
        commit('addProductsToCart', product);
    },

    /**
     * Commit remove product from cart.
     * @param {Function} commit.
     * @param {Number} id Product id which will be removed.
     */
    removeProductFromCart({ commit }, id) {
        commit('removeProductFromCart', id);
    },
}

export default actions;
