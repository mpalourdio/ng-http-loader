## v0.5.0

The module is now splitted in sub-modules for more convenience. See [usage](https://github.com/mpalourdio/ng-http-loader#usage).  
It's an **opt-in** feature. The "old" module import method, by simply declaring ``NgHttpLoaderModule``, is still fully supported. 

**BC break** : paths of components and services have changed.
- Components are now located in the ``components`` folders.
- Services are now located in the ``services`` folders.

## v0.4.0

Added **angular 5** full support. The last version compatible with angular 4 is ``version 0.3.4``

## v0.3.4

Fixed default spinners background.

## v0.3.0

This release gives the possibility to filter http requests that should not be handled by the interceptor by providing an array of URL regex to the component's ``filteredUrlPatterns`` property.

## v0.2.0

Definitely switch to the new HttpClientModule api available from angular 4.3

## v0.1.0

Before completely removing HttpInterceptorService, provide a parallel implementation based on the new built-in angular 4.3 intercepto
