import Vue from 'vue';
import { required, sameAs } from 'vuelidate/lib/validators';
import gql from 'graphql-tag';
import template from '../../components/useraccount/changepassword/TabChangePassword/template.vue';
import customerMixin from '../../mixins/customerMixin';
import authMixin from '../../mixins/authMixin';
import ServerError from '../../components/common/form/ServerError.vue';
import LoadingButton from '../../components/common/form/LoadingButton.vue';
import BaseInput from '../../components/common/form/BaseInput.vue';
import BaseForm from '../../components/common/form/BaseForm.vue';

const component = {
  components: {
    BaseForm,
    BaseInput,
    LoadingButton,
    ServerError,
  },

  mixins: [customerMixin, authMixin],

  data: () => ({
    me: null,
    form: {},
  }),

  methods: {
    updateCustomerPassword() {
      return this.updateMyCustomerPassword(
        this.form.currentPassword,
        this.form.newPassword,
      ).then(() => {
        this.login(this.me.customer.email, this.form.newPassword);
        this.form = {};
        this.$v.$reset();
      });
    },

    getErrorMessage({ code }) {
      if (code === 'InvalidCurrentPassword') {
        return this.$t('invalidPassword');
      }
      return this.$t('unknownError');
    },
  },

  apollo: {
    me: {
      query: gql`
        query me {
          me {
            customer {
              id
              version
              email
            }
          }
        }
      `,
      skip: vm => !vm.$store.state.authenticated,
    },
  },

  validations: {
    form: {
      currentPassword: { required },
      newPassword: { required },
      newPasswordConfirm: {
        sameAsPassword: sameAs('newPassword'),
      },
    },
  },
};
export default Vue.component('TabChangePassword', {
  ...component,
  ...template,
});
