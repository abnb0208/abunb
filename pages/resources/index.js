import { useState } from 'react';
import Layout from '../../components/Layout';
import { motion } from 'framer-motion';

export default function Resources() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Filter resources based on active category and search query
  const filteredResources = resourcesData.filter((resource) => {
    const matchesCategory = activeCategory === 'all' || resource.category === activeCategory;
    const matchesSearch = resource.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          resource.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesCategory && matchesSearch;
  });
  
  return (
    <Layout title="资源中心">
      <div className="pt-28 pb-20">
        <div className="container mx-auto px-4">
          {/* Page header */}
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="bg-clip-text text-transparent bg-tech-gradient">资源中心</span>
            </h1>
            <p className="text-gray-300 max-w-2xl mx-auto">
              探索我们精心整理的开发资源、软件工具与技术文档，助力你的开发之旅
            </p>
          </motion.div>
          
          {/* Search and filter */}
          <div className="mb-10">
            <div className="flex flex-col md:flex-row gap-4 justify-between items-center bg-dark-lighter bg-opacity-60 backdrop-blur-md rounded-xl p-4 border border-gray-800">
              {/* Search input */}
              <div className="relative w-full md:w-72">
                <input
                  type="text"
                  placeholder="搜索资源..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-dark bg-opacity-60 border border-gray-700 rounded-lg py-2 pl-10 pr-4 text-white focus:outline-none focus:ring-2 focus:ring-tech-blue"
                />
                <div className="absolute left-3 top-2.5">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>
              
              {/* Categories */}
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setActiveCategory(category.id)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                      activeCategory === category.id
                        ? 'bg-tech-gradient text-white shadow-glow'
                        : 'bg-dark-lighter border border-gray-700 text-gray-300 hover:border-tech-blue'
                    }`}
                  >
                    {category.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
          
          {/* Resources grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredResources.map((resource, index) => (
              <motion.div 
                key={resource.id}
                className="tech-card overflow-hidden group relative"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
              >
                {/* Premium badge */}
                {resource.premium && (
                  <div className="absolute top-3 right-3 z-10 bg-tech-gradient py-1 px-3 rounded-full text-xs font-semibold shadow-glow">
                    高级内容
                  </div>
                )}
                
                <div className="relative h-48 -mx-6 -mt-6 mb-6 overflow-hidden">
                  <div className="w-full h-full bg-dark-lighter flex items-center justify-center">
                    <CategoryIcon category={resource.category} />
                  </div>
                </div>
                
                <h3 className="text-xl font-bold mb-2 text-white">{resource.title}</h3>
                <p className="text-gray-300 text-sm mb-4">{resource.description}</p>
                
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-400">{resource.date}</span>
                  <a 
                    href={resource.link}
                    className={`inline-flex items-center ${
                      resource.premium ? 'text-secondary-light hover:text-secondary' : 'text-tech-blue hover:text-tech-purple'
                    } transition-colors`}
                  >
                    <span>{resource.premium ? '升级查看' : '下载资源'}</span>
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
          
          {/* No results */}
          {filteredResources.length === 0 && (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-2xl font-bold mb-2">未找到相关资源</h3>
              <p className="text-gray-400">
                尝试调整搜索条件或查看其他分类
              </p>
            </div>
          )}
          
          {/* Pagination */}
          <div className="flex justify-center mt-12">
            <div className="inline-flex">
              {[1, 2, 3, 4, 5].map((page) => (
                <button
                  key={page}
                  className={`h-10 w-10 ${
                    page === 1
                      ? 'bg-tech-gradient text-white shadow-glow'
                      : 'bg-dark-lighter border border-gray-700 text-gray-300 hover:border-tech-blue'
                  } mx-1 rounded-lg flex items-center justify-center transition-all duration-300`}
                >
                  {page}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

// Category icons
const CategoryIcon = ({ category }) => {
  const getIcon = () => {
    switch (category) {
      case 'software':
        return (
          <svg className="w-24 h-24 text-tech-blue opacity-20" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 3L1 9l4 2.18v6L12 21l7-3.82v-6l2-1.09V17h2V9L12 3zm6.82 6L12 12.72 5.18 9 12 5.28 18.82 9zM17 15.99l-5 2.73-5-2.73v-3.72L12 15l5-2.73v3.72z" />
          </svg>
        );
      case 'document':
        return (
          <svg className="w-24 h-24 text-tech-green opacity-20" fill="currentColor" viewBox="0 0 24 24">
            <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z" />
          </svg>
        );
      case 'tutorial':
        return (
          <svg className="w-24 h-24 text-secondary opacity-20" fill="currentColor" viewBox="0 0 24 24">
            <path d="M18 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM9 4h2v5l-1-.75L9 9V4zm9 16H6V4h1v9l3-2.25L13 13V4h5v16z" />
          </svg>
        );
      default:
        return (
          <svg className="w-24 h-24 text-gray-600 opacity-20" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-5-9h10v2H7z" />
          </svg>
        );
    }
  };

  return getIcon();
};

// Categories data
const categories = [
  { id: 'all', name: '全部' },
  { id: 'software', name: '软件工具' },
  { id: 'document', name: '技术文档' },
  { id: 'tutorial', name: '教程指南' },
];

// Resources data
const resourcesData = [
  {
    id: 1,
    title: 'VS Code 高效开发配置',
    description: '优化你的VS Code开发环境，提高编码效率的插件与设置推荐。',
    date: '2023-04-15',
    category: 'software',
    premium: false,
    link: '/resources/vscode-config',
  },
  {
    id: 2,
    title: 'Linux服务器部署指南',
    description: '从零开始的Linux服务器配置与Web应用部署完全指南。',
    date: '2023-04-10',
    category: 'document',
    premium: false,
    link: '/resources/linux-deploy',
  },
  {
    id: 3,
    title: 'Docker容器化实战',
    description: '掌握Docker容器技术，实现应用的快速部署与扩展。',
    date: '2023-04-05',
    category: 'tutorial',
    premium: true,
    link: '/resources/docker-guide',
  },
  {
    id: 4,
    title: 'Git版本控制完全指南',
    description: '深入理解Git工作流程，掌握团队协作中的版本控制技巧。',
    date: '2023-03-28',
    category: 'document',
    premium: false,
    link: '/resources/git-guide',
  },
  {
    id: 5,
    title: 'MongoDB数据库入门到精通',
    description: '从基础概念到高级应用，全面掌握MongoDB数据库开发。',
    date: '2023-03-20',
    category: 'tutorial',
    premium: true,
    link: '/resources/mongodb-guide',
  },
  {
    id: 6,
    title: 'Nginx服务器配置优化',
    description: '提升网站性能与安全性的Nginx服务器配置与优化指南。',
    date: '2023-03-15',
    category: 'document',
    premium: false,
    link: '/resources/nginx-config',
  },
  {
    id: 7,
    title: 'Node.js后端开发工具集',
    description: '精选Node.js开发必备工具与库，加速后端开发流程。',
    date: '2023-03-10',
    category: 'software',
    premium: false,
    link: '/resources/nodejs-tools',
  },
  {
    id: 8,
    title: 'React性能优化最佳实践',
    description: '提升React应用性能的关键技巧与最佳实践总结。',
    date: '2023-03-05',
    category: 'tutorial',
    premium: true,
    link: '/resources/react-performance',
  },
  {
    id: 9,
    title: 'Python数据分析工具包',
    description: '数据科学与分析工作中必备的Python库与工具推荐。',
    date: '2023-02-28',
    category: 'software',
    premium: false,
    link: '/resources/python-data-tools',
  },
]; 