import React, { useEffect } from 'react';
import { BrowserMultiFormatReader, NotFoundException } from '@zxing/library';

function BarcodeScanner({setIsScaning, setResult}) {

  const decodeCallback = (result, err) => {
    if (result) {
      setResult(result.text);
      setIsScaning(false);
    }
    if (err && !(err instanceof NotFoundException)) {
      console.error("[startDecoding]: ", err.message);
      setResult(null);
      setIsScaning(false);
    }
  }

  useEffect(() => {
    const codeReader = new BrowserMultiFormatReader();
    const startDecoding = async () => {
      try {
        const videoInputDevices = await codeReader.listVideoInputDevices();
        console.log("termino effect......")
        const deviceId = videoInputDevices[0].deviceId;
        await codeReader.decodeFromVideoDevice(deviceId, 'video', decodeCallback);
        // const result = await codeReader.decodeOnceFromVideoDevice(deviceId, 'video');
        console.log('resultado',result);
      } catch (err) {
        console.error("[startDecoding]: ", err.message);
      }
    }
    startDecoding();
    /*
    let selectedDeviceId;
    const codeReader = new BrowserMultiFormatReader();

    codeReader.listVideoInputDevices()
    .then((videoInputDevices) => {
      selectedDeviceId = videoInputDevices[0].deviceId
      codeReader.decodeFromVideoDevice(selectedDeviceId, 'video', (result, err) => {
        if (result) {
          console.log(result, 'fmg11')
          setResult(result.text)
          setIsScaning(false)
        }
        if (err && !(err instanceof NotFoundException)) {
          console.log(err,'fmg11')
          setResult(null)
        }
      })
    })
    .catch((err) => {
      console.log(err, 'fmg11')
    })
    */

    return () => {
      console.log("-UnMount BarcodeScanner-",codeReader,'fmg11');
      codeReader.reset();
    }

  }, [])

  const cancelHandler = () => {
    setIsScaning(false);
    setResult(null);
  }

  return (
    <div>
      <button className='btn-cancel-scanner' onClick={cancelHandler}>Cancel</button>
      {/* <video id="video" width="300" height="200" style="border: 1px solid gray"></video> */}
      <video id="video" width="50%"></video>
    </div>
  )
}

export default BarcodeScanner;
