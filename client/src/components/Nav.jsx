import React from 'react'
import { Link } from 'react-router-dom'
function Nav() {
  return (
    <div className="nav-container">
        <ul>
            <Link to='/'><li>หน้าหลัก</li></Link>
            <Link to='/earn'><li>รายรับ</li></Link>
            <Link to='/pay'><li>รายจ่าย</li></Link>
            <Link to='/form'><li>บันทีกรายการ</li></Link>
        </ul>
    </div>
  )
}

export default Nav