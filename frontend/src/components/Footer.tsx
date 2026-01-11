import { Github, Linkedin, Globe, Mail } from "lucide-react";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-black text-slate-300 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 py-12">

        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">

          {/* Brand */}
          <div>
            <h3 className="text-lg font-semibold text-white">
              Arnab Bhattacharya
            </h3>
            <p className="mt-2 text-sm text-slate-400 leading-relaxed">
              Full-Stack Developer focused on scalable web apps, AI-powered
              platforms, and modern UI/UX.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2 text-sm">
              <Link href={"/dashboard"}><li className="hover:text-white transition cursor-pointer">Dashboard</li></Link>
              <Link href={"/subjects"}><li className="hover:text-white transition cursor-pointer">Subjects</li></Link>
              <Link href={"/documents"}><li className="hover:text-white transition cursor-pointer">Documents</li></Link>
              <Link href={"/ai-suggestions"}><li className="hover:text-white transition cursor-pointer">AI Suggestions</li></Link>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4">
              Resources
            </h4>
            <ul className="space-y-2 text-sm">
              <li className="hover:text-white transition cursor-pointer">
                Documentation
              </li>
              <li className="hover:text-white transition cursor-pointer">
                Help & Support
              </li>
              <li className="hover:text-white transition cursor-pointer">
                Privacy Policy
              </li>
              <li className="hover:text-white transition cursor-pointer">
                Terms of Service
              </li>
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4">
              Connect
            </h4>
            <div className="flex gap-4">
              <a
                href="https://portfolio-arnab-bhattacharya.vercel.app"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition"
              >
                <Globe size={20} />
              </a>

              <a
                href="https://github.com/Code-With-Arnab2005"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition"
              >
                <Github size={20} />
              </a>

              <a
                href="https://www.linkedin.com/in/arnab-bhattacharya-42216a320"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition"
              >
                <Linkedin size={20} />
              </a>

              <a
                href="mailto:your-email@example.com"
                className="hover:text-white transition"
              >
                <Mail size={20} />
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col md:flex-row justify-between items-center text-sm text-slate-400 gap-4">
          <p>
            © {new Date().getFullYear()} Arnab Bhattacharya. All rights reserved.
          </p>
          <p>
            Built with Next.js • Tailwind • Supabase
          </p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
