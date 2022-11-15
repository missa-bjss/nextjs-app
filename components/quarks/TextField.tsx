import { DetailedHTMLProps, InputHTMLAttributes } from 'react'
import classNames from './TextField.module.css'

export default function TextField({
  className,
  ...rest
}: DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, any>) {
  return <input className={classNames.field} {...rest} />
}
