//components
import Landing from './Landing';
//graphics
import logoE from './graphics/logoE.png';
import filler from './graphics/filler.gif';
//css
import { createTheme, ThemeProvider } from '@mui/material';
import './estimator.css';

const estimator = createTheme({

  //10 lines - customizing material UI palette and text
  palette: {
    warning: {
      main: '#f5b942'
    },
    info: {
      main: '#0d3678'
    }
  },
  typography: {
    fontFamily: "Mulish",
    fontSize: 12
  }
});

const App = () => {
  return (
    <ThemeProvider theme={estimator}>
      <div>
        <img className="logo" src={filler} alt="© GUILLAUME KURKDJIAN 2020" />
        <Landing />
      </div>
    </ThemeProvider>
  );
}

export default App;
