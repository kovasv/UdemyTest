export default class LandingPage {

    get searchField() {
        return $('input[name="q"]');
      }
    get searchButton() {
        return $('button[type="submit"]');
      }

    get searchResultTitle() {
        return $('//header/h1');
      }

    async search(searchValue: string){
    (await this.searchField).waitForDisplayed();
    (await this.searchField).setValue(searchValue);
    (await this.searchButton).waitForClickable();
    (await this.searchButton).click();
    (await this.searchResultTitle).waitForDisplayed();
    }
}
