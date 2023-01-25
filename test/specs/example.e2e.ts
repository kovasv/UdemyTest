import SearchResultPage from '../pageobjects/searchResult.page.js'
import  {assert, expect}  from 'chai';
var fs = import ('fs');
const filePath ="./data/links.txt";



describe('Udemy search feature', () => {
    let linkList =[]
    it('should search "WebdriverIO" ', async () => {
        let search ="WebdriverIO"
        await  browser.url("/");
        await  SearchResultPage.search(search);
       assert.equal(search, (await (await SearchResultPage.searchResultTitle).getText()))
     })

     it('filtering result by rating ', async () => {
        let rating =4.5;
        await  SearchResultPage.ratingsFilter(rating);
        let ratingList = await Promise.all((await SearchResultPage.getRatingList()).map(x=>+x));
        assert.isTrue(ratingList.length>0, "rating list is empty")
        expect(ratingList.filter((item)=> item>=rating)).to.have.lengthOf(ratingList.length);
     })

    it('save all the links of results in a given page to text file', async () => {
       const writeStream = (await fs).createWriteStream(filePath);
       linkList = await SearchResultPage.getAllLinks();
       linkList.forEach(value => writeStream.write(`${value}\n`));
       const data = (await fs).readFileSync(filePath, 'utf8');
       assert.isTrue(data.length>0,"File is empty");
    })

    it('verify each link is valid', async () => {
      assert.isNotTrue(linkList.length===0);
        linkList.forEach(async (link)=>{ 
        await  browser.url(link);
        assert.isTrue(await ((await SearchResultPage.searchResultTitle).isDisplayed()),"Title is not displayed");
        })
     })

     it('Sort by Highest Rated ', async () => {
       await SearchResultPage.sort("Highest Rated");
       let ratingList =(await SearchResultPage.getRatingList()).map(x=>+x);
       assert.isNotTrue(ratingList.length===0)
       let sortedRatinList =  [...ratingList].sort(function(a, b){return  b - a});
       expect(ratingList).to.eql(sortedRatinList);
     })

     it('Compare links from file', async () => {
        await  browser.url("/");
        await  SearchResultPage.search("WebdriverIO");
        let linkList = await SearchResultPage.getAllLinks();
        let LinksFromFile = (await fs).readFileSync(filePath, 'utf-8').split("\n");
        expect(linkList).to.have.same.members(LinksFromFile);
      })

})
