const isValid = (year, month, _date) => {
    var d = new Date(`${year}/${month}/${_date}`);
    if (d.getFullYear() == year && d.getMonth() == month -1 && d.getDate() == _date){
        return d;
    }
    return false;
}

module.exports = isValid;