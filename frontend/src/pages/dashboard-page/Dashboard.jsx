import React from 'react'
import CustomCard from '../../components/custom-card-component/CustomCard'
import "./dashboard.css"

function Dashboard() {
  return (
    <>
    <div className='card-layout'>
        <CustomCard title="Total Tickets" value="100"/>
        <CustomCard title="Open Ticket" value="97"/>
        <CustomCard title="Resolved Tickets" value="3"/>
    </div>
    </>
  )
}

export default Dashboard