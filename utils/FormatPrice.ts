const currencyFormatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'INR',
});

const priceFormatter = currencyFormatter.format;

export default priceFormatter;
