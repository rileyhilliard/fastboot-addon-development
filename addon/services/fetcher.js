import Service from '@ember/service';

export default class Fetcher extends Service {
  fetch() {
    console.log('On the client the fetcher service will default to the native browser fetch(), but check the `ember serve` terminal console for what happens in fastboot');
    return Promise.resolve({
      data: 'some really cool data fetched client-side!'
    });
  }
}
