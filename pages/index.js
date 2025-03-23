import Layout from '../components/Layout';
import Hero from '../components/Hero';
import Features from '../components/Features';
import { motion } from 'framer-motion';

export default function Home() {
  return (
    <Layout>
      {/* Hero Section */}
      <Hero />
      
      {/* Features Section */}
      <Features />
      
      {/* Latest Resources Section */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="bg-clip-text text-transparent bg-cyber-gradient">最新资源</span>
            </h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              探索我们最新上线的技术资源与教程，紧跟行业发展前沿
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {latestResources.map((resource, index) => (
              <motion.div 
                key={index}
                className="tech-card overflow-hidden group"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true, margin: "-100px" }}
              >
                <div className="relative h-48 -mx-6 -mt-6 mb-6 overflow-hidden">
                  <div className="w-full h-full bg-dark-lighter">
                    <div className="absolute inset-0 opacity-50">
                      <ResourceIcon type={resource.type} />
                    </div>
                  </div>
                  
                  {/* Resource type badge */}
                  <div className="absolute top-3 right-3 py-1 px-3 rounded-full text-xs font-semibold bg-dark-lighter border border-gray-700">
                    {resource.type}
                  </div>
                </div>
                
                <h3 className="text-xl font-bold mb-2 text-white">{resource.title}</h3>
                <p className="text-gray-300 text-sm mb-4">{resource.description}</p>
                
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-400">{resource.date}</span>
                  <a 
                    href={resource.link}
                    className="inline-flex items-center text-tech-blue hover:text-tech-purple transition-colors"
                  >
                    <span>查看详情</span>
                    <svg 
                      className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <motion.a 
              href="/resources"
              className="tech-button inline-block"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              浏览全部资源
            </motion.a>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 relative">
        <div className="absolute inset-0 bg-tech-gradient opacity-10"></div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div 
            className="max-w-4xl mx-auto text-center"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              准备好提升你的技术能力了吗？
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              加入我们的学习平台，获取最新的编程资源和技术教程，踏上全栈开发之旅。
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <motion.a 
                href="/signup" 
                className="cyber-button"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                免费注册
              </motion.a>
              <motion.a 
                href="/resources" 
                className="border border-white bg-white bg-opacity-10 hover:bg-opacity-20 text-white px-6 py-3 rounded-lg transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                浏览资源
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}

// Latest resources data
const latestResources = [
  {
    title: 'Docker容器化实战指南',
    description: '从零开始学习Docker容器技术，掌握镜像构建、容器编排与部署流程。',
    date: '2023-04-15',
    type: '教程',
    link: '/learning/docker-guide',
  },
  {
    title: 'React 18最新特性详解',
    description: '深入解析React 18的新特性与改进，包含并发渲染、自动批处理等内容。',
    date: '2023-04-10',
    type: '视频教程',
    link: '/learning/react-18',
  },
  {
    title: 'Linux服务器安全加固',
    description: '全面了解Linux服务器安全配置与加固方案，防止常见攻击与漏洞利用。',
    date: '2023-04-05',
    type: '项目',
    link: '/projects/linux-security',
  },
];

// Resource icon component
const ResourceIcon = ({ type }) => {
  const getIcon = () => {
    switch (type) {
      case '教程':
        return (
          <svg className="w-full h-full text-tech-blue opacity-20" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 14l9-5-9-5-9 5 9 5z" />
            <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
            <path d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-8 6h16" />
          </svg>
        );
      case '视频教程':
        return (
          <svg className="w-full h-full text-secondary opacity-20" fill="currentColor" viewBox="0 0 24 24">
            <path d="M4 4h16a2 2 0 012 2v12a2 2 0 01-2 2H4a2 2 0 01-2-2V6a2 2 0 012-2z" />
            <path d="M10 9l5 3-5 3V9z" />
          </svg>
        );
      case '项目':
        return (
          <svg className="w-full h-full text-tech-green opacity-20" fill="currentColor" viewBox="0 0 24 24">
            <path d="M3 3h18a1 1 0 011 1v16a1 1 0 01-1 1H3a1 1 0 01-1-1V4a1 1 0 011-1zm9.06 8.683L5.648 6.238 4.353 7.762l7.72 6.555 7.581-6.56-1.308-1.513-6.285 5.439h-.001z" />
          </svg>
        );
      default:
        return (
          <svg className="w-full h-full text-gray-500 opacity-20" fill="currentColor" viewBox="0 0 24 24">
            <path d="M4 4h16a2 2 0 012 2v12a2 2 0 01-2 2H4a2 2 0 01-2-2V6a2 2 0 012-2z" />
            <path d="M2 8h20M10 4v4M8 16h8v-4h-8v4z" />
          </svg>
        );
    }
  };

  return (
    <div className="w-full h-full flex items-center justify-center">
      {getIcon()}
    </div>
  );
}; 