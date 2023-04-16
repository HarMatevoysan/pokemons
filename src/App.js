import { BrowserRouter } from 'react-router-dom'
import { AppRouter } from './components/index'

const App = () => {
   return (
      <BrowserRouter>
         <AppRouter />
      </BrowserRouter>
   );
}

export default App;
