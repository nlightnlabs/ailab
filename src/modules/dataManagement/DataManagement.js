import React, {useState, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { 
  setModule,
  setShowUploadDocumentsForm,
  setShowConnectApiForm,
  setShowConnectDatabaseForm
} from '../../redux/slices/dataManagementSlice.js'

import AllData from './modules/AllData.js'
import Documents from './modules/Documents.js'
import Apis from './modules/Apis.js'
import Databases from './modules/Databases.js'


const DataManagement = () => {

    const dispatch = useDispatch()
   
    const module = useSelector(state=>state.data_management.module)
   const modules = [
    {id: "1", name:"AllData", label: "All Data", icon: "databases_icon.png", component: <AllData/>},
    {id: "2", name:"Documents", label: "Documents", icon: "document_icon.png", component: <Documents/>},
    {id: "3", name:"Apis", label: "Apis", icon: "apis_icon.png", component: <Apis/>},
    {id: "4", name:"Databases", label: "Databases", icon: "databases_icon.png", component: <Databases/>}
  ]


    const [ hoveredItem, setHoveredItem] = useState("Home")

    const tabStyle={
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      fontWeight: "normal",
      backgroundColor: "white",
      border: "1px solid lightgray",
      borderRadius: "10px 10px 0px 0px",
      padding: "10px",
      cursor: "pointer",
      height: "50px",
      width: "100px",
      transition: "0.3s",
      fontSize: "14px"
    }

  return (
    <div className="d-flex w-100 me-5 flex-column p-3 fade-in">
      <div className="page-title">Data Management</div>
      {/* nav bar */}
        <div className="d-flex">
          {modules.length>0 && modules.map(item=>(
            <div 
              key={item.id} 
              onClick = {(e)=>dispatch(setModule(item.name))}
              onMouseOver = {(e)=>setHoveredItem(item.name)}
              onMouseLeave = {(e)=>setHoveredItem(null)} 
              style={{...tabStyle,
                ...{["backgroundColor"]:hoveredItem===item.name || module===item.name? "rgb(0,100,225)" :tabStyle.backgroundColor},
                ...{["color"]:hoveredItem===item.name|| module===item.name?  "white" :tabStyle.color},
                ...{["borderBottom"]:hoveredItem===item.name? "0px solid rgba(255,255,255,0)" :tabStyle.border},
              }}
              >
              <div>{item.label}</div>
            </div>
          ))
          }
        </div>

        {/* Module */}
          <div className="d-flex border bg-light">
          {
            modules.length>0 && modules.find(i=>i.name ===module).component
          }
        </div>
    </div>
  )
}

export default DataManagement