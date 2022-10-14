import Router, { BlockConstructable } from './Router'
import { expect } from 'chai';
import sinon from 'sinon';

describe('Router', () => {

  global.window.history.back = () => {
    if (typeof window.onpopstate === 'function') {
      window.onpopstate({currentTarget: window} as unknown as PopStateEvent);
    }
  };
  global.window.history.forward = () => {
    if (typeof window.onpopstate === 'function') {
      window.onpopstate({currentTarget: window} as unknown as PopStateEvent);
    }
  }

  const getContentFake = sinon.fake.returns(document.createElement('div'));

  const BlockMock = class {
    getContent = getContentFake;
    dispatchComponentDidMount = () => {return;};
  } as unknown as BlockConstructable;

  it('use() should return Router instance', () => {
    const result = Router.use('/', BlockMock, false);

    expect(result).to.eq(Router);
  });

  describe('.back()', () => {
    it('should render a page on history back action', () => {
      Router
        .use('/', BlockMock, false)
        .start();

      Router.back();

      expect(getContentFake.callCount).to.eq(1);
    });
  });

  it('should render a page on start', () => {
    Router
      .use('/', BlockMock, false)
      .setAuthorizationChecker(() => false)
      .start();

    expect(getContentFake.callCount).to.eq(1);
  });
});
