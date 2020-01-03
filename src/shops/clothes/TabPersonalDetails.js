import Vue from 'vue';
import gql from 'graphql-tag';
import template from '../../components/useraccount/userdetail/TabPersonalDetails/template.vue';
import EditProfileForm from '../../components/useraccount/userdetail/EditProfileForm.vue';

const component = {
  components: { EditProfileForm },

  data: () => ({
    me: null,
  }),

  apollo: {
    me: {
      query: gql`
        query me {
          me {
            customer {
              id
              firstName
              customerNumber
            }
          }
        }
      `,
    },
  },
};

export default Vue.component('TabPersonalDetails', {
  ...component,
  ...template,
});
