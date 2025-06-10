"use client"

import { motion, useScroll } from "framer-motion"
import { useState, useRef, useEffect } from "react"
import { Mail, Github, Linkedin, Heart, Code, Camera, Moon, Sun, ExternalLink, Folder } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Typewriter } from "react-simple-typewriter"
import { Icon } from '@iconify/react'


type Skill = {
  name: string
  icon: React.ReactNode
}

type SkillsData = {
  [key: string]: Skill[]
}

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState("home")
  const [isDarkMode, setIsDarkMode] = useState(true)
  const [showNavigation, setShowNavigation] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll()
  const heroRef = useRef<HTMLElement>(null)
  const [aboutInView, setAboutInView] = useState(false)
  type SkillsCategory = keyof typeof skillsData
  const [activeCategory, setActiveCategory] = useState<SkillsCategory>("Programming Languages")
  //const [activeCategory, setActiveCategory] = useState<SkillsCategory | null>(null)

  // Track scroll position to show/hide navigation
  useEffect(() => {
    const handleScroll = () => {
      if (heroRef.current) {
        const heroBottom = heroRef.current.getBoundingClientRect().bottom
        setShowNavigation(heroBottom < 100)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Track active section based on scroll position
  useEffect(() => {
    const handleScrollForActiveSection = () => {
      const sections = ["home", "about", "skills", "projects", "gallery", "contact"]

      for (const section of sections.reverse()) {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          if (rect.top <= 150) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleScrollForActiveSection)
    return () => window.removeEventListener("scroll", handleScrollForActiveSection)
  }, [])

  // Dark mode effect
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }, [isDarkMode])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      const headerOffset = 100 // Account for fixed header
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      })
      setActiveSection(sectionId)
    }
  }

  const stickyNotes = [
    {
      id: "about",
      label: "About Me",
      color: "#fef08a",
      rotation: "-rotate-1",
      left: "15%",
      type: "tape",
    },
    {
      id: "skills",
      label: "Skills",
      color: "#fde047",
      rotation: "rotate-2",
      left: "28%",
      type: "pin",
    },
    {
      id: "projects",
      label: "Projects",
      color: "#facc15",
      rotation: "-rotate-1",
      left: "41%",
      type: "paperclip",
    },
    {
      id: "gallery",
      label: "Gallery",
      color: "#f59e0b",
      rotation: "rotate-1",
      left: "54%",
      type: "curled",
    },
    {
      id: "contact",
      label: "Contact",
      color: "#eab308",
      rotation: "-rotate-2",
      left: "67%",
      type: "tape",
    },
  ]

  const actionNotes = [
    {
      id: "resume",
      label: "Resume",
      //color: "#fbbf24",
      color: isDarkMode ? "#C8956D" : "#F5B041",
      rotation: "rotate-3",
      left: "35%",
      action: () => window.open("/resume.pdf", "_blank"),
    },
    {
      id: "hireme",
      label: "Hire Me",
      color: isDarkMode ? "#D4A574" : "#E9C39B",
      rotation: "-rotate-3",
      left: "50%",
      action: () => scrollToSection("contact"),
    },
  ]

  const skillsData = {
    "Programming Languages": [
      { name: "VB.NET", icon: <Icon icon="vscode-icons:file-type-vb" /> },
      { name: "C#", icon: <Icon icon="devicon:csharp" /> },
      { name: "C", icon: <Icon icon="streamline-logos:c-language-logo-block" /> },
      { name: "C++", icon: <Icon icon="logos:c-plusplus" /> },
      { name: "Java", icon: <Icon icon="mdi:language-java" /> },
      { name: "Python", icon: <Icon icon="mdi:language-python" /> },
      { name: "PL/SQL", icon: <Icon icon="vscode-icons:file-type-plsql" /> },
    ],
    "Frameworks & Libraries": [
      { name: ".NET Core", icon: <Icon icon="devicon:dotnetcore" /> },
      { name: "ASP.NET MVC", icon: <Icon icon="file-icons:asp" /> },
      { name: "AngularJS", icon: <Icon icon="logos:angular-icon" /> },
      { name: "React", icon: <Icon icon="logos:react" /> },
      { name: "Next.js", icon: <Icon icon="devicon:nextjs" /> },
    ],
    "Web Development": [
      { name: "HTML", icon: <Icon icon="vscode-icons:file-type-html" /> },
      { name: "CSS", icon: <Icon icon="vscode-icons:file-type-css" /> },
      { name: "Web APIs", icon: "🔗" },
      { name: "Web Services", icon: "🌐" },
      { name: "Tailwind CSS", icon: <Icon icon="devicon:tailwindcss" /> },
    ],
    "Databases & Query Languages": [
      { name: "SQL Server", icon: <Icon icon="devicon:microsoftsqlserver" /> },
      { name: "Oracle", icon: <Icon icon="devicon:oracle" /> },
      { name: "PL/SQL", icon: "💾" },
      { name: "Supabase", icon: <Icon icon="logos:supabase-icon" /> },
    ],
    "Tools & Platforms": [
      { name: "Visual Studio", icon: <Icon icon="devicon:visualstudio" /> },
      { name: "Git", icon: <Icon icon="mdi:git" /> },
      { name: "Jira", icon: <Icon icon="logos:jira" /> },
      { name: "Postman", icon: <Icon icon="logos:postman-icon" /> },
      { name: "Jenkins", icon: <Icon icon="logos:jenkins" /> },
      { name: "Eclipse", icon: <Icon icon="devicon:eclipse" /> },
      { name: "NetBeans", icon: <Icon icon="devicon:netbeans" /> },
    ]
  }

  const experiences = [
    {
      title: "Systems Engineer",
      company: "Tata Consultancy Services",
      period: "2020 - Present",
      description:
        "Developed and maintained enterprise applications using .NET Core and SQL Server. Built RESTful APIs and web services for mission-critical systems.",
      technologies: ["C#", ".NET Core", "SQL Server", "Web APIs"],
    },
    {
      title: "Backend Developer",
      company: "Digital Systems Ltd.",
      period: "2018 - 2020",
      description:
        "Specialized in database design and PL/SQL development. Created robust data processing solutions and optimized database performance.",
      technologies: ["PL/SQL", "Oracle", "VB.NET", "ASP.NET"],
    },
    {
      title: "Junior Developer",
      company: "StartUp Innovations",
      period: "2017 - 2018",
      description:
        "Contributed to full-stack development projects using various technologies. Gained experience in agile development and version control.",
      technologies: ["Java", "HTML", "CSS", "Git"],
    },
  ]

  const projects = [
    {
      title: "AI Fashion",
      description: "A full-stack e-commerce solution built with Next.js, Stripe, and Supabase",
      image: "/placeholder.svg?height=200&width=300",
      tech: ["Next.js", "TypeScript", "Supabase", "Stripe"],
      github: "https://github.com/roshanichede/slpp-dashboard",
      live: "https://style-it.vercel.app/",
    },
    {
      title: "Task Management App",
      description: "A collaborative task management tool with real-time updates and team features",
      image: "/placeholder.svg?height=200&width=300",
      tech: ["React", "Node.js", "Socket.io", "MongoDB"],
      github: "https://github.com/roshanichede/taskmanager",
      live: "https://taskmanager-demo.vercel.app",
    },
    {
      title: "Weather Dashboard",
      description: "A beautiful weather dashboard with location-based forecasts and interactive maps",
      image: "/placeholder.svg?height=200&width=300",
      tech: ["Vue.js", "OpenWeather API", "Chart.js"],
      github: "https://github.com/roshanichede/weather-dashboard",
      live: "https://weather-dashboard-demo.vercel.app",
    },
    {
      title: "Portfolio Website",
      description: "A responsive portfolio website with dark mode and smooth animations",
      image: "/placeholder.svg?height=200&width=300",
      tech: ["Next.js", "Framer Motion", "Tailwind CSS"],
      github: "https://github.com/roshanichede/portfolio",
      live: "https://roshanichede.vercel.app",
    },
    {
      title: "Blog Platform",
      description: "A modern blog platform with markdown support and comment system",
      image: "/placeholder.svg?height=200&width=300",
      tech: ["Next.js", "MDX", "Prisma", "PostgreSQL"],
      github: "https://github.com/roshanichede/blog",
      live: "https://blog-demo.vercel.app",
    },
    {
      title: "Chat Application",
      description: "Real-time chat application with rooms, file sharing, and emoji reactions",
      image: "/placeholder.svg?height=200&width=300",
      tech: ["React", "Socket.io", "Express", "Redis"],
      github: "https://github.com/roshanichede/chat-app",
      live: "https://chat-demo.vercel.app",
    },
  ]

  const galleryItems = [
    { title: "Coffee Shop App", image: "/placeholder.svg?height=200&width=300", category: "Project" },
    { title: "Tokyo Adventure", image: "/placeholder.svg?height=200&width=300", category: "Travel" },
    { title: "UI Design System", image: "/placeholder.svg?height=200&width=300", category: "Design" },
    { title: "Mountain Hiking", image: "/placeholder.svg?height=200&width=300", category: "Adventure" },
    { title: "E-commerce Platform", image: "/placeholder.svg?height=200&width=300", category: "Project" },
    { title: "Art Exhibition", image: "/placeholder.svg?height=200&width=300", category: "Creative" },
  ]

  const renderStickyNote = (note: any, index: number) => {
    const baseClasses = `absolute cursor-pointer transform transition-all duration-300 z-10 ${note.rotation}`

    return (
      <motion.div
        key={note.id}
        initial={{ opacity: 0, scale: 0.8, rotate: 0, y: -20 }}
        animate={{
          opacity: 1,
          scale: 1,
          rotate: Number.parseInt(note.rotation.match(/-?\d+/)?.[0] || "0"),
          y: 0,
        }}
        transition={{
          delay: 1.2 + index * 0.2,
          duration: 0.6,
          type: "spring",
          bounce: 0.3,
        }}
        whileHover={{
          scale: 1.1,
          rotate: 0,
          y: -8,
          transition: { duration: 0.2 },
        }}
        whileTap={{ scale: 0.95 }}
        className={baseClasses}
        style={{
          top: "8%",
          left: note.left,
          width: "90px",
          height: "90px",
        }}
        onClick={() => scrollToSection(note.id)}
      >
        {/* Different note styles based on type */}
        {note.type === "tape" && (
          <div className="relative w-full h-full">
            {/* Tape at top */}
            <div
              className="absolute -top-2 left-1/2 transform -translate-x-1/2 z-10"
              style={{
                width: "25px",
                height: "12px",
                background: "linear-gradient(45deg, #f3f4f6, #e5e7eb)",
                borderRadius: "2px",
                boxShadow: "0 1px 3px rgba(0, 0, 0, 0.2)",
                border: "1px solid rgba(0, 0, 0, 0.1)",
              }}
            />
            {/* Note body */}
            <div
              className="w-full h-full flex items-center justify-center"
              style={{
                backgroundColor: note.color,
                borderRadius: "2px",
                boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15), 0 1px 3px rgba(0, 0, 0, 0.2)",
                border: "1px solid rgba(0, 0, 0, 0.05)",
              }}
            >
              <p className="text-xs font-medium text-gray-700 text-center font-quicksand px-2">{note.label}</p>
            </div>
          </div>
        )}

        {note.type === "pin" && (
          <div className="relative w-full h-full">
            {/* Pin at top */}
            <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 z-10">
              <div
                className="w-3 h-3 rounded-full"
                style={{
                  background: "radial-gradient(circle, #dc2626, #b91c1c)",
                  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.3)",
                  border: "1px solid #991b1b",
                }}
              />
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1 h-1 rounded-full bg-white opacity-60" />
            </div>
            {/* Note body */}
            <div
              className="w-full h-full flex items-center justify-center"
              style={{
                backgroundColor: note.color,
                borderRadius: "2px",
                boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15), 0 1px 3px rgba(0, 0, 0, 0.2)",
                border: "1px solid rgba(0, 0, 0, 0.05)",
              }}
            >
              <p className="text-xs font-medium text-gray-700 text-center font-quicksand px-2">{note.label}</p>
            </div>
          </div>
        )}

        {note.type === "paperclip" && (
          <div className="relative w-full h-full">
            {/* Paperclip at top-left */}
            <div className="absolute -top-2 -left-1 z-10">
              <svg width="16" height="20" viewBox="0 0 16 20" fill="none">
                <path
                  d="M4 6V14C4 16.2091 5.79086 18 8 18C10.2091 18 12 16.2091 12 14V4C12 2.89543 11.1046 2 10 2C8.89543 2 8 2.89543 8 4V12C8 12.5523 8.44772 13 9 13C9.55228 13 10 12.5523 10 12V6"
                  stroke="#dc2626"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  fill="none"
                />
              </svg>
            </div>
            {/* Note body with slight fold */}
            <div
              className="w-full h-full flex items-center justify-center relative"
              style={{
                backgroundColor: note.color,
                borderRadius: "2px",
                boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15), 0 1px 3px rgba(0, 0, 0, 0.2)",
                border: "1px solid rgba(0, 0, 0, 0.05)",
              }}
            >
              {/* Small fold at top-left */}
              <div
                className="absolute top-0 left-0 w-4 h-4"
                style={{
                  background: `linear-gradient(135deg, ${note.color}, #f59e0b)`,
                  clipPath: "polygon(0 0, 100% 0, 0 100%)",
                  opacity: 0.7,
                }}
              />
              <p className="text-xs font-medium text-gray-700 text-center font-quicksand px-2">{note.label}</p>
            </div>
          </div>
        )}

        {note.type === "curled" && (
          <div className="relative w-full h-full">
            {/* Note body with curled corner */}
            <div
              className="w-full h-full flex items-center justify-center relative overflow-hidden"
              style={{
                backgroundColor: note.color,
                borderRadius: "2px",
                boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15), 0 1px 3px rgba(0, 0, 0, 0.2)",
                border: "1px solid rgba(0, 0, 0, 0.05)",
              }}
            >
              {/* Curled corner */}
              <div
                className="absolute bottom-0 right-0 w-6 h-6"
                style={{
                  background: `linear-gradient(225deg, #f59e0b, ${note.color})`,
                  clipPath: "polygon(100% 0, 0 100%, 100% 100%)",
                  transform: "rotate(0deg)",
                  boxShadow: "inset -1px -1px 2px rgba(0, 0, 0, 0.1)",
                }}
              />
              {/* Curl shadow */}
              <div
                className="absolute bottom-0 right-0 w-6 h-6"
                style={{
                  background: "linear-gradient(225deg, rgba(0,0,0,0.1), transparent)",
                  clipPath: "polygon(100% 0, 0 100%, 100% 100%)",
                }}
              />
              <p className="text-xs font-medium text-gray-700 text-center font-quicksand px-2">{note.label}</p>
            </div>
          </div>
        )}
      </motion.div>
    )
  }

  const renderActionNote = (note: any, index: number) => {
    const baseClasses = `absolute cursor-pointer transform transition-all duration-300 z-10 ${note.rotation}`

    return (
      <motion.div
        key={note.id}
        initial={{ opacity: 0, scale: 0.8, rotate: 0, y: -20 }}
        animate={{
          opacity: 1,
          scale: 1,
          rotate: Number.parseInt(note.rotation.match(/-?\d+/)?.[0] || "0"),
          y: 0,
        }}
        transition={{
          delay: 2.0 + index * 0.3,
          duration: 0.6,
          type: "spring",
          bounce: 0.4,
        }}
        whileHover={{
          scale: 1.15,
          rotate: 0,
          y: -10,
          transition: { duration: 0.2 },
        }}
        whileTap={{ scale: 0.9 }}
        className={baseClasses}
        style={{
          top: "1%", // Moved up since intro text is now above
          left: note.left,
          width: "60px",
          height: "60px",
        }}
        onClick={note.action}
      >
        {/* Small sticky note with simple design */}
        <div className="relative w-full h-full">
          {/* Small pin at top */}
          <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 z-10">
            <div
              className="w-2 h-2 rounded-full"
              style={{
                background: "radial-gradient(circle, #dc2626, #b91c1c)",
                boxShadow: "0 1px 2px rgba(0, 0, 0, 0.3)",
                border: "1px solid #991b1b",
              }}
            />
          </div>
          {/* Note body */}
          <div
            className="w-full h-full flex items-center justify-center"
            style={{
              backgroundColor: note.color,
              borderRadius: "2px",
              boxShadow: "0 2px 6px rgba(0, 0, 0, 0.15), 0 1px 2px rgba(0, 0, 0, 0.2)",
              border: "1px solid rgba(0, 0, 0, 0.05)",
            }}
          >
            <p className="text-xs font-medium text-gray-700 text-center font-quicksand px-1">{note.label}</p>
          </div>
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div
      key={isDarkMode ? "dark" : "light"} // triggers animation on mode switch
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
    >
      <div
        ref={containerRef}
        className={`min-h-screen transition-colors duration-500 }`}
        style={{
          background: isDarkMode ? "radial-gradient(circle at center, #173448 0%, #0E1C2F 80%)" : "#F4E1C5",
          //: "#FFFBEF"
        }}
      >
        {/* Header with Social Links and Dark Mode Toggle */}
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className={`fixed top-0 left-0 right-0 z-50 ${isDarkMode ? "bg-gray-800/90 border-gray-700" : "bg-white/90 border-gray-200"
            } backdrop-blur-md border-b transition-colors duration-500`}
        >
          <div className="container mx-auto px-6 py-4">
            <div className="flex justify-between items-center">
              {/* Logo/Name */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 1 }}
                className="text-sm sm:text-base md:text-lg lg:text-xl font-mono text-purple-600 whitespace-pre"
              >
                <motion.span
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{
                    duration: 2.5,
                    ease: "linear",
                  }}
                  className="overflow-hidden inline-block border-r-2 border-purple-600 animate-pulse"
                  style={{
                    whiteSpace: "nowrap",
                  }}
                >
                  console.log("Hi, Folks!");
                </motion.span>
              </motion.div>

              {/* Navigation Menu - Always visible */}
              <nav className="hidden md:flex items-center space-x-1">
                {stickyNotes.map((note) => (
                  <motion.button
                    key={note.id}
                    onClick={() => scrollToSection(note.id)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`px-3 py-2 text-sm rounded-md transition-all duration-300 ${activeSection === note.id
                      ? isDarkMode
                        ? "bg-purple-600 text-white"
                        : "bg-purple-100 text-purple-700"
                      : isDarkMode
                        ? "text-gray-300 hover:bg-gray-700"
                        : "text-gray-700 hover:bg-gray-100"
                      }`}
                    style={{
                      fontSize: "14px",
                      padding: "8px 12px",
                    }}
                  >
                    {note.label}
                  </motion.button>
                ))}
              </nav>

              {/* Social Links and Dark Mode Toggle */}
              <div className="flex items-center gap-4">
                {/* Social Media Buttons */}
                <motion.a
                  href="mailto:roshanichede@gmail.com"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className={`p-3 rounded-full transition-all duration-300 ${isDarkMode
                    ? "bg-gray-700 hover:bg-pink-600 text-gray-300 hover:text-white"
                    : "bg-pink-100 hover:bg-pink-500 text-pink-600 hover:text-white"
                    } shadow-lg hover:shadow-xl`}
                >
                  <Mail className="w-5 h-5" />
                </motion.a>

                <motion.a
                  href="https://github.com/roshanichede"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className={`p-3 rounded-full transition-all duration-300 ${isDarkMode
                    ? "bg-gray-700 hover:bg-gray-600 text-gray-300 hover:text-white"
                    : "bg-gray-100 hover:bg-gray-800 text-gray-600 hover:text-white"
                    } shadow-lg hover:shadow-xl`}
                >
                  <Github className="w-5 h-5" />
                </motion.a>

                <motion.a
                  href="https://linkedin.com/in/roshanichede"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className={`p-3 rounded-full transition-all duration-300 ${isDarkMode
                    ? "bg-gray-700 hover:bg-blue-600 text-gray-300 hover:text-white"
                    : "bg-blue-100 hover:bg-blue-600 text-blue-600 hover:text-white"
                    } shadow-lg hover:shadow-xl`}
                >
                  <Linkedin className="w-5 h-5" />
                </motion.a>

                {/* Dark Mode Toggle */}
                <motion.button
                  onClick={() => setIsDarkMode(!isDarkMode)}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className={`p-3 rounded-full transition-all duration-300 ease-in-out ${isDarkMode
                    ? "bg-yellow-500 hover:bg-yellow-400 text-yellow-900"
                    : "bg-purple-100 hover:bg-purple-500 text-purple-600 hover:text-white"
                    } shadow-lg hover:shadow-xl`}
                >
                  {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                </motion.button>
              </div>
            </div>

            {/* Mobile Navigation Menu - Always visible */}
            <nav className="md:hidden flex flex-wrap justify-center gap-2 mt-3">
              {stickyNotes.map((note) => (
                <motion.button
                  key={note.id}
                  onClick={() => scrollToSection(note.id)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`px-3 py-1 text-sm rounded-md transition-all duration-300 ${activeSection === note.id
                    ? isDarkMode
                      ? "bg-purple-600 text-white"
                      : "bg-purple-100 text-purple-700"
                    : isDarkMode
                      ? "text-gray-300 hover:bg-gray-700"
                      : "text-gray-700 hover:bg-gray-100"
                    }`}
                >
                  {note.label}
                </motion.button>
              ))}
            </nav>
          </div>
        </motion.header>

        {/* Hero Section with Large Illustration */}
        <section id="home" ref={heroRef} className="min-h-screen flex items-center justify-center relative pt-20">
          {/* Hanging string lights - same as before */}
          <div className="absolute top-10 left-10 z-10 hidden dark:flex flex-row gap-10">
            {[...Array(2)].map((_, colIndex) => (
              <div key={`left-string-${colIndex}`} className="flex flex-col items-center gap-4">
                {[...Array(6)].map((_, bulbIndex) => (
                  <div key={`left-${colIndex}-${bulbIndex}`} className="flex flex-col items-center space-y-1">
                    <div className="w-px h-2 bg-gray-400 dark:bg-gray-600" />
                    <div
                      className="w-3 h-3 rounded-full bg-yellow-400 animate-pulse"
                      style={{
                        animationDelay: `${bulbIndex * 0.3}s`,
                        boxShadow: "0 0 8px 2px #facc15",
                      }}
                    />
                  </div>
                ))}
              </div>
            ))}
          </div>

          <div className="absolute top-10 right-10 z-10 hidden dark:flex flex-row gap-10">
            {[...Array(2)].map((_, colIndex) => (
              <div key={`right-string-${colIndex}`} className="flex flex-col items-center gap-4">
                {[...Array(6)].map((_, bulbIndex) => (
                  <div key={`right-${colIndex}-${bulbIndex}`} className="flex flex-col items-center space-y-1">
                    <div className="w-px h-2 bg-gray-400 dark:bg-gray-600" />
                    <div
                      className="w-3 h-3 rounded-full bg-yellow-400 animate-pulse"
                      style={{
                        animationDelay: `${bulbIndex * 0.3}s`,
                        boxShadow: "0 0 8px 2px #facc15",
                      }}
                    />
                  </div>
                ))}
              </div>
            ))}
          </div>

          {/* Light string decor for light mode */}
          <div className="absolute top-10 left-10 z-10 dark:hidden flex flex-row gap-10">
            <motion.img
              src="/tree.png"
              className="w-72 h-72"
              // animate={{
              //   rotate: [0, 3, -3, 0],
              //   y: [0, 4, -4, 0],
              // }}
              // transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
              alt="Dreamcatcher"
            />
          </div>

          <div className="absolute top-10 right-10 z-10 dark:hidden flex flex-row gap-10">
            <motion.img
              src="/tree.png"
              className="w-72 h-72"
              // animate={{
              //   rotate: [0, 3, -3, 0],
              //   y: [0, 4, -4, 0],
              // }}
              // transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
              alt="Dreamcatcher"
            />
          </div>
          {/* <div className="absolute top-10 right-10 z-10 dark:hidden flex flex-row gap-10">
            {[...Array(2)].map((_, colIndex) => (
              <div key={`right-string-light-${colIndex}`} className="flex flex-col items-center gap-4">
                {[...Array(6)].map((_, bulbIndex) => (
                  <div key={`right-${colIndex}-${bulbIndex}`} className="flex flex-col items-center space-y-1">
                    <div className="w-2 h-2 bg-emerald-500" />
                    <div
                      className="flex flex-col items-center space-y-2"
                      style={{
                        color: "rgb(178, 126, 63)",
                      }}
                    >
                      <Code className="h-5 w-5" fill="currentColor" stroke="currentColor" />
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div> */}

          <div className="w-full max-w-4xl mx-auto px-4">
            {/* Main Illustration Container */}
            <div className="relative w-full">
              {/* Desk Illustration - Takes up 70% of screen width */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="relative mx-auto"
                style={{ width: "70vw", maxWidth: "1000px" }}
              >
                <motion.img
                  key={isDarkMode ? "hero2" : "hero1"}
                  src={isDarkMode ? "/hero2.PNG" : "/hero1.PNG"}
                  alt="Cheerful girl working at cozy desk"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6, ease: "easeInOut" }}
                  className={`w-full h-auto rounded-2xl max-w-[90%] md:max-w-[80%] ${isDarkMode ? "brightness-150 contrast-30" : ""}`}
                // style={{
                //   maskImage: "radial-gradient(circle, black 70%, transparent 100%)",
                //   WebkitMaskImage: "radial-gradient(circle, black 70%, transparent 100%)",
                // }}
                />

                {/* <img
                src={isDarkMode ? "/hero2.png" : "/hero1.png"}
                alt="Cheerful girl working at cozy desk"
                className={`w-full h-auto rounded-2xl max-w-[90%] md:max-w-[80%] lg:max-w-[70%] transition-all duration-500 ${isDarkMode ? "brightness-90 contrast-110" : ""
                  }`}
              /> */}

                {/* Small Action Sticky Notes - positioned below the intro */}
                <div className="absolute w-full" style={{ top: "-45px", left: "-50px" }}>
                  {actionNotes.map((note, index) => renderActionNote(note, index))}
                </div>
              </motion.div>

              {/* Intro Text - Now positioned at the top */}
              <div className="absolute w-full" style={{ bottom: "-110px", left: "-50px" }}>
                <motion.div
                  initial={{ opacity: 0, y: -30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.8 }}
                  className={`text-center transition-colors duration-500 }`}
                // className={`mb-1 w-full backdrop-blur-sm rounded-xl px-6 py-6 shadow-md text-center transition-colors duration-500 ${isDarkMode ? "bg-gray-800/60 text-white" : "bg-white/10 text-gray-800"
                //   }`}
                >
                  <h1 className="text-4xl font-semibold font-quicksand tracking-tight">
                    Hi, I'm <span className="text-purple-600">Roshani</span>
                    <motion.span
                      animate={{ rotate: [0, 14, -8, 14, -4, 10, 0] }}
                      transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2, delay: 1 }}
                      className="inline-block ml-1"
                    >
                      👋
                    </motion.span>
                  </h1>
                  <p
                    className={`mt-2 text-lg max-w-xl mx-auto font-light ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}
                  >
                    A creative developer crafting joyful, user-focused web experiences using modern tools & clean code ✨
                  </p>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section
          id="about"
          className={`py-20 transition-colors duration-500 ${isDarkMode ? "bg-gray-800" : "bg-orange-50"}`}
        >
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="max-w-4xl mx-auto"
            >
              <h2 className="text-5xl font-bold text-center mb-16 font-mono bg-gradient-to-r from-purple-600 via-pink-500 to-blue-600 bg-clip-text text-transparent tracking-wider">
                &lt;About_Me/&gt;
              </h2>

              {/* Typing Animation */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{
                  opacity: 1,
                  transition: { delay: 0.2, duration: 1 },
                }}
                onViewportEnter={() => setAboutInView(true)}
                onViewportLeave={() => setAboutInView(false)}
                viewport={{ once: false, margin: "-100px" }}
                className={`text-center text-xl font-medium mb-12 max-w-4xl mx-auto px-4 font-mono ${isDarkMode ? "text-gray-200" : "text-gray-800"
                  }`}
              >
                {aboutInView && (
                  <Typewriter
                    words={["console.log('Turning complex problems into elegant solutions with code and creativity');"]}
                    typeSpeed={40}
                    cursor
                    key={aboutInView ? "typing" : "reset"}
                  />
                )}
              </motion.div>

              <div className="grid md:grid-cols-2 gap-12 items-center text-justify">
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2, duration: 0.8 }}
                  viewport={{ once: true }}
                  className="space-y-6"
                >
                  <div className="space-y-6 text-lg leading-relaxed">
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1, duration: 0.6 }}
                    >
                      <p className={`${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>
                        <span className="text-purple-400 font-semibold">💼 Experience: </span>
                        Worked for 4+ years in backend-heavy environments, developing robust systems using PL/SQL and
                        .NET. I’ve built and maintained secure Web Services and RESTful APIs, and ensured smooth
                        delivery of mission-critical features for production systems
                      </p>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3, duration: 0.6 }}
                    >
                      <p className={`${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>
                        <span className="text-pink-400 font-semibold">⚙️ Modern tech focus:</span> I now build full-stack
                        apps using <span className="font-semibold text-blue-400">React</span>,{" "}
                        <span className="font-semibold text-blue-400">Next.js</span>,{" "}
                        <span className="font-semibold text-teal-400">Supabase</span>, and{" "}
                        <span className="font-semibold text-sky-400">Tailwind CSS </span>
                        From frontend UI to backend logic, I care deeply about writing clean, scalable code and
                        designing smooth, intuitive user experiences.
                      </p>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5, duration: 0.6 }}
                    >
                      <p className={`${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>
                        <span className="text-green-400 font-semibold">💡 Problem-solving & delivery:</span> I approach
                        each feature, bug, and decision with curiosity, empathy, and long-term thinking.
                      </p>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.7, duration: 0.6 }}
                    >
                      <p className={`text-center italic text-sm ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
                        Always building. Always learning. 🚀
                      </p>
                    </motion.div>
                  </div>

                  <div className="flex gap-8 pt-6 justify-center">
                    <motion.div className="text-center" whileHover={{ scale: 1.05 }} transition={{ duration: 0.2 }}>
                      <div className="text-3xl mb-2">☕</div>
                      <span className={`text-sm font-medium ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                        Chai Lover
                      </span>
                    </motion.div>
                    <motion.div className="text-center" whileHover={{ scale: 1.05 }} transition={{ duration: 0.2 }}>
                      <div className="text-3xl mb-2">🎨</div>
                      <span className={`text-sm font-medium ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                        Design Enthusiast
                      </span>
                    </motion.div>
                    <motion.div className="text-center" whileHover={{ scale: 1.05 }} transition={{ duration: 0.2 }}>
                      <div className="text-3xl mb-2">🧩</div>
                      <span className={`text-sm font-medium ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                        Problem Solver
                      </span>
                    </motion.div>
                  </div>
                </motion.div>

                {/* IMAGE SIDE WITH TECHY ANIMATIONS */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4, duration: 0.8 }}
                  viewport={{ once: true }}
                  className="relative flex justify-center"
                >
                  {/* Animated Background Container */}
                  <div className="relative w-80 h-80">
                    {/* Floating Code Elements */}
                    <motion.div
                      animate={{
                        y: [0, -20, 0],
                        rotate: [0, 5, 0],
                      }}
                      transition={{
                        duration: 4,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: "easeInOut",
                      }}
                      className="absolute -top-4 -left-4 text-2xl opacity-60"
                    >
                      <Code className={`w-8 h-8 ${isDarkMode ? "text-purple-400" : "text-purple-600"}`} />
                    </motion.div>

                    <motion.div
                      animate={{
                        y: [0, 15, 0],
                        rotate: [0, -5, 0],
                      }}
                      transition={{
                        duration: 5,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: "easeInOut",
                        delay: 1,
                      }}
                      className="absolute -top-2 -right-6 text-lg opacity-50"
                    >
                      <span className={`font-mono ${isDarkMode ? "text-pink-400" : "text-pink-600"}`}>{"</>"}</span>
                    </motion.div>

                    <motion.div
                      animate={{
                        y: [0, -10, 0],
                        x: [0, 5, 0],
                      }}
                      transition={{
                        duration: 6,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: "easeInOut",
                        delay: 2,
                      }}
                      className="absolute bottom-4 -left-6 text-sm opacity-40"
                    >
                      <span className={`font-mono ${isDarkMode ? "text-blue-400" : "text-blue-600"}`}>{"{ }"}</span>
                    </motion.div>

                    <motion.div
                      animate={{
                        y: [0, 12, 0],
                        rotate: [0, 10, 0],
                      }}
                      transition={{
                        duration: 4.5,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: "easeInOut",
                        delay: 0.5,
                      }}
                      className="absolute bottom-8 -right-4 text-xl opacity-50"
                    >
                      <span className={`font-mono ${isDarkMode ? "text-green-400" : "text-green-600"}`}>{"()"}</span>
                    </motion.div>

                    {/* Geometric Shapes */}
                    <motion.div
                      animate={{
                        rotate: [0, 360],
                        scale: [1, 1.1, 1],
                      }}
                      transition={{
                        duration: 20,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: "linear",
                      }}
                      className="absolute top-8 right-8 w-4 h-4 border-2 border-purple-400 opacity-30"
                    />

                    <motion.div
                      animate={{
                        rotate: [360, 0],
                        scale: [1, 0.9, 1],
                      }}
                      transition={{
                        duration: 15,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: "linear",
                      }}
                      className="absolute bottom-12 left-4 w-6 h-6 border-2 border-pink-400 rounded-full opacity-25"
                    />

                    {/* Glowing Background */}
                    <motion.div
                      animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.3, 0.6, 0.3],
                      }}
                      transition={{
                        duration: 8,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: "easeInOut",
                      }}
                      className="absolute inset-0 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 rounded-full blur-3xl opacity-30 -z-10"
                    />

                    {/* Secondary Glow */}
                    <motion.div
                      animate={{
                        scale: [1.2, 1, 1.2],
                        opacity: [0.2, 0.4, 0.2],
                      }}
                      transition={{
                        duration: 6,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: "easeInOut",
                        delay: 1,
                      }}
                      className="absolute inset-0 bg-gradient-to-l from-cyan-400 via-purple-400 to-pink-400 rounded-full blur-2xl opacity-20 -z-20"
                    />

                    {/* Particle Effects */}
                    {[...Array(6)].map((_, i) => (
                      <motion.div
                        key={i}
                        animate={{
                          y: [0, -30, 0],
                          x: [0, Math.sin(i) * 20, 0],
                          opacity: [0, 1, 0],
                        }}
                        transition={{
                          duration: 4 + i,
                          repeat: Number.POSITIVE_INFINITY,
                          ease: "easeInOut",
                          delay: i * 0.5,
                        }}
                        className={`absolute w-2 h-2 rounded-full ${isDarkMode ? "bg-purple-400" : "bg-purple-600"
                          } opacity-40`}
                        style={{
                          top: `${20 + i * 10}%`,
                          left: `${10 + i * 15}%`,
                        }}
                      />
                    ))}

                    {/* Profile Image Container */}
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.3 }}
                      className="relative w-72 h-72 mx-auto mt-4 md:mt-0"
                    >
                      {/* Image Border Glow */}
                      <motion.div
                        animate={{
                          rotate: [0, 360],
                        }}
                        transition={{
                          duration: 30,
                          repeat: Number.POSITIVE_INFINITY,
                          ease: "linear",
                        }}
                        className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 p-1 opacity-60"
                      >
                        <div className={`w-full h-full rounded-2xl ${isDarkMode ? "bg-gray-800" : "bg-white"}`} />
                      </motion.div>

                      {/* Actual Image */}
                      <div className="absolute inset-1 rounded-2xl overflow-hidden shadow-2xl">
                        <img
                          src="/profile.JPG"
                          alt="Roshani - Creative Developer"
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* Hover Overlay */}
                      <motion.div
                        initial={{ opacity: 0 }}
                        whileHover={{ opacity: 1 }}
                        className="absolute inset-1 rounded-2xl bg-gradient-to-t from-purple-600/20 to-transparent flex items-end justify-center pb-4"
                      >
                        <span className="text-white font-medium text-sm bg-black/50 px-3 py-1 rounded-full">
                          ✨
                        </span>
                      </motion.div>
                    </motion.div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>


        {/* Skills Section */}
        {/* Skills Section */}
        <section
          id="skills"
          className={`py-20 transition-colors duration-500 ${isDarkMode ? "bg-gray-900" : "bg-purple-50"}`}
        >
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="max-w-6xl mx-auto"
            >
              <h2 className="text-5xl font-bold text-center mb-16 font-mono bg-gradient-to-r from-purple-600 via-pink-500 to-blue-600 bg-clip-text text-transparent tracking-wider">
                &lt;Skills/&gt;
              </h2>

              {/* Category Pills */}
              <div className="flex flex-wrap justify-center gap-3 mb-12">
                {Object.keys(skillsData).map((category, index) => (
                  <motion.button
                    key={category}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setActiveCategory(category as SkillsCategory)}
                    className={`relative px-6 py-3 rounded-full font-medium text-sm transition-all duration-300 shadow-lg hover:shadow-xl ${activeCategory === category
                        ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white"
                        : isDarkMode
                          ? "bg-gray-700 text-gray-300 hover:bg-gray-600"
                          : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-200"
                      }`}
                  >
                    <span className="relative z-10">{category}</span>
                    <span
                      className={`absolute top-1 right-1 w-6 h-6 rounded-full text-xs flex items-center justify-center font-bold ${activeCategory === category
                          ? "bg-white/20 text-white"
                          : isDarkMode
                            ? "bg-purple-600 text-white"
                            : "bg-purple-100 text-purple-600"
                        }`}
                    >
                      {skillsData[category as keyof typeof skillsData].length}
                    </span>

                    {/* Rotating Arrow Indicator */}
                    <motion.div
                      animate={{
                        rotate: activeCategory === category ? 180 : 0,
                      }}
                      transition={{ duration: 0.3 }}
                      className="absolute -bottom-2 left-1/2 transform -translate-x-1/2"
                    >
                      {activeCategory === category && (
                        <div className="w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-purple-500" />
                      )}
                    </motion.div>
                  </motion.button>
                ))}
              </div>

              {/* Skills Grid with Smooth Accordion Animation */}
              <motion.div
                key={activeCategory}
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="overflow-hidden"
              >
                <div
                  className={`grid gap-4 ${skillsData[activeCategory].length <= 4
                      ? "grid-cols-2 md:grid-cols-4"
                      : skillsData[activeCategory].length <= 6
                        ? "grid-cols-2 md:grid-cols-3"
                        : "grid-cols-2 md:grid-cols-4 lg:grid-cols-5"
                    }`}
                >
                  {skillsData[activeCategory].map((skill: Skill, index: number) => (
                    <motion.div
                      key={`${activeCategory}-${skill.name}`}
                      initial={{ opacity: 0, scale: 0.8, y: 20 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      transition={{
                        delay: index * 0.1,
                        duration: 0.5,
                        type: "spring",
                        bounce: 0.3,
                      }}
                      whileHover={{
                        scale: 1.05,
                        y: -5,
                        transition: { duration: 0.2 },
                      }}
                      className={`group relative p-6 rounded-2xl transition-all duration-300 cursor-pointer ${isDarkMode
                          ? "bg-gray-800 hover:bg-gray-700 border border-gray-700 hover:border-purple-500"
                          : "bg-white hover:bg-purple-50 border border-gray-200 hover:border-purple-300"
                        } shadow-lg hover:shadow-xl`}
                    >
                      {/* Gradient Hover Effect */}
                      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                      <div className="relative z-10 flex flex-col items-center text-center space-y-3">
                        {/* Skill Icon */}
                        <div className="text-4xl group-hover:scale-110 transition-transform duration-300">
                          {typeof skill.icon === "string" ? skill.icon : skill.icon}
                        </div>

                        {/* Skill Name */}
                        <h3
                          className={`font-semibold text-sm ${isDarkMode
                              ? "text-white group-hover:text-purple-300"
                              : "text-gray-800 group-hover:text-purple-700"
                            } transition-colors duration-300`}
                        >
                          {skill.name}
                        </h3>

                        {/* Skill Level Indicator */}
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5 overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: "85%" }}
                            transition={{ delay: index * 0.1 + 0.5, duration: 1 }}
                            className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
                          />
                        </div>
                      </div>

                      {/* Professional Shadow */}
                      <div className="absolute inset-0 rounded-2xl shadow-inner opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
                    </motion.div>
                  ))}
                </div>

                {/* Category Statistics */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                  className={`mt-8 p-6 rounded-2xl text-center ${isDarkMode ? "bg-gray-800 border border-gray-700" : "bg-white border border-gray-200"
                    } shadow-lg`}
                >
                  <p className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                    <span className="font-semibold text-purple-500">{skillsData[activeCategory].length}</span> skills in{" "}
                    <span className="font-semibold text-pink-500">{activeCategory}</span>
                  </p>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Projects Section */}
        <section
          id="projects"
          className={`py-20 transition-colors duration-500 ${isDarkMode ? "bg-gray-800" : "bg-white"}`}
        >
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="max-w-6xl mx-auto"
            >
              <h2
                className={`text-4xl font-bold text-center mb-12 font-quicksand ${isDarkMode ? "text-white" : "text-gray-800"
                  }`}
              >
                My Projects <Folder className="inline w-8 h-8 text-purple-500 ml-2" />
              </h2>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {projects.map((project, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1, duration: 0.6 }}
                    viewport={{ once: true }}
                    whileHover={{ y: -10, scale: 1.02 }}
                    className="group"
                  >
                    <Card
                      className={`overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 ${isDarkMode ? "bg-gray-700 border-gray-600" : "bg-white"
                        }`}
                    >
                      <div className="relative overflow-hidden">
                        <img
                          src={project.image || "/placeholder.svg"}
                          alt={project.title}
                          className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                        <div className="absolute top-4 right-4 flex gap-2">
                          <motion.a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className={`p-2 rounded-full ${isDarkMode ? "bg-gray-800/90 text-white" : "bg-white/90 text-gray-800"
                              } hover:bg-purple-500 hover:text-white transition-colors duration-300`}
                          >
                            <Github className="w-4 h-4" />
                          </motion.a>
                          <motion.a
                            href={project.live}
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className={`p-2 rounded-full ${isDarkMode ? "bg-gray-800/90 text-white" : "bg-white/90 text-gray-800"
                              } hover:bg-purple-500 hover:text-white transition-colors duration-300`}
                          >
                            <ExternalLink className="w-4 h-4" />
                          </motion.a>
                        </div>
                      </div>
                      <CardContent className="p-6">
                        <h3 className={`text-xl font-semibold mb-2 ${isDarkMode ? "text-white" : "text-gray-800"}`}>
                          {project.title}
                        </h3>
                        <p className={`mb-4 ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>
                          {project.description}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {project.tech.map((tech, techIndex) => (
                            <span
                              key={techIndex}
                              className={`px-3 py-1 rounded-full text-sm font-medium ${isDarkMode ? "bg-purple-900/50 text-purple-300" : "bg-purple-100 text-purple-700"
                                }`}
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Gallery Section */}
        <section
          id="gallery"
          className={`py-20 transition-colors duration-500 ${isDarkMode ? "bg-gray-900" : "bg-gray-50"}`}
        >
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="max-w-6xl mx-auto"
            >
              <h2
                className={`text-4xl font-bold text-center mb-12 font-quicksand ${isDarkMode ? "text-white" : "text-gray-800"
                  }`}
              >
                My Gallery <Camera className="inline w-8 h-8 text-purple-500 ml-2" />
              </h2>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {galleryItems.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1, duration: 0.6 }}
                    viewport={{ once: true }}
                    whileHover={{ y: -10, scale: 1.02 }}
                    className="group"
                  >
                    <Card
                      className={`overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 ${isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white"
                        }`}
                    >
                      <div className="relative overflow-hidden">
                        <img
                          src={item.image || "/placeholder.svg"}
                          alt={item.title}
                          className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                        <div className="absolute top-4 right-4">
                          <span
                            className={`px-3 py-1 rounded-full text-sm font-medium ${isDarkMode ? "bg-gray-800/90 text-purple-400" : "bg-white/90 text-purple-600"
                              }`}
                          >
                            {item.category}
                          </span>
                        </div>
                      </div>
                      <CardContent className="p-6">
                        <h3 className={`text-xl font-semibold mb-2 ${isDarkMode ? "text-white" : "text-gray-800"}`}>
                          {item.title}
                        </h3>
                        <p className={isDarkMode ? "text-gray-300" : "text-gray-600"}>
                          A beautiful project that showcases creativity and technical skills.
                        </p>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Contact Section */}
        <section
          id="contact"
          className={`py-20 transition-colors duration-500 ${isDarkMode ? "bg-gray-800" : "bg-white"}`}
        >
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="max-w-4xl mx-auto text-center"
            >
              <h2 className={`text-4xl font-bold mb-4 font-quicksand ${isDarkMode ? "text-white" : "text-gray-800"}`}>
                Let's Build Something Bright Together!
              </h2>

              <p className={`text-xl mb-12 ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>
                Have a project in mind? I'd love to hear about it! Let's create something amazing together.
              </p>

              <div className="grid md:grid-cols-2 gap-12">
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2, duration: 0.8 }}
                  viewport={{ once: true }}
                  className="space-y-8"
                >
                  <div className={`rounded-2xl p-8 shadow-lg ${isDarkMode ? "bg-gray-700" : "bg-gray-50"}`}>
                    <h3 className={`text-2xl font-semibold mb-6 ${isDarkMode ? "text-white" : "text-gray-800"}`}>
                      Get in Touch
                    </h3>

                    <div className="space-y-4">
                      <div className="flex items-center gap-4">
                        <Mail className="w-6 h-6 text-pink-500" />
                        <span className={isDarkMode ? "text-gray-300" : "text-gray-700"}>roshanichede@gmail.com</span>
                      </div>

                      <div className="flex gap-4 pt-4">
                        <Button
                          variant="outline"
                          size="icon"
                          className={`rounded-full transition-colors duration-300 ${isDarkMode
                            ? "border-pink-400 hover:bg-pink-500 hover:border-pink-500 text-pink-400 hover:text-white"
                            : "border-pink-300 hover:bg-pink-50 hover:border-pink-400"
                            }`}
                        >
                          <Github className="w-5 h-5" />
                        </Button>
                        <Button
                          variant="outline"
                          size="icon"
                          className={`rounded-full transition-colors duration-300 ${isDarkMode
                            ? "border-purple-400 hover:bg-purple-500 hover:border-purple-500 text-purple-400 hover:text-white"
                            : "border-purple-300 hover:bg-purple-50 hover:border-purple-400"
                            }`}
                        >
                          <Linkedin className="w-5 h-5" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4, duration: 0.8 }}
                  viewport={{ once: true }}
                >
                  <form className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <Input
                        placeholder="Your Name"
                        className={`rounded-xl transition-colors duration-300 ${isDarkMode
                          ? "border-gray-600 bg-gray-700 text-white placeholder-gray-400 focus:border-pink-400"
                          : "border-gray-300 focus:border-pink-400 focus:ring-pink-400"
                          }`}
                      />
                      <Input
                        type="email"
                        placeholder="Your Email"
                        className={`rounded-xl transition-colors duration-300 ${isDarkMode
                          ? "border-gray-600 bg-gray-700 text-white placeholder-gray-400 focus:border-purple-400"
                          : "border-gray-300 focus:border-purple-400 focus:ring-purple-400"
                          }`}
                      />
                    </div>

                    <Input
                      placeholder="Subject"
                      className={`rounded-xl transition-colors duration-300 ${isDarkMode
                        ? "border-gray-600 bg-gray-700 text-white placeholder-gray-400 focus:border-pink-400"
                        : "border-gray-300 focus:border-pink-400 focus:ring-pink-400"
                        }`}
                    />

                    <Textarea
                      placeholder="Tell me about your project..."
                      rows={5}
                      className={`rounded-xl transition-colors duration-300 ${isDarkMode
                        ? "border-gray-600 bg-gray-700 text-white placeholder-gray-400 focus:border-purple-400"
                        : "border-gray-300 focus:border-purple-400 focus:ring-purple-400"
                        }`}
                    />

                    <Button
                      type="submit"
                      className="w-full bg-gradient-to-r from-pink-400 to-purple-500 hover:from-pink-500 hover:to-purple-600 text-white py-3 rounded-xl text-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                      Send Message ✨
                    </Button>
                  </form>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Footer */}
        <footer
          className={`py-12 border-t transition-colors duration-500 ${isDarkMode ? "bg-gray-900 border-gray-700" : "bg-gray-50 border-gray-200"
            }`}
        >
          <div className="container mx-auto px-6 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <p className={isDarkMode ? "text-gray-300 mb-4" : "text-gray-600 mb-4"}>
                Made with <Heart className="inline w-4 h-4 text-pink-500" /> and lots of coffee
              </p>
              <p className={`text-sm ${isDarkMode ? "text-gray-500" : "text-gray-500"}`}>
                © 2024 Roshani. All rights reserved.
              </p>
            </motion.div>
          </div>
        </footer>
      </div>
    </motion.div>
  )
}
