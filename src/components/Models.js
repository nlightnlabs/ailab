import React, {useState, useEffect, useContext, useMemo, useCallback} from 'react'
import "bootstrap/dist/css/bootstrap.min.css"
import { AgGridReact } from 'ag-grid-react'; // React Grid Logic
import "ag-grid-community/styles/ag-grid.css"; // Core CSS
import "ag-grid-community/styles/ag-theme-quartz.css"; // Theme
import {toProperCase} from './functions/formatValue.js'
import { UTCToLocalTime } from './functions/time.js';
import * as nlightnApi from "./apis/nlightn.js"

import {Context} from "./Context.js"
import * as iconsApi from "./apis/icons.js"
import Table from "./Table.js"
import MultiInput from './MultiInput.js';
import FloatingPanel from "./FloatingPanel.js"
import DataEntryForm from './DataEntryForm.js';
import NewRecordForm from './NewRecordForm.js';


const Models = (props) => {

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


    const [tableData, setTableData] = useState([]);
    const [fields, setFields] = useState([])
    const [selectedRecord, setSelectedRecord] = useState(null)
    
    const getTableData = async (tableName)=>{

      const response = await nlightnApi.getTable(tableName)
      console.log("table data:",response.data)

      let fieldList = []
        if(response.data.length>0){
            Object.keys(response.data[0]).map((field,index)=>{
                fieldList.push({headerName: toProperCase(field.replaceAll("_"," ")), field: field, filter: true})
            })
            setFields(fieldList)
        }

        setTableData(response.data.sort((a, b) => {
          return  b.id-a.id;
        }));

      }
      
  useEffect(()=>{
    getTableData("models")
  },[])


    const onCellClicked = (record) => {
    //   setSelectedRecordId(e.data.id)
        setSelectedRecord(record)
        console.log(record)
    }

    const [showAddForm, setShowAddForm] = useState(false)
    const addRecord = ()=>{
        setShowAddForm(true)
    }

    const [showEditForm, setShowEditForm] = useState(false)
    const editRecord = ()=>{
        setShowEditForm(false)
    }

    const [showDeleteForm, setShowDeleteForm] = useState(false)
    const deleteRecord = ()=>{
        setShowDeleteForm(false)
    }

    const updateParent = ()=>{
        setShowAddForm(true)
    }

    const IconStyle = {
        height: "30px",
        width: "30px",
        cursor: "pointer",
        marginLeft: "5px",
        marginRight: "5px"
    }


  return (
    <div className="d-flex flex-column w-100 p-3 shadow-sm" style={{height: "100%"}}>
        <h1>Models</h1>
        <div className="d-flex align-items-center justify-content-end"> 
            {selectedRecord && <label>Selected record: {selectedRecord.id}</label>}
        </div>
        <div className="d-flex align-items-center justify-content-end">        
            {selectedRecord && 
                <img title={"Edit Record"} style={IconStyle} src={`${iconsApi.appIcons}/edit_icon.png`} onClick={(e)=>setShowEditForm(true)}></img>
            }

            {selectedRecord && 
                <img title={"Delete Record"} style={IconStyle} src={`${iconsApi.appIcons}/trash_icon.png`} onClick={(e)=>setShowDeleteForm(true)}></img>
            }
            
            <img title={"Add Record"} style={IconStyle} src={`${iconsApi.appIcons}/add_icon.png`} onClick={(e)=>setShowAddForm(true)}></img>
            
        </div>
       <Table 
            tableName={"models"}
            onCellClicked = {onCellClicked}
        />
        
        {showAddForm &&
             <div className="d-flex" style={{height:"100vh", width: "100vw", backgroundColor: "rgba(0,0,0,0.5)", position: "absolute", top: 0, left:0}}>
                <FloatingPanel
                    title={"Add Model"}
                    top="50vh"
                    left="50vw"
                    height="80vh"
                    width="50vw"
                    icons={appIcons}
                    appData={appData}
                    displayPanel={setShowAddForm}
                >
                <NewRecordForm
                    formName = {"new_model"}
                    updateParent ={{}}
                    updateParentStates = {{}}
                    setUploadFilesRef = {()=>{}}
                    formData = {{}}
                    setFormData = {()=>{}}
                    user = {user}
                    appData = {appData}
                />
                </FloatingPanel>
           </div>
        }

        {showEditForm &&
            <div className="d-flex" style={{height:"100vh", width: "100vw", backgroundColor: "rgba(0,0,0,0.5)", position: "absolute", top: 0, left:0}}>
            <FloatingPanel
                title={"Edit Model"}
                top="50vh"
                left="50vw"
                height="80vh"
                width="50vw"
                icons={appIcons}
                appData={appData}
                displayPanel={setShowEditForm}
            >
            <DataEntryForm
                formName = {"edit_model"}
                updateParent ={updateParent}
                updateParentStates = {{}}
                setUploadFilesRef = {()=>{}}
                formData = {{}}
                setFormData = {()=>{}}
                user = {user}
                appData = {appData}
            />
            </FloatingPanel>
       </div>
        }


        {showDeleteForm &&
            <div className="d-flex" style={{height:"100vh", width: "100vw", backgroundColor: "rgba(0,0,0,0.5)", position: "absolute", top: 0, left:0}}>
            <FloatingPanel
                title={"Delete Model"}
                top="50vh"
                left="50vw"
                height="50vh"
                width="50vw"
                icons={appIcons}
                appData={appData}
                displayPanel={setShowEditForm}
            >
            <div className="d-flex flex-column w-100 p-3">
                <h5>Confirm that you want to delete the following record:</h5>
                <div className="d-flex w-100" style={{height: "75%", overflow: "auto"}}>
                    <table className="table table-striped">
                    <tbody>
                        {Object.entries(selectedRecord).map(([key,value],index)=>(
                            <tr
                                style={{fontSize: "12px"}}
                                key={index}>
                                    <td style={{verticalAlign:"middle", width: "25%"}}>{key}</td>
                                    <td style={{verticalAlign:"middle"}}>{value}</td>
                            </tr>
                        ))
                        }
                    </tbody>
                    </table>
                </div>
                <div className="d-flex justify-content-center">
                    <button className="d-flex btn btn-secondary m-1" onClick={(e)=>setShowDeleteForm(false)}>Cancel</button>
                    <button className="d-flex btn btn-danger m-1" onClick={(e)=>deleteRecord(e)}>Delete</button>
                </div>
            </div>
            </FloatingPanel>
       </div>
        }

    </div>
  )
}

export default Models