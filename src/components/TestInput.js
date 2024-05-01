import React, {useState} from 'react'

const TestInput = (props) => {

 const [inputValue, setInputValue] = useState()
 const onChange = props.onChange

 const handleChange = (e)=>{
    setInputValue(e.target.value)
    onChange(e)
 }

  return (
    <div className="form-group">
        <label className="form-label" htmlFor="testinput">Test Input</label>
        <input name="testinput" className="form-control" value={inputValue} onChange={(e)=>handleChange(e)}></input>
    </div>
  )
}

export default TestInput