import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import { 
  Terminal, Code2, Layout, Server, Layers, 
  ChevronRight, Moon, Sun, Search, X, Info, ExternalLink, 
  Mail, ArrowRight, CheckCircle2, Zap, Cpu,
} from 'lucide-react';


const GITHUB = "https://github.com/rodrigosilvadevv";
const LINKEDIN = "https://www.linkedin.com/in/rodrigo-silva-3a02391b8/";
const EMAIL = "rodrigoss1053@gmail.com";
const img = (arquivo) => `${import.meta.env.BASE_URL}imagens/${arquivo}`;
const FALLBACK =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500">
      <rect width="800" height="500" fill="#0f172a"/>
      <text x="400" y="250" font-family="sans-serif" font-size="20" fill="#64748b" text-anchor="middle">imagem nao encontrada</text>
    </svg>`
  );

const IconeGithub = ({ size = 20, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24"
    fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
  </svg>
);

const IconeLinkedin = ({ size = 20, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24"
    fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

// o babado novo 
const CustomCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [temMouse, setTemMouse] = useState(false);

  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return;
    setTemMouse(true);

    const updateMousePosition = (e) => setMousePosition({ x: e.clientX, y: e.clientY });
    const handleMouseOver = (e) => {
      if (e.target.closest('button') || e.target.closest('a')) setIsHovering(true);
      else setIsHovering(false);
    };

    window.addEventListener('mousemove', updateMousePosition);
    window.addEventListener('mouseover', handleMouseOver);
    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  if (!temMouse) return null;

  return (
    <motion.div
      className="fixed top-0 left-0 w-8 h-8 rounded-full pointer-events-none z-[9999] mix-blend-difference hidden md:flex items-center justify-center"
      animate={{
        x: mousePosition.x - 16,
        y: mousePosition.y - 16,
        scale: isHovering ? 2 : 1,
        backgroundColor: isHovering ? "rgba(255,255,255,1)" : "rgba(255,255,255,0.3)",
      }}
      transition={{ type: "spring", stiffness: 500, damping: 28, mass: 0.5 }}
    >
      {isHovering && <div className="w-1 h-1 bg-black rounded-full" />}
    </motion.div>
  );
};

const Skeleton = ({ className }) => (
  <motion.div 
    className={`bg-gray-200 dark:bg-gray-800 rounded-lg overflow-hidden relative ${className}`}
    initial={{ opacity: 0.4 }} animate={{ opacity: 1 }}
    transition={{ repeat: Infinity, repeatType: "reverse", duration: 1.2 }}
  />
);

export default function Portfolio() {
  const [isDark, setIsDark] = useState(true);
  const [cmdOpen, setCmdOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [activeProjectInfo, setActiveProjectInfo] = useState(null);

  useEffect(() => {
    const t = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (isDark) document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
  }, [isDark]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setCmdOpen((prev) => !prev);
      }
      if (e.key === 'Escape') {
        setCmdOpen(false);
        setActiveProjectInfo(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // trava a rolagem do fundo quando um modal está aberto (essencial no celular)
  useEffect(() => {
    const travado = cmdOpen || !!activeProjectInfo;
    document.body.style.overflow = travado ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [cmdOpen, activeProjectInfo]);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  const skills = [
    { category: "Frontend & Mobile", icon: <Layout />, items: ["React", "Vite", "Tailwind CSS", "JavaScript ES6+"] },
    { category: "Backend & Cloud", icon: <Server />, items: ["Node.js & Express", "Python & Java", "Supabase", "Render & Railway"] },
    { category: "Hardware & IoT", icon: <Cpu />, items: ["ESP32 Microcontrollers", "Módulos NFC (RC522)", "RFID UHF", "Automação Física"] },
    { category: "DevOps & Deploy", icon: <Terminal />, items: ["Git & GitHub", "Netlify", "Google Play Console", "CI/CD Workflows"] },
  ];

  const projects = [
    {
      id: "salao-digital",
      title: "Salão Digital",
      shortDesc: "Plataforma SaaS completa para gestão de agendamentos em barbearias e salões de beleza.",
      techs: ["React", "Supabase", "Node.js", "Tailwind"],
      image: img("salaodigital.png"),
      link: "https://salaodigital.app.br",
      infoTab: {
        challenge: "Criar uma agenda digital livre de conflitos de horários (double-booking) com uma interface moderna para barbeiros.",
        solution: "Arquitetura serverless com Supabase, utilizando banco relacional para garantir a integridade dos agendamentos e UI fluida em React.",
        metrics: "Workflows de release estabelecidos e testes fechados integrados via Google Play Console."
      }
    },
    {
      id: "rcf",
      title: "RCF Instalações",
      shortDesc: "Showcase digital de serviços de instalação elétrica com domínio customizado e deploy automatizado.",
      techs: ["React", "Render", "Registro.br"],
      image: img("rcfinstalacoes.png"),
      link: "https://rcfinstalacoes.com.br",
      infoTab: {
        challenge: "Estabelecer forte presença digital profissional para serviços elétricos.",
        solution: "Landing page moderna e otimizada (rcfinstalacoes.com.br), gerenciada via Render com integração DNS.",
        metrics: "Alta performance de SEO e tempo de carregamento reduzido."
      }
    },
    {
      id: "iot-rfid",
      title: "Automação IoT com ESP32",
      shortDesc: "Integração de hardware e software utilizando ESP32, NFC e RFID UHF para automação.",
      techs: ["C++", "ESP32", "NFC/RFID", "IoT"],
      image: img("nfctag.jpg"),
      link: null,
      infoTab: {
        challenge: "Conectar leitores físicos (RC522) a sistemas digitais para automação de acesso e controle.",
        solution: "Programação de microcontroladores em C++ enviando dados de sensores para APIs web.",
        metrics: "Ponte perfeita entre a engenharia física e o ambiente web."
      }
    },
    {
      id: "panni-dash",
      title: "Panni Dash & Murlec",
      shortDesc: "Sistemas de gerenciamento de pedidos e rastreamento de frescor para o setor alimentício e padarias.",
      techs: ["React", "Node.js", "WebSockets"],
      image: img("pannidash.png"),
      link: null,
      infoTab: {
        challenge: "Acompanhar a fila de produção em tempo real e monitorar regras complexas de frescor de produtos de panificação.",
        solution: "Desenvolvimento de dashboards dinâmicos e regras lógicas de cronometragem integradas à interface do usuário para controle da cozinha.",
        metrics: "Processamento visual imediato para otimizar o tempo de atendimento."
      }
    }
  ];

  const aoFalharImagem = (e) => {
    e.currentTarget.onerror = null;
    e.currentTarget.src = FALLBACK;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-[#030712] flex flex-col items-center justify-center p-8">
        <Skeleton className="w-24 h-24 rounded-full mb-8" />
        <Skeleton className="w-56 max-w-full h-8 mb-4" />
        <Skeleton className="w-40 max-w-full h-4" />
      </div>
    );
  }

  return (
    <div className="min-h-screen overflow-x-hidden bg-gray-50 dark:bg-[#030712] text-gray-900 dark:text-gray-100 font-sans selection:bg-blue-500/30 transition-colors duration-300">
      <CustomCursor />
      <motion.div className="fixed top-0 left-0 right-0 h-1 bg-blue-500 origin-left z-50" style={{ scaleX }} />

      <nav className="fixed top-0 w-full z-40 bg-white/70 dark:bg-[#030712]/70 backdrop-blur-md border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-3">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="font-bold text-lg sm:text-xl tracking-tighter flex items-center gap-2 min-w-0">
            <Code2 className="text-blue-500 flex-shrink-0" size={22} />
            <span className="truncate">Rodrigo.dev()</span>
          </motion.div>

          <div className="flex items-center gap-2 sm:gap-4 flex-shrink-0">
            {/* Busca visível também no celular — é a única navegação do site */}
            <button 
              onClick={() => setCmdOpen(true)}
              aria-label="Abrir navegação e busca"
              className="flex items-center gap-2 px-3 h-10 text-sm bg-gray-100 dark:bg-gray-900 rounded-md border border-gray-200 dark:border-gray-800 hover:border-blue-500 transition-colors"
            >
              <Search size={16} className="text-gray-500" />
              <span className="hidden md:inline text-gray-500">Buscar...</span>
              <kbd className="hidden md:inline-block ml-3 font-mono text-[10px] px-1.5 py-0.5 bg-gray-200 dark:bg-gray-800 rounded text-gray-500">⌘K</kbd>
            </button>

            <motion.button 
              whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
              onClick={() => setIsDark(!isDark)}
              aria-label={isDark ? "Ativar tema claro" : "Ativar tema escuro"}
              className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800"
            >
              {isDark ? <Sun size={18} className="text-yellow-500" /> : <Moon size={18} className="text-blue-500" />}
            </motion.button>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {cmdOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setCmdOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: -20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: -20 }}
              className="fixed top-20 md:top-[20%] left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] max-w-lg bg-white dark:bg-gray-900 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-800 z-[101] overflow-hidden"
            >
              <div className="p-4 border-b border-gray-200 dark:border-gray-800 flex items-center gap-3">
                <Search className="text-gray-400 flex-shrink-0" size={20} />
                <input autoFocus type="text" placeholder="Navegue pelo portfólio..." className="w-full min-w-0 bg-transparent outline-none text-base md:text-lg text-gray-900 dark:text-gray-100 placeholder-gray-400" />
                <button onClick={() => setCmdOpen(false)} aria-label="Fechar" className="md:hidden p-1 text-gray-400"><X size={20} /></button>
                <kbd className="hidden md:block font-mono text-xs px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded">ESC</kbd>
              </div>
              <div className="p-2 max-h-[55vh] overflow-y-auto">
                <div className="text-xs font-semibold text-gray-400 p-2 uppercase tracking-wider">Atalhos</div>
                {['Início', 'Skills', 'Projetos', 'Sobre'].map((item) => (
                  <button 
                    key={item}
                    onClick={() => {
                      document.getElementById(item.toLowerCase())?.scrollIntoView({ behavior: 'smooth' });
                      setCmdOpen(false);
                    }}
                    className="w-full text-left p-3 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg flex items-center justify-between group transition-colors"
                  >
                    <span>{item}</span>
                    <ArrowRight size={16} className="opacity-40 md:opacity-0 md:group-hover:opacity-100 text-blue-500 transition-opacity" />
                  </button>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 pt-24 md:pt-32 pb-20 md:pb-24">
        
        <section id="início" className="min-h-[70vh] flex flex-col justify-center relative overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] h-[320px] sm:w-[600px] sm:h-[600px] bg-blue-600/10 dark:bg-blue-500/10 rounded-full blur-[80px] sm:blur-[120px] pointer-events-none" />
          
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-600 dark:text-blue-400 font-medium text-xs sm:text-sm mb-6 w-fit max-w-full">
            <span className="relative flex h-2 w-2 flex-shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            <span className="min-w-0">Estudante de Análise e Desenvolvimento de Sistemas (PUCPR)</span>
          </motion.div>

          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.3 }} className="text-4xl sm:text-5xl md:text-7xl font-extrabold tracking-tight leading-[1.1] mb-6">
            Do Hardware ao Software: <br className="hidden md:block"/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-emerald-400">
              Arquitetando Soluções Reais.
            </span>
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.4 }} className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mb-8 md:mb-10 leading-relaxed">
            Olá, sou <strong>Rodrigo</strong>. Minha jornada começou com ferramentas físicas (instalações elétricas, serralheria e uma curiosidade em desmontar coisas desde à infância) e evoluiu para o código. Hoje, crio sistemas web robustos, SaaS, e íntegro inteligência ao mundo físico através de IoT.
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.5 }} className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 w-full sm:w-auto">
            <button onClick={() => document.getElementById('projetos')?.scrollIntoView({ behavior: 'smooth' })} className="px-6 sm:px-8 py-4 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-xl font-semibold hover:scale-105 transition-transform flex items-center justify-center gap-2 shadow-xl shadow-gray-900/20 dark:shadow-white/10">
              Explorar Portfólio <ChevronRight size={18} />
            </button>
            <a href={GITHUB} target="_blank" rel="noopener noreferrer" className="px-6 sm:px-8 py-4 bg-white dark:bg-gray-900 text-gray-900 dark:text-white rounded-xl font-semibold border border-gray-200 dark:border-gray-800 hover:border-blue-500 transition-all flex items-center justify-center gap-2">
              <IconeGithub size={18} /> Ver no GitHub
            </a>
          </motion.div>
        </section>

        <section id="skills" className="py-16 md:py-24">
          <div className="flex items-center gap-4 mb-10 md:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold">Stack de Habilidades</h2>
            <div className="h-[1px] flex-grow bg-gradient-to-r from-gray-200 dark:from-gray-800 to-transparent"></div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
            {skills.map((skill, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }}
                className="p-5 sm:p-6 bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 hover:border-blue-500/50 transition-colors group relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 dark:bg-blue-500/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-700" />
                <div className="w-12 h-12 bg-blue-50 dark:bg-blue-900/30 text-blue-500 rounded-xl flex items-center justify-center mb-5 md:mb-6">
                  {skill.icon}
                </div>
                <h3 className="text-lg sm:text-xl font-bold mb-4">{skill.category}</h3>
                <ul className="space-y-3">
                  {skill.items.map((item, i) => (
                    <li key={i} className="flex items-center gap-2 text-gray-600 dark:text-gray-400 text-sm">
                      <CheckCircle2 size={14} className="text-blue-500 flex-shrink-0" /> {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </section>

        <section id="projetos" className="py-16 md:py-24 relative">
          <div className="flex items-center gap-4 mb-10 md:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold">Projetos em Destaque</h2>
            <div className="h-[1px] flex-grow bg-gradient-to-r from-gray-200 dark:from-gray-800 to-transparent"></div>
          </div>

          <div className="space-y-16 md:space-y-24">
            {projects.map((project, index) => (
              <motion.div 
                key={project.id}
                initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.6 }}
                className={`flex flex-col ${index % 2 !== 0 ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-8 lg:gap-12 items-center`}
              >
                {project.link ? (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Abrir o site do projeto ${project.title}`}
                    className="w-full lg:w-3/5 group block"
                  >
                    <div className="relative rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-800 shadow-2xl bg-gray-800 aspect-video">
                      <div className="absolute inset-0 bg-gray-900/40 md:group-hover:bg-transparent transition-colors z-10" />
                      <img src={project.image} alt={project.title} loading="lazy" decoding="async" onError={aoFalharImagem} className="w-full h-full object-cover transform md:group-hover:scale-105 transition-transform duration-700" />
                      {/* desktop: aparece no hover */}
                      <div className="hidden md:flex absolute inset-0 z-20 items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <span className="px-4 py-2 bg-black/70 backdrop-blur-md text-white rounded-lg flex items-center gap-2 font-medium">
                          <ExternalLink size={16} /> Visitar o Site
                        </span>
                      </div>
                      {/* celular: sempre visível, já que não existe hover */}
                      <span className="md:hidden absolute bottom-3 left-3 z-20 px-3 py-1.5 bg-black/70 backdrop-blur-md text-white text-xs rounded-lg flex items-center gap-1.5 font-medium">
                        <ExternalLink size={13} /> Visitar o site
                      </span>
                    </div>
                  </a>
                ) : (
                  <div className="w-full lg:w-3/5 group cursor-pointer" onClick={() => setActiveProjectInfo(project)}>
                    <div className="relative rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-800 shadow-2xl bg-gray-800 aspect-video">
                      <div className="absolute inset-0 bg-gray-900/40 md:group-hover:bg-transparent transition-colors z-10" />
                      <img src={project.image} alt={project.title} loading="lazy" decoding="async" onError={aoFalharImagem} className="w-full h-full object-cover transform md:group-hover:scale-105 transition-transform duration-700" />
                      <div className="hidden md:flex absolute inset-0 z-20 items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <span className="px-4 py-2 bg-black/70 backdrop-blur-md text-white rounded-lg flex items-center gap-2 font-medium">
                          <Info size={16} /> Ver Detalhes Técnicos
                        </span>
                      </div>
                      <span className="md:hidden absolute bottom-3 left-3 z-20 px-3 py-1.5 bg-black/70 backdrop-blur-md text-white text-xs rounded-lg flex items-center gap-1.5 font-medium">
                        <Info size={13} /> Ver detalhes
                      </span>
                    </div>
                  </div>
                )}

                <div className="w-full lg:w-2/5 space-y-5 md:space-y-6">
                  <div className="flex gap-2 flex-wrap">
                    {project.techs.map(tech => (
                      <span key={tech} className="px-3 py-1 bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-full text-xs font-semibold text-gray-600 dark:text-gray-300">
                        {tech}
                      </span>
                    ))}
                  </div>

                  {project.link ? (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-flex items-start gap-2 hover:text-blue-500 transition-colors"
                    >
                      <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold">{project.title}</h3>
                      <ExternalLink size={18} className="mt-1.5 sm:mt-2 flex-shrink-0 opacity-40 group-hover:opacity-100 transition-opacity" />
                    </a>
                  ) : (
                    <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold">{project.title}</h3>
                  )}

                  <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
                    {project.shortDesc}
                  </p>
                  
                  <div className="pt-2 md:pt-4 flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4">
                    <button onClick={() => setActiveProjectInfo(project)} className="px-6 py-3 bg-blue-500 text-white rounded-xl font-medium hover:bg-blue-600 transition-colors flex items-center justify-center gap-2">
                      <Layers size={18} /> Deep Dive Técnico
                    </button>
                    {project.link && (
                      <a href={project.link} target="_blank" rel="noopener noreferrer" className="px-6 py-3 bg-white dark:bg-gray-900 text-gray-900 dark:text-white rounded-xl font-medium border border-gray-200 dark:border-gray-800 hover:border-blue-500 transition-colors flex items-center justify-center gap-2">
                        <ExternalLink size={18} /> Acessar Projeto
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        <AnimatePresence>
          {activeProjectInfo && (
            <>
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setActiveProjectInfo(null)} className="fixed inset-0 bg-black/80 backdrop-blur-md z-[200]" />
              <motion.div initial={{ opacity: 0, y: 50, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 50, scale: 0.95 }} className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[calc(100%-2rem)] max-w-2xl max-h-[85vh] overflow-y-auto bg-white dark:bg-[#0b0f19] rounded-2xl border border-gray-200 dark:border-gray-800 shadow-2xl z-[201]">
                <div className="sticky top-0 z-10 p-4 sm:p-6 border-b border-gray-200 dark:border-gray-800 flex justify-between items-center gap-3 bg-gray-50 dark:bg-[#111827]">
                  <h3 className="text-base sm:text-xl font-bold flex items-center gap-2 min-w-0">
                    <Terminal size={20} className="text-blue-500 flex-shrink-0" />
                    <span className="truncate">Console.log( {activeProjectInfo.title} )</span>
                  </h3>
                  <button onClick={() => setActiveProjectInfo(null)} aria-label="Fechar" className="p-2 flex-shrink-0 hover:bg-gray-200 dark:hover:bg-gray-800 rounded-lg transition-colors"><X size={20} /></button>
                </div>
                
                <div className="p-5 sm:p-8 space-y-6">
                  <div>
                    <h4 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-2 flex items-center gap-2"><Info size={16} /> O Desafio</h4>
                    <p className="text-gray-700 dark:text-gray-300">{activeProjectInfo.infoTab.challenge}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-2 flex items-center gap-2"><Code2 size={16} /> Solução Técnica</h4>
                    <div className="p-4 bg-blue-50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-900/30 rounded-xl text-blue-800 dark:text-blue-300">
                      {activeProjectInfo.infoTab.solution}
                    </div>
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-2 flex items-center gap-2"><Zap size={16} /> Impacto / Métricas</h4>
                    <p className="text-green-600 dark:text-green-400 font-medium text-base sm:text-lg">{activeProjectInfo.infoTab.metrics}</p>
                  </div>

                  {activeProjectInfo.link && (
                    <a href={activeProjectInfo.link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center w-full sm:w-auto gap-2 px-6 py-3 bg-blue-500 text-white rounded-xl font-medium hover:bg-blue-600 transition-colors">
                      <ExternalLink size={18} /> Acessar {activeProjectInfo.title}
                    </a>
                  )}
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        <section id="sobre" className="py-16 md:py-24">
          <div className="bg-gray-900 dark:bg-[#0b0f19] rounded-3xl p-6 sm:p-8 md:p-16 border border-gray-800 dark:border-[#1e293b] relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 w-48 sm:w-64 h-48 sm:h-64 bg-blue-500/20 rounded-full blur-[100px]" />
            <div className="absolute bottom-0 left-0 w-48 sm:w-64 h-48 sm:h-64 bg-emerald-500/20 rounded-full blur-[100px]" />

            <div className="relative z-10 flex flex-col md:flex-row gap-10 md:gap-12 items-center">
              <div className="w-full md:w-1/2">
                <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold text-white mb-5 md:mb-6">Criando a ponte entre software e realidade.</h2>
                <p className="text-gray-400 text-base sm:text-lg mb-6 md:mb-8">
                  Minha vivência como instalador elétrico e serralheiro me ensinou que o mundo físico exige precisão e resiliência. Hoje, aplico essa mesma engenharia de base para construir softwares, SaaS escaláveis e integrações avançadas de IoT.
                </p>
                <div className="space-y-4 text-gray-300 text-sm sm:text-base">
                  <div className="flex items-start gap-3"><CheckCircle2 className="text-blue-500 flex-shrink-0 mt-0.5" size={20} /> Desenvolvimento Full-Stack & UI/UX</div>
                  <div className="flex items-start gap-3"><CheckCircle2 className="text-blue-500 flex-shrink-0 mt-0.5" size={20} /> Experiência em Hardware & IoT (ESP32/RFID)</div>
                  <div className="flex items-start gap-3"><CheckCircle2 className="text-blue-500 flex-shrink-0 mt-0.5" size={20} /> Foco em Solução de Problemas Reais</div>
                </div>
              </div>

              <div className="w-full md:w-1/2 flex flex-col gap-4">
                <div className="p-5 sm:p-6 bg-black/40 backdrop-blur-md rounded-2xl border border-white/10 flex flex-col gap-4">
                  <h3 className="text-white font-semibold text-center text-base sm:text-lg mb-2">Vamos iniciar um projeto?</h3>
                  <a href={`mailto:${EMAIL}`} className="w-full py-4 bg-white text-black font-bold rounded-xl flex justify-center items-center gap-2 hover:scale-[1.02] transition-transform">
                    <Mail size={18} /> Entrar em Contato
                  </a>
                  <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                    <a href={GITHUB} target="_blank" rel="noopener noreferrer" className="flex-1 py-3 bg-transparent border border-white/20 text-white rounded-xl flex justify-center items-center hover:bg-white/5 transition-colors gap-2">
                      <IconeGithub size={20} /> GitHub
                    </a>
                    <a href={LINKEDIN} target="_blank" rel="noopener noreferrer" className="flex-1 py-3 bg-transparent border border-white/20 text-white rounded-xl flex justify-center items-center hover:bg-white/5 transition-colors gap-2">
                      <IconeLinkedin size={20} /> LinkedIn
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

      </main>

      <footer className="border-t border-gray-200 dark:border-gray-900 bg-white dark:bg-[#030712] py-8 px-4 text-center">
        <p className="text-gray-500 dark:text-gray-500 text-xs sm:text-sm">
          © {new Date().getFullYear()} Rodrigo - Desenvolvido com React, Framer Motion e foco em performance. <br/>
          <span className="hidden md:inline">
            Pressione <kbd className="font-mono text-[10px] px-1 py-0.5 bg-gray-200 dark:bg-gray-800 rounded">⌘K</kbd> para explorar o portfólio.
          </span>
          <span className="md:hidden">Toque na lupa para navegar pelo portfólio.</span>
        </p>
      </footer>
    </div>
  );
}