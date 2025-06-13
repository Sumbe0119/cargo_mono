import dayjs from 'dayjs'
import 'dayjs/locale/mn'
import dayLocaleData from 'dayjs/plugin/localeData'

dayjs.locale('mn')
dayjs.extend(dayLocaleData)

const List = () => {

  return (
    <div>
      List page
    </div>
  )
}

export default List
