import React, {useState, useEffect} from 'react';
import BarcodeScanner from '../BarcodeScanner/BarcodeScanner';

function DniScanner() {
  const [isScaning, setIsScaning] = useState(false);
  const [result, setResult] = useState(null);

  const scanHandler = () => {
    setResult(null);
    setIsScaning(true);
  }

  const parseDniResult = (text) => {
    let nombre = '',
        apellido = '',
        dni = '',
        sexo = '',
        fechaNac = '';
    let data = text.split('@');
    if( data.length == 8 ||  data.length == 9 ) {
      // Formato nuevo
      apellido = data[1].trim();
      nombre   = data[2].trim();
      sexo     = data[3].trim();
      dni      = data[4].trim();
      fechaNac = data[6].trim();
    } else if (data.length == 15) {
      // Formato anterior
      apellido = data[4].trim();
      nombre   = data[5].trim();
      sexo     = data[8].trim();
      dni      = data[1].trim();
      fechaNac = data[7].trim();
    } else {
      // Formato NO identificado
      console.error("[parseDniResult]: Formato DNI no identificado");
    }
    return {
      apellido,
      nombre,
      sexo,
      dni,
      fechaNac
    }
  }

  useEffect(() => {
    if (result) {
      // const inputDni = document.getElementById('client-document');
      // inputDni.value = parseDniResult(result).dni;
      console.log(parseDniResult(result),'fmg11')
    }

    // return () => {
    //   second
    // }
  }, [result])


  return (
    <div>
      {
        isScaning ? 
          <BarcodeScanner setIsScaning={setIsScaning} setResult={setResult}/> : 
          <button className='btn-dni-scanner' onClick={scanHandler}>Escanear DNI</button>
      }
    </div>
  )
}

export default DniScanner;

