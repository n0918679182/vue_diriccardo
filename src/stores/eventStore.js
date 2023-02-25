import { defineStore } from "pinia";
import axios from "axios";
import cartStore from './cartStore';
import e1 from "../assets/images/event/post/event1.png";
import e2 from "../assets/images/event/post/event2.png";
import e3 from "../assets/images/event/post/event3.png";

export default defineStore('eventStore', {
    state: () => ({
        events: [],
        tempEvent: {},
        tempBr: {
            subTitle: [],
            detail: []
        }
    }),
    actions: {
        getEvents() {
            axios.get('http://localhost:3000/event').then(resp => {
                this.events = resp.data;
            }).catch(err => alert(err.response.data.message));
        },
        getEvent(event) {
            this.tempEvent = event;
            this.tempBr.subTitle = this.tempEvent.subTitle.split('\n');
            this.tempBr.detail = this.tempEvent.detail.split('\n');
        },
        addToOrder() {
            console.log(123)
        },
        async addToOrder() {
            const { randomOrderId } = cartStore();
            let haveBill = false;
            let billId = 0;
            let oldSubtotal = 0;
            const oldOrders = [];
            // 建立對應DB的訂單資訊
            const tempOrder = {
                orders: []
            }
            tempOrder.tableId = localStorage.getItem('tableId');
            tempOrder.staffId = localStorage.getItem('staffId');
            tempOrder.time = new Date();
            tempOrder.subtotal = this.tempEvent.price;
            const newSerial = randomOrderId();
            tempOrder.serial = newSerial;
            tempOrder.user = 0;
            tempOrder.orders.push(this.tempEvent.productNum);

            // 取得所有Bill
            await axios.get('http://localhost:3000/orderList').then(resp => {
                // 判斷該桌號是否已經有訂單了
                resp.data.forEach(o => {
                    if (o.tableId == localStorage.getItem('tableId')) {
                        haveBill = true;
                        billId = o.id;
                        oldSubtotal = o.subtotal;
                        o.orders.forEach(item => {
                            tempOrder.orders.push(item);
                        })
                    } else {
                        // 取得所有訂單的數量推斷ID 傳入localstorage
                        if (!localStorage.getItem('orderId')) {
                            localStorage.setItem('orderId', resp.data.length);
                        }
                    }
                })
            })

            if (haveBill) {
                axios.patch('http://localhost:3000/orderList/' + billId, { orders: tempOrder.orders, subtotal: oldSubtotal + tempOrder.subtotal }).then(resp => {
                    document.getElementById('checkOrderClose').click();
                    // Swal.fire({
                    //     icon: 'success',
                    //     title: '餐點已送出',
                    //     showConfirmButton: false,
                    //     timer: 1500
                    // });
                    alert('餐點已送出');
                }).catch(err => console.log(err.message));
            } else {
                // DB建立訂單
                axios.post('http://localhost:3000/orderList', tempOrder).then(resp => {
                    document.getElementById('checkOrderClose').click();
                    // Swal.fire({
                    //     icon: 'success',
                    //     title: '餐點已送出',
                    //     showConfirmButton: false,
                    //     timer: 1500
                    // });
                    alert('餐點已送出');
                }).catch(err => console.log(err.message));

                // 更新桌位資訊的 orderSerial
                axios.get('http://localhost:3000/tableState').then(resp => {
                    let tempId;
                    tempId = resp.data.filter(o => {
                        return o.tableId == localStorage.getItem('tableId');
                    })[0].id
                    axios.patch('http://localhost:3000/tableState/' + tempId, { orderSerial: newSerial }).catch(err => console.log(err.message));
                })
            }
        },
    }
})