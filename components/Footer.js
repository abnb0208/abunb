import Link from 'next/link';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  const footerLinks = {
    '关于我们': [
      { name: '平台简介', href: '/about' },
      { name: '联系方式', href: '/contact' },
      { name: '加入我们', href: '/careers' },
    ],
    '资源导航': [
      { name: '软件下载', href: '/resources/software' },
      { name: '视频教程', href: '/learning/videos' },
      { name: '项目源码', href: '/projects/source' },
      { name: '技术博客', href: '/blog' },
    ],
    '会员服务': [
      { name: '会员等级', href: '/membership/levels' },
      { name: '购买会员', href: '/membership/purchase' },
      { name: '会员特权', href: '/membership/benefits' },
    ],
    '帮助中心': [
      { name: '常见问题', href: '/faq' },
      { name: '使用指南', href: '/guide' },
      { name: '服务条款', href: '/terms' },
      { name: '隐私政策', href: '/privacy' },
    ],
  };

  return (
    <footer className="bg-dark-lighter bg-opacity-80 backdrop-blur-md pt-16 pb-8 border-t border-gray-800 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-tech-gradient opacity-5 blur-3xl rounded-full -translate-y-1/2 translate-x-1/2"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary opacity-5 blur-3xl rounded-full translate-y-1/2 -translate-x-1/2"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="text-white font-bold mb-4">{category}</h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link href={link.href} className="text-gray-400 hover:text-tech-blue text-sm transition-colors">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-4 md:mb-0">
            <div className="relative w-8 h-8 mr-2">
              <div className="absolute inset-0 bg-tech-gradient rounded-md"></div>
              <div className="absolute inset-1 bg-dark flex items-center justify-center rounded-md text-tech-blue font-bold">A</div>
            </div>
            <span className="text-white font-semibold">Abunb</span>
          </div>
          
          {/* Social links */}
          <div className="flex space-x-4 mb-4 md:mb-0">
            {[
              { name: 'GitHub', icon: <GitHubIcon />, href: 'https://github.com/' },
              { name: 'Twitter', icon: <TwitterIcon />, href: 'https://twitter.com/' },
              { name: 'YouTube', icon: <YouTubeIcon />, href: 'https://youtube.com/' },
            ].map((social) => (
              <a
                key={social.name}
                href={social.href}
                className="text-gray-400 hover:text-tech-blue transition-colors"
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.name}
              >
                {social.icon}
              </a>
            ))}
          </div>
          
          {/* Copyright */}
          <div className="text-gray-500 text-sm">
            &copy; {currentYear} Abunb Tech. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

// Icons
const GitHubIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
  </svg>
);

const TwitterIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
  </svg>
);

const YouTubeIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path fillRule="evenodd" d="M19.812 5.418c.861.23 1.538.907 1.768 1.768C21.998 8.746 22 12 22 12s0 3.255-.418 4.814a2.504 2.504 0 0 1-1.768 1.768c-1.56.419-7.814.419-7.814.419s-6.255 0-7.814-.419a2.505 2.505 0 0 1-1.768-1.768C2 15.255 2 12 2 12s0-3.255.417-4.814a2.507 2.507 0 0 1 1.768-1.768C5.744 5 11.998 5 11.998 5s6.255 0 7.814.418ZM15.194 12 10 15V9l5.194 3Z" clipRule="evenodd" />
  </svg>
);

export default Footer; 