import { useState } from 'react'
import PageTabs from '../components/PageTabs'
import Pilotage from './Pilotage'
import Forecast from './Forecast'
import Actions from './Actions'
import Argumentaire from './Argumentaire'

const TABS = [
  { key: 'planning',    label: 'Planning semaine' },
  { key: 'forecast',    label: 'Forecast' },
  { key: 'actions',     label: 'Actions' },
  { key: 'argumentaire',label: 'Argumentaire' },
]

export default function PilotageGroup() {
  const [active, setActive] = useState('planning')
  return (
    <div>
      <PageTabs tabs={TABS} active={active} setActive={setActive} />
      {active === 'planning'     && <Pilotage />}
      {active === 'forecast'     && <Forecast />}
      {active === 'actions'      && <Actions />}
      {active === 'argumentaire' && <Argumentaire />}
    </div>
  )
}
