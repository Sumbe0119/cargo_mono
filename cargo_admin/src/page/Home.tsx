import dayjs from 'dayjs'
import 'dayjs/locale/mn'
import dayLocaleData from 'dayjs/plugin/localeData'

dayjs.locale('mn')
dayjs.extend(dayLocaleData)

const Home = () => {

  return (
    <div>
      Home page
    </div>
  )
}

export default Home
