<template>
  <div class="w-100 vh-100 lockScreen d-flex justify-content-center align-items-center" v-if="checkStateForLock()">
    <div class="card">
      <div class="card-body">
        請稍後，將會有服務員來替您結帳！
      </div>
    </div>
  </div>
  <div>
    <VueLoading v-model:active="isLoading"></VueLoading>
    <div class="d-flex justify-content-end navbar">
      <RouterLink to="/" class="me-4 ">
        <a class="bg-primary-1 p-2 h6 rounded border border-white text-decoration-none text-white bt bt-shadow" href="#"
          id="toHomePage">菜單首頁</a>
      </RouterLink>
      <RouterLink to="/order" class="me-4 ">
        <a class="bg-primary-1 p-2 h6 rounded border border-white text-decoration-none text-white bt bt-shadow"
          href="#">進入點餐</a>
      </RouterLink>
      <div class="me-4 ">
        <a class="bg-primary-1 p-2 h6 rounded border border-white text-decoration-none text-white bt bt-shadow"
          data-bs-toggle="offcanvas" href="#orderBillOffcanvas" @click="getOrder">已點餐點</a>
      </div>
      <RouterLink to="/event" class="me-4 ">
        <a class="bg-primary-1 p-2 h6 rounded border border-white text-decoration-none text-white bt bt-shadow"
          href="#">好康優惠</a>
      </RouterLink>
    </div>
    <RouterView />
    <StartUp></StartUp>
    <TableInfo></TableInfo>
    <!-- 已點餐點 offcanvas -->
    <bill-offcanvas></bill-offcanvas>
  </div>
</template>

<script>
import { mapActions } from "pinia";
import orderStore from './stores/orderStore.js';
import tablesStore from "./stores/tablesStore.js";

import { RouterLink, RouterView } from 'vue-router';
import StartUp from './components/StartUp.vue';
import TableInfo from './components/TableInfo.vue';
import BillOffcanvas from './components/BillOffcanvas.vue';

export default {
  components: {
    RouterLink,
    RouterView,
    StartUp,
    TableInfo,
    BillOffcanvas
  },
  data() {
    return {
      isLoading: false
    }
  },
  methods: {
    ...mapActions(orderStore, ['getOrder']),
    ...mapActions(tablesStore, ['checkStateForLock', 'getTablesState'])
  },
  mounted() {
    this.isLoading = true;
    setTimeout(() => {
      this.isLoading = false;
    }, 500);
    setInterval(()=>{
      this.getTablesState();
    }, 1000);
  },
}
</script>


<style lang="scss" scoped>
.navbar {
  position: absolute;
  top: 30px;
  right: 70px;
  z-index: 1;
}

.bg-primary-1 {
  background: #9D0504;
}

.bt-shadow {
  box-shadow: 4px 4px 10px 4px rgba(0, 0, 0, .2);
  transition: 0s;
}

.lockScreen {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 10000;
  background: rgba(0, 0, 0, .5);
}
</style>

