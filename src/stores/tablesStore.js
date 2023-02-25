import { defineStore } from "pinia";
import axios from "axios";
export default defineStore('tablesStore', {
    state: () => ({
        tables: [],
        showStaffLogin: 0,
        tableInfo: {}
    }),
    actions: {
        // 取得所有桌位資訊 並判斷是否顯示啟用表單 以及判斷是否初始化桌位資訊
        getTablesState() {
            axios.get('http://localhost:3000/tableState').then(resp => {
                this.tables = resp.data
                if (localStorage.getItem('tableId')) {
                    this.showStaffLogin = this.tables.filter(o => o.tableId == localStorage.getItem('tableId'))[0].using;
                    if (this.showStaffLogin == 0) {
                        // document.getElementById('orderBillClose').click();
                        // document.getElementById('toHomePage').click();
                        localStorage.removeItem('tableId');
                        localStorage.removeItem('staffId');
                        localStorage.removeItem('orderId');
                    }
                }
            }).catch(err => {
                alert(err.response.data.message);
            });
        },
        // 修改桌位資訊成啟用狀態
        tableUsing(tableInfo) {
            localStorage.setItem('staffId', tableInfo.staffCode);
            localStorage.setItem('tableId', tableInfo.tableNum);
            this.tableInfo = tableInfo;
            axios.patch('http://localhost:3000/tableState/' + tableInfo.id, {
                "customerNum": tableInfo.peopleNum,
                "sitTime": new Date().toTimeString().substring(0, 5).split(':').join(' : '),
                "staffId": tableInfo.staffCode,
                "using": 1
            }).catch(err => {
                alert(err.response.data.message);
            });
        },
        // 判斷是否鎖定螢幕 (點擊我要結帳變更參數)
        checkStateForLock() {
            if (localStorage.getItem('tableId')) {
                if(this.tables.length<1) {
                    return false
                } else {
                    return this.tables.filter(o => o.tableId == localStorage.getItem('tableId'))[0].state == 1;
                }
            } else {
                return false
            }
        },
    }
})