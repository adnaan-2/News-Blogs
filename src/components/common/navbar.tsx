import Link from 'next/link';

const Navbar = () => {
    return (
        <nav className="flex justify-between items-center p-4 bg-gray-800 text-white">
            <div className="flex items-center">
                <img src="/logo.svg" alt="Logo" className="h-8 w-8 mr-2" />
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