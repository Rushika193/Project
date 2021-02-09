from apps.webscrapper.driver_helper.chrome_driver import ChromeDriver

class DriverHelper:    
    def __init__(self,drivertype):
        if drivertype =='chrome' :
            _driver = ChromeDriver()
            self.driver = _driver.get_driver()
