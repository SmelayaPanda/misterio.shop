export const purchaseStatuses = {
  data: function () {
    return {
      // One click only
      CREATED: 'created',
      // Order only
      PAY_PEND: 'payPending',
      // Common
      SENT_PEND: 'sentPending',
      SENT: 'sent',
      DELIVERED: 'delivered',
      REFUSED: 'refused'
    }
  }
}
