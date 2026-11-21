import {useState,useEffect,useMemo} from 'react'
import {PRODUCTS,CATS,STORE,WA,rs,off} from './data'
import {Watch} from './components/Watch'
import {Art,L,Plx,Rev,Card} from './components/ui'
import Checkout from './components/Checkout'

export default function App(){
 const [page,setPage]=useState((location.hash||"#home").slice(1));
 const [cart,setCart]=useState(()=>{try{return JSON.parse(localStorage.getItem("cart2")||"[]")}catch(e){return[]}});
 const [drawer,setDrawer]=useState(false);const [sel,setSel]=useState(null);
 const [cat,setCat]=useState("All");const [q,setQ]=useState("");const [toast,setToast]=useState("");
 useEffect(()=>{
  const h=()=>{setPage((location.hash||"#home").slice(1));window.scrollTo(0,0)};
  const m=e=>{const s=document.documentElement.style;s.setProperty("--mx",(e.clientX/innerWidth-.5).toFixed(3));s.setProperty("--my",(e.clientY/innerHeight-.5).toFixed(3));s.setProperty("--gx",e.clientX+"px");s.setProperty("--gy",e.clientY+"px")};
  addEventListener("hashchange",h);addEventListener("mousemove",m);return()=>{removeEventListener("hashchange",h);removeEventListener("mousemove",m)}},[]);
 useEffect(()=>{try{localStorage.setItem("cart2",JSON.stringify(cart))}catch(e){}},[cart]);
 const go=p=>{location.hash=p;setDrawer(false);setSel(null)};
 const add=(p,n=1)=>{setCart(c=>c.find(i=>i.id===p.id)?c.map(i=>i.id===p.id?{...i,qty:i.qty+n}:i):[...c,{id:p.id,qty:n}]);setToast("Added to cart");setTimeout(()=>setToast(""),1600)};
 const setQty=(id,d)=>setCart(c=>c.map(i=>i.id===id?{...i,qty:i.qty+d}:i).filter(i=>i.qty>0));
 const lines=cart.map(i=>({...PRODUCTS.find(p=>p.id===i.id),qty:i.qty}));
 const total=lines.reduce((s,l)=>s+l.price*l.qty,0);const count=cart.reduce((s,i)=>s+i.qty,0);
 const list=useMemo(()=>PRODUCTS.filter(p=>(cat==="All"||p.brand===cat)&&p.name.toLowerCase().includes(q.toLowerCase())),[cat,q]);
 const nav=["home","shop","about"];

 return(<div>
 <header className="sticky top-0 z-30 backdrop-blur-xl bg-[#12080bcc] border-b border-champ/10">
  <div className="max-w-6xl mx-auto px-5 h-16 flex items-center justify-between">
   <a href="#home" className="font-serif text-3xl tracking-wide">Farheesh<span className="text-olive-300 italic"> Store</span></a>
   <nav className="hidden sm:flex gap-10 text-xs uppercase tracking-[.25em]">{nav.map(l=><a key={l} href={"#"+l} className={`pb-1 border-b transition ${page===l?"border-olive-300 text-olive-300":"border-transparent hover:text-olive-300"}`}>{l}</a>)}</nav>
   <button onClick={()=>setDrawer(true)} className="text-xs uppercase tracking-[.25em] border border-champ/30 rounded-full px-5 py-2 hover:bg-champ/10 transition">Cart · {count}</button></div>
  <nav className="sm:hidden flex justify-center gap-8 pb-2 text-[11px] uppercase tracking-[.25em]">{nav.map(l=><a key={l} href={"#"+l}>{l}</a>)}</nav>
 </header>

 <main key={page}>
 {page==="home"&&<>
  <Plx className="min-h-[90vh] flex items-center overflow-hidden">
   <L d={-30} className="inset-0 flex items-center justify-center pointer-events-none"><span className="font-serif text-[22vw] leading-none opacity-[.05] select-none whitespace-nowrap">FARHEESH</span></L>
   <div className="max-w-6xl mx-auto px-5 w-full grid md:grid-cols-2 gap-6 items-center relative">
    <div className="relative z-10 py-10"><Rev><p className="text-[11px] uppercase tracking-[.4em] text-olive-300">Farheesh Store · Luxury Watches</p></Rev>
     <Rev delay={120}><h1 className="font-serif text-6xl sm:text-8xl leading-[.95] mt-5">Time, <em className="text-wine-300">worn</em><br/>with intent.</h1></Rev>
     <Rev delay={240}><p className="mt-6 max-w-md opacity-70 font-light">Mechanical, automatic and quartz watches from Seagull, OLEVS, POEDAGAR and SMAEL. Order in a minute — we confirm on WhatsApp.</p></Rev>
     <Rev delay={360}><div className="mt-9 flex gap-4"><button onClick={()=>go("shop")} className="btn rounded-full px-9 py-4 text-sm tracking-wide">Shop watches</button><a href="#about" className="rounded-full px-9 py-4 text-sm border border-champ/30 hover:bg-champ/10 transition">Our promise</a></div></Rev></div>
    <div className="relative h-[460px] sm:h-[580px] p3 flex items-center justify-center">
     <L d={10} z={-120} className="left-[8%] top-[12%] w-[84%] h-[76%]"><div className="orbit w-full h-full"/></L>
     <L d={18} z={-60} className="left-[18%] top-[22%] w-[64%] h-[56%]"><div className="orbit w-full h-full" style={{animationDirection:"reverse",animationDuration:"30s"}}/></L>
     <L d={22} z={80} className="left-[22%] top-[22%]" style={{"--ry":"calc(var(--mx)*55deg - 20deg)","--rx":"calc(var(--my)*-35deg + 8deg)"}}><div className="flt"><Watch w={PRODUCTS[4].w} s={window.innerWidth<640?170:250}/></div></L>
     <L d={40} z={200} className="right-[2%] top-[4%]"><div className="flt" style={{animationDelay:"-3s"}}><Watch w={PRODUCTS[2].w} s={80}/></div></L>
     <L d={34} z={160} className="left-[0%] bottom-[8%]"><div className="flt" style={{animationDelay:"-1s"}}><Watch w={PRODUCTS[1].w} s={70}/></div></L></div>
   </div></Plx>

  <div className="border-y border-champ/10 py-5 overflow-hidden"><div className="flex w-max font-serif text-3xl italic opacity-60" style={{animation:"mq 30s linear infinite"}}>
   {[0,1].map(k=><div key={k} className="flex gap-12 pr-12 whitespace-nowrap">{["Seagull","·","OLEVS","·","POEDAGAR","·","SMAEL","·","Cash on Delivery","·","WhatsApp Confirmation","·"].map((t,i)=><span key={i}>{t}</span>)}</div>)}</div></div>

  <div className="max-w-6xl mx-auto px-5 py-24"><Rev><p className="text-[11px] uppercase tracking-[.4em] text-olive-300">Selected</p><h2 className="font-serif text-5xl mt-2">Featured timepieces</h2></Rev>
   <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">{PRODUCTS.slice(0,4).map((p,i)=><Card key={p.id} p={p} i={i} open={setSel} add={add}/>)}</div></div>

  <Plx className="min-h-[90vh] flex items-center overflow-hidden my-10">
   <div className="max-w-6xl mx-auto px-5 w-full grid md:grid-cols-2 gap-10 items-center">
    <Rev><div className="line w-32 mb-8"/><h2 className="font-serif text-4xl sm:text-6xl leading-tight">Every angle,<br/><span className="text-olive-300 italic">every detail.</span></h2><p className="mt-6 opacity-60 font-light max-w-md">Scroll and the watch turns with you. Steel and gold cases, luminous dials, sapphire and skeleton movements — chosen for people who notice the small things.</p></Rev>
    <div className="h-[380px] flex items-center justify-center" style={{"--ry":"calc(var(--p)*-220deg)","--rx":"-10deg"}}><Watch w={PRODUCTS[5].w} s={window.innerWidth<640?190:270}/></div></div></Plx>

  <div className="max-w-6xl mx-auto px-5 pb-24"><Rev><h2 className="font-serif text-5xl">The full collection</h2></Rev>
   <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">{PRODUCTS.slice(4).map((p,i)=><Card key={p.id} p={p} i={i} open={setSel} add={add}/>)}</div></div>
 </>}

 {page==="shop"&&<div className="max-w-6xl mx-auto px-5 py-16">
  <h1 className="font-serif text-7xl">Shop</h1>
  <div className="flex flex-wrap gap-3 items-center mt-6 mb-10">
   {CATS.map(c=><button key={c} onClick={()=>setCat(c)} className={`px-5 py-2 rounded-full text-xs uppercase tracking-widest border transition ${cat===c?"bg-wine-600 border-wine-600":"border-champ/25 hover:border-olive-300"}`}>{c}</button>)}
   <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Search watches…" className="sm:ml-auto bg-transparent border border-champ/25 rounded-full px-5 py-2 text-sm outline-none focus:border-olive-300 w-full sm:w-64"/></div>
  {list.length?<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">{list.map((p,i)=><Card key={p.id+cat} p={p} i={i} open={setSel} add={add}/>)}</div>:<p className="text-center opacity-50 py-20">No watches found.</p>}
 </div>}

 {page==="about"&&<div className="max-w-2xl mx-auto px-5 py-20 text-center">
  <Rev><h1 className="font-serif text-6xl">About Farheesh Store</h1><p className="mt-5 opacity-70 font-light">We bring carefully selected watches to your doorstep. Place your order, we confirm on WhatsApp, and we ship it to you.</p></Rev>
  <Rev delay={150}><div className="card rounded-3xl p-8 mt-10"><h3 className="font-serif text-3xl">Contact</h3><p className="mt-2 opacity-60 text-sm">Questions? Message us on WhatsApp.</p><a target="_blank" rel="noopener" href={`https://wa.me/${WA}`} className="btn inline-block mt-5 rounded-full px-8 py-3 text-sm">Chat on WhatsApp</a></div>
   <div className="mt-6 text-left text-sm opacity-70 space-y-2 card rounded-3xl p-8"><p><b className="text-olive-300">Delivery</b> — 3–10 working days depending on city.</p><p><b className="text-olive-300">Payment</b> — Cash on Delivery.</p><p><b className="text-olive-300">Returns</b> — Contact us within 7 days for damaged or wrong items.</p></div></Rev></div>}

 {page==="checkout"&&<Checkout lines={lines} total={total} clear={()=>setCart([])} go={go}/>}
 </main>

 <footer className="border-t border-champ/10 py-12 text-center text-sm opacity-60"><p className="font-serif text-3xl">Farheesh <span className="text-olive-300 italic">Store</span></p><p className="mt-2">© 2026 {STORE}. Luxury watches.</p></footer>

 {toast&&<div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 card bg-[#12080b] rounded-full px-6 py-3 text-sm">{toast}</div>}

 {sel&&<div className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4" onClick={()=>setSel(null)}>
  <div className="card bg-[#1a0d11] rounded-3xl max-w-md w-full p-6 max-h-[92vh] overflow-y-auto" onClick={e=>e.stopPropagation()}>
   <Art p={sel} s={150} className="h-72"/>
   <p className="text-[11px] uppercase tracking-[.25em] text-olive-300 mt-5">{sel.brand}</p><h3 className="font-serif text-2xl leading-snug">{sel.name}</h3>
   <p className="opacity-60 text-sm mt-2">{sel.desc}</p>
   <div className="flex flex-wrap gap-2 mt-3">{sel.specs.map(s=><span key={s} className="text-[11px] border border-olive-300/40 text-olive-300 rounded-full px-3 py-1">{s}</span>)}</div>
   <div className="flex items-baseline gap-3 mt-4"><span className="text-xl">{rs(sel.price)}</span><s className="text-sm opacity-40">{rs(sel.old)}</s></div>
   <div className="flex gap-3 mt-5"><button onClick={()=>{add(sel);setSel(null);setDrawer(true)}} className="btn flex-1 rounded-full py-3">Add to cart</button><button onClick={()=>setSel(null)} className="px-6 border border-champ/25 rounded-full">Close</button></div></div></div>}

 {drawer&&<div className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm" onClick={()=>setDrawer(false)}>
  <aside className="absolute right-0 top-0 h-full w-full max-w-sm bg-[#170a0e] border-l border-champ/10 p-6 flex flex-col" onClick={e=>e.stopPropagation()}>
   <div className="flex justify-between items-center"><h3 className="font-serif text-3xl">Your cart</h3><button onClick={()=>setDrawer(false)} className="text-3xl leading-none">×</button></div>
   <div className="flex-1 overflow-y-auto mt-5 space-y-3">{lines.length?lines.map(l=><div key={l.id} className="flex gap-4 items-center card rounded-2xl p-3">
     <div className="w-16 h-16 flex items-center justify-center scene overflow-hidden"><Watch w={l.w} s={34}/></div>
     <div className="flex-1 text-sm"><p className="leading-snug">{l.name}</p><p className="text-olive-300 mt-1">{rs(l.price)}</p>
      <div className="flex items-center gap-3 mt-1"><button onClick={()=>setQty(l.id,-1)} className="w-6 h-6 rounded-full border border-champ/30">−</button>{l.qty}<button onClick={()=>setQty(l.id,1)} className="w-6 h-6 rounded-full border border-champ/30">+</button></div></div></div>):<p className="text-center opacity-50 mt-20">Your cart is empty.</p>}</div>
   <div className="border-t border-champ/10 pt-4"><div className="flex justify-between"><span className="opacity-60">Total</span><span className="text-lg">{rs(total)}</span></div>
    <button disabled={!lines.length} onClick={()=>go("checkout")} className="btn disabled:opacity-40 mt-4 w-full rounded-full py-3">Checkout</button></div></aside></div>}
 </div>)}

