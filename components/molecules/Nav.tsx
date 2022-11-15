import RoundImage from '../quarks/RoundImage'
import classNames from './Nav.module.css'
import md5 from 'blueimp-md5'
import { PropsWithChildren } from 'react'

export interface NavProps extends PropsWithChildren {
  emailAddress?: string
}

export default function Nav({ emailAddress, children }: NavProps) {
  return (
    <nav className={classNames.main}>
      {!emailAddress && <div className={classNames.field} />}
      {!!emailAddress && <div className={classNames.field}>{children}</div>}
      <div className={classNames.logo} />
      {!emailAddress && <div className={classNames.avatar} />}
      {!!emailAddress && (
        <RoundImage
          className={classNames.avatar}
          src={`http://www.gravatar.com/avatar/${md5(emailAddress)}`}
        />
      )}
    </nav>
  )
}
