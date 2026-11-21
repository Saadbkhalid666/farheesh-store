import {useState,useEffect,useRef} from 'react'
import {Watch} from './Watch'
import {rs,off} from '../data'

export function Art({p,s=110,className="h-64"}){
 const [v,setV]=useState({});
 const mv=e=>{const b=e.currentTarget.getBoundingClientRect(),x=(e.clientX-b.left)/b.width-.5,y=(e.clientY-b.top)/b.height-.5;setV({"--ry":-26+x*70+"deg","--rx":8-y*40+"deg"})};
 return <div className={`relative scene flex items-center justify-center overflow-hidden rounded-2xl ${className}`} style={{background:"radial-gradient(circle at 50% 45%,#ffffff14,transparent 68%)",...v}} onMouseMove={mv} onMouseLeave={()=>setV({})}>
  <div className="flt" style={{animationDelay:p.id*-.7+"s"}}><Watch w={p.w} s={s}/></div></div>}

export function L({d=10,z=0,className="",style,children}){return <div className={"absolute "+className} style={{transform:`translate3d(calc(var(--mx)*${d}px),calc(var(--my)*${d}px - var(--p,0)*${d*4}px),${z}px)`,transition:"transform .25s ease-out",...style}}>{children}</div>}
export function Plx({className="",children}){
 const r=useRef();
 useEffect(()=>{const f=()=>{const b=r.current.getBoundingClientRect();r.current.style.setProperty("--p",((b.top+b.height/2-innerHeight/2)/innerHeight).toFixed(3))};f();addEventListener("scroll",f,{passive:true});return()=>removeEventListener("scroll",f)},[]);
 return <section ref={r} className={"relative scene "+className}>{children}</section>}
export function Rev({children,delay=0,className=""}){
 const r=useRef();
 useEffect(()=>{const o=new IntersectionObserver(([e])=>{if(e.isIntersecting){r.current.classList.add("in");o.disconnect()}},{threshold:.12});o.observe(r.current);return()=>o.disconnect()},[]);
 return <div ref={r} className={"rev "+className} style={{transitionDelay:delay+"ms"}}>{children}</div>}

export function Card({p,open,add,i=0}){
 const [t,setT]=useState("");
 const mv=e=>{const b=e.currentTarget.getBoundingClientRect(),x=(e.clientX-b.left)/b.width-.5,y=(e.clientY-b.top)/b.height-.5;setT(`perspective(900px) rotateY(${x*8}deg) rotateX(${-y*8}deg)`)};
 return <Rev delay={(i%4)*90}><div className="card rounded-3xl p-4" style={{transform:t}} onMouseMove={mv} onMouseLeave={()=>setT("")}>
  <div className="relative cursor-pointer" onClick={()=>open(p)}><Art p={p}/><span className="absolute top-3 left-3 text-[11px] tracking-widest border border-champ/30 rounded-full px-3 py-1 backdrop-blur">−{off(p)}%</span></div>
  <div className="px-1 pt-4"><p className="text-[11px] uppercase tracking-[.25em] text-olive-300">{p.brand}</p>
   <h3 className="font-serif text-xl mt-1 leading-snug min-h-[3.2rem]">{p.name}</h3>
   <div className="flex items-baseline gap-2 mt-2"><span className="font-medium">{rs(p.price)}</span><s className="text-xs opacity-40">{rs(p.old)}</s></div>
   <button onClick={()=>add(p)} className="btn mt-4 w-full rounded-full py-3 text-sm tracking-wide">Add to cart</button></div></div></Rev>}

