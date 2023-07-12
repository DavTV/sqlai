const FormDB = ({setDatabase,setHost,setUser,setPassword,setTypeDb}) => {
    return ( 
    <>
        <form className="col-12 col-md-6 my-3" >
          <p >Debes conectarte a tu base de datos primero</p>  
          <input
            type="text"
            name="host"
            placeholder="Ingrese host"
            className="form-control mb-2"
            onBlur={(e)=>{ setHost(e.target.value)}}
           
          />
          <input
            type="text"
            name="password"
            placeholder="Ingrese password"
            className="form-control mb-2"
            onBlur={(e)=>{ setPassword(e.target.value)}}
           
          />
          <input
            type="text"
            name="user"
            placeholder="Ingrese user"
            className="form-control mb-2"
            onBlur={(e)=>{ setUser(e.target.value)}}
           
          />
          <div>
          <input
            type="text"
            name="database"
            placeholder="Ingrese database"
            className="form-control mb-2"
            onBlur={(e)=>{setDatabase(e.target.value) }}
           
          />

           <select className="form-select" onChange={(e)=>{
             setTypeDb(parseInt(e.target.value))}} >
             <option value={0}>Mysql</option>
             <option value={1}>Postgres</option>
           </select>
          </div>
        </form>
    
    
    </> );
}
 
export default FormDB;