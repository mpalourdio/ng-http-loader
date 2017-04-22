[![Build Status](https://travis-ci.org/mpalourdio/ng-http-loader.svg?branch=master)](https://travis-ci.org/mpalourdio/ng-http-loader)  
# ng-http-loader

## Installation

To install this library, run:

```bash
$ npm install ng-http-loader --save
```

This package provides an HTTP Interceptor, and a spinner component. The HTTP interceptor listens to all HTTP requests
and shows a spinner during pending requests.

In order to have this module listening to your http requests, replace all your ``http`` uses by [http: HttpInterceptorService](src/app/http-interceptor.service.ts).

It's compatible with Angular 4+.

The spinner has been taken from [SpinKit](https://github.com/tobiasahlin/SpinKit).
