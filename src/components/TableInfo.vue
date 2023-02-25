<template>
    <div class="tableInfo bg-primary-1 border-white text-white pb-1 pt-2 ps-4" :class="{ active: showTableInfoBoolean }"
        @click="showTableInfo">
        <p class="mb-4">用餐資訊</p>
        <p class="mb-2">桌號： {{ tableInfo.tableNum }}</p>
        <p class="mb-2">用餐人數： {{ tableInfo.peopleNum }} 位</p>
        <p class="mb-2">服務人員： {{ tableInfo.staffName }}</p>
    </div>
</template>

<script>
import { mapState } from "pinia";
import tablesStore from '../stores/tablesStore.js';

export default {
    data() {
        return {
            showTableInfoBoolean: false,     // 判斷是否顯示用餐資訊
        }
    },
    methods: {
        // 桌位資訊顯示切換
        showTableInfo() {
            this.showTableInfoBoolean = !this.showTableInfoBoolean
        }
    },
    computed: {
        ...mapState(tablesStore, ['tables', 'tableInfo']),
    }
}
</script>

<style lang="scss">
.tableInfo {
    width: 110px;
    height: 40px;
    position: absolute;
    bottom: 0;
    left: 50px;
    z-index: 0;
    border-radius: 10px 10px 0 0;
    box-shadow: 4px 4px 10px 3px rgba(0, 0, 0, 0.8);
    border: 1px solid #fff;
    border-bottom: none;
    cursor: pointer;
    transition: .3s;
    overflow: hidden;

    &.active {
        width: 200px;
        height: 150px;
    }
}
</style>