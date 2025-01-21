import hydrateOfferPage from '../../pages/hydrateOffer/hydrateOfferPage';
import dealCentral from '../../pages/dealCentral/dealCentral';
import { TRADEIN_PREOWNED_CAR } from '../../data/accelerateTradeinData';
import IncentivesActivity from '../../pages/dealCentral/IncentivesActivity';

fixture`Hydrate Offer Manager View`;

let formData;
const offers: string[] = ['finance', 'lease', 'cash'];
const date = new Date();
date.setDate(date.getDate() + 10);

offers.forEach((offer) => {
    test.before(async (t) => (formData = await hydrateOfferPage.submitDealFromSP(offer)))(
        `Hydrate an offer for a ${offer} deal`,
        async (t) => {
            await hydrateOfferPage.searchDeal(formData);
            await hydrateOfferPage.loadCMDUrl();
            await t.wait(5000);
            // Select incentives - Redo this when MV incentives is stabilized
            await t.click(dealCentral.dpmIncentivesLink);
            await t.click(dealCentral.dpmIncentivesViewLink0);
            await t.click(dealCentral.dpmIncentivesSelect0);
            await t.click(dealCentral.dpmIncentivesSelect1);
            await t.click(dealCentral.dpmIncentivesApply);
            await t.click(dealCentral.dpmIncentivesDoneBtn);
            // Add Trade-in vehicle
            await t.wait(5000);
            await t.click(dealCentral.dpmTradeInLink);
            await t.typeText(dealCentral.dpmTradeInVin, TRADEIN_PREOWNED_CAR.vin);
            await t.scrollIntoView(dealCentral.dpmTradeInVinDecode);
            await t.click(dealCentral.dpmTradeInVinDecode);
            await t.hover(dealCentral.dpmTradeInTrim);
            await t.click(dealCentral.dpmTradeInTrim);
            await t.typeText(dealCentral.dpmTradeInOdometer, '75000');
            await t.click(dealCentral.dpmTradeInExteriorColor);
            await t.hover(dealCentral.dpmTradeInColorDropdownMenu);
            await t.dispatchEvent(dealCentral.dpmTradeInColorDropdownMenu, 'click');
            //Select white as the color using the pressKey function
            await t.pressKey('down down down enter');
            await t.scrollIntoView(dealCentral.dpmTradeInSaveBtn);
            await t.hover(dealCentral.dpmTradeInSaveBtn);
            await t.click(dealCentral.dpmTradeInSaveBtn);
            //Navigate to vehicle condition
            await t.click(dealCentral.dpmTradeInExteriorCondition);
            await t.click(dealCentral.dpmTradeInCondition);
            // Save the trade-in
            await t.click(dealCentral.dpmTradeInSaveBtn);
            //Add trade-in value and payoff amount
            await t.typeText(dealCentral.dpmTradeInValue, '15000');
            await t.wait(4000);
            await t.typeText(dealCentral.dpmTradeInPayoff, '5000');
            await t.wait(4000);
            await t.typeText(dealCentral.dpmTradeInACV, '15500');
            await t.typeText(dealCentral.dpmTradeInPerDiem, '1500');
            await t.typeText(dealCentral.dpmTradeInPayoffDueDate, date.toLocaleDateString());
            await t.scrollIntoView(dealCentral.dpmTradeInShareMenu);
            await t.click(dealCentral.dpmTradeInShareMenu);
            //Send the offer to the customer and update in DealXg
            await t.wait(2000);
            await t.pressKey('down enter');
            await t.expect(dealCentral.dpmSendToCustomerModal.exists).ok;
            await t.wait(2000);
            //Temporary code to deal with differences in dev an qa
            console.log(process.env.TEST_ENV);
            /*if (process.env.TEST_ENV == 'dev') {
                await t.expect(dealCentral.dpmDevCopyDealLink).ok;
                await t.click(dealCentral.dpmDevCloseDealLink());
            } else {
                await t.click(dealCentral.dpmSendToCustomerModalCopyButton);
                await t.wait(2000);
                await t.pressKey('shift+tab shift+tab shift+tab shift+tab shift+tab enter');
            }*/
            await t.expect(dealCentral.dpmDevCopyDealLink).ok;
            await t.click(dealCentral.dpmDevCloseDealLink());
            await t.wait(5000);
            await t.scrollIntoView(dealCentral.dpmIncentivesLink);
            // Refresh the page to confirm that the deal updated
            await dealCentral.refresh();
            await dealCentral.waitForDcLoad;
            await t.expect(dealCentral.dpmIncentivesLink).ok;
        }
    );
});
