import Vue from 'vue';
import template from '../../components/productdetail/PageProductDetail/template.vue';
import Breadcrumb from '../../components/common/Breadcrumb.vue';
import ProductInfo from '../../components/productdetail/ProductInfo.vue';

const component = {
  props: {
    productSlug: {
      type: String,
      required: true,
    },
    sku: {
      type: String,
      required: true,
    },
  },
  components: {
    Breadcrumb,
    ProductInfo,
  },
};
export default Vue.component('PageProductDetail', {
  ...component,
  ...template,
});
