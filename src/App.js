import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; //指定コンポーネントに遷移するために追加（Top⇒リンククリック⇒Report）
import Header from "./components/Header"
import Top from "./pages/Top"
import Report from './pages/Report';
import './styles/Common.module.css'

function App() {
  return (
    <>
      <Header />
      <Router>
        <Routes>
          <Route path="/" element={<Top />} /> {/* Topページのルート */}
          <Route path="/report/:id" element={<Report />} /> {/* Reportページのルート */}
        </Routes>
      </Router>
    </>
  );
}

export default App;
