import Styles from './Querys.module.css';
import {useEffect, useState} from 'react';
import { useFormIA } from "../../hooks/useOpenai";

const Querys = ({setHidden,hidden,querys, setQuerys, host, database,user,password, setQueryResponse,dataQuery,setDataQuery,setLoading,setResult,typeDb}) => {
   const [inputFrecuent, setInputFrecuent] = useState("");
   const RenderQuerys= async ()=>{
      const response = await fetch("/api/querys", {
         method: "POST",
         headers: {
           "Content-Type": "application/json",
         },
         body: JSON.stringify({ user,database,host,password,typeDb}),
       });
 
       const data = await response.json();
   
       if (response.status !== 200) {
         throw data.error || new Error(`Request failed with status ${response.status}`);

       }
       setQuerys(data)
   }
  
   console.log(typeDb,host, "desde querys")
   const {onSubmit,queryInput,setqueryInput,message} = useFormIA(setResult, setQueryResponse,user,password,host,database,setDataQuery,setLoading,typeDb,inputFrecuent);
    useEffect(() => {
       RenderQuerys()
    }, [],dataQuery);

    const HandleClick=(query,input)=>{
       console.log(input)
       setInputFrecuent(input)
       setqueryInput(query)
    }
    return ( 
    
        <div className={Styles.container_modal} >

            <div class="modal-dialog bg-white p-3">
               <div class="modal-content p-2">
                  <div class="modal-header">
                  <h5 class="modal-title my-3">Consultas frecuentes</h5>
                  <button type="button" class="btn-close ms-4" data-bs-dismiss="modal" aria-label="Close" onClick={()=>{setHidden(!hidden)}}></button>
                  </div>
                  <div class="modal-body my-3">
                     {
                        querys.length > 0 ? querys.map((query)=>{
                         return <form onSubmit={onSubmit}>
                                    <button onClick={()=>{HandleClick(query.query_sin_espacios,query.query_sin_espacios)}} className='btn btn-outline-primary'>{query.query_sin_espacios} ({query.num_repeticiones}) </button>
                                 </form>
                        }): "No existen consultas frecuentes aún."
                     }
                  </div>
                  {/* <div class="modal-footer">
                  <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                  <button type="button" class="btn btn-primary">Save changes</button>
                  </div> */}
               </div>
            </div>
     

        </div>

        
     );
}
 
export default Querys;