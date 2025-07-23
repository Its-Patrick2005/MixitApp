import "./global.css";
import Index from './index.jsx';
import { ThemeProvider } from './theme.jsx';

export default function RootLayout() {
  return (
    <ThemeProvider>
      <Index />
    </ThemeProvider>
  );
}
