import { Analytics } from '@vercel/analytics/react';
import './App.css';
import Page from './components/layout/Page';
import './styles/index.sass';

function App() {
  return (
    <>
      <Page />
      <Analytics />
    </>
  );
}

export default App;
