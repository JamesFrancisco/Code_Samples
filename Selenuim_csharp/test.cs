using NUnit.Framework;
using NUnit.Framework.Legacy;
using OpenQA.Selenium;
using OpenQA.Selenium.Chrome;
using resources;

namespace testScript{

    public class testsMine{
        private IWebDriver? driver;
        private string url ="https://www.wpshealthsolutions.com/";

        [SetUp]
        public void Setup(){
            var co = new ChromeOptions();
            driver = new ChromeDriver(co);
        }

        [Test]
        public void testHomepage(){
            driver.Url = url;

            try
            {
                driver.FindElement(By.XPath(Selectors.logo));
                driver.FindElement(By.LinkText("About"));
                driver.FindElement(By.LinkText("Who We Serve"));
                driver.FindElement(By.LinkText("Our Capabilities"));
                driver.FindElement(By.LinkText("Partners"));
                driver.FindElement(By.LinkText("Careers"));
                driver.FindElement(By.LinkText("Newsroom"));
                driver.FindElement(By.LinkText("Contact"));
                
            }
            catch (NoSuchElementException)
            {
                Console.WriteLine("element not present");
            }
            try
            {
                driver.FindElement(By.XPath(Selectors.searchIcon));
            }
            catch (NoSuchElementException)
            {
                Console.WriteLine("element not present - search icon");
            }

            driver.FindElement(By.LinkText("About")).Click();
            driver.FindElement(By.LinkText(mnuAboutPage.wpsLocations)).Click();
            driver.FindElement(By.XPath(Selectors.logo)).Click();
            driver.FindElement(By.LinkText("About")).Click();
            driver.FindElement(By.LinkText("History")).Click();
            driver.FindElement(By.LinkText("Our Heritage")).Click();
            driver.FindElement(By.LinkText(mnuAboutPage.locations)).Click();
        }
        [TearDown]
        public void TearDown()
        {
            driver.Quit();
        }
    }


}