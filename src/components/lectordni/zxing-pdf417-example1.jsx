import React, { useRef, useState } from 'react';
import { BitmapLuminanceSource, Common, PDF417Reader, BinaryBitmap, HybridBinarizer } from 'zxing-library/esm/index';

const PDF417Example = () => {
  const imgRef = useRef(null);
  const [error, setError] = useState('');

  const handleFiles = (event) => {
    const img = imgRef.current;
    img.src = URL.createObjectURL(event.target.files[0]);
  }

  const doScan = (image) => {
    const canvas = document.createElement('canvas');
    const canvas_context = canvas.getContext('2d');
    let source, binarizer, bitmap;

    setError('');

    canvas.width = image.naturalWidth;
    canvas.height = image.naturalHeight;
    canvas_context.drawImage(image, 0, 0, canvas.width, canvas.height);

    try {
      source = new BitmapLuminanceSource(canvas_context, image);
      binarizer = new HybridBinarizer(source);
      bitmap = new BinaryBitmap(binarizer);

      const decodedData = PDF417Reader.decode(bitmap, null, false)[0].Text;
      const decodedArray = decodedData.split('@');

      const numTramite = decodedArray[0];
      const apellido = decodedArray[1];
      const nombre = decodedArray[2];
      const sexo = decodedArray[3];
      const dni = decodedArray[4];
      const FechaNacimiento = decodedArray[6];
      const fechaEmision = decodedArray[7];

      console.log('NumeroTramite:', numTramite);
      console.log('Apellido:', apellido);
      console.log('Nombre:', nombre);
      console.log('Sexo:', sexo);
      console.log('dni:', dni);
      console.log('FeachaNacimiento: ', FechaNacimiento)
      console.log('FechaEmisión:', fechaEmision);

    } catch (err) {
      setError(err);
    }
  }

  return (
    <div>
      <input type="file" accept="image/*" onChange={handleFiles} />
      <img ref={imgRef} alt="Image to scan" />
      {error && <p>Error: {error}</p>}
      <button onClick={() => doScan(imgRef.current)}>Scan</button>
    </div>
  );
}

export default PDF417Example;
