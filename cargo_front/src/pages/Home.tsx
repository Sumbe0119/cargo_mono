import CheckProducts from '../components/widget/home/CheckProducts'

const Home = () => {
  return (
    <>
      <div className="container xs:px-4 lg:px-0 xs:mt-6 lg:mt-24">
        <div className="grid xs:grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="flex flex-col gap-5">
            <h1 className="xs:hidden lg:grid gap-1">
              {/* <span className="text-base font-medium text-primary">
                SkyLine cargo
              </span> */}
              <span className="xs:text-md md:text-xl leading-tight font-semibold text-black">Түргэн шуурхай найдвартай үйлчилгээг эрхэмлэнэ</span>
            </h1>
            <div className="flex flex-col gap-2">
              <h1 className="text-base font-medium text-primary">
                Дэлгүүрийн хаяг холбох
                <p className="text-sm font-normal text-black">Та доор дэлгүүрээс өөрийн ашгилдаг худалдааны platform -оо сонгон заавар аа үзнэ үү</p>
              </h1>
              <div className="flex gap-12">
                <div className="hover:border hover:border-primary/20 rounded-md transition-all duration-200 border border-transparent p-4 cursor-pointer hover:bg-primary/10">
                  <img className="h-[80px] w-aut" src="/taobao_logo.png" alt="Taobao logo" />
                </div>
                <div className="hover:border hover:border-primary/20 rounded-md transition-all duration-200 border border-transparent p-4 cursor-pointer hover:bg-primary/10">
                  <img className="h-[80px] w-auto" src="/pinduoduo_logo.png" alt="Pinduoduo logo" />
                </div>
              </div>
            </div>
          </div>
          <CheckProducts />
        </div>
      </div>
    </>
  )
}

export default Home
