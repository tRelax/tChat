import { useEffect, useState } from 'react'

import { BrowserRouter } from 'react-router-dom';
import { PossibleRoutes } from './common/PossibleRoutes';
import { NavbarCustom } from './components/NavbarCustom';
import { Sidebar } from 'primereact/sidebar';
import { SidebarComponent } from './components/navbar-components/SidebarComponent';

function App() {
  const [lightState, setLightState] = useState<boolean>(() => {
    const localValue = localStorage.getItem("STATE");
    if (localValue == null) return [];
    const currentState = JSON.parse(localValue);
    if (currentState) {
      setState();
    }
    return currentState;
  })

  const [sidebarState, setSidebarState] = useState(() => {
    const localValue = localStorage.getItem("SIDEBAR_STATE");
    if (localValue == null) return;
    const currentState = JSON.parse(localValue);
    return currentState;
  })
  
  useEffect(() => {
    localStorage.setItem("STATE", JSON.stringify(lightState))
  }, [lightState])

  useEffect(() => {
    localStorage.setItem("SIDEBAR_STATE", JSON.stringify(lightState))
  }, [sidebarState])

  function setState() {
    if (document.getElementById('mode-link')) {
        return;
    }
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'src/assets/theme.css';
    link.id = 'mode-link';
    document.head.appendChild(link);
}

  return (
    <>
      <BrowserRouter>
        <SidebarComponent lightState={lightState} setLightState={setLightState} />
        <PossibleRoutes />
      </BrowserRouter>
      
    </>
  )
}

export default App
