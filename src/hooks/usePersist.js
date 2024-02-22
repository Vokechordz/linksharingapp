import { useState, useEffect } from "react";

import React from 'react'

const usePersist = () => {
 const [persist, setpersist]= useState(JSON.parse(localStorage.getItem("persist")) || false)

useEffect(() => {
    localStorage.setItem("persist", JSON.stringify(persist))
}, [persist])

return [persist, setpersist]

}

export default usePersist