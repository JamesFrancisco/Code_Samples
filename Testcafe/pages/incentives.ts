import { Selector } from 'testcafe';
import xpathSelector from '../../utils/xpath-selector';

class incentives {
    public incentivesCard = Selector('[data-id="incentive-card"]').filterVisible();
    public addIncentBtn = Selector('[data-testid="add-incentive-btn-1"]');
    public addIncentBtn2 = Selector('[data-testid="add-incentive-btn-2"]');
    public paymentPerMonth = Selector('.payment-per-month');
    public paymentPerMonthRedesign = Selector('[data-testid="finance-details-monthly-payment"]');
    public nextStep = Selector('#action_footer_bar_action_button');
    public skipThisStep = xpathSelector('//*[@data-id="skip-link"]');
    public addIncentiveButtons = xpathSelector('//button[contains(text(), "Add")]');

    public getMonthlyPayment = async () => {
        const paymentText = this.paymentPerMonth.withText('$');
        const paymentTextValue = await paymentText.textContent;
        const paymentTextNumberOnly = paymentTextValue.replace(/^.*\$/, '');
        const monthlyPayment = Number(paymentTextNumberOnly);
        return monthlyPayment;
    };

    public getMonthlyPaymentRedesign = async () => {
        const paymentText = this.paymentPerMonthRedesign.withText('$');
        const paymentTextValue = await paymentText.textContent;
        const paymentTextNumberOnly = paymentTextValue.replace(/^.*\$/, '').replace('/mo', '');
        const monthlyPayment = Number(paymentTextNumberOnly);
        return monthlyPayment;
    };
}

export default new incentives();
