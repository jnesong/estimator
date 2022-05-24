//components
import NewIssue from './NewIssue'

//graphics
import logoE from './graphics/logoE.png'
//css
import { createTheme, ThemeProvider } from '@mui/material'
import './estimator.css'

const jenny = createTheme ( {
  typography: {
    fontFamily: "Mulish"
  }
} )

const App = () => {
  return (
    <ThemeProvider theme={jenny}>
      <div>
        <img className="logo" src={logoE} alt="logo in green" />
        <NewIssue />
      </div>
    </ThemeProvider>
  );
}

export default App;
