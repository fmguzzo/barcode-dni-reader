import React, { useEffect } from 'react';
import { BrowserMultiFormatReader, NotFoundException } from '@zxing/library';

function BarcodeScanner({setIsScaning, setResult}) {

  const getDefaultVideoDevice = (devices) => {
    const iOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
    if( devices.length === 1 || !devices[1]) {
      return devices[0];
    }
  
    if( iOS ) {
      return devices[0];
    } else {
      return devices[1];
    }
  }

  const cancelHandler = () => {
    setIsScaning(false);
    setResult(null);
  }

  useEffect(() => {
    const codeReader = new BrowserMultiFormatReader();
    let decodeIfNotUnmount = true;
    const startDecoding = async () => {
      try {
        const videoInputDevices = await codeReader.listVideoInputDevices();
        const deviceId = getDefaultVideoDevice(videoInputDevices).deviceId;
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

  return (
    <div className='reader-container'>
      <video id="video" className='video-scanner'></video>
      <button className='btn-cancel-scanner' onClick={cancelHandler}>Cancel</button>
    </div>
  )
}

export default BarcodeScanner;
