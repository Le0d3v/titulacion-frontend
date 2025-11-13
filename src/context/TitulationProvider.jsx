import { createContext, useEffect, useState } from "react";
import clienterAxios from "../config/axios";
import useSWR from "swr";

const TitulationContext = createContext();

const TitulationProvider = ({ children }) => {
  const [modal, setModalOpen] = useState(false);
  const [itemModal, setItemModal] = useState(null);
  const [studentsTsu, setStudentsTsu] = useState([]);
  const [studentsIng, setStudentsIng] = useState([]);

  const openModal = (item) => {
    setModalOpen(true);
    setItemModal(item);
  };

  const closeModal = () => {
    setModalOpen(false);
    setItemModal(null);
  };

  return (
    <TitulationContext.Provider
      value={{
        modal,
        setModalOpen,
        itemModal,
        setItemModal,
        openModal,
        closeModal,
      }}
    >
      {children}
    </TitulationContext.Provider>
  );
};

export { TitulationProvider };

export default TitulationContext;
