import { useEffect, useState } from "react";
import BaseTable from "../../../../../components/base-table";
import { getPartners } from "../../../../../../../../data/content/partners/getPartners";
import { deletePartner } from "../../../../../../../../data/content/partners/deletePartner";
import { IGetPartnerResponse } from "../../../../../../../../domain/usecases/content/partner";
import DeleteConfirmationDialog from "../../../../../components/delete-confirmation-dialog";

const PartnersTable = (): JSX.Element => {
  const [partnersData, setPartnersData] = useState<IGetPartnerResponse[] | null | []  >(null);
  const [deletionState, setDeletionState] = useState<string | null>(null);

  async function getPartnersFn() {
    try {
      const result = await getPartners();
      setPartnersData(result.data);
    } catch (error) {
      console.log(error);
    }
  }

  async function handleDelete(id: string) {
    try {
      await deletePartner(id);
      partnersData && setPartnersData(partnersData.filter(partner => partner._id !== id));
      setDeletionState(null);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getPartnersFn();
  }, []);

  return(
    <>
  <BaseTable data={partnersData} onDelete={setDeletionState} />;
  {deletionState &&
        <DeleteConfirmationDialog
          deletionState={deletionState}
          setDeletionState={setDeletionState}
          onConfirm={() => handleDelete(deletionState)}
        />}
  </>
  )
}

export default PartnersTable;