export default function Hero() {
  return (
    <section className="relative h-screen bg-linear-to-b bg-slate-950 text-white">
      <div className="pointer-events-none absolute inset-0 z-0 bg-[linear-gradient(to_right,#80808010_1px,transparent_1px),linear-gradient(to_bottom,#80808010_1px,transparent_1px)] bg-[size:40px_40px]" />

      <div className="absolute -left-5 -top-10 h-96 w-96 rounded-full bg-linear-to-br from-cyan-500/30 via-blue-600/20 to-violet-500/40 blur-[120px]" />

      <div className="absolute right-2 bottom-1 h-96 w-96 rounded-full bg-linear-to-br from-fuchsia-500/30 via-purple-600/20 to-pink-500/20 blur-[120px]" />
    </section>
  );
}
