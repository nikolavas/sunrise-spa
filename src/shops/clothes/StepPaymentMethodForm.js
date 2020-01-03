import Vue from 'vue';
import { required } from 'vuelidate/lib/validators';
import template from '../../components/checkout/StepPaymentMethodForm/template.vue';
import cartMixin from '../../mixins/cartMixin';
import BaseRadio from '../../components/common/form/BaseRadio.vue';
import BaseForm from '../../components/common/form/BaseForm.vue';
import BaseLabel from '../../components/common/form/BaseLabel.vue';
import ServerError from '../../components/common/form/ServerError.vue';
import CheckoutNavigation from '../../components/checkout/CheckoutNavigation.vue';

const component = {
  components: {
    BaseLabel,
    CheckoutNavigation,
    ServerError,
    BaseForm,
    BaseRadio,
  },

  mixins: [cartMixin],

  data: () => ({
    form: {
      paymentMethod: 'card',
    },
  }),

  methods: {
    setPaymentMethod() {
      // TODO create payment and add it to the cart, but missing CreateMyPayment mutation
      // return this.updateMyCart([
      //   {
      //     addPayment: {
      //       payment: {
      //         typeId: 'payment',
      //         id: paymentId
      //       },
      //     },
      //   },
      // ]).then(() => this.$router.push({ name: 'checkout-confirmation' }));
      return Promise.resolve(this.$router.push({ name: 'checkout-order' }));
    },

    goToShippingMethod() {
      this.$router.push({
        name: 'checkout-shipping-method',
      });
    },
  },

  validations: {
    form: {
      paymentMethod: { required },
    },
  },
};
export default Vue.component('StepPaymentMethodForm', {
  ...component,
  ...template,
});
