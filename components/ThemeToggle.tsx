import { NextPage } from 'next';
import { Moon, Sun } from "react-feather";

interface ThemeToggleProps {
  userAgent?: string;
  data?: Object;
}

const ThemeToggle: NextPage<ThemeToggleProps> = ({}) => {
  var setTheme = (theme: string): void => {
    const htmlSelector = document.querySelector("html");

    if (theme === 'light') {
      window.localStorage.setItem('THEME', 'light');
      htmlSelector?.classList.remove('mode-dark');
    }
    else {
      window.localStorage.setItem('THEME', 'dark');
      htmlSelector?.classList.add('mode-dark');
    }
  }
  return (
    <div className="leading-0">
      <button
        className="focus:outline-none dark:hidden"
        title="Set dark theme"
        onClick={() => setTheme("dark")}
      >
        <Moon className="w-8 dark:hidden" />
      </button>
      <button
        className="focus:outline-none hidden dark:block"
        title="Set light theme"
        onClick={() => setTheme("light")}
      >
        <Sun className="w-8 " />
      </button>
    </div>
  )
}

ThemeToggle.getInitialProps = async ctx => {
  const { req } = ctx;

  const userAgent = req ? req.headers['user-agent'] || '' : navigator.userAgent;
  return { userAgent }
};

export default ThemeToggle;