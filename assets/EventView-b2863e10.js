import{d as E,e as n,S as u,_ as k,f,m as I,r as w,o as a,c as r,b as B,a as e,F as p,g,j as O,t as h,h as C,l as S,p as L,k as T}from"./index-5b88e617.js";import{c as V}from"./cartStore-b2005387.js";const y=E("eventStore",{state:()=>({events:[],tempEvent:{},tempBr:{subTitle:[],detail:[]}}),actions:{getEvents(){n.get("https://diriccardo-server.onrender.com/event").then(s=>{this.events=s.data}).catch(s=>console.dir(s))},getEvent(s){this.tempEvent=s,this.tempBr.subTitle=this.tempEvent.subTitle.split(`
`),this.tempBr.detail=this.tempEvent.detail.split(`
`)},async addToOrder(){const{randomOrderId:s,addToKitchen:l}=V();let b=!1,v=0,_=0;const o={orders:[]};o.tableId=localStorage.getItem("tableId"),o.staffId=localStorage.getItem("staffId"),o.time=new Date,o.subtotal=this.tempEvent.price;const m=s();o.serial=m,o.user=0,o.orders.push(this.tempEvent.productNum),await l(o),await n.get("https://diriccardo-server.onrender.com/orderList").then(t=>{t.data.forEach(d=>{d.tableId==localStorage.getItem("tableId")?(b=!0,v=d.id,_=d.subtotal,d.orders.forEach(c=>{o.orders.push(c)})):localStorage.getItem("orderId")||localStorage.setItem("orderId",t.data.length)})}).catch(t=>console.dir(t)),b?n.patch("https://diriccardo-server.onrender.com/orderList/"+v,{orders:o.orders,subtotal:_+o.subtotal}).then(t=>{document.getElementById("checkOrderClose").click(),u.fire({icon:"success",title:"餐點已送出",showConfirmButton:!1,timer:1500})}).catch(t=>console.dir(t)):(n.post("https://diriccardo-server.onrender.com/orderList",o).then(t=>{document.getElementById("checkOrderClose").click(),u.fire({icon:"success",title:"餐點已送出",showConfirmButton:!1,timer:1500})}).catch(t=>console.dir(t)),n.get("https://diriccardo-server.onrender.com/tableState").then(t=>{let d;d=t.data.filter(c=>c.tableId==localStorage.getItem("tableId"))[0].id,n.patch("https://diriccardo-server.onrender.com/tableState/"+d,{orderSerial:m}).catch(c=>console.dir(c))}))}}}),M="/vue_diriccardo/assets/ordered-bg1-682d8135.png",N="/vue_diriccardo/assets/ordered-bg2-76e01605.png";const x={computed:{...f(y,["events","tempEvent","tempBr"]),...f(S,["isLoading"])},methods:{...I(y,["getEvents","getEvent","addToOrder"]),...I(S,["loading"])},mounted(){this.getEvents(),this.loading()}},i=s=>(L("data-v-ce16c080"),s=s(),T(),s),$={class:"event w-100 pt-4 overflow-hidden position-relative vh-100"},U=i(()=>e("img",{src:M,class:"eventBg_img1",alt:""},null,-1)),z=i(()=>e("img",{src:N,class:"eventBg_img2",alt:""},null,-1)),D={class:"bg-event noScrollbar p-4 border-top border-bottom border-white mt-20"},F={class:"container pt-4"},j={class:"row"},A=["onClick"],K=["src"],q={class:"modal fade",id:"eventModal",tabindex:"-1","aria-labelledby":"eventModallLabel","aria-hidden":"true"},G={class:"modal-dialog modal-lg modal-dialog-centered"},H={class:"modal-content position-relative"},J={class:"modal-body row"},P=i(()=>e("button",{type:"button",style:{"z-index":"20"},class:"btn-close position-absolute top-0 end-0 me-6 mt-3","data-bs-dismiss":"modal","aria-label":"Close"},null,-1)),Q={class:"col-4 p-3"},R=["src"],W={key:0,class:"btn btn-outline-dark btn-sm",style:{width:"233px"},type:"bottom","data-bs-toggle":"modal","data-bs-target":"#checkOrderModal"},X={class:"col-8 p-3"},Y={class:"h5 fw-bold mb-3"},Z={class:"border-start border-3 border-dark ms-1 mb-4 ps-2"},ee=i(()=>e("h3",{class:"h5 mb-3 fw-bolder"},"活動資訊",-1)),te={class:"border-start border-3 border-dark ms-1 mb-4 ps-2"},se={class:"modal fade","data-bs-backdrop":"static","data-bs-keyboard":"false",id:"checkOrderModal",tabindex:"-1","aria-labelledby":"checkOrderModalLabel","aria-hidden":"true"},oe={class:"modal-dialog modal-dialog-centered"},de={class:"modal-content"},ae={class:"modal-body text-center pt-10"},re={class:"text-danger"},le=i(()=>e("p",null,"確定點購嗎？",-1)),ne={class:"modal-footer"},ie=i(()=>e("button",{type:"button",class:"btn btn-outline-danger","data-bs-target":"#eventModal","data-bs-toggle":"modal",id:"checkOrderClose"},"取消",-1));function ce(s,l,b,v,_,o){const m=w("VueLoading");return a(),r(p,null,[B(m,{active:s.isLoading,"onUpdate:active":l[0]||(l[0]=t=>s.isLoading=t)},null,8,["active"]),e("div",$,[U,z,e("div",D,[e("div",F,[e("div",j,[(a(!0),r(p,null,g(s.events,t=>(a(),r("div",{class:"col-4",key:t.id},[e("div",{class:"w-100 overflow-hidden mb-5 rounded-2",style:{height:"450px"},"data-bs-toggle":"modal","data-bs-target":"#eventModal",onClick:()=>s.getEvent(t)},[e("img",{src:t.imgUrl,alt:"",class:"img-fluid"},null,8,K)],8,A)]))),128))])])])]),e("div",q,[e("div",G,[e("div",H,[e("div",J,[P,e("div",Q,[e("img",{src:s.tempEvent.imgUrl,alt:"",class:"img-fluid mb-3"},null,8,R),s.tempEvent.type=="productSell"?(a(),r("button",W," 我要點餐")):O("",!0)]),e("div",X,[e("h2",Y,h(s.tempEvent.title),1),e("div",Z,[(a(!0),r(p,null,g(s.tempBr.subTitle,t=>(a(),r("p",{key:t,class:"mb-0 h7"},h(t),1))),128))]),ee,e("div",te,[(a(!0),r(p,null,g(s.tempBr.detail,(t,d)=>(a(),r("p",{key:d,class:"mb-0",style:{"font-size":"14px","max-width":"450px"}},h(t),1))),128))])])])])])]),e("div",se,[e("div",oe,[e("div",de,[e("div",ae,[e("p",null,[C("即將點購 "),e("span",re,h(s.tempEvent.title),1)]),le]),e("div",ne,[ie,e("button",{type:"button",class:"btn btn-danger",onClick:l[1]||(l[1]=(...t)=>s.addToOrder&&s.addToOrder(...t))},"確定")])])])])],64)}const he=k(x,[["render",ce],["__scopeId","data-v-ce16c080"]]);export{he as default};
