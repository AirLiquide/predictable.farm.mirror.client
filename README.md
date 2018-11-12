Predictable Farm — Mirror client
---

### Introduction

Simple script to run on the device in order to connect to the ssh mirror server, allowing reverse port forwarding to the device via the mirror server.

### Installation

> This software is to be installed on the device; hence, having limited resources, we favor a general installation of dependencies, not using `npm`.
> As such, node modules should be installed in `/usr/lib/node_modules/` beforehand; We do not provide a `package.json` file for this repo (but it would be trivial to do so if you need it).

Copy `config.json.dist`  to  `config.json` and change the values for the server host and username if needed.

### Run

    node index.js

### License

MIT. See License.txt file