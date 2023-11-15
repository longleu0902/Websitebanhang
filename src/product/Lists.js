import React,{useEffect,useState} from "react";
import ListDataService from  "../Lists.services";

const ListItem = ({getListID}) => {
    const [Lists,setLists] = useState([]);
    const getLists = async () => {
        const data = await ListDataService.getAllLists();
        console.log(data.docs)
        setLists(data.docs.map((doc)=>({...doc.data(),id:doc.id})))
    }
    useEffect(()=>{
        getLists();
    },[]);
    return(
        <>
        <pre>{JSON.stringify(Lists,undefined,2)}</pre>
        </>
    )
};