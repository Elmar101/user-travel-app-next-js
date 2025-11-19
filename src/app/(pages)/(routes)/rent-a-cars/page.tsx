import React, { Suspense } from 'react'
import RentaCarList from './_components/RentaCarList';


const RentaCarPage = () => {
  return (
     <Suspense fallback={<div>Yüklənir...</div>}>
        <RentaCarList/>
      </Suspense>
  )
}

export default RentaCarPage;

