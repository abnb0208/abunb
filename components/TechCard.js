import { motion } from 'framer-motion';

const TechCard = ({ 
  title, 
  description, 
  image, 
  icon,
  buttonText = '了解更多',
  link = '#',
  premium = false,
  delay = 0,
}) => {
  return (
    <motion.div 
      className="tech-card overflow-hidden group"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      viewport={{ once: true, margin: '-100px' }}
    >
      {/* Card header with image/gradient */}
      <div className="relative h-48 -mx-6 -mt-6 mb-6 overflow-hidden">
        {image ? (
          <img 
            src={image} 
            alt={title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        ) : (
          <div className="w-full h-full bg-tech-gradient" />
        )}
        
        {/* Premium badge */}
        {premium && (
          <div className="absolute top-3 right-3 bg-tech-gradient py-1 px-3 rounded-full text-xs font-semibold shadow-glow">
            高级内容
          </div>
        )}
        
        {/* Icon */}
        {icon && (
          <div className="absolute -bottom-6 left-6 w-12 h-12 rounded-lg bg-tech-gradient flex items-center justify-center shadow-glow">
            {icon}
          </div>
        )}
      </div>
      
      {/* Card content */}
      <div className={`${icon ? 'pl-16' : ''}`}>
        <h3 className="text-xl font-bold mb-2 text-white">{title}</h3>
        <p className="text-gray-300 text-sm mb-4">{description}</p>
        
        <a 
          href={link}
          className="inline-flex items-center text-tech-blue hover:text-tech-purple transition-colors"
        >
          <span>{buttonText}</span>
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
      
      {/* Glowing border effect on hover */}
      <div className="absolute inset-0 border border-tech-blue opacity-0 group-hover:opacity-25 rounded-xl transition-opacity" />
    </motion.div>
  );
};

export default TechCard; 