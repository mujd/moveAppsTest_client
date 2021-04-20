import { useDispatch, useSelector } from 'react-redux';
import { uiCloseModal } from '../../../actions/ui';
import Modal from 'react-modal';
import { RegisterScreen } from '../Auth/RegisterScreen';
import { userClearActiveUserAction } from '../../../actions/user';

export const UserModal = () => {
   const { modalOpen } = useSelector((state) => state.ui);
   const dispatch = useDispatch();

   const closeModal = () => {
      // TODO: cerrar el modal
      dispatch(uiCloseModal());
      dispatch( userClearActiveUserAction() );
   };
   return (
      <Modal
         isOpen={modalOpen}
         onRequestClose={closeModal}
         style={customStyles}
         closeTimeoutMS={200}
         className="modal"
         overlayClassName="modal-fondo">
         {/* <div className="container w-full"> */}
         <RegisterScreen fromModal={true} />
         {/* </div> */}
         {/* <h1> {activeEvent ? 'Editar evento' : 'Nuevo evento'} </h1>
         <hr />
         <form className="container" onSubmit={handleSubmitForm}>
            <div className="form-group">
               <label>Fecha y hora inicio</label>
               <DateTimePicker
                  onChange={handleStartDateChange}
                  value={dateStart}
                  className="form-control"
               />
            </div>

            <div className="form-group">
               <label>Fecha y hora fin</label>
               <DateTimePicker
                  onChange={handleEndDateChange}
                  value={dateEnd}
                  minDate={dateStart}
                  className="form-control"
               />
            </div>

            <hr />
            <div className="form-group">
               <label>Titulo y notas</label>
               <input
                  type="text"
                  className={`form-control ${!titleValid && 'is-invalid'} `}
                  placeholder="Título del evento"
                  name="title"
                  autoComplete="off"
                  value={title}
                  onChange={handleInputChange}
               />
               <small id="emailHelp" className="form-text text-muted">
                  Una descripción corta
               </small>
            </div>

            <div className="form-group">
               <textarea
                  type="text"
                  className="form-control"
                  placeholder="Notas"
                  rows="5"
                  name="notes"
                  value={notes}
                  onChange={handleInputChange}></textarea>
               <small id="emailHelp" className="form-text text-muted">
                  Información adicional
               </small>
            </div>

            <button type="submit" className="btn btn-outline-primary btn-block">
               <i className="far fa-save"></i>
               <span> Guardar</span>
            </button>
         </form> */}
      </Modal>
   );
};
Modal.setAppElement('#root');
const customStyles = {
   content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      // marginRight: '-50%',
      // transform: 'translate(-50%, -50%)',
   },
};
