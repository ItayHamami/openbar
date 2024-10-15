import logo from './logo.svg';
import './App.css';
import Home from './components/Home';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import CocktailModal from './components/CocktailModal';


function App() {
  return (
    <div className="App">
      <div className='container-fluid'>
      <Home/>
      <CocktailModal/>
      </div>

    </div>
  );
}

export default App;
