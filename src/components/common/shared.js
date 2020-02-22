/* eslint-disable import/prefer-default-export */
export function totalPrice(lineItem) {
  const { centAmount: unitCentAmount, ...unitPrice } = lineItem.price.discounted?.value || lineItem.price.value;
  const originalPrice = {
    ...unitPrice,
    centAmount: unitCentAmount * lineItem.quantity,
  };
  const price = { value: { ...originalPrice } };
  if (originalPrice.centAmount !== lineItem.totalPrice.centAmount) {
    price.discounted = { value: { ...lineItem.totalPrice } };
  }
  return price;
}
// eslint-disable-next-line max-len
const createPricePoints = country => price => (price.country === country ? 1 : 0);
export const toPrice = (prices, {
  country, currency, customerGroup, channel,
}) => {
  const pricePonts = createPricePoints(country);
  return prices.filter(
    p => p.value.currencyCode === currency
    && p.customerGroup?.id === customerGroup
    && p.channel?.id === channel,
  )// sort mutates but filter copied prices so no problem
    .sort(
      (a, b) => pricePonts(b) - pricePonts(a),
    )[0];
};
export const pageFromRoute = (route) => {
  const pageNum = Number(route.params.page);
  const page = Number.isNaN(pageNum) || pageNum <= 1
    ? 1 : pageNum;
  return {
    page,
  };
};
export const pushPage = (page, component, name) => {
  const { params, query } = component.$route;
  component.$router.push({
    name,
    params: { ...params, page },
    query,
  });
};
export const mix = (a, b) => Object.entries(a).reduce(
  (result, [key, value]) => {
    if (key === 'props') {
      return {
        ...result,
        props: [...new Set((b.props || []).concat(value))],
      };
    }
    if (key === 'data') {
      return {
        ...result,
        data: (...args) => ({
          ...value(...args),
          ...(b.data && b.data(...args)),
        }),
      };
    }
    return {
      ...result,
      [key]: { ...value, ...b[key] },
    };
  }, b,
);

export const withAppollo = appolloValues => (component) => {
  const entities = Object.keys(appolloValues);
  return mix(
    {
      apollo: Object.entries(appolloValues).reduce(
        (result, [key, value]) => ({
          ...result,
          [key]: {
            ...value,
            error(error) {
              this[`${key}Error`] = JSON.stringify(error.message);
            },
          },
        }), {},
      ),
      data: () => entities.reduce(
        (result, entity) => ({
          ...result,
          [`${entity}Error`]: null,
          [entity]: null,
        }), {},
      ),
      computed: entities.reduce(
        (result, entity) => ({
          ...result,
          [`${entity}Loading`]() {
            return this.$apollo.queries[entity]?.loading;
          },
          [`${entity}Total`]() {
            return appolloValues[entity].getter(this)?.total;
          },
          [`${entity}Data`]() {
            return appolloValues[entity].getter(this)?.results;
          },
        }), {
          apolloLoading() {
            return this.$apollo?.loading;
          },
          apolloError() {
            return entities.reduce(
              (result, entity) => result
                || this[`${entity}Error`], false,
            );
          },
        },
      ),
    },
    component,
  );
};
export const locale = component => component?.$route?.params?.locale;
