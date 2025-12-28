import Link from 'next/link';

export default function Navbar(){
    return(
    <nav className='bg-white w-full '>
        <div className='max-w-7xl mx-auto h-16 px-6 items-center flex justify-between'>
            <div className='gap-14 flex items-center'>
            <Link href="/" className='text-3xl font-bold tracking-tight bg-gradient-to-br from-gray-900/50 via-gray-700 to-gray-400 bg-clip-text text-transparent'>
                UrlS
            </Link>

            <Link href="/" className='ml-10 text-black'>Home</Link>
            <Link href="/dashboard" className='text-black'>Dashboard</Link>
            </div>
            <div>
            <Link href="/login" className='gap-4 text-black border border-slate-100 rounded px-2 py-2'>Login</Link>
            </div>
        </div>

    </nav>
    // <nav className="fixed top-0 w-full z-50 bg-gray-900/80 backdrop-blur-md border-b border-gray-800">
    //   <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        
    //     {/* LOGO */}
    //     <Link href="/" className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
    //       🚀 URL Pro
    //     </Link>

    //     {/* MENU */}
    //     <div className="flex gap-8">
    //       <Link href="/">
    //         Rút gọn
    //       </Link>
    //       <Link href="/dashboard">
    //         Báo cáo
    //       </Link>
    //     </div>

    //     {/* LOGIN BUTTON (Để dành làm sau) */}
    //     <div className="flex gap-4">
    //         <button className="text-sm text-gray-400 hover:text-white">Login</button>
    //     </div>
    //   </div>
    // </nav>
    );
}

