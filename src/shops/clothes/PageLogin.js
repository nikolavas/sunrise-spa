import Vue from 'vue';
import template from '../../components/login/PageLogin/template.vue';
import LoginForm from '../../components/login/LoginForm.vue';
import SignUpForm from '../../components/login/SignUpForm.vue';

const component = {
  components: {
    LoginForm,
    SignUpForm,
  },
};
export default Vue.component('PageLogin', {
  ...component,
  ...template,
});
