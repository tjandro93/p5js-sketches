"use strict";(self.webpackChunkng_p5js_sketches=self.webpackChunkng_p5js_sketches||[]).push([[16],{5016:(O,v,n)=>{n.r(v),n.d(v,{Flow2InteractiveModule:()=>M});var F=n(9808),S=n(8555),z=n(7755),y=n(2271),e=n(1081),A=n(5961),h=n(2215),C=n(8185),P=n(881);const i=new e.NA("Pause"),w=new e.NA("Draw Once"),u=new e.zA("Flow line count",1,50,15,1),d=new e.zA("Flow count",1,50,15,1),a=new e.zA("Position noise step",0,5,.01,.001),r=new e.zA("Time noise step",0,.05,.001,1e-4),B={title:"Bezier Flow 2 (interactive)",controls:{customControls:[i,w,u,d,a,r]},func:o=>{let s=!0,t=0;function m(){o.background(h.y);const k=o.width/d.value;for(let l=0;l<=d.value;l++)I({x:k*l,y:0},l);function I(l,g){const N=o.width/u.value;for(let c=0;c<=u.value;c++){const j={x:o.width*o.noise(g*a.value,t*r.value),y:o.height*o.noise(c*a.value,t*r.value)},x={x:o.width*o.noise(c*a.value,t*r.value),y:o.height*o.noise(g*a.value,t*r.value)};(0,P.W)(o,l,j,x,{x:N*c,y:o.height})}}t++}o.setup=()=>{(0,A.$)(o),o.background(h.y),o.stroke(C.n,100),o.strokeWeight(1),o.noFill(),o.angleMode(o.DEGREES),w.onPress=()=>{m()},i.onPress=()=>{s=!s,i.label$.next(s?"Pause":"Run")}},o.draw=()=>{s&&m()}}};var f=n(5e3);let M=(()=>{class o{}return o.\u0275fac=function(t){return new(t||o)},o.\u0275mod=f.oAB({type:o}),o.\u0275inj=f.cJS({imports:[[F.ez,y.m,S.Bz.forRoot([{path:"",component:z.k,data:B}])]]}),o})()}}]);