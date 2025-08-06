import React from 'react'
import { Routes, Route } from 'react-router-dom'; //指定コンポーネントに遷移するために追加（Top⇒リンククリック⇒Report）
import Header from "./components/Header"
import Top from "./pages/Top"
import Report from './pages/Report';
import './styles/Common.css'

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Top />} /> {/* Topページのルート */}
        <Route path="/report/:id" element={<Report />} /> {/* Reportページのルート */}
      </Routes>
    </>
  );
}

export default App;
