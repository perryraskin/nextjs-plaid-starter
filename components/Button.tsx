import { NextPage } from 'next';

interface ButtonProps {
  text: string;
  icon: any;
  to: string;
  extend: string;
}

const Button: NextPage<ButtonProps> = ({
  text,
  icon,
  to,
  extend
}) => {
  return (
    <a
      href={to}
      className={`inline-flex items-center justify-center py-3 px-6 rounded-lg font-bold text-xl h-full ${extend} `}
      >
      <div className={icon ? `mr-0 h-6 w-6` : ""}>{icon}</div>
      {text}
    </a>
  )
}

export default Button;