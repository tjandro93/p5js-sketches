"use strict";(self.webpackChunkng_p5js_sketches=self.webpackChunkng_p5js_sketches||[]).push([[333],{8333:(D,d,n)=>{n.r(d),n.d(d,{Grid1Module:()=>R});var G=n(9808),I=n(8555),m=n(7755),v=n(2271),C=n(5961),s=n(2215),E=n(8185);const r={title:"Bezier Grid 1",width:600,height:600,controls:{refreshButton:!0},func:o=>{const i=[],a=[];o.setup=()=>{(0,C.$)(o,{width:r.width,height:r.height}),o.background(s.y),o.stroke(E.n),o.noFill(),function S(){o.background(s.y);const y=o.width/10,z=o.height/10,l=o.width/2,u=o.height/2,f=o.width/2,g=o.height/2;for(let t=0;t<=10;t++)i.push(t*y);for(let t=0;t<=10;t++)a.push(t*z);i.forEach(t=>{o.bezier(t,0,l,u,f,g,t,o.height)}),a.forEach(t=>{o.bezier(0,t,l,u,f,g,o.width,t)})}()}}};var e=n(5e3);let R=(()=>{class o{}return o.\u0275fac=function(c){return new(c||o)},o.\u0275mod=e.oAB({type:o}),o.\u0275inj=e.cJS({imports:[[G.ez,v.m,I.Bz.forRoot([{path:"",component:m.k,data:r}])]]}),o})()}}]);