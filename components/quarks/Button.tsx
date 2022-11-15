import classNames from './Button.module.css'
import cx from 'classnames'
import { ButtonHTMLAttributes, DetailedHTMLProps } from 'react'

export interface ButtonProps
  extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, any> {
  variant?: 'green' | 'red'
}

export default function Button({
  variant,
  className,
  children,
  ...rest
}: ButtonProps) {
  return (
    <button
      className={cx(
        className,
        classNames.button,
        { [classNames.red]: variant === 'red' },
        { [classNames.green]: variant === 'green' }
      )}
      {...rest}
    >
      {children}
    </button>
  )
}
