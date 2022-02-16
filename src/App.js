import logo from './logo.svg';
import './App.css';

import Stack from '@mui/material/Stack';

import Button from './components/Button'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Build pipeline on github repo. Test 2.
        </p>
        <Stack spacing={2} direction="row">
          <Button variant="text">Text</Button>
          <Button variant="contained">Contained</Button>
          <Button variant="outlined">Outlined</Button>
        </Stack>
      </header>
    </div>
  );
}

export default App;
