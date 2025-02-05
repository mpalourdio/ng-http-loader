// @ts-check
const eslint = require('@eslint/js');
const tseslint = require('typescript-eslint');
const angular = require('angular-eslint');
const rxjs = require('@smarttools/eslint-plugin-rxjs');

module.exports = tseslint.config(
    {
        files: ['**/*.ts'],
        extends: [
            eslint.configs.recommended,
            ...tseslint.configs.recommended,
            ...tseslint.configs.stylistic,
            ...angular.configs.tsRecommended,
            {
                languageOptions: {
                    parserOptions: {
                        projectService: true,
                        tsconfigRootDir: __dirname,
                    },
                },
            },
        ],
        plugins: {
            rxjs,
        },
        processor: angular.processInlineTemplates,
        'rules': {
            '@typescript-eslint/explicit-function-return-type': [
                'error'
            ],
            'no-extra-boolean-cast': [
                'off'
            ],
            '@angular-eslint/component-selector': [
                'error',
                {
                    'type': 'element',
                    'prefix': '',
                    'style': 'kebab-case'
                }
            ],
            '@angular-eslint/directive-selector': [
                'error',
                {
                    'type': 'attribute',
                    'prefix': '',
                    'style': 'camelCase'
                }
            ],
            'comma-dangle': [
                'error',
                {
                    'objects': 'never',
                    'arrays': 'always-multiline',
                    'functions': 'never'
                }
            ],
            'rxjs/finnish': [
                'error',
                {
                    'functions': true,
                    'methods': true,
                    'names': {
                        '^(canActivate|canActivateChild|canDeactivate|canLoad|intercept|resolve|validate)$': false
                    },
                    'parameters': true,
                    'properties': true,
                    'strict': false,
                    'types': {
                        '^EventEmitter$': false
                    },
                    'variables': true
                }
            ],
            'rxjs/no-implicit-any-catch': [
                'error',
                {
                    'allowExplicitAny': true
                }
            ]
        },
    },
    {
        files: ['**/*.html'],
        extends: [
            ...angular.configs.templateRecommended,
            ...angular.configs.templateAccessibility,
        ],
        rules: {},
    }
);
