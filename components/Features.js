import { motion } from 'framer-motion';
import TechCard from './TechCard';

const Features = () => {
  const features = [
    {
      title: '资源中心',
      description: '高质量软件下载、安装包与安装指南，满足开发需求。公开与付费内容分级管理。',
      icon: (
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
        </svg>
      ),
      link: '/resources',
    },
    {
      title: '教学区',
      description: '专业Linux与编程技术教学，从入门到精通的视频课程，实战教程与案例分析。',
      icon: (
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      ),
      link: '/learning',
      premium: true,
    },
    {
      title: '项目展示',
      description: '完整项目展示与源码下载，附带详细文档与部署指南，助你快速掌握实战技能。',
      icon: (
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        </svg>
      ),
      link: '/projects',
    },
    {
      title: '内容创作',
      description: '博客系统与技术笔记工具，记录与分享你的编程心得，支持付费内容创作。',
      icon: (
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
        </svg>
      ),
      link: '/blog',
    },
  ];

  return (
    <section className="py-20 relative">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-black to-transparent"></div>
      
      <div className="container mx-auto px-4">
        {/* Section header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="bg-clip-text text-transparent bg-tech-gradient">核心功能</span>
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            我们的平台提供全方位的技术学习与资源共享服务，满足从入门到专业的各类需求
          </p>
        </motion.div>
        
        {/* Features grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <TechCard
              key={index}
              title={feature.title}
              description={feature.description}
              icon={feature.icon}
              premium={feature.premium}
              link={feature.link}
              delay={index * 0.1}
            />
          ))}
        </div>
        
        {/* Highlight feature */}
        <motion.div 
          className="mt-20 bg-dark-lighter bg-opacity-60 backdrop-blur-md rounded-2xl p-8 border border-gray-800 shadow-xl overflow-hidden relative"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
        >
          {/* Decorative gradient */}
          <div className="absolute -right-20 -top-20 w-64 h-64 rounded-full bg-tech-gradient opacity-10 blur-3xl"></div>
          <div className="absolute -left-20 -bottom-20 w-64 h-64 rounded-full bg-secondary opacity-10 blur-3xl"></div>
          
          <div className="flex flex-col md:flex-row items-center gap-8 relative z-10">
            <div className="md:w-1/2">
              <h3 className="text-2xl font-bold mb-4">用户会员系统</h3>
              <p className="text-gray-300 mb-6">
                通过我们的会员系统，解锁更多高级内容与功能。不同会员等级提供不同程度的资源访问权限，
                让你的学习之旅更加顺畅。
              </p>
              <motion.a 
                href="/membership" 
                className="cyber-button inline-block"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                了解会员特权
              </motion.a>
            </div>
            
            <div className="md:w-1/2 grid grid-cols-2 gap-4">
              {[
                { level: "基础会员", features: ["免费教程", "基础资源", "社区支持"] },
                { level: "高级会员", features: ["全部教程", "全部项目源码", "专属学习路径", "技术问答"] },
              ].map((tier, index) => (
                <div 
                  key={index} 
                  className={`p-4 rounded-xl border ${
                    index === 0 ? 'border-gray-700' : 'border-tech-blue shadow-glow'
                  }`}
                >
                  <div className="text-lg font-bold mb-2">{tier.level}</div>
                  <ul className="text-sm text-gray-400">
                    {tier.features.map((feature, i) => (
                      <li key={i} className="flex items-center mb-1">
                        <svg className="w-4 h-4 mr-1 text-tech-blue" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Features; 