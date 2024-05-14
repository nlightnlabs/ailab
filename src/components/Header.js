import React,{useState} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setUser, setUserLoggedIn } from '../redux/slices/authSlice'
import { setCurrentPage } from '../redux/slices/navSlice'
import { clearAllStorage } from '../redux/store'; // Import from centralized utility file
import * as iconsApi from "../apis/icons.js"

const Header = (props) => {

  const appName = props.appName
  const logo = props.logo

  const dispatch = useDispatch()

  //Get Global States
  const user = useSelector((state)=>state.authentication.user)
  const userLoggedIn = useSelector((state)=>state.authentication.userLoggedIn)
  
  //Set Local States
  const [showUserMenu, setShowUserMenu] = useState(false)
  
  const HeaderStyle = {
    position: "relative",
    height: "75px",
    borderBottom:"1px solid lightgray",
  }

  const [userMenuTop, setUserMenuTop] = useState(null)
  const UserMenuStyle={
    border: "3px solid rgba(200,200,200,0.5)", 
    width: "200px",
    zIndex:999, 
    fontSize: "12px", 
    backgroundColor: "white",
    top: "65px"
  }
  
  const signOut = ()=>{
    dispatch(setUser(null))
    dispatch(setUserLoggedIn(false))
    dispatch(setCurrentPage("SignIn"))
    dispatch(clearAllStorage())
  }
  

  return (
    <div className="d-flex w-100 justify-content-between" style={HeaderStyle}>
        
        <div className="d-flex w-50 ms-3 align-items-center">
            <img src={`${iconsApi.generalIcons}/${logo}`} style={{height: "60px"}} />
        </div>

        <div 
          className="d-flex position-relative right-0 justify-content-end w-50 align-items-center"
        >
        {userLoggedIn && 
          <div 
              className="d-flex align-items-center me-3 " 
              style={{height: "50px", width: "50px", border: "1px solid lightgray", borderRadius: "25px", overflow: "hidden", cursor: "pointer"}} 
              onClick={(e)=>setShowUserMenu(!showUserMenu)}
              onMouseOver={(e)=>setShowUserMenu(true)}
          >
          {
              user.photo_url ? 
              <img src={user.photo_url}></img>
              :
              !user.photo && user ? 
              <div 
                  className="d-flex align-items-center justify-content-center w-100" 
                  style={{fontSize:"24px", color: "rgb(0,150,225)"}}
              >
                  {`${user.first_name[0]}${user.last_name[0]}`}
              </div>
              :
              <img src={`${iconsApi.generalIcons}/profile_icon.png`} />
          }   
          </div>
         }

        {showUserMenu &&

        <div
            className="d-flex position-absolute shadow-sm rounded-3 p-3 justify-content-center fade-in" 
            style={UserMenuStyle}
            onMouseOver={(e)=>setShowUserMenu(true)}
            onMouseLeave={(e)=>setShowUserMenu(false)}
            >
            <div className="d-flex flex-column">
                {userLoggedIn ?
                <div className="d-flex flex-column justify-content-center" style={{color: "gray"}}>
                    <label >Signed in as: </label>
                    <label style={{fontWeight: "bold", color: "rgb(0,150,225)"}}>{user.full_name}</label>
                    <label style={{fontWeight: "bold", color: "rgb(0,150,225)"}}>{user.email}</label>
                    <div className="d-flex justify-content-center">
                        <button className="btn btn-outline-primary" style={{maxWidth: "100px", marginTop:"10px"}} onClick={(e)=>signOut(e)}>Sign Out</button>
                    </div>
                </div>
                :
                <div className="d-flex flex-column justify-content-center" style={{color: "gray"}}>
                    <button className="btn btn-outline-primary" onClick={(e)=>{dispatch(setCurrentPage("sign_in")); setShowUserMenu(false)}} >Sign In</button>
                    <button className="btn btn-outline-primary mt-2" onClick={(e)=>{dispatch(setCurrentPage("sign_up")); setShowUserMenu(false)}} >Sign Up</button>
                </div>
            }
            </div>
        </div>
        }

        </div>

        </div>
  )
}

export default Header