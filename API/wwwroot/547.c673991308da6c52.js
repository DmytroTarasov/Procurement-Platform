"use strict";(self.webpackChunkclient=self.webpackChunkclient||[]).push([[547],{9547:(qt,f,i)=>{i.r(f),i.d(f,{OrdersModule:()=>Pt});var p=i(6895),b=i(4466),x=i(8252),t=i(4650),a=i(9653),C=i(5061),d=i(9848),m=i(1666),h=i(1572),w=i(7392),A=i(4333),g=i(9884),l=i(6460),D=i(3724),c=i(1975),y=i(6742);const I=function(){return["border","border-[#E74C3C]","h-[45px]","w-[155px]"]},F=function(){return["bg-transparent","text-[#E74C3C]"]};function S(o,r){if(1&o){const e=t.EpF();t.TgZ(0,"div")(1,"app-button",13),t.NdJ("click",function(){t.CHM(e);const n=t.oxw(2);return t.KtG(n.cancelOrder())}),t.qZA()()}2&o&&(t.xp6(1),t.Q6J("classList",t.DdM(2,I))("colors",t.DdM(3,F)))}const P=function(){return["h-[45px]","w-[155px]"]};function E(o,r){if(1&o){const e=t.EpF();t.TgZ(0,"div",9)(1,"div",10)(2,"app-button",11),t.NdJ("click",function(){t.CHM(e);const n=t.oxw();return t.KtG(n.openOrderDetails())}),t.qZA(),t.YNc(3,S,2,4,"div",12),t.qZA()()}if(2&o){const e=r.ngIf,s=t.oxw();t.xp6(1),t.Q6J("ngClass",e.id===s.order.buyerContactPerson.id&&s.OrderStatuses[s.order.status]===s.OrderStatuses.Active&&e.role===s.Roles.Customer?"sm:grid-cols-2":"sm:grid-cols-1"),t.xp6(1),t.Q6J("classList",t.DdM(3,P)),t.xp6(1),t.Q6J("ngIf",e.id===s.order.buyerContactPerson.id&&s.OrderStatuses[s.order.status]===s.OrderStatuses.Active&&e.role===s.Roles.Customer)}}const q=function(o){return["mt-2","md:hidden",o]},N=function(o){return["hidden","md:inline-block","h-fit","text-center","md:absolute","md:right-6","md:top-6","xl:static",o]};let J=(()=>{class o{constructor(e){this.store=e,this.OrderStatuses=l.pf,this.StatusesColors=l.p9,this.Roles=c.G}ngOnInit(){this.user$=this.store.pipe((0,a.Ys)(g.dy))}cancelOrder(){this.store.dispatch(d.sl({id:this.order.id}))}openOrderDetails(){this.store.dispatch(D.k({orderId:this.order.id}))}}return o.\u0275fac=function(e){return new(e||o)(t.Y36(a.yh))},o.\u0275cmp=t.Xpm({type:o,selectors:[["app-orders-list-item"]],inputs:{order:"order"},decls:21,vars:20,consts:[[1,"my-4","relative","w-full","bg-white","rounded-xl","shadow-gray-400","p-6"],[1,"xl:grid","xl:grid-cols-[50%_15%_1fr]","xl:gap-x-4","mb-8"],[1,"font-semibold","text-xl","text-[#2FCB80]"],[3,"ngClass"],[1,"mt-3","underline"],[1,"mt-3"],[1,"xl:grid","xl:grid-flow-row","xl:grid-rows-[auto_1fr]","xl:gap-y-3"],[1,"absolute","right-6","bottom-6","xl:static","text-right","italic","text-[#A9A9A9]","text-sm"],["class","mt-5 xl:mt-0 grid justify-center items-center",4,"ngIf"],[1,"mt-5","xl:mt-0","grid","justify-center","items-center"],[1,"grid","gap-y-2","sm:gap-x-4","xl:grid-cols-1","xl:gap-x-0","justify-center",3,"ngClass"],["text","\u0414\u0435\u0442\u0430\u043b\u0456","type","button",3,"classList","click"],[4,"ngIf"],["text","\u0421\u043a\u0430\u0441\u0443\u0432\u0430\u0442\u0438","type","button",3,"classList","colors","click"]],template:function(e,s){1&e&&(t.TgZ(0,"div",0)(1,"div",1)(2,"div")(3,"h3",2),t._uU(4),t.qZA(),t.TgZ(5,"p",3),t._uU(6),t.qZA(),t.TgZ(7,"p",4),t._uU(8),t.qZA(),t.TgZ(9,"p",5),t._uU(10),t.qZA(),t.TgZ(11,"p",5),t._uU(12),t.qZA()(),t.TgZ(13,"span",3),t._uU(14),t.qZA(),t.TgZ(15,"div",6)(16,"p",7),t._uU(17),t.ALo(18,"date"),t.qZA(),t.YNc(19,E,4,4,"div",8),t.ALo(20,"async"),t.qZA()()()),2&e&&(t.xp6(4),t.Oqu(s.order.title),t.xp6(1),t.Q6J("ngClass",t.VKq(16,q,s.StatusesColors[s.order.status])),t.xp6(1),t.Oqu(s.OrderStatuses[s.order.status]),t.xp6(2),t.hij("\u041d\u043e\u043c\u0435\u0440: ",s.order.id,""),t.xp6(2),t.Oqu(s.order.buyerContactPerson.companyTitle),t.xp6(2),t.hij("\u0411\u044e\u0434\u0436\u0435\u0442: ",s.order.budget," (\u0433\u0440\u043d.)"),t.xp6(1),t.Q6J("ngClass",t.VKq(18,N,s.StatusesColors[s.order.status])),t.xp6(1),t.Oqu(s.OrderStatuses[s.order.status]),t.xp6(3),t.hij(" \u0421\u0442\u0432\u043e\u0440\u0435\u043d\u0435 ",t.Dn7(18,10,s.order.createdAt,"HH:mm:ss dd MMMM y","uk-UA")," "),t.xp6(2),t.Q6J("ngIf",t.lcZ(20,14,s.user$)))},dependencies:[y.r,p.mk,p.O5,p.Ov,p.uU]}),o})();function U(o,r){1&o&&(t.TgZ(0,"div",6)(1,"mat-icon"),t._uU(2,"content_paste_search"),t.qZA(),t.TgZ(3,"span",7),t._uU(4,"\u0417\u0430\u043c\u043e\u0432\u043b\u0435\u043d\u044c \u043d\u0435\u043c\u0430\u0454"),t.qZA()())}function Q(o,r){if(1&o&&(t.TgZ(0,"div",4),t.YNc(1,U,5,0,"div",5),t.qZA()),2&o){const e=t.oxw();t.xp6(1),t.Q6J("ngIf",0===e.orders.length)}}function Y(o,r){1&o&&t._UZ(0,"app-orders-list-item",12),2&o&&t.Q6J("order",r.$implicit)}const L=function(o,r,e){return{id:"orders",itemsPerPage:o,currentPage:r,totalItems:e}};function j(o,r){if(1&o){const e=t.EpF();t.TgZ(0,"div",8),t.YNc(1,Y,1,1,"app-orders-list-item",9),t.ALo(2,"paginate"),t.TgZ(3,"div",10)(4,"pagination-controls",11),t.NdJ("pageChange",function(n){t.CHM(e);const u=t.oxw();return t.KtG(u.pageChanged(n))}),t.qZA()()()}if(2&o){const e=t.oxw();t.xp6(1),t.Q6J("ngForOf",t.xi3(2,1,e.orders,t.kEZ(4,L,e.pagination.itemsPerPage,e.pagination.currentPage,e.pagination.totalItems)))}}function M(o,r){1&o&&(t.TgZ(0,"div",13),t._UZ(1,"mat-spinner",14),t.qZA())}let $=(()=>{class o{constructor(e){this.store=e,this.orders=null}ngOnInit(){this.store.dispatch(d.AU({})),this.ordersSubscription=this.store.pipe((0,a.Ys)(m.ny)).subscribe(e=>{this.orders=e}),this.loading$=this.store.pipe((0,a.Ys)(C.N)),this.paginationSubscription=this.store.pipe((0,a.Ys)(m.B$)).subscribe(e=>{this.pagination=e})}pageChanged(e){this.pagination.currentPage!=e&&this.store.dispatch(d.AU({pageNumber:e}))}ngOnDestroy(){this.paginationSubscription&&this.paginationSubscription.unsubscribe(),this.ordersSubscription&&this.ordersSubscription.unsubscribe()}}return o.\u0275fac=function(e){return new(e||o)(t.Y36(a.yh))},o.\u0275cmp=t.Xpm({type:o,selectors:[["app-orders-list"]],decls:6,vars:7,consts:[[1,"h-full","w-full","flex","justify-center","relative"],["class","mt-3 sm:mt-0 flex flex-col justify-center items-center",4,"ngIf"],["class","w-full",4,"ngIf"],["class","fixed inset-x-[42%] sm:inset-x-[60%] inset-y-[45%]",4,"ngIf"],[1,"mt-3","sm:mt-0","flex","flex-col","justify-center","items-center"],["class","flex flex-col items-center",4,"ngIf"],[1,"flex","flex-col","items-center"],[1,"mt-3","text-[#898E96]","font-semibold"],[1,"w-full"],[3,"order",4,"ngFor","ngForOf"],[1,"flex","justify-center"],["id","orders","previousLabel","\u041f\u043e\u043f\u0435\u0440\u0435\u0434\u043d\u044f","nextLabel","\u041d\u0430\u0441\u0442\u0443\u043f\u043d\u0430",1,"order-pagination",3,"pageChange"],[3,"order"],[1,"fixed","inset-x-[42%]","sm:inset-x-[60%]","inset-y-[45%]"],["diameter","70"]],template:function(e,s){1&e&&(t.TgZ(0,"div",0),t.YNc(1,Q,2,1,"div",1),t.ALo(2,"async"),t.YNc(3,j,5,8,"div",2),t.YNc(4,M,2,0,"div",3),t.ALo(5,"async"),t.qZA()),2&e&&(t.xp6(1),t.Q6J("ngIf",!t.lcZ(2,3,s.loading$)&&s.orders),t.xp6(2),t.Q6J("ngIf",s.pagination&&(null==s.orders?null:s.orders.length)>0&&s.orders),t.xp6(1),t.Q6J("ngIf",t.lcZ(5,5,s.loading$)||!s.orders))},dependencies:[p.sg,p.O5,h.Ou,w.Hw,A.LS,J,p.Ov,A._s],styles:[".mat-icon[_ngcontent-%COMP%]{scale:2;color:#898e96!important}  .ngx-pagination .current{background-color:#5fcff7!important;border-radius:4px}@media (max-width: 639px){  .pagination-previous,   .pagination-next{display:none!important}}"]}),o})();var v=i(4006),B=i(3986),G=i(843);function k(o,r){if(1&o){const e=t.EpF();t.TgZ(0,"app-checkbox",4),t.NdJ("onChange",function(n){t.CHM(e);const u=t.oxw(2);return t.KtG(u.onChange(n))}),t.qZA()}}function H(o,r){if(1&o&&(t.TgZ(0,"div"),t.YNc(1,k,1,0,"app-checkbox",3),t.qZA()),2&o){const e=r.ngIf,s=t.oxw();t.xp6(1),t.Q6J("ngIf",e.role===s.Roles.Applicant||e.role===s.Roles.Customer)}}const K=function(){return["value"]};let R=(()=>{class o{constructor(e){this.store=e,this.orderStatuses=[{key:"",value:"\u0412\u0441\u0456"},...Object.keys(l.pf).map(s=>{const n=l.pf[s].split(" ");return n[0]=n[0].replace(/\u0435$/,"\u0456"),{key:s,value:n.join(" ")}})],this.Roles=c.G}ngOnInit(){this.actionsForm=new v.cw({status:new v.NI("")}),this.user$=this.store.pipe((0,a.Ys)(g.dy)),this.paramsSubscription=this.store.pipe((0,a.Ys)(m.VL)).subscribe(e=>{this.orderParams=e})}getFormControl(e){return this.actionsForm.get(e)}setOrderParamsStatus(e){this.store.dispatch(d.G$({orderParams:{...this.orderParams,status:e}}))}ngOnDestroy(){this.paramsSubscription&&this.paramsSubscription.unsubscribe()}onChange(e){this.store.dispatch(d.G$({orderParams:{...this.orderParams,companyOrders:e}}))}}return o.\u0275fac=function(e){return new(e||o)(t.Y36(a.yh))},o.\u0275cmp=t.Xpm({type:o,selectors:[["app-orders-actions"]],decls:4,vars:10,consts:[[1,"mt-0","sm:mt-2"],["label","\u0421\u0442\u0430\u0442\u0443\u0441",3,"control","displayProps","items","optionValueProp","required","emitSelectionChangeEvent","onSelectionChange"],[4,"ngIf"],["label","\u0417\u0430\u043c\u043e\u0432\u043b\u0435\u043d\u043d\u044f \u0432\u043b\u0430\u0441\u043d\u043e\u0457 \u043a\u043e\u043c\u043f\u0430\u043d\u0456\u0457",3,"onChange",4,"ngIf"],["label","\u0417\u0430\u043c\u043e\u0432\u043b\u0435\u043d\u043d\u044f \u0432\u043b\u0430\u0441\u043d\u043e\u0457 \u043a\u043e\u043c\u043f\u0430\u043d\u0456\u0457",3,"onChange"]],template:function(e,s){1&e&&(t.TgZ(0,"div",0)(1,"app-dropdown",1),t.NdJ("onSelectionChange",function(u){return s.setOrderParamsStatus(u)}),t.qZA(),t.YNc(2,H,2,1,"div",2),t.ALo(3,"async"),t.qZA()),2&e&&(t.xp6(1),t.Q6J("control",s.getFormControl("status"))("displayProps",t.DdM(9,K))("items",s.orderStatuses)("optionValueProp","key")("required",!1)("emitSelectionChangeEvent",!0),t.xp6(1),t.Q6J("ngIf",t.lcZ(3,7,s.user$)))},dependencies:[B.J,G.b,p.O5,p.Ov]}),o})(),V=(()=>{class o{}return o.\u0275fac=function(e){return new(e||o)},o.\u0275cmp=t.Xpm({type:o,selectors:[["app-orders-container"]],decls:6,vars:0,consts:[[1,"w-[90%]","xl:w-4/5","mx-auto","grid","grid-rows-[45px_1fr]","gap-y-4","py-6","sm:py-10"],[1,"text-2xl","font-medium","justify-self-start"],[1,"grid","grid-cols-1","sm:grid-cols-[28%_1fr]","gap-x-8"]],template:function(e,s){1&e&&(t.TgZ(0,"div",0)(1,"h1",1),t._uU(2,"\u0417\u0430\u043c\u043e\u0432\u043b\u0435\u043d\u043d\u044f"),t.qZA(),t.TgZ(3,"div",2),t._UZ(4,"app-orders-actions")(5,"app-orders-list"),t.qZA()())},dependencies:[$,R]}),o})();var X=i(527),z=i(2553),_=i(5890);const W=function(o){return["xl:hidden",o]};function tt(o,r){if(1&o&&(t.TgZ(0,"p",5),t._uU(1),t.qZA()),2&o){const e=t.oxw();t.Q6J("ngClass",t.VKq(2,W,e.proposalStatusColor)),t.xp6(1),t.Oqu(e.proposalStatus)}}function et(o,r){if(1&o&&(t.TgZ(0,"p"),t._uU(1),t.qZA()),2&o){const e=t.oxw();t.xp6(1),t.hij("\u0410\u0434\u0440\u0435\u0441\u0430: ",e.tranformCompanyAddress(e.person.companyAddress),"")}}function ot(o,r){if(1&o&&(t.TgZ(0,"p"),t._uU(1),t.qZA()),2&o){const e=t.oxw();t.xp6(1),t.hij("\u0410\u0434\u0440\u0435\u0441\u0430 \u0432\u0456\u0434\u0432\u0430\u043d\u0442\u0430\u0436\u0435\u043d\u043d\u044f: ",e.tranformCompanyAddress(e.shipmentAddress),"")}}function st(o,r){if(1&o&&(t.TgZ(0,"p",6),t._uU(1),t.qZA()),2&o){const e=t.oxw();t.xp6(1),t.Oqu(e.additionalInfo)}}function rt(o,r){if(1&o&&(t.TgZ(0,"p"),t._uU(1),t.qZA()),2&o){const e=t.oxw();t.xp6(1),t.hij("\u0426\u0456\u043d\u0430: ",e.price," (\u0433\u0440\u043d.)")}}const nt=["*"];let ut=(()=>{class o{constructor(){this.showCompanyAddress=!1}}return o.\u0275fac=function(e){return new(e||o)},o.\u0275cmp=t.Xpm({type:o,selectors:[["app-order-info"]],inputs:{person:"person",shipmentAddress:"shipmentAddress",additionalInfo:"additionalInfo",price:"price",proposalStatus:"proposalStatus",proposalStatusColor:"proposalStatusColor",showCompanyAddress:"showCompanyAddress",tranformCompanyAddress:"tranformCompanyAddress",getFullName:"getFullName"},ngContentSelectors:nt,decls:17,vars:9,consts:[[1,"flex","flex-col","justify-center","gap-y-2"],[3,"ngClass",4,"ngIf"],[4,"ngIf"],["class","italic text-[#A9A9A9]",4,"ngIf"],[1,"font-semibold","text-[#2FCB80]"],[3,"ngClass"],[1,"italic","text-[#A9A9A9]"]],template:function(e,s){1&e&&(t.F$t(),t.TgZ(0,"div",0),t.Hsn(1),t.YNc(2,tt,2,4,"p",1),t.TgZ(3,"p"),t._uU(4),t.qZA(),t.TgZ(5,"p"),t._uU(6),t.qZA(),t.YNc(7,et,2,1,"p",2),t.YNc(8,ot,2,1,"p",2),t.YNc(9,st,2,1,"p",3),t.YNc(10,rt,2,1,"p",2),t.TgZ(11,"p",4),t._uU(12,"\u041a\u043e\u043d\u0442\u0430\u043a\u0442\u043d\u0430 \u043e\u0441\u043e\u0431\u0430"),t.qZA(),t.TgZ(13,"p"),t._uU(14),t.qZA(),t.TgZ(15,"p"),t._uU(16),t.qZA()()),2&e&&(t.xp6(2),t.Q6J("ngIf",s.proposalStatus&&s.proposalStatusColor),t.xp6(2),t.Oqu(s.person.companyTitle),t.xp6(2),t.hij("\u041a\u043e\u0434 \u0404\u0414\u0420\u041f\u041e\u0423: ",s.person.companyEdrpou,""),t.xp6(1),t.Q6J("ngIf",s.showCompanyAddress),t.xp6(1),t.Q6J("ngIf",s.shipmentAddress),t.xp6(1),t.Q6J("ngIf",s.additionalInfo),t.xp6(1),t.Q6J("ngIf",s.price),t.xp6(4),t.hij("\u041f\u0406\u0411: ",s.getFullName(s.person),""),t.xp6(2),t.hij("\u041f\u043e\u0448\u0442\u0430: ",s.person.email,""))},dependencies:[p.mk,p.O5]}),o})();function it(o,r){if(1&o&&(t.TgZ(0,"p"),t._uU(1),t.qZA()),2&o){const e=t.oxw(2).ngIf;t.xp6(1),t.hij("\u0426\u0456\u043d\u0430 \u0432\u0456\u0434 \u043f\u0435\u0440\u0435\u0432\u0456\u0437\u043d\u0438\u043a\u0430: ",e.transporterSum," (\u0433\u0440\u043d.)")}}function pt(o,r){if(1&o&&(t.TgZ(0,"p"),t._uU(1),t.qZA()),2&o){const e=t.oxw(2).ngIf;t.xp6(1),t.hij("\u0421\u0443\u043c\u0430: ",e.supplierPrice+e.transporterSum," (\u0433\u0440\u043d.)")}}function at(o,r){if(1&o&&(t.TgZ(0,"div",7)(1,"p"),t._uU(2),t.qZA(),t.YNc(3,it,2,1,"p",17),t.YNc(4,pt,2,1,"p",17),t.qZA()),2&o){const e=t.oxw().ngIf,s=t.oxw();t.xp6(2),t.hij("\u0426\u0456\u043d\u0430 \u0432\u0456\u0434 \u043f\u043e\u0441\u0442\u0430\u0447\u0430\u043b\u044c\u043d\u0438\u043a\u0430: ",e.supplierPrice," (\u0433\u0440\u043d.)"),t.xp6(1),t.Q6J("ngIf",s.isCategoryTypeGoods(e)),t.xp6(1),t.Q6J("ngIf",s.isCategoryTypeGoods(e))}}function lt(o,r){if(1&o&&(t.TgZ(0,"div",7)(1,"p",9),t._uU(2,"\u0410\u0434\u0440\u0435\u0441\u0430 \u0432\u0456\u0434\u0432\u0430\u043d\u0442\u0430\u0436\u0435\u043d\u043d\u044f"),t.qZA(),t.TgZ(3,"p"),t._uU(4),t.qZA()()),2&o){const e=t.oxw().ngIf,s=t.oxw();t.xp6(4),t.Oqu(s.tranformCompanyAddress(e.shipmentAddress))}}function dt(o,r){if(1&o&&(t.TgZ(0,"p"),t._uU(1),t.qZA()),2&o){const e=t.oxw().$implicit,s=t.oxw(2);t.xp6(1),t.AsE("\u041a\u0456\u043b\u044c\u043a\u0456\u0441\u0442\u044c: ",e.quantity," ",s.getShortenMeasurementUnit(e.measurementUnit),"")}}function ct(o,r){if(1&o&&(t.TgZ(0,"div",18)(1,"p"),t._uU(2),t.qZA(),t.TgZ(3,"p"),t._uU(4),t.qZA(),t.TgZ(5,"p"),t._uU(6),t.qZA(),t.YNc(7,dt,2,2,"p",17),t.qZA()),2&o){const e=r.$implicit,s=r.index;t.xp6(2),t.AsE("",s+1,". ",e.description,""),t.xp6(2),t.Oqu(e.subdivisionTitle),t.xp6(2),t.hij("\u041f\u0440\u0435\u0434\u043c\u0435\u0442 \u0437\u0430\u043a\u0443\u043f\u0456\u0432\u043b\u0456: ",e.procurementItemTitle,""),t.xp6(1),t.Q6J("ngIf",e.quantity&&e.measurementUnit)}}function mt(o,r){if(1&o&&(t.TgZ(0,"app-order-info",11)(1,"p",9),t._uU(2,"\u0406\u043d\u0444\u043e\u0440\u043c\u0430\u0446\u0456\u044f \u043f\u0440\u043e \u043f\u0435\u0440\u0435\u0432\u0456\u0437\u043d\u0438\u043a\u0430"),t.qZA()()),2&o){const e=t.oxw(2).ngIf,s=t.oxw();t.Q6J("person",e.transporterContactPerson)("getFullName",s.getFullName)("tranformCompanyAddress",s.tranformCompanyAddress)("showCompanyAddress",!0)}}function gt(o,r){if(1&o&&(t.TgZ(0,"div",12)(1,"div",19)(2,"app-order-info",11)(3,"p",9),t._uU(4,"\u0406\u043d\u0444\u043e\u0440\u043c\u0430\u0446\u0456\u044f \u043f\u0440\u043e \u043f\u043e\u0441\u0442\u0430\u0447\u0430\u043b\u044c\u043d\u0438\u043a\u0430"),t.qZA()(),t.TgZ(5,"div",10),t.YNc(6,mt,3,4,"app-order-info",20),t.qZA()()()),2&o){const e=t.oxw().ngIf,s=t.oxw();t.xp6(2),t.Q6J("person",e.supplierContactPerson)("getFullName",s.getFullName)("tranformCompanyAddress",s.tranformCompanyAddress)("showCompanyAddress",!0),t.xp6(4),t.Q6J("ngIf",e.transporterContactPerson)}}function _t(o,r){1&o&&(t.TgZ(0,"p",23),t._uU(1,"\u041f\u0440\u043e\u043f\u043e\u0437\u0438\u0446\u0456\u0439 \u043d\u0435\u043c\u0430\u0454"),t.qZA())}const ft=function(){return["border","border-[#2FCB80]","h-[45px]","w-auto"]},Z=function(){return["bg-transparent","text-[#2FCB80]"]};function xt(o,r){if(1&o){const e=t.EpF();t.TgZ(0,"div",23)(1,"app-button",24),t.NdJ("click",function(){t.CHM(e);const n=t.oxw(2).ngIf,u=t.oxw();return t.KtG(u.openSubmitProposalDialog(n.categoryType))}),t.qZA()()}2&o&&(t.xp6(1),t.Q6J("classList",t.DdM(2,ft))("colors",t.DdM(3,Z)))}const Ct=function(){return["border","border-[#2FCB80]","h-[45px]","w-[210px]","sm:w-full"]};function ht(o,r){if(1&o){const e=t.EpF();t.TgZ(0,"app-button",24),t.NdJ("click",function(){t.CHM(e);const n=t.oxw().$implicit,u=t.oxw(2).ngIf,Et=t.oxw();return t.KtG(Et.openSubmitProposalDialog(u.categoryType,n.id))}),t.qZA()}2&o&&t.Q6J("classList",t.DdM(2,Ct))("colors",t.DdM(3,Z))}const T=function(){return["border","border-[#E74C3C]","h-[45px]","w-[210px]","sm:w-full"]},O=function(){return["bg-transparent","text-[#E74C3C]"]};function At(o,r){if(1&o){const e=t.EpF();t.TgZ(0,"app-button",35),t.NdJ("click",function(){t.CHM(e);const n=t.oxw().$implicit,u=t.oxw(3);return t.KtG(u.cancelProposal(n.id))}),t.qZA()}2&o&&t.Q6J("classList",t.DdM(2,T))("colors",t.DdM(3,O))}function yt(o,r){if(1&o){const e=t.EpF();t.TgZ(0,"app-button",35),t.NdJ("click",function(){t.CHM(e);const n=t.oxw(2).$implicit,u=t.oxw(3);return t.KtG(u.cancelProposal(n.id,n.transporterContactPerson.id===(null==u.user?null:u.user.id)))}),t.qZA()}2&o&&t.Q6J("classList",t.DdM(2,T))("colors",t.DdM(3,O))}function vt(o,r){if(1&o&&(t.TgZ(0,"div",36)(1,"app-order-info",37)(2,"p",9),t._uU(3,"\u0406\u043d\u0444\u043e\u0440\u043c\u0430\u0446\u0456\u044f \u043f\u0440\u043e \u043f\u0435\u0440\u0435\u0432\u0456\u0437\u043d\u0438\u043a\u0430"),t.qZA()(),t.TgZ(4,"div",38),t.YNc(5,yt,1,4,"app-button",32),t.qZA()()),2&o){const e=t.oxw().$implicit,s=t.oxw(2).ngIf,n=t.oxw();t.xp6(1),t.Q6J("person",e.transporterContactPerson)("getFullName",n.getFullName)("tranformCompanyAddress",n.tranformCompanyAddress)("additionalInfo",e.transporterAdditionalInfo)("price",n.showProposalPrice(s,e,!1)?e.transporterSum:null),t.xp6(4),t.Q6J("ngIf",(null==n.user?null:n.user.id)===e.transporterContactPerson.id&&n.isProposalStatusActive(e))}}const Zt=function(){return["min-h-[45px]","w-auto"]};function Tt(o,r){if(1&o){const e=t.EpF();t.TgZ(0,"div",39)(1,"p",40),t._uU(2,"\u0417\u0430\u0433\u0430\u043b\u044c\u043d\u0430 \u0441\u0443\u043c\u0430: "),t._UZ(3,"br"),t._uU(4),t.qZA(),t.TgZ(5,"app-button",41),t.NdJ("click",function(){t.CHM(e);const n=t.oxw().$implicit,u=t.oxw(3);return t.KtG(u.chooseProposal(n.id))}),t.qZA()()}if(2&o){const e=t.oxw().$implicit,s=t.oxw(3);t.xp6(4),t.hij("",s.getProposalTotalSum(e)," (\u0433\u0440\u043d.)"),t.xp6(1),t.Q6J("classList",t.DdM(2,Zt))}}const Ot=function(o,r,e){return{"grid-cols-1 lg:grid-cols-[40%_40%_1fr]":o,"grid-cols-1 lg:grid-cols-[50%_20%] gap-x-8":r,"grid-cols-1 lg:grid-cols-2":e}},bt=function(o){return["hidden","xl:block","xl:absolute","xl:right-3","xl:top-3",o]};function wt(o,r){if(1&o&&(t.TgZ(0,"div",25)(1,"div",26)(2,"div",27)(3,"app-order-info",28)(4,"p"),t._uU(5),t.TgZ(6,"span",9),t._uU(7,"\u0406\u043d\u0444\u043e\u0440\u043c\u0430\u0446\u0456\u044f \u043f\u0440\u043e \u043f\u043e\u0441\u0442\u0430\u0447\u0430\u043b\u044c\u043d\u0438\u043a\u0430"),t.qZA()()(),t.TgZ(8,"p",29),t._uU(9),t.qZA(),t.TgZ(10,"div",30),t.YNc(11,ht,1,4,"app-button",31),t.YNc(12,At,1,4,"app-button",32),t.qZA()(),t.YNc(13,vt,6,6,"div",33),t.YNc(14,Tt,6,3,"div",34),t.qZA()()),2&o){const e=r.$implicit,s=r.index,n=t.oxw(2).ngIf,u=t.oxw();t.Q6J("ngClass",0!==s?"mt-10":"mt-4"),t.xp6(1),t.Q6J("ngClass",t.kEZ(18,Ot,(null==u.user?null:u.user.role)===u.Roles.Customer&&u.isCategoryTypeGoods(n),(null==u.user?null:u.user.role)===u.Roles.Customer&&!u.isCategoryTypeGoods(n),(null==u.user?null:u.user.role)!==u.Roles.Customer)),t.xp6(2),t.Q6J("person",e.supplierContactPerson)("getFullName",u.getFullName)("tranformCompanyAddress",u.tranformCompanyAddress)("shipmentAddress",e.shipmentAddress)("additionalInfo",e.supplierAdditionalInfo)("price",u.showProposalPrice(n,e,!0)?e.supplierPrice:null)("proposalStatus",u.ProposalStatuses[e.status])("proposalStatusColor",u.StatusesColors[e.status]),t.xp6(2),t.hij("",s+1,". "),t.xp6(3),t.Q6J("ngClass",t.VKq(22,bt,u.StatusesColors[e.status])),t.xp6(1),t.Oqu(u.ProposalStatuses[e.status]),t.xp6(1),t.Q6J("ngClass",(null==u.user?null:u.user.id)===e.supplierContactPerson.id&&u.isProposalStatusActive(e)&&u.isAllowedToSubmitTransportProposal(n,e)?"grid-cols-1 sm:grid-cols-2 w-[90%] xl:w-[80%]":"grid-cols-1 me-0"),t.xp6(1),t.Q6J("ngIf",u.isAllowedToSubmitTransportProposal(n,e)),t.xp6(1),t.Q6J("ngIf",(null==u.user?null:u.user.id)===e.supplierContactPerson.id&&u.isProposalStatusActive(e)),t.xp6(1),t.Q6J("ngIf",e.transporterContactPerson&&u.isCategoryTypeGoods(n)),t.xp6(1),t.Q6J("ngIf",u.isAllowedToChooseProposal(n,e))}}function Dt(o,r){if(1&o&&(t.TgZ(0,"div",12)(1,"h3",13),t._uU(2,"\u041f\u0440\u043e\u043f\u043e\u0437\u0438\u0446\u0456\u0457"),t.qZA(),t.YNc(3,_t,2,0,"p",21),t.YNc(4,xt,2,4,"div",21),t.YNc(5,wt,15,24,"div",22),t.qZA()),2&o){const e=t.oxw().ngIf,s=t.oxw();t.xp6(3),t.Q6J("ngIf",0===e.proposals.length),t.xp6(1),t.Q6J("ngIf",s.user&&s.user.role===s.Roles.Supplier&&!s.anySupplierProposals(e)&&s.OrderStatuses[e.status]===s.OrderStatuses.Active),t.xp6(1),t.Q6J("ngForOf",e.proposals)}}function It(o,r){if(1&o&&(t.TgZ(0,"div",3)(1,"h3",4),t._uU(2),t.qZA(),t.TgZ(3,"p",5),t._uU(4),t.ALo(5,"date"),t.qZA(),t.TgZ(6,"div",6)(7,"div",7)(8,"p"),t._uU(9),t.qZA(),t.TgZ(10,"p"),t._uU(11),t.qZA(),t.TgZ(12,"p"),t._uU(13),t.qZA(),t.YNc(14,at,5,3,"div",8),t.TgZ(15,"p",9),t._uU(16,"\u0410\u0434\u0440\u0435\u0441\u0430 \u0434\u043e\u0441\u0442\u0430\u0432\u043a\u0438/\u043f\u043e\u0441\u0442\u0430\u0447\u0430\u043d\u043d\u044f"),t.qZA(),t.TgZ(17,"p"),t._uU(18),t.qZA(),t.YNc(19,lt,5,1,"div",8),t.qZA(),t.TgZ(20,"div",10)(21,"app-order-info",11)(22,"p",9),t._uU(23,"\u0406\u043d\u0444\u043e\u0440\u043c\u0430\u0446\u0456\u044f \u043f\u0440\u043e \u0437\u0430\u043c\u043e\u0432\u043d\u0438\u043a\u0430"),t.qZA()()()(),t.TgZ(24,"div",12)(25,"h3",13),t._uU(26,"\u0417\u0430\u044f\u0432\u043a\u0438"),t.qZA(),t.YNc(27,ct,8,5,"div",14),t.qZA(),t.YNc(28,gt,7,5,"div",15),t.YNc(29,Dt,6,3,"ng-template",null,16,t.W1O),t.qZA()),2&o){const e=r.ngIf,s=t.MAs(30),n=t.oxw();t.xp6(2),t.Oqu(e.title),t.xp6(2),t.hij(" \u0414\u0430\u0442\u0430 \u0441\u0442\u0432\u043e\u0440\u0435\u043d\u043d\u044f: ",t.Dn7(5,15,e.createdAt,"HH:mm:ss dd MMMM y","uk-UA")," "),t.xp6(5),t.hij("\u041d\u043e\u043c\u0435\u0440 \u0437\u0430\u043c\u043e\u0432\u043b\u0435\u043d\u043d\u044f: ",e.id,""),t.xp6(2),t.hij("\u0421\u0442\u0430\u0442\u0443\u0441: ",n.OrderStatuses[e.status],""),t.xp6(2),t.hij("\u0411\u044e\u0434\u0436\u0435\u0442: ",e.budget," (\u0433\u0440\u043d.)"),t.xp6(1),t.Q6J("ngIf",n.OrderStatuses[e.status]===n.OrderStatuses.Processed),t.xp6(4),t.Oqu(n.tranformCompanyAddress(e.deliveryAddress)),t.xp6(1),t.Q6J("ngIf",n.OrderStatuses[e.status]===n.OrderStatuses.Processed&&n.isCategoryTypeGoods(e)),t.xp6(2),t.Q6J("person",e.buyerContactPerson)("getFullName",n.getFullName)("tranformCompanyAddress",n.tranformCompanyAddress)("showCompanyAddress",!0),t.xp6(6),t.Q6J("ngForOf",e.requests),t.xp6(1),t.Q6J("ngIf",n.OrderStatuses[e.status]===n.OrderStatuses.Processed)("ngIfElse",s)}}function Ft(o,r){1&o&&(t.TgZ(0,"div",42),t._UZ(1,"mat-spinner",43),t.qZA())}let St=(()=>{class o{constructor(e,s){this.store=e,this.route=s,this.OrderStatuses=l.pf,this.ProposalStatuses=l.Dw,this.StatusesColors=l.p9,this.getShortenMeasurementUnit=X.k,this.Roles=c.G,this.CategoryTypes=_.y}ngOnInit(){const e=+this.route.snapshot.paramMap.get("orderId");this.store.dispatch(d.s$({orderId:e})),this.order$=this.store.pipe((0,a.Ys)(m.zT)),this.loading$=this.store.pipe((0,a.Ys)(C.N)),this.userSubscription=this.store.pipe((0,a.Ys)(g.dy)).subscribe(s=>{this.user=s})}tranformCompanyAddress(e){const s=[e.city,e.street,e.zipCode];return e.region&&s.splice(1,0,`${e.region} \u043e\u0431\u043b\u0430\u0441\u0442\u044c`),e.buildingNumber&&s.splice(-1,0,e.buildingNumber),s.join(", ")}getFullName(e){return`${e.lastName} ${e.firstName} ${e.middleName}`}openSubmitProposalDialog(e,s){this.store.dispatch(z.$Z({orderCategoryType:e,proposalId:s}))}anySupplierProposals(e){return e.proposals.some(s=>s.supplierContactPerson.companyId===this.user.companyId&&l.Dw[s.status]===l.Dw.Active)}anyTransporterProposals(e,s){return e.proposals.some(n=>n.supplierContactPerson.companyId===s&&n.transporterContactPerson?.companyId===this.user.companyId&&l.Dw[n.status]===l.Dw.Active)}cancelProposal(e,s){this.store.dispatch(d.sA({id:e,cancelTransportProposal:s}))}getProposalTotalSum(e){return e.supplierPrice+e.transporterSum}isCategoryTypeGoods(e){return _.y[e.categoryType]===_.y.Goods}isProposalStatusActive(e){return l.Dw[e.status]===l.Dw.Active}isAllowedToSubmitTransportProposal(e,s){return(this.user?.role===c.G.Transporter||s.supplierContactPerson.id===this.user?.id)&&this.isProposalStatusActive(s)&&!this.anyTransporterProposals(e,s.supplierContactPerson.companyId)&&this.isCategoryTypeGoods(e)}isAllowedToChooseProposal(e,s){return this.user?.role===c.G.Customer&&this.isProposalStatusActive(s)&&(s.transporterContactPerson||s.supplierContactPerson&&!this.isCategoryTypeGoods(e))}showProposalPrice(e,s,n){return(this.user?.role===c.G.Applicant||this.user?.role===c.G.Customer)&&e.buyerContactPerson.companyId===this.user?.companyId||this.user?.role===c.G.Supplier&&s.supplierContactPerson.id===this.user?.id&&n||this.user?.role===c.G.Transporter&&s.transporterContactPerson?.id===this.user?.id&&!n}chooseProposal(e){this.store.dispatch(d.FM({id:e}))}ngOnDestroy(){this.store.dispatch(d.pO()),this.userSubscription&&this.userSubscription.unsubscribe()}}return o.\u0275fac=function(e){return new(e||o)(t.Y36(a.yh),t.Y36(x.gz))},o.\u0275cmp=t.Xpm({type:o,selectors:[["app-order-details"]],decls:5,vars:6,consts:[[1,"relative","py-3","sm:py-10"],["class","w-[95%] sm:w-[85%] md:w-[75%] lg:w-[90%] xl:w-[85%] 2xl:w-4/5 bg-white rounded-xl shadow-gray-400 p-6 mx-auto",4,"ngIf"],["class","fixed inset-x-[42%] sm:inset-x-[45%] md:inset-x-[49%] inset-y-[45%]",4,"ngIf"],[1,"w-[95%]","sm:w-[85%]","md:w-[75%]","lg:w-[90%]","xl:w-[85%]","2xl:w-4/5","bg-white","rounded-xl","shadow-gray-400","p-6","mx-auto"],[1,"font-semibold","text-xl","sm:text-2xl","text-[#2FCB80]"],[1,"mt-2","italic","text-[#A9A9A9]","text-sm","sm:text-base"],[1,"mt-4","grid","grid-cols-1","sm:grid-cols-2","gap-x-6","lg:gap-x-12","text-base"],[1,"flex","flex-col","justify-center","gap-y-2"],["class","flex flex-col justify-center gap-y-2",4,"ngIf"],[1,"font-semibold","text-[#2FCB80]"],[1,"mt-2","sm:mt-0"],[3,"person","getFullName","tranformCompanyAddress","showCompanyAddress"],[1,"mt-6"],[1,"font-semibold","text-lg","sm:text-xl","text-[#2FCB80]"],["class","mt-3 flex flex-col justify-center gap-y-2 border border-[#2FCB80] rounded-lg p-3",4,"ngFor","ngForOf"],["class","mt-6",4,"ngIf","ngIfElse"],["proposals",""],[4,"ngIf"],[1,"mt-3","flex","flex-col","justify-center","gap-y-2","border","border-[#2FCB80]","rounded-lg","p-3"],[1,"grid","grid-cols-1","sm:grid-cols-2","sm:gap-x-12"],[3,"person","getFullName","tranformCompanyAddress","showCompanyAddress",4,"ngIf"],["class","mt-4",4,"ngIf"],["class","lg:mt-4",3,"ngClass",4,"ngFor","ngForOf"],[1,"mt-4"],["text","\u041f\u043e\u0434\u0430\u0442\u0438 \u043f\u0440\u043e\u043f\u043e\u0437\u0438\u0446\u0456\u044e","type","button",3,"classList","colors","click"],[1,"lg:mt-4",3,"ngClass"],[1,"grid","gap-x-4","text-base",3,"ngClass"],[1,"flex","flex-col","justify-center","gap-y-2","border","border-[#2FCB80]","rounded-lg","p-3","relative"],[3,"person","getFullName","tranformCompanyAddress","shipmentAddress","additionalInfo","price","proposalStatus","proposalStatusColor"],[3,"ngClass"],[1,"2xl:w-auto","2xl:absolute","2xl:bottom-3","2xl:right-3","grid","grid-flow-row","gap-y-2","sm:grid-flow-col","gap-x-4","2xl:grid-flow-row","2xl:grid-cols-1","min-w-[175px]","mx-auto","justify-center","w-auto",3,"ngClass"],["text","\u041f\u043e\u0434\u0430\u0442\u0438 \u043f\u0440\u043e\u043f\u043e\u0437\u0438\u0446\u0456\u044e","type","button",3,"classList","colors","click",4,"ngIf"],["text","\u0421\u043a\u0430\u0441\u0443\u0432\u0430\u0442\u0438","type","button",3,"classList","colors","click",4,"ngIf"],["class","mt-2 lg:mt-0 flex flex-col gap-y-2 border border-[#2FCB80] rounded-lg p-3 relative",4,"ngIf"],["class","mt-2 lg:mt-0 flex flex-col justify-center sm:flex-row sm:justify-around lg:flex-col items-center lg:justify-center gap-y-2 sm:gap-y-4",4,"ngIf"],["text","\u0421\u043a\u0430\u0441\u0443\u0432\u0430\u0442\u0438","type","button",3,"classList","colors","click"],[1,"mt-2","lg:mt-0","flex","flex-col","gap-y-2","border","border-[#2FCB80]","rounded-lg","p-3","relative"],[3,"person","getFullName","tranformCompanyAddress","additionalInfo","price"],[1,"sm:w-auto","sm:absolute","sm:bottom-3","sm:right-3","grid","min-w-[175px]","mx-auto","grid-cols-1","me-0"],[1,"mt-2","lg:mt-0","flex","flex-col","justify-center","sm:flex-row","sm:justify-around","lg:flex-col","items-center","lg:justify-center","gap-y-2","sm:gap-y-4"],[1,"text-center","lg:text-left"],["text","\u041e\u0431\u0440\u0430\u0442\u0438 \u043f\u0440\u043e\u043f\u043e\u0437\u0438\u0446\u0456\u044e","type","button",3,"classList","click"],[1,"fixed","inset-x-[42%]","sm:inset-x-[45%]","md:inset-x-[49%]","inset-y-[45%]"],["diameter","70"]],template:function(e,s){1&e&&(t.TgZ(0,"div",0),t.YNc(1,It,31,19,"div",1),t.ALo(2,"async"),t.YNc(3,Ft,2,0,"div",2),t.ALo(4,"async"),t.qZA()),2&e&&(t.xp6(1),t.Q6J("ngIf",t.lcZ(2,2,s.order$)),t.xp6(2),t.Q6J("ngIf",t.lcZ(4,4,s.loading$)))},dependencies:[y.r,p.mk,p.sg,p.O5,h.Ou,ut,p.Ov,p.uU]}),o})(),Pt=(()=>{class o{}return o.\u0275fac=function(e){return new(e||o)},o.\u0275mod=t.oAB({type:o}),o.\u0275inj=t.cJS({imports:[b.m,p.ez,x.Bz.forChild([{path:"",component:V},{path:":orderId",component:St}])]}),o})()}}]);