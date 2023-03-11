<template>
    <div class="offcanvas offcanvas-start" tabindex="-1" id="chosenOrders" aria-labelledby="chosenOrdersLabel">
        <div class="offcanvas-header border-bottom">
            <h5 class="offcanvas-title" id="chosenOrdersLabel">已選餐點</h5>
            <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"
                id="chosenOrdersCloseBtn"></button>
        </div>
        <div class="offcanvas-body d-flex align-items-center justify-content-center" v-if="chosenOrders.length == 0">
            <p class="h4 text-secondary">尚未選取餐點</p>
        </div>
        <div class="offcanvas-body justify-content-between d-flex flex-column" v-else>
            <div class="border rounded-2 p-2 mb-3 maxh500 noScrollbar">
                <div class="py-1 row " v-for="(order, index) in chosenOrders" :key="index">
                    <p class="mb-0 col-6 d-flex align-items-center">{{ order.name }}</p>
                    <p class="mb-0 col-3 d-flex align-items-center">$ {{ order.price }}</p>
                    <p class="mb-0 col-2 d-flex align-items-center">x {{ order.count }}</p>
                    <i class="m-0 col-1 bx bx-x text-danger d-flex justify-content-end align-items-center h3" role="button"
                        @click="() => cancelOrderItem(index)"></i>
                    <div class="col-12 border d-flex mt-2">
                        <div class="py-1 px-5 changeOrderCountBtn w-50 text-center border-end" role="button"
                            @click="() => order.count < 2 ? 0 : order.count -= 1">-</div>
                        <div class="py-1 px-5 changeOrderCountBtn w-50 text-center" role="button"
                            @click="() => order.count += 1">
                            +</div>
                    </div>
                </div>
            </div>
            <div class="border rounded-2 p-2 d-flex flex-column">
                <div class="d-flex justify-content-between align-items-end mb-3">
                    <div class="d-flex align-items-end">
                        <p class="mb-0 ms-2 h6">共 {{ totalChosenOrdersCount() }} 項</p>
                        <p class="mb-0 ms-3 h6">$ <span class="text-success">{{ totalChosenOrdersPrice() }}</span></p>
                    </div>
                    <button type="button" class="btn btn-outline-danger btn-sm d-flex align-items-center"
                        @click="cancelAllChosen"><i class='bx bx-trash me-2'></i>清空</button>
                </div>
                <div class="btn btn-danger w-100" @click="createOrder">送出餐點</div>
            </div>
        </div>
    </div>
</template>
<script>
import { mapState, mapActions } from "pinia";
import cartStore from "../stores/cartStore";

export default {
    methods: {
        ...mapActions(cartStore, ['totalChosenOrdersCount', 'totalChosenOrdersPrice', 'cancelOrderItem', 'cancelAllChosen', 'createOrder', 'addToKitchen', 'getChosenOrders'])
    },
    computed: {
        ...mapState(cartStore, ['chosenOrders']),
    },
    mounted() {
        this.getChosenOrders();
    },
}
</script>