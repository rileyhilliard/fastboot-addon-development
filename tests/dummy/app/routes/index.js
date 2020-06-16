import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class IndexRoute extends Route {
  @service fetcher

  model() {
    const data = this.fetcher.fetch('http://postman-echo.com/get?foo1=bar1&foo2=bar2');
    return data;
  }

  afterModel(model) {
    console.log('I received this model: ', model);
  }
}
