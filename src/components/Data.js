import React, {useState, useEffect, useContext, useMemo, useCallback} from 'react'
import "bootstrap/dist/css/bootstrap.min.css"
import { AgGridReact } from 'ag-grid-react'; // React Grid Logic
import "ag-grid-community/styles/ag-grid.css"; // Core CSS
import "ag-grid-community/styles/ag-theme-quartz.css"; // Theme
import {toProperCase} from './functions/formatValue.js'
import { UTCToLocalTime } from './functions/time.js';

import {Context} from "./Context.js"
import * as nlightnApi from "./apis/nlightn.js"
import * as iconsApi from "./apis/icons.js"

import Table from "./Table.js"
import VisualData from './VisualData.js';
import FloatingPanel from "./FloatingPanel.js"
import DataEntryForm from './DataEntryForm.js';
import AddDataForm from './AddDataForm.js';



const Data = (props) => {

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
    getTableData("data")
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

    const [view, setView] = useState("table")
    const [visualLayout, setVisualLayout] = useState([])

    const IconStyle = {
        height: "50px",
        width: "50px",
        cursor: "pointer",
        marginLeft: "5px",
        marginRight: "5px"
    }

  return (
    <div className="d-flex flex-column w-100 p-3 shadow-sm" style={{height: "90%", overflow: "hidden"}}>
        <h1>Data</h1>
       
        <div className="d-flex justify-content-between align-items-center p-1">
            <div className="d-flex justify-content-start align-items-center">
                <img src={`${iconsApi.generalIcons}/table_icon.png`} style={IconStyle} onClick={(e)=>setView("table")}></img>
                <img src={`${iconsApi.generalIcons}/visual_design_icon.png`} style={IconStyle} onClick={(e)=>setView("chart")}></img>
            </div>
            <div className="d-flex justify-content-end align-items-center">
                { selectedRecord && <label style={{fontSize: "14px", color: "gray"}} >Selected record: {selectedRecord.id}</label>}
                <div className="d-flex align-items-center justify-content-end ms-3">        
                    {selectedRecord && 
                        <img title={"Edit Record"} style={IconStyle} src={`${iconsApi.appIcons}/edit_icon.png`} onClick={(e)=>setShowEditForm(true)}></img>
                    }

                    {selectedRecord && 
                        <img title={"Delete Record"} style={IconStyle} src={`${iconsApi.appIcons}/trash_icon.png`} onClick={(e)=>setShowDeleteForm(true)}></img>
                    }
                    
                    <img title={"Add Record"} style={IconStyle} src={`${iconsApi.appIcons}/add_icon.png`} onClick={(e)=>setShowAddForm(true)}></img>
                </div>
            </div>
        </div>

        <div className="d-flex border p-1 w-100 bg-light" style={{height: "100%", overflow: "auto"}}>
        {view==="table" ?
                <Table 
                    tableName={"data"}
                    onCellClicked = {onCellClicked}
                />
                :
                <VisualData 
                    objectsData={tableData} 
                    visualLayout={visualLayout}
                    setVisualLayout={setVisualLayout}
                />
            }
        </div>

        {showAddForm &&
             <div className="d-flex" style={{height:"100vh", width: "100vw", backgroundColor: "rgba(0,0,0,0.5)", position: "absolute", top: 0, left:0}}>
                <FloatingPanel
                    title={"Add Data"}
                    top="50vh"
                    left="50vw"
                    height="80vh"
                    width="600px"
                    icons={appIcons}
                    appData={appData}
                    displayPanel={setShowAddForm}
                >
                    <AddDataForm/>
                </FloatingPanel>
           </div>
        }

        {showEditForm &&
            <div className="d-flex" style={{height:"100vh", width: "100vw", backgroundColor: "rgba(0,0,0,0.5)", position: "absolute", top: 0, left:0}}>
            <FloatingPanel
                title={"Edit Data"}
                top="50vh"
                left="50vw"
                height="80vh"
                width="50vw"
                icons={appIcons}
                appData={appData}
                displayPanel={setShowEditForm}
            >
            <DataEntryForm
                formName = {"edit_data"}
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
                title={"Delete Data"}
                top="50vh"
                left="50vw"
                height="50vh"
                width="50vw"
                icons={appIcons}
                appData={appData}
                displayPanel={setShowDeleteForm}
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

export default Data