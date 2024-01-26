import "../styles/globals.css"
import { useEffect } from 'react';
import BookmarksProvider from '../components/Context/BookmarkContext'

export default function App({ Component, pageProps }) {
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', function() {
        navigator.serviceWorker.register('/service-worker.js').then(
          function(registration) {
            // Registration was successful
            console.log('ServiceWorker registration successful with scope: ', registration.scope);
          },
          function(err) {
            // registration failed :(
            console.log('ServiceWorker registration failed: ', err);
          }
        );
      });
    }
  }, []);

  return (
    <BookmarksProvider>
      <Component {...pageProps} />
    </BookmarksProvider>
  );
}
