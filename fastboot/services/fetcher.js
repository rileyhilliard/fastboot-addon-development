import Service from '@ember/service';
import { inject as service } from '@ember/service';

export default class Fetcher extends Service {
  @service('fastboot') fastboot

  fetch(...args) {
    return new Promise((res, rej) => {
      console.log('');
      console.log('');
      console.log('|-- START OF FASTBOOT FETCHER.FETCH() --|');
      console.log('logged from ./fastboot/services/fetcher.js');
      console.log('In node the fetcher service will default to some low-level server datacenter protocol');

      /**
       * In this example `fastboot.metadata.serversideFetch()` is set by a fastboot server transitive dependency
       * that is a required dependency in a consumer application of this addon, but that fastboot server lib
       * is not a dependency of this addon. The fastboot server would set the fastboot service metadata via passing in
       * visit options:
       *
       * const visitOptions = {
       *   metadata: {
       *     serversideFetch // node-based fetch API to interface with the datacenter
       *   }
       * };
       * fastboot.visit('/<path>', visitOptions);
       */
      try {
        return this.fastboot.metadata.serversideFetch(...args)
          .then(res)
          .catch(rej);
      } catch (e) {
        console.error(`${e.message}, because the dummy app lacks the transitive fastboot server that sets fastboot.metadata.serversideFetch()`);
        console.error('Question: Is there a way to configure a fastboot server in the dummy app of an addon to mock out the fastboot.visit options in order to fill in this missing API?');
        console.error('This is not just for the addons tests, but also so the addons development environment dummy app continues to function');
        console.error('(NOTE: this code is silencing this error so the app doesn\'t crash, but normally the dummy app would render the error stack back to the developer. See `./fastboot/services/fetcher.js` for more info)')
        res();
      }
      console.log('|-- END OF FASTBOOT FETCHER.FETCH() --|');
      console.log('');
      console.log('');
    });
  }
}
