import { useState } from "react";
import Header from "./Component/Header";
import Dashboard from "./Pages/Dashboard";
import OrderHist from "./Pages/OrderHist";
import OrderLog from "./Pages/OrderLog";

function App()
{
  const [currentPage, setCurrentPage] = useState('Dashboard');

  const handleNavigation = (page) =>
  {
    setCurrentPage(page);
  };

  return(
    <div>
      <Header onNavigate={handleNavigation }/> {}
      <div className="content">
        {currentPage == 'Dashboard' && <Dashboard />}
        {currentPage == 'OrderHist' && <OrderHist />}
        {currentPage == 'OrderLog' && <OrderLog />}
      </div>
    </div>
  );
}

export default App