import ShortenForm from "./components/ShortenForm"
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center pt-60 bg-slate-100 text-black">
      <div className="z-10 w-full max-w-3xl items-center justify-between font-mono text-sm flex flex-col gap-10">
        
        {/* TIÊU ĐỀ 7 MÀU */}
        <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight text-slate-900">
          URL SHORTENER
        </h1>
        <p className="text-lg text-slate-500 max-w-2xl mx-auto">
            A fast link shortener
        </p>
        <ShortenForm />
      </div>
    </main>
  );
}
