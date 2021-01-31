import {ApolloProvider} from "@apollo/client"
import {useApollo}  from 'src/apolloClient';
import { ThemeProvider } from "@material-ui/core/styles"
import theme from "../styles/themes";
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  const client = useApollo();

  return (
    <ThemeProvider theme={theme}>
    <ApolloProvider client={client}>
      <Component {...pageProps} />
    </ApolloProvider>
    </ThemeProvider>
  )
}

export default MyApp
