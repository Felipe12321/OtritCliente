import { ProyFinalPage } from './app.po';

describe('proy-final App', () => {
  let page: ProyFinalPage;

  beforeEach(() => {
    page = new ProyFinalPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
