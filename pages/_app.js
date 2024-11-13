import { NextIntlClientProvider } from 'next-intl';
import { useRouter } from 'next/router';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  return (
    <NextIntlClientProvider
      messages={pageProps.messages}
      locale={router.locale}
      defaultLocale="en"
    >
      <Component {...pageProps} />
    </NextIntlClientProvider>
  );
}

export default MyApp;