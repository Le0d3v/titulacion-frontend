import { useContext } from "react";
import TitulationContext from "../context/TitulationProvider";

const useTitulation = () => {
  return useContext(TitulationContext);
};

export default useTitulation;
