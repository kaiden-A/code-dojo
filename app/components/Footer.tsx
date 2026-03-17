"use client"


export default function Footer(){
 
    
    return(
        <footer className="py-8 sm:py-12 px-4 sm:px-6 border-t border-wood/10 bg-parchment" data-purpose="footer">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 sm:gap-6">
                <div className="flex items-center space-x-2">
                <div className="flex items-center space-x-3 shrink-0">
                    
                    {/* The New Image/Logo */}
                    <img 
                        src="/icon.png" 
                        alt="Dojo Icon" 
                        className="w-6 h-6 sm:w-8 sm:h-8 object-contain"
                    />

                    {/* The Brand Text */}
                    <span className="font-serif text-xl sm:text-2xl font-bold tracking-tighter">
                        codeDojo
                    </span>
                    </div>
            <div className="hidden md:flex space-x-8 text-sm font-medium uppercase tracking-widest"></div>
                <p className="text-xs text-gray-500 ml-4 hidden sm:block">A MOTION-U INITIATIVE © 2026</p>
                </div>
                <div className="flex flex-wrap justify-center space-x-4 sm:space-x-8 text-xs sm:text-sm text-gray-400">
                <a className="hover:text-brand transition-colors" href="#">Privacy Scrolls</a>
                <a className="hover:text-brand transition-colors" href="#">Terms of Dojo</a>
                <a className="hover:text-brand transition-colors" href="#">Contact</a>
                </div>
                <div className="flex space-x-3 sm:space-x-4">
                <div className="w-8 h-8 sm:w-10 sm:h-10 border border-wood/10 rounded-full flex items-center justify-center hover:bg-brand/10 transition-colors cursor-pointer"><span className="text-[0.6rem] sm:text-xs font-bold">TW</span></div>
                <div className="w-8 h-8 sm:w-10 sm:h-10 border border-wood/10 rounded-full flex items-center justify-center hover:bg-brand/10 transition-colors cursor-pointer"><span className="text-[0.6rem] sm:text-xs font-bold">GH</span></div>
                </div>
                
                <p className="text-xs text-gray-500 mt-2 sm:hidden">A MOTION-U INITIATIVE © 2026</p>
            </div>
            </footer>
    )
}