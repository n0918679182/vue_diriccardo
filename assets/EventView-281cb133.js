import{d as y,e as i,S as g,_ as E,f as u,m as f,r as k,o as a,c as r,b as w,a as e,F as m,g as _,j as B,t as p,h as O,l as I,p as C,k as L}from"./index-a3f13676.js";import{c as T}from"./cartStore-c55616db.js";const S=y("eventStore",{state:()=>({events:[],tempEvent:{},tempBr:{subTitle:[],detail:[]}}),actions:{getEvents(){i.get("https://diriccardo-server.onrender.com/event").then(t=>{this.events=t.data}).catch(t=>console.dir(t))},getEvent(t){this.tempEvent=t,this.tempBr.subTitle=this.tempEvent.subTitle.split(`
`),this.tempBr.detail=this.tempEvent.detail.split(`
`)},async addToOrder(){const{randomOrderId:t}=T();let l=!1,h=0,b=0;const d={orders:[]};d.tableId=localStorage.getItem("tableId"),d.staffId=localStorage.getItem("staffId"),d.time=new Date,d.subtotal=this.tempEvent.price;const v=t();d.serial=v,d.user=0,d.orders.push(this.tempEvent.productNum),await i.get("https://diriccardo-server.onrender.com/orderList").then(o=>{o.data.forEach(s=>{s.tableId==localStorage.getItem("tableId")?(l=!0,h=s.id,b=s.subtotal,s.orders.forEach(n=>{d.orders.push(n)})):localStorage.getItem("orderId")||localStorage.setItem("orderId",o.data.length)})}).catch(o=>console.dir(o)),l?i.patch("https://diriccardo-server.onrender.com/orderList/"+h,{orders:d.orders,subtotal:b+d.subtotal}).then(o=>{document.getElementById("checkOrderClose").click(),g.fire({icon:"success",title:"餐點已送出",showConfirmButton:!1,timer:1500})}).catch(o=>console.dir(o)):(i.post("https://diriccardo-server.onrender.com/orderList",d).then(o=>{document.getElementById("checkOrderClose").click(),g.fire({icon:"success",title:"餐點已送出",showConfirmButton:!1,timer:1500})}).catch(o=>console.dir(o)),i.get("https://diriccardo-server.onrender.com/tableState").then(o=>{let s;s=o.data.filter(n=>n.tableId==localStorage.getItem("tableId"))[0].id,i.patch("https://diriccardo-server.onrender.com/tableState/"+s,{orderSerial:v}).catch(n=>console.dir(n))}))}}}),V="/vue_diriccardo/assets/ordered-bg1-682d8135.png",M="/vue_diriccardo/assets/ordered-bg2-76e01605.png";const N={computed:{...u(S,["events","tempEvent","tempBr"]),...u(I,["isLoading"])},methods:{...f(S,["getEvents","getEvent","addToOrder"]),...f(I,["loading"])},mounted(){this.getEvents(),this.loading()}},c=t=>(C("data-v-ce16c080"),t=t(),L(),t),x={class:"event w-100 pt-4 overflow-hidden position-relative vh-100"},$=c(()=>e("img",{src:V,class:"eventBg_img1",alt:""},null,-1)),U=c(()=>e("img",{src:M,class:"eventBg_img2",alt:""},null,-1)),z={class:"bg-event noScrollbar p-4 border-top border-bottom border-white mt-20"},D={class:"container pt-4"},F={class:"row"},j=["onClick"],A=["src"],q={class:"modal fade",id:"eventModal",tabindex:"-1","aria-labelledby":"eventModallLabel","aria-hidden":"true"},G={class:"modal-dialog modal-lg modal-dialog-centered"},H={class:"modal-content position-relative"},J={class:"modal-body row"},K=c(()=>e("button",{type:"button",style:{"z-index":"20"},class:"btn-close position-absolute top-0 end-0 me-6 mt-3","data-bs-dismiss":"modal","aria-label":"Close"},null,-1)),P={class:"col-4 p-3"},Q=["src"],R={key:0,class:"btn btn-outline-dark btn-sm",style:{width:"233px"},type:"bottom","data-bs-toggle":"modal","data-bs-target":"#checkOrderModal"},W={class:"col-8 p-3"},X={class:"h5 fw-bold mb-3"},Y={class:"border-start border-3 border-dark ms-1 mb-4 ps-2"},Z=c(()=>e("h3",{class:"h5 mb-3 fw-bolder"},"活動資訊",-1)),ee={class:"border-start border-3 border-dark ms-1 mb-4 ps-2"},te={class:"modal fade","data-bs-backdrop":"static","data-bs-keyboard":"false",id:"checkOrderModal",tabindex:"-1","aria-labelledby":"checkOrderModalLabel","aria-hidden":"true"},se={class:"modal-dialog modal-dialog-centered"},oe={class:"modal-content"},de={class:"modal-body text-center pt-10"},ae={class:"text-danger"},re=c(()=>e("p",null,"確定點購嗎？",-1)),le={class:"modal-footer"},ne=c(()=>e("button",{type:"button",class:"btn btn-outline-danger","data-bs-target":"#eventModal","data-bs-toggle":"modal",id:"checkOrderClose"},"取消",-1));function ie(t,l,h,b,d,v){const o=k("VueLoading");return a(),r(m,null,[w(o,{active:t.isLoading,"onUpdate:active":l[0]||(l[0]=s=>t.isLoading=s)},null,8,["active"]),e("div",x,[$,U,e("div",z,[e("div",D,[e("div",F,[(a(!0),r(m,null,_(t.events,s=>(a(),r("div",{class:"col-4",key:s.id},[e("div",{class:"w-100 overflow-hidden mb-5 rounded-2",style:{height:"450px"},"data-bs-toggle":"modal","data-bs-target":"#eventModal",onClick:()=>t.getEvent(s)},[e("img",{src:s.imgUrl,alt:"",class:"img-fluid"},null,8,A)],8,j)]))),128))])])])]),e("div",q,[e("div",G,[e("div",H,[e("div",J,[K,e("div",P,[e("img",{src:t.tempEvent.imgUrl,alt:"",class:"img-fluid mb-3"},null,8,Q),t.tempEvent.type=="productSell"?(a(),r("button",R," 我要點餐")):B("",!0)]),e("div",W,[e("h2",X,p(t.tempEvent.title),1),e("div",Y,[(a(!0),r(m,null,_(t.tempBr.subTitle,s=>(a(),r("p",{key:s,class:"mb-0 h7"},p(s),1))),128))]),Z,e("div",ee,[(a(!0),r(m,null,_(t.tempBr.detail,(s,n)=>(a(),r("p",{key:n,class:"mb-0",style:{"font-size":"14px","max-width":"450px"}},p(s),1))),128))])])])])])]),e("div",te,[e("div",se,[e("div",oe,[e("div",de,[e("p",null,[O("即將點購 "),e("span",ae,p(t.tempEvent.title),1)]),re]),e("div",le,[ne,e("button",{type:"button",class:"btn btn-danger",onClick:l[1]||(l[1]=(...s)=>t.addToOrder&&t.addToOrder(...s))},"確定")])])])])],64)}const pe=E(N,[["render",ie],["__scopeId","data-v-ce16c080"]]);export{pe as default};
