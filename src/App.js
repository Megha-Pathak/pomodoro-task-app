import Navbar from "./components/Navbar";
import { Router } from "./Router";

function App() {
  return (
    <div className="bg-slate-800 min-h-screen">
      <Navbar />
      <Router />
    </div>
  );
}

export default App;
