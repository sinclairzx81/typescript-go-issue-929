# TypeScript Go: Repro Issue 929

https://github.com/microsoft/typescript-go/issues/929

# Instructions

```bash
npm install             # install typebox, tsc, tsgo

npm run build:tsgo      # (error) builds using the native compiler 

npm run build:tsc       # (no-error) builds using the javascript compiler 
```