import { motion } from 'framer-motion';
import { Github, Twitter, Linkedin, Mail, MapPin } from 'lucide-react';
import { Logo } from '@/components/ui/Logo';

type ViewType = 'home' | 'dashboard' | 'topic' | 'problems' | 'notes' | 'leaderboard' | 'docs' | 'api';

interface FooterProps {
  onNavigate: (_view: ViewType) => void;
}

const footerLinks = {
  product: [
    { label: 'Roadmaps', href: '#roadmaps' },
    { label: 'Problems', href: '#problems' },
    { label: 'Leaderboard', href: '#leaderboard' },
  ],
  resources: [
    { label: 'Documentation', href: '#docs', description: 'Getting started guides' },
    { label: 'API Reference', href: '#api', description: 'REST API endpoints' },
    { label: 'Community', href: '#community', description: 'Discussion forum' },
  ],
};

const socialLinks = [
  { icon: Github, href: 'https://github.com/Rishabhworkspace/AlgoForge-2.0', label: 'GitHub' },
  { icon: Linkedin, href: 'https://www.linkedin.com/in/rishabh-tripathi-728a77317', label: 'LinkedIn' },
  { icon: Twitter, href: 'https://x.com/RishabhTri8805', label: 'Twitter' },
];

export function Footer({ onNavigate }: FooterProps) {
  const handleNavClick = (view: ViewType) => {
    onNavigate(view);
  };

  return (
    <footer className="relative pt-24 pb-12 overflow-hidden bg-[#050505] text-white border-t border-white/10">
      {/* Subtle Lighting */}
      <div className="absolute inset-0 grid-pattern opacity-10 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-10 mb-20">
          {/* Brand Column */}
          <div className="col-span-2 md:col-span-4 lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55 }}
            >
              <div className="flex items-center gap-2.5 mb-5">
                <div className="w-10 h-10 rounded-xl bg-[#0a0b0e] flex items-center justify-center border border-white/15 shadow-md">
                  <Logo className="w-5 h-5 text-[#fa6a20]" />
                </div>
                <span className="font-sans font-bold text-2xl tracking-tight text-white">
                  Algo<span className="text-[#fa6a20]">Forge</span>
                </span>
              </div>
              <p className="text-white/60 text-sm leading-relaxed mb-6 max-w-sm">
                Master algorithmic intuition, one deliberate step at a time. High-signal learning tracks built for DSA mastery, system architecture, and technical interviews.
              </p>

              {/* Social Links */}
              <div className="flex gap-3">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 hover:border-[#fa6a20]/40 transition-all group shadow-sm"
                  >
                    <social.icon className="w-4 h-4 text-white/60 group-hover:text-[#fa6a20] transition-colors" />
                  </a>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Product Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.1 }}
          >
            <h4 className="font-sans font-semibold text-white mb-5 text-sm uppercase tracking-wider">Product</h4>
            <ul className="space-y-3.5">
              {footerLinks.product.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    onClick={(e) => {
                      if (link.label === 'Roadmaps') {
                        e.preventDefault();
                        handleNavClick('topic');
                      } else if (link.label === 'Problems') {
                        e.preventDefault();
                        handleNavClick('problems');
                      } else if (link.label === 'Leaderboard') {
                        e.preventDefault();
                        handleNavClick('leaderboard');
                      }
                    }}
                    className="text-sm text-white/60 hover:text-white transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Resources Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.18 }}
          >
            <h4 className="font-sans font-semibold text-white mb-5 text-sm uppercase tracking-wider">Resources</h4>
            <ul className="space-y-3.5">
              {footerLinks.resources.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    onClick={(e) => {
                      if (link.label === 'Documentation') {
                        e.preventDefault();
                        handleNavClick('docs');
                      } else if (link.label === 'API Reference') {
                        e.preventDefault();
                        handleNavClick('api');
                      }
                    }}
                    className="text-sm text-white/60 hover:text-white transition-colors block group"
                  >
                    <span>{link.label}</span>
                    <span className="block text-[0.7rem] font-mono text-white/30 group-hover:text-white/50 transition-colors">
                      {link.description}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.26 }}
          >
            <h4 className="font-sans font-semibold text-white mb-5 text-sm uppercase tracking-wider">Contact</h4>
            <ul className="space-y-3.5">
              <li className="flex items-center gap-2.5 text-sm text-white/60">
                <Mail className="w-4 h-4 text-[#00f0ff]" />
                <span className="truncate">rishabh.j.tripathi2903@gmail.com</span>
              </li>
              <li className="flex items-start gap-2.5 text-sm text-white/60">
                <MapPin className="w-4 h-4 mt-0.5 text-[#fa6a20]" />
                <span>Chennai, Tamil Nadu</span>
              </li>
            </ul>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-white/40">
          <p>© {new Date().getFullYear()} AlgoForge Atelier. Built with precision.</p>
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#00f0ff] animate-pulse" />
              STATUS: OPERATIONAL
            </span>
            <span>v2.4.0-quantum</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
