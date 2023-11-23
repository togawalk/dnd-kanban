import KanbanBoard from './components/KanbanBoard'
import { DarkModeSwitch } from 'react-toggle-dark-mode'
import { createContext, useEffect, useState } from 'react'
import { AiFillGithub } from 'react-icons/ai'

export const ThemeContext = createContext(null)

function App() {
  const [isDarkMode, setDarkMode] = useState(
    localStorage.getItem('theme') === 'dark' ? true : false
  )
  console.log(isDarkMode)
  const htmlDoc = document.documentElement
  const darkQuerry = window.matchMedia('(prefers-color-scheme: dark)')

  const toggleDarkMode = (checked: boolean) => {
    setDarkMode(checked)
  }

  function onWindowMatch() {
    if (
      localStorage.theme === 'dark' ||
      (!('theme' in localStorage) && darkQuerry.matches)
    ) {
      htmlDoc.classList.add('dark')
      setDarkMode(true)
    } else {
      htmlDoc.classList.remove('dark')
      setDarkMode(false)
    }
  }

  onWindowMatch

  useEffect(() => {
    if (isDarkMode) {
      htmlDoc.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    } else {
      htmlDoc.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    }
  }, [isDarkMode])

  return (
    <div className="min-h-screen">
      <header className="flex h-16 items-center space-x-4 px-6 font-mono">
        <DarkModeSwitch
          checked={isDarkMode}
          onChange={toggleDarkMode}
          size={20}
          sunColor="rgb(17 24 39 / var(--tw-text-opacity))"
          moonColor="rgb(229 231 235 / var(--tw-text-opacity))"
        />

        <a
          href="https://github.com/togawalk/dnd-kanban"
          className="text-gray-900 dark:text-gray-200"
        >
          <AiFillGithub className="h-6 w-6" />
        </a>
      </header>
      <KanbanBoard />
    </div>
  )
}

export default App
