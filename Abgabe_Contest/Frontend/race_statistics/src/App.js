
import './App.css';
import Past from './pages/Past';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link
} from 'react-router-dom';
import Welcome from './pages/Welcome'
import Future from './pages/Future';
import Button from '@mui/material/Button';
import SportsScoreIcon from '@mui/icons-material/SportsScore';
import HallOfFame from './pages/HallOfFame';

function App() {
  return (

    <Router>
    <div>
      <h1 style={{textAlign:'center'}}><SportsScoreIcon style={{fontSize : '30'}}/>Renn-Statistik <SportsScoreIcon style={{fontSize : '30'}}/></h1>
      <Routes>
        <Route path="/" element={<Welcome/>}/>
        <Route path="Past" element={<Past/>}/>
        <Route path="Future" element={<Future/>}/>
        <Route path="HallOfFame" element={<HallOfFame/>}/>
        <Route path="*" element={
          <main style={{ padding: "1rem" }}>
            <p>Error 404 Page not found!</p>
            <Button component={Link} to='/' variant='contained'>Return</Button>
          </main>
        }/>
      </Routes>
    </div>
  </Router>
  );
}
export default App;
