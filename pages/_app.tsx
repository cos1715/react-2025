import { ThemeProvider } from '@chakra-ui/core';
import { AuthProvider } from '../lib/auth';
import theme from '../styles/theme';

const App = ({ Component, pageProps }) => {
  return (
    <ThemeProvider theme={theme as any}>
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </ThemeProvider>
  );
};
export default App;
