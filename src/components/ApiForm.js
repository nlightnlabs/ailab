import React, {useState} from 'react'
import MultiInput from './MultiInput'
import TableInput from './TableInput'


const ApiForm = (props) => {

   const [formData, setFormData] = useState({})

   const handleChange = (e)=>{
    const {name, value} = e.target
    setFormData({...formData,...{[name]:value}})
   }

  return (
    <div className="d-flex flex-column border border-1 rounded-3 mt-3 p-3">
        <h5>Connect with api</h5>
        <MultiInput id="url" name="url" label="url" value={formData["url"]} onChange={(e)=>handleChange(e)}/>
        
        <div className="form-group">
            <label className="form-label">Header:</label>
            <TableInput id="header_parameters" name="header" label="header" initialTableData={[{key: "", value:""}, {key: "", value:""},{key: "", value:""}]} onChange={(e)=>handleChange(e)}/>
        </div>

        <div className="form-group">
            <label className="form-label">Body:</label>
            <TableInput id="body_parameters" name="header" label="header" initialTableData={[{key: "", value:""}, {key: "", value:""},{key: "", value:""}]} onChange={(e)=>handleChange(e)}/>
        </div>
    </div>
  )
}

export default ApiForm