'use client'
import {useState} from "react";
import axios from "axios";

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [originalUrl, setOriginalUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setShortUrl("");

    try{
      const response = await axios.post('http://localhost:8080/api/v1/url/shorten', {
        originalUrl: originalUrl
      });

      const data = response.data.shortUrl || response.data;

      setShortUrl(data);
    } catch(error) {
        console.error(error);
      setError("Lỗi khi tạo shortUrl");
    } finally {
      setLoading(false);
    }

  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6 bg-gray-900 text-white">
      <div className="z-10 w-full max-w-3xl items-center justify-between font-mono text-sm flex flex-col gap-10">
        
        {/* TIÊU ĐỀ 7 MÀU */}
        <h1 className="text-4xl md:text-6xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 drop-shadow-lg">
          🚀 URL SHORTENER
        </h1>

        {/* KHUNG NHẬP LIỆU */}
        <div className="w-full p-8 bg-gray-800/50 backdrop-blur-md rounded-2xl shadow-2xl border border-gray-700">
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div className="flex flex-col gap-2">
              <label className="text-gray-300 font-semibold ml-1">Dán đường link dài của bạn:</label>
              <input
                type="url"
                required
                placeholder="https://example.com/super-long-link..."
                className="p-4 rounded-xl bg-gray-900/80 border border-gray-600 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 text-white transition-all"
                value={originalUrl}
                onChange={(e) => setOriginalUrl(e.target.value)}
              />
            </div>
            
            <button 
              type="submit" 
              disabled={loading}
              className="p-4 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-bold text-lg shadow-lg hover:shadow-purple-500/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? '⏳ Đang xử lý...' : '✨ RÚT GỌN NGAY'}
            </button>
          </form>

          {/* HIỂN THỊ LỖI */}
          {error && (
            <div className="mt-6 p-4 bg-red-500/10 border border-red-500/50 text-red-200 rounded-xl text-center animate-pulse">
              {error}
            </div>
          )}

          {/* HIỂN THỊ KẾT QUẢ */}
          {shortUrl && (
            <div className="mt-8 p-6 bg-green-500/10 border border-green-500/30 rounded-xl flex flex-col items-center gap-3 animate-fade-in-up">
              <span className="text-green-400 font-medium uppercase tracking-wider text-xs">Link của bạn đã sẵn sàng:</span>
              <div className="flex items-center gap-3 bg-gray-900 px-4 py-2 rounded-lg border border-gray-700 w-full justify-center">
                <a 
                  href={shortUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-xl md:text-2xl text-blue-400 font-bold underline decoration-blue-400/30 hover:text-blue-300 break-all text-center"
                >
                  {shortUrl}
                </a>
              </div>
              <p className="text-gray-500 text-xs mt-2">Click vào link để mở thử nhé!</p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
