"use strict";(self.webpackChunkng_p5js_sketches=self.webpackChunkng_p5js_sketches||[]).push([[965],{7755:(v,d,c)=>{c.d(d,{k:()=>G});var t=c(5e3),m=c(8555),_=c(6505),h=c(591),i=c(5529),g=c(3426),f=c(7625),C=c(5265);function p(e){(0,C.A)(e).innerHTML=""}var u=c(1081),b=c(2916);let y=(()=>{class e{constructor(n,o){this.sketch$=n,this.cdRef=o,this.redrawSubject=new h.X(null),this.destroyed$=new i.xQ}ngOnInit(){(0,g.aj)([this.sketch$,this.redrawSubject]).pipe((0,f.R)(this.destroyed$)).subscribe(([n])=>{var o,r;if(!(0,u.Se)(n))throw new Error("Object passed as Sketch to BaseSketchDirective is not a sketch");null===(o=this.p)||void 0===o||o.clear(0,0,0,0),null===(r=this.p)||void 0===r||r.remove(),p(),this.cdRef.detectChanges(),this.p=new _(n.func),this.p.disableFriendlyErrors=!0,this.p.noiseSeed(868),this.p.randomSeed(868),this.cdRef.detectChanges()})}ngOnDestroy(){var n;null===(n=this.p)||void 0===n||n.remove(),p(),this.cdRef.detectChanges(),this.destroyed$.next(),this.destroyed$.complete()}redraw(){this.redrawSubject.next(null)}}return e.\u0275fac=function(n){return new(n||e)(t.Y36(b.y),t.Y36(t.sBO))},e.\u0275dir=t.lG2({type:e}),e})();var Z=c(4850),P=c(2986),w=c(8561),s=c(9808),x=c(7423),A=c(8099),R=c(8029),O=c(7446),T=c(7322),$=c(1781),E=c(508);function D(e,a){if(1&e){const n=t.EpF();t.TgZ(0,"button",2),t.NdJ("click",function(){return t.CHM(n),t.oxw().redraw.emit()}),t.TgZ(1,"mat-icon"),t._uU(2,"refresh"),t.qZA()()}}function J(e,a){if(1&e){const n=t.EpF();t.TgZ(0,"button",2),t.NdJ("click",function(){return t.CHM(n),t.oxw().download.emit()}),t.TgZ(1,"mat-icon"),t._uU(2,"file_download"),t.qZA()()}}function M(e,a){if(1&e){const n=t.EpF();t.TgZ(0,"div",9)(1,"label"),t._uU(2),t.ALo(3,"async"),t.qZA(),t.TgZ(4,"mat-slider",10,11),t.NdJ("input",function(r){return t.CHM(n),t.oxw().$implicit.value$.next(r.value)}),t.ALo(6,"async"),t.ALo(7,"async"),t.ALo(8,"async"),t.ALo(9,"async"),t.qZA()()}if(2&e){const n=t.MAs(5),o=t.oxw().$implicit;t.xp6(2),t.AsE("",t.lcZ(3,7,o.label$),": ",n.value,""),t.xp6(2),t.Q6J("id",o.id)("min",t.lcZ(6,9,o.min$))("max",t.lcZ(7,11,o.max$))("value",t.lcZ(8,13,o.value$))("step",t.lcZ(9,15,o.step$))}}function B(e,a){if(1&e){const n=t.EpF();t.TgZ(0,"button",12),t.NdJ("click",function(){return t.CHM(n),t.oxw().$implicit.onPress()}),t.ALo(1,"async"),t.ALo(2,"async"),t._uU(3),t.ALo(4,"async"),t.qZA()}if(2&e){const n=t.oxw().$implicit;t.Q6J("color",t.lcZ(1,3,n.color$))("disabled",t.lcZ(2,5,n.disabled$)),t.xp6(3),t.hij(" ",t.lcZ(4,7,n.label$)," ")}}function N(e,a){if(1&e){const n=t.EpF();t.TgZ(0,"mat-checkbox",13),t.NdJ("change",function(r){return t.CHM(n),t.oxw().$implicit.value$.next(r.checked)}),t.ALo(1,"async"),t._uU(2),t.ALo(3,"async"),t.qZA()}if(2&e){const n=t.oxw().$implicit;t.Q6J("checked",t.lcZ(1,2,n.value$)),t.xp6(2),t.hij(" ",t.lcZ(3,4,n.label$)," ")}}function L(e,a){if(1&e&&(t.TgZ(0,"mat-option",17),t._uU(1),t.qZA()),2&e){const n=a.$implicit;t.Q6J("value",n),t.xp6(1),t.hij(" ",n," ")}}function F(e,a){if(1&e){const n=t.EpF();t.TgZ(0,"mat-form-field",14)(1,"mat-label"),t._uU(2),t.ALo(3,"async"),t.qZA(),t.TgZ(4,"mat-select",15),t.NdJ("selectionChange",function(r){return t.CHM(n),t.oxw().$implicit.value$.next(r.value)}),t.ALo(5,"async"),t.YNc(6,L,2,2,"mat-option",16),t.ALo(7,"async"),t.qZA()()}if(2&e){const n=t.oxw().$implicit;t.xp6(2),t.Oqu(t.lcZ(3,3,n.label$)),t.xp6(2),t.Q6J("value",t.lcZ(5,5,n.value$)),t.xp6(2),t.Q6J("ngForOf",t.lcZ(7,7,n.options$))}}function Q(e,a){if(1&e&&(t.ynx(0)(1,4),t.YNc(2,M,10,17,"div",5),t.YNc(3,B,5,9,"button",6),t.YNc(4,N,4,6,"mat-checkbox",7),t.YNc(5,F,8,9,"mat-form-field",8),t.BQk()()),2&e){const n=a.$implicit,o=t.oxw(2);t.xp6(1),t.Q6J("ngSwitch",n.type),t.xp6(1),t.Q6J("ngSwitchCase",o.SketchControlType.Slider),t.xp6(1),t.Q6J("ngSwitchCase",o.SketchControlType.Button),t.xp6(1),t.Q6J("ngSwitchCase",o.SketchControlType.Checkbox),t.xp6(1),t.Q6J("ngSwitchCase",o.SketchControlType.Select)}}function I(e,a){if(1&e&&(t.ynx(0),t.YNc(1,Q,6,5,"ng-container",3),t.BQk()),2&e){const n=t.oxw();t.xp6(1),t.Q6J("ngForOf",n.controls.customControls)}}let H=(()=>{class e{constructor(){this.redraw=new t.vpe,this.download=new t.vpe,this.SketchControlType=u.kw}}return e.\u0275fac=function(n){return new(n||e)},e.\u0275cmp=t.Xpm({type:e,selectors:[["app-sketch-controls"]],inputs:{controls:"controls",frameRate:"frameRate"},outputs:{redraw:"redraw",download:"download"},decls:6,vars:7,consts:[["mat-mini-fab","","color","primary",3,"click",4,"ngIf"],[4,"ngIf"],["mat-mini-fab","","color","primary",3,"click"],[4,"ngFor","ngForOf"],[3,"ngSwitch"],["class","slider-control",4,"ngSwitchCase"],["mat-flat-button","",3,"color","disabled","click",4,"ngSwitchCase"],[3,"checked","change",4,"ngSwitchCase"],["appearance","outline",4,"ngSwitchCase"],[1,"slider-control"],[3,"id","min","max","value","step","input"],["slider",""],["mat-flat-button","",3,"color","disabled","click"],[3,"checked","change"],["appearance","outline"],[3,"value","selectionChange"],[3,"value",4,"ngFor","ngForOf"],[3,"value"]],template:function(n,o){1&n&&(t.TgZ(0,"div"),t._uU(1),t.ALo(2,"number"),t.qZA(),t.YNc(3,D,3,0,"button",0),t.YNc(4,J,3,0,"button",0),t.YNc(5,I,2,1,"ng-container",1)),2&n&&(t.xp6(1),t.hij("",t.xi3(2,4,o.frameRate,"1.2-2")," FPS"),t.xp6(2),t.Q6J("ngIf",null==o.controls?null:o.controls.refreshButton),t.xp6(1),t.Q6J("ngIf",null==o.controls?null:o.controls.downloadButton),t.xp6(1),t.Q6J("ngIf",null==o.controls?null:o.controls.customControls))},directives:[s.O5,x.lW,A.Hw,s.sg,s.RF,s.n9,R.pH,O.oG,T.KE,T.hX,$.gD,E.ey],pipes:[s.JJ,s.Ov],styles:["[_nghost-%COMP%] > *[_ngcontent-%COMP%]{display:block;margin:8px}.slider-control[_ngcontent-%COMP%] > *[_ngcontent-%COMP%]{display:block}"]}),e})();const U=["actionDrawer"];function j(e,a){if(1&e){const n=t.EpF();t.TgZ(0,"app-sketch-controls",8),t.NdJ("redraw",function(){return t.CHM(n),t.oxw().redraw()})("download",function(){return t.CHM(n),t.oxw().download()}),t.qZA()}if(2&e){const n=a.ngIf,o=t.oxw();t.Q6J("frameRate",o.frameRate)("controls",n)}}function Y(e,a){if(1&e){const n=t.EpF();t.TgZ(0,"button",9),t.NdJ("click",function(){return t.CHM(n),t.oxw(),t.MAs(2).toggle()}),t.ALo(1,"async"),t.TgZ(2,"mat-icon"),t._uU(3),t.qZA()()}if(2&e){const n=t.oxw(),o=t.MAs(2);t.Udp("right",t.lcZ(1,3,n.actionDrawerButtonRightPosition$),"px"),t.xp6(3),t.hij(" ",o.opened?"chevron_right":"chevron_left"," ")}}const W=function(e,a){return{"grid-template-columns":e,"grid-template-rows":a}};let G=(()=>{class e extends y{constructor(n,o){super(n.data,o),this.route=n,this.DEFAULT_CANVAS_WIDTH="80%",this.DEFAULT_CANVAS_HEIGHT="80%",this.actionDrawerButtonRightPosition=new h.X(0),this.actionDrawerButtonRightPosition$=this.actionDrawerButtonRightPosition.asObservable(),this.showActionDrawerButton$=this.sketch$.pipe((0,Z.U)(r=>{var l,S,k;return(null===(l=r.controls)||void 0===l?void 0:l.refreshButton)||(null===(S=r.controls)||void 0===S?void 0:S.downloadButton)||(null===(k=r.controls)||void 0===k?void 0:k.customControls)}))}download(){this.sketch$.pipe((0,P.q)(1)).subscribe(n=>{n.isSvg?(0,u.S9)(n.title):(0,u.my)(n.title)})}drawerOpenedChange(n){var o,r,l;this.actionDrawerButtonRightPosition.next(n&&null!==(l=null===(r=null===(o=this.actionDrawerElement)||void 0===o?void 0:o.nativeElement)||void 0===r?void 0:r.clientWidth)&&void 0!==l?l:0)}get frameRate(){var n;return null===(n=this.p)||void 0===n?void 0:n.frameRate()}}return e.CANVAS_PARENT_CONTAINER_ID="p5js-parent",e.\u0275fac=function(n){return new(n||e)(t.Y36(m.gz),t.Y36(t.sBO))},e.\u0275cmp=t.Xpm({type:e,selectors:[["app-routed-sketch-page"]],viewQuery:function(n,o){if(1&n&&t.Gf(U,5,t.SBq),2&n){let r;t.iGM(r=t.CRH())&&(o.actionDrawerElement=r.first)}},features:[t.qOj],decls:10,vars:11,consts:[[3,"hasBackdrop"],["id","action-drawer","mode","over","position","end",3,"openedStart","closedStart"],["actionDrawer",""],[3,"frameRate","controls","redraw","download",4,"ngIf"],[3,"ngStyle"],["drawerContent",""],["id","p5js-parent",1,"mat-elevation-z24"],["mat-icon-button","","class","action-drawer-button",3,"right","click",4,"ngIf"],[3,"frameRate","controls","redraw","download"],["mat-icon-button","",1,"action-drawer-button",3,"click"]],template:function(n,o){if(1&n&&(t.TgZ(0,"mat-drawer-container",0)(1,"mat-drawer",1,2),t.NdJ("openedStart",function(){return o.drawerOpenedChange(!0)})("closedStart",function(){return o.drawerOpenedChange(!1)}),t.YNc(3,j,1,2,"app-sketch-controls",3),t.ALo(4,"async"),t.qZA(),t.TgZ(5,"mat-drawer-content",4,5),t._UZ(7,"div",6),t.YNc(8,Y,4,5,"button",7),t.ALo(9,"async"),t.qZA()()),2&n){let r;t.Q6J("hasBackdrop",!1),t.xp6(3),t.Q6J("ngIf",null==(r=t.lcZ(4,4,o.sketch$))?null:r.controls),t.xp6(2),t.Q6J("ngStyle",t.WLB(8,W,o.route.snapshot.data.width?"1fr auto 1fr":"1fr "+o.DEFAULT_CANVAS_WIDTH+" 1fr",o.route.snapshot.data.height?"1fr auto 1fr":"1fr "+o.DEFAULT_CANVAS_HEIGHT+" 1fr")),t.xp6(3),t.Q6J("ngIf",t.lcZ(9,6,o.showActionDrawerButton$))}},directives:[w.kh,w.jA,s.O5,H,w.LW,s.PC,x.lW,A.Hw],pipes:[s.Ov],styles:["mat-drawer-container[_ngcontent-%COMP%]{width:100%;height:100%}mat-drawer-content[_ngcontent-%COMP%]{width:100%;height:100%;display:grid}mat-drawer-content[_ngcontent-%COMP%]   #p5js-parent[_ngcontent-%COMP%]{grid-column:2/3;grid-row:2/3}.action-drawer-button[_ngcontent-%COMP%]{position:absolute;top:50%}"]}),e})()},8185:(v,d,c)=>{c.d(d,{n:()=>t});const t=178},5961:(v,d,c)=>{c.d(d,{$:()=>_});var t=c(8917),m=c(5265);function _(h,i){var g,f;const p=(0,m.A)(null==(null==i?void 0:i.containerId)?t.X:i.containerId),u=h.createCanvas(null!==(g=null==i?void 0:i.width)&&void 0!==g?g:p.clientWidth,null!==(f=null==i?void 0:i.height)&&void 0!==f?f:p.clientHeight,(null==i?void 0:i.useSvg)?h.SVG:void 0);return u.parent(p.id),u}},5265:(v,d,c)=>{c.d(d,{A:()=>m});var t=c(8917);function m(_){return null==_&&(_=t.X),document.getElementById(_)}}}]);