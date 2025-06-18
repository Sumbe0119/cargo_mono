import { useState, useMemo } from "react";
import CustomInput from "../components/shared/CustomInput";
import CalculateHeader from "../components/widget/calculate/CalculateHeader";

interface BoxDimensions {
  width: number;
  height: number;
  length: number;
  weight: number;
}

const WAREHOUSE = {
  kg: 3000,
  m3: 599,
  name: "Эрээн агуулах",
  rate: 399
}
const Calculate = () => {

  const [dimensions, setDimensions] = useState<BoxDimensions>({
    weight: 0,
    height: 0,
    length: 0,
    width: 0,
  });
  console.log("🚀 ~ Calculate ~ dimensions:", dimensions)


  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const handleChange = (field: keyof BoxDimensions, value: string) => {
    if (!/^\d*\.?\d*$/.test(value)) {
      setFormErrors((prev) => ({ ...prev, [field]: "Зөвхөн тоо оруулна уу." }));
      return;
    }

    setDimensions((prev) => ({
      ...prev,
      [field]: value === "" ? 0 : Number(value),
    }));

    if (formErrors[field]) {
      setFormErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  // Оворын жин тооцоолол
  const price = useMemo(() => {
    const volumeM3 =
      (dimensions.height / 100) *
      (dimensions.length / 100) *
      (dimensions.width / 100);
    const priceByKg = dimensions.weight * WAREHOUSE.kg;
    const priceByM3 = volumeM3 * (WAREHOUSE.m3 * WAREHOUSE.rate);

    // 100-рүү бүхэлдэнэ
    return Math.ceil(Math.max(priceByKg, priceByM3) / 100) * 100;
  }, [dimensions]);




  // Мөнгөний формат
  const formattedPrice = useMemo(() => {
    return new Intl.NumberFormat("mn-MN").format(price);
  }, [price]);

  return (
    <div className="simple-container xs:px-4 lg:px-0 xs:space-y-3 lg:space-y-11 xs:mt-6 lg:mt-24">
      {/* Агуулах сонгох хэсэг */}

      <CalculateHeader
        warehouse={WAREHOUSE}
        calculatePrice={formattedPrice}
      />

      <div className="grid gap-1">
        <div className="grid xs:grid-cols-1 lg:grid-cols-3 xs:gap-3 lg:gap-6">
          <CustomInput
            label="Өргөн"
            placeholder="өргөн"
            value={dimensions.width}
            onChange={(e) => handleChange("width", e)}
            error={formErrors.width}
            showText
            inputMode="numeric"
            simpleText="cm"
          />
          <CustomInput
            label="Өндөр"
            placeholder="өндөр"
            value={dimensions.height}
            onChange={(e) => handleChange("height", e)}
            error={formErrors.height}
            showText
            inputMode="numeric"
            simpleText="cm"
          />
          <CustomInput
            label="Урт"
            placeholder="урт"
            value={dimensions.length}
            onChange={(e) => handleChange("length", e)}
            error={formErrors.length}
            showText
            inputMode="numeric"
            simpleText="cm"
          />
        </div>
        <CustomInput
          label="Жин"
          placeholder="жин"
          value={dimensions.weight}
          onChange={(e) => handleChange("weight", e)}
          error={formErrors.weight}
          showText
          inputMode="numeric"
          simpleText="kg"
        />
      </div>

      <div className="flex items-center justify-center w-full gap-3">
        <img alt="example_1" className="xs:h-[140px] lg:h-[200px] w-auto object-cover bg-cover" src="/cargo_1.png" />
        <img alt="example_2" className="xs:h-[140px] lg:h-[200px] w-auto object-cover bg-cover" src="/cargo_2.png" />
      </div>
      <div className="flex-col flex gap-5 items-start text-dark font-regular">
        <div className="grid gap-3 leading-none text-base text-black font-semibold">
          <p>Барааны овор</p>
          <span className="text-dark font-normal text-sm">
            (Урт * Өргөн * Өндөр) / 1000000 * 1м3 үнэлгээ
          </span>
        </div>
        <div className="grid gap-3 leading-none text-base text-black font-semibold">
          <p>Барааны жин</p>
          <span className="text-dark font-normal text-sm">
            Барааны жин * 1кг үнэлгээ
          </span>
        </div>
        <div className="grid gap-3 leading-none text-base text-black font-semibold">
          <p>Тээврийн зардал бодох аргачлал</p>
          <ul className="text-dark font-normal text-sm list-disc pl-5 grid gap-2">
            <li>
              {" "}
              0-1кг хүртэл = 3,000 ₮ нэмэгдэх 1 кг тутамд 3,000 ₮, 1м3 = 599¥
            </li>
            <li>
              {" "}
              Тусдаа ирсэн болон өөр дэлгүүрийн барааг тус тусад нь бодно
            </li>
            <li>
              {" "}
              Овор ихтэй ууттай куртик, хөнжил гэх мэт зүйлс овор хэмжээнээсээ
              хамаараад ойролцоогоор 5000₮-10000₮ хооронд байдаг.
            </li>
            <li>Гутлын хайрцаг 4000₮-8000₮ хооронд</li>
          </ul>
        </div>
        <div className="grid gap-3 leading-none text-base text-black font-semibold">
          <p>Жингээр бодох уу?, овроор бодох уу?</p>
          <span className="text-dark font-normal text-sm">
            Таны захиалсан бараа харьцангуй хүнд боловч жижиг хэмжээтэй бол
            жингээр тээврийн зардлыг тооцоолно. (Үүнийг төмөр туухайтай зүйрлэж
            ойлгож болно.) Хэрэв таны бараа хөнгөн боловч овор хэмжээ нь
            харьцангуй том байвал овор хэмжээгээр тээврийн зардлыг бодно.
            (Үүнийг хөнгөн унадаг дугуйтай зүйрлэж ойлгож болно.)
          </span>
        </div>
      </div>
    </div>
  );
};

export default Calculate;
