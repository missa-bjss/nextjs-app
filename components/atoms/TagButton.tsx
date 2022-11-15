import classNames from './TagButton.module.css'
import cx from 'classnames'
import { IoClose } from 'react-icons/io5'

export interface TagButtonProps {
  className?: string
  title: string
  value?: string
  onDelete?: (value?: string) => void
}

export default function TagButton({
  className,
  title,
  value,
  onDelete,
}: TagButtonProps) {
  return (
    <div className={cx(classNames.main, className)}>
      <button
        className={classNames.deleteButton}
        onClick={() => onDelete?.(value)}
      >
        <IoClose />
      </button>
      <span className={classNames.title}>{title}</span>
    </div>
  )
}
