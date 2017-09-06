# eslint-plugin-email-css-rules
[![js-standard-style](https://cdn.rawgit.com/standard/standard/master/badge.svg)](http://standardjs.com)
[![Build Status](https://travis-ci.org/taskworld/eslint-plugin-email-css-rules.svg?branch=master)](https://travis-ci.org/taskworld/eslint-plugin-email-css-rules)
[![Coverage Status](https://coveralls.io/repos/github/taskworld/eslint-plugin-email-css-rules/badge.svg?branch=master)](https://coveralls.io/github/taskworld/eslint-plugin-email-css-rules?branch=master)

React css email's rules.

## installation
Install [ESLint](https://github.com/eslint/eslint) either locally or globally.

```sh
npm install eslint
```

After that

```sh
$ npm install eslint-email-rules --save-dev
```

# Configuration

Add to ```plugins``` section in eslintrc file.

```json
{
  "plugins": [
    "email-css-rules"
  ]
}
```

If it is not already the case you must also configure `ESLint` to support JSX.

```json
{
  "ecmaFeatures": {
    "jsx": true
  }
}
```
# Avaiable rules
- email-css-rules/unsupported-css
- email-css-rules/background-image
- email-css-rules/defined-space
- email-css-rules/unknown-css

### unsupported-css
 Basically to detected unsupport or mal-css string in React code.
### background-image
 background style doesn't support url image in some email platforms.
### defined-space
 width and padding to make a space between element in your visualize component. Some email platforms doesn't support that.
### unknown-css
 check unknown or mis-spelling css style.

# Special Thank

 Thanks for all reference data from [react-html-email](https://github.com/chromakode/react-html-email) to composed those datas to JSON. And ValidatorCssStyle inspration.

 Huge thank from resource from [The Untimate Guide to CSS](https://www.campaignmonitor.com/css/) to collect the css breakdown in every platforms.

# Contribute
I warm welcome all for contributer to make it better (Trump face).
