"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Github, ExternalLink } from "lucide-react"

type ProjectCardProps = {
    project: {
        title: string
        description: string
        image: string
        tech: string[]
        github: string
        live: string
    }
    index: number
    isDarkMode: boolean
}

export default function ProjectCard({ project, index, isDarkMode }: ProjectCardProps) {
    const [isFlipped, setIsFlipped] = useState(false)

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1, duration: 0.6 }}
            viewport={{ once: true }}
            className="h-[400px] w-full perspective-1000"
            // onMouseEnter={() => setIsFlipped(true)}
            // onMouseLeave={() => setIsFlipped(false)}
            // onTouchStart={() => setIsFlipped(!isFlipped)}
            onClick={() => setIsFlipped(!isFlipped)}
        >
            <div
                className={`relative w-full h-full transition-all duration-700 preserve-3d ${isFlipped ? "rotate-y-180" : ""}`}
            >
                {/* Front Side */}
                <div
                    className={`absolute inset-0 w-full h-full backface-hidden rounded-2xl overflow-hidden shadow-lg ${isDarkMode ? "bg-gray-700 border border-gray-600" : "bg-white border border-gray-200"
                        }`}
                >
                    {/* Project Image */}
                    <div className="relative h-48 overflow-hidden">
                        <img
                            src={project.image || "/placeholder.svg?height=200&width=300"}
                            alt={project.title}
                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                        {/* Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                        {/* Project Title Overlay */}
                        <div className="absolute bottom-4 left-4 right-4">
                            <h3 className="text-white text-xl font-bold mb-2 drop-shadow-lg">{project.title}</h3>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="p-6 flex flex-col justify-between h-[208px]">
                        <div className="flex justify-center gap-4">
                            <motion.a
                                href={project.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                whileHover={{ scale: 1.1, y: -2 }}
                                whileTap={{ scale: 0.95 }}
                                className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 ${isDarkMode
                                        ? "bg-gray-600 hover:bg-gray-500 text-white"
                                        : "bg-gray-100 hover:bg-gray-200 text-gray-800"
                                    } shadow-md hover:shadow-lg`}
                            >
                                <Github className="w-4 h-4" />
                                <span className="text-sm font-medium">Code</span>
                            </motion.a>

                            <motion.a
                                href={project.live}
                                target="_blank"
                                rel="noopener noreferrer"
                                whileHover={{ scale: 1.1, y: -2 }}
                                whileTap={{ scale: 0.95 }}
                                className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white transition-all duration-300 shadow-md hover:shadow-lg"
                            >
                                <ExternalLink className="w-4 h-4" />
                                <span className="text-sm font-medium">Live</span>
                            </motion.a>
                        </div>

                        {/* Flip Indicator */}
                        <div className="text-center mt-auto">
                            <p className={`text-xs ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
                                Click or hover to see details
                            </p>
                        </div>
                    </div>
                </div>

                {/* Back Side */}
                <div
                    className={`absolute inset-0 w-full h-full backface-hidden rotate-y-180 rounded-2xl overflow-hidden shadow-lg ${isDarkMode ? "bg-gray-700 border border-gray-600" : "bg-white border border-gray-200"
                        }`}
                >
                    <div className="p-6 h-full flex flex-col">
                        {/* Project Title */}
                        <h3 className={`text-xl font-bold mb-4 ${isDarkMode ? "text-white" : "text-gray-800"}`}>{project.title}</h3>

                        {/* Description */}
                        <div className="flex-1 mb-4">
                            <p className={`text-sm leading-relaxed ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>
                                {project.description}
                            </p>
                        </div>

                        {/* Tech Stack */}
                        <div className="space-y-3">
                            <h4 className={`text-sm font-semibold ${isDarkMode ? "text-purple-400" : "text-purple-600"}`}>
                                Technologies Used:
                            </h4>
                            <div className="flex flex-wrap gap-2">
                                {project.tech.map((tech, techIndex) => (
                                    <motion.span
                                        key={techIndex}
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: techIndex * 0.1, duration: 0.3 }}
                                        className={`px-3 py-1 rounded-full text-xs font-medium ${isDarkMode
                                                ? "bg-purple-900/50 text-purple-300 border border-purple-700/50"
                                                : "bg-purple-100 text-purple-700 border border-purple-200"
                                            }`}
                                    >
                                        {tech}
                                    </motion.span>
                                ))}
                            </div>
                        </div>

                        {/* Back Indicator */}
                        <div className="text-center mt-4">
                            <p className={`text-xs ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
                                Click or hover away to flip back
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    )
}
