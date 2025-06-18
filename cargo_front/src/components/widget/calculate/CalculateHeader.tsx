import { getFormatMoney, getFormatYuan } from "../../utils/common";
import { BoxIcon, CarIcon } from "../../assets/icons";

interface Props {
  calculatePrice: any;
  warehouse: any

}
const CalculateHeader = ({
  calculatePrice, warehouse
}: Props) => {


  return (
    <>
      {/* DESKTOP START */}
      <div className="xs:hidden lg:flex flex-col gap-6">
        <div
          className={`group/item grid xs:grid-cols-1 lg:grid-cols-2 xs:gap-3 lg:gap-6 cursor-pointer`}
        >
          <div
            className={`border border-light rounded-xl hover:border-primary px-4 h-20 flex items-center justify-between`}
          >
            <div className={`grid`}>
              <div
                className={`flex items-center gap-1 text-base font-semibold text-black leading-4`}
              >
                1кг ачаа
              </div>
              <div className={`text-dark font-regular text-sm`}>
                {getFormatMoney(+warehouse?.kg)}
              </div>
            </div>
            <div
              className={`flex-none bg-light/50 group-hover/item:bg-primary/10 w-9 h-9 rounded-full flex items-center justify-center`}
            >
              <span
                className={`stroke-2 stroke-black group-hover/item:stroke-primary`}
              >
                <BoxIcon size="16" />
              </span>
            </div>
          </div>
          <div
            className={`border border-light rounded-xl hover:border-primary px-4 h-20 flex items-center justify-between`}
          >
            <div className={`grid`}>
              <div
                className={`flex items-center gap-1 text-base font-semibold text-black leading-4`}
              >
                1м3 ачаа
              </div>
              <div className={`text-dark font-regular text-sm`}>
                {getFormatYuan(Math.ceil((+warehouse?.m3 * warehouse?.rate) / 100) * 100)}
              </div>
            </div>
            <div
              className={`flex-none bg-light/50 group-hover/item:bg-primary/10 w-9 h-9 rounded-full flex items-center justify-center`}
            >
              <span
                className={`stroke-2 stroke-black group-hover/item:stroke-primary`}
              >
                <BoxIcon size="16" />
              </span>
            </div>
          </div>
        </div>
        <div
          className={`bg-primary/10 rounded-xl hover:border-primary px-4 py-5 flex-col flex gap-px`}
        >
          <div className="text-primary font-medium flex gap-3">
            <span className="stroke-primary">
              <CarIcon />
            </span>
            <p className="">Тээврийн зардал</p>
          </div>
          <p className="text-lg font-semibold text-dark">{calculatePrice}₮</p>
        </div>
      </div>
      {/* DESKTOP END */}

      {/* MOBILE START */}

      <div className="xs:flex flex-col lg:hidden items-center w-full bg-primary/10 rounded-md px-5 space-y-4 border border-primary/10">
        <div className="grid gap-2 leading-none text-center border-b border-b-light w-full py-4">
          <p className="text-sm font-medium text-black">Тээврийн зардал</p>
          <h2 className="text-lg font-bold text-primary">{calculatePrice}₮</h2>
        </div>
        <div className="grid gap-2 leading-none text-start text-sm text-dark font-regular w-full pb-4">
          <p>Хэмжээ: 0.12м³</p>
          <p>Жин: 3кг</p>
        </div>
      </div>

      {/* MOBILE END */}

    </>
  );
};

export default CalculateHeader;
