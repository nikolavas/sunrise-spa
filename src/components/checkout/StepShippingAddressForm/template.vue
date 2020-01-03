<template>
  <div v-if="cartExists">
    <div class="checkout-step-title">
      <span>{{ $t('shippingInformation') }}</span>
    </div>
    <BaseAddressForm
      :address="shippingAddress"
      :onSubmit="setShippingAddress"
      @back="goToCart"
    />
  </div>
</template>

<i18n>
en:
  shippingInformation: "Shipping Information"
de:
  shippingInformation: "Versand Information"
</i18n>
