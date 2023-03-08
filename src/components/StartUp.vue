<template>
    <div class="w-100 vh-100 cover d-flex justify-content-center align-items-center" v-if="!showStaffLogin">
        <div class="rounded-1 w-25 bg-white p-5">
            <div class="mb-3">
                <label for="tableId" class="form-label">請選擇桌號</label>
                <select class="form-select" aria-label="tableIdLabel" id="tableId" v-model="tableInfo.tableNum">
                    <template v-for="table in tables" :key="table.id">
                        <option :value="table.tableId" v-if="table.tableId != 'path' && table.customerNum == 0">{{
                            table.tableId }}</option>
                    </template>
                </select>
            </div>
            <div class="mb-3">
                <label for="peopleNum" class="form-label">請輸入用餐人數</label>
                <!-- <input type="text" class="form-control" id="peopleNum" v-model="tableInfo.peopleNum"> -->
                <select class="form-select" aria-label="tableIdLabel" id="peopleNum" v-model="tableInfo.peopleNum">
                        <option v-for="num in 4" :key="num" :value="num" >{{ num }}</option>
                </select>
            </div>
            <div class="mb-3">
                <label for="staffCode" class="form-label">請輸入員工編號</label>
                <input type="text" class="form-control" id="staffCode" v-model="tableInfo.staffCode">
            </div>
            <div class="w-100 text-center pt-4 pb-0">
                <button type="button" class="btn btn-danger p-2" @click="beginSys">進入點餐系統</button>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState, mapActions } from "pinia";
import tablesStore from '../stores/tablesStore.js';
import staffStore from '../stores/staffStore.js';
import Swal from 'sweetalert2'

export default {
    data() {
        return {
            tableInfo: {
                id: '',
                tableNum: '',
                peopleNum: '',
                staffCode: '',
                staffName: ''
            },
        }
    },
    methods: {
        ...mapActions(tablesStore, ['getTablesState', 'tableUsing']),
        ...mapActions(staffStore, ['getStaffs']),
        // 員工啟用POS機
        async beginSys() {
            this.tableInfo.id = this.tables.filter(t => t.tableId == this.tableInfo.tableNum)[0].id;
            let staffLogin = false;
            // 判斷沒有未填欄位
            if (this.tableInfo.tableNum == '' || this.tableInfo.peopleNum == '' || this.tableInfo.staffCode == '') {
                Swal.fire({
                    title: '<h3 class="text-dark">表單輸入不完整</h3>',
                    confirmButtonColor: '#9C0504',
                });
            } else {
                // 從員工編號取得員工姓名
                if (this.staffs) {
                    this.staffs.forEach(o => {
                        // 若有配對到員工則更改 staffLogin 為 true
                        if (o.staffCode == this.tableInfo.staffCode) {
                            staffLogin = true;
                            this.tableInfo.staffName = o.name;
                        }
                    })
                }
                // 若確定登入員工
                if (staffLogin) {
                    // 修改桌位資訊
                    this.tableUsing(this.tableInfo)
                    Swal.fire({
                        title: '<h3 class="text-dark">即將開始點餐系統</h3>',
                        confirmButtonColor: '#9C0504',
                    });
                    this.tableInfo = {
                        id: '',
                        tableNum: '',
                        peopleNum: '',
                        staffCode: '',
                        staffName: ''
                    }

                    // 若員工登入失敗則跳出失敗訊息
                } else {
                    Swal.fire({
                        title: '<h3 class="text-dark">員工編號輸入錯誤!</h3>',
                        confirmButtonColor: '#9C0504',
                    });
                }
            }
        }
    },
    computed: {
        ...mapState(tablesStore, ['tables', 'showStaffLogin']),
        ...mapState(staffStore, ['staffs'])
    },
    mounted() {
        setInterval(() => {
            this.getTablesState();
        }, 1000)
        this.getStaffs();
    },
}
</script>

<style lang="scss">
.cover {
    position: absolute;
    top: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: 2;

    input,
    select {
        background: #fff;

        &:focus {
            background: #fff;
        }
    }
}
</style>