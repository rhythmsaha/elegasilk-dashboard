import moment from 'moment';

const formatTimestamp = (date: string) => {
    const blogTimestamp = new Date(date);
    const currentTimestamp = Date.now();
    const duration = moment.duration(moment(currentTimestamp).diff(moment(blogTimestamp)));

    if (duration.asSeconds() < 60) {
        return `Just Now`;
    } else if (duration.asMinutes() < 60) {
        const minutes = Math.round(duration.asMinutes());
        if (minutes === 1) return `${minutes} minute ago`;
        else return `${minutes} minutes ago`;
    } else if (duration.asHours() < 24) {
        const hours = Math.round(duration.asHours());
        if (hours === 1) return `${hours} hour ago`;
        else return `${hours} hours ago`;
    } else if (duration.asDays() < 7) {
        const days = Math.round(duration.asDays());
        if (days === 1) return `${days} day ago`;
        else return `${days} days ago`;
    } else {
        const formattedDate = moment(blogTimestamp).format('DD/MM/YYYY');
        return formattedDate;
    }
};

export default formatTimestamp;
