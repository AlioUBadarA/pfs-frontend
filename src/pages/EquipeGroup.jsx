import { useState } from 'react'
import PageTabs from '../components/PageTabs'
import Equipe from './Equipe'
import Emplois from './Emplois'

const TABS = [
  { key: 'vendeurs', label: 'Vendeurs' },
  { key: 'emplois',  label: 'Emplois' },
]

export default function EquipeGroup() {
  const [active, setActive] = useState('vendeurs')
  return (
    <div>
      <PageTabs tabs={TABS} active={active} setActive={setActive} />
      {active === 'vendeurs' && <Equipe />}
      {active === 'emplois'  && <Emplois />}
    </div>
  )
}
