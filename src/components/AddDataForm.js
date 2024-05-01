import React, {useState, useEffect} from 'react'
import Attachments from './Attachments'
import MultiInput from './MultiInput'
import TableInput from './TableInput'
import * as nlightnApi from "./apis/nlightn"
import * as iconsApi from "./apis/icons"
import TestInput from './TestInput'

const AddDataForm = () => {

  const [view, setView] = useState("options")
  const [formData, setFormData] = useState({})
  const [attachments, setAttachments] = useState([])

  const CardStyle = {
    display: "flex",
    height: "100px",
    width: "100%",
    border: "1px solid lightgray",
    borderRadius: "5px",
    boxShadow: "5px 5px 10px lightgray",
    alignItems: "center",
    cursor: "pointer",
    transition: "0.3s",
  }

  const IconStyle={
    display: "flex",
    height: "100px",
    width: "150px",
    borderRadius: "5px",
    alignItems: "center",
    justifyContent: "center",
  }
  


  const handleChange = (element)=>{
    const {name,value} = element
    console.log({...formData,...{[name]:value}})
    setFormData({...formData,...{[name]:value}})
  }
  
  
  const handleSubmit =async()=>{

    console.log("formData",formData)

    let attachments = formData.attachments
    console.log("attachments",attachments)
    
    const filePath = "ailab/uploaded_files"
    if(attachments.length>0){
        const uploadResponse = await nlightnApi.uploadFiles(filePath,attachments)
        console.log(uploadResponse)
    }

  }



 const Options = ()=>{
    return(
        <div className="d-flex flex-column w-100">
            <h6>Select an option:</h6>
            <div className="d-flex flex-column justify-content-center">
                <div className="d-flex w-100 justify-content-between" style={CardStyle} onClick = {(e)=>setView("upload")}>
                    <div style = {IconStyle}>
                        <img src={`${iconsApi.generalIcons}/upload_icon.png`}></img>
                    </div>
                    <div className="d-flex w-100 ms-3 flex-column">
                        <div style={{fontWeigth: "bold", fontSize:"24px"}}>Upload File</div>
                        <div style={{color: "gray", fontSize: "14px"}} className="d-flex flex-wrap">Upload files such as CSVs, Excel, Images, or Videos</div>
                    </div>
                </div>
                <div className="d-flex w-100 justify-content-between mt-3" style={CardStyle} onClick = {(e)=>setView("api")}>
                    <div style = {IconStyle}>
                        <img src={`${iconsApi.generalIcons}/integrations_icon.png`}></img>
                    </div>
                    <div className="d-flex w-100 ms-3 flex-column">
                        <div style={{fontWeigth: "bold", fontSize:"24px"}}>Connect With API</div>
                        <div style={{color: "gray", fontSize: "14px"}} className="d-flex flex-wrap">Pull in data using an API connection</div>
                    </div>
                </div>
            </div>
        </div>
    )
 }




 const UploadForm = (props)=>{

    const formData = props.formData
    const setFormData = props.setFormData
    const handleChange=(element)=>{
        console.log(element)
        const {name,fileData} = element
        console.log({...formData,...{[name]:fileData}})
        setFormData({...formData,...{[name]:fileData}})
    }

    return(
        <div className="d-flex flex-column p-3">
           <h5>Select file(s) to upload:</h5>
           <Attachments
                id = "attachments"
                name = "attachments"
                label = "attachments"
                onChange = {handleChange}
           />
        </div>
    )
 }




 const ApiForm = (props) => {

    let formData = {}
    const setFormData = props.setFormData
    const [initialTableData, setInitialTableData] = useState([
        {key: "", value:""}, {key: "", value:""},{key: "", value:""}
    ])
    const onChange = props.onChange

    const handleInputChange = (e)=>{
        const {name, value} = e.target
        formData = {...formData,...{[name]:value}}
        console.log(formData)

        // setFormData({...formData,...{[name]:value}})
    }


    let attachments = []
    let jsonData = {}
    let headers = {}
    const testApi = async ()=>{
        
        headers = {...headers,...{["Content-Type"]: "application/json"}}
        
        const options = {
            method: formData.method, 
            headers: JSON.stringify(formData.headers),
            body: formData.body
        }


        console.log(options)
        
        
        try {
            const response = await fetch(formData.url, options);
            jsonData = await response.json();
            console.log(jsonData);

            // const jsonBlob = new Blob([JSON.stringify(jsonData, null, 2)], { type: 'application/json' });
            // let file = {
            //     category: "json",
            //     data: {
            //         lastModified: (new Date()).getTime(),
            //         lastModifiedDate: new Date(),
            //         name: `${formData.file_name}.json`,
            //         size: jsonBlob.size,
            //         type: 'application/json',
            //         url: "",
            //         webkitRelativePath: ""
            //     },
            //     extension: "json",
            //     name: `${formData.file_name}.json`,
            //     size: jsonBlob.size,
            //     type: 'application/json',
            //     url: ""
            // }
            // attachments.push(file)
            // setFormData({...formData["attachments"],...attachments})
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }
    
   return (
     <div className="d-flex flex-column border border-1 rounded-3 mt-3 p-3 w-100" style={{height: "100%", overflow: "hidden"}}>
         <h5>Connect with api</h5>

        <div className="d-flex flex-column w-100 mt-3" style={{height: "75%", overflowY:"auto"}}>
            <MultiInput id="file_name" name="file_name" label="Provide a name for the file" value={formData["file_name"]} onChange={(e)=>handleInputChange(e)}/>
            <MultiInput id="url" name="url" label="Url" value={formData["url"]} onChange={(e)=>handleInputChange(e)}/>
            <MultiInput id="method" name="method" label="Method" value={formData["method"]} list={["Get", "Post"]} onChange={(e)=>handleInputChange(e)}/>
            
            {/* <div className="form-group mt-3">
                <label className="form-label">Headers:</label>
                <MultiInput id="content_type" name="content_type" label="Content Type" value={formData["content_type"]} list={["application/json", "application/xml", "text/html", "text/plain"]} onChange={(e)=>handleInputChange(e)}/>
                <MultiInput id="method" name="method" label="Authorization" value={formData["authorization"]} list={["Bearer token", "Basic authentication", "API key", "OAuth token"]} onChange={(e)=>handleInputChange(e)}/>
                <TableInput id="headers" name="headers" label="headers" initialTableData={initialTableData} onChange={(e)=>handleInputChange(e)}/>
            </div> */}
            
            <div className="form-group mt-3">
                <label className="form-label">Body:</label>
                <TableInput id="body" name="body" label="Body" initialTableData={initialTableData} onChange={(e)=>handleInputChange(e)}/>
            </div>

            <div className="form-group">
                <label className="form-label">Query Parameters:</label>
                <TableInput id="parameters" name="parameters" label="Query Parameters" initialTableData={initialTableData} onChange={(e)=>handleInputChange(e)}/>
            </div>
         </div>

         <div className="d-flex justify-content-end w-100">
            <button className="btn btn-outline-primary" onClick={(e)=>testApi()}>Test API</button>
         </div>

         {jsonData.length>0 &&
            <div className="d-flex w-100" style={{backgroundColor: "black"}}>
                {JSON.stringify(jsonData)}
            </div>
         }

     </div>
   )
 }
 

  return (
    <div className="d-flex flex-column p-3 w-100" style={{height:"100%", overflow: "hidden"}}>
        
        {
        view === "upload" ?
            <UploadForm formData = {formData} setFormData={setFormData}/>
        :
        view === "api" ?
            <ApiForm formData={formData} setFormData={setFormData} onChange={(e)=>handleChange(e)}/>
        :
            <Options/>
        }
        {
        view !="options" && 
        <div className="d-flex justify-content-center w-100 mt-3">
            <div className="btn-group">
                 <button className="btn btn-outline-secondary" onClick={(e)=>setView("options")}>Back</button>
                 <button className="btn btn-primary" onClick={(e)=>handleSubmit(e)}>Submit</button>
            </div>
        </div>
        }
    </div>
  )
}

export default AddDataForm