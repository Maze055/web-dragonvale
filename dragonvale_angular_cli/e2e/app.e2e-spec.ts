import { DragonvalePage } from './app.po';

describe('dragonvale App', function() {
  let page: DragonvalePage;

  beforeEach(() => {
    page = new DragonvalePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
