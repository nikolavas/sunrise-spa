import Vue from 'vue';
import gql from 'graphql-tag';
import { required } from 'vuelidate/lib/validators';
import template from '../../components/checkout/StepBillingAddressForm/template.vue';
import cartMixin from '../../mixins/cartMixin';
import BaseInput from '../../components/common/form/BaseInput.vue';
import BaseForm from '../../components/common/form/BaseForm.vue';
import BaseAddressForm from '../../components/checkout/BaseAddressForm.vue';
import ServerError from '../../components/common/form/ServerError.vue';
import CheckoutNavigation from '../../components/checkout/CheckoutNavigation.vue';
import ADDRESS_FRAGMENT from '../../components/Address.gql';

const component = {
  components: {
    CheckoutNavigation,
    ServerError,
    BaseForm,
    BaseAddressForm,
    BaseInput,
  },

  mixins: [cartMixin],

  data: () => ({
    me: null,
    sameAddress: true,
  }),

  computed: {
    billingAddress() {
      return this.me?.activeCart?.billingAddress;
    },
  },

  methods: {
    unsetBillingAddress() {
      return this.setBillingAddress(null);
    },

    setBillingAddress(address) {
      return this.updateMyCart([{ setBillingAddress: { address } }]).then(() => this.$router.push({
        name: 'checkout-shipping-method',
      }));
    },

    goToShipping() {
      this.$router.push({ name: 'checkout' });
    },
  },

  watch: {
    me(value) {
      this.sameAddress = !value.activeCart?.billingAddress;
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
              billingAddress {
                ...AddressFields
              }
            }
          }
        }
        ${ADDRESS_FRAGMENT}
      `,
    },
  },

  validations: {
    sameAddress: { required },
  },
};
export default Vue.component('StepBillingAddressForm', {
  ...component,
  ...template,
});
