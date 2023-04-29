import "./dni.scss";
import React, { useState, useEffect } from "react";
import {
  BrowserMultiFormatReader,
  NotFoundException,
  ChecksumException,
  FormatException,
  DecodeHintType,
  BarcodeFormat,
  sourceSelect,
} from "@zxing/library";

export default function () {
  const [selectedDeviceId, setSelectedDeviceId] = useState("");
  const [code, setCode] = useState("");
  const [videoInputDevices, setVideoInputDevices] = useState([]);
  const hints = new Map();
  const formats = [
    BarcodeFormat.CODE_128,
    BarcodeFormat.QR_CODE,
    BarcodeFormat.PDF_417
  ];
  hints.set(DecodeHintType.POSSIBLE_FORMATS, formats);
  hints.set(DecodeHintType.TRY_HARDER, true);
  const codeReader = new BrowserMultiFormatReader(hints);
  const [formattedCode, setFormattedCode] = useState("");

  console.log("ZXing code reader initialized");

  useEffect(() => {
    codeReader
      .getVideoInputDevices()
      .then((videoInputDevices) => {
        setupDevices(videoInputDevices);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  function setupDevices(videoInputDevices) {
    const sourceSelect = document.getElementById("sourceSelect");

    // selects first device
    setSelectedDeviceId(videoInputDevices[1].deviceId);

    // setup devices dropdown
    if (videoInputDevices.length >= 1) {
      setVideoInputDevices(videoInputDevices);
    }
  }
  useEffect(() => {
    const sourceSelect = document.getElementById("sourceSelect");

    if (sourceSelect) {
      codeReader
        .getVideoInputDevices()
        .then((videoInputDevices) => {
          setupDevices(videoInputDevices);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, []);

  function resetClick() {
    codeReader.reset();
    setCode("");
    console.log("Reset.");
  }

  function decodeContinuously(selectedDeviceId) {
    codeReader.decodeFromInputVideoDeviceContinuously(
      selectedDeviceId,
      "video",
      (result, err) => {

        if (result) {
          const data = result.text.split("@");
          const numeroDeTramite = data[0];
          const apellido = data[1];
          const nombre = data[2];
          const sexo = data[3];
          const dni = data[4];
          const fechaNacimiento = data[6];
          const fechaEmision = data[7];
          const cuil = data[8];
          const c1 = cuil.substring(0,2);
          const c2 = cuil.slice(-1);
          const comb = c1+c2+dni

          const formattedData = `
          Nombre: ${nombre}
          Apellido: ${apellido}
          DNI: ${dni}
          Fecha de nacimiento: ${fechaNacimiento}
          Fecha de emisión: ${fechaEmision}
          Numero de tramite:${numeroDeTramite}
          Sexo:${sexo}
          Cuil/Cuit : ${comb}
        `;
          setFormattedCode(formattedData);
          setFormattedCode(formattedData);
          setCode(formattedData);
          alert(formattedData);
        }
        
        if (err) {
          setCode("");
          console.error(err);
        }
      }
    );
  }

  useEffect(() => {
    decodeContinuously(selectedDeviceId);
    console.log(`Started decode from camera with id ${selectedDeviceId}`);
  }, []);

  console.log("sin funcion");

  console.log(code);

  return (
    <main class="wrapper">
      <section className="container" id="demo-content">
        <div id="sourceSelectPanel">
          <label for="sourceSelect">Change video source:</label>
          <select
            id="sourceSelect"
            onChange={() => setSelectedDeviceId(sourceSelect.value)}
          >
            {videoInputDevices.map((element) => (
              <option value={element.deviceId}>{element.label}</option>
            ))}
          </select>
        </div>
  
        <div>
          <video id="video" width="100%" height="360px" />
        </div>
  
        <label>Result: {formattedCode}</label>
        <pre>
          <code>{formattedCode}</code>
        </pre>
  
        <button id="resetButton" onClick={() => resetClick()}>
          Reset
        </button>
      </section>
    </main>
  );  
}
