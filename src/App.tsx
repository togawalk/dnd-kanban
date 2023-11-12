import KanbanBoard from './components/KanbanBoard'
import { DarkModeSwitch } from 'react-toggle-dark-mode'
import { createContext, useEffect, useState } from 'react'

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
    <div className="flex min-h-screen flex-col gap-4 p-4">
      <header className="h-16 rounded-md border-4 border-gray-300 bg-gray-200 font-mono dark:border-secondary dark:bg-background">
        <div className="flex h-full items-center justify-between px-6">
          <div className="font-bold uppercase">dnd-kanban</div>
          <DarkModeSwitch
            checked={isDarkMode}
            onChange={toggleDarkMode}
            size={20}
          />
        </div>
      </header>
      <KanbanBoard />
    </div>
  )
}

export default App
