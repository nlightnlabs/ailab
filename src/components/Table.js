import React, {useState, useEffect, useMemo, useCallback} from 'react'
import "bootstrap/dist/css/bootstrap.min.css"
import { AgGridReact } from 'ag-grid-react'; // React Grid Logic
import "ag-grid-community/styles/ag-grid.css"; // Core CSS
import "ag-grid-community/styles/ag-theme-quartz.css"; // Theme
import {toProperCase} from './functions/formatValue.js'
import { UTCToLocalTime } from './functions/time.js';
import * as nlightnApi from "./apis/nlightn.js"

const Table = (props) => {

    const [tableName, setTableName] = useState(props.tableName)

    const [tableData, setTableData] = useState([]);
    const [fields, setFields] = useState([])
    
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
    getTableData(tableName)
  },[])


    const onCellClicked = (e) => {
      props.onCellClicked(e.data)
    }

    const gridOptions = {
      rowClassRules: {
        'selected-row': (params) => params.node.isSelected(),
      },
      getRowStyle: (params) => {
        if (params.node && params.node.isSelected()) {
          return { background: 'gray' }; // Change the background color to highlight the row
        }
        return null; // No style change
      },
    };
  
  return (
    <div className="flex-container w-100">
        <div
            className="ag-theme-quartz" // applying the grid theme
            style={{ height: 600 }} // the grid will fill the size of the parent container
        >
        <AgGridReact
            rowData={tableData}
            columnDefs={fields}
            onCellClicked = {onCellClicked}
            gridOptions={gridOptions} // Add gridOptions here
        />
        </div>
    </div>
  )
}

export default Table