import { useModal } from "@/hooks/useModal";
import Icon from "../icon/icon";
import "./navbar.scss";
import Modal from "../modal/modal";

export default function Navbar() {
  const { isOpen, openModal, closeModal, toggleModal } = useModal();

  return (
    <div className="navbar-container">
      <Icon
        src="img/icons/help.png"
        alt={"about"}
        size="sm"
        onClick={toggleModal}
      />
      
      <Modal isOpen={isOpen}>
        <div className="navbar-modal-close-btn" onClick={closeModal}>
          <Icon
            src="img/icons/cancel.png"
            alt={"close"}
            size="sm"
          />
        </div>
        <div className="navbar-modal-content">
          <h2>About holo-fi</h2>
          <p>Holo-fi is a music player that plays chill lofi music produced by Hololive, developed by <a href="https://github.com/roifjcf" target="_blank">roifjcf</a>.</p>
          <p>This is a fan-made application and is not officially associated with Cover Corp.</p>
          <p>Enjoy holo-fi? <a href="https://ko-fi.com/fcjfior" target="_blank">Buy me a coffee!</a></p>
          <p><a href="https://github.com/roifjcf/holo-fi" target="_blank">Source code</a></p>
        </div>

      </Modal>
    </div>
  );
}