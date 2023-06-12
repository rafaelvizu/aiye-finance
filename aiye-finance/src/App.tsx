import Router from './router'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import AuthProvider from './providers/auth-provider';
import MainDataProvider from './providers/main-data-provider';


function App() {
  return (
    <>
        <AuthProvider>
          <MainDataProvider>
            <Router />   
          </MainDataProvider>  
        </AuthProvider> 
    </>
  )
}

export default App
