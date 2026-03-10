import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sun, Moon } from 'lucide-react'

const ThemeToggleBtn = ({ theme, setTheme }) => {
  const toggle = () => setTheme(theme === 'dark' ? 'light' : 'dark')

  return (
    <button
      onClick={toggle}
      className="relative flex items-center justify-center w-10 h-10 rounded-full bg-gray-100/80 hover:bg-gray-200/80 dark:bg-[#121A2A]/80 dark:hover:bg-[#1A253A]/80 border border-gray-200/50 dark:border-white/5 transition-colors overflow-hidden shrink-0 group cursor-pointer"
      aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
      title={theme === 'dark' ? 'Light mode' : 'Dark mode'}
    >
      <AnimatePresence mode="wait" initial={false}>
        {theme === 'light' ? (
          <motion.div
            key="light"
            initial={{ y: -30, opacity: 0, rotate: -45 }}
            animate={{ y: 0, opacity: 1, rotate: 0 }}
            exit={{ y: 30, opacity: 0, rotate: 45 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="absolute text-gray-700 group-hover:text-[#00C2D1] transition-colors"
          >
            <Sun className="w-5 h-5" strokeWidth={2.5} />
          </motion.div>
        ) : (
          <motion.div
            key="dark"
            initial={{ y: 30, opacity: 0, rotate: -45 }}
            animate={{ y: 0, opacity: 1, rotate: 0 }}
            exit={{ y: -30, opacity: 0, rotate: 45 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="absolute text-gray-300 group-hover:text-[#00C2D1] transition-colors"
          >
            <Moon className="w-5 h-5" strokeWidth={2.5} />
          </motion.div>
        )}
      </AnimatePresence>
    </button>
  )
}

export default ThemeToggleBtn
