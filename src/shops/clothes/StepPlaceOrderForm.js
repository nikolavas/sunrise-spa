import Vue from 'vue';
import gql from 'graphql-tag';
import template from '../../components/checkout/StepPlaceOrderForm/template.vue';
import BaseForm from '../../components/common/form/BaseForm.vue';
import cartMixin from '../../mixins/cartMixin';
import ServerError from '../../components/common/form/ServerError.vue';
import LoadingButton from '../../components/common/form/LoadingButton.vue';
import CartLikeSummary from '../../components/common/cartlike/CartLikeSummary.vue';
import CART_FRAGMENT from '../../components/Cart.gql';
import ADDRESS_FRAGMENT from '../../components/Address.gql';
import MONEY_FRAGMENT from '../../components/Money.gql';

const component = {
  components: {
    CartLikeSummary,
    LoadingButton,
    ServerError,
    BaseForm,
  },

  mixins: [cartMixin],

  data() {
    return {
      order: null,
    };
  },

  methods: {
    createOrder() {
      return this.createMyOrder().then((result) => {
        this.order = result.data.createMyOrderFromCart;
        window.scrollTo(0, 0);
      });
    },
  },

  watch: {
    me(value) {
      if (value.activeCart) {
        if (!value.activeCart.shippingAddress) {
          this.$router.push({ name: 'checkout' });
        } else if (!value.activeCart.shippingInfo) {
          this.$router.push({
            name: 'checkout-shipping-method',
          });
        }
      }
    },
  },

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

  validations: {
    form: {},
  },
};
export default Vue.component('StepPlaceOrderForm', {
  ...component,
  ...template,
});
