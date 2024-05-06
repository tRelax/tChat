import {useEffect, useState} from 'react'

import {BrowserRouter} from 'react-router-dom';
import {PossibleRoutes} from './common/PossibleRoutes';
import {SidebarComponent} from './components/navbar-components/SidebarComponent';
import {SidebarComponent2} from "./components/SidebarComponent2";
import {MainLayout} from "./components/MainLayout";

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
  
  useEffect(() => {
    localStorage.setItem("STATE", JSON.stringify(lightState))
  }, [lightState])


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
        <MainLayout lightState={lightState} setLightState={setLightState}/>
        {/*<SidebarComponent lightState={lightState} setLightState={setLightState}/>*/}
      </BrowserRouter>
      
    </>
  )
}

export default App
