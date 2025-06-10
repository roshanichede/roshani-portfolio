"use client"

import { motion, useScroll } from "framer-motion"
import { useState, useRef, useEffect } from "react"
import { Mail, Github, Linkedin, Heart, Code, Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Typewriter } from "react-simple-typewriter"
import { Icon } from "@iconify/react"
//import ProjectCard from "@/components/project-card"

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
    const [activeCategory, setActiveCategory] = useState<keyof typeof skillsData | null>(null)

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
            const sections = ["home", "about", "experience", "projects", "gallery", "contact"]

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
            id: "experience",
            label: "Experience",
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
        ],
    }

    const experiences = [
        {
            company: "Tech Solutions Inc.",
            period: "2020 - Present",
            logo: "/placeholder.svg?height=60&width=60",
            roles: [
                {
                    title: "Senior Software Developer",
                    period: "2022 - Present",
                    description:
                        "Lead development of enterprise applications and mentor junior developers. Architected scalable solutions for high-traffic systems.",
                    technologies: ["C#", ".NET Core", "SQL Server", "Azure", "React"],
                    projects: [
                        {
                            name: "Customer Portal Redesign",
                            description:
                                "Led the complete redesign of customer-facing portal, improving user experience and reducing load times by 40%",
                            duration: "6 months",
                            technologies: ["React", "TypeScript", ".NET Core", "SQL Server"],
                        },
                        {
                            name: "Microservices Migration",
                            description: "Architected and implemented migration from monolithic to microservices architecture",
                            duration: "8 months",
                            technologies: ["Docker", "Kubernetes", ".NET Core", "Azure Service Bus"],
                        },
                    ],
                },
                {
                    title: "Software Developer",
                    period: "2020 - 2022",
                    description:
                        "Developed and maintained enterprise applications using .NET Core and SQL Server. Built RESTful APIs and web services for mission-critical systems.",
                    technologies: ["C#", ".NET Core", "SQL Server", "Web APIs"],
                    projects: [
                        {
                            name: "Inventory Management System",
                            description: "Built comprehensive inventory tracking system with real-time updates and reporting",
                            duration: "4 months",
                            technologies: ["C#", ".NET Core", "SQL Server", "SignalR"],
                        },
                        {
                            name: "Payment Gateway Integration",
                            description: "Integrated multiple payment gateways with robust error handling and transaction logging",
                            duration: "3 months",
                            technologies: ["C#", "REST APIs", "SQL Server", "Azure Functions"],
                        },
                    ],
                },
            ],
        },
        {
            company: "Digital Systems Ltd.",
            period: "2018 - 2020",
            logo: "/placeholder.svg?height=60&width=60",
            roles: [
                {
                    title: "Backend Developer",
                    period: "2018 - 2020",
                    description:
                        "Specialized in database design and PL/SQL development. Created robust data processing solutions and optimized database performance.",
                    technologies: ["PL/SQL", "Oracle", "VB.NET", "ASP.NET"],
                    projects: [
                        {
                            name: "Data Warehouse Optimization",
                            description:
                                "Optimized ETL processes and improved query performance by 60% through database restructuring",
                            duration: "5 months",
                            technologies: ["PL/SQL", "Oracle", "ETL", "Performance Tuning"],
                        },
                        {
                            name: "Automated Reporting System",
                            description: "Developed automated reporting system reducing manual report generation time by 80%",
                            duration: "3 months",
                            technologies: ["PL/SQL", "Oracle", "VB.NET", "Crystal Reports"],
                        },
                        {
                            name: "Legacy System Migration",
                            description: "Migrated legacy database systems to modern Oracle infrastructure with zero downtime",
                            duration: "6 months",
                            technologies: ["PL/SQL", "Oracle", "Data Migration", "VB.NET"],
                        },
                    ],
                },
            ],
        },
        {
            company: "StartUp Innovations",
            period: "2017 - 2018",
            logo: "/placeholder.svg?height=60&width=60",
            roles: [
                {
                    title: "Junior Developer",
                    period: "2017 - 2018",
                    description:
                        "Contributed to full-stack development projects using various technologies. Gained experience in agile development and version control.",
                    technologies: ["Java", "HTML", "CSS", "Git", "MySQL"],
                    projects: [
                        {
                            name: "E-commerce Platform",
                            description: "Contributed to building a full-featured e-commerce platform from scratch",
                            duration: "8 months",
                            technologies: ["Java", "Spring Boot", "MySQL", "HTML", "CSS"],
                        },
                        {
                            name: "Mobile App Backend",
                            description: "Developed REST APIs for mobile application with user authentication and data management",
                            duration: "4 months",
                            technologies: ["Java", "Spring Boot", "MySQL", "REST APIs"],
                        },
                    ],
                },
            ],
        },
    ]

    const projects = [
        {
            title: "AI Fashion Stylist",
            description:
                "An intelligent fashion assistant that helps users create stylish outfits from their wardrobe items using AI. The application provides personalized outfit suggestions and generates visual representations of the recommended combinations",
            images: [
                "/placeholder.svg?height=200&width=300",
                "/placeholder.svg?height=200&width=300",
                "/placeholder.svg?height=200&width=300",
                "/placeholder.svg?height=200&width=300",
            ],
            tech: ["Next.js", "TypeScript", "Supabase", "Stripe"],
            github: "https://github.com/roshanichede/style-it",
            live: "https://style-it.vercel.app/",
        },
        {
            title: "Task Management App",
            description: "A collaborative task management tool with real-time updates and team features",
            images: [
                "/placeholder.svg?height=200&width=300",
                "/placeholder.svg?height=200&width=300",
                "/placeholder.svg?height=200&width=300",
                "/placeholder.svg?height=200&width=300",
            ],
            tech: ["React", "Node.js", "Socket.io", "MongoDB"],
            github: "https://github.com/roshanichede/taskmanager",
            live: "https://taskmanager-demo.vercel.app",
        },
        {
            title: "Weather Dashboard",
            description: "A beautiful weather dashboard with location-based forecasts and interactive maps",
            images: [
                "/placeholder.svg?height=200&width=300",
                "/placeholder.svg?height=200&width=300",
                "/placeholder.svg?height=200&width=300",
                "/placeholder.svg?height=200&width=300",
            ],
            tech: ["Vue.js", "OpenWeather API", "Chart.js"],
            github: "https://github.com/roshanichede/weather-dashboard",
            live: "https://weather-dashboard-demo.vercel.app",
        },
        {
            title: "Portfolio Website",
            description: "A responsive portfolio website with dark mode and smooth animations",
            images: [
                "/placeholder.svg?height=200&width=300",
                "/placeholder.svg?height=200&width=300",
                "/placeholder.svg?height=200&width=300",
                "/placeholder.svg?height=200&width=300",
            ],
            tech: ["Next.js", "Framer Motion", "Tailwind CSS"],
            github: "https://github.com/roshanichede/portfolio",
            live: "https://roshanichede.vercel.app",
        },
        {
            title: "Blog Platform",
            description: "A modern blog platform with markdown support and comment system",
            images: [
                "/placeholder.svg?height=200&width=300",
                "/placeholder.svg?height=200&width=300",
                "/placeholder.svg?height=200&width=300",
                "/placeholder.svg?height=200&width=300",
            ],
            tech: ["Next.js", "MDX", "Prisma", "PostgreSQL"],
            github: "https://github.com/roshanichede/blog",
            live: "https://blog-demo.vercel.app",
        },
        {
            title: "Chat Application",
            description: "Real-time chat application with rooms, file sharing, and emoji reactions",
            images: [
                "/placeholder.svg?height=200&width=300",
                "/placeholder.svg?height=200&width=300",
                "/placeholder.svg?height=200&width=300",
                "/placeholder.svg?height=200&width=300",
            ],
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
                                        A creative developer crafting joyful, user-focused web experiences using modern tools & clean code
                                        ✨
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
                                                .NET. I've built and maintained secure Web Services and RESTful APIs, and ensured smooth
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
                                                    duration: 4 + i * 0.5,
                                                    repeat: Number.POSITIVE_INFINITY,
                                                    ease: "easeInOut",
                                                    delay: i * 0.8,
                                                }}
                                                className="absolute w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full opacity-60"
                                                style={{
                                                    top: `${20 + i * 10}%`,
                                                    left: `${10 + i * 15}%`,
                                                }}
                                            />
                                        ))}

                                        {/* Main Profile Image */}
                                        <motion.div
                                            whileHover={{
                                                scale: 1.05,
                                                rotate: 2,
                                            }}
                                            transition={{ duration: 0.3 }}
                                            className="relative z-10 w-full h-full"
                                        >
                                            <img
                                                src="/profile.JPG"
                                                alt="Roshani Chede"
                                                className="w-full h-full object-cover rounded-full shadow-2xl border-4 border-white/20"
                                            />

                                            {/* Overlay Gradient */}
                                            <div className="absolute inset-0 bg-gradient-to-t from-purple-900/20 via-transparent to-pink-900/20 rounded-full" />
                                        </motion.div>
                                    </div>
                                </motion.div>
                            </div>

                            {/* Experience Timeline */}

                            {/* Professional Experience Section */}
                        </motion.div>
                    </div>
                </section>

                {/* Experience Section */}
                <section
                    id="experience"
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
                                &lt;Experience/&gt;
                            </h2>

                            {/* Professional Experience Section */}
                            <motion.div
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8 }}
                                viewport={{ once: true }}
                                className="mt-20"
                            >
                                <h3 className="text-3xl font-bold text-center mb-12 font-quicksand bg-gradient-to-r from-purple-600 via-pink-500 to-blue-600 bg-clip-text text-transparent tracking-wider">
                                    &lt;Professional_Experience/&gt;
                                </h3>

                                <div className="relative">
                                    {/* Timeline Line */}
                                    <div className="absolute left-8 md:left-1/2 transform md:-translate-x-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-purple-500 via-pink-500 to-blue-500 rounded-full"></div>

                                    <div className="space-y-12">
                                        {experiences.map((company, companyIndex) => (
                                            <motion.div
                                                key={companyIndex}
                                                initial={{ opacity: 0, y: 50 }}
                                                whileInView={{ opacity: 1, y: 0 }}
                                                transition={{ delay: companyIndex * 0.2, duration: 0.6 }}
                                                viewport={{ once: true }}
                                                className="relative"
                                            >
                                                {/* Company Header */}
                                                <div className="flex items-center mb-8">
                                                    <div className="absolute left-8 md:left-1/2 transform md:-translate-x-1/2 -translate-x-1/2 w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-lg z-10">
                                                        <img
                                                            src={company.logo || "/placeholder.svg"}
                                                            alt={`${company.company} logo`}
                                                            className="w-8 h-8 rounded-full bg-white p-1"
                                                        />
                                                    </div>

                                                    <div
                                                        className={`ml-20 md:ml-0 ${companyIndex % 2 === 0 ? "md:mr-auto md:pr-8" : "md:ml-auto md:pl-8"} max-w-md`}
                                                    >
                                                        <motion.div
                                                            whileHover={{ scale: 1.02 }}
                                                            className={`p-6 rounded-2xl shadow-lg ${isDarkMode ? "bg-gray-700 border border-gray-600" : "bg-white border border-gray-200"
                                                                } hover:shadow-xl transition-all duration-300`}
                                                        >
                                                            <h4 className={`text-2xl font-bold mb-2 ${isDarkMode ? "text-white" : "text-gray-800"}`}>
                                                                {company.company}
                                                            </h4>
                                                            <p
                                                                className={`text-sm font-medium ${isDarkMode ? "text-purple-400" : "text-purple-600"}`}
                                                            >
                                                                {company.period}
                                                            </p>
                                                        </motion.div>
                                                    </div>
                                                </div>

                                                {/* Roles within Company */}
                                                <div className="ml-20 md:ml-0 space-y-8">
                                                    {company.roles.map((role, roleIndex) => (
                                                        <motion.div
                                                            key={roleIndex}
                                                            initial={{ opacity: 0, x: companyIndex % 2 === 0 ? -30 : 30 }}
                                                            whileInView={{ opacity: 1, x: 0 }}
                                                            transition={{ delay: roleIndex * 0.1, duration: 0.5 }}
                                                            viewport={{ once: true }}
                                                            className={`${companyIndex % 2 === 0 ? "md:mr-auto md:pr-16" : "md:ml-auto md:pl-16"} max-w-2xl`}
                                                        >
                                                            {/* Role Header */}
                                                            <div
                                                                className={`p-6 rounded-2xl mb-6 ${isDarkMode
                                                                    ? "bg-gray-800 border border-gray-700"
                                                                    : "bg-gray-50 border border-gray-200"
                                                                    } shadow-md hover:shadow-xl transition-all duration-300`}
                                                            >
                                                                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                                                                    <h5
                                                                        className={`text-xl font-semibold ${isDarkMode ? "text-white" : "text-gray-800"}`}
                                                                    >
                                                                        {role.title}
                                                                    </h5>
                                                                    <span
                                                                        className={`text-sm font-medium px-3 py-1 rounded-full mt-2 md:mt-0 ${isDarkMode ? "bg-purple-900 text-purple-300" : "bg-purple-100 text-purple-700"
                                                                            }`}
                                                                    >
                                                                        {role.period}
                                                                    </span>
                                                                </div>

                                                                <p className={`mb-4 leading-relaxed ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>
                                                                    {role.description}
                                                                </p>

                                                                <div className="flex flex-wrap gap-2 mb-4">
                                                                    {role.technologies.map((tech, techIndex) => (
                                                                        <span
                                                                            key={techIndex}
                                                                            className={`px-3 py-1 rounded-full text-sm font-medium ${isDarkMode
                                                                                ? "bg-gray-700 text-gray-300"
                                                                                : "bg-white text-gray-700 border border-gray-200"
                                                                                }`}
                                                                        >
                                                                            {tech}
                                                                        </span>
                                                                    ))}
                                                                </div>
                                                            </div>

                                                            {/* Projects within Role */}
                                                            <div className="space-y-4">
                                                                <h6
                                                                    className={`text-lg font-semibold mb-4 ${isDarkMode ? "text-purple-400" : "text-purple-600"}`}
                                                                >
                                                                    Key Projects:
                                                                </h6>

                                                                <div className="grid gap-4">
                                                                    {role.projects.map((project, projectIndex) => (
                                                                        <motion.div
                                                                            key={projectIndex}
                                                                            initial={{ opacity: 0, scale: 0.95 }}
                                                                            whileInView={{ opacity: 1, scale: 1 }}
                                                                            transition={{ delay: projectIndex * 0.1, duration: 0.4 }}
                                                                            viewport={{ once: true }}
                                                                            whileHover={{ scale: 1.02, y: -2 }}
                                                                            className={`p-5 rounded-xl border-l-4 border-gradient-to-b from-purple-500 to-pink-500 ${isDarkMode
                                                                                ? "bg-gray-700/50 border-l-purple-500 hover:bg-gray-700"
                                                                                : "bg-white border-l-purple-500 hover:bg-purple-50"
                                                                                } shadow-sm hover:shadow-md transition-all duration-300`}
                                                                        >
                                                                            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-3">
                                                                                <h6
                                                                                    className={`font-semibold text-lg ${isDarkMode ? "text-white" : "text-gray-800"}`}
                                                                                >
                                                                                    {project.name}
                                                                                </h6>
                                                                                <span
                                                                                    className={`text-xs px-2 py-1 rounded-full mt-1 sm:mt-0 ${isDarkMode ? "bg-pink-900 text-pink-300" : "bg-pink-100 text-pink-700"
                                                                                        }`}
                                                                                >
                                                                                    {project.duration}
                                                                                </span>
                                                                            </div>

                                                                            <p
                                                                                className={`text-sm mb-3 leading-relaxed ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}
                                                                            >
                                                                                {project.description}
                                                                            </p>

                                                                            <div className="flex flex-wrap gap-2">
                                                                                {project.technologies.map((tech, techIndex) => (
                                                                                    <span
                                                                                        key={techIndex}
                                                                                        className={`px-2 py-1 rounded-md text-xs font-medium ${isDarkMode
                                                                                            ? "bg-gray-600 text-gray-300"
                                                                                            : "bg-gray-100 text-gray-600 border border-gray-200"
                                                                                            }`}
                                                                                    >
                                                                                        {tech}
                                                                                    </span>
                                                                                ))}
                                                                            </div>
                                                                        </motion.div>
                                                                    ))}
                                                                </div>
                                                            </div>
                                                        </motion.div>
                                                    ))}
                                                </div>
                                            </motion.div>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        </motion.div>
                    </div>
                </section>

                {/* Tech Stack Section */}
                <section
                    id="techstack"
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
                                &lt;TechStack/&gt;
                            </h2>

                            {/* Category Pills */}
                            <div className="flex flex-wrap justify-center gap-3 mb-12">
                                {(Object.keys(skillsData) as Array<keyof typeof skillsData>).map((category, index) => (
                                    <motion.button
                                        key={category}
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        whileInView={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: index * 0.1, duration: 0.5 }}
                                        viewport={{ once: true }}
                                        whileHover={{ scale: 1.05, y: -2 }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={() => setActiveCategory(activeCategory === category ? null : category)}
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
                                            {skillsData[category].length}
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
                                    className={`grid gap-4 ${activeCategory && skillsData[activeCategory]?.length <= 4
                                        ? "grid-cols-2 md:grid-cols-4"
                                        : activeCategory && skillsData[activeCategory]?.length <= 6
                                            ? "grid-cols-2 md:grid-cols-3"
                                            : "grid-cols-2 md:grid-cols-4 lg:grid-cols-5"
                                        }`}
                                >
                                    {(Object.keys(skillsData) as Array<keyof typeof skillsData>).map((category) => {
                                        if (activeCategory === null || activeCategory === category) {
                                            return skillsData[category].map((skill: Skill, index: number) => (
                                                <motion.div
                                                    key={`${category}-${skill.name}`}
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
                                            ))
                                        }
                                    })}
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
                                        <span className="font-semibold text-purple-500">{Object.keys(skillsData).length}</span> Tech Stacks
                                    </p>
                                </motion.div>
                            </motion.div>
                        </motion.div>
                    </div>
                </section>

                {/* Projects Section */}
                <section
                    id="projects"
                    className={`py-20 transition-colors duration-500 ${isDarkMode ? "bg-gray-800" : "bg-blue-50"}`}
                >
                    <div className="container mx-auto px-6">
                        <motion.div
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            viewport={{ once: true }}
                            className="max-w-7xl mx-auto"
                        >
                            <h2 className="text-5xl font-bold text-center mb-16 font-mono bg-gradient-to-r from-purple-600 via-pink-500 to-blue-600 bg-clip-text text-transparent tracking-wider">
                                &lt;Projects/&gt;
                            </h2>

                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {projects.map((project, index) => (
                                    <motion.div
                                        key={index}
                                        className={`group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 ${isDarkMode ? "bg-gray-800 border border-gray-700" : "bg-white border border-gray-200"
                                            }`}
                                    >
                                        {/* Main Project Image */}
                                        <div className="aspect-w-3 aspect-h-2">
                                            <img
                                                src={project.images[0] || "/placeholder.svg"}
                                                alt={project.title}
                                                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                                            />
                                        </div>

                                        {/* Project Details */}
                                        <div className="p-4">
                                            <h3 className={`font-semibold text-lg mb-2 ${isDarkMode ? "text-white" : "text-gray-800"}`}>
                                                {project.title}
                                            </h3>
                                            <p className={`text-sm ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>
                                                {project.description.substring(0, 100)}...
                                            </p>

                                            {/* Thumbnail Gallery */}
                                            <div className="mt-4 flex overflow-x-auto space-x-2">
                                                {project.images.map((image, imageIndex) => (
                                                    <div key={imageIndex} className="w-16 h-12 rounded-md overflow-hidden flex-shrink-0">
                                                        <img
                                                            src={image || "/placeholder.svg"}
                                                            alt={`${project.title} Thumbnail ${imageIndex + 1}`}
                                                            className="w-full h-full object-cover cursor-pointer hover:opacity-75 transition-opacity duration-200"
                                                        />
                                                    </div>
                                                ))}
                                            </div>

                                            {/* Tech Stack */}
                                            <div className="mt-4 flex flex-wrap gap-2">
                                                {project.tech.map((tech, techIndex) => (
                                                    <span
                                                        key={techIndex}
                                                        className={`px-2 py-1 rounded-md text-xs font-medium ${isDarkMode
                                                            ? "bg-gray-700 text-gray-300"
                                                            : "bg-gray-100 text-gray-600 border border-gray-200"
                                                            }`}
                                                    >
                                                        {tech}
                                                    </span>
                                                ))}
                                            </div>

                                            {/* Action Buttons */}
                                            <div className="mt-4 flex justify-end gap-2">
                                                <Button asChild variant="outline">
                                                    <a href={project.github} target="_blank" rel="noopener noreferrer">
                                                        GitHub
                                                    </a>
                                                </Button>
                                                <Button asChild>
                                                    <a href={project.live} target="_blank" rel="noopener noreferrer">
                                                        Live Demo
                                                    </a>
                                                </Button>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                </section>

                {/* Gallery Section */}
                <section
                    id="gallery"
                    className={`py-20 transition-colors duration-500 ${isDarkMode ? "bg-gray-900" : "bg-green-50"}`}
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
                                &lt;Gallery/&gt;
                            </h2>

                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {galleryItems.map((item, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        whileInView={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: index * 0.1, duration: 0.6 }}
                                        viewport={{ once: true }}
                                        whileHover={{ scale: 1.05, y: -5 }}
                                        className={`group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 ${isDarkMode ? "bg-gray-800 border border-gray-700" : "bg-white border border-gray-200"
                                            }`}
                                    >
                                        <div className="aspect-square overflow-hidden">
                                            <img
                                                src={item.image || "/placeholder.svg"}
                                                alt={item.title}
                                                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                        </div>
                                        <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                                            <h3 className="font-semibold text-lg mb-1">{item.title}</h3>
                                            <p className="text-sm opacity-90">{item.category}</p>
                                        </div>
                                        <div className="absolute top-4 right-4">
                                            <span
                                                className={`px-3 py-1 rounded-full text-xs font-medium ${isDarkMode ? "bg-purple-900/80 text-purple-300" : "bg-purple-100/80 text-purple-700"
                                                    } backdrop-blur-sm`}
                                            >
                                                {item.category}
                                            </span>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                </section>

                {/* Contact Section */}
                <section
                    id="contact"
                    className={`py-20 transition-colors duration-500 ${isDarkMode ? "bg-gray-800" : "bg-pink-50"}`}
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
                                &lt;Contact/&gt;
                            </h2>

                            <div className="grid md:grid-cols-2 gap-12">
                                <motion.div
                                    initial={{ opacity: 0, x: -50 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.2, duration: 0.8 }}
                                    viewport={{ once: true }}
                                    className="space-y-8"
                                >
                                    <div>
                                        <h3 className={`text-2xl font-bold mb-6 ${isDarkMode ? "text-white" : "text-gray-800"}`}>
                                            Let's Connect!
                                        </h3>
                                        <p className={`text-lg leading-relaxed ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>
                                            I'm always excited to discuss new opportunities, collaborate on interesting projects, or just chat
                                            about technology and development. Feel free to reach out!
                                        </p>
                                    </div>

                                    <div className="space-y-4">
                                        <motion.a
                                            href="mailto:roshanichede@gmail.com"
                                            whileHover={{ scale: 1.05, x: 10 }}
                                            className={`flex items-center gap-4 p-4 rounded-xl transition-all duration-300 ${isDarkMode
                                                ? "bg-gray-700 hover:bg-gray-600 text-white"
                                                : "bg-white hover:bg-pink-100 text-gray-800 border border-gray-200"
                                                } shadow-lg hover:shadow-xl`}
                                        >
                                            <div className="p-3 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 text-white">
                                                <Mail className="w-6 h-6" />
                                            </div>
                                            <div>
                                                <p className="font-semibold">Email</p>
                                                <p className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                                                    roshanichede@gmail.com
                                                </p>
                                            </div>
                                        </motion.a>

                                        <motion.a
                                            href="https://github.com/roshanichede"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            whileHover={{ scale: 1.05, x: 10 }}
                                            className={`flex items-center gap-4 p-4 rounded-xl transition-all duration-300 ${isDarkMode
                                                ? "bg-gray-700 hover:bg-gray-600 text-white"
                                                : "bg-white hover:bg-gray-100 text-gray-800 border border-gray-200"
                                                } shadow-lg hover:shadow-xl`}
                                        >
                                            <div className="p-3 rounded-full bg-gradient-to-r from-gray-700 to-gray-900 text-white">
                                                <Github className="w-6 h-6" />
                                            </div>
                                            <div>
                                                <p className="font-semibold">GitHub</p>
                                                <p className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>@roshanichede</p>
                                            </div>
                                        </motion.a>

                                        <motion.a
                                            href="https://linkedin.com/in/roshanichede"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            whileHover={{ scale: 1.05, x: 10 }}
                                            className={`flex items-center gap-4 p-4 rounded-xl transition-all duration-300 ${isDarkMode
                                                ? "bg-gray-700 hover:bg-gray-600 text-white"
                                                : "bg-white hover:bg-blue-100 text-gray-800 border border-gray-200"
                                                } shadow-lg hover:shadow-xl`}
                                        >
                                            <div className="p-3 rounded-full bg-gradient-to-r from-blue-500 to-blue-700 text-white">
                                                <Linkedin className="w-6 h-6" />
                                            </div>
                                            <div>
                                                <p className="font-semibold">LinkedIn</p>
                                                <p className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>/in/roshanichede</p>
                                            </div>
                                        </motion.a>
                                    </div>
                                </motion.div>

                                <motion.div
                                    initial={{ opacity: 0, x: 50 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.4, duration: 0.8 }}
                                    viewport={{ once: true }}
                                >
                                    <Card
                                        className={`p-8 ${isDarkMode ? "bg-gray-700 border-gray-600" : "bg-white border-gray-200"
                                            } shadow-xl`}
                                    >
                                        <CardContent className="p-0">
                                            <form className="space-y-6">
                                                <div>
                                                    <label
                                                        className={`block text-sm font-medium mb-2 ${isDarkMode ? "text-gray-300" : "text-gray-700"
                                                            }`}
                                                    >
                                                        Name
                                                    </label>
                                                    <Input
                                                        placeholder="Your name"
                                                        className={`${isDarkMode
                                                            ? "bg-gray-600 border-gray-500 text-white placeholder-gray-400"
                                                            : "bg-white border-gray-300"
                                                            }`}
                                                    />
                                                </div>
                                                <div>
                                                    <label
                                                        className={`block text-sm font-medium mb-2 ${isDarkMode ? "text-gray-300" : "text-gray-700"
                                                            }`}
                                                    >
                                                        Email
                                                    </label>
                                                    <Input
                                                        type="email"
                                                        placeholder="your.email@example.com"
                                                        className={`${isDarkMode
                                                            ? "bg-gray-600 border-gray-500 text-white placeholder-gray-400"
                                                            : "bg-white border-gray-300"
                                                            }`}
                                                    />
                                                </div>
                                                <div>
                                                    <label
                                                        className={`block text-sm font-medium mb-2 ${isDarkMode ? "text-gray-300" : "text-gray-700"
                                                            }`}
                                                    >
                                                        Message
                                                    </label>
                                                    <Textarea
                                                        placeholder="Tell me about your project or just say hi!"
                                                        rows={5}
                                                        className={`${isDarkMode
                                                            ? "bg-gray-600 border-gray-500 text-white placeholder-gray-400"
                                                            : "bg-white border-gray-300"
                                                            }`}
                                                    />
                                                </div>
                                                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                                                    <Button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
                                                        Send Message
                                                    </Button>
                                                </motion.div>
                                            </form>
                                        </CardContent>
                                    </Card>
                                </motion.div>
                            </div>
                        </motion.div>
                    </div>
                </section>

                {/* Footer */}
                <footer
                    className={`py-12 transition-colors duration-500 ${isDarkMode ? "bg-gray-900 border-gray-700" : "bg-white border-gray-200"
                        } border-t`}
                >
                    <div className="container mx-auto px-6">
                        <div className="text-center">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6 }}
                                viewport={{ once: true }}
                                className="flex items-center justify-center gap-2 mb-4"
                            >
                                <span className={`text-lg ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>Made with</span>
                                <motion.div
                                    animate={{
                                        scale: [1, 1.2, 1],
                                    }}
                                    transition={{
                                        duration: 1.5,
                                        repeat: Number.POSITIVE_INFINITY,
                                        ease: "easeInOut",
                                    }}
                                >
                                    <Heart className="w-5 h-5 text-red-500 fill-current" />
                                </motion.div>
                                <span className={`text-lg ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>and lots of ☕</span>
                            </motion.div>
                            <p className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                                © 2024 Roshani Chede. All rights reserved.
                            </p>
                        </div>
                    </div>
                </footer>
            </div>
        </motion.div>
    )
}