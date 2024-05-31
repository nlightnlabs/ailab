
// Import packages
import React, { useState, useEffect } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { useSelector, useDispatch } from 'react-redux';
import { setUser, setUserLoggedIn } from './redux/slices/authSlice';
import { setCurrentPage, setPageList, setMenuItems } from './redux/slices/navSlice';
import { setAppName, setDbName, setFileStorageBucket, setLogoFile, setTheme} from './redux/slices/envSlice';
import { useNavigate } from 'react-router-dom';

import Home from "./Home";
import Header from "./components/Header";
import Menu from "./components/Menu.js"
import SignIn from "./modules/authentication/modules/SignIn.js";
import SignUp from "./modules/authentication/modules/SignUp.js";
import Profile from "./modules/account/modules/Profile.js";
import Settings from "./modules/account/modules/Settings.js";

import DataManagement from "./modules/dataManagement/DataManagement.js";
import Models from "./modules/models/Models.js";
import Apps from "./modules/apps/Apps.js";
import Agents from "./modules/agents/Agents.js";
import Integrations from "./modules/integrations/Integrations.js";
import Workflows from "./modules/workflows/Workflows.js";
import Playground from "./Playground.js"


// Set application details:
export const appName = "ai_lab"
export const dbName = "main"
export const fileStorageBucketName = "nlightnlabs01"
export const logoFile = "nlightn_labs_logo.png"
export const theme = "nlightn labs"
 
function App() {

  const dispatch = useDispatch();
  const navigateTo = useNavigate()

  useEffect(()=>{
    console.log("ailab is running")
    console.log("Environment: ",process.env.NODE_ENV)
  },[])

  // Global States
  const user = useSelector(state => state.authentication.user);
  const userLoggedIn = useSelector(state => state.authentication.userLoggedIn);
  const currentPage = useSelector(state => state.navigation.currentPage);
  const menuItems = useSelector(state => state.navigation.menuItems);
  
  // local states
  const [pages, setPages] = useState([])
  
  // Setup data
  const pageData = [
    { id: 1, section: 1, name: "Home", label: "Home", icon: "HomeIcon", component: <Home/>, showOnMenu: true},
    { id: 2, section: 1, name: "Profile", label: "Profile", icon: "ProfileIcon", component: <Profile/>, showOnMenu: true},
    { id: 3, section: 1, name: "Settings", label: "Settings",icon: "SettingsIcon", component: <Settings/>, showOnMenu: true},
    { id: 4, section: 2, name: "Apps", label: "Apps", icon: "AppIcon", component: <Apps/>, showOnMenu: true },
    { id: 5, section: 2, name: "DataManagement", label: "Data Management", icon: "DatabaseIcon", component: <DataManagement/>, showOnMenu: true },
    { id: 6, section: 2, name: "Integrations", label: "Integrations", icon: "IntegrationsIcon", component: <Integrations/>, showOnMenu: true},
    { id: 7, section: 2, name: "Models", label: "Models", icon: "ModelIcon", component: <Models/>, showOnMenu: true},
    { id: 8, section: 2, name: "Workflows", label: "Workflows", icon: "WorkflowIcon", component: <Workflows/>, showOnMenu: true},
    { id: 9, section: 2, name: "Agents", label: "Agents", icon: "BotIcon", component: <Agents/>, showOnMenu: true},
    { id: 10, section: 2, name: "Playground", label: "Playground", icon: "SettingsIcon", component: <Playground/>, showOnMenu: true},
  ];

  const getPages = async ()=>{
    let x = await Promise.all(pageData.map(async (item) => {
      // Ensure the component is rendered before pushing
      return { ...item, component: await item.component };
    }));
    console.log(x);
    setPages(x);
  }

  const getMenuItems = async ()=>{
    let modules = pageData.filter(i=>i.showOnMenu===true)
    await Promise.all(modules.map(item=>{
      delete item.component
    }))
    console.log(menuItems)
    dispatch(setMenuItems(modules))
  }

  useEffect(()=>{

    dispatch(setAppName(appName))
    dispatch(setDbName(dbName))
    dispatch(setFileStorageBucket(fileStorageBucketName))
    dispatch(setLogoFile(logoFile))
    dispatch(setTheme(theme))

    getPages()
    getMenuItems()
    console.log(currentPage)
  },[])

  return (
    <div className="flex-container overflow-hidden" style={{height: "100vh", width: "100vw"}}>
        
        <Header appName={appName} logo={logoFile}/>
     
        <div className="d-flex w-100" style={{height:"100%"}}>
          {
          !userLoggedIn ? navigateTo("/SignIn")
          :
            <div className="d-flex w-100 justify-content-between" style={{height:"100%"}}>
                {pages.length>0  && (pages.find(i=>i.name ===currentPage).component)}
                {menuItems.length>0 && <Menu menuItems={menuItems} colorTheme={theme}/> }
            </div>
          }
        </div>

    </div>
  );
}

export default App;

