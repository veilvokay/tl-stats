import React, { FC } from 'react';
import './Button.sass';

interface ButtonProps extends React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
    title: string,
    btnStyle: 'normal' | 'square',
    btnClass?: string,
}

const Button: FC<ButtonProps> = ({title, btnClass, btnStyle, ...rest}) => {
  return (
    <button 
        className={`button ${btnClass ?? ''} ${btnStyle ?? ''}`}
        {...rest}
    >
        {title}
    </button>
  )
}

export default Button