# ng-http-loader

[![Build Status](https://travis-ci.org/mpalourdio/ng-http-loader.svg?branch=master)](https://travis-ci.org/mpalourdio/ng-http-loader)
[![npm](https://img.shields.io/npm/v/ng-http-loader.svg)](https://www.npmjs.com/package/ng-http-loader)
[![npm](https://img.shields.io/npm/dm/ng-http-loader.svg)](https://www.npmjs.com/package/ng-http-loader)

## Changelog

[Please read the changelog](CHANGELOG.md)

## Contributing

Use the fork, Luke. PR without tests will likely not be merged.

## Installation

To install this library, run:

```bash
$ npm install ng-http-loader --save
```

## What does it do ?

This package provides an HTTP Interceptor, and a spinner component (All from [SpinKit](https://github.com/tobiasahlin/SpinKit) at the moment).
The HTTP interceptor listens to all HTTP requests and shows a spinner / loader indicator during pending http requests.

## Angular 4 / Angular 5 / Angular 6

The latest compatible version with angular 4 is **``0.3.4``**.
If you want to use Angular 5, use versions **``0.4.0``** and above.

The latest compatible version with angular 5 is version **``0.9.1``**.

From version **``1.0.0``**, the module is angular 6 / RxJS 6 compatible only.

If you experience errors like below, **please double check the version you use.**

``ERROR in Error: Metadata version mismatch for module [...]/angular/node_modules/ng-http-loader/ng-http-loader
  .module.d.ts, found version x, expected y, resolving symbol AppModule in [...]/angular/src/app.module.ts``

## Requirements - HttpClientModule

Performing http requests with the ``HttpClientModule`` API is **mandatory**. Otherwise,the spinner will not be fired **at all**.

See this [blog post](http://blog.ninja-squad.com/2017/07/17/http-client-module/) for an ``HttpClientModule`` introduction.

## Usage

From your Angular `AppModule`:

```typescript
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
[...]
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http'; <============
import { NgHttpLoaderModule } from 'ng-http-loader/ng-http-loader.module'; <============

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule, <============ (Perform http requests with this module)
    NgHttpLoaderModule, <============
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

or (splitted modules mode for more convenience)

```typescript
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
[...]
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http'; <============
import { NgHttpLoaderComponentsModule } from 'ng-http-loader/components/ng-http-loader-components.module'; <============
import { NgHttpLoaderServicesModule } from 'ng-http-loader/services/ng-http-loader-services.module'; <============

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule, <============ (Perform http requests with this module)
    NgHttpLoaderServicesModule, <============
    NgHttpLoaderComponentsModule, <============
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

In your app.component.html, simply add :
```xml
<spinner></spinner>
```

## Customizing the spinner

You can customize the **background-color**, the **spinner type** and the **debounce delay** (ie. after how many milliseconds the spinner will be displayed, if needed):
```xml
<spinner 
    [backgroundColor]="'#ff0000'"
    [spinner]="spinkit.skWave"
    [debounceDelay]="200"
>
</spinner>
```

**_To use this syntax, you must reference the ``Spinkit`` const as a public property in your app.component.ts_**:

```typescript
import { Spinkit } from 'ng-http-loader/spinkits'; <============

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
})
export class AppComponent {
    public spinkit = Spinkit; <============
    [...]
}
```
The different spinners available are referenced in [this class](src/spinkits.ts).


**_Otherwise, you can simply reference the chosen spinner as a simple string_**:

```xml
<spinner backgroundColor="#ff0000" spinner="sk-wave"></spinner>
```

## Defining your own spinner

You can define your own loader component in place of the built-in ones. The needed steps are:

- Create your component
- Add it to the [entryComponent](https://angular.io/guide/ngmodule-faq#what-is-an-entry-component) definition in your module definition
- Reference your component in a public property in your ``app.component.ts``
- Reference the property in the spinner component like this :
```xml
<spinner [entryComponent]="myAwesomeComponent"></spinner>
```

You can find some short examples [here](https://gist.github.com/mpalourdio/2c0bec03d610b24ff49db649fbb69a48) and [here](https://gist.github.com/mpalourdio/e05b4495de2abeeecfcf92d70e4ef93e).

## Requests filtering

You can also filter the http requests that shouldn't be caught by the interceptor by providing **an array of regex patterns**:
```xml
<spinner [filteredUrlPatterns]="['\\d', '[a-zA-Z]', 'my-api']"></spinner>
```

## Manually show and hide the spinner

You can manually show and hide the spinner component if needed. You must use the ``SpinnerVisibilityService`` for this purpose.  

Sometimes, when manually showing the spinner, an http request could be performed in background, and when finished, the spinner would automagically disappear.  

**For this reason, when calling ``SpinnerVisibilityService#show()``, it prevents the http interceptor from being triggered unless you explicitly call ``SpinnerVisibilityService#hide()``.**

```typescript
import { SpinnerVisibilityService } from 'ng-http-loader/services/spinner-visibility.service';

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

Each Spinkit component defined in [SPINKIT_COMPONENTS](src/spinkits.ts#L30) can be used independently.

## Credits

[Tobias Ahlin](https://github.com/tobiasahlin), the awesome creator of [SpinKit](https://github.com/tobiasahlin/SpinKit).
