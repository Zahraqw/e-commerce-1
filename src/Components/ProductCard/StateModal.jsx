import { out, few, inn, retired, Modal, useDispatch, useSelector, showStateModal, closeStateModal } from '../../Constants';

const StateModal = () => {
  const dispatch = useDispatch();
  const showModal = useSelector(showStateModal);

  return (
    <Modal className="product-state" show={showModal} onHide={() => dispatch(closeStateModal())}>
      <Modal.Header closeButton>
        <Modal.Title>What do the color bubbles mean?</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <ul className="list-unstyled mod">
          <li><img className="quantity" src={out} alt="out of stock" /><span>An empty red circle denotes a product which is out of stock.</span></li>
          <li><img className="quantity" src={few} alt="few in stock" /> <span>A half-empty yellow circle denotes a product has a low quantity.</span></li>
          <li><img className="quantity" src={inn} alt="in stock" /> <span>A full green circle denotes a product has a hight quantity.</span></li>
          <li><img className="quantity" src={retired} alt="retired" /><span>A gray slashed-out circle denotes a product which is retired; we might have replaced it with a newer revision or might not carry the product anymore.</span></li>
        </ul>
      </Modal.Body>
    </Modal>
  )
}

export default StateModal