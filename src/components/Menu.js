import React, {useState, useEffect, useContext, useRef, createRef} from "react"
import {Context} from './Context'
import Svg from "./Svg.js"
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the grid

const Menu = ({menuItems}) =>{

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

const [isExpanded, setExpanded] = useState(false)
const [sections, setSections] = useState([])
const [hoveredItem, setHoveredItem] = useState("none");

const getSections = (menuItems)=>{
    const menuSets = new Set()
    menuItems.map((item)=>{
        menuSets.add(item.section)
    })
    const menuList = Array.from(menuSets)
    setSections(menuList)
}

// Function to dynamically create refs based on the names or IDs
const menuItemRefs = useRef({});
const menuItemIconRefs = useRef({});
const menuItemLabelRefs = useRef({});
const createRefs = async (menuItems) => {
    let refList = {};
    menuItems.forEach((item) => {
        refList[item.name] = createRef();
    });
    menuItemRefs.current = refList;

    refList = {};
    menuItems.forEach((item) => {
        refList[item.name] = createRef();
    });
    menuItemIconRefs.current = refList;

    refList = {};
    menuItems.forEach((item) => {
        refList[item.name] = createRef();
    });
    menuItemLabelRefs.current = refList;
};

useEffect(()=>{
    getSections(menuItems)
    createRefs(menuItems)
},[menuItems])

const MenuStyle = {
    height: "100%",
    width: isExpanded? "250px" : "50px",
    backgroundColor: "rgb(235,235,235)",
    transition: "0.2s",
    color: "gray"
}

const MenuSectionStyle = {
    width: "100%",
    marginBottom: "20px",
    borderBottom: "1px solid lightgray"
}


const MenuItemStyle = {
    width: "100%",
    padding: "5px",
    color: "gray",
    cursor: "pointer",
    backgroundColor: "rgb(235,235,235)",
    marginBottom: "5px",
    transition: "0.2s"
}

const MenuItemLabelStyle = {
    display: "flex-box",
    alignItems: 'center',
    textShadow: "5px 5px 5px 0.5",
    transition: "0.2s",
}

const MenuIconStyle = {
    height: "50px",
    width: "50px",
    opacity: "1",
    color: "gray",
    cursor: "pointer",
    transition: "0.5s"
}

const [hoveredIconColor, setHoveredIconColor] = useState(null)
const hover = (e,itemName)=>{
    setHoveredItem(e.type ==="mouseover" ? itemName : "none")
}



  return (
    <div className="d-flex flex-column" style={MenuStyle}>
            <div 
                onClick={(e)=>setExpanded(!isExpanded)}
                style={{...MenuIconStyle,...{["transform"]: !isExpanded? "scaleX(-1)" : "scaleX(1)"} }}
                className="d-flex justify-content-center"
            >
                <Svg iconName="AngleArrowIcon" fillColor={"gray"} />
            </div>

        <div>
           {sections.map((section,index)=>(
                <div key={index} className="d-flex flex-column w-100" style={MenuSectionStyle}>
                    
                    {menuItems.map((item,index)=>(
                        item.section === section &&
                        <div 
                            ref = {menuItemRefs[index]}
                            id={`menu_item_${item.name}`}
                            className={`d-flex align-items-center ${!isExpanded ? "justify-content-center" : "justify-content-start"}`}
                            style={{...MenuItemStyle,
                                ...{["backgroundColor"]:hoveredItem ===item.name?"gray":"rgb(235,235,235)"},
                                ...{["color"]:hoveredItem ===item.name?"white":"gray"}
                            }}
                            key={item.id}
                            onClick={(e)=>setPageName(item.link)}
                            onMouseOver = {(e)=>hover(e, item.name)}
                            onMouseLeave = {(e)=>hover(e,item.name)}
                        >
                            <Svg
                                ref={menuItemIconRefs[index]}
                                id={`${item.name}_icon`}
                                style = {MenuIconStyle}
                                name={item.name}
                                iconName={item.icon}
                                fillColor={hoveredItem === item.name ? "white" : "gray"}
                                fillOpacity={MenuIconStyle.opacity}
                                height = "30px"
                                width = "30px"
                                hoveredItem = {hoveredItem}
                                onClick={(e, item) => setPageName(item.link)}
                            />
      
                            {isExpanded && 
                                <div 
                                    ref = {menuItemLabelRefs[index]}
                                    id={`menu_item_${item.name}_label`}
                                    name={item.name}
                                    className="d-flex ms-2"
                                    style={MenuItemLabelStyle}
                                    onClick={(e)=>setPageName(item.link)}
                                >
                                    {item.label} 
                               </div>
                            }
                        </div>
                    ))}
                </div>
           ))}
            
        </div>
    </div>
  );
}

export default Menu;