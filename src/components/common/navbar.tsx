import Link from 'next/link';
import Image from 'next/image';

const Navbar = () => {
    return (
        <nav className="flex justify-between items-center p-4 bg-gray-800 text-white">
            <div className="flex items-center">
                <Image 
                  src="/logo.svg" 
                  alt="Logo" 
                  width={32} 
                  height={32} 
                  className="h-8 w-auto"
                />
                <span className="text-xl font-bold">News Blog</span>
            </div>
            <div className="flex space-x-4">
                <Link href="/login">
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        Login
                    </button>
                </Link>
                <Link href="/signup">
                    <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                        Signup
                    </button>
                </Link>
            </div>
        </nav>
    );
};

export default Navbar;