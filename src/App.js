import { Header } from "./components/Header"
import { Top } from "./pages/Top"
import { Detail } from './pages/Detail'
import { Contact } from './pages/Contact'
import { Routes, Route } from 'react-router-dom'

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Top />} />
        <Route path="/posts/:id" element={<Detail />} /> {/* :idの「:」はプレースホルダ（動的パラメータ） idという変数がURLに含まれていることを意味する*/}
        <Route path="/contact" element={<Contact />} /> {/* URLが/contactのときContactというコンポーネントを表示する */}
      </Routes>
    </>
  );
}

export default App;
