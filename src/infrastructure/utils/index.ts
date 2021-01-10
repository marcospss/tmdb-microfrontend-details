export default {
  convertMinutesToTime: (data: number) => {
    if (!data) {
      return;
    }
    const minutes = data % 60;
    const hours = (data - minutes) / 60;
    const totalMinutes = minutes < 10 ? `0${minutes}` : minutes;
    // eslint-disable-next-line consistent-return
    return `Length: ${hours}h ${totalMinutes}m`;
  },
  genres: (genres: []) => genres.map(genre => genre.name).join(' | ')
}
