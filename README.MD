[![Build Status](https://travis-ci.org/mpalourdio/ng-http-loader.svg?branch=master)](https://travis-ci.org/mpalourdio/ng-http-loader)  

# ng-http-loader
================

## Installation

To install this library, run:

```bash
$ npm install ng-http-loader --save
```

## What does it do ?

This package provides an HTTP Interceptor, and a spinner component. The HTTP interceptor listens to all HTTP requests
and shows a spinner during pending requests.

## Usage

In order to have this module listening to your http requests, replace all your ``http`` uses by [http: HttpInterceptorService](src/app/http-interceptor.service.ts).
Then from your Angular `AppModule`:

```typescript
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
[...]
import { AppComponent } from './app.component';
import { NgHttpLoaderModule } from 'ng-http-loader/ng-http-loader.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,    
    NgHttpLoaderModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

In your app.component.html, add :
```xml
<spinner></spinner>
```
## Requirements

It's compatible with Angular 4+.

## Credits

The spinner has been taken from [SpinKit](https://github.com/tobiasahlin/SpinKit).
