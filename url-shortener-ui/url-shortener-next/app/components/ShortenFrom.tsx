'use client'
import {useState} from 'react';
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

  const handleGetShortUrl = async () => {
    setLoading(true);
    setError("");
    try{
        if(originalUrl.trim() === ''){
          throw new Error('Url cannot empty');
        }
        const response = await axios.post('http://localhost:8080/api/v1/url/shorten', {
            originalUrl: originalUrl
        });
        const data = response.data.shortUrl;
        setShortUrl(data);
    } catch(error) {
        setError("Error, please try again!")
        console.log(error);
    } finally {
        setLoading(false);
    }
  }
  return(
    <div> 
      <form>
        <div
          className="flex"
        >
          <label className="text-gray-300 font-semibold ml-1">Your url</label>
          <input
            className="
              rounded-xl
              py-2 px-6
              bg-gray-50 
              border-gray-200
              text-gray-900 placeholder:text-gray-400
              focus:outline-none 
            focus:bg-white 
            focus:border-purple-500 
              focus:ring-4 focus:ring-purple-500/10
              transition-all duration-200
            "
            type='url'
            placeholder='https://www.example.com/super-long'
            value={originalUrl}
            onKeyDown={handleGetShortUrl}
            onChange={ (e) => setOriginalUrl(e.target.value)}
          />
          <button 
            className="
              rounded-xl
              py-3 px-6
              text-gray-900
              font-semibold
              bg-white
              hover:opacity-50 hover:bg-gray-50 hover:border-gray-300
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
            className='flex'
          >
            <span
              className="text-gray-300 font-semibold ml-1"
            >Your short url</span>
            <a
              className=''
              href={shortUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              {shortUrl}
            </a>
            
          </div>
        )}

        
      </form>



    </div>
  );
}