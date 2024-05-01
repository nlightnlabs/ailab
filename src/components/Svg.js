import React, { useState, useEffect } from 'react';
import AppIcon from "./icons/AppIcon";
import DatabaseIcon from "./icons/DatabaseIcon";
import IntegrationsIcon from "./icons/IntegrationsIcon";
import ProfileIcon from "./icons/ProfileIcon";
import SettingsIcon from "./icons/SettingsIcon";
import WorkflowIcon from "./icons/WorkflowIcon";
import AngleArrowIcon from "./icons/AngleArrowIcon";
import BotIcon from "./icons/BotIcon";
import ModelIcon from "./icons/ModelIcon"
import HomeIcon from "./icons/HomeIcon"

const Svg = ({ iconName, fillColor, fillOpacity, height, width, hoveredItem, isHovered, hoveredColor }) => {
  
  const [renderKey, setRenderKey] = useState(0); // Initialize key state

  useEffect(() => {
    setRenderKey(prevKey => prevKey + 1); // Increment key to trigger re-render
  }, [iconName, fillColor, fillOpacity, height, width, hoveredItem, isHovered, hoveredColor]);

  const svgComponents = [
    { id: 1, name: "AppIcon", label: "Apps", component: <AppIcon fillColor={fillColor} fillOpacity={fillOpacity} isHovered={isHovered} hoveredColor={hoveredColor} hoveredItem={hoveredItem}/> },
    { id: 2, name: "DatabaseIcon", label: "Data", component: <DatabaseIcon fillColor={fillColor} fillOpacity={fillOpacity} isHovered={isHovered} hoveredColor={hoveredColor} hoveredItem={hoveredItem} /> },
    { id: 3, name: "IntegrationsIcon", label: "Integrations", component: <IntegrationsIcon fillColor={fillColor} fillOpacity={fillOpacity} isHovered={isHovered} hoveredColor={hoveredColor} hoveredItem={hoveredItem}/> },
    { id: 4, name: "WorkflowIcon", label: "Workflows", component: <WorkflowIcon fillColor={fillColor} fillOpacity={fillOpacity} isHovered={isHovered} hoveredColor={hoveredColor} hoveredItem={hoveredItem}/> },
    { id: 5, name: "ProfileIcon", label: "Profile", component: <ProfileIcon fillColor={fillColor} fillOpacity={fillOpacity} isHovered={isHovered} hoveredColor={hoveredColor} hoveredItem={hoveredItem} /> },
    { id: 6, name: "SettingsIcon", label: "Settings", component: <SettingsIcon fillColor={fillColor} fillOpacity={fillOpacity} isHovered={isHovered} hoveredColor={hoveredColor} hoveredItem={hoveredItem}/> },
    { id: 7, name: "AngleArrowIcon", label: "Expand / Collapse Menu", component: <AngleArrowIcon fillColor={fillColor} fillOpacity={fillOpacity} isHovered={isHovered} hoveredColor={hoveredColor} hoveredItem={hoveredItem}/> },
    { id: 8, name: "BotIcon", label: "Agents", component: <BotIcon fillColor={fillColor} fillOpacity={fillOpacity} isHovered={isHovered} hoveredColor={hoveredColor} hoveredItem={hoveredItem}/> },
    { id: 8, name: "ModelIcon", label: "Models", component: <ModelIcon fillColor={fillColor} fillOpacity={fillOpacity} isHovered={isHovered} hoveredColor={hoveredColor} hoveredItem={hoveredItem}/> },
    { id: 8, name: "HomeIcon", label: "Home", component: <HomeIcon fillColor={fillColor} fillOpacity={fillOpacity} isHovered={isHovered} hoveredColor={hoveredColor} hoveredItem={hoveredItem}/> }
  ];

  const style = {
    height: height,
    width: width
  };

  return (
    <div className="svg-container" style={style} title={svgComponents.find(i => i.name === iconName).label}>
      {svgComponents.find(i => i.name === iconName).component && (
        <React.Fragment key={renderKey}>
          {svgComponents.find(i => i.name === iconName).component}
        </React.Fragment>
      )}
    </div>
  );
};

export default Svg;
