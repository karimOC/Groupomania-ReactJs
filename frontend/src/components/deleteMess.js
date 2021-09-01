import React from "react";
import "../styles/_oneMess.scss";
import axios from "axios";

function deleteMess(props) {
  function deleteMessage() {
    if (window.confirm("Voulez-vous supprimer ce message ?")) {
      let token = localStorage.getItem("token");

      axios
        .delete("http://localhost:3000/api/messages/" + props.idMess, {
          headers: { Authorization: "Bearer " + token },
        })
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
    <div className="btn-supp-mess">
      <button onClick={deleteMessage}>
        <i className="fas fa-ellipsis-h fa-sm"></i>
      </button>
    </div>
  );
}

export default deleteMess;
