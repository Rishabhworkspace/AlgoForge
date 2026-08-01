import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Menu,
  X,
  Code2,
  LayoutDashboard,
  Map,
  List,
  Trophy,
  StickyNote,
  LogOut,
  ChevronDown,
  Flame,
  Shield,
} from 'lucide-react';
import { Logo } from '@/components/ui/Logo';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface NavigationProps {
  currentView: string;
  onNavigate: (view: 'home' | 'dashboard' | 'topic' | 'problems' | 'notes' | 'leaderboard' | 'admin') => void;
  onAuthClick: (mode: 'login' | 'signup') => void;
}

export function Navigation({ currentView, onNavigate, onAuthClick }: NavigationProps) {
  const { user, profile, signOut } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);

      if (currentView === 'home') {
        const sections = ['home', 'roadmaps', 'features', 'how-it-works', 'community'];
        const scrollPosition = window.scrollY + 140;

        let current = 'home';
        for (const section of sections) {
          const element = document.getElementById(section);
          if (element) {
            const top = element.offsetTop;
            const bottom = top + element.offsetHeight;
            if (scrollPosition >= top && scrollPosition < bottom) {
              current = section;
            }
          }
        }
        setActiveSection(current);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [currentView]);

  const navLinks = [
    { id: 'home', label: 'Home', icon: Code2, view: 'home' as const, isAnchor: true },
    { id: 'roadmaps', label: 'Roadmaps', icon: Map, view: 'home' as const, isAnchor: true },
    { id: 'features', label: 'System', icon: Code2, view: 'home' as const, isAnchor: true },
    { id: 'problems', label: 'Problems', icon: List, view: 'problems' as const, isAnchor: false },
    { id: 'leaderboard', label: 'Leaderboard', icon: Trophy, view: 'leaderboard' as const, isAnchor: false },
    ...(user?.role === 'admin' ? [{ id: 'admin', label: 'Admin', icon: Shield, view: 'admin' as const, isAnchor: false }] : []),
  ];

  const handleNavClick = (link: typeof navLinks[0]) => {
    if (link.isAnchor) {
      if (currentView !== 'home') {
        onNavigate('home');
        setTimeout(() => {
          const element = document.getElementById(link.id);
          element?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      } else {
        const element = document.getElementById(link.id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        } else {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      }
    } else {
      onNavigate(link.view);
    }
  };

  const handleSignOut = async () => {
    await signOut();
    onNavigate('home');
  };

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.45, ease: [0.23, 1, 0.32, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? 'py-3' : 'py-5'
        }`}
      >
        <div
          className={`mx-auto px-4 sm:px-6 transition-all duration-300 ${
            isScrolled ? 'max-w-5xl' : 'max-w-7xl'
          }`}
        >
          <div
            className={`flex items-center justify-between transition-all duration-300 ${
              isScrolled
                ? 'rounded-full px-5 py-2.5 bg-black/80 border border-white/10 backdrop-blur-2xl shadow-[0_10px_30px_rgba(0,0,0,0.8)]'
                : 'bg-transparent px-2'
            }`}
          >
            {/* Logo */}
            <motion.button
              onClick={() => handleNavClick(navLinks[0])}
              className="flex items-center gap-2.5 group"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="w-10 h-10 rounded-xl bg-[#0a0b0e] border border-white/15 group-hover:border-[#fa6a20]/60 flex items-center justify-center transition-colors shadow-lg">
                <Logo className="w-5 h-5 text-[#fa6a20]" />
              </div>
              <span className="text-[1.12rem] font-bold tracking-tight text-white hidden sm:block">
                Algo<span className="text-[#fa6a20]">Forge</span>
              </span>
            </motion.button>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => {
                const isActive =
                  currentView === 'home'
                    ? link.isAnchor
                      ? activeSection === link.id
                      : false
                    : currentView === link.view;

                return (
                  <button
                    key={link.id}
                    onClick={() => handleNavClick(link)}
                    className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wide uppercase transition-all duration-200 relative ${
                      isActive
                        ? 'text-white'
                        : 'text-white/50 hover:text-white'
                    }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="nav-pill"
                        className="absolute inset-0 bg-white/10 border border-white/15 rounded-full shadow-[0_0_15px_rgba(250,106,32,0.15)]"
                        transition={{ type: 'spring', bounce: 0.1, duration: 0.4 }}
                      />
                    )}
                    <span className="relative z-10 flex items-center gap-1.5">
                      {link.label}
                    </span>
                  </button>
                );
              })}
            </nav>

            {/* Right Side Actions */}
            <div className="flex items-center gap-3">
              {user ? (
                <>
                  {/* XP Badge */}
                  <div className="hidden sm:flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/60 border border-white/10 shadow-inner">
                    <Flame className="w-4 h-4 text-[#fa6a20] animate-pulse" />
                    <span className="text-white font-mono text-xs font-bold">
                      {profile?.xp_points || 0} XP
                    </span>
                  </div>

                  {/* User Menu */}
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button className="flex items-center gap-2 p-1 rounded-full hover:bg-white/10 transition-colors border border-white/10 bg-black/40">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#fa6a20] to-[#00f0ff] flex items-center justify-center text-black font-bold text-xs">
                          {profile?.name?.charAt(0).toUpperCase() || user.email?.charAt(0).toUpperCase()}
                        </div>
                        <ChevronDown className="w-3.5 h-3.5 text-white/60 hidden sm:block mr-1.5" />
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-56 bg-[#0a0b0e] border-white/10 text-white backdrop-blur-2xl">
                      <div className="px-3 py-2.5">
                        <p className="text-sm font-semibold text-white">{profile?.name || 'User'}</p>
                        <p className="text-xs font-mono text-white/50 truncate">{user.email}</p>
                      </div>
                      <DropdownMenuSeparator className="bg-white/10" />
                      <DropdownMenuItem
                        onClick={() => onNavigate('dashboard')}
                        className="text-white/80 hover:text-white hover:bg-white/10 cursor-pointer"
                      >
                        <LayoutDashboard className="w-4 h-4 mr-2 text-[#00f0ff]" />
                        Dashboard
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => onNavigate('notes')}
                        className="text-white/80 hover:text-white hover:bg-white/10 cursor-pointer"
                      >
                        <StickyNote className="w-4 h-4 mr-2 text-[#fa6a20]" />
                        My Notes
                      </DropdownMenuItem>
                      {user.role === 'admin' && (
                        <DropdownMenuItem
                          onClick={() => {
                            window.location.hash = 'admin';
                          }}
                          className="text-[#a088ff] hover:text-[#b8a4ff] hover:bg-[#a088ff]/10 cursor-pointer"
                        >
                          <Shield className="w-4 h-4 mr-2" />
                          Admin Panel
                        </DropdownMenuItem>
                      )}
                      <DropdownMenuSeparator className="bg-white/10" />
                      <DropdownMenuItem
                        onClick={handleSignOut}
                        className="text-red-400 hover:text-red-300 hover:bg-red-500/10 cursor-pointer"
                      >
                        <LogOut className="w-4 h-4 mr-2" />
                        Sign Out
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </>
              ) : (
                <div className="hidden sm:flex items-center gap-3">
                  <Button
                    variant="ghost"
                    onClick={() => onAuthClick('login')}
                    className="text-white/70 hover:text-white hover:bg-white/5 font-semibold text-xs uppercase tracking-wider"
                  >
                    Log In
                  </Button>
                  <button
                    onClick={() => onAuthClick('signup')}
                    className="btn-island py-1.5 px-4 text-xs"
                  >
                    Get Started
                  </button>
                </div>
              )}

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-2 rounded-xl border border-white/10 bg-black/60 text-white hover:bg-white/10 transition-colors"
              >
                {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile Dropdown */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
            className="fixed inset-x-4 top-20 z-40 md:hidden"
          >
            <div className="doppelrand-shell p-1.5 shadow-2xl">
              <div className="doppelrand-core p-4 space-y-1.5 bg-[#0a0b0e]">
                {navLinks.map((link) => (
                  <button
                    key={link.id}
                    onClick={() => {
                      handleNavClick(link);
                      setIsMobileMenuOpen(false);
                    }}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-colors ${
                      currentView === link.view
                        ? 'bg-white/10 text-white border border-white/15'
                        : 'text-white/60 hover:bg-white/5 hover:text-white'
                    }`}
                  >
                    <link.icon className="w-4 h-4 text-[#fa6a20]" />
                    {link.label}
                  </button>
                ))}

                {!user && (
                  <div className="pt-3 mt-2 border-t border-white/10 grid grid-cols-2 gap-2">
                    <Button
                      variant="outline"
                      onClick={() => {
                        onAuthClick('login');
                        setIsMobileMenuOpen(false);
                      }}
                      className="w-full border-white/15 text-white bg-black/40 hover:bg-white/10 text-xs font-semibold"
                    >
                      Log In
                    </Button>
                    <button
                      onClick={() => {
                        onAuthClick('signup');
                        setIsMobileMenuOpen(false);
                      }}
                      className="btn-island w-full justify-center text-xs"
                    >
                      Sign Up
                    </button>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
