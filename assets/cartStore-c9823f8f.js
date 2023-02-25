import{d as h,e as l}from"./index-fc66e960.js";const i=h("cartStore",{state:()=>({tempProduct:{count:0,id:0,imgUrl:"",name:"",price:0},chosenOrders:[]}),actions:{getOrderItem(e){this.tempProduct.id=e.id,this.tempProduct.imgUrl=e.imgUrl,this.tempProduct.name=e.name,this.tempProduct.price=e.price},sentOrderItem(){this.tempProduct.count>0&&(localStorage.getItem("chosenOrders")&&(this.chosenOrders=JSON.parse(localStorage.getItem("chosenOrders")),localStorage.removeItem("chosenOrders")),this.chosenOrders.push(this.tempProduct),localStorage.setItem("chosenOrders",JSON.stringify(this.chosenOrders)),this.tempProduct={count:0,id:0,imgUrl:"",name:"",price:0}),document.getElementById("closeOrderItemModal").click(),console.log("chosenOrder",this.chosenOrders)},getChonseOrders(){localStorage.getItem("chosenOrders")?this.chosenOrders=JSON.parse(localStorage.getItem("chosenOrders")):this.chosenOrders=[]},totalChosenOrdersCount(){let e=0;return this.chosenOrders.forEach(s=>{e+=s.count}),e},totalChosenOrdersPrice(){let e=0;return this.chosenOrders.forEach(s=>{e+=s.price*s.count}),e},cancelOrderItem(e){this.chosenOrders.splice(e,1),localStorage.setItem("chosenOrders",JSON.stringify(this.chosenOrders))},cancelAllChosen(){this.chosenOrders=[],localStorage.removeItem("chosenOrders")},async createOrder(){let e=!1,s=0;const a=[],r={orders:[]};r.tableId=localStorage.getItem("tableId"),r.staffId=localStorage.getItem("staffId"),r.time=new Date().getTime(),r.subtotal=this.totalChosenOrdersPrice();const c=this.randomOrderId();r.serial=c,localStorage.getItem("userId")?r.user=localStorage.getItem("userId"):r.user=0,this.chosenOrders.forEach(t=>{for(let o=0;o<t.count;o++)r.orders.push(t.id)}),await l.get("http://localhost:3000/orderList").then(t=>{localStorage.setItem("orderId",t.data.length),t.data.forEach(o=>{o.tableId==localStorage.getItem("tableId")&&(e=!0,s=o.id,o.orders.forEach(d=>{a.push(d)}))})}),await this.addToKitchen(r),e?(r.orders.forEach(t=>{a.push(t)}),l.patch("http://localhost:3000/orderList/"+s,{orders:a}).then(t=>{this.cancelAllChosen(),document.getElementById("chosenOrdersCloseBtn").click()}).catch(t=>console.log(t.message))):(l.post("http://localhost:3000/orderList",r).then(t=>{this.cancelAllChosen(),document.getElementById("chosenOrdersCloseBtn").click(),alert("餐點已送出")}).catch(t=>{console.log(t.message)}),l.get("http://localhost:3000/tableState").then(t=>{let o;o=t.data.filter(d=>d.tableId==localStorage.getItem("tableId"))[0].id,l.patch("http://localhost:3000/tableState/"+o,{orderSerial:c}).catch(d=>console.log("建立或更新訂單 更新桌位資訊的訂單編號 patch 出錯"))}))},async addToKitchen(e){let s=!1,a=0;const r=[];if(await l.get("http://localhost:3000/kitchenOrders").then(c=>{c.data.forEach(t=>{t.tableId==localStorage.getItem("tableId")&&(s=!0,a=t.id,t.orders.forEach(o=>{r.push(o)}))})}),s)e.orders.forEach(c=>{r.push(c)}),l.patch("http://localhost:3000/kitchenOrders/"+a,{orders:r}).catch(c=>console.log(c.message));else{const c={tableId:e.tableId,orders:e.orders};l.post("http://localhost:3000/kitchenOrders",c).catch(t=>console.log(t.message))}},randomOrderId(){const e="AB1CD3EF2GH4IJ5KL6MN7OP8QR9ST0UVWXYZ";let s="";for(let a=0;a<10;a++){let r=Math.random()*36;s+=e.substring(r,r+1)}return s},getChosenOrders(){localStorage.getItem("chosenOrders")&&(this.chosenOrders=JSON.parse(localStorage.getItem("chosenOrders")))}}});export{i as c};
