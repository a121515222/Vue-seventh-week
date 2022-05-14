import moment from 'moment'

export function getTime (time) {
  let result = ''
  if (time) {
    const theDate = new Date(time * 1000).toISOString().split('T')
    result = moment(theDate[0]).format('YYYY/MM/DD')
  } else if (time === undefined) {
    result = '未付款或時間錯誤'
  }
  return result
}
