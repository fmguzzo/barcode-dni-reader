import React, { useEffect } from 'react';
import { BrowserMultiFormatReader, NotFoundException } from '@zxing/library';

function BarcodeScanner({setIsScaning, setResult}) {

  useEffect(() => {
    const codeReader = new BrowserMultiFormatReader();
    let decodeIfNotUnmount = true;
    const startDecoding = async () => {
      try {
        const videoInputDevices = await codeReader.listVideoInputDevices();
        const deviceId = videoInputDevices[0].deviceId;
        if (decodeIfNotUnmount) {
          const result = await codeReader.decodeOnceFromVideoDevice(deviceId, 'video');
          setResult(result.text);
          setIsScaning(false);
        }
      } catch (err) {
        console.error("[startDecoding]: ", err.message);
        setResult(null);
        setIsScaning(false);
      }
    }
    startDecoding();

    return () => {
      decodeIfNotUnmount = false;
      codeReader.reset();
    }

  }, [])

  const cancelHandler = () => {
    setIsScaning(false);
    setResult(null);
  }

  return (
    <div className='reader-container'>
      <video id="video" className='video-scanner'></video>
      <button className='btn-cancel-scanner' onClick={cancelHandler}>Cancel</button>
    </div>
  )
}

export default BarcodeScanner;
