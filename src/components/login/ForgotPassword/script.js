import { required } from 'vuelidate/lib/validators';
import { fetchJson } from '../../../api';
import sunriseConfig from '../../../../sunrise.config';
import ServerError from '../../common/form/ServerError/index.vue';
import LoadingButton from '../../common/form/LoadingButton/index.vue';
import BaseInput from '../../common/form/BaseInput/index.vue';
import BaseForm from '../../common/form/BaseForm/index.vue';

export default {
  components: {
    BaseForm,
    BaseInput,
    LoadingButton,
    ServerError,
  },
  data: () => ({
    email: null,
  }),
  methods: {
    sendRecoveryEmail() {
      return fetchJson(
        'https://a8nroxg8i3.execute-api.eu-west-1.amazonaws.com/dev/email/send',
        {
          body: JSON.stringify(
            {
              email: this.email,
              baseUrl: window.location.origin,
              projectConfig: sunriseConfig.ct,
            },
          ),
          method: 'POST',
        },
      ).catch(
        async (e) => {
          let message;
          try {
            message = await e.text();
          } catch (error) {
            // @todo: status 500+ not handled
            // make get to http://httpstat.us/500 to simulate
            // eslint-disable-next-line no-throw-literal
            throw { networkError: true };
          }
          // eslint-disable-next-line no-throw-literal
          throw { status: 404, message };
        },
      );
    },
    getErrorMessage({ code }) {
      if (code === 'InvalidSubject') {
        return this.$t('invalidSubject');
      }
      return this.$t('unknownError');
    },
  },
  validations: {
    email: { required },
  },
};
