import LeftMenu from './navbar'
const AppLayout = () => {

  return (
    <div className={`w-full h-full`}>
      <div className={`flex flex-col-reverse`}>
        <LeftMenu />
      </div>
      {/* <Footer /> */}
    </div>
  )
}

export default AppLayout
