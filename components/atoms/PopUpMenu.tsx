import classNames from './PopUpMenu.module.css'
import cx from 'classnames'
import { useState } from 'react'

export interface PopUpMenuItem {
  title: string
  value?: string
}

export interface PopUpMenuProps {
  prompt: string
  className?: string
  items?: PopUpMenuItem[]
  onSelect?: (value?: string) => void
}

export default function PopUpMenu({
  prompt,
  className,
  items,
  onSelect,
}: PopUpMenuProps) {
  const [selectedItem, setSelectedItem] = useState<string>()

  return (
    <div
      className={cx(className, classNames.main, {
        [classNames.itemSelected]: !!selectedItem,
      })}
    >
      <span aria-hidden={!!selectedItem}>{prompt}</span>
      <select
        className={classNames.select}
        onChange={(e) => {
          setSelectedItem(e.target.value)
          onSelect?.(e.target.value)
        }}
      >
        <option value={undefined}></option>
        {(items || []).map(({ title, value }) => (
          <option key={value} value={value}>
            {title}
          </option>
        ))}
      </select>
    </div>
  )
}
