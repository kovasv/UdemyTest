import LandingPage from './landing.page.js';

class SearchResultPage extends LandingPage {

    get ratingTab() {return $('//button/span[text()="Ratings"]');}
    get spinner() { return $('svg[aria-label="Loading"]');}
    get links() {return $$('h3[data-purpose="course-title-url"] a');}
    get ratingList() {return $$('span[data-purpose="rating-number"]');}
    get sortBy() {return $('select[name="sort"]');}
    
    async ratingsFilter(rating :number) {
        (await this.ratingTab).click();
        (await $("input[value='"+rating+"']")).click();
   }

   async getAllLinks(){
    return await Promise.all((await this.links).map( async(item) =>{
        return   await item.getAttribute("href");
    }));
   }

   async sort(option:string){
     (await this.sortBy).selectByVisibleText(option);
   }

   async getRatingList(){
    return await Promise.all((await this.ratingList).map( async(item) =>{
      return await item.getText();
    }))
   }

}
export default new SearchResultPage();