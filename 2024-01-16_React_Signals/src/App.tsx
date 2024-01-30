import "./App.css";
import { LiveDashboard } from "./LiveDashboard";
import { Nav } from "./Nav";
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

function App() {
  return (
    <div className="App">
      <Nav></Nav>
      <LiveDashboard></LiveDashboard>
    </div>
  );
}

export default App;
