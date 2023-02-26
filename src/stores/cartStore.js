import { defineStore } from "pinia";
import axios from "axios";
import Swal from 'sweetalert2'

export default defineStore('cartStore', {
    state: () => ({
        tempProduct: {      // 暫存所選的餐點資訊
            count: 0,
            id: 0,
            imgUrl: '',
            name: '',
            price: 0
        },
        chosenOrders: [],   // tempProduct加入此陣列後 可以在localStorage做操作
    }),
    actions: {
        // 點擊餐點 取得餐點資訊 渲染選擇數量的modal
        getOrderItem(item) {
            this.tempProduct.id = item.id;
            this.tempProduct.imgUrl = item.imgUrl;
            this.tempProduct.name = item.name;
            this.tempProduct.price = item.price;
        },
        // 送出選擇餐點的數量到localStorage 再從 localStorage取得資訊去渲染offcanvas
        sentOrderItem() {
            if (this.tempProduct.count > 0) {
                if (localStorage.getItem('chosenOrders')) {
                    this.chosenOrders = JSON.parse(localStorage.getItem('chosenOrders'));
                    localStorage.removeItem('chosenOrders');
                }
                this.chosenOrders.push(this.tempProduct);
                localStorage.setItem('chosenOrders', JSON.stringify(this.chosenOrders));
                this.tempProduct = {
                    count: 0,
                    id: 0,
                    imgUrl: '',
                    name: '',
                    price: 0
                }
            }
            document.getElementById('closeOrderItemModal').click();
        },
        // 取得已選餐點
        getChonseOrders() {
            if (localStorage.getItem('chosenOrders')) {
                this.chosenOrders = JSON.parse(localStorage.getItem('chosenOrders'));
            } else {
                this.chosenOrders = []
            }
        },
        // 計算已選餐點數量
        totalChosenOrdersCount() {
            let total = 0;
            this.chosenOrders.forEach(o => {
                total += o.count;
            })
            return total;
        },
        // 計算已選餐點總金額
        totalChosenOrdersPrice() {
            let bill = 0;
            this.chosenOrders.forEach(o => {
                bill += (o.price * o.count);
            })
            return bill;
        },
        // 取消已選餐點 (含LocalStorage)
        cancelOrderItem(index) {
            this.chosenOrders.splice(index, 1);
            localStorage.setItem('chosenOrders', JSON.stringify(this.chosenOrders));
        },
        // 刪除所有已選餐點
        cancelAllChosen() {
            this.chosenOrders = [];
            localStorage.removeItem('chosenOrders');
        },
        // 成立訂單到DB 或更新DB中該桌號的訂單
        async createOrder() {
            let haveBill = false;
            let billId = 0;
            const oldOrders = [];
            // 建立對應DB的訂單資訊
            const tempOrder = {
                orders: []
            }
            const now = new Date();
            tempOrder.tableId = localStorage.getItem('tableId');
            tempOrder.staffId = localStorage.getItem('staffId');
            tempOrder.time = new Date().getTime();
            tempOrder.subtotal = this.totalChosenOrdersPrice();
            const newSerial = this.randomOrderId();
            tempOrder.serial = newSerial;
            !localStorage.getItem('userId') ? tempOrder.user = 0 : tempOrder.user = localStorage.getItem('userId');
            // 加入餐點ID
            this.chosenOrders.forEach(o => {
                for (let i = 0; i < o.count; i++) {
                    tempOrder.orders.push(o.id);
                }
            });
            // 取得所有Bill
            await axios.get('http://localhost:3000/orderList').then(resp => {
                // 取得所有訂單的數量推斷ID 傳入localstorage
                localStorage.setItem('orderId', resp.data.length);
                // 判斷該桌號是否已經有訂單了
                resp.data.forEach(o => {
                    if (o.tableId == localStorage.getItem('tableId')) {
                        haveBill = true;
                        billId = o.id;
                        o.orders.forEach(item => {
                            oldOrders.push(item);
                        })
                    }
                })
            })
            await this.addToKitchen(tempOrder);
            if (haveBill) {
                tempOrder.orders.forEach(item => {
                    oldOrders.push(item);
                })
                axios.patch('http://localhost:3000/orderList/' + billId, { orders: oldOrders }).then(resp => {
                    // 刪除所有已選餐點
                    this.cancelAllChosen();
                    // 關閉側邊offcanvas
                    document.getElementById('chosenOrdersCloseBtn').click();
                    Swal.fire({
                        icon: 'success',
                        title: '餐點已送出',
                        showConfirmButton: false,
                        timer: 1500
                    })
                }).catch(err => alert(err.response.data.message));
            } else {
                // DB建立訂單
                axios.post('http://localhost:3000/orderList', tempOrder).then(resp => {

                    // 刪除所有已選餐點
                    this.cancelAllChosen();
                    // 關閉側邊offcanvas
                    document.getElementById('chosenOrdersCloseBtn').click();
                    Swal.fire({
                        icon: 'success',
                        title: '餐點已送出',
                        showConfirmButton: false,
                        timer: 1500
                    })
                }).catch(err => alert(err.response.data.message));

                // 更新桌位資訊的 orderSerial
                axios.get('http://localhost:3000/tableState').then(resp => {
                    let tempId;
                    tempId = resp.data.filter(o => {
                        return o.tableId == localStorage.getItem('tableId');
                    })[0].id
                    axios.patch('http://localhost:3000/tableState/' + tempId, { orderSerial: newSerial }).catch(err => alert(err.response.data.message));
                })
            }

        },
        // 將訂單傳到 廚房進度 的DB
        async addToKitchen(theOrder) {
            let haveOrder = false;
            let orderId = 0;
            const alreadyOrders = [];
            await axios.get('http://localhost:3000/kitchenOrders').then(resp => {
                resp.data.forEach(o => {
                    if (o.tableId == localStorage.getItem('tableId')) {
                        haveOrder = true;
                        orderId = o.id;
                        o.orders.forEach(item => {
                            alreadyOrders.push(item);
                        })
                    }
                })
            })

            if (haveOrder) {
                theOrder.orders.forEach(item => {
                    alreadyOrders.push(item);
                })
                axios.patch('http://localhost:3000/kitchenOrders/' + orderId, { orders: alreadyOrders }).catch(err => alert(err.response.data.message));
            } else {
                const kitchenOrder = {
                    tableId: theOrder.tableId,
                    orders: theOrder.orders
                }
                axios.post('http://localhost:3000/kitchenOrders', kitchenOrder).catch(err => alert(err.response.data.message));
            }
        },
        // 隨機產生訂單編號
        randomOrderId() {
            const str = "AB1CD3EF2GH4IJ5KL6MN7OP8QR9ST0UVWXYZ";
            let temp = '';
            for (let i = 0; i < 10; i++) {
                let index = Math.random() * 36;
                temp += str.substring(index, index + 1);
            }
            return temp;
        },
        // 取得已選餐點
        getChosenOrders() {
            if (localStorage.getItem('chosenOrders')) {
                this.chosenOrders = JSON.parse(localStorage.getItem('chosenOrders'));
            }
        }
    }
})