"use strict";(self.webpackChunkng_p5js_sketches=self.webpackChunkng_p5js_sketches||[]).push([[75],{9075:(U,d,r)=>{r.r(d),r.d(d,{Grid3StaticModule:()=>m});var O=r(9808),R=r(8555),g=r(7755),M=r(2271),u=r(5961),e=r(2215),f=r(8185),i=r(881);const c={title:"Bezier Grid 3 (static)",width:800,height:800,controls:{refreshButton:!0},func:t=>{const s=[],a=[];t.setup=()=>{(0,u.$)(t,{width:c.width,height:c.height}),t.background(e.y),t.stroke(f.n),t.noFill(),function F(){t.background(e.y);const A=t.width/25,N=t.height/25;for(let o=-4;o<=29;o++)s.push({x:o*A,y:0});for(let o=-4;o<=29;o++)a.push({x:0,y:o*N});let h,D;s.forEach((o,n)=>{n<3||n>s.length-1-3||(h={x:t.random(s[n-3].x,s[n+3].x),y:t.random(0,t.height/2)},D={x:t.random(s[n-3].x,s[n+3].x),y:t.random(t.height/2,t.height)},(0,i.W)(t,o,h,D,Object.assign(Object.assign({},o),{y:t.height})))}),a.forEach((o,n)=>{n<3||n>a.length-1-3||(h={x:t.random(0,t.width/2),y:t.random(a[n-3].y,a[n+3].y)},D={x:t.random(t.width/2,t.width),y:t.random(a[n-3].y,a[n+3].y)},(0,i.W)(t,o,h,D,Object.assign(Object.assign({},o),{x:t.width})))})}()}}};var G=r(5e3);let m=(()=>{class t{}return t.\u0275fac=function(l){return new(l||t)},t.\u0275mod=G.oAB({type:t}),t.\u0275inj=G.cJS({imports:[[O.ez,M.m,R.Bz.forRoot([{path:"",component:g.k,data:c}])]]}),t})()}}]);