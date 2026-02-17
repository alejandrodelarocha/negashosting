'use client';

import React from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion';
import { Menu, X, ExternalLink, Linkedin, Mail, ArrowRight, Code2, Zap, Database, Cloud } from 'lucide-react';

export default function Portfolio() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [selectedSkill, setSelectedSkill] = React.useState(null);
  const [isPhotoHovered, setIsPhotoHovered] = React.useState(false);
  const [isMobile, setIsMobile] = React.useState(false);
  const [photoInView, setPhotoInView] = React.useState(false);

  React.useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);
  const [activeCard, setActiveCard] = React.useState(0);
  const magneticButtonRef = React.useRef(null);
  const buttonX = useMotionValue(0);
  const buttonY = useMotionValue(0);
  const buttonSpringX = useSpring(buttonX, { damping: 20, stiffness: 300 });
  const buttonSpringY = useSpring(buttonY, { damping: 20, stiffness: 300 });

  const showcaseCards = [
    { id: 1, title: 'Full-Stack', description: 'End-to-end development from databases to pixel-perfect UIs', gradient: 'from-blue-500 via-cyan-400 to-blue-300', icon: '🚀' },
    { id: 2, title: 'AI Integration', description: 'Building intelligent features with cutting-edge AI models', gradient: 'from-purple-500 via-pink-400 to-purple-300', icon: '✨' },
    { id: 3, title: 'Performance', description: 'Lightning-fast applications optimized for scale', gradient: 'from-orange-500 via-red-400 to-orange-300', icon: '⚡' },
    { id: 4, title: 'Architecture', description: 'Clean, maintainable systems built to evolve', gradient: 'from-green-500 via-emerald-400 to-green-300', icon: '🎵' },
  ];

  React.useEffect(() => {
    const handleMagnetic = (e) => {
      if (!magneticButtonRef.current) return;
      const rect = magneticButtonRef.current.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dist = Math.hypot(e.clientX - cx, e.clientY - cy);
      if (dist < 100) {
        const angle = Math.atan2(e.clientY - cy, e.clientX - cx);
        const pull = (1 - dist / 100) * 30;
        buttonX.set(Math.cos(angle) * pull);
        buttonY.set(Math.sin(angle) * pull);
      } else {
        buttonX.set(0);
        buttonY.set(0);
      }
    };
    window.addEventListener('mousemove', handleMagnetic);
    return () => window.removeEventListener('mousemove', handleMagnetic);
  }, [buttonX, buttonY]);

  const menuItems = [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Skills', href: '#skills' },
    { label: 'Projects', href: '#projects' },
    { label: 'Services', href: '#services' },
    { label: 'Contact', href: '#contact' },
  ];

  const projects = [
    {
      title: 'PlaneaSec.com',
      description: 'Educational resources SaaS for teachers. Full-stack platform with user management, content delivery, and payment integration.',
      tech: ['React', 'Node.js', 'Express'],
      demo: 'https://planeasec.com/',
      image: '/project-planeasec.webp',
      color: 'from-blue-500 to-cyan-500',
    },
    {
      title: 'JerrysAcuarios.com',
      description: 'Landing page with a smart self-made AI Bot for customer support and product recommendations.',
      tech: ['React', 'Node.js', 'Express'],
      demo: 'https://jerrysacuarios.com/',
      image: '/project-jerrys.webp',
      color: 'from-emerald-500 to-teal-500',
    },
    {
      title: 'NegasHosting.com',
      description: 'Hosting service with full-stack infrastructure, billing integration, and automated deployments.',
      tech: ['Python', 'Express', 'React', 'Tailwind'],
      demo: 'https://negashosting.com/',
      image: '/project-negashosting.webp',
      color: 'from-purple-500 to-pink-500',
    },
    {
      title: 'NegasHosting Page Builder',
      description: 'My OWN page builder created from scratch. AI-powered website editor with live preview and one-click deploy.',
      tech: ['React', 'Vite', 'Tailwind', 'Gemini AI'],
      demo: 'https://negashosting.com/editor',
      image: '/project-builder.webp',
      color: 'from-orange-500 to-red-500',
    },
    {
      title: 'Advanced AI Chatbot',
      description: 'Speech recognition, text-to-speech, and streaming API responses. Attachable to any website with database integration.',
      tech: ['React', 'WebRTC', 'Node.js', 'Claude API', 'Whisper'],
      demo: 'https://alejandrodelarocha.com/clientes/repysol/',
      image: '/project-aibot.webp',
      color: 'from-indigo-500 to-blue-500',
    },
    {
      title: 'MassiveCaller',
      description: 'Automated calling platform for campaigns and polls. Self-compiled text-to-speech and speech-to-text engines for high-volume outbound calls.',
      tech: ['React', 'Node.js', 'Express', 'TTS/STT', 'PostgreSQL'],
      image: '/project-massivecaller.webp',
      color: 'from-rose-500 to-pink-500',
    },
  ];

  const skills = [
    {
      category: 'Frontend',
      icon: <Code2 className="w-6 h-6" />,
      svgIcon: '/nextjs-original.svg',
      proficiency: 95,
      items: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Vue.js'],
    },
    {
      category: 'Backend',
      icon: <Database className="w-6 h-6" />,
      svgIcon: '/nodejs-original.svg',
      proficiency: 90,
      items: ['Rails', 'Node.js', 'Express', 'PostgreSQL', 'MongoDB', 'Python'],
    },
    {
      category: 'Infrastructure',
      icon: <Cloud className="w-6 h-6" />,
      svgIcon: '/git-original.svg',
      proficiency: 85,
      items: ['AWS', 'Docker', 'CI/CD', 'Nginx', 'VPS Management', 'SSL Automation'],
    },
    {
      category: 'Specializations',
      icon: <Zap className="w-6 h-6" />,
      svgIcon: '/figma-logo.svg',
      proficiency: 88,
      items: ['AI Integration', 'Figma-to-Code', 'Performance Optimization', 'Web Scraping', 'Automation'],
    },
    {
      category: 'JavaScript',
      icon: <Code2 className="w-6 h-6" />,
      svgIcon: '/javascript-original.svg',
      proficiency: 98,
      items: ['ES6+', 'Async/Await', 'Module Systems', 'DOM API', 'Event Handling', 'Closures'],
    },
    {
      category: 'TypeScript',
      icon: <Code2 className="w-6 h-6" />,
      svgIcon: '/typescript-original.svg',
      proficiency: 95,
      items: ['Advanced Types', 'Generics', 'Interfaces', 'Decorators', 'Type Guards', 'Utility Types'],
    },
    {
      category: 'Python',
      icon: <Code2 className="w-6 h-6" />,
      svgIcon: '/python-original.svg',
      proficiency: 92,
      items: ['Django', 'Flask', 'FastAPI', 'Data Science', 'Automation', 'Web Scraping'],
    },
    {
      category: 'Vue.js',
      icon: <Code2 className="w-6 h-6" />,
      svgIcon: '/vuejs-original.svg',
      proficiency: 88,
      items: ['Composition API', 'Nuxt.js', 'Vuex', 'Vue Router', 'Single-File Components', 'Transitions'],
    },
    {
      category: 'Nuxt.js',
      icon: <Code2 className="w-6 h-6" />,
      svgIcon: '/nuxtjs-original.svg',
      proficiency: 90,
      items: ['SSR', 'Static Generation', 'Auto Routing', 'Middleware', 'Composables', 'Plugins'],
    },
    {
      category: 'GraphQL',
      icon: <Database className="w-6 h-6" />,
      svgIcon: '/graphql-plain.svg',
      proficiency: 87,
      items: ['Queries', 'Mutations', 'Subscriptions', 'Apollo', 'Schema Design', 'Resolvers'],
    },
    {
      category: 'React',
      icon: <Code2 className="w-6 h-6" />,
      svgIcon: '/react-icon.svg',
      proficiency: 96,
      items: ['React Hooks', 'Context API', 'Server Components', 'Suspense', 'Concurrent Mode', 'React Router'],
    },
    {
      category: 'Redux',
      icon: <Code2 className="w-6 h-6" />,
      svgIcon: '/redux-logo.svg',
      proficiency: 88,
      items: ['Redux Toolkit', 'Middleware', 'Thunks', 'Sagas', 'Selectors', 'Immer'],
    },
    {
      category: 'PHP',
      icon: <Code2 className="w-6 h-6" />,
      svgIcon: '/php.svg',
      proficiency: 85,
      items: ['Laravel', 'Symfony', 'Composer', 'OOP', 'REST APIs', 'MySQL'],
    },
    {
      category: 'PostgreSQL',
      icon: <Database className="w-6 h-6" />,
      svgIcon: '/postgresql-logo.svg',
      proficiency: 90,
      items: ['Query Optimization', 'Indexing', 'Triggers', 'Views', 'JSON', 'Full-Text Search'],
    },
    {
      category: 'Laravel',
      icon: <Code2 className="w-6 h-6" />,
      svgIcon: '/laravel.svg',
      proficiency: 87,
      items: ['Eloquent', 'Blade', 'Artisan', 'Middleware', 'Queues', 'API Resources'],
    },
    {
      category: 'AWS',
      icon: <Cloud className="w-6 h-6" />,
      svgIcon: '/aws-cloud.svg',
      proficiency: 88,
      items: ['EC2', 'S3', 'Lambda', 'CloudFront', 'RDS', 'IAM'],
    },
    {
      category: 'Docker',
      icon: <Cloud className="w-6 h-6" />,
      svgIcon: '/docker.svg',
      proficiency: 90,
      items: ['Docker Compose', 'Volumes', 'Networks', 'Multi-stage Builds', 'Registry', 'Swarm'],
    },
    {
      category: 'Lambda',
      icon: <Zap className="w-6 h-6" />,
      svgIcon: '/lambda.svg',
      proficiency: 85,
      items: ['Serverless', 'API Gateway', 'DynamoDB', 'Step Functions', 'CloudWatch', 'SAM'],
    },
    {
      category: 'Express',
      icon: <Code2 className="w-6 h-6" />,
      svgIcon: '/express-original.svg',
      proficiency: 92,
      items: ['Routing', 'Middleware', 'REST APIs', 'Authentication', 'Error Handling', 'WebSockets'],
    },
    {
      category: 'NestJS',
      icon: <Code2 className="w-6 h-6" />,
      svgIcon: '/nestjs-original.svg',
      proficiency: 86,
      items: ['Modules', 'Controllers', 'Providers', 'Guards', 'Interceptors', 'Microservices'],
    },
  ];

  const services = [
    {
      title: 'Figma → React Conversion',
      description: 'Transform your Figma designs into production-ready React components. Deployed on your VPS, fully responsive, animations included.',
      price: '$100-500',
      time: '24-48 hours',
    },
    {
      title: 'Full Stack Development',
      description: 'Build scalable web applications with React, Node.js, and AWS. From MVP to enterprise-grade systems.',
      price: 'Custom',
      time: 'Varies',
    },
    {
      title: 'AI Integration',
      description: 'Integrate Claude AI, GPT-4, or other LLMs into your applications. Chatbots, automation, content generation.',
      price: 'Custom',
      time: 'Custom',
    },
    {
      title: 'WordPress Themes',
      description: 'Advanced WordPress theme development with complex animations, custom functionality, and modern design.',
      price: 'Custom',
      time: 'Custom',
    },
  ];

  const timeline = [
    { year: '2025 - Present', role: 'Staff Lead FullStack Engineer', company: 'Nolte.io', description: 'Healthcare platform. Micro-frontend architecture, 40% reduction in data entry errors.', tech: ['React', 'TypeScript', 'Rails', 'PostgreSQL'], isEducation: false },
    { year: '2021 - 2025', role: 'Full-stack Web Developer', company: 'LifeStance Health', description: 'Healthcare SaaS. Reduced dev time 30-40%, boosted patient conversion 31%.', tech: ['React', 'TypeScript', 'Redux', 'Rails', 'Docker'], isEducation: false },
    { year: '2020 - 2022', role: 'Full-stack Web Developer', company: 'Health Services of Chihuahua', description: 'Pharmacy/inventory system for 21 hospitals. Reduced patient wait times 20%.', tech: ['React', 'Redux', '.NET', 'Oracle DB'], isEducation: false },
    { year: '2020 - 2022', role: 'Graphics & IT Supervisor', company: 'Servicio Nacional de Empleo', description: 'Network infrastructure mapping. Designed magazines reaching 8,000+ readers.', tech: ['PHP', 'MySQL', 'Adobe'], isEducation: false },
    { year: '2019', role: 'Engineer Degree', company: 'Univ. Tecnologica de Chihuahua', description: 'Information and Communication Technologies. Software Engineering, SOLID, DDD.', tech: [], isEducation: true },
    { year: '2013 - Present', role: 'Freelance Developer', company: 'AlejandroDeLaRocha.com', description: 'GetCertified app, PlaneaSec SaaS, NegasHosting, Alexium AI Bot, Pinchimundo (10k+ downloads).', tech: ['React', 'Node.js', 'PHP', 'AWS', 'Gemini AI'], isEducation: false },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: 'easeOut' },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white overflow-hidden">
      {/* Navigation */}
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="fixed top-0 w-full z-50"
      >
        {/* Animated nav background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-xl border-b border-cyan-500/20"></div>
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-transparent to-blue-500/10"
            animate={{
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          ></motion.div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex justify-between items-center h-20">
            {/* Logo with glow effect */}
            <motion.div
              whileHover={{ scale: 1.08 }}
              className="group relative"
            >
              <div className="absolute -inset-2 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-lg opacity-0 group-hover:opacity-50 blur transition duration-500 -z-10"></div>
              <div className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent relative">
                Alejandro
              </div>
            </motion.div>

            {/* Desktop Menu */}
            <div className="hidden md:flex gap-1">
              {menuItems.map((item, idx) => (
                <motion.a
                  key={item.label}
                  href={item.href}
                  className="relative px-4 py-2 text-sm font-medium group"
                  whileHover={{ y: -2 }}
                >
                  {/* Background gradient on hover */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-lg"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.2 }}
                  ></motion.div>

                  {/* Text */}
                  <span className="relative text-slate-300 group-hover:text-cyan-300 transition-colors">
                    {item.label}
                  </span>

                  {/* Animated underline */}
                  <motion.div
                    className="absolute bottom-0 left-4 right-4 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full"
                    initial={{ scaleX: 0 }}
                    whileHover={{ scaleX: 1 }}
                    transition={{ duration: 0.3 }}
                  ></motion.div>

                  {/* Floating glow particles */}
                  {[...Array(3)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-1 h-1 bg-cyan-400 rounded-full opacity-0 group-hover:opacity-100"
                      initial={{ opacity: 0, y: 0 }}
                      whileHover={{
                        opacity: [0, 1, 0],
                        y: -20,
                        x: (i - 1) * 8,
                      }}
                      transition={{
                        duration: 0.6,
                        delay: i * 0.1,
                      }}
                      style={{
                        left: '50%',
                        top: '0%',
                        marginLeft: '-2px',
                      }}
                    ></motion.div>
                  ))}
                </motion.a>
              ))}
            </div>

            {/* Mobile Menu Button with animation */}
            <motion.button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 hover:bg-slate-700/50 rounded-lg transition-colors relative"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                animate={{ rotate: isMenuOpen ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </motion.div>
            </motion.button>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden fixed inset-0 top-20 bg-gradient-to-b from-slate-900/95 to-slate-800/95 backdrop-blur-lg z-40"
            >
              <motion.div
                className="flex flex-col h-full justify-center items-center space-y-8 px-4"
                variants={{
                  visible: {
                    transition: {
                      staggerChildren: 0.12,
                    },
                  },
                }}
                initial="hidden"
                animate="visible"
              >
                {menuItems.map((item) => (
                  <motion.a
                    key={item.label}
                    href={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    variants={{
                      hidden: { opacity: 0, y: 30 },
                      visible: { opacity: 1, y: 0 },
                    }}
                    whileHover={{ scale: 1.1, color: '#06b6d4' }}
                    className="relative text-4xl font-bold text-slate-300 hover:text-cyan-400 transition-colors"
                  >
                    <motion.span
                      className="relative inline-block"
                      whileHover={{ letterSpacing: '0.15em' }}
                    >
                      {item.label}
                    </motion.span>
                    <motion.div
                      className="absolute -bottom-4 left-0 right-0 h-1 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full"
                      initial={{ scaleX: 0 }}
                      whileHover={{ scaleX: 1 }}
                      transition={{ duration: 0.4 }}
                    ></motion.div>
                  </motion.a>
                ))}
              </motion.div>
            </motion.div>
          )}
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section id="home" className="pt-40 pb-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-20 left-1/4 w-96 h-96 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
          <div className="absolute top-40 right-1/4 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-20 left-1/2 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000"></div>
        </div>

        <motion.div
          className="max-w-7xl mx-auto relative z-10 grid md:grid-cols-2 gap-8 md:gap-12 items-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Left side - Text content */}
          <div className="-mt-[20px]">
            <motion.div variants={itemVariants} className="mb-6">
              <span className="text-cyan-400 text-sm font-semibold">👋 Welcome to my portfolio</span>
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="text-5xl md:text-6xl font-bold mb-6 leading-tight"
            >
              Staff Lead Full-Stack
              <span className="block text-transparent bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text">
                Engineer & Entrepreneur
              </span>
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-xl text-slate-300 mb-8 leading-relaxed md:mb-[180px]
 "
            >
              16+ years building scalable web applications, AI-powered solutions, and digital products.
              Specialized in React, TypeScript, Node.js, and AWS infrastructure.
            </motion.p>
          </div>

          {/* Right side - Profile Image with Advanced Transparency Effects */}
          <motion.div
            variants={itemVariants}
            className="flex justify-center md:justify-end relative h-[600px] group/hero"
          >
            {/* Animated flowing background behind transparent image */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-cyan-500 via-blue-500 to-purple-500 rounded-3xl opacity-40 blur-3xl"
              animate={{
                rotate: 360,
                scale: [1, 1.2, 1],
              }}
              transition={{
                rotate: { duration: 20, repeat: Infinity, ease: 'linear' },
                scale: { duration: 6, repeat: Infinity, ease: 'easeInOut' },
              }}
            ></motion.div>

            {/* Animated mesh/grid pattern background */}
            <motion.div
              className="absolute inset-0 opacity-20"
              animate={{
                backgroundPosition: ['0px 0px', '50px 50px'],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: 'linear',
              }}
              style={{
                backgroundImage: `linear-gradient(45deg, cyan 1px, transparent 1px, transparent 50px, cyan 50px)`,
                backgroundSize: '50px 50px',
              }}
            ></motion.div>

            {/* Dynamic light orbs */}
            <motion.div
              className="absolute top-0 right-0 w-40 h-40 bg-cyan-400 rounded-full mix-blend-screen filter blur-3xl opacity-0 group-hover/hero:opacity-40"
              animate={{
                y: [0, -30, 0],
                x: [0, 30, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            ></motion.div>

            <motion.div
              className="absolute bottom-0 left-0 w-32 h-32 bg-blue-500 rounded-full mix-blend-screen filter blur-3xl opacity-0 group-hover/hero:opacity-30"
              animate={{
                y: [0, 30, 0],
                x: [0, -30, 0],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            ></motion.div>

            {/* Extra glow orbs for depth */}
            <motion.div
              className="absolute top-1/3 right-1/4 w-24 h-24 bg-purple-500 rounded-full mix-blend-screen filter blur-2xl opacity-0 group-hover/hero:opacity-25"
              animate={{
                scale: [1, 1.5, 1],
                y: [20, -20, 20],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            ></motion.div>

            {/* Animated electric lines */}
            <svg
              className="absolute inset-0 w-full h-full opacity-0 group-hover/hero:opacity-30 transition-opacity duration-300"
              style={{ pointerEvents: 'none' }}
            >
              <defs>
                <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#06b6d4" />
                  <stop offset="100%" stopColor="#3b82f6" />
                </linearGradient>
              </defs>
              <motion.line
                x1="0"
                y1="0"
                x2="300"
                y2="300"
                stroke="url(#lineGradient)"
                strokeWidth="2"
                animate={{
                  pathLength: [0, 1, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                }}
              />
              <motion.circle
                cx="150"
                cy="150"
                r="80"
                fill="none"
                stroke="url(#lineGradient)"
                strokeWidth="1"
                opacity="0.5"
                animate={{
                  r: [50, 120, 50],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />
            </svg>

            {/* Main image container - leveraging transparency */}
            <motion.div
              whileHover={{ scale: 1.05, y: -15 }}
              className="group relative z-20 cursor-pointer"
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            >
              {/* Animated particle effect around transparent image */}
              {[...Array(6)].map((_, i, arr) => {
                const count = arr.length;
                const radius = 150;
                const baseAngle = (i / count) * Math.PI * 2;
                const orbitKeyframes = [0, Math.PI / 2, Math.PI, (3 * Math.PI) / 2, Math.PI * 2].map(
                  (t) => ({
                    x: Math.cos(baseAngle + t) * radius,
                    y: Math.sin(baseAngle + t) * radius,
                  })
                );
                return (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 bg-cyan-400 rounded-full"
                  style={{
                    left: '50%',
                    top: '50%',
                    marginLeft: '-4px',
                    marginTop: '-4px',
                  }}
                  animate={{
                    x: orbitKeyframes.map((k) => k.x),
                    y: orbitKeyframes.map((k) => k.y),
                    opacity: [0.5, 1, 0.5],
                  }}
                  initial={false}
                  transition={{
                    x: { duration: 8, repeat: Infinity, ease: 'linear', delay: 1 + i * 1 },
                    y: { duration: 8, repeat: Infinity, ease: 'linear', delay: 1 + i * 1 },
                    opacity: { duration: 4, repeat: Infinity, delay: 1 + i * 1 },
                  }}
                ></motion.div>
              );
              })}

              {/* Hover glow - becomes visible on hover */}
              <motion.div
                className="absolute -inset-8 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 rounded-3xl opacity-0 group-hover:opacity-30 blur-2xl transition-all duration-500"
                whileHover={{ scale: 1.3 }}
              ></motion.div>

              {/* Image container with transparency showcase */}
              <motion.div
                className="relative rounded-3xl overflow-hidden"
                whileHover={{
                  scale: 1.15,
                  boxShadow: '0 0 60px rgba(6, 182, 212, 0.6), 0 0 100px rgba(59, 130, 246, 0.3)',
                }}
                transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                onHoverStart={() => setIsPhotoHovered(true)}
                onHoverEnd={() => setIsPhotoHovered(false)}
                onViewportEnter={() => setPhotoInView(true)}
                viewport={{ once: true, amount: 0.3 }}
              >
                {/* Animated background gradient visible through transparency */}
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/30 to-purple-500/30"></div>

                {/* Static image */}
                <motion.img
                  src="/alejandro.png"
                  alt="Alejandro de la Rocha"
                  className="relative z-10 w-full h-auto max-w-sm object-cover"
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />

                {/* Code generation effect - bottom */}
                <motion.div
                  className="absolute bottom-0 left-0 right-0 z-20 pointer-events-none overflow-hidden"
                  animate={{ opacity: ((isMobile && photoInView) || isPhotoHovered) ? 1 : 0, height: ((isMobile && photoInView) || isPhotoHovered) ? '60%' : '0%' }}
                  transition={{ duration: 0.6 }}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/60 to-transparent" />
                  {['const portfolio = await build();', 'export default function Engineer() {', '  return <FullStack skills={[', '    "React", "Node.js", "AI",', '    "TypeScript", "Python"', '  ]} experience={16} />;', '}', 'deploy({ target: "production" });'].map((line, i) => (
                    <motion.div
                      key={`bottom-${i}`}
                      className="relative px-3 font-mono text-[10px] leading-relaxed"
                      animate={{
                        opacity: ((isMobile && photoInView) || isPhotoHovered) ? [0, 1] : 0,
                        y: ((isMobile && photoInView) || isPhotoHovered) ? [20, 0] : 20,
                      }}
                      transition={{ delay: (isMobile && photoInView) ? 0.8 + i * 0.15 : i * 0.08, duration: 0.4 }}
                    >
                      <span className="text-cyan-400/80">{line}</span>
                    </motion.div>
                  ))}
                </motion.div>

                {/* Code generation effect - right */}
                <motion.div
                  className="absolute top-0 right-0 bottom-0 z-20 pointer-events-none overflow-hidden flex flex-col justify-center"
                  animate={{ opacity: ((isMobile && photoInView) || isPhotoHovered) ? 1 : 0, width: ((isMobile && photoInView) || isPhotoHovered) ? '45%' : '0%' }}
                  transition={{ duration: 0.6, delay: (isMobile && photoInView) ? 0.4 : 0.1 }}
                >
                  <div className="absolute inset-0 bg-gradient-to-l from-slate-950/90 via-slate-950/60 to-transparent" />
                  {['// 16+ years', 'async function', '  solve(problem) {', '  const result =', '    await think()', '  return result', '}', '// ship it 🚀'].map((line, i) => (
                    <motion.div
                      key={`right-${i}`}
                      className="relative px-2 font-mono text-[10px] leading-relaxed text-right"
                      animate={{
                        opacity: ((isMobile && photoInView) || isPhotoHovered) ? [0, 1] : 0,
                        x: ((isMobile && photoInView) || isPhotoHovered) ? [20, 0] : 20,
                      }}
                      transition={{ delay: (isMobile && photoInView) ? 1.2 + i * 0.15 : 0.2 + i * 0.08, duration: 0.4 }}
                    >
                      <span className="text-emerald-400/80">{line}</span>
                    </motion.div>
                  ))}
                </motion.div>

                {/* Animated border with wave effect */}
                <motion.div
                  className="absolute inset-0 rounded-3xl pointer-events-none"
                  animate={{
                    boxShadow: [
                      'inset 0 0 0 2px rgba(6, 182, 212, 0.3)',
                      'inset 0 0 0 3px rgba(59, 130, 246, 0.5)',
                      'inset 0 0 0 2px rgba(6, 182, 212, 0.3)',
                    ],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                  }}
                ></motion.div>

                {/* Rotating scanline effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-b from-white via-transparent to-white opacity-20 group-hover:opacity-40"
                  animate={{ y: ['0%', '100%'] }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                ></motion.div>

                {/* Chromatic aberration effect on hover */}
                <motion.div
                  className="absolute inset-0 opacity-0 group-hover:opacity-20 mix-blend-multiply"
                  style={{
                    backgroundImage: 'linear-gradient(90deg, red 0%, transparent 50%, blue 100%)',
                  }}
                  animate={{
                    x: [0, 2, -2, 0],
                  }}
                  transition={{
                    duration: 0.1,
                    repeat: Infinity,
                  }}
                ></motion.div>

                {/* Light leak effect */}
                <motion.div
                  className="absolute -inset-full bg-gradient-to-r from-cyan-400 via-transparent to-blue-400 opacity-0 group-hover:opacity-20 rotate-45"
                  animate={{
                    x: ['-100%', '100%'],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: 'linear',
                  }}
                ></motion.div>
              </motion.div>

              {/* Advanced particle system - multiple types */}
              <motion.div
                className="absolute -inset-20 pointer-events-none"
              >
                {/* Burst particles */}
                {[...Array(16)].map((_, i) => (
                  <motion.div
                    key={`burst-${i}`}
                    className="absolute w-1.5 h-1.5 bg-cyan-300 rounded-full shadow-lg shadow-cyan-400"
                    animate={{
                      x: [0, Math.cos((i / 16) * Math.PI * 2) * 250],
                      y: [0, Math.sin((i / 16) * Math.PI * 2) * 250],
                      opacity: [1, 0.8, 0],
                      scale: [1, 0.5],
                    }}
                    transition={{
                      duration: 2.5,
                      repeat: Infinity,
                      delay: i * 0.08,
                      ease: 'easeOut',
                    }}
                    style={{
                      left: '50%',
                      top: '50%',
                      marginLeft: '-3px',
                      marginTop: '-3px',
                    }}
                  ></motion.div>
                ))}

                {/* Spiral particles */}
                {[...Array(8)].map((_, i) => (
                  <motion.div
                    key={`spiral-${i}`}
                    className="absolute w-1 h-1 bg-blue-300 rounded-full"
                    animate={{
                      x: [0, Math.cos((i / 8) * Math.PI * 2) * 200 * Math.sin(Date.now() / 1000)],
                      y: [0, Math.sin((i / 8) * Math.PI * 2) * 200],
                      rotate: 360,
                      opacity: [0.3, 0.8, 0.3],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      delay: i * 0.12,
                    }}
                    style={{
                      left: '50%',
                      top: '50%',
                    }}
                  ></motion.div>
                ))}

                {/* Slow-moving orbs */}
                {[...Array(4)].map((_, i) => (
                  <motion.div
                    key={`orb-${i}`}
                    className="absolute w-2 h-2 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full blur-sm"
                    animate={{
                      x: Math.cos((i / 4) * Math.PI * 2) * 180,
                      y: [0, Math.sin(Date.now() / 2000 + i) * 100, 0],
                      scale: [0.5, 1.2, 0.5],
                    }}
                    transition={{
                      duration: 5 + i,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                    style={{
                      left: '50%',
                      top: '50%',
                      marginLeft: '-4px',
                      marginTop: '-4px',
                    }}
                  ></motion.div>
                ))}
              </motion.div>

              {/* Morphing shape overlay */}
              <motion.svg
                className="absolute inset-0 w-full h-full pointer-events-none opacity-0 group-hover:opacity-30 transition-opacity"
                viewBox="0 0 300 300"
              >
                <defs>
                  <filter id="morphFilter">
                    <feTurbulence type="fractalNoise" baseFrequency="0.02" numOctaves="3" result="noise" />
                    <feDisplacementMap in="SourceGraphic" in2="noise" scale="30" />
                  </filter>
                </defs>
                <motion.circle
                  cx="150"
                  cy="150"
                  r="100"
                  fill="none"
                  stroke="url(#lineGradient)"
                  strokeWidth="1.5"
                  filter="url(#morphFilter)"
                  animate={{
                    r: [100, 130, 100],
                  }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                />
              </motion.svg>

              {/* Glow text on hover */}
              <motion.div
                className="absolute -bottom-16 left-1/2 transform -translate-x-1/2 text-center pointer-events-none"
                whileHover={{ opacity: 1, y: -10 }}
                initial={{ opacity: 0 }}
              >
                <p className="text-cyan-400 text-sm font-bold tracking-widest">ENGINEERING EXCELLENCE</p>
                <motion.div
                  className="h-1 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 mt-2 rounded-full"
                  animate={{ width: ['0%', '100%'] }}
                  transition={{ duration: 1, repeat: Infinity }}
                ></motion.div>
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Buttons and Social moved outside grid */}
        <motion.div
          className="max-w-7xl mx-auto relative z-10 -mt-[180px]"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >

          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 mt-4"
          >
            <motion.a
              whileHover={{ scale: 1.08, boxShadow: '0 0 30px rgba(6, 182, 212, 0.6)' }}
              whileTap={{ scale: 0.95 }}
              href="#projects"
              className="group px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg font-semibold text-white hover:shadow-lg hover:shadow-cyan-500/50 transition-all flex items-center justify-center gap-2 relative overflow-hidden"
            >
              <span className="relative z-10 flex items-center gap-2">
                View My Work
                <motion.div whileHover={{ x: 5 }}>
                  <ArrowRight size={20} />
                </motion.div>
              </span>
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.08, backgroundColor: '#64748b' }}
              whileTap={{ scale: 0.95 }}
              href="#contact"
              className="px-8 py-4 bg-slate-700 hover:bg-slate-600 rounded-lg font-semibold transition-all border border-slate-600 hover:border-cyan-500/50 text-center"
            >
              Get In Touch
            </motion.a>
          </motion.div>

          {/* Social Links */}
          <motion.div
            variants={itemVariants}
            className="flex justify-center gap-8 text-white mt-4"
          >
            <motion.a
              whileHover={{ y: -5, color: '#06b6d4' }}
              href="https://www.linkedin.com/in/alejandrodlrocha/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-cyan-400 transition-colors"
            >
              <Linkedin size={28} />
            </motion.a>
            <motion.a
              whileHover={{ y: -5, color: '#06b6d4' }}
              href="mailto:hi@alejandrodelarocha.com"
              className="hover:text-cyan-400 transition-colors"
            >
              <Mail size={28} />
            </motion.a>
          </motion.div>
        </motion.div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-4 bg-slate-800/50">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold mb-8">About Me</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <p className="text-slate-300 leading-relaxed mb-6">
                  I'm a full-stack engineer with 16+ years of experience building scalable web applications,
                  SaaS platforms, and AI-integrated solutions. I've worked with startups and enterprises,
                  turning ideas into production-grade systems.
                </p>
                <p className="text-slate-300 leading-relaxed">
                  My focus is on performance, code quality, and user experience. I believe in building systems
                  that scale, writing code that's maintainable, and creating products that solve real problems.
                </p>
              </div>
              <div className="space-y-4">
                <div className="bg-slate-700/50 p-4 rounded-lg border border-slate-600/50">
                  <div className="text-3xl font-bold text-cyan-400">16+</div>
                  <div className="text-slate-300">Years of Experience</div>
                </div>
                <div className="bg-slate-700/50 p-4 rounded-lg border border-slate-600/50">
                  <div className="text-3xl font-bold text-cyan-400">50+</div>
                  <div className="text-slate-300">Projects Delivered</div>
                </div>
                <div className="bg-slate-700/50 p-4 rounded-lg border border-slate-600/50">
                  <div className="text-3xl font-bold text-cyan-400">4</div>
                  <div className="text-slate-300">SaaS Products Built</div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Career Timeline */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            viewport={{ once: true }}
            className="mt-16"
          >
            <motion.h3
              className="text-2xl font-bold mb-10 text-cyan-400"
              initial={{ opacity: 0, letterSpacing: '0.3em' }}
              whileInView={{ opacity: 1, letterSpacing: '0.05em' }}
              transition={{ duration: 1, ease: 'easeOut' }}
              viewport={{ once: true }}
            >
              Career Timeline
            </motion.h3>
            <div className="relative max-w-4xl mx-auto">
              {/* Center vertical line */}
              <motion.div
                className="absolute left-[7px] md:left-1/2 md:-translate-x-px top-0 bottom-0 w-0.5 bg-gradient-to-b from-cyan-500/50 via-cyan-500/30 to-transparent"
                initial={{ scaleY: 0, originY: 0 }}
                whileInView={{ scaleY: 1 }}
                transition={{ duration: 1.5, ease: 'easeOut' }}
                viewport={{ once: true }}
              ></motion.div>

              {/* Traveling light pulse */}
              <motion.div
                className="absolute left-[5px] md:left-1/2 md:-translate-x-[3px] w-1.5 h-8 rounded-full bg-gradient-to-b from-transparent via-cyan-400 to-transparent"
                animate={{ top: ['0%', '100%'] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
                style={{ filter: 'blur(1px)', opacity: 0.6 }}
              ></motion.div>

              {timeline.map((item, index) => {
                const isLeft = index % 2 === 0;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: isLeft ? -50 : 50, filter: 'blur(4px)' }}
                    whileInView={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                    transition={{
                      duration: 0.6,
                      delay: index * 0.15,
                      ease: [0.25, 0.46, 0.45, 0.94],
                    }}
                    viewport={{ once: true, margin: '-50px' }}
                    className="relative mb-10 last:mb-0"
                  >
                    {/* Mobile: always left-aligned. Desktop: alternating */}
                    <div className={`flex flex-col md:flex-row md:items-start gap-2 ${isLeft ? 'md:flex-row-reverse' : ''}`}>

                      {/* Spacer for the opposite side on desktop */}
                      <div className="hidden md:block md:w-[calc(50%-24px)]"></div>

                      {/* Content card */}
                      <motion.div
                        className={`relative z-10 ml-7 md:ml-0 md:w-[calc(50%-24px)] p-4 rounded-lg border backdrop-blur-sm ${item.isEducation ? 'bg-purple-500/10 border-purple-500/20' : 'bg-slate-700/50 border-slate-600/30'}`}
                        whileHover={{
                          scale: 1.02,
                          borderColor: item.isEducation ? 'rgba(168, 85, 247, 0.5)' : 'rgba(6, 182, 212, 0.5)',
                          boxShadow: item.isEducation
                            ? '0 4px 20px rgba(168, 85, 247, 0.15)'
                            : '0 4px 20px rgba(6, 182, 212, 0.15)',
                        }}
                        transition={{ duration: 0.2 }}
                      >
                        {/* Year badge inside card */}
                        <motion.div
                          initial={{ opacity: 0, scale: 0.8 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.4, delay: index * 0.15 + 0.2 }}
                          viewport={{ once: true }}
                          className="mb-2"
                        >
                          <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${item.isEducation ? 'text-purple-300 bg-purple-500/20 border border-purple-500/30' : 'text-cyan-300 bg-cyan-500/20 border border-cyan-500/30'}`}>
                            {item.year}
                          </span>
                        </motion.div>

                        <motion.h4
                          className="font-bold text-white"
                          initial={{ opacity: 0 }}
                          whileInView={{ opacity: 1 }}
                          transition={{ delay: index * 0.15 + 0.3 }}
                          viewport={{ once: true }}
                        >
                          {item.role}
                        </motion.h4>
                        <p className={`text-sm ${item.isEducation ? 'text-purple-300' : 'text-slate-400'} italic`}>{item.company}</p>
                        <p className="text-slate-300 text-sm mt-2">{item.description}</p>
                      </motion.div>
                    </div>

                    {/* Center dot */}
                    <div className="absolute left-0 md:left-1/2 md:-translate-x-2 top-4">
                      <motion.div
                        className={`w-4 h-4 rounded-full border-2 ${item.isEducation ? 'bg-purple-500 border-purple-400' : 'bg-cyan-500 border-cyan-400'}`}
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        transition={{
                          type: 'spring',
                          stiffness: 300,
                          damping: 15,
                          delay: index * 0.15 + 0.1,
                        }}
                        viewport={{ once: true }}
                      >
                        <motion.div
                          className={`absolute inset-[-4px] rounded-full ${item.isEducation ? 'bg-purple-500/30' : 'bg-cyan-500/30'}`}
                          animate={{
                            scale: [1, 1.8, 1],
                            opacity: [0.4, 0, 0.4],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            delay: index * 0.3,
                          }}
                        ></motion.div>
                      </motion.div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Skills Section - Rotating Circle */}
      <section id="skills" className="py-12 px-4 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-1/4 w-96 h-96 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
          <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000"></div>
        </div>

        <div className="max-w-6xl mx-auto relative z-10">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-4xl font-bold mb-6 text-center"
          >
            Technical Skills
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-slate-300 text-center mb-16 text-lg"
          >
            Click on any skill to see proficiency level or click on the SKILLS center to download CV
          </motion.p>

          {/* Rotating Skills Circle - Advanced Animations */}
          <div className="flex justify-center items-center min-h-[360px] sm:min-h-[420px] md:min-h-[500px] relative scale-[0.55] sm:scale-[0.7] md:scale-100 origin-center transform-gpu">
            {/* Triple animated pulsing auras */}
            <motion.div
              className="absolute w-full h-full max-w-2xl rounded-full"
              style={{
                background: 'radial-gradient(circle, rgba(6,182,212,0.15) 0%, transparent 70%)',
              }}
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.4, 0.8, 0.4],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            ></motion.div>

            <motion.div
              className="absolute w-full h-full max-w-2xl rounded-full"
              style={{
                background: 'radial-gradient(circle, rgba(59,130,246,0.1) 0%, transparent 70%)',
              }}
              animate={{
                scale: [0.9, 1.1, 0.9],
                opacity: [0.2, 0.5, 0.2],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: 0.5,
              }}
            ></motion.div>

            <motion.div
              className="absolute w-full h-full max-w-2xl rounded-full"
              style={{
                background: 'radial-gradient(circle, rgba(139,92,246,0.1) 0%, transparent 70%)',
              }}
              animate={{
                scale: [1.1, 0.9, 1.1],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: 1,
              }}
            ></motion.div>

            {/* Triple animated lines with different speeds */}
            <svg className="absolute w-full h-full max-w-2xl pointer-events-none" viewBox="0 0 500 500">
              <defs>
                <linearGradient id="line1Gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.8" />
                </linearGradient>
                <linearGradient id="line2Gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.6" />
                  <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.6" />
                </linearGradient>
                <linearGradient id="line3Gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.4" />
                </linearGradient>
              </defs>

              {/* Line 1 - Fast */}
              <motion.line x1="250" y1="50" x2="250" y2="450" stroke="url(#line1Gradient)" strokeWidth="2" filter="drop-shadow(0 0 8px rgba(6,182,212,0.6))"
                animate={{ rotate: 360 }}
                transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
                style={{ originX: 250, originY: 250 }}
              />

              {/* Line 2 - Medium */}
              <motion.line x1="250" y1="50" x2="250" y2="450" stroke="url(#line2Gradient)" strokeWidth="2" filter="drop-shadow(0 0 6px rgba(59,130,246,0.5))"
                animate={{ rotate: 360 }}
                transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
                style={{ originX: 250, originY: 250 }}
              />

              {/* Line 3 - Slow */}
              <motion.line x1="250" y1="50" x2="250" y2="450" stroke="url(#line3Gradient)" strokeWidth="2" filter="drop-shadow(0 0 4px rgba(139,92,246,0.4))"
                animate={{ rotate: 360 }}
                transition={{ duration: 35, repeat: Infinity, ease: 'linear' }}
                style={{ originX: 250, originY: 250 }}
              />
            </svg>

            {/* Animated orbital rings */}
            <svg className="absolute w-96 h-96 pointer-events-none">
              <motion.circle
                cx="192"
                cy="192"
                r="180"
                fill="none"
                stroke="url(#ringGradient1)"
                strokeWidth="1"
                opacity="0.3"
                animate={{ strokeDashoffset: [0, 1131.97] }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                strokeDasharray="1131.97"
              />
              <motion.circle
                cx="192"
                cy="192"
                r="140"
                fill="none"
                stroke="url(#ringGradient2)"
                strokeWidth="0.5"
                opacity="0.2"
                animate={{ strokeDashoffset: [0, 879.65] }}
                transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
                strokeDasharray="879.65"
              />
              <defs>
                <linearGradient id="ringGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#06b6d4" />
                  <stop offset="100%" stopColor="#3b82f6" />
                </linearGradient>
                <linearGradient id="ringGradient2" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#3b82f6" />
                  <stop offset="100%" stopColor="#8b5cf6" />
                </linearGradient>
              </defs>
            </svg>

            {/* Floating bounce particles around the circle */}
            {[...Array(16)].map((_, i) => (
              <motion.div
                key={`float-${i}`}
                className="absolute w-1.5 h-1.5 bg-gradient-to-r from-cyan-300 to-blue-400 rounded-full"
                style={{
                  left: '50%',
                  top: '50%',
                }}
                animate={{
                  x: Math.cos((i / 16) * Math.PI * 2) * 260,
                  y: Math.sin((i / 16) * Math.PI * 2) * 260 + Math.sin((i / 16) * Math.PI * 2) * 30,
                  opacity: [0.2, 0.8, 0.2],
                  scale: [0.5, 1.2, 0.5],
                }}
                transition={{
                  duration: 4 + (i % 4),
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: i * 0.08,
                }}
              ></motion.div>
            ))}

            <motion.div
              className="relative w-96 h-96"

              animate={{ rotate: 360 }}
              transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
            >
              {/* Center circle with "SKILLS" text - Enhanced */}
              <motion.div
                className="absolute inset-0 flex items-center justify-center"
                style={{
                  left: '50%',
                  top: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: '100px',
                  height: '100px',
                }}
              >
                <motion.div
                  className="w-full h-full rounded-full bg-gradient-to-br from-cyan-500 via-blue-500 to-purple-600 flex items-center justify-center relative group cursor-pointer overflow-hidden"
                  whileHover={{
                    scale: [1, 1.2, 1.18],
                  }}
                  animate={{
                    boxShadow: [
                      '0 0 20px rgba(6, 182, 212, 0.3), inset 0 0 20px rgba(6, 182, 212, 0.1)',
                      '0 0 40px rgba(6, 182, 212, 0.5), inset 0 0 30px rgba(6, 182, 212, 0.2)',
                      '0 0 20px rgba(6, 182, 212, 0.3), inset 0 0 20px rgba(6, 182, 212, 0.1)',
                    ],
                  }}
                  transition={{
                    boxShadow: { duration: 3, repeat: Infinity },
                    scale: { type: 'spring', stiffness: 400, damping: 8, duration: 0.6 },
                  }}
                  onClick={() => {
                    const link = document.createElement('a');
                    link.href = '/Alejandro_De_La_Rocha_Resume.pdf';
                    link.download = 'Alejandro_De_La_Rocha_Resume.pdf';
                    link.click();
                  }}
                >
                  {/* Triple animated core glows with bounce */}
                  <motion.div
                    className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 opacity-30"
                    animate={{
                      scale: [1, 1.25, 1],
                      opacity: [0.3, 0.7, 0.3],
                    }}
                    transition={{
                      duration: 2.5,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                  ></motion.div>

                  <motion.div
                    className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 opacity-20"
                    animate={{
                      scale: [0.8, 1.15, 0.8],
                      opacity: [0.2, 0.5, 0.2],
                    }}
                    transition={{
                      duration: 3.5,
                      repeat: Infinity,
                      ease: 'easeInOut',
                      delay: 0.3,
                    }}
                  ></motion.div>

                  <motion.div
                    className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-400 to-cyan-400 opacity-15"
                    animate={{
                      scale: [1.1, 0.9, 1.1],
                      opacity: [0.2, 0.4, 0.2],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: 'easeInOut',
                      delay: 0.6,
                    }}
                  ></motion.div>

                  {/* Rotating border accent */}
                  <motion.div
                    className="absolute inset-0 rounded-full border-2 border-transparent"
                    animate={{ borderColor: ['#06b6d4', '#3b82f6', '#8b5cf6', '#06b6d4'] }}
                    transition={{ duration: 6, repeat: Infinity }}
                    style={{
                      backgroundImage: 'linear-gradient(90deg, #06b6d4, #3b82f6, #8b5cf6)',
                      backgroundClip: 'padding-box',
                      padding: '2px',
                    }}
                  ></motion.div>

                  <motion.div
                    className="relative z-10 text-center"
                    animate={{ rotate: -360 }}
                    transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
                  >
                    {/* Default "SKILLS" text */}
                    <motion.div
                      className="text-lg font-bold text-white group-hover:opacity-0 transition-opacity duration-300"
                      animate={{
                        textShadow: [
                          '0 0 10px rgba(6, 182, 212, 0.5)',
                          '0 0 20px rgba(6, 182, 212, 0.8)',
                          '0 0 10px rgba(6, 182, 212, 0.5)',
                        ],
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      SKILLS
                    </motion.div>
                    {/* "Download Resume" on hover */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <span className="text-[9px] font-bold text-white leading-tight text-center">
                        DOWNLOAD<br />RESUME
                      </span>
                    </div>
                  </motion.div>
                </motion.div>
              </motion.div>

              {/* Skills positioned in circle - with particle effects */}
              {skills.map((skill, index) => {
                const angle = (index / skills.length) * Math.PI * 2;
                const radius = 200;
                const x = Math.cos(angle) * radius;
                const y = Math.sin(angle) * radius;

                return (
                  <motion.div
                    key={skill.category}
                    className="absolute"
                    style={{
                      left: `calc(50% + ${x}px - 28px)`,
                      top: `calc(50% + ${y}px - 28px)`,
                    }}
                    animate={{ rotate: -360 }}
                    transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
                  >
                    {/* Skill circle - Enhanced with particles */}
                    <motion.div
                      className="relative group cursor-pointer"
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{
                        type: 'spring',
                        stiffness: 120,
                        damping: 12,
                        delay: index * 0.15,
                      }}
                      viewport={{ once: true }}
                      whileHover={{ scale: 1.35 }}
                      onClick={() => setSelectedSkill(index)}
                    >
                      {/* Triple particle burst effect on hover - increased particles */}
                      {[...Array(12)].map((_, i) => (
                        <motion.div
                          key={`particle-${i}`}
                          className="absolute w-2 h-2 bg-gradient-to-r from-cyan-300 to-blue-400 rounded-full shadow-lg shadow-cyan-400/50"
                          style={{
                            left: '50%',
                            top: '50%',
                            marginLeft: '-4px',
                            marginTop: '-4px',
                          }}
                          initial={{ opacity: 0, scale: 0, x: 0, y: 0 }}
                          whileHover={{
                            opacity: [0, 1, 0.5, 0],
                            scale: [0, 1.2, 0.8, 0],
                            x: Math.cos((i / 12) * Math.PI * 2) * 60,
                            y: Math.sin((i / 12) * Math.PI * 2) * 60,
                          }}
                          transition={{
                            duration: 0.8,
                            ease: 'easeOut',
                            times: [0, 0.3, 0.7, 1],
                          }}
                        ></motion.div>
                      ))}

                      {/* Extra ring of bouncing particles */}
                      {[...Array(8)].map((_, i) => (
                        <motion.div
                          key={`bounce-${i}`}
                          className="absolute w-1 h-1 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full shadow-lg shadow-purple-400/40"
                          style={{
                            left: '50%',
                            top: '50%',
                            marginLeft: '-2px',
                            marginTop: '-2px',
                          }}
                          initial={{ opacity: 0, scale: 0, x: 0, y: 0 }}
                          whileHover={{
                            opacity: [0, 0.8, 0],
                            scale: [0, 1, 0],
                            x: Math.cos((i / 8) * Math.PI * 2) * 70,
                            y: [
                              Math.sin((i / 8) * Math.PI * 2) * 70,
                              Math.sin((i / 8) * Math.PI * 2) * 80,
                              Math.sin((i / 8) * Math.PI * 2) * 60,
                            ],
                          }}
                          transition={{
                            duration: 1,
                            ease: 'easeOut',
                            times: [0, 0.5, 1],
                          }}
                        ></motion.div>
                      ))}

                      {/* Rotating inner circle - Enhanced glow */}
                      <motion.div
                        className={`w-14 h-14 rounded-full bg-gradient-to-br from-slate-700 to-slate-800 border-2 border-cyan-500/50 flex items-center justify-center relative overflow-hidden`}
                        animate={{ rotate: 360 }}
                        transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
                        whileHover={{
                          borderColor: 'rgba(6, 182, 212, 1)',
                          boxShadow: [
                            '0 0 30px rgba(6, 182, 212, 0.6), inset 0 0 30px rgba(6, 182, 212, 0.2)',
                            '0 0 50px rgba(6, 182, 212, 0.8), inset 0 0 50px rgba(6, 182, 212, 0.3)',
                            '0 0 30px rgba(6, 182, 212, 0.6), inset 0 0 30px rgba(6, 182, 212, 0.2)',
                          ],
                        }}
                        transition={{
                          boxShadow: {
                            duration: 0.6,
                            repeat: Infinity,
                          },
                        }}
                      >
                        {/* Triple pulsing glow layers */}
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-cyan-500/0 via-cyan-500/40 to-blue-500/0 opacity-0 group-hover:opacity-100 rounded-full"
                          animate={{
                            opacity: [0, 0.6, 0.2, 0],
                            scale: [1, 1.1, 0.95, 1],
                          }}
                          transition={{
                            duration: 1.5,
                            repeat: Infinity,
                          }}
                        ></motion.div>

                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-blue-500/30 to-purple-500/0 opacity-0 group-hover:opacity-100 rounded-full"
                          animate={{
                            opacity: [0, 0.4, 0.15, 0],
                            scale: [0.9, 1.05, 0.9, 0.9],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            delay: 0.3,
                          }}
                        ></motion.div>

                        {/* Tech logos with enhanced bounce animations */}
                        <motion.div
                          className="relative z-10 flex items-center justify-center w-7 h-7"
                          animate={{ rotate: -360 }}
                          transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
                          whileHover={{
                            scale: [1, 1.4, 1.3],
                            filter: [
                              'drop-shadow(0 0 15px rgba(6, 182, 212, 0.8))',
                              'drop-shadow(0 0 25px rgba(6, 182, 212, 1))',
                              'drop-shadow(0 0 15px rgba(6, 182, 212, 0.8))',
                            ],
                          }}
                          transition={{
                            scale: {
                              duration: 0.6,
                              repeat: Infinity,
                              type: 'spring',
                              stiffness: 300,
                              damping: 10,
                            },
                            filter: {
                              duration: 0.8,
                              repeat: Infinity,
                            },
                          }}
                        >
                          <img
                            src={skill.svgIcon}
                            alt={`${skill.category} icon`}
                            className="w-full h-full object-contain"
                            style={{ filter: 'brightness(1.2)' }}
                          />
                        </motion.div>
                      </motion.div>

                      {/* Label below circle - Enhanced */}
                      <motion.div
                        className="text-center mt-2 whitespace-nowrap"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{
                          type: 'spring',
                          stiffness: 100,
                          damping: 15,
                          delay: index * 0.15 + 0.1,
                        }}
                        viewport={{ once: true }}
                      >
                        <motion.h3
                          className="font-bold text-xs text-cyan-300 bg-cyan-500/10 px-3 py-1.5 rounded-full border border-cyan-500/30 group-hover:border-cyan-400 group-hover:bg-cyan-500/20 transition-all"
                          whileHover={{
                            scale: 1.15,
                            letterSpacing: '0.05em',
                          }}
                        >
                          {skill.category}
                        </motion.h3>
                      </motion.div>
                    </motion.div>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>

          {/* Skills details below */}
          {selectedSkill !== null && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="mt-20 max-w-4xl mx-auto"
            >
              <div className="bg-gradient-to-br from-slate-700/30 to-slate-800/30 rounded-lg p-8 border border-slate-600/50 hover:border-cyan-500/50 transition-all text-center">
                <h3 className="text-2xl font-bold text-cyan-400 mb-3">{skills[selectedSkill].category}</h3>
                <motion.span
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="inline-block text-lg font-semibold text-cyan-300 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 px-4 py-2 rounded-full border border-cyan-500/50 backdrop-blur-sm mb-6"
                >
                  {skills[selectedSkill].proficiency}% proficient
                </motion.span>
                <div className="flex flex-wrap justify-center gap-3">
                  {skills[selectedSkill].items.map((item) => (
                    <motion.span
                      key={item}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="px-4 py-2 bg-slate-600/50 text-cyan-300 rounded-lg text-sm border border-slate-500/50 hover:border-cyan-400/50 hover:bg-cyan-500/10 transition-all"
                    >
                      {item}
                    </motion.span>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-24 px-4 bg-slate-800/50 relative overflow-hidden">
        {/* Ambient background orbs */}
        <motion.div
          className="absolute top-1/4 -left-32 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none"
          animate={{ x: [0, 60, 0], y: [0, -40, 0], scale: [1, 1.3, 1] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute bottom-1/4 -right-32 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl pointer-events-none"
          animate={{ x: [0, -60, 0], y: [0, 40, 0], scale: [1.3, 1, 1.3] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* SVG gradient defs for connectors */}
        <svg className="absolute w-0 h-0">
          <defs>
            <linearGradient id="connectorGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="rgba(6,182,212,0.6)" />
              <stop offset="50%" stopColor="rgba(59,130,246,0.4)" />
              <stop offset="100%" stopColor="rgba(6,182,212,0.6)" />
            </linearGradient>
          </defs>
        </svg>

        <div className="max-w-6xl mx-auto relative z-10">
          {/* Section heading with letter animation */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mb-20"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mb-3">
              {'Featured Projects'.split(' ').map((word, wi) => (
                <span key={wi} className="inline-block mr-3">
                  {word.split('').map((char, ci) => (
                    <motion.span
                      key={ci}
                      initial={{ opacity: 0, y: 30, rotateX: -90 }}
                      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                      transition={{ delay: (wi * 9 + ci) * 0.03, type: 'spring', stiffness: 150, damping: 12 }}
                      viewport={{ once: true }}
                      className="inline-block"
                    >
                      {char}
                    </motion.span>
                  ))}
                </span>
              ))}
            </h2>
            <motion.div
              initial={{ width: 0, opacity: 0 }}
              whileInView={{ width: '6rem', opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              viewport={{ once: true }}
              className="h-1 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full"
            />
          </motion.div>

          {/* Project cards */}
          <div className="relative">
            {projects.map((project, index) => {
              const isEven = index % 2 === 0;
              return (
                <React.Fragment key={project.title}>
                  <motion.div
                    initial={{ opacity: 0, x: isEven ? -100 : 100 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.9, type: 'spring', stiffness: 40, damping: 14 }}
                    viewport={{ once: true, margin: '-80px' }}
                    className={`relative flex flex-col ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} gap-0 md:gap-10 items-stretch group mb-8`}
                  >
                    {/* Neural web connector between image and content */}
                    <svg
                      className="absolute top-[5%] bottom-[5%] hidden md:block pointer-events-none z-[5]"
                      style={{
                        left: isEven ? '40%' : '32%',
                        right: isEven ? '32%' : '40%',
                        height: '90%',
                      }}
                      viewBox="0 0 280 400"
                      fill="none"
                      preserveAspectRatio="none"
                    >
                      {/* Web lines from image edge → nodes → content edge */}
                      {[
                        [0, 30, 140, 70],
                        [0, 90, 100, 130],
                        [0, 170, 140, 200],
                        [0, 260, 100, 270],
                        [0, 340, 140, 330],
                        [140, 70, 280, 20],
                        [140, 70, 280, 120],
                        [100, 130, 280, 120],
                        [100, 130, 280, 190],
                        [140, 200, 280, 190],
                        [140, 200, 280, 270],
                        [100, 270, 280, 270],
                        [100, 270, 280, 340],
                        [140, 330, 280, 380],
                        [140, 70, 100, 130],
                        [100, 130, 140, 200],
                        [140, 200, 100, 270],
                        [100, 270, 140, 330],
                        [0, 90, 140, 70],
                        [0, 260, 140, 330],
                      ].map(([x1, y1, x2, y2], li) => (
                        <motion.line
                          key={`web-${li}`}
                          x1={x1} y1={y1} x2={x2} y2={y2}
                          stroke="rgba(6,182,212,0.12)"
                          strokeWidth="1.5"
                          initial={{ pathLength: 0, opacity: 0 }}
                          whileInView={{ pathLength: 1, opacity: 1 }}
                          transition={{ delay: 0.4 + li * 0.04, duration: 0.5, ease: 'easeOut' }}
                          viewport={{ once: true }}
                          className="group-hover:[stroke:rgba(6,182,212,0.3)] transition-all duration-500"
                        />
                      ))}
                      {/* Nodes (junction dots) */}
                      {[
                        [140, 70], [100, 130], [140, 200], [100, 270], [140, 330],
                      ].map(([cx, cy], ni) => (
                        <motion.circle
                          key={`node-${ni}`}
                          cx={cx} cy={cy} r="4"
                          fill="rgba(6,182,212,0.4)"
                          initial={{ scale: 0, opacity: 0 }}
                          whileInView={{ scale: 1, opacity: 1 }}
                          transition={{ delay: 0.8 + ni * 0.1, type: 'spring', stiffness: 200 }}
                          viewport={{ once: true }}
                        />
                      ))}
                      {/* Animated traveling dot along the web */}
                      <motion.circle
                        r="3"
                        fill="rgba(6,182,212,0.8)"
                        filter="url(#webGlow)"
                        animate={{
                          cx: [0, 140, 280, 280, 140, 0],
                          cy: [30, 70, 20, 270, 330, 340],
                        }}
                        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                      />
                      <defs>
                        <filter id="webGlow">
                          <feGaussianBlur stdDeviation="3" result="blur" />
                          <feMerge>
                            <feMergeNode in="blur" />
                            <feMergeNode in="SourceGraphic" />
                          </feMerge>
                        </filter>
                      </defs>
                    </svg>

                    {/* Image side */}
                    <motion.div
                      className="md:w-[55%] relative overflow-hidden rounded-2xl bg-slate-900/50"
                      whileHover={{ scale: 1.015 }}
                      transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                    >
                      {project.image ? (
                        <>
                          {/* Wipe reveal overlay */}
                          <motion.div
                            className="absolute inset-0 bg-slate-900 z-10"
                            initial={{ scaleX: 1 }}
                            whileInView={{ scaleX: 0 }}
                            transition={{ duration: 0.9, delay: 0.2, ease: [0.76, 0, 0.24, 1] }}
                            viewport={{ once: true }}
                            style={{ transformOrigin: isEven ? 'right' : 'left' }}
                          />
                          <motion.img
                            src={project.image}
                            alt={project.title}
                            className="w-full h-full object-cover"
                            initial={{ scale: 1.3 }}
                            whileInView={{ scale: 1 }}
                            transition={{ duration: 1.4, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
                            viewport={{ once: true }}
                            whileHover={{ scale: 1.06 }}
                          />
                          {/* Gradient overlay on hover */}
                          <div className={`absolute inset-0 bg-gradient-to-${isEven ? 'r' : 'l'} from-transparent via-transparent to-slate-900/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 pointer-events-none`} />
                          {/* Shine sweep on hover */}
                          <motion.div
                            className="absolute inset-0 z-10 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity"
                            style={{
                              background: 'linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.03) 45%, rgba(255,255,255,0.06) 50%, rgba(255,255,255,0.03) 55%, transparent 60%)',
                            }}
                            initial={{ x: '-100%' }}
                            whileHover={{ x: '100%' }}
                            transition={{ duration: 0.8, ease: 'easeInOut' }}
                          />
                        </>
                      ) : (
                        <div className={`w-full h-full min-h-[250px] bg-gradient-to-br ${project.color} opacity-10 flex items-center justify-center relative`}>
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
                            className="opacity-20"
                          >
                            <Code2 size={100} strokeWidth={1} />
                          </motion.div>
                          {/* Pulsing rings */}
                          {[0, 1, 2].map((r) => (
                            <motion.div
                              key={r}
                              className="absolute inset-0 m-auto w-32 h-32 rounded-full border border-cyan-500/10"
                              animate={{ scale: [1, 2.5, 1], opacity: [0.3, 0, 0.3] }}
                              transition={{ duration: 3, delay: r * 1, repeat: Infinity }}
                            />
                          ))}
                        </div>
                      )}
                    </motion.div>

                    {/* Mobile horizontal web connector */}
                    <div className="md:hidden relative h-12 w-full overflow-visible">
                      <svg
                        className="absolute inset-0 w-full h-full pointer-events-none"
                        viewBox="0 0 400 60"
                        fill="none"
                        preserveAspectRatio="none"
                      >
                        {[
                          [30, 0, 70, 30], [100, 0, 130, 30], [190, 0, 200, 30],
                          [280, 0, 270, 30], [360, 0, 330, 30],
                          [70, 30, 50, 60], [130, 30, 120, 60], [200, 30, 200, 60],
                          [270, 30, 280, 60], [330, 30, 350, 60],
                          [70, 30, 130, 30], [130, 30, 200, 30],
                          [200, 30, 270, 30], [270, 30, 330, 30],
                          [70, 30, 120, 60], [130, 30, 200, 60],
                          [270, 30, 200, 60], [330, 30, 280, 60],
                        ].map(([x1, y1, x2, y2], li) => (
                          <motion.line
                            key={`mweb-${li}`}
                            x1={x1} y1={y1} x2={x2} y2={y2}
                            stroke="rgba(6,182,212,0.15)"
                            strokeWidth="1"
                            initial={{ pathLength: 0, opacity: 0 }}
                            whileInView={{ pathLength: 1, opacity: 1 }}
                            transition={{ delay: 0.3 + li * 0.03, duration: 0.4 }}
                            viewport={{ once: true }}
                          />
                        ))}
                        {[[70, 30], [130, 30], [200, 30], [270, 30], [330, 30]].map(([cx, cy], ni) => (
                          <motion.circle
                            key={`mnode-${ni}`}
                            cx={cx} cy={cy} r="3"
                            fill="rgba(6,182,212,0.5)"
                            initial={{ scale: 0 }}
                            whileInView={{ scale: 1 }}
                            transition={{ delay: 0.6 + ni * 0.08, type: 'spring', stiffness: 200 }}
                            viewport={{ once: true }}
                          />
                        ))}
                        <motion.circle
                          r="2.5"
                          fill="rgba(6,182,212,0.8)"
                          animate={{
                            cx: [30, 70, 200, 330, 350, 280, 200, 120, 50, 30],
                            cy: [0, 30, 30, 30, 60, 60, 60, 60, 60, 0],
                          }}
                          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                        />
                      </svg>
                    </div>

                    {/* Content side */}
                    <div className={`md:w-[45%] flex flex-col justify-center py-8 md:py-4 ${isEven ? '' : ''}`}>
                      {/* Project number */}
                      <motion.span
                        className="text-8xl font-black leading-none mb-1 select-none"
                        style={{ WebkitTextStroke: '1px rgba(6,182,212,0.15)', color: 'transparent' }}
                        initial={{ opacity: 0, x: isEven ? -30 : 30, scale: 0.8 }}
                        whileInView={{ opacity: 1, x: 0, scale: 1 }}
                        transition={{ delay: 0.3, type: 'spring', stiffness: 80 }}
                        viewport={{ once: true }}
                      >
                        {String(index + 1).padStart(2, '0')}
                      </motion.span>

                      {/* Title with gradient hover */}
                      <motion.h3
                        className="text-2xl md:text-3xl font-bold mb-3 bg-gradient-to-r from-white to-slate-200 bg-clip-text text-transparent group-hover:from-cyan-300 group-hover:to-blue-300 transition-all duration-500"
                        initial={{ opacity: 0, y: 25 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.35, type: 'spring', stiffness: 100 }}
                        viewport={{ once: true }}
                      >
                        {project.title}
                      </motion.h3>

                      {/* Description */}
                      <motion.p
                        className="text-slate-400 text-sm mb-6 leading-relaxed"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.45, duration: 0.6 }}
                        viewport={{ once: true }}
                      >
                        {project.description}
                      </motion.p>

                      {/* Tech tags with spring pop */}
                      <div className="flex flex-wrap gap-2 mb-6">
                        {project.tech.map((tech, i) => (
                          <motion.span
                            key={tech}
                            initial={{ opacity: 0, scale: 0, rotate: -15 }}
                            whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                            transition={{ delay: 0.5 + i * 0.07, type: 'spring', stiffness: 300, damping: 12 }}
                            viewport={{ once: true }}
                            whileHover={{ scale: 1.2, y: -3, boxShadow: '0 4px 15px rgba(6,182,212,0.3)' }}
                            className="text-xs bg-cyan-500/10 text-cyan-300 px-3 py-1.5 rounded-full border border-cyan-500/20 cursor-default backdrop-blur-sm"
                          >
                            {tech}
                          </motion.span>
                        ))}
                      </div>

                      {/* Demo link */}
                      {project.demo && (
                        <motion.a
                          href={project.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          initial={{ opacity: 0, y: 15 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.7 }}
                          viewport={{ once: true }}
                          whileHover={{ x: 8 }}
                          whileTap={{ scale: 0.95 }}
                          className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 text-sm font-semibold group/link w-fit"
                        >
                          <span className="relative">
                            View Project
                            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-cyan-400 group-hover/link:w-full transition-all duration-300" />
                          </span>
                          <motion.span
                            animate={{ x: [0, 5, 0] }}
                            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                          >
                            <ExternalLink size={16} />
                          </motion.span>
                        </motion.a>
                      )}
                    </div>
                  </motion.div>

                  {/* Animated connector between cards */}
                  {index < projects.length - 1 && (
                    <div className="relative h-24 md:h-32 flex items-center justify-center my-2">
                      {/* SVG flowing curve (desktop) */}
                      <svg className="absolute inset-0 w-full h-full hidden md:block" viewBox="0 0 1000 100" preserveAspectRatio="none">
                        <motion.path
                          d={isEven
                            ? 'M 700 0 C 700 40, 500 50, 300 100'
                            : 'M 300 0 C 300 40, 500 50, 700 100'
                          }
                          fill="none"
                          stroke="url(#connectorGrad)"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          initial={{ pathLength: 0, opacity: 0 }}
                          whileInView={{ pathLength: 1, opacity: 1 }}
                          transition={{ duration: 1.2, ease: 'easeInOut' }}
                          viewport={{ once: true }}
                        />
                      </svg>
                      {/* Mobile: simple vertical line */}
                      <motion.div
                        className="md:hidden w-px h-full bg-gradient-to-b from-cyan-500/40 via-cyan-500/20 to-cyan-500/40"
                        initial={{ scaleY: 0 }}
                        whileInView={{ scaleY: 1 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                      />
                      {/* Center pulse dot */}
                      <motion.div
                        className="absolute z-10"
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        transition={{ delay: 0.5, type: 'spring', stiffness: 200 }}
                        viewport={{ once: true }}
                      >
                        <motion.div
                          className="w-3 h-3 bg-cyan-500 rounded-full"
                          animate={{
                            boxShadow: [
                              '0 0 0 0 rgba(6,182,212,0.5)',
                              '0 0 15px 6px rgba(6,182,212,0.15)',
                              '0 0 0 0 rgba(6,182,212,0.5)',
                            ],
                          }}
                          transition={{ duration: 2, repeat: Infinity }}
                        />
                      </motion.div>
                    </div>
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-4xl font-bold mb-12"
          >
            Services
          </motion.h2>

          <motion.div
            className="grid md:grid-cols-2 gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {services.map((service) => (
              <motion.div
                key={service.title}
                variants={itemVariants}
                whileHover={{ y: -8, scale: 1.02 }}
                className="group bg-gradient-to-br from-slate-700/30 to-slate-800/30 rounded-lg p-8 border border-slate-600/50 hover:border-cyan-500/50 transition-all cursor-pointer relative overflow-hidden"
              >
                {/* Animated border glow */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-cyan-500/0 via-transparent to-blue-500/0 group-hover:from-cyan-500/10 group-hover:to-blue-500/10 rounded-lg transition-all"
                  whileHover={{ opacity: 1 }}
                />

                <h3 className="font-bold text-xl mb-3 group-hover:text-cyan-300 transition-colors relative z-10">{service.title}</h3>
                <p className="text-slate-300 mb-6 group-hover:text-slate-100 transition-colors relative z-10">{service.description}</p>
                <div className="flex justify-between items-end relative z-10">
                  <div>
                    <div className="text-xs text-slate-400 group-hover:text-slate-300 transition-colors">Price Range</div>
                    <motion.div
                      className="font-semibold text-cyan-400 group-hover:text-cyan-300 transition-colors"
                      whileHover={{ scale: 1.1 }}
                    >
                      {service.price}
                    </motion.div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-slate-400 group-hover:text-slate-300 transition-colors">Timeline</div>
                    <motion.div
                      className="font-semibold text-cyan-400 group-hover:text-cyan-300 transition-colors"
                      whileHover={{ scale: 1.1 }}
                    >
                      {service.time}
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4 bg-slate-800/50">
        <div className="max-w-2xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold mb-6">Let's Work Together</h2>
            <p className="text-slate-300 mb-12">
              Have a project in mind? Let's collaborate and build something amazing.
            </p>

            <motion.div
              className="space-y-4"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <motion.a
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="mailto:hi@alejandrodelarocha.com"
                className="inline-block px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg font-semibold text-white hover:shadow-lg hover:shadow-cyan-500/50 transition-all"
              >
                Send Me an Email
              </motion.a>

              <div className="flex justify-center gap-6 pt-8">
                <motion.a
                  whileHover={{ y: -5 }}
                  href="https://www.linkedin.com/in/alejandrodlrocha/"
                  className="text-slate-400 hover:text-cyan-400 transition-colors"
                >
                  <Linkedin size={28} />
                </motion.a>
                <motion.a
                  whileHover={{ y: -5 }}
                  href="mailto:hi@alejandrodelarocha.com"
                  className="text-slate-400 hover:text-cyan-400 transition-colors"
                >
                  <Mail size={28} />
                </motion.a>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-slate-700/50 text-center text-slate-400">
        <p>© 2026 Alejandro de la Rocha. All rights reserved.</p>
      </footer>
    </div>
  );
}
