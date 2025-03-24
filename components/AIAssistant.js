import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import Link from 'next/link';
import katex from 'katex';
import 'katex/dist/katex.min.css';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';

// 简单的客户端渲染钩子，解决水合问题
function useClientOnly() {
  const [isMounted, setIsMounted] = useState(false);
  
  useEffect(() => {
    setIsMounted(true);
  }, []);
  
  return isMounted;
}

// Deepseek模型列表
const DEEPSEEK_MODELS = {
  'deepseek-chat': {
    name: 'DeepSeek Chat',
    description: '通用大语言模型',
    color: 'from-violet-500 to-indigo-500',
    iconColor: 'from-violet-400 to-indigo-400'
  },
  'deepseek-coder': {
    name: 'DeepSeek Coder',
    description: '专为代码优化',
    color: 'from-blue-500 to-cyan-500',
    iconColor: 'from-blue-400 to-cyan-400'
  },
  'deepseek-reasoner': {
    name: 'DeepSeek R1',
    description: '高级思维链推理',
    color: 'from-purple-500 to-pink-500',
    iconColor: 'from-purple-400 to-pink-400'
  },
  'deepseek-rl': {
    name: 'DeepSeek RL',
    description: '强化学习模型',
    color: 'from-amber-500 to-orange-500',
    iconColor: 'from-amber-400 to-orange-400'
  }
};

// 全局动画设置
const animationConfig = {
  spring: { type: "spring", damping: 20, stiffness: 300 },
  ease: { type: "tween", ease: [0.16, 1, 0.3, 1], duration: 0.5 },
  closeEase: { type: "tween", ease: [0.33, 1, 0.68, 1], duration: 0.4 }
};

// 使用动态导入实现客户端渲染，解决水合问题
const AIAssistantComponent = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { 
      type: 'bot', 
      content: '你好！我是阿不智能，基于DeepSeek Coder的专业技术助手。我专为代码开发与编程问题优化，提供高效准确的技术支持和解决方案。请随时向我咨询任何编程相关问题。'
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [modelType, setModelType] = useState('deepseek'); // 模型类型
  const [specificModel, setSpecificModel] = useState('deepseek-coder'); // 特定模型 - 使用Coder编程模型
  const [modelConfig, setModelConfig] = useState(null);
  const [error, setError] = useState(null);
  const [usage, setUsage] = useState(null);
  const [modelMenuOpen, setModelMenuOpen] = useState(false);
  const messagesEndRef = useRef(null);
  const [theme, setTheme] = useState('dark'); // 主题设置：dark, light, system
  const [isExpanded, setIsExpanded] = useState(false);
  const [copyNotification, setCopyNotification] = useState({ show: false, message: '' });
  const [isMobile, setIsMobile] = useState(false);
  
  // 控制页面布局的引用
  const mainContentRef = useRef(null);
  const chatContainerRef = useRef(null);
  const router = useRouter(); // 获取路由实例
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isPreloaded, setIsPreloaded] = useState(false);
  const debouncedExpand = useRef(null);

  // 检测移动设备
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // 滚动到最新消息
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // 全局布局重置函数 - 简化版
  const resetPageLayout = useCallback(() => {
    // 只重置关键样式，避免过多操作导致闪烁
    document.documentElement.classList.remove('chat-expanded');
  }, []);

  // 统一的样式注入函数
  useEffect(() => {
    // 添加全局CSS规则
    const styleEl = document.createElement('style');
    styleEl.textContent = `
      /* 聊天助手容器 */
      .chat-assistant-container {
        position: fixed;
        z-index: 9999;
        bottom: 0;
        right: 0;
        width: 0;
        height: 0;
        pointer-events: none;
      }
      
      /* 聊天按钮 */
      .chat-button-container {
        position: fixed;
        z-index: 9999;
        bottom: 24px;
        right: 24px;
        width: 56px;
        height: 56px;
        transform: translateZ(0);
        will-change: transform;
        transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
        pointer-events: auto;
      }
      
      .chat-button {
        width: 100%;
        height: 100%;
        border-radius: 50%;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        display: flex;
        align-items: center;
        justify-content: center;
        overflow: hidden;
        cursor: pointer;
        transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1),
                    box-shadow 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
      }
      
      .chat-button:hover {
        transform: scale(1.08);
        box-shadow: 0 6px 16px rgba(0, 0, 0, 0.25);
      }
      
      .chat-button:active {
        transform: scale(0.96);
      }
      
      .chat-button-bg {
        position: absolute;
        inset: 0;
        border-radius: 50%;
        z-index: -1;
      }
      
      /* 聊天窗口 */
      .chat-window {
        position: fixed;
        right: 24px;
        bottom: 90px;
        width: 380px;
        max-width: 90vw;
        height: 520px;
        max-height: 80vh;
        border-radius: 16px;
        overflow: hidden;
        box-shadow: 0 12px 28px rgba(0, 0, 0, 0.25);
        z-index: 998;
        transform: translateZ(0);
        opacity: 0;
        pointer-events: none;
        transition: opacity 0.3s ease, transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
      }
      
      .chat-window.open {
        opacity: 1;
        pointer-events: auto;
        transform: translateZ(0) scale(1);
      }
      
      .chat-window.expanded {
        border-radius: 0;
        right: 0;
        bottom: 0;
        width: 450px;
        height: 100vh;
        max-height: 100vh;
      }
      
      /* 聊天窗口内容区 */
      .chat-messages {
        max-height: 100%;
        overflow-y: auto;
        scrollbar-width: thin;
        scroll-behavior: smooth;
      }
      
      .chat-messages::-webkit-scrollbar {
        width: 5px;
      }
      
      .chat-messages::-webkit-scrollbar-track {
        background: transparent;
      }
      
      .chat-messages::-webkit-scrollbar-thumb {
        background: rgba(100, 100, 100, 0.4);
        border-radius: 3px;
      }
      
      /* 移动端优化 */
      @media (max-width: 768px) {
        .chat-button-container {
          bottom: 16px;
          right: 16px;
          width: 48px;
          height: 48px;
        }
        
        .chat-window {
          right: 16px;
          bottom: 76px;
          width: 320px;
        }
        
        .chat-window.expanded {
          width: 100%;
          right: 0;
          bottom: 0;
        }
      }
      
      /* 页脚位置自适应 */
      .footer-visible .chat-button-container {
        transform: translateY(-80px);
      }
    `;
    document.head.appendChild(styleEl);
    
    return () => {
      document.head.removeChild(styleEl);
      resetPageLayout();
    };
  }, [resetPageLayout]);

  // 聊天按钮位置处理 - 优化版
  useEffect(() => {
    // 如果聊天窗口打开或组件未挂载，不处理
    if (isOpen) return;
    
    const chatButton = document.querySelector('.chat-button-container');
    if (!chatButton) return;
    
    // 页脚检测和按钮位置调整函数
    const adjustButtonPosition = () => {
      const footer = document.querySelector('footer');
      if (!footer) return;
      
      const footerRect = footer.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // 如果页脚在视口内
      if (footerRect.top < windowHeight) {
        document.documentElement.classList.add('footer-visible');
      } else {
        document.documentElement.classList.remove('footer-visible');
      }
    };
    
    // 节流函数 - 防止频繁触发
    let ticking = false;
    const throttledAdjust = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(() => {
          adjustButtonPosition();
          ticking = false;
        });
      }
    };
    
    // 监听滚动和窗口大小变化
    window.addEventListener('scroll', throttledAdjust, { passive: true });
    window.addEventListener('resize', throttledAdjust, { passive: true });
    
    // 初始调整
    setTimeout(adjustButtonPosition, 100);
    
    return () => {
      window.removeEventListener('scroll', throttledAdjust);
      window.removeEventListener('resize', throttledAdjust);
      document.documentElement.classList.remove('footer-visible');
    };
  }, [isOpen]);
  
  // 优化聊天窗口的滚动行为
  useEffect(() => {
    // 只在聊天窗口打开时处理
    if (!isOpen) return;
    
    const chatWindow = document.querySelector('.chat-window');
    if (!chatWindow) return;
    
    // 允许聊天窗口内部滚动，但阻止滚动传播到页面
    const handleScrollInChat = (e) => {
      const messagesContainer = e.target.closest('.chat-messages');
      
      // 如果不是在消息区域内滚动，阻止传播
      if (!messagesContainer || messagesContainer.scrollHeight <= messagesContainer.clientHeight) {
        e.stopPropagation();
      }
    };
    
    // 添加滚动事件监听
    chatWindow.addEventListener('wheel', handleScrollInChat, { passive: false });
    chatWindow.addEventListener('touchmove', handleScrollInChat, { passive: false });
    
    return () => {
      chatWindow.removeEventListener('wheel', handleScrollInChat);
      chatWindow.removeEventListener('touchmove', handleScrollInChat);
    };
  }, [isOpen]);

  // 处理打开/关闭聊天
  const toggleChat = useCallback(() => {
    if (isTransitioning) return;
    
    setIsTransitioning(true);
    
    if (isOpen) {
      // 关闭聊天
      if (isExpanded) {
        // 先收起
        setIsExpanded(false);
        
        // 延迟关闭
        setTimeout(() => {
          setIsOpen(false);
          setIsTransitioning(false);
        }, 300);
      } else {
        // 直接关闭
        setIsOpen(false);
        setIsTransitioning(false);
      }
    } else {
      // 打开聊天
      setIsOpen(true);
      setTimeout(() => {
        setIsPreloaded(true);
        scrollToBottom();
        setIsTransitioning(false);
      }, 50);
    }
  }, [isOpen, isExpanded]);

  // 添加调整聊天窗口位置的函数
  const adjustChatPosition = useCallback(() => {
    if (!chatContainerRef.current || isExpanded) return;
    
    // 为平滑过渡添加类
    if (!chatContainerRef.current.classList.contains('smooth-follow')) {
      chatContainerRef.current.classList.add('smooth-follow');
    }
    
    const chatHeight = chatContainerRef.current.offsetHeight;
    const windowHeight = window.innerHeight;
    const scrollY = window.scrollY;
    const documentHeight = document.documentElement.scrollHeight;
    
    // 计算当前视口底部位置
    const viewportBottom = scrollY + windowHeight;
    
    // 计算理想的距离页面底部的距离 (16px)
    const idealDistanceFromBottom = 16;
    const bottomPosition = viewportBottom + idealDistanceFromBottom;
    
    // 如果聊天窗口底部会超出文档底部，调整位置
    if (bottomPosition + chatHeight > documentHeight) {
      const maxOffset = chatHeight - windowHeight + idealDistanceFromBottom * 4;
      const offset = Math.min(bottomPosition + chatHeight - documentHeight, maxOffset);
      
      // 如果是一个很小的调整，不要应用变换以避免抖动
      if (offset > 2) {
        chatContainerRef.current.style.transform = `translateY(-${offset}px)`;
      }
    } else {
      // 如果文档足够长，恢复到正常位置
      chatContainerRef.current.style.transform = 'translateY(0)';
    }
  }, [isExpanded]);

  // 优化的滚动监听，使用节流避免性能问题
  useEffect(() => {
    if (!isOpen) return;
    
    let scrollTimeout;
    let isScrolling = false;
    
    // 初始调整
    adjustChatPosition();
    
    // 使用节流的滚动处理器
    const handleScroll = () => {
      if (!isScrolling) {
        isScrolling = true;
        
        // 在滚动过程中暂时移除过渡，使其跟随更紧密
        if (chatContainerRef.current) {
          chatContainerRef.current.classList.remove('smooth-follow');
        }
        
        // 请求动画帧更新位置
        requestAnimationFrame(() => {
          adjustChatPosition();
          isScrolling = false;
          
          // 滚动停止后恢复平滑过渡
          clearTimeout(scrollTimeout);
          scrollTimeout = setTimeout(() => {
            if (chatContainerRef.current) {
              chatContainerRef.current.classList.add('smooth-follow');
            }
          }, 100);
        });
      }
    };
    
    // 同样优化窗口大小调整处理
    let resizeTimeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      
      if (chatContainerRef.current) {
        chatContainerRef.current.classList.remove('smooth-follow');
      }
      
      resizeTimeout = setTimeout(() => {
        adjustChatPosition();
        
        if (chatContainerRef.current) {
          chatContainerRef.current.classList.add('smooth-follow');
        }
      }, 100);
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize, { passive: true });
    
    // 确保在组件挂载时也调整一次
    setTimeout(adjustChatPosition, 100);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      clearTimeout(scrollTimeout);
      clearTimeout(resizeTimeout);
    };
  }, [isOpen, adjustChatPosition]);

  // 在样式表中添加禁用过渡类和滚动优化样式
  useEffect(() => {
    const styleEl = document.createElement('style');
    styleEl.textContent = `
      .disable-transitions * {
        transition: none !important;
      }
      
      /* 平滑滚动跟随样式 */
      .smooth-follow {
        transition: transform 0.2s cubic-bezier(0.4, 0, 0.2, 1);
      }
      
      /* 防止在滚动时出现闪烁 */
      .chat-container-follow {
        will-change: transform;
        backface-visibility: hidden;
        -webkit-backface-visibility: hidden;
        pointer-events: auto;
      }
      
      /* 聊天按钮相关样式 - 完全重构 */
      .chat-overlay {
        position: fixed;
        z-index: 9999;
        bottom: 0;
        right: 0;
        pointer-events: none;
        width: 120px;
        height: 120px;
        display: flex;
        align-items: flex-end;
        justify-content: flex-end;
        padding: 0 20px 20px 0;
      }
      
      /* 主要聊天按钮 */
      .chat-button-wrapper {
        position: relative;
        pointer-events: auto;
        transform: translateZ(0);
        filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.2));
      }
      
      .chat-button {
        width: 58px;
        height: 58px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        transform: translateZ(0);
        overflow: hidden;
        transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1), 
                    box-shadow 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
      }
      
      .chat-button-bg {
        position: absolute;
        inset: 0;
        border-radius: 50%;
        z-index: -1;
      }
      
      .chat-button:hover {
        transform: scale(1.08);
        box-shadow: 0 6px 16px rgba(0, 0, 0, 0.25);
      }
      
      .chat-button:active {
        transform: scale(0.96);
      }
      
      /* 聊天窗口样式 */
      .chat-window {
        position: fixed;
        overflow: hidden;
        border-radius: 16px;
        box-shadow: 0 12px 28px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.05);
        transform: translateZ(0);
        transition: transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1), 
                    opacity 0.35s cubic-bezier(0.34, 1.56, 0.64, 1),
                    width 0.35s cubic-bezier(0.34, 1.56, 0.64, 1),
                    height 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);
      }
      
      /* 使用合适的z-index - 确保聊天相关元素始终在页面元素之上 */
      .chat-overlay {
        z-index: 999;
      }
      
      .chat-window {
        z-index: 998;
      }
      
      .chat-backdrop {
        z-index: 997;
      }
      
      /* 移动端样式优化 */
      @media (max-width: 768px) {
        .chat-overlay {
          width: 100px;
          height: 100px;
          padding: 0 16px 16px 0;
        }
        
        .chat-button {
          width: 52px;
          height: 52px;
        }
        
        .chat-window.expanded {
          border-radius: 0;
          width: 100% !important;
          height: 100% !important;
          max-width: none !important;
        }
      }
    `;
    document.head.appendChild(styleEl);
    
    return () => {
      document.head.removeChild(styleEl);
    };
  }, []);

  // 添加与页脚协同的聊天按钮逻辑
  useEffect(() => {
    if (isOpen) return; // 聊天打开时不调整位置
    
    const chatButton = document.querySelector('.chat-overlay');
    if (!chatButton) return;
    
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const scrollY = window.scrollY;
      const documentHeight = document.documentElement.scrollHeight;
      
      // 获取页脚元素
      const footer = document.querySelector('footer');
      
      if (footer) {
        const footerRect = footer.getBoundingClientRect();
        
        // 如果页脚进入视口，调整按钮位置
        if (footerRect.top < windowHeight) {
          // 计算按钮应该上移的距离
          const overlapAmount = Math.min(windowHeight - footerRect.top + 16, 120);
          chatButton.style.transform = `translateY(-${overlapAmount}px)`;
        } else {
          // 恢复默认位置
          chatButton.style.transform = '';
        }
      }
    };
    
    // 添加滚动防抖功能
    let scrollTimer;
    const debouncedScroll = () => {
      clearTimeout(scrollTimer);
      
      // 在滚动过程中使用更简单的变换，避免抖动
      if (!chatButton.hasAttribute('data-scrolling')) {
        chatButton.setAttribute('data-scrolling', 'true');
        chatButton.style.transition = 'none';
      }
      
      // 基本位置调整
      handleScroll();
      
      // 滚动停止后恢复平滑过渡
      scrollTimer = setTimeout(() => {
        chatButton.removeAttribute('data-scrolling');
        chatButton.style.transition = 'transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)';
        handleScroll(); // 再次检查位置，应用平滑过渡
      }, 100);
    };
    
    window.addEventListener('scroll', debouncedScroll, { passive: true });
    window.addEventListener('resize', debouncedScroll, { passive: true });
    window.addEventListener('load', handleScroll);
    
    // 初始检查位置
    setTimeout(handleScroll, 100);
    
    return () => {
      window.removeEventListener('scroll', debouncedScroll);
      window.removeEventListener('resize', debouncedScroll);
      window.removeEventListener('load', handleScroll);
    };
  }, [isOpen]);

  // 解决聊天窗口的滚动问题
  useEffect(() => {
    if (!isOpen) return;
    
    // 处理聊天窗口的滚动行为
    const chatWindow = chatContainerRef.current;
    if (!chatWindow) return;
    
    // 将滚动限制在聊天窗口内部
    const preventBodyScroll = (e) => {
      // 如果是在消息区域内滚动，允许滚动
      if (e.target.closest('.messages-container')) {
        return;
      }
      
      // 否则阻止事件传播到body，避免整个页面滚动
      e.stopPropagation();
    };
    
    chatWindow.addEventListener('wheel', preventBodyScroll);
    chatWindow.addEventListener('touchmove', preventBodyScroll, { passive: false });
    
    return () => {
      chatWindow.removeEventListener('wheel', preventBodyScroll);
      chatWindow.removeEventListener('touchmove', preventBodyScroll);
    };
  }, [isOpen]);

  // 使用useEffect监听isOpen状态变化
  useEffect(() => {
    if (isOpen) {
      // 聊天打开时滚动到底部
      setTimeout(scrollToBottom, 150);
      
      // 移动设备打开聊天时，自动进入全屏模式
      if (isMobile && !isExpanded) {
        setIsExpanded(true);
      }
    }

    // 预热渲染管道，改善用户体验
    if (!isPreloaded && !isOpen) {
      // 异步预加载关键组件
      const timer = setTimeout(() => {
        setIsPreloaded(true);
        // 几秒后如果没有打开聊天，清理预加载状态以节省内存
        const cleanupTimer = setTimeout(() => {
          if (!isOpen) setIsPreloaded(false);
        }, 30000);
        return () => clearTimeout(cleanupTimer);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isOpen, isMobile, isExpanded, isPreloaded]);

  // 监听扩展状态变化，调整主布局
  useEffect(() => {
    const adjustLayout = () => {
      // 获取所有需要调整的元素
      const mainContent = document.querySelector('main') || document.getElementById('content');
      const navbar = document.querySelector('nav') || document.querySelector('header');
      const allSections = document.querySelectorAll('section');
      const contentCards = document.querySelectorAll('.card, .resource-card, [class*="card"], [class*="Card"], .grid-item, .item, .content-box');
      
      if (isExpanded && isOpen) {
        // 聊天扩展时的过渡效果 - 使用更平滑的贝塞尔曲线
        const transition = 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1), width 0.6s cubic-bezier(0.16, 1, 0.3, 1), margin-right 0.6s cubic-bezier(0.16, 1, 0.3, 1), padding-right 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
        
        // 在移动设备上不收缩
        if (!isMobile) {
          // 设置整个页面的位移量 - 为聊天窗口腾出空间
          const shiftWidth = '25vw';  // 匹配聊天窗口宽度
          
          // 主内容区域处理 - 仅添加右侧边距，不改变宽度
          if (mainContent) {
            mainContent.style.transition = transition;
            mainContent.style.paddingRight = shiftWidth;
            // 不改变宽度，避免闪烁
          }
          
          // 导航栏处理 - 仅添加右侧边距
          if (navbar) {
            navbar.style.transition = transition;
            navbar.style.paddingRight = shiftWidth;
          }
          
          // 添加一个类，用于CSS选择器更精细控制
          document.documentElement.classList.add('chat-expanded');
        }
      } else {
        // 恢复原始布局
        const transition = 'padding-right 0.4s cubic-bezier(0.33, 1, 0.68, 1), margin-right 0.4s cubic-bezier(0.33, 1, 0.68, 1)';
        
        // 重置主内容
        if (mainContent) {
          mainContent.style.transition = transition;
          mainContent.style.paddingRight = '0';
        }
        
        // 重置导航栏
        if (navbar) {
          navbar.style.transition = transition;
          navbar.style.paddingRight = '0';
        }
        
        // 移除特殊状态类
        document.documentElement.classList.remove('chat-expanded');
      }
    };
    
    // 避免频繁调整引起的闪烁
    const debouncedAdjust = setTimeout(adjustLayout, 50);
    
    // 确保在窗口大小变化时重新调整 - 使用节流函数避免闪烁
    let resizeTimer;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(adjustLayout, 100);
    };
    
    window.addEventListener('resize', handleResize);
    
    // 恢复布局的清理函数
    const resetLayout = () => {
      if (!isOpen || !isExpanded) {
        const mainContent = document.querySelector('main') || document.getElementById('content');
        const navbar = document.querySelector('nav') || document.querySelector('header');
        
        // 确保完全重置所有布局样式
        if (mainContent) {
          mainContent.style.paddingRight = '0';
        }
        
        if (navbar) {
          navbar.style.paddingRight = '0';
        }
        
        document.documentElement.classList.remove('chat-expanded');
      }
    };
    
    // 确保在组件卸载时重置布局
    return () => {
      clearTimeout(debouncedAdjust);
      clearTimeout(resizeTimer);
      resetLayout();
      window.removeEventListener('resize', handleResize);
    };
  }, [isExpanded, isMobile, isOpen]);

  // 在关闭聊天时重置布局 - 简化版
  useEffect(() => {
    if (!isOpen) {
      // 使用更可靠的定时器确保视觉效果平滑
      const resetTimeout = setTimeout(() => {
        const mainContent = document.querySelector('main') || document.getElementById('content');
        const navbar = document.querySelector('nav') || document.querySelector('header');
        
        // 先移除过渡效果，再重置样式，避免闪烁
        if (mainContent) {
          mainContent.style.transition = 'none';
          setTimeout(() => {
            mainContent.style.paddingRight = '';
          }, 10);
        }
        
        if (navbar) {
          navbar.style.transition = 'none';
          setTimeout(() => {
            navbar.style.paddingRight = '';
          }, 10);
        }
        
        document.documentElement.classList.remove('chat-expanded');
      }, 300); // 在动画完成前执行
      
      return () => clearTimeout(resetTimeout);
    }
  }, [isOpen]);

  // 从本地存储加载配置
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const savedConfigs = localStorage.getItem('aiModelConfigs');
        if (savedConfigs) {
          setModelConfig(JSON.parse(savedConfigs));
        }
        
        // 加载保存的特定模型设置
        const savedModel = localStorage.getItem('aiSpecificModel');
        if (savedModel && DEEPSEEK_MODELS[savedModel]) {
          setSpecificModel(savedModel);
        }

        // 加载主题设置
        const savedTheme = localStorage.getItem('aiTheme');
        if (savedTheme) {
          setTheme(savedTheme);
        }
      } catch (error) {
        console.error('加载设置失败:', error);
      }
    }
  }, []);

  // 保存模型设置
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('aiSpecificModel', specificModel);
    }
  }, [specificModel]);
  
  // 保存主题设置
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('aiTheme', theme);
    }
  }, [theme]);

  // 选择深度搜索特定模型
  const selectDeepSeekModel = (model) => {
    setSpecificModel(model);
    setModelMenuOpen(false);
    // 添加模型切换提示
    setMessages(prev => [
      ...prev, 
      { 
        type: 'bot', 
        content: `已切换至${DEEPSEEK_MODELS[model].name}模型。${DEEPSEEK_MODELS[model].description}。`
      }
    ]);
  };

  // 切换主题
  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
  };

  // 智能防抖展开/收缩功能
  const toggleExpand = useCallback(() => {
    setIsTransitioning(true);
    
    // 取消任何待处理的防抖调用
    if (debouncedExpand.current) {
      clearTimeout(debouncedExpand.current);
    }
    
    // 创建新的防抖调用
    debouncedExpand.current = setTimeout(() => {
      setIsExpanded(prev => !prev);
      // 在切换后重新滚动到底部
      setTimeout(() => {
        scrollToBottom();
        setIsTransitioning(false);
      }, 400);
    }, 10);
  }, []);

  // 重启网站功能
  const restartWebsite = async () => {
    if (!confirm('确定要重启网站吗？这将临时中断所有服务。')) {
      return;
    }
    
    try {
      setIsTyping(true);
      // 添加一条系统消息
      setMessages(prev => [
        ...prev, 
        { 
          type: 'bot', 
          content: '正在执行网站重启，请稍等...'
        }
      ]);
      
      const response = await fetch('/api/restart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ key: 'abunb-server-restart-secure-key' }),
      });
      
      // 检查响应状态
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (data.success) {
        setMessages(prev => [
          ...prev, 
          { 
            type: 'bot', 
            content: '网站重启成功！请在几秒钟后刷新页面。'
          }
        ]);
        
        // 给用户一个倒计时刷新的体验
        let countdown = 5;
        const intervalId = setInterval(() => {
          if (countdown <= 0) {
            clearInterval(intervalId);
            window.location.reload(); // 自动刷新页面
            return;
          }
          
          setMessages(prev => {
            const updatedMessages = [...prev];
            const lastIndex = updatedMessages.length - 1;
            if (lastIndex >= 0) {
              updatedMessages[lastIndex].content = `网站重启成功！页面将在${countdown}秒后自动刷新...`;
            }
            return updatedMessages;
          });
          
          countdown--;
        }, 1000);
        
      } else {
        throw new Error(data.message || '重启失败，未返回成功状态');
      }
    } catch (error) {
      console.error('重启请求错误:', error);
      setMessages(prev => [
        ...prev, 
        { 
          type: 'bot', 
          content: `重启失败: ${error.message}`
        }
      ]);
    } finally {
      setIsTyping(false);
      setTimeout(scrollToBottom, 100);
    }
  };

  // 修改API调用函数，解决终端问题
  const getAIResponse = async (messageList) => {
    setIsTyping(true);
    setError(null);
    setUsage(null);
    
    try {
      // 生成一个唯一的请求ID用于日志跟踪
      const requestId = Math.random().toString(36).substring(2, 10);
      console.log(`[${requestId}] 开始AI请求: ${specificModel}`);
      
      // 使用当前模型的自定义配置
      const currentConfig = modelConfig ? modelConfig[modelType] : null;
      
      // 对消息进行预处理，防止终端问题
      let processedMessages = messageList.map(msg => {
        // 移除可能导致终端的特殊字符和控制字符
        let cleanContent = msg.content;
        if (msg.content) {
          cleanContent = msg.content
            .replace(/[\x00-\x1F\x7F-\x9F]/g, '') // 移除控制字符
            .replace(/`{3}([\s\S]*?)`{3}/g, (match) => match); // 保留代码块，但确保安全
        }
        
        const { reasoning_content, ...cleanedMsg } = msg;
        return { ...cleanedMsg, content: cleanContent };
      });
      
      if (specificModel === 'deepseek-reasoner') {
        // 仅保留最后一条用户消息和之前的助手欢迎消息
        const userMessages = processedMessages.filter(msg => msg.type === 'user');
        if (userMessages.length > 0) {
          const lastUserMessage = userMessages[userMessages.length - 1];
          processedMessages = [
            processedMessages[0], // 保留初始的欢迎消息
            lastUserMessage  // 仅保留最后一条用户消息
          ];
          console.log(`[${requestId}] R1模型使用简化消息记录`);
        }
      }
      
      // 准备新的空白AI回复消息
      const streamId = Date.now();
      const newMessage = { 
        type: 'bot', 
        content: '',
        reasoning_content: '',
        streamId,
        streaming: true
      };
      
      // 立即添加一条空消息，准备流式更新
      setMessages(prev => [...prev, newMessage]);
      
      // 使用EventSource进行流式通信
      try {
        console.log(`[${requestId}] 开始流式API调用`);
        
        // 创建请求体
        const requestBody = {
          messages: processedMessages,
          modelType: modelType,
          modelConfig: currentConfig,
          specificModel: specificModel,
          stream: true,
          requestId: requestId
        };
        
        // 发送POST请求启动流
        const fetchPromise = fetch('/api/ai/chat', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(requestBody)
        });
        
        // 设置超时处理
        const timeoutPromise = new Promise((_, reject) => {
          setTimeout(() => reject(new Error('请求超时')), 60000);
        });
        
        // 等待响应
        const response = await Promise.race([fetchPromise, timeoutPromise]);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let accumulatedContent = '';
        let reasoningContent = '';
        
        // 读取流式响应
        while (true) {
          const { done, value } = await reader.read();
          
          if (done) {
            console.log(`[${requestId}] 流式传输完成`);
            break;
          }
          
          // 解码当前块
          const chunk = decoder.decode(value, { stream: true });
          
          // 解析事件流
          const lines = chunk.split('\n\n');
          for (const line of lines) {
            if (line.startsWith('data: ')) {
              const data = JSON.parse(line.substring(6));
              
              switch (data.type) {
                case 'reasoning':
                  // 更新思维链内容
                  reasoningContent += data.content;
                  setMessages(prev => {
                    const updatedMessages = [...prev];
                    const streamingMsgIndex = updatedMessages.findIndex(msg => 
                      msg.streamId === streamId && msg.streaming
                    );
                    
                    if (streamingMsgIndex === -1) return prev;
                    
                    updatedMessages[streamingMsgIndex].reasoning_content = reasoningContent;
                    return updatedMessages;
                  });
                  break;
                  
                case 'content':
                  // 更新常规内容
                  accumulatedContent += data.content;
                  setMessages(prev => {
                    const updatedMessages = [...prev];
                    const streamingMsgIndex = updatedMessages.findIndex(msg => 
                      msg.streamId === streamId && msg.streaming
                    );
                    
                    if (streamingMsgIndex === -1) return prev;
                    
                    updatedMessages[streamingMsgIndex].content = accumulatedContent;
                    return updatedMessages;
                  });
                  break;
                  
                case 'done':
                  // 流完成，更新最终状态
                  setMessages(prev => {
                    const updatedMessages = [...prev];
                    const streamingMsgIndex = updatedMessages.findIndex(msg => 
                      msg.streamId === streamId && msg.streaming
                    );
                    
                    if (streamingMsgIndex === -1) return prev;
                    
                    // 更新最终内容并移除流式标记
                    if (data.reasoning_content) {
                      updatedMessages[streamingMsgIndex].reasoning_content = data.reasoning_content;
                      updatedMessages[streamingMsgIndex].content = `## 思考过程\n${data.reasoning_content}\n\n## 最终回答\n${data.content}`;
                    } else {
                      updatedMessages[streamingMsgIndex].content = data.content;
                    }
                    
                    updatedMessages[streamingMsgIndex].streaming = false;
                    return updatedMessages;
                  });
                  
                  // 更新使用量信息
                  if (data.usage) {
                    setUsage({
                      ...data.usage,
                      model: data.model,
                      modelType: data.modelType,
                      modelName: data.modelName
                    });
                  }
                  break;
                  
                case 'error':
                  // 处理错误
                  setError(`API调用错误: ${data.error}`);
                  setMessages(prev => {
                    const updatedMessages = [...prev];
                    const streamingMsgIndex = updatedMessages.findIndex(msg => 
                      msg.streamId === streamId && msg.streaming
                    );
                    
                    if (streamingMsgIndex === -1) return prev;
                    
                    updatedMessages[streamingMsgIndex].content = `抱歉，发生错误: ${data.error}`;
                    updatedMessages[streamingMsgIndex].streaming = false;
                    return updatedMessages;
                  });
                  console.error(`[${requestId}] 流式传输错误:`, data.error);
                  break;
              }
            }
          }
        }
      } catch (err) {
        console.error(`[${requestId}] 流式API调用失败:`, err);
        
        // 错误处理
        let errorMessage = '连接服务器时出现问题。请稍后再试。';
        
        if (err.name === 'AbortError' || err.message.includes('超时')) {
          errorMessage = '连接超时，服务器响应时间过长。';
        } else if (err.message.includes('NetworkError')) {
          errorMessage = '网络错误，请检查您的网络连接。';
        } else if (err.response?.status === 429) {
          errorMessage = '请求过于频繁，请稍后再试。';
        } else if (err.response?.status === 413) {
          errorMessage = '请求内容过长，请尝试分多次提问。';
        } else if (err.response?.data?.error) {
          errorMessage = `错误: ${err.response.data.error}`;
        }
        
        setError(`API调用错误: ${err.message}`);
        
        // 更新消息为错误消息
        setMessages(prev => {
          const updatedMessages = [...prev];
          const streamingMsgIndex = updatedMessages.findIndex(msg => 
            msg.streamId === streamId && msg.streaming
          );
          
          if (streamingMsgIndex === -1) return prev;
          
          updatedMessages[streamingMsgIndex].content = `抱歉，${errorMessage}`;
          updatedMessages[streamingMsgIndex].streaming = false;
          return updatedMessages;
        });
      } finally {
        setIsTyping(false);
      }
    } catch (err) {
      console.error(`调用AI API最终失败:`, err);
      
      // 如果API调用失败，显示错误信息并使用预设回复
      let errorMessage = '连接服务器时出现问题。请稍后再试。';
      
      if (err.message.includes('超时')) {
        errorMessage = '连接超时，服务器响应时间过长。';
      } else if (err.response?.status === 429) {
        errorMessage = '请求过于频繁，请稍后再试。';
      } else if (err.response?.status === 413) {
        errorMessage = '请求内容过长，请尝试分多次提问。';
      } else if (err.response?.data?.error) {
        errorMessage = `错误: ${err.response.data.error}`;
      }
      
      setError(`API调用错误: ${err.message}`);
      setMessages(prev => [
        ...prev, 
        { 
          type: 'bot', 
          content: `抱歉，${errorMessage}`
        }
      ]);
      
      setIsTyping(false);
    }
  };

  // 处理发送消息
  const handleSend = () => {
    if (input.trim() === '') return;
    
    // 添加用户消息
    const userMessage = { type: 'user', content: input };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    
    // 调用AI API
    getAIResponse(updatedMessages);
    
    // 清空输入框
    setInput('');
  };

  // 双击头部扩展/收缩聊天窗口
  const handleHeaderDoubleClick = () => {
    toggleExpand();
  };

  // 优化处理输入键盘事件
  const handleKeyDown = (e) => {
    // 在移动设备上，如果按回车键且没有按住shift，发送消息
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
    
    // 按下Esc键可以关闭聊天窗口
    if (e.key === 'Escape' && !isTyping) {
      e.preventDefault();
      setIsOpen(false);
    }
  };

  // 获取当前模型颜色
  const getCurrentModelColor = () => {
    return DEEPSEEK_MODELS[specificModel]?.color || 'from-violet-500 to-indigo-500';
  };
  
  // 获取当前模型图标颜色
  const getCurrentModelIconColor = () => {
    return DEEPSEEK_MODELS[specificModel]?.iconColor || 'from-violet-400 to-indigo-400';
  };

  // 复制对话内容
  const copyConversation = () => {
    const conversationText = messages
      .map(msg => 
        msg.type === 'user' 
          ? `用户: ${msg.content}` 
          : `AI: ${msg.content.replace(/<[^>]*>/g, '')}`
      )
      .join('\n\n');
    
    navigator.clipboard.writeText(conversationText).then(() => {
      showCopyNotification('已复制对话内容');
    });
  };

  // 清空聊天记录
  const clearChat = () => {
    setMessages([
      { 
        type: 'bot', 
        content: `你好！我是基于${DEEPSEEK_MODELS[specificModel].name}的专业智能助手。${
          specificModel === 'deepseek-reasoner' ? 
          '我会展示完整思维链，帮助你理解我的推理过程。' : 
          '我将提供系统化的分析和推理过程，展示完整思考链路。'
        }请告诉我需要解答的问题。`
      }
    ]);
  };

  // 更新格式化函数，增加数学公式支持
  const formatReasoningContent = (content) => {
    // 添加对推理步骤的格式化
    let formattedContent = content;

    // 格式化数学公式 - 行内公式
    formattedContent = formattedContent.replace(
      /\$([^$]+)\$/g,
      (_, formula) => {
        try {
          const renderedFormula = katex.renderToString(formula, {
            throwOnError: false,
            displayMode: false,
            output: 'html'
          });
          return `<span class="math-inline" data-formula="${encodeURIComponent(formula)}">${renderedFormula}</span>`;
        } catch (e) {
          console.error('KaTeX行内公式渲染错误:', e);
          return `<span class="text-red-400">$${formula}$</span>`;
        }
      }
    );
    
    // 格式化数学公式 - 块级公式
    formattedContent = formattedContent.replace(
      /\$\$([\s\S]+?)\$\$/g,
      (_, formula) => {
        try {
          const renderedFormula = katex.renderToString(formula, {
            throwOnError: false,
            displayMode: true,
            output: 'html'
          });
          return `<div class="math-block my-4 py-2 text-center" data-formula="${encodeURIComponent(formula)}">${renderedFormula}</div>`;
        } catch (e) {
          console.error('KaTeX块级公式渲染错误:', e);
          return `<div class="text-red-400 my-2">$$${formula}$$</div>`;
        }
      }
    );

    // 格式化标题和小标题
    formattedContent = formattedContent.replace(
      /## (.*?)(?=\n)/g,
      (_, title) => `<div class="font-bold text-violet-400 text-base mb-2 mt-3">${title}</div>`
    );
    
    // 格式化分析和思考标记
    formattedContent = formattedContent.replace(
      /分析:|思考:|步骤 \d+:|Step \d+:|推理:|分析结果:|总结:|结论:|解决方案:|思路:|思考过程:|解决思路:|分析问题:|考虑因素:|实现方法:|技术细节:|最终方案:|评估:|优化方向:|问题分析:|解决思路:|方案实现:|技术分析:|框架选择:|实现步骤:/g,
      match => `<span class="font-semibold text-emerald-400 inline-block mt-2">${match}</span>`
    );

    // 格式化编号列表
    formattedContent = formattedContent.replace(
      /(\d+\.) (.*?)(?=\n\d+\.|$)/gs,
      (_, num, content) => `<div class="mb-1 pl-2 border-l-2 border-blue-500/40 ml-1 py-1"><span class="font-semibold text-blue-400">${num}</span> ${content}</div>`
    );
    
    // 格式化重点内容
    formattedContent = formattedContent.replace(
      /\*\*(.*?)\*\*/g,
      (_, content) => `<span class="font-semibold text-amber-400">${content}</span>`
    );

    // 格式化代码块
    formattedContent = formattedContent.replace(
      /```(\w*)\n([\s\S]*?)\n```/g,
      (_, language, code) => `
        <div class="relative bg-gray-800 rounded-md p-3 my-2 overflow-x-auto text-gray-100 group">
          <div class="flex justify-between items-center text-xs text-gray-400 mb-1">
            <span>${language || 'code'}</span>
            <button class="copy-code-btn hidden group-hover:block bg-gray-700 hover:bg-gray-600 px-2 py-1 rounded text-xs transition-colors" 
                    data-code="${encodeURIComponent(code)}" 
                    onclick="navigator.clipboard.writeText(decodeURIComponent(this.dataset.code)).then(() => { this.textContent = '已复制!'; setTimeout(() => { this.textContent = '复制'; }, 2000); })">
              复制
            </button>
          </div>
          <pre>${code}</pre>
        </div>
      `
    );
    
    // 添加引用格式
    formattedContent = formattedContent.replace(
      /> (.*?)(?=\n)/g,
      (_, quote) => `<div class="border-l-4 border-gray-500 pl-2 py-1 italic text-gray-400 my-2">${quote}</div>`
    );

    // 处理思维链和最终回答的分隔
    formattedContent = formattedContent.replace(
      /## 思考过程([\s\S]*?)## 最终回答/g,
      (_, reasoningContent) => `
        <div class="reasoning-container mb-4 animate-fadeIn">
          <div class="reasoning-header flex items-center bg-gradient-to-r from-purple-900/30 to-indigo-900/30 p-2 rounded-t-lg border-t border-l border-r border-purple-500/30">
            <svg class="w-4 h-4 text-purple-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path>
            </svg>
            <div class="font-bold text-purple-400 text-sm">思维链分析过程</div>
          </div>
          <div class="reasoning-content p-3 bg-purple-900/10 border border-purple-500/30 rounded-b-lg text-sm">
            ${reasoningContent}
          </div>
        </div>
        <div class="answer-header flex items-center bg-gradient-to-r from-green-900/30 to-emerald-900/30 p-2 rounded-t-lg border-t border-l border-r border-green-500/30">
          <svg class="w-4 h-4 text-green-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          <div class="font-bold text-green-400 text-sm">最终回答</div>
        </div>
        <div class="answer-content p-3 bg-green-900/10 border border-green-500/30 rounded-b-lg mb-2">`
    );
    
    // 处理最终回答的结束部分
    formattedContent = formattedContent + '</div>';

    return formattedContent;
  };

  // 在页面加载后添加复制功能
  useEffect(() => {
    const addCopyFunctionality = () => {
      // 为每个数学公式添加点击复制功能
      document.querySelectorAll('.math-inline, .math-block').forEach(element => {
        element.addEventListener('click', function() {
          const formula = decodeURIComponent(this.getAttribute('data-formula'));
          navigator.clipboard.writeText(formula).then(() => {
            // 显示复制成功通知
            showCopyNotification('复制公式成功');
          }).catch(err => {
            console.error('公式复制失败:', err);
          });
        });
      });
      
      // 为代码块添加复制功能
      document.querySelectorAll('.copy-code-btn').forEach(button => {
        button.addEventListener('click', function(e) {
          e.stopPropagation();
          const code = decodeURIComponent(this.getAttribute('data-code'));
          navigator.clipboard.writeText(code).then(() => {
            this.textContent = '已复制!';
            setTimeout(() => {
              this.textContent = '复制';
            }, 2000);
            // 显示复制成功通知
            showCopyNotification('复制代码成功');
          }).catch(err => {
            console.error('代码复制失败:', err);
          });
        });
      });
    };
    
    // 在每次消息更新后添加复制功能
    if (isOpen) {
      setTimeout(addCopyFunctionality, 100);
    }
  }, [messages, isOpen]);

  const showCopyNotification = (message) => {
    setCopyNotification({ show: true, message });
    setTimeout(() => {
      setCopyNotification({ show: false, message: '' });
    }, 2000);
  };

  // 点击背景蒙层关闭聊天窗口
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      setIsOpen(false);
    }
  };
  
  // 键盘快捷键支持
  useEffect(() => {
    const handleKeyDown = (e) => {
      // 按ESC键关闭聊天窗口
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
      
      // 按Ctrl+i 或 Cmd+i 打开/关闭聊天窗口
      if ((e.ctrlKey || e.metaKey) && e.key === 'i') {
        e.preventDefault();
        setIsOpen(prev => !prev);
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);
  
  // 路由变化时保持聊天状态
  useEffect(() => {
    const handleRouteChange = () => {
      // 如果需要在路由变化时关闭聊天
      // setIsOpen(false);
    };
    
    router.events?.on('routeChangeStart', handleRouteChange);
    return () => {
      router.events?.off('routeChangeStart', handleRouteChange);
    };
  }, [router]);

  // 增强输入栏焦点管理
  const textareaRef = useRef(null);
  
  useEffect(() => {
    // 当聊天窗口打开时自动聚焦输入框
    if (isOpen && textareaRef.current) {
      setTimeout(() => {
        textareaRef.current?.focus();
      }, 300);
    }
  }, [isOpen]);

  // 处理全局布局监听，确保恢复页面原始布局
  useEffect(() => {
    // 监听页面可见性变化，当用户切换标签页再返回时恢复布局
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible' && !isOpen) {
        resetPageLayout();
      }
    };
    
    // 添加卸载前的事件监听，确保页面关闭前恢复原始布局
    const handleBeforeUnload = () => {
      resetPageLayout();
    };
    
    // 页面滚动时检查并修复布局
    const handleScroll = () => {
      if (!isOpen && !isExpanded) {
        resetPageLayout();
      }
    };
    
    // 添加事件监听
    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('beforeunload', handleBeforeUnload);
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      // 清理事件监听
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('beforeunload', handleBeforeUnload);
      window.removeEventListener('scroll', handleScroll);
      
      // 确保组件卸载时恢复布局
      resetPageLayout();
    };
  }, [isOpen, isExpanded, resetPageLayout]);

  // return语句，确保样式正确
  return (
    <>
      {/* AI助手浮动按钮 */}
      <div className="chat-overlay">
        <div className="chat-button-wrapper">
          {!isOpen && (
            <motion.div
              className="cursor-pointer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleChat}
              role="button"
              aria-label="打开聊天助手"
              tabIndex={0}
              style={{
                background: `linear-gradient(to right, var(--violet-500), var(--indigo-500))`,
                width: '56px',
                height: '56px', 
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)'
              }}
            >
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
              </svg>
            </motion.div>
          )}
          
          {/* 快捷键提示 */}
          <AnimatePresence>
            {!isOpen && (
              <motion.div
                className={`absolute right-full mr-2 top-1/2 transform -translate-y-1/2 px-2 py-1 rounded text-xs whitespace-nowrap ${
                  theme === 'dark' 
                    ? 'bg-gray-800 text-gray-200 border border-gray-700' 
                    : 'bg-white text-gray-800 border border-gray-200'
                } shadow-md hidden md:block`}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                transition={{ delay: 0.5 }}
              >
                按<kbd className="px-1 mx-0.5 bg-opacity-20 bg-white rounded">Ctrl</kbd>+<kbd className="px-1 mx-0.5 bg-opacity-20 bg-white rounded">i</kbd>打开聊天
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
      
      {/* 背景蒙层 */}
      <AnimatePresence>
        {isOpen && !isExpanded && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-30 z-30 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={handleBackdropClick}
            onTouchEnd={handleBackdropClick}
            role="button"
            tabIndex={-1}
            aria-label="关闭聊天"
          />
        )}
      </AnimatePresence>
      
      {/* 聊天窗口 */}
      <div 
        ref={chatContainerRef}
        className={`chat-window ${isOpen ? 'open' : ''} ${isExpanded ? 'expanded' : ''} ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'} border ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'} flex flex-col`}
      >
        {/* 关闭按钮 */}
        <motion.button
          className={`absolute ${isExpanded ? 'top-4 right-4' : 'top-3 right-3'} z-50 p-2 rounded-full bg-pink-500 hover:bg-pink-600 text-white shadow-md hover:shadow-lg transition-all duration-200`}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            setIsOpen(false);
            if (isExpanded) {
              setIsExpanded(false);
            }
          }}
          aria-label="关闭聊天"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </motion.button>
        
        {/* 头部 */}
        <div 
          className={`p-3 border-b ${theme === 'dark' ? 'border-gray-800 bg-gray-900/95' : 'border-gray-200 bg-gray-50/95'} flex items-center justify-between select-none backdrop-blur-sm ${isExpanded ? 'bg-opacity-90' : ''}`}
          onDoubleClick={handleHeaderDoubleClick}
        >
          <div className="flex items-center">
            <div className={`w-7 h-7 rounded-full bg-gradient-to-br ${getCurrentModelColor()} flex-shrink-0 flex items-center justify-center shadow-lg mr-2.5`}>
              <span className="text-white font-bold text-xs">A</span>
            </div>
            <div>
              <h3 className={`font-medium text-sm ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>阿不智能助手</h3>
              <p className={`text-[10px] ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                {DEEPSEEK_MODELS[specificModel]?.name || 'DeepSeek'} 模型
              </p>
            </div>
          </div>
          
          {/* 工具栏按钮 */}
          <div className="flex items-center space-x-1.5">
            {/* 复制对话按钮 */}
            <motion.button
              className={`p-1.5 rounded-full ${theme === 'dark' ? 'hover:bg-gray-700/50' : 'hover:bg-gray-200/50'} text-${theme === 'dark' ? 'gray-300' : 'gray-600'}`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={copyConversation}
              aria-label="复制对话"
              title="复制对话"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
              </svg>
            </motion.button>
            
            {/* 扩展/收缩按钮 */}
            <motion.button
              className={`p-1.5 rounded-full ${theme === 'dark' ? 'hover:bg-gray-700/50' : 'hover:bg-gray-200/50'} text-${theme === 'dark' ? 'gray-300' : 'gray-600'}`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleExpand}
              aria-label={isExpanded ? "收起窗口" : "展开窗口"}
            >
              {isExpanded ? (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7M5 13l4 4M19 7l-4-4M5 13h8" />
                </svg>
              ) : (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                </svg>
              )}
            </motion.button>
            
            {/* 重启网站按钮 */}
            <motion.button
              className={`p-1.5 rounded-full ${theme === 'dark' ? 'hover:bg-gray-700/50' : 'hover:bg-gray-200/50'} text-${theme === 'dark' ? 'gray-300' : 'gray-600'}`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={restartWebsite}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            </motion.button>
            
            {/* 模型选择器 */}
            <div className="relative">
              <motion.button
                className={`flex items-center p-1.5 rounded-full ${theme === 'dark' ? 'hover:bg-gray-700/50' : 'hover:bg-gray-200/50'} text-${theme === 'dark' ? 'gray-300' : 'gray-600'}`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setModelMenuOpen(!modelMenuOpen)}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </motion.button>
              
              <AnimatePresence>
                {modelMenuOpen && (
                  <motion.div
                    className={`absolute right-0 top-10 w-60 rounded-xl shadow-lg ${theme === 'dark' ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'} overflow-hidden z-50`}
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className={`px-4 py-2 ${theme === 'dark' ? 'bg-gray-900/50 text-gray-300' : 'bg-gray-100/50 text-gray-700'} text-sm font-medium`}>选择模型</div>
                    <div className="p-2 space-y-1">
                      {Object.entries(DEEPSEEK_MODELS).map(([key, model]) => (
                        <motion.button
                          key={key}
                          className={`w-full text-left px-3 py-2 rounded-lg flex items-center space-x-2 ${
                            specificModel === key 
                              ? `bg-gradient-to-r ${model.color} text-white` 
                              : `${theme === 'dark' ? 'hover:bg-gray-700/50 text-gray-200' : 'hover:bg-gray-100 text-gray-700'}`
                          }`}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => selectDeepSeekModel(key)}
                        >
                          <div className={`w-6 h-6 rounded-full bg-gradient-to-br ${model.color} flex items-center justify-center`}>
                            <span className="text-white font-bold text-xs">
                              {key.includes('r1') ? 'R1' : key.includes('coder') ? 'C' : key.includes('rl') ? 'RL' : 'D'}
                            </span>
                          </div>
                          <div>
                            <div className="font-medium">{model.name}</div>
                            <div className={`text-xs ${specificModel === key ? 'text-gray-100' : theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>{model.description}</div>
                          </div>
                        </motion.button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            
            {/* 主题切换 */}
            <motion.button
              className={`p-1.5 rounded-full ${theme === 'dark' ? 'hover:bg-gray-700/50' : 'hover:bg-gray-200/50'} text-${theme === 'dark' ? 'gray-300' : 'gray-600'}`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleTheme}
            >
              {theme === 'dark' ? (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              ) : (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              )}
            </motion.button>
            
            {/* 清空聊天 */}
            <motion.button
              className={`p-1.5 rounded-full ${theme === 'dark' ? 'hover:bg-gray-700/50' : 'hover:bg-gray-200/50'} text-${theme === 'dark' ? 'gray-300' : 'gray-600'}`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={clearChat}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </motion.button>
          </div>
        </div>
        
        {/* 错误提示 */}
        <AnimatePresence>
          {error && (
            <motion.div 
              className={`${theme === 'dark' ? 'bg-red-900/30 border-b border-red-500/50' : 'bg-red-100 border-b border-red-200'} py-1 px-3`}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
            >
              <p className={`text-xs ${theme === 'dark' ? 'text-red-300' : 'text-red-600'}`}>{error}</p>
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* 消息区域 */}
        <div className={`flex-1 overflow-y-auto p-3 chat-messages ${theme === 'dark' ? 'bg-gradient-to-b from-gray-900/80 to-dark-lighter/90' : 'bg-gradient-to-b from-gray-50/80 to-white/90'}`}>
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`mb-4 flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'} ${msg.type !== 'user' ? 'max-w-[95%]' : ''}`}
            >
              {msg.type !== 'user' && (
                <div className={`w-7 h-7 rounded-full bg-gradient-to-br ${getCurrentModelColor()} flex-shrink-0 flex items-center justify-center mr-2 shadow-md`}>
                  <span className="text-white font-bold text-xs">A</span>
                </div>
              )}
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.3 }}
                className={`${msg.type === 'user' ? 'max-w-[80%]' : 'max-w-[95%]'} ${
                  msg.type === 'user'
                    ? `${theme === 'dark' 
                      ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white' 
                      : 'bg-gradient-to-r from-blue-500 to-blue-600 text-white'} rounded-tr-none rounded-xl shadow-md shadow-blue-700/20 p-2.5`
                    : `${theme === 'dark' 
                      ? 'bg-gradient-to-r from-gray-800/80 to-gray-900/80 text-gray-100 border border-gray-700/50' 
                      : 'bg-white text-gray-800 border border-gray-200'} rounded-tl-none rounded-xl shadow-md ${theme === 'dark' ? 'shadow-gray-900/20' : 'shadow-gray-200/40'} p-2.5 ${msg.streaming ? 'border-l-2 border-l-violet-500' : ''}`
                }`}
              >
                {msg.type === 'user' ? (
                  <div className="whitespace-pre-line text-sm">{msg.content}</div>
                ) : (
                  <div 
                    className={`text-sm ${specificModel === 'deepseek-reasoner' ? 'reasoning-enabled' : ''} ${msg.streaming ? 'streaming-message' : ''}`}
                    dangerouslySetInnerHTML={{ __html: formatReasoningContent(msg.content) }}
                  />
                )}
                
                {/* 添加标识提示 */}
                {msg.type !== 'user' && (
                  <div className="mt-1.5 flex items-center justify-end opacity-70">
                    {msg.streaming && (
                      <motion.div 
                        className="mr-1.5 flex space-x-1"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                      >
                        <motion.span 
                          className={`w-1 h-1 rounded-full bg-gradient-to-r ${getCurrentModelIconColor()}`}
                          animate={{ opacity: [0.4, 1, 0.4] }}
                          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                        ></motion.span>
                        <motion.span 
                          className={`w-1 h-1 rounded-full bg-gradient-to-r ${getCurrentModelIconColor()}`}
                          animate={{ opacity: [0.4, 1, 0.4] }}
                          transition={{ duration: 1.5, delay: 0.2, repeat: Infinity, ease: "easeInOut" }}
                        ></motion.span>
                        <motion.span 
                          className={`w-1 h-1 rounded-full bg-gradient-to-r ${getCurrentModelIconColor()}`}
                          animate={{ opacity: [0.4, 1, 0.4] }}
                          transition={{ duration: 1.5, delay: 0.4, repeat: Infinity, ease: "easeInOut" }}
                        ></motion.span>
                      </motion.div>
                    )}
                    <div className={`inline-block w-1.5 h-1.5 rounded-full bg-gradient-to-r ${getCurrentModelIconColor()} mr-1`}></div>
                    <span className="text-[10px] text-gray-400">{DEEPSEEK_MODELS[specificModel]?.name || 'DeepSeek'}</span>
                  </div>
                )}
              </motion.div>
              {msg.type === 'user' && (
                <div className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex-shrink-0 flex items-center justify-center ml-2 shadow-md">
                  <span className="text-white font-bold text-xs">你</span>
                </div>
              )}
            </div>
          ))}
          
          {/* 正在输入指示器 */}
          <AnimatePresence>
            {isTyping && (
              <motion.div 
                className="flex justify-start mb-3"
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 5 }}
              >
                <div className={`w-7 h-7 rounded-full bg-gradient-to-br ${getCurrentModelColor()} flex-shrink-0 flex items-center justify-center mr-2 shadow-md`}>
                  <span className="text-white font-bold text-xs">A</span>
                </div>
                <div className={`${theme === 'dark' 
                  ? 'bg-gradient-to-r from-gray-800 to-gray-900 text-gray-200' 
                  : 'bg-white text-gray-600 border border-gray-200'} py-2 px-3 rounded-xl rounded-tl-none shadow-md`}>
                  <div className="flex space-x-1.5">
                    <motion.span 
                      className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${getCurrentModelIconColor()}`}
                      animate={{ opacity: [0.4, 1, 0.4] }}
                      transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                    ></motion.span>
                    <motion.span 
                      className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${getCurrentModelIconColor()}`}
                      animate={{ opacity: [0.4, 1, 0.4] }}
                      transition={{ duration: 1.5, delay: 0.2, repeat: Infinity, ease: "easeInOut" }}
                    ></motion.span>
                    <motion.span 
                      className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${getCurrentModelIconColor()}`}
                      animate={{ opacity: [0.4, 1, 0.4] }}
                      transition={{ duration: 1.5, delay: 0.4, repeat: Infinity, ease: "easeInOut" }}
                    ></motion.span>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          
          {/* 使用量信息 */}
          <AnimatePresence>
            {usage && (
              <motion.div 
                className="flex justify-center mb-3"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                <div className={`${theme === 'dark' 
                  ? 'bg-indigo-900/30 text-indigo-300 border border-indigo-800/50' 
                  : 'bg-indigo-100 text-indigo-700 border border-indigo-200'} text-[10px] px-2.5 py-0.5 rounded-full backdrop-blur-sm`}>
                  {usage.modelName || (usage.modelType === 'openai' ? 'OpenAI' : 'DeepSeek')} | 
                  {usage.model && ` ${usage.model.split('/').pop()} | `}
                  令牌: {usage.total_tokens || '未知'}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          
          <div ref={messagesEndRef} />
        </div>
        
        {/* 输入区域 */}
        <div className={`p-3 border-t ${theme === 'dark' 
          ? 'border-gray-800/30 bg-gray-900/95 backdrop-blur-sm' 
          : 'border-gray-200/50 bg-gray-50/95 backdrop-blur-sm'}`}>
          {/* 模型指示器和键盘快捷键提示 */}
          <div className={`mb-1.5 flex items-center justify-between ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
            <div className="flex items-center">
              <span className={`inline-block w-1.5 h-1.5 rounded-full bg-gradient-to-r ${getCurrentModelIconColor()} mr-1 animate-pulse`}></span>
              <span className="text-[10px]">{DEEPSEEK_MODELS[specificModel]?.name || 'DeepSeek'} 模型</span>
            </div>
            <div className="text-[10px] hidden md:flex items-center">
              <kbd className={`px-1 py-0.5 rounded ${theme === 'dark' ? 'bg-gray-800 border border-gray-700' : 'bg-gray-100 border border-gray-300'}`}>Shift</kbd> + <kbd className={`px-1 py-0.5 rounded mx-0.5 ${theme === 'dark' ? 'bg-gray-800 border border-gray-700' : 'bg-gray-100 border border-gray-300'}`}>Enter</kbd> 换行
            </div>
          </div>
          
          <div className="flex">
            <textarea
              ref={textareaRef}
              className={`flex-1 ${theme === 'dark' 
                ? 'bg-gray-800/95 border border-gray-600/50 text-white focus:ring-2 focus:ring-violet-500/50' 
                : 'bg-white border border-gray-300/50 text-gray-800 focus:ring-2 focus:ring-violet-400/50'} rounded-xl py-2.5 px-3 resize-none focus:outline-none text-sm transition-all duration-200 ease-in-out`}
              placeholder={specificModel === 'deepseek-reasoner' 
                ? '输入问题，我会提供详细的推理过程和专业分析...' 
                : `使用${DEEPSEEK_MODELS[specificModel]?.name || 'DeepSeek'}询问任何问题...`}
              rows="2"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={isTyping}
              aria-label="聊天输入框"
            />
            <motion.button
              className={`ml-2 w-12 h-12 rounded-full flex items-center justify-center ${
                isTyping 
                  ? `${theme === 'dark' ? 'bg-gray-600' : 'bg-gray-400'} cursor-not-allowed` 
                  : `bg-gradient-to-r ${getCurrentModelColor()}`
              } text-white shadow-lg hover:shadow-xl`}
              whileHover={{ scale: isTyping ? 1 : 1.05, boxShadow: isTyping ? 'none' : '0 0 15px rgba(139, 92, 246, 0.5)' }}
              whileTap={{ scale: isTyping ? 1 : 0.95 }}
              onClick={handleSend}
              disabled={isTyping}
            >
              {isTyping ? (
                <motion.div 
                  animate={{ rotate: 360 }} 
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                />
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              )}
            </motion.button>
          </div>
        </div>
      </div>
      
      {/* 复制通知 */}
      <AnimatePresence>
        {copyNotification.show && (
          <motion.div
            className={`fixed top-5 right-5 px-4 py-2 rounded-lg shadow-lg z-50 ${
              theme === 'dark' 
                ? 'bg-gradient-to-r from-green-900/80 to-emerald-900/80 text-green-100 border border-green-700/50' 
                : 'bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 border border-green-300'}`}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
          >
            <div className="flex items-center">
              <svg className="w-4 h-4 mr-2 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span>{copyNotification.message}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

// 使用next/dynamic动态导入实现客户端渲染
const AIAssistant = dynamic(() => Promise.resolve(AIAssistantComponent), {
  ssr: false,
  loading: () => <div id="ai-assistant-placeholder" aria-hidden="true" className="hidden"></div>
});

export default AIAssistant; 