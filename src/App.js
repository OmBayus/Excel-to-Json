import React, { useEffect, useState } from "react"
import XLSX from 'xlsx';

const App = ()=> {

  const [file,setFile] = useState(null)
  const [table,setTable] = useState([])

  useEffect(()=>{
    document.getElementById('file').addEventListener('change',(e)=>{
      setFile(e.target.files[0])
    })
  })

  const Convert = ()=>{
    if(file){
      let fileReader = new FileReader()
      fileReader.readAsBinaryString(file)
      fileReader.onload = (e)=>{
        let data = e.target.result
        let workbook = XLSX.read(data, {type:'binary'})
        console.log(workbook)
        workbook.SheetNames.forEach(element => {
          let rowObject = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[element])
          console.log(rowObject)
          setTable(rowObject)
        });
      }
    }
  }

  return (
    <div className="App">
      <div>
        <input type="file" id="file" accept=".xls,.xlsx"/>
        <button type="button" onClick={Convert}>Convert</button>
      </div>
      <div>
        {table.map(item=>{
          return(<p key={item.No}>
            <b>Ad:</b> {item.Ad} <b>Soyad</b>: {item.Soyad} <b>No:</b> {item.No}
          </p>)
        })}
      </div>
    </div>
  );
}

export default App;
