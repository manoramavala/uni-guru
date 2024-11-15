import './App.css';
import './index.css';
import StarsCanvas from '../main/StarBackground'; 
import Home from './component/Home.tsx'; 
import Navigation from './component/Navigation.tsx';
import Loginbox from './component/loginbox.tsx';
import Signupbox from './component/Signupbox.tsx';

const App: React.FC = () => {

  return (
    <>
      <div className='body' style={{backgroundColor:"#1B0725",height:"100vh",width:"100vw"}}>
        <div >
          <Navigation/>
          <Home />
          <Loginbox/>
          <Signupbox/>
          <StarsCanvas />
        </div>
      </div>
    </>
  );
}
// className="w-screen min-h-screen relative"
// className="h-screen overflow-y-auto"
export default App;
