import { createContext, useState } from "react";
import Customize from "../components/Customize";
import ProfileDetails from "../components/ProfileDetails";


const DataContext= createContext({})

export const DataProvider= ({children}) => {
    const display= {
        1: <Customize />,
        2: <ProfileDetails/>
      }

      const [page, setPage]= useState(2)

      const[profilepic, setProfilepic]= useState('')

      const handleFileChange= (e)=> {
          const file= e.target.files[0]
          const reader= new FileReader()
  
          reader.onload= (e)=> {
              setProfilepic(e.target.result)
          }
  
          reader.readAsDataURL(file)
      }

  

    

      const[details, setDetails]= useState({
        firstname: '',
        lastname: '',
        email: ''
      })

      const [userId, setUserId]= useState(null)
    
      const handleDetails= (e) => {
        const name= e.target.name
        const value= e.target.value
    
        setDetails(prevDetails => ({
          ...prevDetails, [name]: value
        }))
      }
      

    return (
        <DataContext.Provider value={{
            display,
            page,
            setPage,
            handleFileChange,
            handleFileChange,
            profilepic, 
            setProfilepic,
            handleDetails,
            details,
            setDetails,
            userId,
            setUserId
        }}>
            {children}
            </DataContext.Provider>
    )
}

export default DataContext