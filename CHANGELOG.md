# Changelog

## v7.0.0
- Added angular 9 support. 

## v6.0.1
- The `rxjs` peer dependency is now `^6.5.0`, because the module uses the new `creation function partition observable` introduced in [v6.5.0](https://github.com/ReactiveX/rxjs/blob/f07d349da8c2e0dbddca17d33a9b4a1ceaf59354/CHANGELOG.md#650-2019-04-23).

## v6.0.0
- Angular 8.x is now the default supported version.
- The `subscription` in `NgHttpLoaderComponent` has completely been removed in favor of an `observable`. As there's no need to unsubscribe anymore, `ngOnDestroy` has been removed.
- The `observable` initialization has been moved to `ngOnInit`.
- The tests suite could fail (and succeed) in some unexpected ways. This was caused by some race conditions introduced in v5.0.0. Those are now (hopefully) fixed.
 
## v5.1.0
- This release introduces 2 new options: 
    - **backdrop** (`true` by default): If set to `false`, the spinner background elements will remain clickable, without any background color.
    - **opacity**: This option lets you override the spinner opacity (0.7 by default).

## v5.0.1
- The `rxjs` `peerDependency` has been relaxed from `~6.3.3` to `^6.3.3` so that no warning is thrown when the `rxjs` version has been bumped at application side.

## v5.0.0
- Prior to this release, `NgHttpLoaderComponent#isSpinnerVisible` was a boolean. Because of unexpected behaviors when a component with `ChangeDetectionStrategy.OnPush` performed HTTP requests, it is now an `Observable<boolean>` and has been renamed to `NgHttpLoaderComponent#isVisible$`.  
The associated template now uses an `async pipe` in order to perform the show/hide logic.

- `PendingInterceptorService` has been renamed to `PendingRequestsInterceptor`.

## v4.0.0
- `HttpClientModule` has been removed from imports.  
This caused some issues when external modules were imported in an application, and those modules registered their own HTTP interceptors. See [this issue](https://github.com/angular/angular/issues/20575) for reference.

- A static `forRoot()` method has been added to the module declaration. You must now [explicitly call this method](README.md#usage) when importing `NgHttpLoaderModule` in your root application module.
This intends to avoid multiple providers instances when working with lazy modules in which you would want to import `NgHttpLoaderModule` again for any reason.

- The default spinner is now `Spinkit.skWave` (less CPU intensive). 

## v3.2.0

`peerDependencies` section now targets `angular 7`. The module is still `angular 6` compatible, so this is not a major release.  
Users are still encouraged to upgrade their applications ASAP.

## v3.1.2

- Added [browserslist](https://github.com/browserslist/browserslist) support.  
- Some cleanup has been done in CSS files to let the CSS auto-prefixer do the job automatically regarding supported browsers.  
- Spinkit CSS integration has been been replaced by SCSS.

## v3.1.1

The Subscriptions that had been previously moved from constructor to `ngOnInit` are back in constructor. This avoids testing if the subscriptions exist in `ngOnDestroy` before unsubscribing them.

## v3.1.0

Awesome contribution by [gnom7](https://github.com/gnom7)
- Better handling of sequential HTTP requests. Particularly when mixed with the `minDuration` option. See [this issue](https://github.com/mpalourdio/ng-http-loader/issues/89) for reference.

```
Min. duration time: 300ms
---0ms------------------------------200ms-------280ms----------------400ms|  
----|---------------------------------------------|-----------------------|  
(req1 starts and spinner shows)  (req1 ends)  (req2 starts)   (req2 ends and spinner hides)
```

Before this, `minDuration` would have been applied to both HTTP requests.

- Added the `extraDuration` option: 
    - This option make the spinner visible a certain amount of time after the moment when it should have naturally been hidden. This avoids flickering when, for example, multiple HTTP requests are ran sequentially.
    - See [this issue](https://github.com/mpalourdio/ng-http-loader/issues/90) for reference

```
Extra duration time: 60ms
---0ms----------200ms------260ms---- |  
----|------------|----------|--------|  
req starts   req ends  spinner hides
```

## v3.0.0

- All existing deprecations have been removed.
- BC breaks => 
    - `SpinnerComponent` has been renamed to `NgHttpLoaderComponent`.
    - The `<spinner>` component-selector has been renamed to `<ng-http-loader>`.

## v2.3.0

This release adds the possibility to filter HTTP requests that should not be handled by the interceptor by providing an array of HTTP headers to the component's `filteredHeaders` property.

## v2.2.0

This release adds the possibility to filter HTTP requests that should not be handled by the interceptor by providing an array of HTTP methods to the component's `filteredMethods` property.

## v2.1.0

This release introduces the **minimum duration** option. It gives the possibility to force a minimum duration during which the spinner should be visible.
You can mix this parameter with the **debounce delay** option:

```xml
<ng-http-loader 
    [debounceDelay]="100"
    [minDuration]="300">
</ng-http-loader>
```

```
Debounce delay: 100ms
Min. duration time: 300ms
---0ms--------100ms------------180ms-----------400ms--
----|----------|-----------------|---------------|---- 
req starts  spinner shows    req ends     spinner hides
```

`SpinnerVisibilityService#visibilityObservable` and `PendingInterceptorService#pendingRequestsStatus` have been respectively deprecated in favor of `visibilityObservable$` and `pendingRequestsStatus$` (note the **$**).

## v2.0.0

The module bundling now uses [ng-packagr](https://github.com/dherges/ng-packagr).  
From now, you must use `import { xxxxxxx } from 'ng-http-loader'` without referencing the full path.

Also, `NgHttpLoaderServicesModule` && `NgHttpLoaderComponentsModule` have been removed and merged back to `NgHttpLoaderModule`.  
The `injectables` now take advantage of the new [Tree Shakable Providers features](https://blog.angular.io/version-6-of-angular-now-available-cc56b0efa7a4).  
The integration in much cleaner, particularly with lazy loaded modules, and avoids the static `forRoot()` boilerplate. 

## v1.0.3

Some compiler options have been reverted, so the compilation target is `es5` like before v1.0.2.

## v1.0.2

The compiler options have been adjusted so ng-http-loader is now an es2015 module, and can be tree-shaked.

## v1.0.1

This release is a bug fix release. It prevents the `PendingInterceptorService` from being triggered when using the `SpinnerVisibilityService`.  
See this [issue](https://github.com/mpalourdio/ng-http-loader/issues/64) for more details.

## v1.0.0

This release introduces full support for angular 6 & RxJS 6.

## v0.9.1

This release fixes a bug on the SpinKit Sk-Wave component that only appeared after template inlining.

See [this thread](https://github.com/tobiasahlin/SpinKit/issues/139) for details.

## v0.9.0

This release adds the more friendly SpinnerVisibilityService#show() && SpinnerVisibilityService#hide() methods as public API.  
The `visibilitySubject` introduced in v0.8.0 is now a `ReplaySubject`, and its getter returns now an observable.

See the [Manually show and hide the spinner](https://github.com/mpalourdio/ng-http-loader#manually-show-and-hide-the-spinner) section.

## v0.8.0

This release adds the `SpinnerVisibilityService`, a simple injectable service that allows you to manually show/hide the spinner.

See the [Manually show and hide the spinner](https://github.com/mpalourdio/ng-http-loader#manually-show-and-hide-the-spinner) section.

## v0.7.1

This release is a bug fix release. It slightly improves the behavior of the `filteredUrlPatterns` so this parameter takes care of query strings too.

## v0.7.0

This release adds the `entryComponent` property. It allows to specify your own component instead of the built-in ones. It uses the [NgComponentOutlet](https://angular.io/api/common/NgComponentOutlet) feature.

See the [Defining your own spinner](https://github.com/mpalourdio/ng-http-loader#defining-your-own-spinner) section.

## v0.6.0

This release adds the `debounceDelay` parameter (default is 0). It allows to discard the spinner for fast and repeated HTTP requests, which can be annoying under some conditions.

See [customization](https://github.com/mpalourdio/ng-http-loader#customizing-the-spinner)

The library footprint has been reduced by minifying templates and stylesheets before inlining them.

The library now takes advantage of [RxJS lettable operators](https://github.com/ReactiveX/rxjs/blob/master/doc/lettable-operators.md)

## v0.5.1

This release fixes a bug that could cause the spinner to not show if an HTTP request were performed **before** the spinner component was initialized.  
The responsible `Subject` has been replaced by a `ReplaySubject`.

## v0.5.0

The module is now splitted in sub-modules for more convenience. See [usage](https://github.com/mpalourdio/ng-http-loader#usage).  
It's an **opt-in** feature. The "old" module import method, by simply declaring `NgHttpLoaderModule`, is still fully supported. 

**BC break**: paths of components and services have changed.
- Components are now located in the `components` folders.
- Services are now located in the `services` folders.

## v0.4.0

Added **angular 5** full support. The last version compatible with angular 4 is `version 0.3.4`

## v0.3.4

Fixed default spinners background.

## v0.3.0

This release gives the possibility to filter HTTP requests that should not be handled by the interceptor by providing an array of URL regex to the component's `filteredUrlPatterns` property.

## v0.2.0

Definitely switch to the new HttpClientModule api available from angular 4.3

## v0.1.0

Before completely removing HttpInterceptorService, provide a parallel implementation based on the new built-in angular 4.3 interceptor
