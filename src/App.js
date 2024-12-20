import { BrowserRouter, Route, Routes } from 'react-router-dom'
import AssetsPage from './pages/assets-page'
import './App.css'

function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={<AssetsPage />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App