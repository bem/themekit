## [1.6.6](https://github.com/bem/themekit/compare/v1.6.5...v1.6.6) (2021-02-05)

### Bug Fixes

- fix broken sources ([dd0229e](https://github.com/bem/themekit/commit/dd0229ea15ee3bb7857cf12aaf321f96294c628c))

## [1.6.5](https://github.com/bem/themekit/compare/v1.6.4...v1.6.5) (2021-01-04)

### Bug Fixes

- fix resolving nested themes ([2cd439f](https://github.com/bem/themekit/commit/2cd439febfaed7b4c7bbadc1e210c39ed85bab5c))

### Features

- impl presets registration ([3c70d79](https://github.com/bem/themekit/commit/3c70d79785493e19de6f322a5df23aaea66af072))
- register css preset ([f5eeae5](https://github.com/bem/themekit/commit/f5eeae53927a30e70a3f4701178b8a18f05e135a))

## [1.6.4](https://github.com/bem/themekit/compare/v1.6.3...v1.6.4) (2020-10-27)

### Bug Fixes

- use normalize for glob path ([0f5e17b](https://github.com/bem/themekit/commit/0f5e17bcaa908167d0ae64de55c07ecc6efd52d6))

## [1.6.3](https://github.com/bem/themekit/compare/v1.6.2...v1.6.3) (2020-10-26)

### Bug Fixes

- throw custom YamlParseError while yaml parse ([a16bbf4](https://github.com/bem/themekit/commit/a16bbf43b88c9ffdd1c95014870da7e70a7505e1))
- wrap build to try-catch ([0f8213c](https://github.com/bem/themekit/commit/0f8213c65414dc44d019b934c7b03da1e4d28ba0))

## [1.6.2](https://github.com/bem/themekit/compare/v1.6.1...v1.6.2) (2020-08-26)

### Bug Fixes

- dont remove common platform from css selector ([3be6159](https://github.com/bem/themekit/commit/3be61594eea84506d477ea0a6ff307a3547bcbb2))

## [1.6.1](https://github.com/bem/themekit/compare/v1.6.0...v1.6.1) (2020-08-24)

### Bug Fixes

- find correct package root ([46dbd1d](https://github.com/bem/themekit/commit/46dbd1d38cb78c78e35d3773ae2af4a800364f25))

# [1.6.0](https://github.com/bem/themekit/compare/v1.5.0...v1.6.0) (2020-08-24)

### Bug Fixes

- close watcher after kill process ([f85d398](https://github.com/bem/themekit/commit/f85d398a72975da268f633dfadcf584fd6b1a784))
- replace placeholders with global flag ([71c3759](https://github.com/bem/themekit/commit/71c37592a476d701f4eda573a402183efbb1d2df))
- save sources order after glob ([24b4a0a](https://github.com/bem/themekit/commit/24b4a0accfd93a6d2f8385863919704ca1e01c1e))

### Features

- add autoload config with js, json and yml ext ([e4305c5](https://github.com/bem/themekit/commit/e4305c5add78b74dddf896911528cfd7ca20b682))
- add flags for selected builds ([2425f72](https://github.com/bem/themekit/commit/2425f72dde7909ccd9d025ae7ddee28fd61425d4))
- deprecate css/whitepaper format ([89b1754](https://github.com/bem/themekit/commit/89b17542a084f6ea8044cacfda4d97fcd3cc5f1f))
- export public API for register own plugins ([d331790](https://github.com/bem/themekit/commit/d331790d86327e18047e78d148f954accddf19d0))

### Performance Improvements

- replace throttle to debounce for watcher cb ([db3592c](https://github.com/bem/themekit/commit/db3592c53eaaa1ddfaab17b3aca0304ce05fcb34))

<a name="1.5.0"></a>

# [1.5.0](https://github.com/bem/themekit/compare/v1.4.1...v1.5.0) (2020-08-07)

### Features

- supports platform with entry for selector setting ([7ed567e](https://github.com/bem/themekit/commit/7ed567e))

<a name="1.4.1"></a>

## [1.4.1](https://github.com/bem/themekit/compare/v1.4.0...v1.4.1) (2020-08-04)

### Bug Fixes

- use transforms for vars with mapping ([b8709d7](https://github.com/bem/themekit/commit/b8709d7))

<a name="1.4.0"></a>

# [1.4.0](https://github.com/bem/themekit/compare/v1.3.2...v1.4.0) (2020-08-02)

### Features

- use css vars for aliases ([92b9174](https://github.com/bem/themekit/commit/92b9174))

<a name="1.3.2"></a>

## [1.3.2](https://github.com/bem/themekit/compare/v1.3.1...v1.3.2) (2020-07-28)

### Bug Fixes

- use normalize for glob paths ([5db41d4](https://github.com/bem/themekit/commit/5db41d4))

<a name="1.3.1"></a>

## [1.3.1](https://github.com/bem/themekit/compare/v1.3.0...v1.3.1) (2020-07-12)

### Bug Fixes

- use custom flatten instead native for old node ([454ff5e](https://github.com/bem/themekit/commit/454ff5e))

<a name="1.3.0"></a>

# [1.3.0](https://github.com/bem/themekit/compare/v1.2.2...v1.3.0) (2020-07-06)

### Features

- use platform placeholder for wp config ([ab3545a](https://github.com/bem/themekit/commit/ab3545a))

<a name="1.2.2"></a>

## [1.2.2](https://github.com/bem/themekit/compare/v1.2.1...v1.2.2) (2020-07-01)

### Bug Fixes

- use pkg-dir for resolve package root ([3015e55](https://github.com/bem/themekit/commit/3015e55))

<a name="1.2.1"></a>

## [1.2.1](https://github.com/bem/themekit/compare/v1.2.0...v1.2.1) (2020-06-23)

### Bug Fixes

- use group capture for color regexp ([b1a34b2](https://github.com/bem/themekit/commit/b1a34b2))

<a name="1.2.0"></a>

# [1.2.0](https://github.com/bem/themekit/compare/v1.1.1...v1.2.0) (2020-06-22)

### Bug Fixes

- support transparent color ([9cc89b9](https://github.com/bem/themekit/commit/9cc89b9))

### Features

- impl wp color and root filters ([52b96f1](https://github.com/bem/themekit/commit/52b96f1))

<a name="1.1.1"></a>

## [1.1.1](https://github.com/bem/themekit/compare/v1.1.0...v1.1.1) (2020-06-17)

### Bug Fixes

- fix sources order with extends ([f28d740](https://github.com/bem/themekit/commit/f28d740))
- use flat sources for watcher ([6a5108a](https://github.com/bem/themekit/commit/6a5108a))
- use sort for idempotent result ([95e3f59](https://github.com/bem/themekit/commit/95e3f59))

<a name="1.1.0"></a>

# [1.1.0](https://github.com/bem/themekit/compare/v1.0.0...v1.1.0) (2020-06-15)

### Features

- add watch mode ([c881be6](https://github.com/bem/themekit/commit/c881be6))

<a name="1.0.0"></a>

# [1.0.0](https://github.com/bem/themekit/compare/v0.0.0-alpha.3...v1.0.0) (2020-06-12)

### Bug Fixes

- add dual sort fo idempotent result ([0225414](https://github.com/bem/themekit/commit/0225414))
- delete platforms from extends theme ([a7fdd09](https://github.com/bem/themekit/commit/a7fdd09))
- remove excess whitespaces ([1cd7905](https://github.com/bem/themekit/commit/1cd7905))
- run process color for every ext ([3c258f8](https://github.com/bem/themekit/commit/3c258f8))
- suppress extended error while yml parse ([b6f7d15](https://github.com/bem/themekit/commit/b6f7d15))
- use array type for loadMappers ([9b06713](https://github.com/bem/themekit/commit/9b06713))

### Features

- add deduplicate props ([61a0b25](https://github.com/bem/themekit/commit/61a0b25))
- add mapper for token names ([08db800](https://github.com/bem/themekit/commit/08db800))
- add process color functions ([6451969](https://github.com/bem/themekit/commit/6451969))
- add themes config ([b438cc4](https://github.com/bem/themekit/commit/b438cc4))
- add whitepaper format for config ([39a85f1](https://github.com/bem/themekit/commit/39a85f1))
- add whitepaper format for files ([4a4e43e](https://github.com/bem/themekit/commit/4a4e43e))
- add yaml ext for mappers ([12d8340](https://github.com/bem/themekit/commit/12d8340))
- add yaml interop for require ([f396323](https://github.com/bem/themekit/commit/f396323))
- impl extends theme config ([faf5857](https://github.com/bem/themekit/commit/faf5857))
- impl multiply platforms for one theme ([66140e5](https://github.com/bem/themekit/commit/66140e5))
- sort sources by levels ([10cd78b](https://github.com/bem/themekit/commit/10cd78b))
- support sources as single string ([b3cd2aa](https://github.com/bem/themekit/commit/b3cd2aa))
- use json ext as default for config ([10c4600](https://github.com/bem/themekit/commit/10c4600))
- use new config format ([f05f3f1](https://github.com/bem/themekit/commit/f05f3f1))
- use new format for config ([6e6e6da](https://github.com/bem/themekit/commit/6e6e6da))
- use style-dictionary as core build ([67025f1](https://github.com/bem/themekit/commit/67025f1))
- use whitepaper from config ([eb85d00](https://github.com/bem/themekit/commit/eb85d00))
- use whitepaper selectors from config ([6831b29](https://github.com/bem/themekit/commit/6831b29))

<a name="0.0.0-alpha.3"></a>

# [0.0.0-alpha.3](https://github.com/bem/themekit/compare/3dfdfc8...v0.0.0-alpha.3) (2020-05-14)

### Bug Fixes

- add flags and command descripion ([0fcb128](https://github.com/bem/themekit/commit/0fcb128))
- add new line at end for json template ([2137e38](https://github.com/bem/themekit/commit/2137e38))
- cast token to string ([12c85ab](https://github.com/bem/themekit/commit/12c85ab))
- fix build dir for css.flat and js.esm format ([83a95ea](https://github.com/bem/themekit/commit/83a95ea))
- fix semi for esm template ([4be9cce](https://github.com/bem/themekit/commit/4be9cce))
- fix types ([a1bbc60](https://github.com/bem/themekit/commit/a1bbc60))
- fix types for withTokens ([f32c56e](https://github.com/bem/themekit/commit/f32c56e))
- platforms are optional ([e9f355c](https://github.com/bem/themekit/commit/e9f355c))
- return string from color transform ([33f5c1a](https://github.com/bem/themekit/commit/33f5c1a))
- use cjd module for ts-node ([fae0298](https://github.com/bem/themekit/commit/fae0298))
- use default value for options ([dda2f26](https://github.com/bem/themekit/commit/dda2f26))
- use ts-node instead node-eval with ts compiler ([93d66db](https://github.com/bem/themekit/commit/93d66db))
- use uniq key for theme-layers ([49ce746](https://github.com/bem/themekit/commit/49ce746))

### Features

- add dynamic calc for token type ([30c9ddc](https://github.com/bem/themekit/commit/30c9ddc))
- add file header with description ([5fcfadb](https://github.com/bem/themekit/commit/5fcfadb))
- add fileName option ([585e4fd](https://github.com/bem/themekit/commit/585e4fd))
- add generic type for primitives ([d8abc06](https://github.com/bem/themekit/commit/d8abc06))
- add generic type for second theme ([dabf159](https://github.com/bem/themekit/commit/dabf159))
- add outDir option ([a75ce85](https://github.com/bem/themekit/commit/a75ce85))
- add progress status while build ([1649bb6](https://github.com/bem/themekit/commit/1649bb6))
- add type for platforms ([10fb70b](https://github.com/bem/themekit/commit/10fb70b))
- declare project platforms ([af24c07](https://github.com/bem/themekit/commit/af24c07))
- impl base transforms ([81afd14](https://github.com/bem/themekit/commit/81afd14))
- impl di for theme tokens ([a756465](https://github.com/bem/themekit/commit/a756465))
- impl flat tokens ([3e397d9](https://github.com/bem/themekit/commit/3e397d9))
- impl formats with templates ([904e4a4](https://github.com/bem/themekit/commit/904e4a4))
- impl import module with interop ([9ddf78a](https://github.com/bem/themekit/commit/9ddf78a))
- impl json format ([951109f](https://github.com/bem/themekit/commit/951109f))
- impl load project config ([ac5b72f](https://github.com/bem/themekit/commit/ac5b72f))
- impl project theme layers ([f90c3cf](https://github.com/bem/themekit/commit/f90c3cf))
- impl themekit client api ([24f3f94](https://github.com/bem/themekit/commit/24f3f94))
- impl token build ([4d89da0](https://github.com/bem/themekit/commit/4d89da0))
- init oclif cli ([3dfdfc8](https://github.com/bem/themekit/commit/3dfdfc8))
- merge nested themes for client api ([1049ff5](https://github.com/bem/themekit/commit/1049ff5))
- support esm module for withTokens ([b669d87](https://github.com/bem/themekit/commit/b669d87))
- support js format for config ([231a795](https://github.com/bem/themekit/commit/231a795))
- support outDir for each format ([7bddbbd](https://github.com/bem/themekit/commit/7bddbbd))
- support simple token ([dc76a6d](https://github.com/bem/themekit/commit/dc76a6d))
- throw error if module return invalid format ([bb066b3](https://github.com/bem/themekit/commit/bb066b3))
- use mask for source instead rootDir ([2230e37](https://github.com/bem/themekit/commit/2230e37))
- use new format for platforms at fs ([b52845b](https://github.com/bem/themekit/commit/b52845b))
