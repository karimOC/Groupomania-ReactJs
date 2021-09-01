import React from "react";
import "../styles/_oneMess.scss";
import axios from "axios";

function deleteComm(props) {
  function deleteComment() {
    if (window.confirm("Voulez-vous supprimer ce commentaire ?")) {
      let token = localStorage.getItem("token");

      axios
        .delete(
          "http://localhost:3000/api/messages/" +
            props.idParams +
            "/comment/" +
            props.idComm,
          {
            headers: { Authorization: "Bearer " + token },
          }
        )
        .then(() => {
          alert("Votre commentaire a bien été supprimé !");
          document.location.reload();
        })
        .catch((error) => {
          console.log({ error });
        });
    }
  }

  return (
    <div className="btn-supp-comm">
      <button onClick={deleteComment}>
        <i className="far fa-trash-alt fa-xs"></i>
      </button>
    </div>
  );
}

export default deleteComm;
