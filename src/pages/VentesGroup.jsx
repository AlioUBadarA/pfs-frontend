import { useState } from 'react'
import PageTabs from '../components/PageTabs'
import Ventes from './Ventes'
import Creances from './Creances'
import Rentabilite from './Rentabilite'

const TABS = [
  { key: 'ventes',      label: 'Journal des ventes' },
  { key: 'creances',    label: 'Créances' },
  { key: 'rentabilite', label: 'Rentabilité' },
]

export default function VentesGroup() {
  const [active, setActive] = useState('ventes')
  return (
    <div>
      <PageTabs tabs={TABS} active={active} setActive={setActive} />
      {active === 'ventes'      && <Ventes />}
      {active === 'creances'    && <Creances />}
      {active === 'rentabilite' && <Rentabilite />}
    </div>
  )
}
