import html2canvas from "html2canvas";
import { useRef, useState } from "react";
import CardForsif from "./components/CardForsif";
import { ProgrammerData } from "./types";

function App() {
  const [dataAnggota, setDataAnggota] = useState<ProgrammerData>();
  const [isOpen, setIsOpen] = useState(false);
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setDataAnggota(
      (prevData) =>
        ({
          ...prevData,
          [name as keyof ProgrammerData]: value,
        } as ProgrammerData)
    );
  };

  const [isScreenshot, setIsScreenshot] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [previewURL, setPreviewURL] = useState<string | null>(null);

  const cardRef = useRef<HTMLDivElement | null>(null);
  const [downloadFormat, setDownloadFormat] = useState<"png" | "jpg" | "pdf">(
    "png"
  );

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result as string); // ini base64 string
    };
    reader.readAsDataURL(file);
  };

  const handleDownload = async () => {
    setIsOpen(true);
    const element = cardRef.current;
    if (!element) return;

    try {
      setIsScreenshot(true);
      await new Promise((res) => setTimeout(res, 50));

      const canvas = await html2canvas(element, {
        useCORS: true,
        scale: window.devicePixelRatio,
      });

      const resizedCanvas = document.createElement("canvas");
      resizedCanvas.width = 550;
      resizedCanvas.height = 300;
      const ctx = resizedCanvas.getContext("2d");
      ctx?.drawImage(canvas, 0, 0, 550, 300);
      if (ctx) {
        ctx.font = "20px arial";
      }

      const dataURL = resizedCanvas.toDataURL("image/png");
      setPreviewURL(dataURL);
      const fileName = `kartu-${dataAnggota?.nama_lengkap}`;

      if (downloadFormat === "pdf") {
        const jsPDF = (await import("jspdf")).default;
        const pdf = new jsPDF({
          orientation: "landscape",
          unit: "px",
          format: [canvas.width, canvas.height],
        });
        const imgData = canvas.toDataURL("image/jpeg", 1.0);
        pdf.addImage(imgData, "JPEG", 0, 0, canvas.width, canvas.height);
        pdf.save(`${fileName}.pdf`);
      } else {
        const mimeType = downloadFormat === "jpg" ? "image/jpeg" : "image/png";
        const dataURL = canvas.toDataURL(mimeType);
        const link = document.createElement("a");
        link.href = dataURL;
        link.download = `${fileName}.${downloadFormat}`;
      }
    } catch (err) {
      console.error("Download error:", err);
    } finally {
      setIsScreenshot(false);
    }
  };
  const downloadFromDataURL = async (url: string) => {
    const link = document.createElement("a");
    link.href = url;
    link.download = `preview-download.png`;
    link.click();
  };

  return (
    <div className="flex justify-center flex-col  items-center h-full lg:p-0">
      <div className="flex flex-col lg:flex-row-reverse justify-center p-10 lg:p-8 w-auto lg:w-full items-center  gap-1">
        <form className="border-2 bg-blue-600 shadow-2xl rounded-2xl w-sm sm:w-sm lg:w-xl p-2 lg:p-4 text-white h-full  mx-auto">
          {/* Nomor Anggota */}
          <div className="flex items-center gap-2 p-2">
            <label htmlFor="no_angggota" className="w-28 ">
              No Anggota
            </label>
            <input
              type="text"
              id="no_angggota"
              name="no_angggota"
              maxLength={10}
              className=" flex-1 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5  "
              value={dataAnggota?.no_angggota || ""}
              onChange={handleChange}
            />
          </div>
          {/* Nama Lengkap */}
          <div className="flex items-center gap-2 p-2">
            <label htmlFor="nama_lengkap" className="w-28 ">
              Nama
            </label>
            <input
              type="text"
              id="nama_lengkap"
              name="nama_lengkap"
              className="flex-1 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
              value={dataAnggota?.nama_lengkap || ""}
              onChange={handleChange}
            />
          </div>
          {/* Tech Stack */}
          <div className="flex items-center gap-2 p-2">
            <label htmlFor="techstack" className="w-28 ">
              Tech Stack
            </label>
            <input
              type="text"
              id="techstack"
              name="techstack"
              maxLength={30}
              className="flex-1 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
              value={dataAnggota?.techstack || ""}
              onChange={handleChange}
            />
          </div>

          {/* Bahasa Favorit */}
          <div className="flex items-center gap-2 p-2">
            <label htmlFor="bahasa_fav" className="w-28 ">
              Bahasa
            </label>
            <select
              id="bahasa_fav"
              name="bahasa_fav"
              value={dataAnggota?.bahasa_fav || ""}
              onChange={handleChange}
              className="flex-1 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600"
            >
              <option value="">Pilih Bahasa</option>
              <option value="TypeScript">TypeScript</option>
              <option value="JavaScript">JavaScript</option>
              <option value="Go">Go</option>
              <option value="Python">Python</option>
              <option value="C++">C++</option>
              <option value="Lua">Lua</option>
              <option value="Java">Java</option>
              <option value="PHP">PHP</option>
              <option value="Ruby">Ruby</option>
              <option value="C#">C#</option>
              <option value="Rust">Rust</option>
              <option value="Kotlin">Kotlin</option>
              <option value="Swift">Swift</option>
              <option value="Dart">Dart</option>
              <option value="R">R</option>
              <option value="Scala">Scala</option>
              <option value="Elixir">Elixir</option>
              <option value="Haskell">Haskell</option>
              <option value="Clojure">Clojure</option>
              <option value="F#">F#</option>
              <option value="Objective-C">Objective-C</option>
              <option value="Perl">Perl</option>
              <option value="Shell Scripting">Shell Scripting</option>
              <option value="Assembly Language">Assembly Language</option>

              <option value="GO">Go</option>
            </select>
          </div>

          {/* Level */}
          <div className="flex items-center gap-2 p-2">
            <label htmlFor="level" className="w-28  border-white p-2">
              Level
            </label>
            <select
              id="level"
              name="level"
              value={dataAnggota?.level || ""}
              onChange={handleChange}
              className=" flex-1  bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 "
            >
              <option value="">Pilih Level</option>
              <option value="Pemula">Pemula</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Sepuh">Sepuh</option>
              <option value="dewa">Dewa</option>
            </select>
          </div>

          {/* Upload Gambar */}
          <div className="flex items-center gap-2 p-2 justify-center">
            <div className="flex items-center justify-center w-[400px]">
              <label
                htmlFor="dropzone-file"
                className="flex flex-col items-center justify-center w-full h-40 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 "
              >
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <svg
                    className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 16"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                    />
                  </svg>
                  <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                    <span className="font-semibold">Click to upload</span> or
                    drag and drop
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    SVG, PNG, JPG or GIF (MAX. 800x400px)
                  </p>
                </div>
                <input
                  id="dropzone-file"
                  type="file"
                  className="hidden flex-1"
                  accept="image/*"
                  onChange={handleImageUpload}
                />
              </label>
            </div>
          </div>
        </form>

        <CardForsif
          ref={cardRef}
          bahasa_fav={dataAnggota?.bahasa_fav || "PHP"}
          level={dataAnggota?.level}
          nama_lengkap={dataAnggota?.nama_lengkap}
          no_angggota={dataAnggota?.no_angggota}
          techstack={dataAnggota?.techstack}
          imagePreview={imagePreview}
          isScreenshot={isScreenshot}
        />
      </div>
      <div className="mt-0 lg:mt-10 flex items-center gap-4">
        <select
          value={downloadFormat}
          onChange={(e) => setDownloadFormat(e.target.value as any)}
          className="border border-gray-400 p-2 rounded text-black"
        >
          <option value="png">PNG</option>
          <option value="jpg">JPG</option>
          <option value="pdf">PDF</option>
        </select>

        <button
          onClick={handleDownload}
          className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded"
        >
          Download as {downloadFormat.toUpperCase()}
        </button>
      </div>
      {isOpen && previewURL && (
        <div className="fixed inset-0 bg-black/85 flex items-center justify-center z-50">
          <div className="bg-white p-4 rounded shadow-lg">
            <h2 className="text-lg font-semibold mb-4">Preview</h2>
            <div className="flex flex-col items-center">
              <img
                src={previewURL || ""}
                alt="Preview"
                className="border rounded shadow-md max-w-full"
              />
              <button
                onClick={() => downloadFromDataURL(previewURL)}
                className="mt-2 bg-blue-600 text-white px-4 py-1 rounded"
              >
                Download
              </button>
              <button
                onClick={() => {
                  setIsOpen(false);
                  setPreviewURL(null);
                  setImagePreview(null);
                  setDataAnggota(undefined);

                  setIsScreenshot(false);
                }}
                className="mt-4 bg-red-500 text-white px-4 py-1 rounded"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
