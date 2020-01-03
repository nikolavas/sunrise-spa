import Vue from 'vue';
import gql from 'graphql-tag';
import template from '../../components/cartdetail/PageCartDetail/template.vue';
import cartMixin from '../../mixins/cartMixin';
import LoadingSpinner from '../../components/common/LoadingSpinner.vue';
import CartLikeContentDetail from '../../components/common/cartlike/CartLikeContentDetail.vue';
import CartLikePriceDetail from '../../components/common/cartlike/CartLikePriceDetail.vue';
import AddDiscountCodeForm from '../../components/cartdetail/AddDiscountCodeForm.vue';
import CART_FRAGMENT from '../../components/Cart.gql';
import ADDRESS_FRAGMENT from '../../components/Address.gql';
import MONEY_FRAGMENT from '../../components/Money.gql';

const component = {
  components: {
    LoadingSpinner,
    CartLikeContentDetail,
    CartLikePriceDetail,
    AddDiscountCodeForm,
  },

  data: () => ({
    me: null,
  }),

  computed: {
    isLoading() {
      return this.$apollo.loading;
    },
  },

  mixins: [cartMixin],

  apollo: {
    me: {
      query: gql`
        query me($locale: Locale!) {
          me {
            activeCart {
              ...CartFields
            }
          }
        }
        ${CART_FRAGMENT}
        ${MONEY_FRAGMENT}
        ${ADDRESS_FRAGMENT}
      `,
      variables() {
        return {
          locale: this.$store.state.locale,
        };
      },
    },
  },
};

export default Vue.component('PageCartDetail', {
  ...component,
  ...template,
});
