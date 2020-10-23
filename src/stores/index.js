import React, { createContext, useState } from 'react'

export const MyContext = createContext();
const MyContextProvider = (props) => {
    const [open, setOpen] = useState(false);
    const [infor, setInfor] = useState({});
    const [loading, setLoading] = useState(false)
    const updateOpen = (check) => {
        setOpen(check);
    }
    const updateUser = (check) => {
        setInfor(check);
    }
    const updateLoading = (check) => {
        setLoading(check)
    }

    return <MyContext.Provider value={{
        check: {
            open,
            infor,
            loading
        },
        action: {
            updateOpen,
            updateUser,
            updateLoading
        }
    }}>
        {props.children}
    </MyContext.Provider>
}

export default MyContextProvider