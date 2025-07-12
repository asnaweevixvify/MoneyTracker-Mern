import './App.css'
import { Route , Routes } from 'react-router-dom'
import Home from './components/Home'
import Nav from './components/Nav'
import Form from './components/Form'
import Earn from './components/Earn'
import Pay from './components/Pay'
import Edit from './components/Edit'
import Login from './components/Login'

function App() {

  return (
    <div className='body'>
      <Nav/>
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/form' element={<Form/>}></Route>
        <Route path='/earn' element={<Earn/>}></Route>
        <Route path='/pay' element={<Pay/>}></Route>
        <Route path='/edit/:id' element={<Edit/>}></Route>
        <Route path='/login' element={<Login/>}></Route>
      </Routes>
    </div>
  )
}

export default App
