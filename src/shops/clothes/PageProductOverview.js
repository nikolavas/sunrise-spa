import Vue from 'vue';
import template from '../../components/productoverview/PageProductOverview/template.vue';
import ProductList from '../../components/productoverview/ProductList.vue';
import Breadcrumb from '../../components/common/Breadcrumb.vue';

const component = {
  components: {
    ProductList,
    Breadcrumb,
  },
  props: ['categorySlug'],
};

export default Vue.component('PageProductOverview', {
  ...component,
  ...template,
});
