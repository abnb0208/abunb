import Head from 'next/head';
import Navbar from './Navbar';
import Footer from './Footer';
import TechBackground from './TechBackground';

const Layout = ({ children, title = '全栈学习与资源平台' }) => {
  return (
    <>
      <Head>
        <title>{title} | Abunb</title>
        <meta name="description" content="全栈学习与资源整合平台，提供高质量的编程教程、软件资源与项目源码" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      {/* 3D Background */}
      <TechBackground />
      
      {/* Navigation */}
      <Navbar />
      
      {/* Main Content */}
      <main className="min-h-screen pt-20">
        {children}
      </main>
      
      {/* Footer */}
      <Footer />
    </>
  );
};

export default Layout; 