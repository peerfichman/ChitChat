const getDateFormatted = (date) => {
    return new Date(date).toLocaleDateString('he-IL').replace(/\./g, '/');
};

export { getDateFormatted };
