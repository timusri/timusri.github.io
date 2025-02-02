import Link from 'next/link';

export default function Footer() {
    return (
        <footer className="border-t border-[#2c2e33] mt-auto">
            <div className="max-w-4xl mx-auto px-4 py-6">
                <div className="flex justify-center space-x-6">
                    <Link
                        href="/"
                        className="text-[#98c379] hover:text-[#b5e890] transition-colors duration-200"
                    >
                        Home
                    </Link>
                    <Link
                        href="/blog"
                        className="text-[#98c379] hover:text-[#b5e890] transition-colors duration-200"
                    >
                        Blog
                    </Link>

                </div>
            </div>
        </footer>
    );
} 