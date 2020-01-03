import Vue from 'vue';
import gql from 'graphql-tag';
import template from '../../components/useraccount/myorders/TabOrderList/template.vue';
import BaseMoney from '../../components/common/BaseMoney.vue';
import BaseDate from '../../components/common/BaseDate.vue';
import LoadingSpinner from '../../components/common/LoadingSpinner.vue';
import MONEY_FRAGMENT from '../../components/Money.gql';

const component = {
  components: { BaseMoney, BaseDate, LoadingSpinner },

  data: () => ({
    me: null,
  }),

  computed: {
    isLoading() {
      return this.$apollo.loading;
    },

    orderListNotEmpty() {
      return this.me?.orders?.results.length > 0;
    },
  },

  methods: {
    translateStatus(state) {
      return state ? this.$t(state) : '-';
    },
  },

  apollo: {
    me: {
      query: gql`
        query MyOrders {
          me {
            orders(sort: "createdAt desc") {
              results {
                id
                orderNumber
                totalPrice {
                  ...MoneyFields
                }
                createdAt
                shipmentState
                paymentState
              }
            }
          }
        }
        ${MONEY_FRAGMENT}
      `,
    },
  },
};

export default Vue.component('TabOrderList', {
  ...component,
  ...template,
});
