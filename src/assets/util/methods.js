import moment from 'moment'
export function getTime (time) {
  const theDate = new Date(time * 1000).toISOString().split('T')
  return moment(theDate[0]).format('YYYY/MM/DD')
}
