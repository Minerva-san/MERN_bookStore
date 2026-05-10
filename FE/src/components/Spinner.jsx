import React from 'react'

const Spinner = () => {
  return (
    <div className='flex justify-center items-center h-screen'>
      <div className='animate-spin rounded-full h-20 w-20 border-t-2 border-b-2 border-sky-500'></div>
    </div>
  )
}

export default Spinner