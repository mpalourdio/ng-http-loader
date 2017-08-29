[![Build Status](https://travis-ci.org/mpalourdio/ng-http-loader.svg?branch=master)](https://travis-ci.org/mpalourdio/ng-http-loader)  

# ng-http-loader

## Installation

To install this library, run:

```bash
$ npm install ng-http-loader --save
```

## What does it do ?

This package provides an HTTP Interceptor, and a spinner component (All from [SpinKit](https://github.com/tobiasahlin/SpinKit) at the moment).
The HTTP interceptor listens to all HTTP requests and shows a spinner during pending requests.

## HttpClientModule

All http requests *MUST* be performed with the new ``HttpClientModule`` available from ``angular 4.3``. See this [blog post](http://blog.ninja-squad.com/2017/07/17/http-client-module/) as reference.

## Usage

From your Angular `AppModule`:

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

You can too customize the background-color and the spinner type :
```xml
<spinner [backgroundColor]="'#ff0000'" [spinner]="Spinkit.skWave"></spinner>
```

You can filter the requests that shouldn't be caught by the interceptor by providing an array of regex patterns :
```xml
<spinner 
    [backgroundColor]="'#ff0000'"
    [spinner]="Spinkit.skWave"
    [filteredUrlPatterns]="['\\d', '[a-zA-Z]', 'my-api']>
</spinner>
```

The different spinners available are referenced in [this class](src/app/spinkits.ts).

## Requirements

Compatible with Angular 4.3+.

## Credits

The spinners/loaders have been taken from [SpinKit](https://github.com/tobiasahlin/SpinKit).
