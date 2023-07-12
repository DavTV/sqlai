import { useState } from "react";
export const useFormIA=(setResult, setQueryResponse,user,password,host,database,setDataQuery,setLoading,typeDb,inputFrecuent="")=>{
  console.log(typeDb, "desde use Openi-",user)
    const [queryInput, setqueryInput] = useState("");
    const [message, setMessage] = useState('');
  async function onSubmit(event) {
    event.preventDefault();
    if(queryInput==""){
     
      setMessage("Ingrese el query primero.")
      return ;
    }
 console.log(queryInput,user,database,typeDb)
    try {
      setLoading(true);
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        // inputFrecuent va al final porque puese ser indefinido
        body: JSON.stringify({ query: queryInput, user, database,host,password,typeDb,inputFrecuent}),
      });

      const data = await response.json();
  
      if (response.status !== 200) {
        console.log("error")
        throw data.error || new Error(`Request failed with status ${response.status}`);
      }

      setResult(data.result);
      setQueryResponse(queryInput)
      setMessage(data.message)
      console.log(data.details, "desde useopenai")+
      setDataQuery(data.details)
      setqueryInput("");
      setLoading(false);
    } catch(error) {
            console.error(error, "el error");

    }
  }
  return {
      onSubmit, queryInput, setqueryInput, message, 
  }

}