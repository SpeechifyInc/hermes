# Hermes
Named after the Greek God of trade and messaging, Hermes provides a minimal interface for asynchronously communicating with any remote or local client/server. The API is inspired by Oz (@Banou26) and Koa.

# Core Concepts
## Transports
Transports are inspired by the logging library, [winston](https://github.com/winstonjs/winston). Transports define how the data provided by the middleware kernel should be sent to the client. For example, in the case of a chrome extension, we would want to send data over the `chrome.runtime.sendMessage` API while with workers we would use the `postMessage` API. This flexibility extends to any use case that requires communication in this form.

## One Way Communication
One way communication involves sending a request to a client and receiving a response or listening for a request and responding to it. These APIs provide a similar experience to HTTP requests/responses. The two methods used are `listen` and `fetch`.

## Two Way Communication - Unimplemented
Similar to Websockets, two way communication provides an API for opening a channel between a client and server where either the client or server can send a request. This API works by creating listeners on events and sending events with payloads to the client. This solution is useful for high bandwidth situations where performance is critical and the protocol being used in the transport supports this type of communication natively. Examples being chrome extensions and websockets.

# Special Thanks
[Banou](https://github.com/banou26)
[Elvanos](https://github.com/Elvanos)
