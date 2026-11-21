import { useState } from "react";
import { STORE, WA, rs } from "../data";

export default function Checkout({ lines, total, clear, go }) {
  const [f, setF] = useState({
    name: "",
    phone: "",
    city: "",
    address: "",
    note: "",
  });
  const [err, setErr] = useState({});
  const [done, setDone] = useState(false);
  const ch = (e) => setF({ ...f, [e.target.name]: e.target.value });
  const submit = () => {
    const e = {};
    if (f.name.trim().length < 3) e.name = "Enter your full name";
    if (!/^(\+?92|0)3\d{9}$/.test(f.phone.replace(/[\s-]/g, "")))
      e.phone = "Enter a valid mobile number (e.g. 03001234567)";
    if (!f.city.trim()) e.city = "City is required";
    if (f.address.trim().length < 8) e.address = "Enter your complete address";
    setErr(e);
    if (Object.keys(e).length) return;
    const msg =
      `*New Order – ${STORE}*\n\n*Name:* ${f.name}\n*Phone:* ${f.phone}\n*City:* ${f.city}\n*Address:* ${f.address}\n*Note:* ${f.note || "-"}\n\n*Items:*\n` +
      lines
        .map(
          (l, i) => `${i + 1}. ${l.name} x ${l.qty} = ${rs(l.price * l.qty)}`,
        )
        .join("\n") +
      `\n\n*Total:* ${rs(total)}\n*Payment:* Cash on Delivery`;
    window.open(
      `https://wa.me/${WA}?text=${encodeURIComponent(msg)}`,
      "_blank",
    );
    clear();
    setDone(true);
  };
  if (done)
    return (
      <div className="text-center py-28 px-5">
        <h2 className="font-serif text-6xl">Order sent</h2>
        <p className="opacity-60 mt-3">
          Your order opened in WhatsApp. Press send there to confirm it.
        </p>
        <button
          onClick={() => go("shop")}
          className="btn mt-8 rounded-full px-9 py-3"
        >
          Continue shopping
        </button>
      </div>
    );
  if (!lines.length)
    return (
      <div className="text-center py-28">
        <p className="opacity-50">Your cart is empty.</p>
        <button
          onClick={() => go("shop")}
          className="btn mt-6 rounded-full px-9 py-3"
        >
          Go to shop
        </button>
      </div>
    );
  const inp = (k) =>
    `w-full mt-2 bg-white/5 border ${err[k] ? "border-red-400" : "border-champ/20"} rounded-2xl px-4 py-3 outline-none focus:border-olive-300 transition normal-case tracking-normal text-base`;
  return (
    <div className="max-w-6xl mx-auto px-5 py-16 grid md:grid-cols-5 gap-10">
      <div className="md:col-span-3">
        <h1 className="font-serif text-6xl">Checkout</h1>
        <div className="mt-8 space-y-5 text-xs uppercase tracking-widest">
          {[
            ["name", "Full name", "text"],
            ["phone", "Phone / WhatsApp", "tel"],
            ["city", "City", "text"],
          ].map(([k, l, t]) => (
            <label key={k} className="block">
              {l}
              <input
                name={k}
                type={t}
                value={f[k]}
                onChange={ch}
                className={inp(k)}
              />
              {err[k] && (
                <span className="text-red-400 normal-case tracking-normal">
                  {err[k]}
                </span>
              )}
            </label>
          ))}
          <label className="block">
            Complete address
            <textarea
              name="address"
              rows="3"
              value={f.address}
              onChange={ch}
              className={inp("address")}
            />
            {err.address && (
              <span className="text-red-400 normal-case tracking-normal">
                {err.address}
              </span>
            )}
          </label>
          <label className="block">
            Order note (optional)
            <input
              name="note"
              value={f.note}
              onChange={ch}
              className={inp("note")}
            />
          </label>
        </div>
      </div>
      <div className="md:col-span-2">
        <div className="card rounded-3xl p-6 md:sticky md:top-24">
          <h3 className="font-serif text-3xl">Order summary</h3>
          <div className="mt-4 space-y-2 text-sm">
            {lines.map((l) => (
              <div key={l.id} className="flex justify-between gap-3">
                <span className="opacity-70">
                  {l.name} × {l.qty}
                </span>
                <span className="whitespace-nowrap">{rs(l.price * l.qty)}</span>
              </div>
            ))}
          </div>
          <div className="flex justify-between border-t border-champ/10 mt-5 pt-4">
            <span>Total · COD</span>
            <span className="text-xl text-olive-300">{rs(total)}</span>
          </div>
          <button
            onClick={submit}
            className="btn mt-6 w-full rounded-full py-4"
          >
            Place order via WhatsApp
          </button>
          <p className="text-xs opacity-50 mt-3 text-center">
            Opens WhatsApp with your order — press send to confirm.
          </p>
        </div>
      </div>
    </div>
  );
}
