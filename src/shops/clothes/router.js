import Vue from 'vue';
import Router from 'vue-router';
import gql from 'graphql-tag';
// set STORE env to clothes
import TheHeader from './TheHeader';
import store from '../../store';
import apollo from '../../apollo';
import TheFooter from './TheFooter';
import TheCheckoutHeader from './TheCheckoutHeader';
import TheCheckoutFooter from './TheCheckoutFooter';
import PageHome from './PageHome';
import PageProductOverview from './PageProductOverview';
import PageLogin from './PageLogin';
import PageUserAccount from './PageUserAccount';
import PageNotFound from './PageNotFound';
import PageProductDetail from './PageProductDetail';
import PageCartDetail from './PageCartDetail';
import TabPersonalDetails from './TabPersonalDetails';
import TabOrderList from './TabOrderList';
import TabOrderDetail from './TabOrderDetail';
import TabChangePassword from './TabChangePassword';
import PageCheckout from './PageCheckout';
import StepWithOverview from './StepWithOverview';
import StepShippingAddressForm from './StepShippingAddressForm';
import StepBillingAddressForm from './StepBillingAddressForm';
import StepShippingMethodForm from './StepShippingMethodForm';
import StepPaymentMethodForm from './StepPaymentMethodForm';
import StepPlaceOrderForm from './StepPlaceOrderForm';

Vue.use(Router);

const requiresAuth = true;
const requiresCart = true;

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  scrollBehavior: () => ({ x: 0, y: 0 }),
  routes: [
    {
      path: '*',
      components: {
        default: PageNotFound,
        header: TheHeader,
        footer: TheFooter,
      },
    },
    {
      path: '/',
      name: 'home',
      components: {
        default: PageHome,
        header: TheHeader,
        footer: TheFooter,
      },
    },
    {
      path: '/stores',
      name: 'stores',
    },
    {
      path: '/login',
      name: 'login',
      components: {
        default: PageLogin,
        header: TheHeader,
        footer: TheFooter,
      },
    },
    {
      path: '/products/:categorySlug',
      name: 'products',
      components: {
        default: PageProductOverview,
        header: TheHeader,
        footer: TheFooter,
      },
      props: {
        default: true,
        header: false,
        footer: false,
      },
    },
    {
      path: '/user',
      meta: { requiresAuth },
      components: {
        default: PageUserAccount,
        header: TheHeader,
        footer: TheFooter,
      },
      children: [
        {
          path: 'orders',
          name: 'orders',
          component: TabOrderList,
        },
        {
          path: 'orders/:orderNumber',
          name: 'order',
          component: TabOrderDetail,
        },
        {
          path: 'account',
          alias: '',
          name: 'user',
          component: TabPersonalDetails,
        },
        {
          path: 'changepassword',
          name: 'changepassword',
          component: TabChangePassword,
        },
      ],
    },
    {
      path: '/product/:productSlug/:sku',
      name: 'product',
      components: {
        default: PageProductDetail,
        header: TheHeader,
        footer: TheFooter,
      },
      props: {
        default: true,
        header: false,
        footer: false,
      },
    },
    {
      path: '/cart',
      name: 'cart',
      components: {
        default: PageCartDetail,
        header: TheHeader,
        footer: TheFooter,
      },
    },
    {
      path: '/checkout',
      meta: { requiresCart },
      components: {
        default: PageCheckout,
        header: TheCheckoutHeader,
        footer: TheCheckoutFooter,
      },
      children: [
        {
          path: '',
          component: StepWithOverview,
          children: [
            {
              path: 'payment',
              name: 'checkout-payment-method',
              component: StepPaymentMethodForm,
            },
            {
              path: 'shipping',
              name: 'checkout-shipping-method',
              component: StepShippingMethodForm,
            },
            {
              path: 'billing',
              name: 'checkout-billing-address',
              component: StepBillingAddressForm,
            },
            {
              path: 'address',
              alias: '',
              name: 'checkout',
              component: StepShippingAddressForm,
            },
          ],
        },
        {
          path: 'order',
          name: 'checkout-order',
          component: StepPlaceOrderForm,
        },
      ],
    },
  ],
});

router.beforeEach(async (to, from, next) => {
  const routeRequiresAuth = to.matched.some(record => record.meta.requiresAuth);
  if (routeRequiresAuth && !store.state.authenticated) {
    next({ name: 'login' });
  } else {
    next();
  }
});

router.beforeEach(async (to, from, next) => {
  const routeRequiresCart = to.matched.some(record => record.meta.requiresCart);
  if (routeRequiresCart) {
    const hasCart = await apollo.defaultClient
      .query({
        query: gql`
          {
            me {
              activeCart {
                id
              }
            }
          }
        `,
      })
      .then(result => !!result.data.me.activeCart);
    if (!hasCart) next('/');
  }
  next();
});

export default router;
