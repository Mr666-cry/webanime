import { 
  Code2, Github, Twitter, Mail, Globe, 
  Heart, Zap, Shield, Database
} from 'lucide-react';

export const Developer = () => {
  return (
    <div className="pb-20 md:pb-0">
      {/* Header */}
      <div className="px-4 py-6 text-center">
        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center mx-auto mb-4">
          <span className="text-white font-bold text-2xl">S</span>
        </div>
        <h1 className="text-2xl md:text-3xl font-bold">SamuDev</h1>
        <p className="text-muted-foreground mt-1">Full Stack Developer</p>
      </div>
      
      {/* About */}
      <div className="px-4 mb-6">
        <div className="bg-card rounded-xl p-6">
          <h2 className="text-lg font-bold mb-3 flex items-center gap-2">
            <Code2 className="w-5 h-5 text-blue-500" />
            Tentang
          </h2>
          <p className="text-muted-foreground text-sm leading-relaxed">
            NimeStream adalah platform streaming anime gratis yang dikembangkan oleh SamuDev. 
            Website ini menggunakan API dari berbagai sumber untuk menyediakan konten anime 
            berkualitas tinggi dengan subtitle Indonesia.
          </p>
        </div>
      </div>
      
      {/* Features */}
      <div className="px-4 mb-6">
        <h2 className="text-lg font-bold mb-3">Fitur</h2>
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-card rounded-lg p-4">
            <Zap className="w-6 h-6 text-yellow-500 mb-2" />
            <h3 className="font-medium text-sm">Streaming Cepat</h3>
            <p className="text-xs text-muted-foreground mt-1">
              Server streaming berkecepatan tinggi
            </p>
          </div>
          <div className="bg-card rounded-lg p-4">
            <Database className="w-6 h-6 text-green-500 mb-2" />
            <h3 className="font-medium text-sm">Database Lengkap</h3>
            <p className="text-xs text-muted-foreground mt-1">
              Ribuan anime dengan update rutin
            </p>
          </div>
          <div className="bg-card rounded-lg p-4">
            <Shield className="w-6 h-6 text-blue-500 mb-2" />
            <h3 className="font-medium text-sm">Aman & Gratis</h3>
            <p className="text-xs text-muted-foreground mt-1">
              Tanpa iklan mengganggu
            </p>
          </div>
          <div className="bg-card rounded-lg p-4">
            <Heart className="w-6 h-6 text-pink-500 mb-2" />
            <h3 className="font-medium text-sm">Favorit</h3>
            <p className="text-xs text-muted-foreground mt-1">
              Simpan anime favoritmu
            </p>
          </div>
        </div>
      </div>
      
      {/* Tech Stack */}
      <div className="px-4 mb-6">
        <h2 className="text-lg font-bold mb-3">Teknologi</h2>
        <div className="bg-card rounded-xl p-4">
          <div className="flex flex-wrap gap-2">
            {['React', 'TypeScript', 'Tailwind CSS', 'Vite', 'Node.js'].map((tech) => (
              <span
                key={tech}
                className="px-3 py-1 bg-secondary rounded-full text-sm"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
      
      {/* API Sources */}
      <div className="px-4 mb-6">
        <h2 className="text-lg font-bold mb-3">Sumber API</h2>
        <div className="bg-card rounded-xl p-4">
          <ul className="space-y-2 text-sm">
            <li className="flex items-center gap-2">
              <Globe className="w-4 h-4 text-blue-500" />
              Samehadaku
            </li>
            <li className="flex items-center gap-2">
              <Globe className="w-4 h-4 text-blue-500" />
              Otakudesu
            </li>
            <li className="flex items-center gap-2">
              <Globe className="w-4 h-4 text-blue-500" />
              Anoboy
            </li>
          </ul>
        </div>
      </div>
      
      {/* Contact */}
      <div className="px-4 mb-6">
        <h2 className="text-lg font-bold mb-3">Kontak</h2>
        <div className="flex gap-3">
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 bg-card hover:bg-card/80 rounded-lg p-4 flex flex-col items-center gap-2 transition-colors"
          >
            <Github className="w-6 h-6" />
            <span className="text-sm">GitHub</span>
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 bg-card hover:bg-card/80 rounded-lg p-4 flex flex-col items-center gap-2 transition-colors"
          >
            <Twitter className="w-6 h-6 text-blue-400" />
            <span className="text-sm">Twitter</span>
          </a>
          <a
            href="mailto:contact@samudev.com"
            className="flex-1 bg-card hover:bg-card/80 rounded-lg p-4 flex flex-col items-center gap-2 transition-colors"
          >
            <Mail className="w-6 h-6 text-red-400" />
            <span className="text-sm">Email</span>
          </a>
        </div>
      </div>
      
      {/* Footer */}
      <div className="px-4 py-6 text-center">
        <p className="text-sm text-muted-foreground">
          Made with <Heart className="w-4 h-4 inline text-pink-500" fill="currentColor" /> by SamuDev
        </p>
        <p className="text-xs text-muted-foreground mt-1">
          © 2026 NimeStream. All rights reserved.
        </p>
      </div>
    </div>
  );
};
