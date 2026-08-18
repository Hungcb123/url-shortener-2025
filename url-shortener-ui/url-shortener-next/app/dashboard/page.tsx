'use client'
import { useEffect, useState } from "react";
import axios from 'axios';
interface UrlData{
    id: string;
    originalUrl: string;
    shortCode: string;
    clickCount: number;
    createAt?: string;
}

export default function DashboardPage(){
    const [loading, setLoading] = useState(false);
    const [urls, setUrls] = useState<UrlData[]>([]);
    useEffect( () => {
        const handleGetAllUrls = async () => {
            setLoading(true);
            try{
                const response = await axios.get('http://localhost:8080/api/v1/url', { withCredentials: true });
                setUrls(response.data);
            } catch(error) {
                console.log("Error in get all url dashboard" + error);
            } finally {
                setLoading(false);
            }
        }
        handleGetAllUrls()
    }, []);
    return (
    <div className="min-h-screen p-8 bg-slate-100 text-gray-900 pt-24"> 
      <div className="max-w-6xl mx-auto">
        <h1 className="text-5xl 
                        font-bold mb-7 
                      tracking-tight
                      text-gray-800">
           Dash board
        </h1>

        {loading ? (
          <p className="text-center text-gray-400">Loading...</p>
        ) : (
          <div className="overflow-x-auto bg-slate-300/40 rounded-xl border border-slate-300 shadow-xl backdrop-blur-sm">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="text-black border-b border-slate-300 text-sm uppercase tracking-wider">
                  <th className="p-4 font-bold">Original Link</th>
                  <th className="p-4 font-bold">Short Url</th>
                  <th className="p-4 font-bold text-center">Click count</th>
                  <th className="p-4 font-bold text-right">Test Click</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-300 text-sm">
                {urls.map((url) => (
                  <tr key={url.id} className="hover:bg-white/5 transition duration-150">
                    <td className="p-4 max-w-xs truncate text-black" title={url.originalUrl}>
                      {url.originalUrl}
                    </td>
                    <td className="p-4">
                      <span className="px-2 py-1 border-gray-100/20 
                      text-black rounded border 
                      border-gray-900/30 font-mono">
                        {url.shortCode}
                      </span>
                    </td>
                    <td className="p-4 text-center font-bold text-black">
                      {url.clickCount}  click
                    </td>
                    <td className="p-4 text-right">
                      <a 
                        href={`http://localhost:8080/${url.shortCode}`} 
                        target="_blank"
                        className="text-black hover:text-blue-300 underline"
                      >
                        Test Link
                      </a>
                    </td>
                  </tr>
                ))}
                
                {urls.length === 0 && (
                   <tr>
                     <td colSpan={4} className="p-8 text-center text-gray-500">
                        Chưa có link nào được tạo. Hãy ra trang chủ tạo thử đi!
                     </td>
                   </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )

}
