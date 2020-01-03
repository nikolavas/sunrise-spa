import Vue from 'vue';
import template from '../../components/header/TheHeader/template.vue';
import LocationSelector from '../../components/header/LocationSelector.vue';
import CategoriesMenu from '../../components/header/CategoriesMenu.vue';
import LoginButton from '../../components/header/LoginButton.vue';
import MiniCart from '../../components/header/MiniCart.vue';

const component = {
  components: {
    LocationSelector,
    CategoriesMenu,
    LoginButton,
    MiniCart,
  },
};
export default Vue.component('TheHeader', {
  ...component,
  ...template,
});
