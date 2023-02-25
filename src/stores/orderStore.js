import { defineStore } from "pinia";
import axios from "axios";
import tableStore from './tablesStore.js'

export default defineStore('orderStore', {
    state: () => ({
        tempOrderBill: {},              // 儲存axios取得的該桌帳單資訊
        tempOrderItem: [],              // 分離重組 tempOrderBill 裡的 orders (產品id 轉成 產品物件)
    }),
    actions: {
        // 從DB取得該桌當前的訂單
        async getOrder() {
            this.tempOrderBill = [];
            this.tempOrderItem = [];
            let sortedBillOrders = {};

            await axios.get('http://localhost:3000/orderList').then(resp => {
                // 取得該桌號的訂單
                this.tempOrderBill = resp.data.filter(o => {
                    return o.tableId == localStorage.getItem('tableId');
                })[0]
                if (this.tempOrderBill) {
                    // 從訂單資訊中的餐點陣列重新編排統計數量
                    sortedBillOrders = this.tempOrderBill.orders.reduce((prev, curr) => {
                        if (curr in prev) {
                            prev[curr]++;
                        }
                        else {
                            prev[curr] = 1;
                        }
                        return prev;
                    }, {});
                }
            })

            // 取得所有餐點資訊
            await axios.get('http://localhost:3000/products').then(resp => {
                // 將重新編排過的統計資料的key值先存入暫存
                resp.data.forEach(o => {
                    Object.keys(sortedBillOrders).forEach(k => {
                        if (k == o.id) {
                            this.tempOrderItem.push(o);
                        }
                    })
                })
            })

            // 將暫存新增數量欄位並輸入對應的數量
            for (let i = 0; i < this.tempOrderItem.length; i++) {
                this.tempOrderItem[i].count = Object.values(sortedBillOrders)[i];
            }
        },
        timeInChinese(time) {
            const t = new Date(time);
            return `${t.getFullYear()} 年 ${t.getMonth() + 1} 月 ${t.getDate()} 日 ${t.getHours()} 時 ${t.getMinutes()} 分`
        },
        // 統計帳單總點餐數
        billTotalCount() {
            let totalCount = 0;
            this.tempOrderItem.forEach(o => {
                totalCount += o.count;
            })
            return totalCount;
        },
        billTotalPrice() {
            let totalPrice = 0;
            this.tempOrderItem.forEach(o => {
                totalPrice += (o.count * o.price);
            })
            if (localStorage.getItem('orderId')) {
                axios.patch('http://localhost:3000/orderList/' + localStorage.getItem('orderId'), { subtotal: totalPrice }).catch(err => alert(err.response.data.message));
            }
            return totalPrice;
        },
        // 更改桌位資訊的狀態為結帳
        tableStatePay() {
            const {tables} = tableStore();
            const tempTable = tables.filter(o => o.tableId == localStorage.getItem('tableId'))[0]
            axios.patch('http://localhost:3000/tableState/' + tempTable.id, { state: 1 }).catch(err => alert(err.response.data.message))
        },
    }
})