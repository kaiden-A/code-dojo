

export default function Header(){

    return(
        <nav className="fixed top-0 w-full z-50 bg-parchment/80 backdrop-blur-md border-b border-wood/10" data-purpose="main-nav">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 sm:h-20 flex items-center justify-between">
            
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
            <div className="hidden md:flex space-x-8 text-sm font-medium uppercase tracking-widest">
                <a className="hover:text-brand transition-colors" href="#about">Philosophy</a>
                <a className="hover:text-brand transition-colors" href="#features">Pathways</a>
                <a className="hover:text-brand transition-colors" href="#community">Sangha</a>
                </div>
                
                <a className="px-4 sm:px-6 py-1.5 sm:py-2 border-2 border-sumi rounded-eight font-semibold hover:bg-sumi hover:text-white transition-all duration-300 text-sm sm:text-base whitespace-nowrap" href="#">
                <span className="hidden xs:inline">Enter Dojo</span><span className="xs:hidden">Dojo</span>
                </a>
            </div>
        </nav>
    )
}