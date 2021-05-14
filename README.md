# ng-http-loader

[![Build Status](https://github.com/mpalourdio/ng-http-loader/workflows/CI/badge.svg?branch=master)](https://github.com/mpalourdio/ng-http-loader/actions)
[![Coverage Status](https://coveralls.io/repos/github/mpalourdio/ng-http-loader/badge.svg?branch=master)](https://coveralls.io/github/mpalourdio/ng-http-loader?branch=master)
[![npm](https://img.shields.io/npm/v/ng-http-loader.svg)](https://www.npmjs.com/package/ng-http-loader)
[![npm](https://img.shields.io/npm/dm/ng-http-loader.svg)](https://www.npmjs.com/package/ng-http-loader)
[![npm](https://img.shields.io/npm/dt/ng-http-loader.svg)](https://www.npmjs.com/package/ng-http-loader)

## Changelog

[Please read the changelog](CHANGELOG.md)

## Contributing

Use the fork, Luke. PR without tests will likely not be merged.

## Installation

To install this library, run:

```bash
$ npm install ng-http-loader --save / yarn add ng-http-loader
```

## What does it do ?

This package provides an HTTP Interceptor, and some spinner components (All from [SpinKit](https://github.com/tobiasahlin/SpinKit) at the moment).
The HTTP interceptor listens to all HTTP requests and shows a spinner / loader indicator during pending HTTP requests.

## Angular Compatibility

| ng-http-loader | Angular            |
| -------------- | ------------------ |
| >=0.1.0 <0.4.0 | ^4.3.0             |
| >=0.4.0 <1.0.0 | ^5.0.0             |
| >=1.0.0 <3.2.0 | ^6.0.0             |
| >=3.2.0 <5.1.0 | ^7.0.0             |
| >=6.0.0 <7.0.0 | ^8.0.0             |
| >=7.0.0 <8.0.0 | ^9.0.0             |
| >=8.0.0 <9.0.0 | ^10.0.0            |
| >=9.0.0        | ^11.0.0            |
| >=10.0.0       | ^12.0.0            |

If you experience errors like below, **please double check the version you use.**

`ERROR in Error: Metadata version mismatch for module [...]/angular/node_modules/ng-http-loader/ng-http-loader.module.d.ts, found version x, expected y [...]`

## Requirements - HttpClientModule

Performing HTTP requests with the `HttpClientModule` API is **mandatory**. Otherwise, the spinner will not be fired **at all**.

See this [blog post](http://blog.ninja-squad.com/2017/07/17/http-client-module/) for an `HttpClientModule` introduction.

## Usage

From your Angular `AppModule`:

```typescript
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
// [...]
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http'; // <============
import { NgHttpLoaderModule } from 'ng-http-loader'; // <============

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule, // <============ (Perform HTTP requests with this module)
    NgHttpLoaderModule.forRoot(), // <============ Don't forget to call 'forRoot()'!
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

In your app.component.html, simply add:
```xml
<ng-http-loader></ng-http-loader>
```

## Customizing the spinner

You can customize the following parameters:
  - The spinner **backdrop** (visible by default).
  - The **background-color** (ie. the color of the spinner itself).
  - The **debounce delay** (ie. after how many milliseconds the spinner will be visible, if needed).
  - The **extra duration** (ie. how many extra milliseconds should the spinner be visible).
  - The **minimum duration** (ie. how many milliseconds should the spinner be visible at least).
  - The spinner **opacity**.
  - The backdrop **background-color** (ie. the color of the spinner backdrop, if enabled).
  - The **spinner type**.

```xml
<ng-http-loader 
    [backdrop]="false"
    [backgroundColor]="'#ff0000'"
    [debounceDelay]="100"
    [extraDuration]="300"
    [minDuration]="300"
    [opacity]=".6"
    [backdropBackgroundColor]="'#777777'"
    [spinner]="spinkit.skWave">
</ng-http-loader>
```

**_To specify the spinner type this way, you must reference the `Spinkit` const as a public property in your app.component.ts_**:

```typescript
import { Component } from '@angular/core'; 
import { Spinkit } from 'ng-http-loader'; // <============

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
})
export class AppComponent {
    public spinkit = Spinkit; // <============
}
```
The different spinners available are referenced in [this file](src/lib/spinkits.ts).


**_Otherwise, you can reference the spinner type as a simple string_**:

```xml
<ng-http-loader spinner="sk-wave"></ng-http-loader>
```

## Defining your own spinner

You can define your own spinner component in place of the built-in ones. The needed steps are:

- Create your component
- Add it to the [entryComponents](https://angular.io/guide/ngmodule-faq#what-is-an-entry-component) array in your module's configuration (not necessary anymore with [ivy](https://next.angular.io/guide/deprecations#entryComponents))
- Reference your component as a public property in your `app.component.ts`
- Reference the predefined property in the ng-http-loader component selector like this:
```xml
<ng-http-loader [entryComponent]="myAwesomeComponent"></ng-http-loader>
```

You can find some examples [here](https://gist.github.com/mpalourdio/2c0bec03d610b24ff49db649fbb69a48) and [here](https://gist.github.com/mpalourdio/e05b4495de2abeeecfcf92d70e4ef93e).

## Requests filtering by URL, HTTP method or HTTP headers

You can filter the HTTP requests that shouldn't be caught by the interceptor by providing **an array of regex patterns**:
```xml
<ng-http-loader [filteredUrlPatterns]="['\\d', '[a-zA-Z]', 'my-api']"></ng-http-loader>
```

You can filter the HTTP requests by providing **an array of HTTP methods** (case insensitive):
```xml
<ng-http-loader [filteredMethods]="['gEt', 'POST', 'PuT']"></ng-http-loader>
```

You can also filter the HTTP requests by providing **an array of HTTP headers** (case insensitive):
```xml
<ng-http-loader [filteredHeaders]="['hEaDeR', 'AnoTheR-HeAdEr']"></ng-http-loader>
```

## Manually show and hide the spinner

You can manually show and hide the spinner if needed. You must use the `SpinnerVisibilityService` for this purpose.  

Sometimes, when manually showing the spinner, an HTTP request could be performed in background, and when finished, the spinner would automagically disappear.  

**For this reason, when calling `SpinnerVisibilityService#show()`, it prevents the HTTP interceptor from being triggered unless you explicitly call `SpinnerVisibilityService#hide()`.**

```typescript
import { Component } from '@angular/core'; 
import { SpinnerVisibilityService } from 'ng-http-loader';

@Component({
    selector: 'my-component',
    templateUrl: './my.component.html',
    styleUrls: ['./my.component.css'],
})
export class MyComponent {

    constructor(private spinner: SpinnerVisibilityService) {
        // show the spinner
        spinner.show();
        //////////////
        // HTTP requests performed between show && hide won't have any side effect on the spinner.
        /////////////
        // hide the spinner
        spinner.hide();
    }
}
```

## Internet explorer or Safari problem ?

Just use a [real browser](https://download.mozilla.org).

## Misc

Each Spinkit component defined in [SPINKIT_COMPONENTS](src/lib/spinkits.ts#L30) can be used individually.

## Credits

[Tobias Ahlin](https://github.com/tobiasahlin), the awesome creator of [SpinKit](https://github.com/tobiasahlin/SpinKit).  
[David Herges](https://github.com/dherges), the awesome developer of [ng-packagr](https://github.com/dherges/ng-packagr).
