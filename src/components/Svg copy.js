import React, { useState, useEffect } from 'react';
import AppIcon from "./icons/AppIcon"
import DatabaseIcon from "./icons/DatabaseIcon"
import IntegrationsIcon from "./icons/IntegrationsIcon"
import ProfileIcon from "./icons/ProfileIcon"
import SettingsIcon from "./icons/SettingsIcon"
import WorkflowIcon from "./icons/WorkflowIcon"
import AngleArrowIcon from "./icons/AngleArrowIcon"

const Svg = ({ iconName, fillColor, fillOpacity, height, width , hoveredItem, isHovered, hoveredColor}) => {
  
  const [svgComponents, setSVGComponents] = useState([
    {id: 1, name:"AppIcon", label: "Apps", component: <AppIcon fillColor={fillColor} fillOpacity={fillOpacity} isHovered={isHovered} hoveredColor={hoveredColor} />},
    {id: 2, name:"DatabaseIcon", label: "Data", component: <DatabaseIcon fillColor={fillColor} fillOpacity={fillOpacity} isHovered={isHovered} hoveredColor={hoveredColor} />},
    {id: 3, name:"IntegrationsIcon", label: "Integrations", component: <IntegrationsIcon fillColor={fillColor} fillOpacity={fillOpacity} isHovered={isHovered} hoveredColor={hoveredColor}/>},
    {id: 4, name:"WorkflowIcon", label: "Workflows", component: <WorkflowIcon fillColor={fillColor} fillOpacity={fillOpacity} isHovered={isHovered} hoveredColor={hoveredColor}/>},
    {id: 5, name:"ProfileIcon", label: "Profile", component: <ProfileIcon fillColor={fillColor} fillOpacity={fillOpacity} isHovered={isHovered} hoveredColor={hoveredColor} />},
    {id: 6, name:"SettingsIcon", label: "Settings", component: <SettingsIcon fillColor={fillColor} fillOpacity={fillOpacity} isHovered={isHovered} hoveredColor={hoveredColor}/>},
    {id: 7, name:"AngleArrowIcon", label: "Expand / Collapse Menu", component: <AngleArrowIcon fillColor={fillColor} fillOpacity={fillOpacity} isHovered={isHovered} hoveredColor={hoveredColor}/>}
  ])

  const style = {
    height: height,
    width: width
  }

  useEffect(()=>{
    console.log(iconName)
    console.log(isHovered)
    console.log(hoveredItem)
  },[hoveredItem])

  console.log()

  return (
    <div className="svg-container" style={style} title={svgComponents.find(i=>i.name ===iconName).label}>
        {svgComponents.find(i=>i.name ===iconName).component}
    </div>
  );
};

export default Svg;


