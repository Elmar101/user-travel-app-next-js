import React, { Suspense } from 'react'
import TripList from './_components/TripList'

const TripsPage = () => {
  return (
    <div>
      <Suspense fallback={<div>Yüklənir...</div>}>
        <TripList/>
      </Suspense>
    </div>
  )
}

export default TripsPage;