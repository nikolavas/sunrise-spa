import Vue from 'vue';
import gql from 'graphql-tag';
import template from '../../components/checkout/StepShippingAddressForm/template.vue';
import cartMixin from '../../mixins/cartMixin';
import BaseAddressForm from '../../components/checkout/BaseAddressForm.vue';
import ADDRESS_FRAGMENT from '../../components/Address.gql';

const component = {
  components: {
    BaseAddressForm,
  },

  mixins: [cartMixin],

  data: () => ({
    me: null,
  }),

  computed: {
    shippingAddress() {
      return this.me?.activeCart?.shippingAddress;
    },
  },

  methods: {
    setShippingAddress(address) {
      return this.updateMyCart([{ setShippingAddress: { address } }]).then(() => this.$router.push({
        name: 'checkout-billing-address',
      }));
    },

    goToCart() {
      return this.$router.push({ name: 'cart' });
    },
  },

  apollo: {
    me: {
      query: gql`
        query me {
          me {
            activeCart {
              id
              version
              shippingAddress {
                ...AddressFields
              }
            }
          }
        }
        ${ADDRESS_FRAGMENT}
      `,
    },
  },
};
export default Vue.component('StepShippingAddressForm', {
  ...component,
  ...template,
});
