import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { getPistaObject } from "../utils/PistaUtils";

export const Reserva = () => {
  const id = useParams().id();
  const [pista, setPista] = useState(undefined);

  useEffect(() => {
    getPistaObject(parseInt(id, "10")).then((response) => {
      setPista(response);
    });
  }, []);

  


  return <div></div>;
};
