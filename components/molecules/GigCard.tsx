import classNames from './GigCard.module.css'
import cx from 'classnames'
import Button from '../quarks/Button'
import dayjs from 'dayjs'
import dayjsUtc from 'dayjs/plugin/utc'
import dayjsDuration from 'dayjs/plugin/duration'
import dayjsRelativeTime from 'dayjs/plugin/relativeTime'
import { Gig } from '../../store/appState'

dayjs.extend(dayjsUtc)
dayjs.extend(dayjsDuration)
dayjs.extend(dayjsRelativeTime)

export interface GigCardProps {
  gig?: Gig
  className?: string
  onActionClicked?: (gig: Gig) => void
  ownEmailAddress?: string
  disabled?: boolean
}

export default function GigCard({
  className,
  gig,
  onActionClicked,
  ownEmailAddress,
  disabled,
}: GigCardProps) {
  if (!gig) {
    return (
      <li className={cx(classNames.main, classNames.loading, className)}>
        <div className={classNames.placeholderTitle}>&nbsp;</div>
        <div className={classNames.placeholderDuration}>&nbsp;</div>
        <div className={classNames.placeholderAddress}>&nbsp;</div>
        <div className={classNames.bottomBar}>
          <Button className={classNames.button} disabled>
            &nbsp;
          </Button>
        </div>
      </li>
    )
  }

  let variant: 'green' | 'red' | undefined
  let copy: string | undefined
  let interactive = true

  if (gig.status === 'Available') {
    variant = 'green'
    copy = 'Request Gig'
  } else if (gig.claimedUserMail === ownEmailAddress) {
    variant = 'red'
    copy = 'Cancel Gig'
  } else {
    copy = 'Filled'
    interactive = false
  }

  return (
    <li className={cx(classNames.main, className)}>
      <div className={classNames.title}>{gig.name}</div>
      <div className={classNames.duration}>
        {dayjs
          .duration(
            dayjs.utc(gig.endTimestamp).diff(dayjs.utc(gig.startTimestamp))
          )
          .asHours()}{' '}
        hours
      </div>
      <div className={classNames.address}>{gig.address}</div>
      <img
        className={classNames.thumbnail}
        src={gig.thumbnailImageUrl}
        alt={gig.companyName}
        draggable={false}
      />
      <div className={classNames.bottomBar}>
        <Button
          className={classNames.button}
          variant={variant}
          onClick={() => onActionClicked?.(gig)}
          disabled={disabled || !interactive}
        >
          {copy}
        </Button>
      </div>
    </li>
  )
}
