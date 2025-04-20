export default function Navbar() {
    return (
        <nav>
            <div className="flex justify-between items-center bg-blue-500 p-4 text-white">
                <div className="text-lg font-bold">C-G</div>
                <div className="space-x-4">
                    <a href="#" className="hover:text-blue-300">Home</a>
                    <a href="#" className="hover:text-blue-300">About</a>
                    <a href="#" className="hover:text-blue-300">Contact</a>
                </div>
            </div>
            <div className="bg-blue-300 h-1"></div>
        </nav>
    )
};
