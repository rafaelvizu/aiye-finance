import Router from './router'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import AuthProvider from './providers/auth-provider';


function App() {
  return (
    <>
        <AuthProvider>
          <Router />     
        </AuthProvider> 
    </>
  )
}

export default App
