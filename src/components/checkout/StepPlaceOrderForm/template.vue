<template>
  <div>
    <div v-if="order">
      <div class="row thank-you">
        <div
          class="col-sm-12"
          data-test="checkout-form-success"
        >
          {{ $t('thankYou') }}
        </div>
      </div>
      <div class="checkout-step-title">
        <span>{{ $t('yourOrder') }}</span>
      </div>
      <CartLikeSummary :cartLike="order" />
    </div>
    <BaseForm
      v-else-if="cartExists"
      :vuelidate="$v"
      :onSubmit="createOrder"
      #default="{ error, state }"
    >
      <div class="checkout-step-title">
        <span>{{ $t('confirmOrder') }}</span>
      </div>
      <div class="row">
        <div class="col-sm-12">
          <ServerError :error="error" />
        </div>
      </div>
      <CartLikeSummary
        :cart-like="me.activeCart"
        :editable="true"
      />
      <div class="complete-order">
        <LoadingButton
          :state="state"
          class="complete-order-btn"
          data-test="checkout-form-submit"
        >
          {{ $t('completeMyOrder') }}
        </LoadingButton>
      </div>
    </BaseForm>
  </div>
</template>

<style lang="scss" scoped>
.thank-you {
  text-transform: uppercase;
  font-weight: bold;
  background: #ffba27;
  padding: 2em;
  font-size: 16px;
  margin: 1em 0 2em;
}
</style>

<i18n>
en:
  confirmOrder: "Confirm your order"
  completeMyOrder: "Complete My Order"
  thankYou: "Thank you for your order!"
  yourOrder: "Your order details"
  continueShopping: "Continue shopping"
de:
  completeMyOrder: "Zahlungspflichtig bestellen"
  confirmOrder: "Bestätige Ihre Bestellung"
  thankYou: "Vielen Dank für Ihre Bestellung!"
  yourOrder: "Ihre Bestelldetails"
  continueShopping: "Weiter einkaufen"
</i18n>
