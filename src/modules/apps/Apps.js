import React, {useState, useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { 
  setAllAppsModule
} from '../../redux/slices/appsSlice.js'

import AllApps from './modules/AllApps.js'
import App from './modules/App.js'

const Apps = () => {

  const dispatch = useDispatch()
  
  const currentModule = useSelector(state=>state.apps.allAppsModule)

  const allAppsModules = [
    {id: "1", name:"AllApps", label: "App Apps", icon: "app_icon.png", component: <AllApps/>},
    {id: "2", name:"App", label: "App", icon: "app_icon.png", component: <App/>}
  ]

  useEffect(()=>{
    dispatch(setAllAppsModule("AllApps"))
  },[])

  const pageStyle ={
    height:"100%", 
    width:"100%",
  }

   
  return (
    <div className="d-flex w-100 p-3 flex-column fade-in me-5 fade-in" style={pageStyle}>
      {allAppsModules.find(i=>i.name===currentModule).component}
    </div>
  )
}

export default Apps