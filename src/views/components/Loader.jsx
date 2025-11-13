import { ClipLoader } from "react-spinners";
import { useState } from "react";

export default function Loader() {
  return (
    <div className="w-full h-100 flex justify-center items-center">
      <div>
        <div className="my-2 flex justify-center">
          <ClipLoader
            color="emerald"
            size={80}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>
        <h1 className="text-sm">Cargando Información...</h1>
      </div>
    </div>
  );
}
