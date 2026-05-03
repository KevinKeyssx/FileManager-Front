<footer class="mt-auto border-t border-slate-700/50 bg-slate-800/40 backdrop-blur-xl py-12">
    <div class="max-w-[1400px] mx-auto px-4 md:px-8 flex justify-between gap-8">
        <div class="space-y-4">
            <div class="flex items-center gap-3">
                <img
                    src="logo.avif"
                    alt="logo"
                    class="w-10 h-10 shadow-lg shadow-cyan-500/20 group-hover:scale-110 transition-transform duration-300"
                    loading="lazy"
                    decoding="async"
                />

                <span class="text-xl font-bold text-transparent bg-clip-text bg-linear-to-r from-cyan-300 to-purple-400">
                    FileManager
                </span>
            </div>

            <p class="text-sm text-cyan-100/40 max-w-xs">
                La plataforma inteligente para la gestión y optimización de recursos multimedia en la nube.
            </p>
        </div>

        <!-- <div class="grid grid-cols-1 gap-4">
            <div class="space-y-2">
                <h4 class="text-xs font-bold text-cyan-400 uppercase tracking-widest">Plataforma</h4>
                <ul class="space-y-1 text-sm text-cyan-100/60">
                    <li><a href="#" class="hover:text-cyan-300 transition-colors">Recursos</a></li>
                    <li><a href="#" class="hover:text-cyan-300 transition-colors">API</a></li>
                </ul>
            </div>
            <div class="space-y-2">
                <h4 class="text-xs font-bold text-cyan-400 uppercase tracking-widest">Legal</h4>
                <ul class="space-y-1 text-sm text-cyan-100/60">
                    <li><a href="#" class="hover:text-cyan-300 transition-colors">Privacidad</a></li>
                    <li><a href="#" class="hover:text-cyan-300 transition-colors">Términos</a></li>
                </ul>
            </div>
        </div> -->

        <div class="flex flex-col items-end justify-between gap-4">
            <a
                href="https://github.com/KevinKeyssx/FileManager-Front"
                target="_blank"
                class="p-2 rounded-lg bg-slate-800/50 text-cyan-400/60 hover:text-cyan-400 transition-all border border-slate-700/50"
                aria-label="GitHub"
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>
            </a>

            <p class="text-xs font-mono text-cyan-600">
                ©{new Date().getFullYear()} FileManager. Powered by 
                <a href="https://github.com/KevinKeyssx" target="_blank" class="hover:text-cyan-400 transition-colors">KevinKeyssx</a>.
            </p>
        </div>
    </div>
</footer>
