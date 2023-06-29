import React, { useState } from 'react'
import "./List.scss"
import { useDispatch, useSelector } from 'react-redux'
import * as mdb from 'mdb-ui-kit'; // lib
import { Input } from 'mdb-ui-kit'; // module
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { add, deletes } from './countSlice'
import { randomId } from "@mieuteacher/meomeojs"
import UpdateModal from './UpdateModal';
export default function List() {
  const [listProduct, setListProduct] = useState("")
  const [isDone, setIsDone] = useState("Incomplete")
  const dispatch = useDispatch()
  const list = useSelector((state) => state.list)
  return (
    <div>

      <>
        <button
          type="button"
          className="btn btn-primary"
          data-mdb-toggle="modal"
          data-mdb-target="#exampleModal"
        >
          Launc
        </button>
        <div
          className="modal fade"
          id="exampleModal"
          tabIndex={-1}
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  Modal title
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-mdb-dismiss="modal"
                  aria-label="Close"
                />
              </div>
              <div className="modal-body ">
                <input type="text"
                  class="form-control"
                  placeholder="Username"
                  aria-label="Username"
                  aria-describedby="basic-addon1"
                  value={listProduct} onChange={(e) => {
                    return setListProduct(e.target.value)
                }} />
                <br />
                <select class="custom-select input-group mb-3" style={{ height: '35px' }} id="inputGroupSelect02 "
                 value={isDone} onChange={(e) => setIsDone(e.target.value)}>
                  <option value="Incomplete">Incomplete</option>
                  <option value="Complete">Complete</option>
                </select>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-mdb-dismiss="modal"
                >
                  Close
                </button>
                <button type="button" className="btn btn-primary" data-mdb-dismiss="modal"
                  onClick={() => {
                    console.log(list);
                    if (isDone === "Incomplete") {
                      dispatch(add({ name: listProduct, id: randomId(), status: false }))
                      setIsDone("Incomplete")
                      setListProduct("")
                    } else if (isDone === "Complete") {
                      dispatch(add({ name: listProduct, id: randomId(), status: true }))
                      setIsDone("Incomplete")
                      setListProduct("")
                    }
                  }}
                >
                  Save changes
                </button>
              </div>
            </div>
          </div>
        </div>
      </>
      {/* ---------------------------------------------------- */}
      <table>
        {list.map((item) => (
          
          <ul className="list-group " key={item.id}>
            <li className="list-group-item d-flex justify-content-between align-items-center ">
              <input type="checkbox" checked={isDone==="Incomplete"?"fales":"true"}/>
              {item.name}
              <span>
                <span class="badge badge-primary badge-pill" onClick={() => {
                  console.log(item.id);
                  dispatch(deletes(item.id))
                }} >delete</span>
                <span class="badge badge-primary badge-pill">
                  <UpdateModal item={item} />
                </span>
              </span>
            </li>
          </ul>
        ))}
      </table>
    </div>
  )
}