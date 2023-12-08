import { doc, getDoc } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { db } from '../firebase/config'
import { toast } from 'react-toastify'

const useFecthDocument = (collectionname,documentId) => {
    let [documentdata,setDocuementData]=useState(null)
    let [isLoading,setIsLoading]=useState(false)
    useEffect(()=>{
        getDocData()
    },[])
    let getDocData=async()=>{
        setIsLoading(true)
        const docRef=doc(db,collectionname,documentId)
        const docSnap=await getDoc(docRef)
        if(docSnap.exists()){
            const obj={id:documentId,...docSnap.data()}
            setDocuementData(obj)
            setIsLoading(false)
        }
        else{toast.error("Document Not Found")}
    }
  return ({documentdata,isLoading} )
}

export default useFecthDocument
