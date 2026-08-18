'use client'
import {useState} from 'react';
import type { FormEvent } from 'react';
import axios from 'axios';

export default function ShortenFrom(){
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [originalUrl, setOriginalUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [isCopied, setIsCopied] = useState(false);


  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shortUrl);

      setIsCopied(true);
      
      setTimeout(() => {
        setIsCopied(false);
      }, 2000);
    } catch(error) {
      console.log('Copy is unavailable'+error);
    }
  }

  const handleGetShortUrl = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try{
        if(originalUrl.trim() === ''){
          window.alert("Url can not empty!")
          throw new Error('Url cannot empty');
        }
        const response = await axios.post('http://localhost:8080/api/v1/url/shorten', {
            originalUrl: originalUrl
        }, { withCredentials: true });
        const data = response.data.shortUrl;
        setShortUrl(data);
        console.log("toi chay toi day roi");
    } catch(error) {
        setError("Error, please try again!")
        console.log(error);
    } finally {
        setLoading(false);
    }
  }
  return(
    <div> 
      <form
        onSubmit={handleGetShortUrl}
      >
        <div
          className="flex gap-5 items-center"
        >
          {/* <label className="text-gray-700 font-semibold ml-1">Your url</label> */}
          <input
            className="
              rounded-xl
              py-2 px-6
              h-10

              placeholder:text-gray-400
              border border-slate-200
              bg-slate-200
              text-slate-700
              shadow-sm
              outline-none
              focus:outline-none 
            focus:bg-white 
            focus:border-purple-500 
              focus:ring-4 focus:ring-purple-500/10
              transition-all duration-200 
            "
            type='url'
            placeholder='https://www.example.com/super-long'
            value={originalUrl}
            onChange={ (e) => setOriginalUrl(e.target.value)}
          />
          <button 
            className="
              rounded-xl
              py-2 px-6
              h-10
              text-gray-900
              font-semibold
              bg-slate-200
              hover:opacity-50 hover:bg-gray-300 hover:border-gray-400
              transition-all duration-200
              disabled:opacity-50 disabled:cursor-not-allowed
              shadow-sm
            "
            type='submit'
            disabled={loading}
          >
            {loading ? 'Executing...' : 'Shoten now'}
          </button>
        </div>

        {shortUrl && (
          <div
            className='flex mt-6 items-center justify-center'
          >
            {/* <span
              className="text-gray-300 font-semibold ml-1 pr-3"
            >Short url: </span> */}
            <a
              className='text-white-300'
              href={shortUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              {shortUrl}
            </a>
            <button 
              onClick={handleCopy}
              className="group relative p-2 rounded-lg hover:bg-white/10 transition-all duration-200"
              title="Copy to clipboard"
            >
              {isCopied ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"        stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-400">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400 group-hover:text-white transition-colors">
                  <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                  <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                </svg>
              )}
            </button>
            
          </div>
        )}

        {error && <p className="mt-4 text-center text-red-600">{error}</p>}

        
      </form>



    </div>
  );
}
