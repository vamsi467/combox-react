import React from 'react'
import Icon from '../icon/Icon'
interface BadgeProps {
  label: string
  close: (e: any) => void
}
const Badge = ({ label, close }: BadgeProps): JSX.Element => {
  return (
        <div >
            <span>{label}</span>
            <button
                onClick={close}
                className="close"
            >
                <Icon icon="close" />
            </button>
        </div>
  )
}
export default Badge
