import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'


function PublicRoutes({children}) {
  const navigate = useNavigate();

  useEffect(()=>{
    if(localStorage.getItem('token')){
      navigate('/dashboard')
    }
    else{
      navigate('/')
    }
  })

  return (
    <div>
        {children}
    </div>
  )
}

export default PublicRoutes