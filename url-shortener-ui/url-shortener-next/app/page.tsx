import axios from "axios";
import ShortenForm from "./components/ShortenForm"
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6 bg-gray-900 text-white">
      <div className="z-10 w-full max-w-3xl items-center justify-between font-mono text-sm flex flex-col gap-10">
        
        {/* TIÊU ĐỀ 7 MÀU */}
        <h1 className="text-4xl md:text-6xl font-bold text-center text-transparent bg-clip-text bg-gray-200 drop-shadow-lg">
          URL SHORTENER
        </h1>
        <ShortenForm />
      </div>
    </main>
  );
}
