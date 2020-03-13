import App from 'next/app';
import * as React from 'react';

import '../styles/tailwind.css';

interface AppState {
  // state variables types go here
}

class MyApp extends App<{}, {}, AppState> {
  componentDidMount() {
    //detect dark mode and enable tailwindcss-dark-mode
    const isDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)');
    const htmlSelector = document.querySelector("html");
  
    if (!isDark.matches) {
      window.localStorage.setItem('THEME', 'light');
      htmlSelector?.classList.remove('mode-dark');
    }
    else {
      window.localStorage.setItem('THEME', 'dark');
      htmlSelector?.classList.add('mode-dark');
    }
  }

  render() {
    const { Component, pageProps } = this.props;
    return (
      <Component {...pageProps} />
    );
  }
}
  
export default MyApp;