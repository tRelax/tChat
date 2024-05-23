import {useEffect, useState} from 'react'

import {BrowserRouter} from 'react-router-dom';
import {MainLayout} from "./components/MainLayout";
import {AuthContextProvider} from "./context/Auth/AuthContext";

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
        <AuthContextProvider>
            <MainLayout lightState={lightState} setLightState={setLightState}/>
        </AuthContextProvider>
        {/*<SidebarComponent lightState={lightState} setLightState={setLightState}/>*/}
      </BrowserRouter>
      
    </>
  )
}

export default App
