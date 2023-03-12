<template>
    <VueLoading v-model:active="isLoading"></VueLoading>
    <div class="order w-100 pt-4 overflow-hidden position-relative vh-100">
        <img src="../assets/images/order/product-bg1.png" class="orderBg_img1" alt="">
        <img src="../assets/images/order/product-bg2.png" class="orderBg_img2" alt="">
        <div class="container mt-20">
            <div class="row mt-5 pt-4">
                <div class="col-2">
                    <ul class="border border-white rounded-1 list-unstyled bg-order-sidemenu bg-shadow" id="myTab"
                        role="tablist">
                        <li class="nav-item w-100 text-center d-flex" role="presentation" v-for="i in menuItem"
                            :key="i.type">
                            <a class="text-white w-100 mt-auto mb-auto sidebar" :class="{ 'active': i.type == 'contorni' }"
                                id="home-tab" data-bs-toggle="tab" :data-bs-target="'#' + i.type" type="button" role="tab"
                                :aria-controls="i.type" aria-selected="true">{{ i.chi }}</a>
                        </li>
                    </ul>
                </div>
                <div class="col-10">
                    <div class="tab-content border border-white rounded-1 bg-order-content bg-shadow pt-4 px-4"
                        id="myTabContent">
                        <div class="tab-pane fade" :id="i.type" role="tabpanel" aria-labelledby="home-tab"
                            v-for="i in menuItem" :key="i.type"
                            :class="{ 'show': i.type == 'contorni', 'active': i.type == 'contorni' }">
                            <div class="row">
                                <div class="col-3 mb-5" v-for="p in products.filter(o => o.type == i.type)" :key="p.id"
                                    data-bs-toggle="modal" data-bs-target="#orderItemModal" @click="() => getOrderItem(p)"
                                    role="button">
                                    <div class="bg-img-set rounded-2 bg-shadow d-flex align-items-end position-relative"
                                        style="height: 190px;" :style="{ backgroundImage: 'url(' + p.imgUrl + ')' }">
                                        <div class="position-absolute top-0 end-0 me-2 mt-1 bg-white order-item-price">
                                            <p class="m-0">$ {{ p.price }}</p>
                                        </div>
                                        <div class="p-2 w-100 order-item-title">
                                            <p class="mb-0">{{ p.name }}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-12">
                    <button type="button" class="btn btn-dark w-100 border border-white bg-shadow"
                        data-bs-toggle="offcanvas" data-bs-target="#chosenOrders" aria-controls="chosenOrders"
                        @click="getChonseOrders">確認已選餐點</button>
                </div>
            </div>
        </div>
    </div>

    <!-- Modal -->
    <div class="modal fade" id="orderItemModal" tabindex="-1" aria-labelledby="orderItemModalLabel" aria-hidden="true"
        data-bs-backdrop="static" data-bs-keyboard="false">
        <div class="modal-dialog modal-dialog-centered modal-sm">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title h6">{{ tempProduct.name }}</h5>
                </div>
                <div class="modal-body p-0 d-flex justify-content-between">
                    <div class="py-3 px-5 changeOrderCountBtn"
                        @click="() => tempProduct.count < 2 ? tempProduct.count = 1 : tempProduct.count -= 1" role="button">
                        -</div>
                    <div class="p-3">{{ tempProduct.count }}</div>
                    <div class="py-3 px-5 changeOrderCountBtn" @click="() => tempProduct.count += 1" role="button">+</div>
                </div>
                <div class="modal-footer py-1">
                    <button type="button" class="btn btn-outline-danger btn-sm" data-bs-dismiss="modal"
                        id="closeOrderItemModal" @click="() => tempProduct.count = 1">取消</button>
                    <button type="button" class="btn btn-danger btn-sm" @click="sentOrderItem">確定</button>
                </div>
            </div>
        </div>
    </div>
    <!-- 已選餐點 offcanvas -->
    <SelectedProducts></SelectedProducts>
</template>

<script>
import { mapState, mapActions } from "pinia";
import productStore from '../stores/productStore.js';
import cartStore from "../stores/cartStore";
import SelectedProducts from "../components/SelectedProductsOffcanvas.vue";
import loadingStore from "../stores/loadingStore";

export default {
    methods: {
        ...mapActions(productStore, ['getProducts']),
        ...mapActions(cartStore, ['getOrderItem', 'sentOrderItem', 'getChonseOrders']),
        ...mapActions(loadingStore, ['loading'])
    },
    computed: {
        ...mapState(productStore, ['menuItem', 'products']),
        ...mapState(cartStore, ['tempProduct', 'chosenOrders']),
        ...mapState(loadingStore, ['isLoading'])
    },
    components: {
        SelectedProducts,
    },
    mounted() {
        this.getProducts();
        this.loading();
    },
}
</script>

<style lang="scss">
.orderBg_img1 {
    position: absolute;
    top: -100px;
    left: -230px;
    transform: scale(.9) rotate(60deg);
    opacity: .7;
    z-index: -10;
}

.orderBg_img2 {
    position: absolute;
    bottom: 120px;
    right: -120px;
    opacity: .7;
    z-index: -10;
}

.bg-order-sidemenu {
    background: linear-gradient(to top, #000, #5F0000);
    height: 500px;
    li {
        height: 50px;
    }
}

.bg-shadow {
    box-shadow: 4px 4px 10px 3px rgba(0, 0, 0, 0.8);
}

.bg-order-content {
    background: rgba(0, 0, 0, .7);
    height: 500px;
    overflow: scroll;
    -ms-overflow-style: none;
    /* IE and Edge */
    scrollbar-width: none;
    /* Firefox */
}

.bg-order-content::-webkit-scrollbar {
    display: none;
}

.bg-img-set {
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
}

.order-item-title {
    background: rgba(0, 0, 0, .8);
    font-size: 10px;
    height: 30px;
    color: #FFF;
    border-radius: 0 0 4px 4px;
}

.order-item-price {
    font-size: 12px;
    padding: 0 8px;
    border-radius: 8px;
    color: #000;
}

.clickEffect {
    background: rgb(231, 229, 229);
}

.maxh500 {
    max-height: 500px;
    overflow: scroll;
    -ms-overflow-style: none;
    /* IE and Edge */
    scrollbar-width: none;
    /* Firefox */
}

.sidebar.active {
    background: rgb(255, 255, 255, .2) !important;
    padding-top: 10px;
    padding-bottom: 10px;
}
</style>