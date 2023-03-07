import{d as i,e as d,S as n}from"./index-2e2bcad2.js";const m=i("cartStore",{state:()=>({tempProduct:{count:0,id:0,imgUrl:"",name:"",price:0},chosenOrders:[]}),actions:{getOrderItem(e){this.tempProduct.id=e.id,this.tempProduct.imgUrl=e.imgUrl,this.tempProduct.name=e.name,this.tempProduct.price=e.price},sentOrderItem(){this.tempProduct.count>0&&(localStorage.getItem("chosenOrders")&&(this.chosenOrders=JSON.parse(localStorage.getItem("chosenOrders")),localStorage.removeItem("chosenOrders")),this.chosenOrders.push(this.tempProduct),localStorage.setItem("chosenOrders",JSON.stringify(this.chosenOrders)),this.tempProduct={count:0,id:0,imgUrl:"",name:"",price:0}),document.getElementById("closeOrderItemModal").click()},getChonseOrders(){localStorage.getItem("chosenOrders")?this.chosenOrders=JSON.parse(localStorage.getItem("chosenOrders")):this.chosenOrders=[]},totalChosenOrdersCount(){let e=0;return this.chosenOrders.forEach(s=>{e+=s.count}),e},totalChosenOrdersPrice(){let e=0;return this.chosenOrders.forEach(s=>{e+=s.price*s.count}),e},cancelOrderItem(e){this.chosenOrders.splice(e,1),localStorage.setItem("chosenOrders",JSON.stringify(this.chosenOrders))},cancelAllChosen(){this.chosenOrders=[],localStorage.removeItem("chosenOrders")},async createOrder(){let e=!1,s=0;const c=[],t={orders:[]};t.tableId=localStorage.getItem("tableId"),t.staffId=localStorage.getItem("staffId"),t.time=new Date().getTime(),t.subtotal=this.totalChosenOrdersPrice();const a=this.randomOrderId();t.serial=a,localStorage.getItem("userId")?t.user=localStorage.getItem("userId"):t.user=0,this.chosenOrders.forEach(r=>{for(let o=0;o<r.count;o++)t.orders.push(r.id)}),await d.get("https://diriccardo-server.onrender.com/orderList").then(r=>{localStorage.setItem("orderId",r.data.length),r.data.forEach(o=>{o.tableId==localStorage.getItem("tableId")&&(e=!0,s=o.id,o.orders.forEach(l=>{c.push(l)}))})}),await this.addToKitchen(t),e?(t.orders.forEach(r=>{c.push(r)}),d.patch("https://diriccardo-server.onrender.com/orderList"+s,{orders:c}).then(r=>{this.cancelAllChosen(),document.getElementById("chosenOrdersCloseBtn").click(),n.fire({icon:"success",title:"餐點已送出",showConfirmButton:!1,timer:1500})}).catch(r=>alert(r.response.data.message))):(d.post("https://diriccardo-server.onrender.com/orderList",t).then(r=>{this.cancelAllChosen(),document.getElementById("chosenOrdersCloseBtn").click(),n.fire({icon:"success",title:"餐點已送出",showConfirmButton:!1,timer:1500})}).catch(r=>alert(r.response.data.message)),d.get("https://diriccardo-server.onrender.com/tableState").then(r=>{let o;o=r.data.filter(l=>l.tableId==localStorage.getItem("tableId"))[0].id,d.patch("https://diriccardo-server.onrender.com/tableState"+o,{orderSerial:a}).catch(l=>alert(l.response.data.message))}))},async addToKitchen(e){let s=!1,c=0;const t=[];if(await d.get("http://localhost:3000/kitchenOrders").then(a=>{a.data.forEach(r=>{r.tableId==localStorage.getItem("tableId")&&(s=!0,c=r.id,r.orders.forEach(o=>{t.push(o)}))})}),s)e.orders.forEach(a=>{t.push(a)}),d.patch("https://diriccardo-server.onrender.com/kitchenOrders"+c,{orders:t}).catch(a=>alert(a.response.data.message));else{const a={tableId:e.tableId,orders:e.orders};d.post("https://diriccardo-server.onrender.com/kitchenOrders",a).catch(r=>alert(r.response.data.message))}},randomOrderId(){const e="AB1CD3EF2GH4IJ5KL6MN7OP8QR9ST0UVWXYZ";let s="";for(let c=0;c<10;c++){let t=Math.random()*36;s+=e.substring(t,t+1)}return s},getChosenOrders(){localStorage.getItem("chosenOrders")&&(this.chosenOrders=JSON.parse(localStorage.getItem("chosenOrders")))}}});export{m as c};
