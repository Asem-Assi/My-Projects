const displayNISCurrency = (num) => {
    const formatter = new Intl.NumberFormat('he-IL',{
        style : "currency",
        currency : 'ILS',
        minimumFractionDigits : 2
    });

    return formatter.format(num);
};

export default displayNISCurrency;
