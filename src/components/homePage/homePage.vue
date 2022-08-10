<template>
  <div>
      <div style="width:1660px;margin:20px auto;display:flex">
          <visits />
        <customer/>
        <sale />
        <account />
      </div>
    
  </div>
</template>



<script>
import Customer from './customer/customer.vue'
import Visits from './Visits/Visits.vue'
import Sale from './sale/sale.vue'
import Account from './account/account.vue'
export default {
  components: { Visits, Customer, Sale, Account },
    
}
</script>