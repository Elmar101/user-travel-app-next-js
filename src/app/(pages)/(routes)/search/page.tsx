import React, { Suspense } from 'react'
import Search from './_components/Search'

const SearchPage = () => {
  return (
   <Suspense fallback={<div>Axtarış nəticələri yüklənir...</div>}>
      <Search/>
    </Suspense>
  )
}

export default SearchPage