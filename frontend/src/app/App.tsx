import { BrowserRouter as Router } from 'react-router-dom'
import { AppProviders } from './providers'
import AppRouter from './router'
import './App.scss'

function App() {
  return (
    <AppProviders>
      <Router>
        <div className="App">
          <AppRouter />
        </div>
      </Router>
    </AppProviders>
  )
}

export default App

