<template>
    <div class="offcanvas offcanvas-end bg-opcity" tabindex="-1" id="orderBillOffcanvas"
        aria-labelledby="orderBillOffcanvasleLabel">
        <div class="offcanvas-body" v-if="!tempOrderBill">
            <div class="border rounded-1 bg-white h-100 py-4 px-4 d-flex justify-content-center align-items-center">
                <p class="h4 text-secondary">尚未點餐</p>
            </div>
        </div>
        <div class="offcanvas-body" v-else>
            <button type="button" class="btn-close text-reset d-none" data-bs-dismiss="offcanvas" aria-label="Close"
                id="orderBillClose" ref="orderBillClose"></button>
            <div class="border rounded-1 bg-white h-100 py-4 px-4 d-flex flex-column justify-content-between">
                <div>
                    <h3 class="fw-bold text-center mb-4">Di Riccardo</h3>
                    <p class="h5 fw-bolder">單號：{{ tempOrderBill.serial }}</p>
                    <p class="h5 fw-bolder mb-3">桌號：{{ tempOrderBill.tableId }}</p>
                    <p class="h6 fsz14">日期：{{ timeInChinese(tempOrderBill.time) }}</p>
                    <hr class="mb-1 border-dashed">
                    <div class="overflowScroll">
                        <table class="table ">
                            <thead>
                                <tr>
                                    <th scope="col" class="border-dashed">餐點名稱</th>
                                    <th scope="col" class="border-dashed text-end">數量</th>
                                    <th scope="col" class="border-dashed text-end">價格</th>
                                </tr>
                            </thead>
                            <tbody class="">
                                <tr v-for="(item, index) in tempOrderItem" :key="index">
                                    <td class="border-0" style="max-width: 150px;">{{ item.name }}</td>
                                    <td class="border-0 text-end">{{ item.count }}</td>
                                    <td class="border-0 text-end">$ {{ item.price * item.count }}</td>
                                </tr>
                                <tr>
                                    <td class="border-0 border-top"></td>
                                    <td class="border-0 border-top text-end">{{ billTotalCount() }}</td>
                                    <td class="border-0 border-top text-end">$ {{ billTotalPrice() }}</td>
                                </tr>
                                <tr>
                                    <td class="border-0"></td>
                                    <td class="border-0 text-end"></td>
                                    <td class="border-0 text-end">+ 10%</td>
                                </tr>
                                <tr>
                                    <td class="border-0">總金額</td>
                                    <td class="border-0 text-end"></td>
                                    <td class="border-0 text-end h5 fw-bolder">$ {{ billTotalPrice() + billTotalPrice() * 0.1 }}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <button class="btn btn-outline-danger btn-sm" type="button" @click="tableStatePay">我要結帳</button>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState, mapActions } from "pinia";
import orderStore from "../stores/orderStore";
import tablesStore from "../stores/tablesStore";

export default {
    computed: {
        ...mapState(orderStore, ['tempOrderBill', 'tempOrderItem'])
    },
    methods: {
        ...mapActions(orderStore, ['timeInChinese', 'billTotalCount', 'billTotalPrice', 'tableStatePay']),
        ...mapActions(tablesStore, ['getOffcanvas'])
    },
    mounted() {
        this.getOffcanvas(this.$refs.orderBillClose);
    },
}
</script>