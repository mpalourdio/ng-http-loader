import type { Config } from 'jest';

export default {
    preset: 'jest-preset-angular',
    coverageReporters: ["lcovonly"],
    coverageDirectory: './coverage',
    verbose: true
} satisfies Config;
