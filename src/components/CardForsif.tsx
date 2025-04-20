import { forwardRef } from "react";
import codingLogo from "../assets/programmer.png";
import { ProgrammerData } from "../types";
import clsx from "clsx";
import "./card.css";
interface UIProps {
  imagePreview: string | null;
  isScreenshot?: boolean;
}
const CardForsif = forwardRef<HTMLDivElement, ProgrammerData & UIProps>(
  (
    {
      no_angggota,
      nama_lengkap,
      techstack,
      bahasa_fav,
      level,
      imagePreview,
      isScreenshot,
    },
    ref
  ) => {
    return (
      <div
        className={clsx(
          "shadow-xl p-4 font-sans relative overflow-hidden",
          isScreenshot
        )}
        ref={ref}
        style={{ backgroundColor: "#ffffff" }}
      >
        <div
          className="absolute inset-0 z-0"
          style={{
            background:
              "radial-gradient(circle, rgba(238,238,238,0.3) 1px, transparent 1px)",
            backgroundSize: "20px 20px",
          }}
        />

        <div className="relative z-10">
          <div className="flex items-center justify-between">
            <div className="card-anggota font-light text-xs inline-block p-2 mr-2">
              KARTU ANGGOTA
            </div>
            <div className="card-berlaku text-xs p-2">{`BERLAKU HINGGA 20-07-${
              new Date().getFullYear() + 3
            }`}</div>

            <img
              src={codingLogo}
              alt="Logo Forsif"
              className="h-12 w-12 object-contain  shrink-0"
            />
          </div>

          {/* Body */}
          <div className="flex gap-4 mb-4">
            {/* Photo */}
            <div
              className="w-32 h-32 lg:w-40 lg:h-42 rounded-md flex items-center justify-center"
              style={{ backgroundColor: "#d1d5db" }} // gray-300
            >
              {imagePreview ? (
                <img
                  src={imagePreview}
                  alt="Foto KTP"
                  className="w-full h-full object-cover rounded-md border"
                  style={{ borderColor: "#ffffff" }} // white
                />
              ) : (
                <div
                  className="w-full h-full rounded-md border flex items-center justify-center text-xs"
                  style={{
                    backgroundColor: "#d1d5db", // gray-300
                    borderColor: "#ffffff", // white
                    color: "#000000", // black
                  }}
                >
                  Tidak ada foto
                </div>
              )}
            </div>

            {/* Biodata */}
            <div className="text-xs lg:text-sm space-y-2 max-w-sm ">
              <div className="flex">
                <div className="lg:lg:w-28 font-semibold">Nomor Anggota</div>
                <div className="overflow-hidden w-32 break-words">
                  : {no_angggota}
                </div>
              </div>
              <div className="flex">
                <div className="lg:w-28 font-semibold">Nama Lengkap</div>
                <div className="overflow-hidden w-32 break-words">: {nama_lengkap}</div>
              </div>
              <div className="flex">
                <div className="lg:w-28 font-semibold">Tech Stack / Tools</div>
                <div className="overflow-hidden w-32 break-words">: {techstack}</div>
              </div>
              <div className="flex">
                <div className="lg:w-28 font-semibold">Bahasa Favorit</div>
                <div>: {bahasa_fav}</div>
              </div>
              <div className="flex">
                <div className="lg:w-28 font-semibold">Level</div>
                <div>: {level}</div>
              </div>
            </div>
          </div>
        </div>
        {/* SVG Wave at bottom */}
        {/* <img src={wave} alt="asas"  /> */}
        <div
          className="w-full h-4 absolute bottom-0 left-1/2 transform -translate-x-1/2"
          style={{ backgroundColor: "#3b82f6" }}
        ></div>

        <div
          className="w-full h-4 absolute top-0 left-1/2 transform -translate-x-1/2"
          style={{ backgroundColor: "#3b82f6" }}
        ></div>
      </div>
    );
  }
);

export default CardForsif;
