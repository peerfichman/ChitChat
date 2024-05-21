const getDateFormatted = (date) => {
    return new Date(date).toLocaleDateString('he-IL').replace(/\./g, '/');
};

const convertToCSV = (data) => {
    const csvContent = '\uFEFF' + data.map((row) => row.join(',')).join('\n');
    return 'data:text/csv;charset=utf-8,' + encodeURIComponent(csvContent);
};

export { getDateFormatted, convertToCSV };
