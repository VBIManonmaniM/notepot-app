import { NotepotAppPage } from './app.po';

describe('notepot-app App', function() {
  let page: NotepotAppPage;

  beforeEach(() => {
    page = new NotepotAppPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
