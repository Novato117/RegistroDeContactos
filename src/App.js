import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import './App.css';
import AddEdit from './pages/AddEdits';
import View from './pages/View'
function App() {
  return (
    <BrowserRouter>
      <div className="App">
        {/*<h1>hola mundo</h1>*/}
        <ToastContainer position='top-center' />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/addContact" element={<AddEdit />} />
          <Route path="/update/:id" element={<AddEdit />} />
          <Route path='/view/:id' element={<View />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
