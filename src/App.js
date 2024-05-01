import "bootstrap/dist/css/bootstrap.min.css"
import './App.css';
import * as iconsApi from "./components/apis/icons"

import React, {useState, useEffect, useContext, useRef} from "react"
import {Context} from './components/Context'
import * as nlightnApi from "./components/apis/nlightn.js"

import Svg from "./components/Svg"
import Home from "./components/Home.js"
import Menu from "./components/Menu.js"
import Settings from "./components/Settings.js"
import Profile from "./components/Profile.js"
import SignIn from "./components/SignIn.js"
import SignUp from "./components/SignUp.js"
import ForgotPassword from "./components/ForgotPassword.js"
import Module from "./components/Module.js"
import Workflow from "./components/Workflow.js"
import Integrations from "./components/Integrations.js"
import Data from "./components/Data.js"
import Agents from "./components/Agents.js"
import Models from "./components/Models.js"


function App() {

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


const pageData = [
  {id: 1, name: "home", label: "Home", component: <Home pageTitle="Home"/>},
  {id: 2, name: "profile", label: "Profile", component: <Profile pageTitle="Profile"/>},
  {id: 3, name: "settings", label: "Settings", component: <Settings pageTitle="Settings"/>},
  {id: 4, name: "account", label: "account", component: <Profile pageTitle="Account" />},
  {id: 5, name: "sign_in", label: "Sign In", component: <SignIn pageTitle="Sign In" />},
  {id: 6, name: "sign_up", label: "Sign Up", component: <SignUp  pageTitle="Sign Up" />},
  {id: 7, name: "forgot_password", label: "Forgot Password", component: <ForgotPassword  pageTitle="Forgot Password" />},
  {id: 8, name: "data", label: "Data", component: <Data pageTitle="Data" />},
  {id: 9, name: "apps", label: "Apps", component: <Module pageTitle="Apps" />},
  {id: 10, name: "integrations", label: "Integrations", component: <Integrations pageTitle="Integrations"/>},
  {id: 11, name: "workflows", label: "Workflows", component: <Workflow pageTitle="Workflows" />},
  {id: 12, name: "agents", label: "Agents", component: <Agents pageTitle="Agents"/>},
  {id: 12, name: "models", label: "Models", component: <Models pageTitle="Models"/>}
]

const menuItemsData = [
  {id: 1, section: 1, name: "profile", label: "Profile", icon: "ProfileIcon", link: "profile"},
  {id: 2, section: 1, name: "settings", label: "Settings", icon: "SettingsIcon", link: "settings"},
  {id: 3, section: 2, name: "data", label: "Data", icon: "DatabaseIcon", link: "data"},
  {id: 4, section: 2, name: "apps", label: "Apps", icon: "AppIcon", link: "apps"},
  {id: 5, section: 2, name: "integrations", label: "Integrations", icon: "IntegrationsIcon", link: "integrations"},
  {id: 6, section: 2, name: "workflow", label: "Workflow", icon: "WorkflowIcon", link: "workflows"},
  {id: 7, section: 2, name: "agents", label: "Agents", icon: "BotIcon", link: "agents"},
  {id: 8, section: 2, name: "models", label: "Models", icon: "ModelIcon", link: "models"},
]

const getAppIcons = async ()=>{
    const response = await nlightnApi.getTable("icons")
    setAppIcons(response.data)
}

const getUsers = async ()=>{
  const response = await nlightnApi.getTable("users")
  setUsers(response.data)
}

const getPages = async ()=>{
  await setPages(pageData)
  pageData.map(item=>{
    setPageList([...pageList,item.label])
  })
}

const [menuItems, setMenuItems] = useState([])
const getMenuItems = async ()=>{
  setMenuItems(menuItemsData)
}

const HeaderStyle = {
  height: "75px",
  borderBottom:"1px solid lightgray",
  padding: "10px",
}

const pageRef = useRef()
const headerRef = useRef()
const [containerHeight, setContainerHeight] = useState()

const signOut = ()=>{
  setUser(null)
  setUserLoggedIn(false)
  setShowUserMenu(false)
}

const signIn = ()=>{
  console.log(pages)
  
}

useEffect(() => {
  const fetchData = async () => {
    await getAppIcons();
    await getUsers();
    await getMenuItems();
    await getPages(); // Fetch pages after other data is loaded
  };

  fetchData();
  setContainerHeight(`${pageRef.current.clientHeight-headerRef.current.clientHeight}px`)
}, []);

useEffect(() => {
  // Ensure pages is not null or undefined before accessing it
  if (pages && pages.length > 0) {
    setPageName(pages[0].name); // Set default page name
  }
}, [pages]);

const [showUserMenu, setShowUserMenu] = useState(false)

useEffect(()=>{

},[user])

  return (
    <div ref={pageRef} className="flex-container" style={{height: "100vh"}}>
      
      <div ref={headerRef} className="d-flex w-100 justify-content-between" style={HeaderStyle}>

          <div className="d-flex w-50">
            <img src={`${iconsApi.generalIcons}/nlightn+labs+logo.png`}></img>
          </div>
          
          <div 
            className="d-flex position-relative right-0 justify-content-end w-50 "
          >

      <div 
            className="d-flex" 
            style={{height: "50px", width: "50px", overflow: "hidden", cursor: "pointer"}} 
            onClick={(e)=>setPageName("home")}>
             <Svg iconName={"HomeIcon"} fillColor="lightgray" fillOpacity = "1" height = "50px" width="50px" />
          </div>

         
          <div 
            className="d-flex" 
            style={{height: "50px", width: "50px", border: "1px solid lightgray", borderRadius: "25px", overflow: "hidden", cursor: "pointer"}} 
            onClick={(e)=>setShowUserMenu(!showUserMenu)}>
            {
              userLoggedIn && user.photo_url ? 
                <img src={user.photo_url}></img>
              :
              userLoggedIn && !user.photo && user ? 
                <div 
                  className="d-flex align-items-center justify-content-center w-100" 
                  style={{fontSize:"24px", color: "rgb(0,150,225)"}}
                >
                  {`${user.first_name[0]}${user.last_name[0]}`}
                </div>
              :
              <Svg iconName={"ProfileIcon"} fillColor="lightgray" fillOpacity = "1" height = "50px" width="50px" />
            }   
          </div>
        

          {showUserMenu &&

            <div 
              className="d-flex position-absolute shadow-sm rounded-3 p-3" 
              style={{backgroundColor: "white", border: "3px solid rgba(200,200,200,0.5)", top:"50px", zIndex:999, fontSize: "14px", transition: "0.5s"}}>
                <div className="d-flex flex-column">
                  {userLoggedIn ?
                  <div className="d-flex flex-column justify-content-center" style={{color: "gray"}}>
                      <label >Signed in as: </label>
                      <label style={{fontWeight: "bold", color: "rgb(0,150,225)"}}>{user.full_name}</label>
                      <label style={{fontWeight: "bold", color: "rgb(0,150,225)"}}>{user.email}</label>
                      <button className="btn btn-outline-primary" style={{maxWidth: "100px", marginTop:"10px"}} onClick={(e)=>signOut(e)}>Sign Out</button>
                    </div>
                  :
                    <div className="d-flex flex-column justify-content-center" style={{color: "gray"}}>
                      <button className="btn btn-outline-primary" onClick={(e)=>{setPageName("sign_in"); setShowUserMenu(false)}} >Sign In</button>
                      <button className="btn btn-outline-primary mt-2" onClick={(e)=>{setPageName("sign_up"); setShowUserMenu(false)}} >Sign Up</button>
                  </div>
                }
              </div>
            </div>
          }

        </div>

      </div>

      <div className="d-flex justify-content-between" style={{height: containerHeight}}>
        {pages.length>0 && pages.find(i=>i.name===pageName).component}
        {menuItems.length>0 &&<Menu menuItems={menuItems}/> }
      </div>

    </div>
  );
}

export default App;
