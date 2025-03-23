import { motion } from 'framer-motion';

const Hero = () => {
  return (
    <div className="relative min-h-screen flex items-center">
      {/* Grid background for tech feeling */}
      <div className="grid-background absolute inset-0 opacity-30" />
      
      <div className="container mx-auto px-4 py-20 z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          {/* Text content */}
          <motion.div 
            className="lg:w-1/2"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              <span className="block">全栈学习与</span>
              <span className="bg-clip-text text-transparent bg-tech-gradient">资源整合平台</span>
            </h1>
            
            <p className="text-lg text-gray-300 mb-8">
              探索尖端技术，获取高质量学习资源，提升你的编程技能。
              从入门教程到高级项目，一站式学习体验。
            </p>
            
            <div className="flex flex-wrap gap-4">
              <motion.a 
                href="/resources" 
                className="tech-button"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                开始探索
              </motion.a>
              
              <motion.a 
                href="/learning" 
                className="border border-tech-blue text-tech-blue hover:bg-tech-blue hover:bg-opacity-10 px-6 py-3 rounded-lg transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                教学区
              </motion.a>
            </div>
            
            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 mt-12">
              {[
                { value: '120+', label: '开发资源' },
                { value: '50+', label: '视频课程' },
                { value: '30+', label: '项目源码' }
              ].map((stat, index) => (
                <motion.div 
                  key={index}
                  className="text-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                >
                  <div className="text-3xl font-bold bg-clip-text text-transparent bg-tech-gradient">
                    {stat.value}
                  </div>
                  <div className="text-gray-400 text-sm">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
          
          {/* 3D or animated visual */}
          <motion.div 
            className="lg:w-1/2 flex justify-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.4 }}
          >
            <div className="relative w-full max-w-lg aspect-square">
              {/* Main circle */}
              <div className="absolute inset-0 rounded-full bg-tech-gradient opacity-20 animate-pulse-slow"></div>
              
              {/* Tech elements floating around */}
              {[...Array(5)].map((_, index) => (
                <motion.div
                  key={index}
                  className="absolute w-20 h-20 rounded-xl bg-dark-lighter border border-tech-blue shadow-glow flex items-center justify-center"
                  style={{
                    top: `${20 + index * 15}%`,
                    left: `${10 + index * 15}%`,
                    zIndex: 10 - index,
                  }}
                  animate={{
                    y: [0, -10, 0],
                    rotate: [0, 5, 0],
                  }}
                  transition={{
                    duration: 4,
                    delay: index * 0.2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <TechIcon index={index} />
                </motion.div>
              ))}
              
              {/* Center element */}
              <motion.div 
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-dark-lighter rounded-2xl border border-tech-purple shadow-glow-purple flex items-center justify-center z-20"
                animate={{
                  rotate: [0, 360],
                }}
                transition={{
                  duration: 20,
                  repeat: Infinity,
                  ease: "linear",
                }}
              >
                <div className="text-4xl font-bold bg-clip-text text-transparent bg-tech-gradient">Ab</div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <motion.div 
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
      >
        <div className="text-tech-blue mb-2">向下滚动</div>
        <motion.div 
          className="w-6 h-10 rounded-full border-2 border-tech-blue flex justify-center pt-2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <div className="w-1 h-2 bg-tech-blue rounded-full" />
        </motion.div>
      </motion.div>
    </div>
  );
};

// Tech icons for the floating elements
const TechIcon = ({ index }) => {
  const icons = [
    <svg key="code" className="w-8 h-8 text-tech-blue" fill="currentColor" viewBox="0 0 24 24">
      <path d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z"></path>
    </svg>,
    <svg key="stack" className="w-8 h-8 text-tech-purple" fill="currentColor" viewBox="0 0 24 24">
      <path d="M4 4h16v4H4V4zm0 6h16v4H4v-4zm0 6h16v4H4v-4z"></path>
    </svg>,
    <svg key="database" className="w-8 h-8 text-tech-green" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 2C6.48 2 2 4.02 2 6.5v11C2 19.98 6.48 22 12 22s10-2.02 10-4.5v-11C22 4.02 17.52 2 12 2zm0 2c5.02 0 8 1.55 8 2.5S17.02 9 12 9 4 7.45 4 6.5 6.98 4 12 4zM4 8.51c0 .01 0 .01 0 0zm0 4.49v-3c1.91 1.31 5.33 2 9 2s7.09-.69 9-2v3c0 .95-2.98 2.5-8 2.5s-8-1.55-8-2.5zm0 5v-3c1.91 1.31 5.33 2 9 2s7.09-.69 9-2v3c0 .95-2.98 2.5-8 2.5s-8-1.55-8-2.5z"></path>
    </svg>,
    <svg key="settings" className="w-8 h-8 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
      <path d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z"></path>
    </svg>,
    <svg key="rocket" className="w-8 h-8 text-tech-red" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 2.5s4.5 2.04 4.5 10.5c0 2.49-1.04 5.57-1.6 7H9.1c-.56-1.43-1.6-4.51-1.6-7C7.5 4.54 12 2.5 12 2.5zm2 8.5c0-1.1-.9-2-2-2s-2 .9-2 2 .9 2 2 2 2-.9 2-2zm-6.31 9.52c-.48-1.23-1.52-4.17-1.67-6.87L4 15v7l3.69-1.48zM20 22v-7l-2.02-1.35c-.15 2.69-1.2 5.64-1.67 6.87L20 22z"></path>
    </svg>,
  ];
  
  return icons[index % icons.length];
};

export default Hero; 