import KanbanBoard from './components/KanbanBoard'
import { DarkModeSwitch } from 'react-toggle-dark-mode'
import { createContext, useEffect, useState } from 'react'

export const ThemeContext = createContext(null)

function App() {
  const [isDarkMode, setDarkMode] = useState(true)
  const htmlDoc = document.documentElement

  const toggleDarkMode = (checked: boolean) => {
    setDarkMode(checked)
  }

  useEffect(() => {
    if (isDarkMode) {
      htmlDoc.classList.add('dark')
    } else {
      htmlDoc.classList.remove('dark')
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
