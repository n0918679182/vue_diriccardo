import{d as x,e as I,m as u,f as p,_ as C,o as a,c as r,a as t,F as l,g as b,t as c,h as _,r as g,b as v,l as y,n as f,i as P}from"./index-a72cdf0a.js";import{c as h}from"./cartStore-f0ce7bdf.js";const $=x("productStore",{state:()=>({products:[],menuItem:[]}),actions:{async getProducts(){this.products=[],this.menuItem=[],await I.get("http://localhost:3000/products").then(e=>{this.products=e.data;const o=new Set;e.data.filter(n=>o.has(n.type)?!1:o.add(n.type)).forEach(n=>{this.menuItem.push({type:n.type,chi:n.type=="contorni"?"佐酒小點":n.type=="zuppa"?"湯":n.type=="insalata"?"沙拉":n.type=="antipasto"?"開胃菜":n.type=="specialita"?"主廚特選":n.type=="carne"?"多人分享主餐":n.type=="pasta"?"義大利麵、燉飯":n.type=="pizza"?"拿坡里披薩":n.type=="dolce"?"甜點":"雞尾酒與啤酒"})})}).catch(e=>{alert(e.response.data.message)})}}}),S={methods:{...u(h,["totalChosenOrdersCount","totalChosenOrdersPrice","cancelOrderItem","cancelAllChosen","createOrder","addToKitchen","getChosenOrders"])},computed:{...p(h,["chosenOrders"])},mounted(){this.getChosenOrders()}},B={class:"offcanvas offcanvas-start",tabindex:"-1",id:"chosenOrders","aria-labelledby":"chosenOrdersLabel"},L=t("div",{class:"offcanvas-header border-bottom"},[t("h5",{class:"offcanvas-title",id:"chosenOrdersLabel"},"已選餐點"),t("button",{type:"button",class:"btn-close text-reset","data-bs-dismiss":"offcanvas","aria-label":"Close",id:"chosenOrdersCloseBtn"})],-1),V={key:0,class:"offcanvas-body d-flex align-items-center justify-content-center"},j=t("p",{class:"h4 text-secondary"},"尚未選取餐點",-1),z=[j],A={key:1,class:"offcanvas-body justify-content-between d-flex flex-column"},M={class:"border rounded-2 p-2 mb-3 maxh500"},T={class:"mb-0 col-6 d-flex align-items-center"},N={class:"mb-0 col-3 d-flex align-items-center"},E={class:"mb-0 col-2 d-flex align-items-center"},F=["onClick"],U={class:"col-12 border d-flex mt-2"},D=["onClick"],K=["onClick"],q={class:"border rounded-2 p-2 d-flex flex-column"},G={class:"d-flex justify-content-between align-items-end mb-3"},H={class:"d-flex align-items-end"},J={class:"mb-0 ms-2 h6"},Q={class:"mb-0 ms-3 h6"},R={class:"text-success"},W=t("i",{class:"bx bx-trash me-2"},null,-1);function X(e,o,n,O,w,k){return a(),r("div",B,[L,e.chosenOrders.length==0?(a(),r("div",V,z)):(a(),r("div",A,[t("div",M,[(a(!0),r(l,null,b(e.chosenOrders,(d,m)=>(a(),r("div",{class:"py-1 row",key:m},[t("p",T,c(d.name),1),t("p",N,"$ "+c(d.price),1),t("p",E,"x "+c(d.count),1),t("i",{class:"m-0 col-1 bx bx-x text-danger d-flex justify-content-end align-items-center h3",role:"button",onClick:s=>e.cancelOrderItem(m)},null,8,F),t("div",U,[t("div",{class:"py-1 px-5 changeOrderCountBtn w-50 text-center border-end",role:"button",onClick:s=>d.count<2?0:d.count-=1},"-",8,D),t("div",{class:"py-1 px-5 changeOrderCountBtn w-50 text-center",role:"button",onClick:s=>d.count+=1}," +",8,K)])]))),128))]),t("div",q,[t("div",G,[t("div",H,[t("p",J,"共 "+c(e.totalChosenOrdersCount())+" 項",1),t("p",Q,[_("$ "),t("span",R,c(e.totalChosenOrdersPrice()),1)])]),t("button",{type:"button",class:"btn btn-outline-danger btn-sm d-flex align-items-center",onClick:o[0]||(o[0]=(...d)=>e.cancelAllChosen&&e.cancelAllChosen(...d))},[W,_("清空")])]),t("div",{class:"btn btn-danger w-100",onClick:o[1]||(o[1]=(...d)=>e.createOrder&&e.createOrder(...d))},"送出餐點")])]))])}const Y=C(S,[["render",X]]),Z="/vue_diriccardo/assets/product-bg1-4903a4f4.png",tt="/vue_diriccardo/assets/product-bg2-3e4d4bbd.png";const et={methods:{...u($,["getProducts"]),...u(h,["getOrderItem","sentOrderItem","getChonseOrders"]),...u(y,["loading"])},computed:{...p($,["menuItem","products"]),...p(h,["tempProduct","chosenOrders"]),...p(y,["isLoading"])},components:{SelectedProducts:Y},mounted(){this.getProducts(),this.loading()}},st={class:"order w-100 pt-4 overflow-hidden position-relative vh-100"},ot=t("img",{src:Z,class:"orderBg_img1",alt:""},null,-1),nt=t("img",{src:tt,class:"orderBg_img2",alt:""},null,-1),dt={class:"container mt-20"},at={class:"row mt-5 pt-4"},rt={class:"col-2"},ct={class:"border border-white rounded-1 list-unstyled bg-order-sidemenu bg-shadow",id:"myTab",role:"tablist"},it=["data-bs-target","aria-controls"],lt={class:"col-10"},mt={class:"tab-content border border-white rounded-1 bg-order-content bg-shadow pt-4 px-4",id:"myTabContent"},ut=["id"],pt={class:"row"},bt=["onClick"],ht={class:"position-absolute top-0 end-0 me-2 mt-1 bg-white order-item-price"},_t={class:"m-0"},gt={class:"p-2 w-100 order-item-title"},vt={class:"mb-0"},yt={class:"col-12"},ft={class:"modal fade",id:"orderItemModal",tabindex:"-1","aria-labelledby":"orderItemModalLabel","aria-hidden":"true","data-bs-backdrop":"static","data-bs-keyboard":"false"},$t={class:"modal-dialog modal-dialog-centered modal-sm"},Ct={class:"modal-content"},Ot={class:"modal-header"},wt={class:"modal-title h6"},kt={class:"modal-body p-0 d-flex justify-content-between"},xt={class:"p-3"},It={class:"modal-footer py-1"};function Pt(e,o,n,O,w,k){const d=g("VueLoading"),m=g("SelectedProducts");return a(),r(l,null,[v(d,{active:e.isLoading,"onUpdate:active":o[0]||(o[0]=s=>e.isLoading=s)},null,8,["active"]),t("div",st,[ot,nt,t("div",dt,[t("div",at,[t("div",rt,[t("ul",ct,[(a(!0),r(l,null,b(e.menuItem,s=>(a(),r("li",{class:"nav-item w-100 text-center d-flex",role:"presentation",key:s.type},[t("a",{class:f(["text-white w-100 mt-auto mb-auto",{active:s.type=="contorni"}]),id:"home-tab","data-bs-toggle":"tab","data-bs-target":"#"+s.type,type:"button",role:"tab","aria-controls":s.type,"aria-selected":"true"},c(s.chi),11,it)]))),128))])]),t("div",lt,[t("div",mt,[(a(!0),r(l,null,b(e.menuItem,s=>(a(),r("div",{class:f(["tab-pane fade",{show:s.type=="contorni",active:s.type=="contorni"}]),id:s.type,role:"tabpanel","aria-labelledby":"home-tab",key:s.type},[t("div",pt,[(a(!0),r(l,null,b(e.products.filter(i=>i.type==s.type),i=>(a(),r("div",{class:"col-3 mb-5",key:i.id,"data-bs-toggle":"modal","data-bs-target":"#orderItemModal",onClick:St=>e.getOrderItem(i),role:"button"},[t("div",{class:"bg-img-set rounded-2 bg-shadow d-flex align-items-end position-relative",style:P([{height:"190px"},{backgroundImage:"url("+i.imgUrl+")"}])},[t("div",ht,[t("p",_t,"$ "+c(i.price),1)]),t("div",gt,[t("p",vt,c(i.name),1)])],4)],8,bt))),128))])],10,ut))),128))])]),t("div",yt,[t("button",{type:"button",class:"btn btn-dark w-100 border border-white bg-shadow","data-bs-toggle":"offcanvas","data-bs-target":"#chosenOrders","aria-controls":"chosenOrders",onClick:o[1]||(o[1]=(...s)=>e.getChonseOrders&&e.getChonseOrders(...s))},"確認已選餐點")])])])]),t("div",ft,[t("div",$t,[t("div",Ct,[t("div",Ot,[t("h5",wt,c(e.tempProduct.name),1)]),t("div",kt,[t("div",{class:"py-3 px-5 changeOrderCountBtn",onClick:o[2]||(o[2]=s=>e.tempProduct.count<1?0:e.tempProduct.count-=1),role:"button"}," -"),t("div",xt,c(e.tempProduct.count),1),t("div",{class:"py-3 px-5 changeOrderCountBtn",onClick:o[3]||(o[3]=s=>e.tempProduct.count+=1),role:"button"},"+")]),t("div",It,[t("button",{type:"button",class:"btn btn-outline-danger btn-sm","data-bs-dismiss":"modal",id:"closeOrderItemModal",onClick:o[4]||(o[4]=s=>e.tempProduct.count=0)},"取消"),t("button",{type:"button",class:"btn btn-danger btn-sm",onClick:o[5]||(o[5]=(...s)=>e.sentOrderItem&&e.sentOrderItem(...s))},"確定")])])])]),v(m)],64)}const Vt=C(et,[["render",Pt]]);export{Vt as default};
