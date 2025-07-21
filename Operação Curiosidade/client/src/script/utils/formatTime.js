function formatDateTime(dateString){
    return new Date(dateString).toLocaleString('pt-BR').replace(',', ' -');
};

function formatDate(dateString){
    return new Date(dateString).toLocaleDateString('pt-BR');
}