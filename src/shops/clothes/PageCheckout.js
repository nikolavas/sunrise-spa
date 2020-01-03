import Vue from 'vue';
import template from '../../components/checkout/PageCheckout/template.vue';
import style from '../../components/checkout/PageCheckout/style.vue';
import CheckoutTitle from '../../components/checkout/CheckoutTitle.vue';

const component = {
  components: {
    CheckoutTitle,
  },
};
export default Vue.component('PageCheckout', {
  ...component,
  ...template,
  ...style,
});
