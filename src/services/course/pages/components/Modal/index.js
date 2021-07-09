const Modal = ({}) => {
const openModalDialog = () => {
  let modal = document.getElementById("myModal");
  modal.style.display = "block";
}  
return (
        <div> 
          <h2>Modal Example</h2>
            <button id="myBtn" onClick={openModalDialog}>Open Modal</button> 
            <div id="myModal" className="modal">
            <div class="modal-content">
              <span class="close">&times;</span>
              <p>Some text in the Modal..</p>
            </div>
          </div> 
        </div>
)}

export default Modal;