import Vue from 'vue';
import template from '../../components/checkout/StepWithOverview/template.vue';
import CartOverview from '../../components/checkout/CartOverview.vue';

const component = {
  components: { CartOverview },
};
export default Vue.component('StepWithOverview', {
  ...component,
  ...template,
});
