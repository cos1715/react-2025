import { ThemeProvider, CSSReset } from '@chakra-ui/core';
import { Global, css } from '@emotion/core';
import { AuthProvider } from '@/lib/auth';
import theme from '@/styles/theme';

const GlobalStyle = () => {
  return (
    <>
      <CSSReset />
      <Global
        styles={css`
          html {
            min-width: 360px;
            scroll-behavior: smooth;
          }
          #__next {
            display: flex;
            flex-direction: column;
            min-height: 100vh;
          }
        `}
      />
    </>
  );
};

const App = ({ Component, pageProps }) => {
  return (
    <ThemeProvider theme={theme as any}>
      <AuthProvider>
        <GlobalStyle />
        <Component {...pageProps} />
      </AuthProvider>
    </ThemeProvider>
  );
};
export default App;
