/* eslint-disable no-param-reassign */
import gql from 'graphql-tag';
import LoadingSpinner from '../../common/LoadingSpinner/index.vue';
import ProductThumbnail from '../../common/ProductThumbnail/index.vue';
import ProductSortSelector from '../ProductSortSelector/index.vue';
import Pagination from '../../common/Pagination/index.vue';
import { products, onlyLastRequestedPromise } from '../../../api';
import {
  toPrice, pushPage, locale, withAppollo,
} from '../../common/shared';

const last = onlyLastRequestedPromise('products');
const getProducts = (component) => {
  const category = component.$route.params.categorySlug === 'all'
    ? undefined
    : component.categoriesData?.[0]?.id;
  if (
    !category
    && component.$route.params.categorySlug !== 'all'
  ) {
    return;
  }
  component.loadingProducts = true;
  const route = component.$route;
  const {
    currency,
    country,
  } = component.$store.state;
  const loc = locale(component);
  const sortValue = route.query.sort;
  const searchText = route.query.q
    ? { [`text.${loc}`]: route.query.q }
    : {};
  const sort = sortValue
    ? { sort: `lastModifiedAt ${sortValue === 'newest' ? 'desc' : 'asc'}` }
    : {};
  last(products.get({
    category,
    page: Number(route.params?.page || 1),
    pageSize: component.limit,
    ...sort,
    ...searchText,
  })).then(({ results, ...meta }) => {
    component.products = {
      ...meta,
      results: results.map(
        ({
          id, masterVariant: { sku, images, prices }, name, slug,
        }) => ({
          id,
          masterData: {
            current: {
              name: name[loc],
              slug: slug[loc],
              masterVariant: {
                sku,
                images,
                price: toPrice(prices, {
                  country,
                  currency,
                  // @todo: what about customerGroup and channel
                }),
              },
            },
          },
        }),
      ),
    };
    component.loadingProducts = false;
  });
};
const component = {
  props: ['categorySlug', 'page'],
  components: {
    LoadingSpinner,
    ProductThumbnail,
    ProductSortSelector,
    Pagination,
  },
  data: () => ({
    products: null,
    sort: null,
    limit: Number(process.env.VUE_APP_PAGE_SIZE || 75),
    loadingProducts: false,
  }),
  computed: {
    category() {
      // only used for unit test
      // @todo: make the unit test better so it gets data
      //  from apollo
      return this.categories?.results?.[0];
    },
    hasManyProducts() {
      return this.products?.results.length >= this.limit / 2;
    },
    offset() {
      return (this.page - 1) * this.limit;
    },
    totalProducts() {
      return this.products.total;
    },
    loading() {
      return this.loadingProducts || this.apolloLoading;
    },
  },
  methods: {
    changeSort(sort) {
      this.sort = sort;
    },
    changePage(page) {
      pushPage(page, this, 'products');
    },
    showScroll(el) {
      // eslint-disable-next-line no-param-reassign
      el.style.display = window.innerHeight > 300
       && window.scrollY > 200 ? '' : 'none';
    },
  },
  watch: {
    $route() {
      getProducts(this);
    },
    categories() {
      getProducts(this);
    },
  },
};
export default withAppollo(
  {
    categories: {
      query: gql`
        query categories($where: String!) {
          categories(where: $where, limit: 1) {
            results {
              id
            }
          }
        }`,
      variables() {
        return {
          where: `slug(${locale(this)}="${this.categorySlug}")`,
        };
      },
      getter(data) {
        return data?.categories;
      },
      skip: vm => !vm.categorySlug,
    },
  },
)(component);
