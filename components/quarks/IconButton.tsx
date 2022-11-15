import classNames from './IconButton.module.css'
import cx from 'classnames'
import { ButtonHTMLAttributes, DetailedHTMLProps } from 'react'

export interface IconButtonProps
  extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, any> {
  className?: string
}

export default function IconButton({
  className,
  children,
  ...rest
}: IconButtonProps) {
  return (
    <button className={cx(classNames.button, className)} {...rest}>
      {children}
    </button>
  )
}
