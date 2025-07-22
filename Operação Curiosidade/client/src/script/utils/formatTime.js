function formatDateTime(dateString){
    return new Date(dateString).toLocaleString('pt-BR').replace(',', ' -');
};

function formatDate(dateString){
    return new Date(dateString).toLocaleDateString('pt-BR');
}

function formatDateInput(dateString){
    const dateStr = dateString; 
    const [day, month, year] = dateStr.split('/');
    return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
}