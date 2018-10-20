# ng-http-loader

[![Build Status](https://travis-ci.org/mpalourdio/ng-http-loader.svg?branch=master)](https://travis-ci.org/mpalourdio/ng-http-loader)
[![Coverage Status](https://coveralls.io/repos/github/mpalourdio/ng-http-loader/badge.svg?branch=master)](https://coveralls.io/github/mpalourdio/ng-http-loader?branch=master)
[![npm](https://img.shields.io/npm/v/ng-http-loader.svg)](https://www.npmjs.com/package/ng-http-loader)
[![npm](https://img.shields.io/npm/dm/ng-http-loader.svg)](https://www.npmjs.com/package/ng-http-loader)

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
The HTTP interceptor listens to all HTTP requests and shows a spinner / loader indicator during pending http requests.

## Angular 4 / Angular 5 / Angular 6 / Angular 6 / Angular 7

The latest compatible version with angular 4 is [**`0.3.4`**](https://github.com/mpalourdio/ng-http-loader/tree/0.3.4).
If you want to use Angular 5, use versions **`0.4.0`** and above.

The latest compatible version with angular 5 is version [**`0.9.1`**](https://github.com/mpalourdio/ng-http-loader/tree/0.9.1).

Versions **`1.0.0+`**, **`2.0.0+`** and **`3.0.0+`** are angular 6 & 7 / RxJS 6 compatible only.

If you experience errors like below, **please double check the version you use.**

`ERROR in Error: Metadata version mismatch for module [...]/angular/node_modules/ng-http-loader/ng-http-loader.module.d.ts, found version x, expected y [...]`

## Requirements - HttpClientModule

Performing http requests with the `HttpClientModule` API is **mandatory**. Otherwise, the spinner will not be fired **at all**.

See this [blog post](http://blog.ninja-squad.com/2017/07/17/http-client-module/) for an `HttpClientModule` introduction.

## Usage

From your Angular `AppModule`:

```typescript
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
[...]
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http'; // <============
import { NgHttpLoaderModule } from 'ng-http-loader'; // <============

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule, // <============ (Perform http requests with this module)
    NgHttpLoaderModule, // <============
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

You can customize the **background-color**, the **spinner type**, the **debounce delay** (ie. after how many milliseconds the spinner will be visible, if needed), the **minimum duration** (ie. how many milliseconds should the spinner be visible at least), the **extra duration** (ie. how many extra milliseconds should the spinner be visible):
```xml
<ng-http-loader 
    [backgroundColor]="'#ff0000'"
    [spinner]="spinkit.skWave"
    [debounceDelay]="100"
    [minDuration]="300"
    [extraDuration]="300">
</ng-http-loader>
```

**_To use this syntax, you must reference the `Spinkit` const as a public property in your app.component.ts_**:

```typescript
import { Spinkit } from 'ng-http-loader'; // <============

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
})
export class AppComponent {
    public spinkit = Spinkit; // <============
    [...]
}
```
The different spinners available are referenced in [this class](src/lib/spinkits.ts).


**_Otherwise, you can simply reference the chosen spinner as a simple string_**:

```xml
<ng-http-loader backgroundColor="#ff0000" spinner="sk-wave"></ng-http-loader>
```

## Defining your own spinner

You can define your own loader component in place of the built-in ones. The needed steps are:

- Create your component
- Add it to the [entryComponents](https://angular.io/guide/ngmodule-faq#what-is-an-entry-component) array in your module's configuration
- Reference your component as a public property in your `app.component.ts`
- Reference the predefined property in the ng-http-loader component selector like this:
```xml
<ng-http-loader [entryComponent]="myAwesomeComponent"></ng-http-loader>
```

You can find some short examples [here](https://gist.github.com/mpalourdio/2c0bec03d610b24ff49db649fbb69a48) and [here](https://gist.github.com/mpalourdio/e05b4495de2abeeecfcf92d70e4ef93e).

## Requests filtering by URL, HTTP method or HTTP headers

You can filter the http requests that shouldn't be caught by the interceptor by providing **an array of regex patterns**:
```xml
<ng-http-loader [filteredUrlPatterns]="['\\d', '[a-zA-Z]', 'my-api']"></ng-http-loader>
```

You can filter the http requests by providing **an array of HTTP methods** (case insensitive):
```xml
<ng-http-loader [filteredMethods]="['gEt', 'POST', 'PuT']"></ng-http-loader>
```

You can also filter the http requests by providing **an array of HTTP headers** (case insensitive):
```xml
<ng-http-loader [filteredHeaders]="['hEaDeR', 'AnoTheR-HeAdEr']"></ng-http-loader>
```

## Manually show and hide the spinner

You can manually show and hide the spinner if needed. You must use the `SpinnerVisibilityService` for this purpose.  

Sometimes, when manually showing the spinner, an http request could be performed in background, and when finished, the spinner would automagically disappear.  

**For this reason, when calling `SpinnerVisibilityService#show()`, it prevents the http interceptor from being triggered unless you explicitly call `SpinnerVisibilityService#hide()`.**

```typescript
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
        // http requests performed between won't have any side effect on the spinner
        /////////////
        // hide the spinner
        spinner.hide();
    }
}
```

## Misc

Each Spinkit component defined in [SPINKIT_COMPONENTS](src/lib/spinkits.ts#L30) can be used independently.

## Credits

[Tobias Ahlin](https://github.com/tobiasahlin), the awesome creator of [SpinKit](https://github.com/tobiasahlin/SpinKit).  
[David Herges](https://github.com/dherges), the awesome developer of [ng-packagr](https://github.com/dherges/ng-packagr).
