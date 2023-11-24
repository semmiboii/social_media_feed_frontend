import { Outlet } from 'react-router-dom'
import Nav from './nav'

import './root.scss'

export default function Root() {
  return (
    <div className='root_wrapper'>
          <div className="root">
               <div className="body">
                    <Outlet/>
               </div>
               <div className="footer">
                    <Nav/>
               </div>
          </div>
    </div>
  )
}
