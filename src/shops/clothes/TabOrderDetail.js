import Vue from 'vue';
import gql from 'graphql-tag';
import template from '../../components/footer/TheFooter/template.vue';
import BaseDate from '../../components/common/BaseDate.vue';
import CartLikeSummary from '../../components/common/cartlike/CartLikeSummary.vue';
import ORDER_FRAGMENT from '../../components/Order.gql';
import ADDRESS_FRAGMENT from '../../components/Address.gql';
import MONEY_FRAGMENT from '../../components/Money.gql';

const component = {
  components: {
    CartLikeSummary,
    BaseDate,
  },

  data: () => ({
    me: null,
  }),

  apollo: {
    me: {
      query: gql`
        query orderByOrderNumber($orderNumber: String, $locale: Locale!) {
          me {
            order(orderNumber: $orderNumber) {
              ...OrderFields
            }
          }
        }
        ${ORDER_FRAGMENT}
        ${MONEY_FRAGMENT}
        ${ADDRESS_FRAGMENT}
      `,
      variables() {
        return {
          orderNumber: this.$route.params.orderNumber,
          locale: this.$store.state.locale,
        };
      },
    },
  },
};
export default Vue.component('TabOrderDetail', {
  ...component,
  ...template,
});
