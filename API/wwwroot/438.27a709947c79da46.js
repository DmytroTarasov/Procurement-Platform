"use strict";(self.webpackChunkclient=self.webpackChunkclient||[]).push([[438],{8438:(N,g,r)=>{r.r(g),r.d(g,{AuthModule:()=>J});var c=r(6895),e=r(4006),s=r(9653),a=r(8379),h=r(2553),m=r(9884),l=r(9091),u=r(4650),f=r(7038),Z=r(3986),C=r(6742),v=r(843),d=r(8252);const x=function(){return["name"]},F=function(){return["title"]},y=function(){return["../login"]},A=function(){return["mt-3","h-[45px]","w-[155px]"]};let D=(()=>{class n{constructor(t){this.store=t,this.checked=!1}ngOnInit(){this.store.dispatch(a.fw()),this.store.dispatch(a.F3()),this.store.dispatch(a.ap()),this.userForm=new e.cw({lastName:new e.NI("",(0,l.Do)()),firstName:new e.NI("",(0,l.Do)()),middleName:new e.NI("",(0,l.Do)()),email:new e.NI("",(0,l.kb)()),role:new e.NI("",e.kI.required),companyId:new e.NI("",e.kI.required),subdivisionId:new e.NI("",e.kI.required),password:new e.NI("",(0,l.dD)())}),this.roles$=this.store.pipe((0,s.Ys)(m.g$)),this.companies$=this.store.pipe((0,s.Ys)(m.zY)),this.registrationError$=this.store.pipe((0,s.Ys)(m.zh)),this.getFormControl("companyId").valueChanges.subscribe(t=>{this.subdivisions$=this.store.pipe((0,s.Ys)((0,m.p8)(t)))})}getFormControl(t){return this.userForm.get(t)}onSubmit(){!this.userForm.valid||this.store.dispatch(a.z2({user:this.userForm.value}))}openCreateCompanyDialog(){this.store.dispatch(h.Zw())}openCreateSubdivisionDialog(){const t=this.getFormControl("companyId");t.markAsTouched(),t.valid&&this.store.dispatch(h.c7({companyId:t.value}))}onChange(t){this.checked=t}}return n.\u0275fac=function(t){return new(t||n)(u.Y36(s.yh))},n.\u0275cmp=u.Xpm({type:n,selectors:[["app-registration"]],decls:43,vars:33,consts:[[1,"h-full","flex","flex-col","items-center","justify-center"],[1,"w-[90%]","md:w-[80%]","lg:w-[75%]","xl:w-[60%]"],[1,"text-2xl","text-center","font-medium"],[1,"w-full","mt-5",3,"formGroup","ngSubmit"],[1,"sm:grid","sm:grid-cols-2","sm:gap-x-6"],["label","\u041f\u0440\u0456\u0437\u0432\u0438\u0449\u0435",3,"control"],["label","\u0406\u043c'\u044f",3,"control"],["label","\u041f\u043e-\u0431\u0430\u0442\u044c\u043a\u043e\u0432\u0456",3,"control"],["label","\u041f\u043e\u0448\u0442\u0430",3,"control"],["label","\u0420\u043e\u043b\u044c",3,"control","displayProps","items","optionValueProp"],[1,"flex","flex-col","justify-between"],["label","\u041a\u043e\u043c\u043f\u0430\u043d\u0456\u044f",3,"control","displayProps","items"],[1,"mt-[6px]","flex","flex-col","items-center","lg:flex-row","lg:gap-x-1","text-sm"],[1,"italic"],[1,"underline","text-[#2CA9D5]","cursor-pointer",3,"click"],["label","\u041f\u0456\u0434\u0440\u043e\u0437\u0434\u0456\u043b","errorMessage","\u041f\u0456\u0434\u0440\u043e\u0437\u0434\u0456\u043b \u043c\u0430\u0454 \u0431\u0443\u0442\u0438 \u043e\u0431\u0440\u0430\u043d\u0438\u0439",3,"control","displayProps","items"],["label","\u041f\u0430\u0440\u043e\u043b\u044c","type","password",3,"control"],[1,"text-center","italic"],[1,"text-red-600"],[1,"mt-2","text-center","text-red-600","h-auto","min-h-[20px]"],[1,"flex","flex-col","justify-center","items-center"],[1,"text-base","italic"],[1,"underline","text-[#2CA9D5]","cursor-pointer",3,"routerLink"],["label","\u0414\u0430\u044e \u0437\u0433\u043e\u0434\u0443 \u043d\u0430 \u043e\u0431\u0440\u043e\u0431\u043a\u0443 \u043f\u0435\u0440\u0441\u043e\u043d\u0430\u043b\u044c\u043d\u0438\u0445 \u0434\u0430\u043d\u0438\u0445",3,"onChange"],["text","\u0417\u0430\u0440\u0435\u0454\u0441\u0442\u0440\u0443\u0432\u0430\u0442\u0438\u0441\u044c","type","submit",3,"disabled","classList"]],template:function(t,o){if(1&t&&(u.TgZ(0,"div",0)(1,"div",1)(2,"h1",2),u._uU(3,"\u0420\u0435\u0454\u0441\u0442\u0440\u0430\u0446\u0456\u044f"),u.qZA(),u.TgZ(4,"form",3),u.NdJ("ngSubmit",function(){return o.onSubmit()}),u.TgZ(5,"div",4)(6,"div"),u._UZ(7,"app-input",5)(8,"app-input",6)(9,"app-input",7)(10,"app-input",8)(11,"app-dropdown",9),u.ALo(12,"async"),u.qZA(),u.TgZ(13,"div",10)(14,"app-dropdown",11),u.ALo(15,"async"),u.TgZ(16,"div",12)(17,"p",13),u._uU(18,"\u041d\u0435 \u0437\u043d\u0430\u0439\u0448\u043b\u0438 \u0441\u0432\u043e\u044e \u043a\u043e\u043c\u043f\u0430\u043d\u0456\u044e?"),u.qZA(),u.TgZ(19,"span",14),u.NdJ("click",function(){return o.openCreateCompanyDialog()}),u._uU(20,"\u0417\u0430\u0440\u0435\u0454\u0441\u0442\u0440\u0443\u0439\u0442\u0435 \u0457\u0457 \u0437\u0430\u0440\u0430\u0437"),u.qZA()()(),u.TgZ(21,"app-dropdown",15),u.ALo(22,"async"),u.TgZ(23,"div",12)(24,"p",13),u._uU(25,"\u041d\u0435 \u0437\u043d\u0430\u0439\u0448\u043b\u0438 \u0441\u0432\u0456\u0439 \u043f\u0456\u0434\u0440\u043e\u0437\u0434\u0456\u043b?"),u.qZA(),u.TgZ(26,"span",14),u.NdJ("click",function(){return o.openCreateSubdivisionDialog()}),u._uU(27,"\u0417\u0430\u0440\u0435\u0454\u0441\u0442\u0440\u0443\u0439\u0442\u0435 \u0439\u043e\u0433\u043e \u0437\u0430\u0440\u0430\u0437"),u.qZA()()(),u._UZ(28,"app-input",16),u.qZA()(),u.TgZ(29,"p",17)(30,"span",18),u._uU(31,"*"),u.qZA(),u._uU(32," \u043f\u043e\u0437\u043d\u0430\u0447\u0435\u043d\u0456 \u043e\u0431\u043e\u0432'\u044f\u0437\u043a\u043e\u0432\u0456 \u043f\u043e\u043b\u044f"),u.qZA(),u.TgZ(33,"p",19),u._uU(34),u.ALo(35,"async"),u.qZA(),u.TgZ(36,"div",20)(37,"p",21),u._uU(38,"\u0412\u0436\u0435 \u043c\u0430\u0454\u0442\u0435 \u0430\u043a\u0430\u0443\u043d\u0442? "),u.TgZ(39,"a",22),u._uU(40,"\u0423\u0432\u0456\u0439\u0442\u0438"),u.qZA()(),u.TgZ(41,"app-checkbox",23),u.NdJ("onChange",function(I){return o.onChange(I)}),u.qZA(),u._UZ(42,"app-button",24),u.qZA()()()()),2&t){let i;u.xp6(4),u.Q6J("formGroup",o.userForm),u.xp6(3),u.Q6J("control",o.getFormControl("lastName")),u.xp6(1),u.Q6J("control",o.getFormControl("firstName")),u.xp6(1),u.Q6J("control",o.getFormControl("middleName")),u.xp6(1),u.Q6J("control",o.getFormControl("email")),u.xp6(1),u.Q6J("control",o.getFormControl("role"))("displayProps",u.DdM(28,x))("items",u.lcZ(12,20,o.roles$))("optionValueProp","name"),u.xp6(3),u.Q6J("control",o.getFormControl("companyId"))("displayProps",u.DdM(29,F))("items",u.lcZ(15,22,o.companies$)),u.xp6(7),u.Q6J("control",o.getFormControl("subdivisionId"))("displayProps",u.DdM(30,F))("items",u.lcZ(22,24,o.subdivisions$)),u.xp6(7),u.Q6J("control",o.getFormControl("password")),u.xp6(6),u.Oqu(null!==(i=u.lcZ(35,26,o.registrationError$))&&void 0!==i?i:""),u.xp6(5),u.Q6J("routerLink",u.DdM(31,y)),u.xp6(3),u.Q6J("disabled",!o.userForm.valid||!o.checked)("classList",u.DdM(32,A))}},dependencies:[f.a,Z.J,C.r,v.b,e._Y,e.JL,e.sg,d.yS,c.Ov]}),n})();var b=r(4466);const w=function(){return["../register"]},E=function(){return["mt-3","h-[45px]","w-[155px]"]};let T=(()=>{class n{constructor(t){this.store=t}ngOnInit(){this.store.dispatch(a.fw()),this.loginForm=new e.cw({email:new e.NI("",(0,l.kb)()),password:new e.NI("",(0,l.dD)())}),this.error$=this.store.pipe((0,s.Ys)(m.zh))}getFormControl(t){return this.loginForm.get(t)}onSubmit(){!this.loginForm.valid||this.store.dispatch(a.x4({login:this.loginForm.value}))}}return n.\u0275fac=function(t){return new(t||n)(u.Y36(s.yh))},n.\u0275cmp=u.Xpm({type:n,selectors:[["app-login"]],decls:16,vars:11,consts:[[1,"h-full","flex","flex-col","items-center","justify-center"],[1,"w-[90%]","sm:w-[55%]","md:w-[45%]","lg:w-[35%]","xl:w-[30%]"],[1,"text-2xl","text-center","font-medium"],[1,"w-full","mt-5",3,"formGroup","ngSubmit"],["label","\u041f\u043e\u0448\u0442\u0430",3,"control"],["label","\u041f\u0430\u0440\u043e\u043b\u044c","type","password",3,"control"],[1,"mt-2","text-center","text-red-600","h-auto","min-h-[20px]"],[1,"flex","flex-col","justify-center","items-center"],[1,"text-base","italic"],[1,"underline","text-[#2CA9D5]","cursor-pointer",3,"routerLink"],["text","\u0423\u0432\u0456\u0439\u0442\u0438","type","submit",3,"disabled","classList"]],template:function(t,o){if(1&t&&(u.TgZ(0,"div",0)(1,"div",1)(2,"h1",2),u._uU(3,"\u0412\u0445\u0456\u0434"),u.qZA(),u.TgZ(4,"form",3),u.NdJ("ngSubmit",function(){return o.onSubmit()}),u._UZ(5,"app-input",4)(6,"app-input",5),u.TgZ(7,"p",6),u._uU(8),u.ALo(9,"async"),u.qZA(),u.TgZ(10,"div",7)(11,"p",8),u._uU(12,"\u041d\u0435 \u043c\u0430\u0454\u0442\u0435 \u0430\u043a\u0430\u0443\u043d\u0442\u0443? "),u.TgZ(13,"a",9),u._uU(14,"\u0417\u0430\u0440\u0435\u0454\u0441\u0442\u0440\u0443\u0432\u0430\u0442\u0438\u0441\u044c"),u.qZA()(),u._UZ(15,"app-button",10),u.qZA()()()()),2&t){let i;u.xp6(4),u.Q6J("formGroup",o.loginForm),u.xp6(1),u.Q6J("control",o.getFormControl("email")),u.xp6(1),u.Q6J("control",o.getFormControl("password")),u.xp6(2),u.Oqu(null!==(i=u.lcZ(9,7,o.error$))&&void 0!==i?i:""),u.xp6(5),u.Q6J("routerLink",u.DdM(9,w)),u.xp6(2),u.Q6J("disabled",!o.loginForm.valid)("classList",u.DdM(10,E))}},dependencies:[f.a,C.r,e._Y,e.JL,e.sg,d.yS,c.Ov]}),n})(),J=(()=>{class n{}return n.\u0275fac=function(t){return new(t||n)},n.\u0275mod=u.oAB({type:n}),n.\u0275inj=u.cJS({imports:[b.m,c.ez,d.Bz.forChild([{path:"register",component:D},{path:"login",component:T}])]}),n})()}}]);