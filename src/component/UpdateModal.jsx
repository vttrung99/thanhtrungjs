import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { useDispatch } from 'react-redux';
import { edit } from './countSlice';

function UpdateModal({item}) {
    const [editTask, setEditTask] = useState(item.name)
    const [editStatus, setEditStatus] = useState(item.status ? "Complete" : "Incomplete")
    const dispatch = useDispatch();
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Edit
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Task</Form.Label>
              <Form.Control
                type="text"
                autoFocus
                value={editTask}
                onChange={(e) => setEditTask(e.target.value)}
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <select value={editStatus} onChange={(e) => setEditStatus(e.target.value)}>
                <option value="Incomplete">Incomplete</option>
                <option value="Complete">Complete</option>
              </select>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={() => {handleClose()
            if (editStatus === "Complete") {
                dispatch(edit({
                    ...item,
                    name: editTask,
                    status: true
                }))
             
            } else if (editStatus === "Incomplete") {
                dispatch(edit({
                    ...item,
                    name: editTask,
                    status: false
                }))
               
            }
            
        }}>
            Update
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default UpdateModal;