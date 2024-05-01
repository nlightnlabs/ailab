import React, {useState, useEffect, useContext} from "react"
import {Context} from './Context'
import * as iconsApi from "./apis/icons"
import Svg from './Svg.js'
import "../App.css"

import { AgGridReact } from 'ag-grid-react'; // AG Grid Component
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the grid

function Home() {

  const {
        user,
        setUser,
        users,
        setUsers,
        userLoggedIn,
        setUserLoggedIn,
        appIcons,
        setAppIcons,
        page,
        setPage,
        pages,
        setPages,
        pageName,
        setPageName,
        appData,
        setAppData,
        pageList,
        setPageList,
} = useContext(Context)

const modules = [
  {id: 1,  name: "data", label: "Data", icon: "DatabaseIcon", link: "data"},
  {id: 2,  name: "models", label: "Models", icon: "ModelIcon", link: "models"},
  {id: 3,  name: "apps", label: "Apps", icon: "AppIcon", link: "apps"},
  {id: 4,  name: "integrations", label: "Integrations", icon: "IntegrationsIcon", link: "integrations"},
  {id: 5,  name: "workflow", label: "Workflow", icon: "WorkflowIcon", link: "workflows"},
  {id: 6,  name: "agents", label: "Agents", icon: "BotIcon", link: "agents"},
]

const [hoveredItem, setHoveredItem] = useState("none");
const hover = (e,itemName)=>{
    setHoveredItem(e.type ==="mouseover" ? itemName : "none")
}

const ModuleButtonStyle = {
  display: "flex-box",
  alignItems: "center",
  justifyContent: "center",
  flexDirection: "column",
  height: "125px",
  width: "175px",
  border: "1px solid lightgray",
  borderRadius: "10px",
  boxShadow: "5px 5px 10px lightgray",
  fontSize: "24px",
  cursor: "pointer",
  transition: "0.3s",
  margin: "10px"
}

const IconStyle = {
  height: "50px",
  width: "50px",
  opacity: "1",
  color: "gray",
  cursor: "pointer",
  transition: "0.5s"
}

const ModuleItemLabelStyle = {
  display: "flex-box",
  alignItems: 'center',
  textShadow: "5px 5px 5px 0.5",
  marginTop: "10px",
  transition: "0.2s",
  fontSize: "18px"
}


  return (
    <div className="d-flex m-3 flex-column w-100">
      <h1 className="text-center">AI Deployment Lab</h1>
      <div className = "d-flex w-100 justify-content-center">
      {modules.map((item,index)=>(
          <div 
              id={item.name}
              name={item.name}
              className={"d-flex align-items-center justify-contents-center"}
              style={{...ModuleButtonStyle,
                  ...{["backgroundImage"]:hoveredItem ===item.name?"linear-gradient(0deg, rgb(0,100,180), rgb(225,245,255))":"linear-gradient(0deg, black, darkgray)"},
                  ...{["color"]:hoveredItem ===item.name?"darkblue":"white"},
                  ...{["transform"]:hoveredItem ===item.name?"scale(1.1)":"scale(1.0)"}
              }}
              key={item.id}
              onClick={(e)=>setPageName(item.link)}
              onMouseOver = {(e)=>hover(e, item.name)}
              onMouseLeave = {(e)=>hover(e,item.name)}
          >
              <Svg
                  id={`${item.name}_icon`}
                  style = {IconStyle}
                  name={item.name}
                  iconName={item.icon}
                  fillColor={hoveredItem === item.name ? "darkblue" : "white"}
                  fillOpacity={IconStyle.opacity}
                  height = "50px"
                  width = "50px"
                  hoveredItem = {hoveredItem}
                  onClick={(e, item) => setPageName(item.link)}
              />

                  <div 

                      id={`menu_item_${item.name}_label`}
                      name={item.name}
                      className="d-flex ms-2"
                      style={ModuleItemLabelStyle}
                      onClick={(e)=>setPageName(item.link)}
                  >
                      {item.label} 
                  </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;