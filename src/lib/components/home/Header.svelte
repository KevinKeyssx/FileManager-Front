<script lang="ts">
    import { signIn, signOut, useSession } from "$lib/auth-client";
    import { DropdownMenu } from "bits-ui";

    const session = useSession( );

    async function loginWithGoogle( ) {
        await signIn.social({
            provider    : "google",
            callbackURL : "/dashboard"
        });
    }
</script>

<header class="sticky top-0 z-50 w-full border-b border-slate-700/50 bg-slate-950/60 backdrop-blur-xl">
    <div class="max-w-[1400px] mx-auto px-4 md:px-8 h-20 flex items-center justify-between">
        <a href="/" class="flex items-center gap-3 group cursor-pointer">
            <img
                src="logo.avif"
                alt="logo"
                class="w-10 h-10 shadow-lg shadow-cyan-500/20 group-hover:scale-110 transition-transform duration-300"
                loading="lazy"
                decoding="async"
            >

            <span class="text-2xl font-black tracking-tight text-transparent bg-clip-text bg-linear-to-r from-cyan-300 to-purple-400 drop-shadow-sm">
                FileManager
            </span>
        </a>

        <div class="flex items-center gap-4">
            {#if $session.data}
                <DropdownMenu.Root>
                    <DropdownMenu.Trigger class="flex items-center gap-3 p-1.5 pr-4 rounded-2xl bg-slate-800/40 border border-slate-700/50 hover:border-cyan-500/40 transition-all group backdrop-blur-md">
                        <div class="relative">
                            <img 
                                src={ $session.data.user.image } 
                                alt={ $session.data.user.name } 
                                class="w-9 h-9 rounded-xl object-cover border border-slate-600 shadow-lg group-hover:scale-105 transition-transform"
                            />
                            <div class="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-cyan-500 border-2 border-slate-900 rounded-full animate-pulse"></div>
                        </div>
                        <div class="hidden sm:flex flex-col items-start leading-tight">
                            <span class="text-xs font-bold text-white tracking-tight">{ $session.data.user.name }</span>
                            <span class="text-[10px] font-black text-cyan-400 uppercase tracking-widest opacity-80">Admin Activo</span>
                        </div>
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="text-slate-400 group-hover:text-cyan-400 transition-colors"><path d="m6 9 6 6 6-6"/></svg>
                    </DropdownMenu.Trigger>

                    <DropdownMenu.Portal>
                        <DropdownMenu.Content class="z-50 min-w-[200px] mt-2 p-2 bg-slate-900/90 border border-slate-700/50 rounded-2xl backdrop-blur-xl shadow-2xl animate-in fade-in zoom-in duration-200">
                            <DropdownMenu.Group>
                                <DropdownMenu.GroupHeading class="px-3 py-2 text-[10px] font-black text-slate-500 uppercase tracking-widest">Configuración</DropdownMenu.GroupHeading>
                                
                                <DropdownMenu.Item class="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-slate-200 hover:bg-cyan-500/10 hover:text-cyan-300 cursor-pointer transition-all outline-hidden">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
                                    <span>Dashboard</span>
                                </DropdownMenu.Item>
                            </DropdownMenu.Group>

                            <DropdownMenu.Separator class="h-px bg-slate-700/50 my-1 mx-2" />

                            <DropdownMenu.Item 
                                onclick={ ( ) => signOut( ) }
                                class="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-red-400 hover:bg-red-500/10 cursor-pointer transition-all outline-hidden"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" x2="9" y1="12" y2="12"/></svg>
                                <span>Cerrar Sesión</span>
                            </DropdownMenu.Item>
                        </DropdownMenu.Content>
                    </DropdownMenu.Portal>
                </DropdownMenu.Root>
            {:else}
                <button 
                    onclick={ loginWithGoogle }
                    class="px-5 py-2.5 rounded-2xl bg-linear-to-r from-cyan-600 to-purple-600 text-white text-sm font-bold shadow-[0_0_20px_-5px_rgba(6,182,212,0.4)] hover:shadow-[0_0_30px_-5px_rgba(6,182,212,0.6)] transition-all hover:scale-105 active:scale-95 flex items-center gap-2"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/><polyline points="10 17 15 12 10 7"/><line x1="15" x2="3" y1="12" y2="12"/></svg>
                    Entrar con Google
                </button>
            {/if}
        </div>
    </div>
</header>