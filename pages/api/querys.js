
const express = require('express');
const mysql = require('mysql');
const bodyParser= require('body-parser');
const server = express();
server.use(bodyParser.json());
export default function handler(req, res){
    console.log(req.body)
        const host = req.body.host,
        user  = req.body.user,
        password = req.body.password,
        database = req.body.database;
        const typeDb = req.body.typeDb;

        console.log(typeDb)
    switch (typeDb) {
        case 0:
            const connection = mysql.createConnection({
                host:host,
                user: user,
                password:password,
                database: database      
              })
              connection.connect(function(error){                                                                                                 
                try{ 
                   if(error){ 
        
                       console.log("Error al establecer la conexión a la BD -- " + error); 
                       res.status(200).json({message: "Error de conexión", exito:false})
                   }else{  
                       console.log("Conexión exitosa querys"); 
                       
                       connection.query(`SELECT  TRIM(BOTH ' ;' FROM query) AS query_sin_espacios, COUNT(*) AS num_repeticiones
                       FROM querys
                       GROUP BY query_sin_espacios
                       HAVING COUNT(*) >= 3
                       ORDER BY num_repeticiones DESC;`,(error,results)=>{
                          console.log(results)
                           res.status(200).json(results)
                      })
                          
                      // cunsulta aquí
                   } 
               }
               catch(x){ 
                   console.log("Eror de conexion de usuario --Error-- " + x); 
               } 
        });
            
            break;
        case 1:
            const  pool = new Pool({
                user: user,
                password:password,
                host: host,
                database:database,
              })
      
            console.log("abajo")
            const pgp = require('pg-promise')({
             noWarnings: true
             })  
             const db = pgp(`postgres://${user}:${password}@${host}:5432/${database}`);
             const postGres= async()=>{
              
                try {
                    const result = await db.many(`SELECT query_sin_espacios, num_repeticiones
                    FROM (
                        SELECT TRIM(BOTH ' ;' FROM query) AS query_sin_espacios, COUNT(*) AS num_similares
                        FROM querys
                        GROUP BY query_sin_espacios
                    ) AS subquery
                    WHERE num_similares >= 4
                    ORDER BY num_similares DESC;`);
              
                  

                    //   res.status(200).json({ result: completion.data.choices[0].text, query: inputFrecuent || query, message: "Conection successfull", exito: true, details: result})  
                      console.log("Conexión exitosa querys"); 
                      console.log(result)
                      res.status(200).json(result)
                  } catch (error) {
                    
                    console.log("Error al establecer la conexión a la BD -- " + error); 
                    res.status(200).json({message: "Error de conexión", exito:false})
                    
                  }
  
  
  
                
               //  console.log(result)
              }
              postGres()
            
            break;
        default:
            break;
    }
    // console.log(req.body)

        
};
