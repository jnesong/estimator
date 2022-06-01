//components
import Landing from './Landing';
//graphics
import logoE from './graphics/logoE.png';
//css
import { createTheme, ThemeProvider } from '@mui/material';
import './estimator.css';

const jenny = createTheme({

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
    <ThemeProvider theme={jenny}>
      <div>
        <img className="logo" src={logoE} alt="logo in green" />
        <Landing />
      </div>
    </ThemeProvider>
  );
}

export default App;
