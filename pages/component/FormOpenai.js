import { useFormIA } from "../../hooks/useOpenai";
const FormOpenai = ({setResult, setQueryResponse,user,password,host,database,setDataQuery,setLoading,loading,setHidden,hidden,typeDb}) => {
  console.log(typeDb,"desde formOpenai -----------")
  // const inputFrecuent = "";
  const {onSubmit,queryInput,setqueryInput,message} = useFormIA(setResult, setQueryResponse,user,password,host,database,setDataQuery,setLoading,typeDb);
  

  return (
    <div className="col-12 col-md-6 my-3">       
          <form  onSubmit={onSubmit}>
          <p >Escribe tu consulta</p>  
            <textarea
              type="text"
              name="query"
              placeholder="Ingrese consulta"
              value={queryInput}
              className="form-control mb-3"
              onChange={(e) => setqueryInput(e.target.value)}
            ></textarea>
            <input type="submit" value="Generar Consulta" className="btn btn-primary" disabled={loading} />
          <small className="d-block my-3"    >
              {message}
          </small>
          </form>
          <button  className="btn btn-primary" onClick={()=>{setHidden(!hidden)}} >Consultas frecuentes</button>
          </div>
   
  );
  
}
 
export default FormOpenai;