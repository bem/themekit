import React, { FC } from 'react'
import './Tabs.css'

export const Tabs: FC<any> = ({ active, tabs, onChange }) => {
  return (
    <div className="Tabs">
      {tabs.map((tab: any, idx: any) => (
        <div
          key={idx}
          className="Tabs-Tab"
          onClick={() => onChange(tab)}
          data-active={active === tab}
        >
          {tab}
        </div>
      ))}
    </div>
  )
}
