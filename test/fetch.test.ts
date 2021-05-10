import * as assert from 'assert';
import {fetch} from '../src/fetch';

describe('test/fetch.test.ts', () => {
  it('should be the result of the default request options', async () => {
    const result = await fetch('https://www.bing.com');

    assert(typeof result.data === 'string');
  });

  it('should be the result of custom options', async () => {
    const result = await fetch('https://www.bing.com', {timeout: 3000});

    assert(typeof result.data === 'string');
  });

  it('should be the result of an exception response to request', async () => {
    const result = await fetch('https://www.bing.com/404', {
      timeout: 3000,
    }).catch(err => {
      console.info(err);
      return err;
    });

    assert(result.status === 404);
  });

  it('should be the result of request timeout', async () => {
    const result = await fetch('https://www.bing.com', {
      timeout: 1,
    }).catch(err => err);

    assert(result.message === 'The user aborted a request.');
  });

  it('should be the result of entering query parameters to request options', async () => {
    const result = await fetch('https://www.bing.com', {
      params: {test: 'test'},
    });

    assert(typeof result.data === 'string');
  });

  it('should be the result of entering both query parameters and path query parameter request options', async () => {
    const result = await fetch('https://www.bing.com?bing=test', {
      params: {test: 'test'},
    });

    assert(typeof result.data === 'string');
  });
});
