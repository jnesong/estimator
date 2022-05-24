//components
import NewIssue from './NewIssue'

//graphics
import logoE from './graphics/logoE.png'
//css
import './estimator.css'

const App = () => {
  return (
    <div>

      <img className="logo" src={logoE} alt="logo in green" />
      <NewIssue />
    </div>
  );
}

export default App;
