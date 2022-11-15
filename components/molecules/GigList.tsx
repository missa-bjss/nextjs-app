import { PropsWithChildren } from 'react'
import { Gig } from '../../store/appState'
import GigCard from './GigCard'
import classNames from './GigList.module.css'

export interface GigListProps extends PropsWithChildren {
  className: string
  title: string
  gigs: Gig[]
  loading: boolean
  onActionClicked?: (gig: Gig) => void
  ownEmailAddress?: string
  disabled?: boolean
}

export default function GigList({
  className,
  title,
  gigs,
  loading,
  children,
  onActionClicked,
  ownEmailAddress,
  disabled,
}: GigListProps) {
  return (
    <>
      {loading && (
        <section className={className}>
          <div className={classNames.title}>
            <span className={classNames.titleContent}>{title}</span>
            {children}
          </div>
          <ul className={classNames.list}>
            <GigCard className={classNames.item} />
            <GigCard className={classNames.item} />
            <GigCard className={classNames.item} />
            <GigCard className={classNames.item} />
            <GigCard className={classNames.item} />
            <GigCard className={classNames.item} />
          </ul>
        </section>
      )}
      {!loading && gigs && gigs.length > 0 && (
        <section className={className}>
          <div className={classNames.title}>
            <span className={classNames.titleContent}>{title}</span>
            {children}
          </div>
          <ul className={classNames.list}>
            {(gigs ?? []).map((gig) => (
              <GigCard
                className={classNames.item}
                key={gig.id}
                gig={gig}
                onActionClicked={(gig) => onActionClicked && onActionClicked(gig)}
                ownEmailAddress={ownEmailAddress}
                disabled={disabled}
              />
            ))}
          </ul>
        </section>
      )}
    </>
  )
}
