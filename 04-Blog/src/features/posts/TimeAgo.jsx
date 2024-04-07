import moment from 'moment'
function TimeAgo({ date }) {
    const momentDate = moment(date)
    return (
        <span title={momentDate.toString()}>&nbsp; <i>{momentDate.fromNow()}</i></span>
    )
}

export default TimeAgo
