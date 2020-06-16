# fastboot-addon-development

### Problem:

Developing an ember addon that contains fastboot code that depends on a transitive dependency that sets fastboot service metadata information will run into issues during local development against a dummy app. In the particular scenario in this example addon, methods exposed on the fastboot service by a fastboot server transitive dependency are consumed by an addon. These methods will not exist in the addons dummy app, because the addon does not depend on the transitive fastboot server that sets these methods, however an ember app that depends on both the fastboot server transitive dependency and this addon would enable the addon to properly access the expected data structures set on the fastboot service.

```javascript
// the fastboot server transitive dependency
const visitOptions = {
  metadata: {
    aMethod() { . . . }
  }
};

fastboot.visit(route, visitOptions);
```
```javascript
// fastboot addon code
@service('fastboot') fastboot

serviceMethod() {
  // this.fastboot.metadata === undefined, because the addon dummy app
  // does not have a way to specify visitOptions to fastboot.visit()
  this.fastboot.metadata.aMethod(...arguments);
}
```

### Need
An addon dummy app needs the ability to specify a dummy fastboot server so that the proper `visitOptions` can be supplied to the dummy app `fastboot.visit()`. This would allow for the fastboot addons development environment `ember s` to function properly.

OR

An addon dummy app needs the ability to consume the fastboot server that loads this metadata as a `devDependency` so that the dependent fastboot server properly sets the fastboot service metadata in the addons dummy app.

## Reproduction steps

This repo is purely an example of the issue described above. It creates a simple `fetcher` service that would use native `fetch()` on the client and a custom server-side communication protocol in fastboot. This communication protocol would be exposed by the fastboot server transitive dependency so that apps and addons could leverage the fastboot service to make a server-side `fetch()` request.

- Clone this repo
- `yarn install`
- `ember s`
- Visit [http://localhost:4200/](localhost:4200)
- Open the chrome console and look for the client side `console.log()`, and look for the output from fastboot in the `ember s` terminal.

Files of particular interest:

- [client-side fetcher service](addon/services/fetcher.js)
- [fastboot fetcher service](fastboot/services/fetcher.js)
- [dummy app index route](tests/dummy/app/routes/index.js)

**Client Logs**
![Client](img/client.png?raw=true "Client")

**Fastboot Logs**
![Fastboot](img/fastboot.png?raw=true "Fastboot")