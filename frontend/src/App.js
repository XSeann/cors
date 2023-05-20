import {useState} from 'react'
import Login from './pages/login'

function App() {
  const [file, setFile] = useState('')
  const [error, setError] = useState('')

  function submitPdf(e) {
    const reader = new FileReader()
    
    try {
        reader.readAsDataURL(e.target.files[0])
        setError(error.filter(w => w !== 'file'))
    }catch(error) {
        setFile('')
        console.log('Error: ', "Error Happens")
    }
    
    reader.onload = () => {
        setFile(reader.result) //base64encoded
    }
    reader.onerror = error => {
        console.log('Error: ', error)
    }
}

const uploadFile = async () => {
    const response = await fetch('http://localhost:4500/api/file/upload', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({base64File: file})
    }) 
    
    const json = await response.json()

    if (!response.ok) {
        setError(json.error)
    }

    if (response.ok) {
        setFile('')
    }
}

  return (
    <div className="App">
       <input type='file' onChange={submitPdf}/>
        <button onClick={uploadFile}>Submit File</button>
        {error && <div>{error}</div>}
        <Login/>
    </div>
  );
}

export default App;
