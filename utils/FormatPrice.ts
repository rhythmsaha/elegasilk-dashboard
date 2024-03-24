const currencyFormatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'INR',
});

const priceFormatter = currencyFormatter.format;

export default priceFormatter;

export function formatNumber(num: number) {
    const numStr = num.toString();
    if (numStr.length > 4) {
        if (num >= 1e9) {
            return '₹' + Math.trunc(num / 1e9) + 'b';
        }
        if (num >= 1e6) {
            return '₹' + Math.trunc(num / 1e6) + 'm';
        }
        if (num >= 1e3) {
            return '₹' + Math.trunc(num / 1e3) + 'k';
        }
    }

    return priceFormatter(num);
}
