const { Builder, Capabilities, By } = require("selenium-webdriver")

require('chromedriver')

const driver = new Builder().withCapabilities(Capabilities.chrome()).build()

//GO TO WEBSITE, CLOSE WEBSITE AFTER RUNNING FUNCTIONS
beforeAll(async () => {
    await driver.get('http://127.0.0.1:5500/movieList/index.html')
})

afterAll(async () => {
    await driver.quit()
})


//ADD MOVIE
const addMovie = async (driver) => {

    await driver.findElement(By.xpath('//input')).sendKeys('Our Flag Means Death')

    await driver.findElement(By.xpath('//button')).click()

    const movie = await driver.findElement(By.xpath('//li'))

    const displayed = movie.isDisplayed()

    expect(displayed).toBeTruthy()
}

test('Add a movie', async () => {
    await addMovie(driver)
    await driver.sleep(2000)
})

//CROSS OFF MOVIE
const crossMovie = async (driver) => {

    await driver.findElement(By.xpath('//li/span')).click()

    const message = await driver.findElement(By.xpath('//aside')).getText()

    expect(message).toEqual('Our Flag Means Death watched!')
}

test('Cross movie', async () => {
    await crossMovie(driver)
    await driver.sleep(2000)
})

//DELETE MOVIE
const deleteMovie = async (driver) => {

    await driver.findElement(By.xpath('//li/button')).click()
    
    const message = await driver.findElement(By.xpath('//aside')).getText()

    expect(message).toEqual('Our Flag Means Death deleted!')
}

test('Delete movie', async () => {
    await deleteMovie(driver)
    await driver.sleep(2000)
})

//CHECK IF MESSAGE POPS UP AFTER DELETION
const ifNotify = async (driver) => {

    await driver.findElement(By.xpath('//input')).sendKeys('Our Flag Means Death')
    await driver.sleep(2000)
    await driver.findElement(By.xpath('//button')).click()
    await driver.findElement(By.xpath('//li/button')).click()



    const message = await driver.findElement(By.xpath('//aside')).getText()

    expect(message).toEqual('Our Flag Means Death deleted!')

}

test('if notified', async () => {
    await ifNotify(driver)
    await driver.sleep(2000)
})