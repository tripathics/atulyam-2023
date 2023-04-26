import React from 'react'
import ReactDOM from "react-dom";
import QRCode from "react-qr-code";

const details="Hello gusys i am pursottam sah a student of computer science";


const QrCode = ({value}) => {
  return (
    <>
    <div style={{ height: "auto", margin: "0 auto", maxWidth: 150, width: "100%" }}>
    <QRCode
    size={300}
    style={{ height: "auto", maxWidth: "100%", width: "100%" }}
    value={value}
    viewBox={`0 0 400 400`}
    />
    </div>
    </>

  )
}

export default QrCode