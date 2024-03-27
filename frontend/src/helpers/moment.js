import moment from 'moment';

export function formatDateTime(datetime) {
    return moment(datetime).format('DD/MM/YYYY HH:mm:ss');
}