import { expect } from 'chai';
import { HTTPTransport } from './HTTPTransport';
describe('HTTPTransport', () => {
  let http: HTTPTransport;
  beforeEach(() => {
    http = new HTTPTransport();
  });
  it('должен формировать GET-запрос с query string', (done) => {
    const xhrOpen = XMLHttpRequest.prototype.open;
    XMLHttpRequest.prototype.open = function(method, url) {
      expect(method).to.equal('GET');
      expect(url).to.include('?foo=bar');
      XMLHttpRequest.prototype.open = xhrOpen;
      done();
    };
    http.get('/test', { data: { foo: 'bar' } });
  });
}); 
