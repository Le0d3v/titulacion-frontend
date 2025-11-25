import { createRef } from "react";

export default function ComentarioForm({ id, proceso, setLoading }) {
  const comentarioRef = createRef();

  const handleSubmitComentario = async (e) => {
    e.preventDefault();
  };

  return (
    <form onSubmit={handleSubmitComentario}>
      <legend>Redacta un comentario</legend>
      <div>
        <label htmlFor="comentario">Comentario:</label>
        <textarea name="comentario" id="" ref={comentarioRef}></textarea>
      </div>
      <div>
        <button type="submit">Enviar</button>
      </div>
    </form>
  );
}
