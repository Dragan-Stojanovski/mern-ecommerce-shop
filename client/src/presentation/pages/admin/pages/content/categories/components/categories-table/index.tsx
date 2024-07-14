import { useEffect, useState } from "react";
import { getCategories } from "../../../../../../../../data/content/categories/getCategories";
import { deleteCategory } from "../../../../../../../../data/content/categories/deleteCategory";
import BaseTable from "../../../../../components/base-table";
import { ICategory } from "../../../../../../../../domain/usecases/content/categories";
import DeleteConfirmationDialog from "../../../../../components/delete-confirmation-dialog";

const CategoriesTable = (): JSX.Element => {
  const [productCategories, setProductCategories] = useState<ICategory[]>([]);
  const [deletionState, setDeletionState] = useState<string | null>(null);

  async function getCategoriesFn() {
    try {
      const result = await getCategories();
      setProductCategories(result.data);
    } catch (error) {
      console.log(error);
    }
  }

  async function handleDelete(id: string) {
    try {
      await deleteCategory(id);
      setProductCategories(prevCategories =>
        prevCategories.filter(category => category._id !== id)
      );
      setDeletionState(null); 
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getCategoriesFn();
  }, []);

  return (
    <>
      <BaseTable data={productCategories} onDelete={setDeletionState} />
      {deletionState &&
        <DeleteConfirmationDialog
          deletionState={deletionState}
          setDeletionState={setDeletionState}
          onConfirm={() => handleDelete(deletionState)}
        />}
    </>
  );
}

export default CategoriesTable;