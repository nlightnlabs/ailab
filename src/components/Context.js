import React, { useState, createContext } from 'react'

export const Context = createContext(null);

export const ContextProvider = ({children}) =>{

    const [user, setUser] = useState({})
    const [userLoggedIn, setUserLoggedIn] = useState(false);
    const [users, setUsers] = useState([])
    const [page, setPage] = useState({});
    const [pageName, setPageName] = useState("home");
    const [pages, setPages] = useState([])
    const [requestType, setRequestType] = useState({});
    const [requestTypes, setRequestTypes] = useState([])
    const [appData, setAppData] = useState({});
    const [attachments, setAttachments] = useState({});
    const [initialFormData, setInitialFormData] = useState({})
    const [tableName, setTableName] = useState("requests")
    const [tables, setTables] = useState([])
    const [apps, setApps] = useState([])
    const [selectedApp, setSelectedApp] = useState("")
    const [appIcons, setAppIcons] = useState([])
    const [currency, setCurrency] = useState("United States Dollar")
    const [currencySymbol, setCurrencySymbol] = useState("$")
    const [language, setLanguage] = useState("English")
   
    const [pageList, setPageList] = useState([])

    const globalStates = {
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
    }

    return(
        <Context.Provider value={globalStates}>{children}</Context.Provider>
    )
}