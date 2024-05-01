import React, {useState, useEffect, useContext, useRef} from "react"
import {Context} from './Context'
import * as nlightnApi from "./apis/nlightn"
import * as iconsApi from "./apis/icons"

const SignIn = () => {

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

useEffect(()=>{
  setAppData({})
  setPageName("sign_in")
  setPage(pages.find(x=>x.name==="sign_in"))
  setPageList(['sign_in'])
},[])

let formData = {}

const [formClassList, setFormClassList] = useState("form-group")
const formRef = useRef()
const [logInErrorMsg, setLogInErrorMsg] = useState("")
const [logInClassName, setLogInClassName] = useState("d-none")

const handleChange = (e)=>{
    let {name, value} = e.target
  
    if(name=="email"){
      value = value.toString().toLowerCase()
    }

    let new_data = {[name]: value}
    let formData = {...appData["user_info"],...new_data}
    setAppData({...appData,["user_info"]:formData})
}

const handleSubmit = async (e)=>{
  
  e.preventDefault()
  const form = e.target

  const validateUser = async(req, res)=>{
    if(Object.keys(appData)==0){
      let formData = {...appData["user_info"],...{}}
      setAppData({...appData,["user_info"]:formData})
      setLogInErrorMsg(`${String.fromCharCode(10060)} invalid user information.`)
      setLogInClassName("text-danger mt-0 mb-3 animate__animated animate__fadeIn ")
    }
    else{
      // console.log(appData)
      const params = {
          email: appData.user_info.email,
          pwd: appData.user_info.pwd
      }
      const uservalidated = await nlightnApi.authenticateUser(params)
      return uservalidated
    }
      
  }

  const getUserInfo = async (req, res)=>{
      const params = {
        email: appData.user_info.email
      }
      const userInfo = await nlightnApi.getUserInfo(params)
      return userInfo
    }

  if(e.nativeEvent.submitter.name==="sign_up"){
    setFormClassList("form-group")
    let nextPage = "sign_up"
    setPageList([...pageList,nextPage])
    setPage(pages.filter(x=>x.name===nextPage)[0])
    setPageName(nextPage)
  }else if(e.nativeEvent.submitter.name==="forgot_password"){
    setFormClassList("form-group")
    let nextPage = "forgot_password"
    setPageList([...pageList,nextPage])
    setPage(pages.filter(x=>x.name===nextPage)[0])
    setPageName(nextPage)
  }else{
    if(!form.checkValidity()){
      e.preventDefault();
    }else{
      const userValidated = await validateUser()
      if(userValidated){
          
          const user_data = await getUserInfo()
          setUser(user_data)
          setAppData({...appData,["user_info"]:user_data})
          setUserLoggedIn(true)

          const nextPage = ("home")
          setPageName(nextPage)
          setPage(pages.filter(x=>x.name===nextPage)[0])
          setPageList([...pageList,nextPage])
      }else{
          setLogInErrorMsg(`${String.fromCharCode(10060)} invalid user information.`)
          setLogInClassName("text-danger mt-0 mb-3 animate__animated animate__fadeIn ")
      }
    }
  }
}



return (
  <div className="d-flex w-100 justify-content-center">
    
    <div className="d-flex flex-column w-100 jusitfy-content-center" style={{maxWidth: "400px"}}>
      
      <h1 className="text-left mb-3 border-bottom border-5">{page.label}</h1>
        
      <div className="d-flex flex-column bg-light border shadow shadow p-3 rounded-2 justify-content-center">
      
      <form ref={formRef} name='form' id="form" onSubmit={handleSubmit} className={formClassList}>
        
        <div className="form-floating mb-3">
          <input id = "email" name= "email" type="email" className="form-control form-control text-primary" onChange={handleChange} placeholder="Username"></input>
          <label htmlFor="email" className="form-label text-body-tertiary small">Email</label>
        </div>

        <div className="form-floating mb-3">
          <input id = "pwd" name= "pwd" type ="password" className="form-control form-control text-primary" onChange={handleChange} placeholder="Password"></input>
          <label htmlFor="pwd" className="form-label text-body-tertiary small">Password</label>
        </div>
        <div className={logInClassName} style={{fontSize: 12}}>{logInErrorMsg}</div>
        
        <div className="d-flex flex-column justify-content-center mt-3">
          <div className="d-flex justify-content-center">
            <div className="d-flex flex-column">
                <button id = "sign_in" name="sign_in"  className="btn btn-primary" data-bs-toggle="button" type="submit">Log In</button>
                <button id = "sign_up" name="sign_up"  className="btn text-secondary" data-bs-toggle="button" type="submit">Sign Up</button>
                <button id = "forgot_password" name="forgot_password"  className="btn text-secondary" data-bs-toggle="button" type="submit">Forgot Password</button>
            </div>
          </div>
        </div>

      </form>
      </div>

      <div className="d-flex justify-content-center mt-5">
          <img style={{maxHeight: 100,  backgroundColor:"none"}} src={`${iconsApi.generalIcons}/nlightn+labs+logo.png`}></img>
      </div>  
    
    
    </div>

    

  </div>
)
}

export default SignIn