import { BrowserRouter } from 'react-router-dom'
// import AppRouter from './Component/AppRouter';
// import AppRouter from './component/AppRouter';
import { AppRouter } from './component/index'

function App () {
   return (
      <BrowserRouter>
         <AppRouter />
      </BrowserRouter>
   );
}

export default App;
