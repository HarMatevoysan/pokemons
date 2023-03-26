import { BrowserRouter } from 'react-router-dom'
import AppRouter from './Component/AppRouter';

function App () {
   return (
      <BrowserRouter>
         <AppRouter />
      </BrowserRouter>
   );
}

export default App;