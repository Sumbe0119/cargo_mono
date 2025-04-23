import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { ArrowIcon } from "../components/assets/icons";

const list = [
  {
    question: "Үндсэн нөхцөл",
    answer: [
      "Энэхүү журмаар ХАЙ КАРГО -н (цаашид САЙТ гэнэ) захиалгат худалдааны үйлчилгээ, түүнтэй холбоотой үүсэх бүх төрлийн харилцааг зохицуулна.",
      "Энэхүү журмаар ХАЙ КАРГО -н (цаашид САЙТ гэнэ) захиалгат худалдааны үйлчилгээ, түүнтэй холбоотой үүсэх бүх төрлийн харилцааг зохицуулна.",
      "Энэхүү журмын хэрэгжилтэд САЙТ болон үйлчлүүлэгч хамтран хяналт тавина",
    ],
  },
  {
    question: "Таны бүртгэл",
    answer: [
      "Хай карго Үйлчилгээг ашиглахын тулд олон нийтийн сүлжээний нэвтрэх эрхийг ашиглан хэрэглэгчээр бүртгүүлж, хүчин төгөлдөр утасны дугаарыг оруулах шаардлагатай.",
      "Та өөрийн бүртгэл, нууц үгийн аюулгүй байдлыг хангах үүрэгтэй бөгөөд таны бүртгэлээс хийгдсэн аливаа үйлдлийг хэрэглэгч өөрөө бүрэн хариуцна.",
    ],
  },
  {
    question: "Захиалга",
    answer: [
      "САЙТ нь БНХАУ үйл ажиллагаа эрхэлдэг онлайн болон онлайн бус дэлгүүрүүд, нийлүүлэгчдээс хэрэглэгчийн сонгон захиалсан бараа бүтээгдэхүүнийг худалдан авч, тээвэрлэн үйлчилнэ.",
      "Захиалгын үйлчилгээ нь www.hicargo.mn захиалгын системээр захиалга өгснөөс эхлэн худалдан авалт, тээвэрлэлт, төлбөр төлөлт, барааг хүлээлгэн өгөх хүртэлх бүх үйл явц энэ системээр удирдагдана.",
    ],
  },
];

const Terms = () => {
  return (
    <div className="h-screen w-full pt-32 px-4">
      <div className="bg-light">
        {list.map((item, index) => (
          <Disclosure key={index} as="div" className="h-11 border border-light">
            <DisclosureButton className=" flex w-full items-center justify-between">
              <span className="text-sm font-medium text-dark group-hover:text-dark/80">
                {item.question}
              </span>
              <ArrowIcon size="24" />
            </DisclosureButton>
            <DisclosurePanel className="mt-2 text-sm text-dark">
              {item.answer.map((answer, index) => (
                <div
                  key={index}
                  className="flex flex-col gap-1 text-sm font-medium text-dark"
                >
                  <span className="text-black">{index + 1}.</span>
                  <p>{answer}</p>
                </div>
              ))}
            </DisclosurePanel>
          </Disclosure>
        ))}
      </div>
    </div>
  );
};

export default Terms;
