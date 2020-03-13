import { NextPage } from 'next';
import Link from 'next/link';
import Section from '../components/Section';
import ThemeToggle from "./ThemeToggle";

interface HeaderProps {
  userAgent?: string;
  data?: Object;
}

const Header: NextPage<HeaderProps> = ({}) => {
  return (
    <header className="hidden lg:block">
      <Section>
        <div className="mt-10">
          <Link href="/">
            <a href="/">
              <img 
                src=""
                width="250"
              >
              </img>
            </a>
          </Link>
        </div>
        <div
          className="flex items-center justify-between pb-6 my-6 border-b-2 border-blue-400">
          <nav className="-ml-4">
            {[
              {
                route: `/`,
                title: `Dashboard`
              },
              {
                route: `/about`,
                title: `About`
              }
            ].map(link => (
              <Link key={link.route} href={link.route}>
                <a
                  className="px-4 py-2 mr-2 text-2xl rounded hover:bg-gray-300 dark-hover:bg-neutral-800"
                  key={link.title}
                  href={link.route}
                >
                  {link.title}
                </a>
              </Link>
            ))}
          </nav>
          <ThemeToggle />
        </div>
      </Section>
    </header>
  )
}

export default Header;