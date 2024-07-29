import { jwtDecode } from "jwt-decode";
import { createContext, useEffect, useState } from "react";

export let UserContext = createContext(0);

export default function UserContextProvider(props){
    const [userLogin, setuserLogin] = useState(null);
    const [userId, setUserId] = useState(null);

    // to handle reload
    useEffect(()=>{
        if(localStorage.getItem('userToken' ) !== null){
            setuserLogin(localStorage.getItem('userToken'));

            setUserId( jwtDecode( localStorage.getItem('userToken')).id );
        }
    },[])

    return <UserContext.Provider value={{userLogin,setuserLogin , userId}}>
        {props.children}
    </UserContext.Provider>
}