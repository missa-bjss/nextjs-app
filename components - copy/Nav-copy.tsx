import classNames from './Nav.module.css'
import md5 from 'blueimp-md5'

const emailAddress = "thomas.lyver@bjss.com"

export default function Nav() {
    return (
      <nav className={classNames.main}>
        {!emailAddress && <div className={classNames.field} />}
        {!!emailAddress && <div className={classNames.field}></div>}
        <div className={classNames.logo} />
        {!emailAddress && <div className={classNames.avatar} />}
        {!!emailAddress && (
          <img
            // className={cx(classNames.image, className)}
            draggable={false}
            // alt={alt}
            src={`http://www.gravatar.com/avatar/${md5(emailAddress)}`}
          />
        )}
      </nav>
    )
  }