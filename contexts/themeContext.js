import React, {createContext, useContext, useState} from "react";

//creation du context
const ThemeContext = createContext();

//Fournisseur de context
export const ThemeProvider = ({ children })=>{

    // etat pour le basculement
    const [stateModeChange, setStateModeChange] = useState(false);

    //fonction pour casculer le mode
    const toggleModeChange = () => {
      setStateModeChange((prevState) => !prevState);
    };

    return(
        <ThemeContext.Provider value={{stateModeChange, toggleModeChange}}>
            {children}
        </ThemeContext.Provider>
    )
}
//ici je personalise le Hook et je lexporte pour l'utiliser dans d'autres pages
const useTheme = () => useContext(ThemeContext);
export default useTheme;

