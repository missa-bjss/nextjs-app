import classNames from './RoundImage.module.css'
import cx from 'classnames'
import { DetailedHTMLProps, ImgHTMLAttributes } from 'react'

export interface RoundImageProps
  extends DetailedHTMLProps<ImgHTMLAttributes<HTMLImageElement>, any> {
  className?: string
}

export default function RoundImage({
  className,
  alt,
  ...rest
}: RoundImageProps) {
  return (
    <img
      className={cx(classNames.image, className)}
      draggable={false}
      alt={alt}
      {...rest}
    />
  )
}
