'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { Sun, Moon } from 'lucide-react'
import { useTheme } from '@/context/ThemeContext'

export const ThemeToggle = () => {
    const { theme, toggleTheme } = useTheme()

    return (
        <button
            onClick={toggleTheme}
            className="relative p-2 rounded-full bg-secondary hover:bg-accent transition-colors duration-200"
            aria-label="Toggle theme"
        >
            <AnimatePresence mode="wait" initial={false}>
                <motion.div
                    key={theme}
                    initial={{ y: -20, opacity: 0, rotate: -90 }}
                    animate={{ y: 0, opacity: 1, rotate: 0 }}
                    exit={{ y: 20, opacity: 0, rotate: 90 }}
                    transition={{ duration: 0.2, ease: "easeInOut" }}
                    className="flex items-center justify-center text-foreground"
                >
                    {theme === 'light' ? (
                        <Moon size={20} strokeWidth={2.5} />
                    ) : (
                        <Sun size={20} strokeWidth={2.5} />
                    )}
                </motion.div>
            </AnimatePresence>
        </button>
    )
}
