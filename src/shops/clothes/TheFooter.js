import Vue from 'vue';
import template from '../../components/footer/TheFooter/template.vue';
import BaseFooter from '../../components/footer/BaseFooter.vue';
import FooterLinks from '../../components/footer/FooterLinks.vue';
import FooterMarketing from '../../components/footer/FooterMarketing.vue';

const component = {
  components: {
    BaseFooter,
    FooterLinks,
    FooterMarketing,
  },
};
export default Vue.component('TheFooter', {
  ...component,
  ...template,
});
