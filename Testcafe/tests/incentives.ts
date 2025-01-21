import dealStarter from '../../pages/dealStarter/dealStarter';
import dashboard from '../../pages/shopperPlatform/dashboard';
import incentives from '../../pages/shopperPlatform/incentives';
import zipCodeModal from '../../pages/shopperPlatform/zipCodeModal';
import ProgressTracker from '../../pages/shopperPlatform/progressTracker';
import { PROGRESS_TRACKER_STEP_NAMES } from '../../pages/constants';
import { urls } from '../../data/urls';

fixture('Incentives');

test('should lower payment and show in deal summary when applied', async (t) => {
    const url = urls.vdp.accelerate3.new.prod + `?dsEnv=${process.env.TEST_ENV}&disableToggles=useSDPRedesign`;
    await t.navigateTo(url);
    console.log('Payload URL: ', url);
    await t.scrollBy(0, 1000);
    if (await dealStarter.isMobile()) {
        await t.scrollBy(0, 1000);
        await t.scrollIntoView(dealStarter.detailedPricing);
    }
    await dealStarter.navigateToDashboard();
    await zipCodeModal.clickDoneBtn();
    await t.expect(dashboard.incentivesProductLink.visible).ok('Error: link is not visible.');
    await t.click(dashboard.incentivesProductLink);
    await t.wait(4000);
    await t.expect(incentives.paymentPerMonth.visible).ok('Error: paymentPerMonth is not visible. Before adding incentive.');
    const initialMonthlyPayment = await incentives.getMonthlyPayment();
    await t.takeScreenshot();
    await t.hover(incentives.addIncentBtn);
    await t.click(incentives.addIncentBtn);
    await t.wait(4000);
    await t.expect(incentives.paymentPerMonth.visible).ok('Error: paymentPerMonth is not visible. After adding incentive.');
    const revisedMonthlyPayment = await incentives.getMonthlyPayment();
    await t.expect(initialMonthlyPayment).gt(revisedMonthlyPayment);
    if (incentives.addIncentBtn2.exists) {
        await t.hover(incentives.addIncentBtn2);
        await t.click(incentives.addIncentBtn2);
        await t.wait(4000);
        await t.expect(incentives.paymentPerMonth.visible).ok('Error: paymentPerMonth is not visible. After adding incentive.');
        const revisedMonthlyPayment = await incentives.getMonthlyPayment();
        await t.expect(initialMonthlyPayment).gt(revisedMonthlyPayment);
    }
    await t.takeScreenshot();
    await t.click(incentives.nextStep);
});

test('should lower payment and show in deal summary when applied redesigned AMD', async (t) => {
    const url = urls.vdp.accelerate3.new.prod + `?dsEnv=${process.env.TEST_ENV}&enableToggles=useSDPRedesign`;
    await t.navigateTo(url);
    console.log('Payload URL: ', url);
    await t.scrollBy(0, 1000);
    if (await dealStarter.isMobile()) {
        await t.scrollBy(0, 1000);
        await t.scrollIntoView(dealStarter.detailedPricing);
    }
    await dealStarter.navigateToDashboard();
    await zipCodeModal.clickDoneBtn();
    await ProgressTracker.clickStep(PROGRESS_TRACKER_STEP_NAMES.INCENTIVES);
    await t.wait(4000);
    await t
        .expect(incentives.paymentPerMonthRedesign.visible)
        .ok('Error: paymentPerMonth is not visible. Before adding incentive.');
    const initialMonthlyPayment = await incentives.getMonthlyPaymentRedesign();
    await t.takeScreenshot();
    await t.hover(incentives.addIncentBtn);
    await t.click(incentives.addIncentBtn);
    await t.wait(4000);
    await t.expect(incentives.paymentPerMonthRedesign.visible).ok('Error: paymentPerMonth is not visible. After adding incentive.');
    const revisedMonthlyPayment = await incentives.getMonthlyPaymentRedesign();
    await t.expect(initialMonthlyPayment).gt(revisedMonthlyPayment);
    if (incentives.addIncentBtn2.exists) {
        await t.hover(incentives.addIncentBtn2);
        await t.click(incentives.addIncentBtn2);
        await t.wait(4000);
        await t
            .expect(incentives.paymentPerMonthRedesign.visible)
            .ok('Error: paymentPerMonth is not visible. After adding incentive.');
        const revisedMonthlyPayment = await incentives.getMonthlyPaymentRedesign();
        await t.expect(initialMonthlyPayment).gt(revisedMonthlyPayment);
    }
    await t.takeScreenshot();
    await t.click(incentives.nextStep);
});
