import Vue from 'vue';
import template from '../../components/footer/TheCheckoutFooter/template.vue';
import BaseFooter from '../../components/footer/BaseFooter.vue';

const component = {
  components: {
    BaseFooter,
  },
};
export default Vue.component('TheFooter', {
  ...component,
  ...template,
});
