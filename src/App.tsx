import { useEffect, useState } from 'react'
import MainPage from './features/main/page'
import Preloader from './components/ui/preloader'
import { useProfile } from './hooks/useProfile'
import { useSettings } from './hooks/useSettings'

function App() {
  const { isLoading } = useProfile({ order: undefined })
  const { isLoading: settingsLoading } = useSettings()
  const [isReady, setIsReady] = useState(false)
  const [minLoaderFinished, setMinLoaderFinished] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setMinLoaderFinished(true)
    }, 2000)
    return () => clearTimeout(timer)
  }, [])

  const showLoader = isLoading || settingsLoading || !minLoaderFinished


  return (
    <>
      <Preloader isLoading={showLoader} onExitComplete={() => setIsReady(true)} />
      <MainPage isReady={isReady} />
    </>
  )
}

export default App
