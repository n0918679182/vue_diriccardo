<template>
    <VueLoading v-model:active="isLoading"></VueLoading>
    <div class="event w-100 pt-4 overflow-hidden position-relative vh-100">
        <img src="../assets/images/event/ordered-bg1.png" class="eventBg_img1" alt="">
        <img src="../assets/images/event/ordered-bg2.png" class="eventBg_img2" alt="">
        <div class="bg-event noScrollbar p-4 border-top border-bottom border-white mt-20">
            <div class="container pt-4">
                <div class="row">
                    <div class="col-4" v-for="e in events" :key="e.id">
                        <div class="w-100 overflow-hidden mb-5 rounded-2" style="height: 450px;" data-bs-toggle="modal"
                            data-bs-target="#eventModal" @click="()=>getEvent(e)">
                            <img :src="e.imgUrl" alt="" class="img-fluid">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- 活動 Modal -->
    <div class="modal fade" id="eventModal" tabindex="-1" aria-labelledby="eventModallLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg modal-dialog-centered">
            <div class="modal-content position-relative">
                <div class="modal-body row">
                    <button type="button" style="z-index: 20;" class="btn-close position-absolute top-0 end-0 me-6 mt-3"
                        data-bs-dismiss="modal" aria-label="Close"></button>
                    <div class="col-4 p-3">
                        <img :src="tempEvent.imgUrl" alt="" class="img-fluid mb-3">
                        <button class="btn btn-outline-dark btn-sm" style="width: 233px;" type="bottom"
                            v-if="tempEvent.type == 'productSell'" data-bs-toggle="modal" data-bs-target="#checkOrderModal">
                            我要點餐</button>
                    </div>
                    <div class="col-8 p-3">
                        <h2 class="h5 fw-bold mb-3">{{ tempEvent.title }}</h2>
                        <div class="border-start border-3 border-dark ms-1 mb-4 ps-2">
                            <p v-for="str in tempBr.subTitle" :key="str" class="mb-0 h7">{{ str }}</p>
                        </div>
                        <h3 class="h5 mb-3 fw-bolder">活動資訊</h3>
                        <div class="border-start border-3 border-dark ms-1 mb-4 ps-2">
                            <p v-for="(s, i) in tempBr.detail" :key="i" class="mb-0"
                                style="font-size: 14px; max-width: 450px;">{{ s }}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- 確認是否購買活動餐點 Modal -->
    <div class="modal fade" data-bs-backdrop="static" data-bs-keyboard="false" id="checkOrderModal" tabindex="-1"
        aria-labelledby="checkOrderModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-body text-center pt-10">
                    <p>即將點購 <span class="text-danger">{{ tempEvent.title }}</span></p>
                    <p>確定點購嗎？</p>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-outline-danger" data-bs-target="#eventModal" data-bs-toggle="modal"
                        id="checkOrderClose">取消</button>
                    <button type="button" class="btn btn-danger" @click="addToOrder">確定</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState, mapActions } from "pinia";
import eventStore from "../stores/eventStore";
import loadingStore from "../stores/loadingStore";

export default {
    computed: {
        ...mapState(eventStore, ['events', 'tempEvent', 'tempBr']),
        ...mapState(loadingStore, ['isLoading'])
    },
    methods: {
        ...mapActions(eventStore, ['getEvents', 'getEvent', 'addToOrder']),
        ...mapActions(loadingStore, ['loading'])
    },
    mounted() {
        this.getEvents();
        this.loading();
    },
}
</script>

<style scoped lang="scss">
.eventBg_img1 {
    position: absolute;
    top: 0px;
    left: -110px;
    opacity: .7;
    z-index: -10;
}

.eventBg_img2 {
    transform: scale(.6);
    position: absolute;
    top: -80px;
    left: 380px;
    opacity: .7;
    z-index: -10;
}

.bg-event {
    background: rgba(255, 255, 255, .8);
    max-height: 75vh;
    overflow: scroll;
}
</style>