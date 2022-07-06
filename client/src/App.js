import { Routes, Route } from 'react-router-dom';
import Home from './Components/home';
import Landing from './Components/landing';
import DogForm from './Components/dogForm';
import Details from './Components/details';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path='/' element={<Landing/>}/>
        <Route exact path='/dogs' element={<Home/>}/>
        <Route path='/dogs/:id' element={<Details/>}/>
        <Route exact path='/dog' element={<DogForm/>}/>
      </Routes>
    </div>
  );
}

export default App;
