import BaseButton from '../../../../components/base-ui/base-button';
import style from './DeleteConfirmationDialog.module.css';

export interface IDeleteConfirmationDialog {
    onConfirm:()=> void;
    deletionState:string | null;
    setDeletionState:(state: string | null) => void;
}

const DeleteConfirmationDialog = ({onConfirm, deletionState, setDeletionState}: IDeleteConfirmationDialog): JSX.Element => {
    return (
        <div className={style.delete_confirmation_dialog__container}>
            <h4>Confirm</h4>
            <p>Are you sure you want to delete {deletionState}?</p>
       <div className={style.delete_confirmation__actions}>
            <BaseButton onClick={onConfirm} type='button' content='Delete' />
            <BaseButton onClick={() => setDeletionState(null)} type='button' content='Cancel' />
            </div>
        </div>
    );
}

export default DeleteConfirmationDialog;