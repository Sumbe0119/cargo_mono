import { useParams } from "react-router-dom";
import CargoAddress from "../components/widget/cargoAddress/CargoAddress";



const BranchSingle = () => {
  const { id: warehouseId } = useParams();

  if (!warehouseId) {
    return (
      <div className="simple-container xs:px-4 lg:px-0 xs:space-y-3 lg:space-y-12 xs:mt-6 lg:mt-24">
        <h1 className="text-center text-lg font-semibold text-red-500">
          Агуулахын мэдээлэл олдсонгүй
        </h1>
      </div>
    );
  }

  return (
    <CargoAddress warehouseId={+warehouseId} />
  );
};

export default BranchSingle;
