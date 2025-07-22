import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
//import AuthStack from './navigation/AuthStack';
import AppDrawer from './navigation/DrawerNavigator';
import { DrawerProvider } from './context/DrawerContext';

export const AuthContext = React.createContext(); // Para compartir estado

export default function App() {
  //const [isAuthenticated, setIsAuthenticated] = useState(false);  Estado global
  /*
      Esto es para cuando se vaya a hacer la autentificacion
      por ahora es inutl asi que no la usaremos
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}> 
      isAuthenticated ? <TabNavigator /> : <AuthStack />
    </AuthContext.Provider> 
  */
  return (
    <DrawerProvider>
      <NavigationContainer>
        <AppDrawer />
      </NavigationContainer>
    </DrawerProvider>
  );
}
