import { useEffect, useState } from 'react'
import './App.css'
import { getMaxFromArray } from 'sample-lib/lib/getMax';
import { fibonacci } from 'fibonaci-lib';
import { ImageConverter } from 'image-compression';


function App() {
  const [file, setFile] = useState<File | null>(null);
  const [convertedURL, setConvertedURL] = useState<string | null>(null);


  useEffect(() => {
    console.log(fibonacci(5));
    console.log(getMaxFromArray([1,2,34,4]));
  }, []);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files?.[0]) {
      setFile(event.target.files[0]);
    }
  };

  const handleConversion = async () => {
    if (file) {
      const converter = new ImageConverter();
      const url = await converter.handleConvert(file, 100);
      setConvertedURL(url);
    }
  };

  return (
    <div className="converter">
      <input type="file" accept="image/*" onChange={handleFileChange} /><br />
      <button className="convert-button" onClick={handleConversion} type="button">Convert to WebP</button>
      {convertedURL && (
        <div>
          <p>Converted Image:</p>
          <img width="700px" height="500px" src={convertedURL} alt="Converted to WebP" /><br />
          <a href={convertedURL} download="converted_image.webp">Download WebP</a>
        </div>
      )}
    </div>
  );
}

export default App
