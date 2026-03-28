import '@radix-ui/themes/styles.css';
import './index.css';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Theme } from '@radix-ui/themes';
import App from '../components/App.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Theme
      accentColor="blue"
      appearance="dark"
      grayColor="sand"
      hasBackground={false}
      panelBackground="solid"
      radius="large"
      scaling="100%"
    >
      <App />
    </Theme>
  </StrictMode>,
);
