import Vue from 'vue';
import template from '../../components/useraccount/PageUserAccount/template.vue';
import SidebarMenu from '../../components/useraccount/SidebarMenu.vue';

const component = {
  components: { SidebarMenu },
};

export default Vue.component('PageUserAccount', {
  ...component,
  ...template,
});
