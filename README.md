# Automatic Versioning Scripts

[![Build Status](https://github.com/diassoft/autovs-scripts/actions/workflows/build.yml/badge.svg)](https://github.com/diassoft/autovs-scripts/actions/workflows/build.yml/badge.svg)
[![NPM Version](https://img.shields.io/npm/v/autovs-scripts.svg?style=flat)](https://www.npmjs.org/package/autovs-scripts)
[![NPM Downloads](https://img.shields.io/npm/dm/autovs-scripts.svg?style=flat)](https://npmcharts.com/compare/autovs-scripts?minimal=true)

A node.js package that contains functions to manage versions.

## Installation

```sh
npm install autovs-scripts
```

## Usage

After you have installed the `autovs-scripts`, you can use it on your code. Follow the code below.

```js
// Initialize the versions component
const versions = require('autovs-scripts');

// Create a version object based on the given string
var myVersion = versions.parseVersion('v1.2.3-alpha.1+001250');

console.log(`Current major is: ${myVersion.major}`);
// Current major is: 1

console.log(`Current firm version is: ${myVersion.firmVersion().formattedVersion()}`);
// Current firm version is: v1.2.3

// Bump version
var myBumpedVersion = versions.bumpVersion('v1.2.3-alpha.1+001250', 'major', 2000);

console.log(`Bumped version is: ${myBumpedVersion.formattedVersion()}`);
// Bumped version is: v2.0.0-alpha.1+002000

```

The `versions` object will expose the following methods:

| Method | Description |
| :-- | :-- |
| `parseVersion()` | Parses a string into a version object |
| `bumpVersion()` | Bump the given version to the next level |
| `newVersionObject()` | Creates a version object based on the given input |

## Version Object

Both `parseVersion()` and `bumpVersion()` return a version object. This object is composed of the following members:

| Member | Description |
| :-- | :-- |
| `major` | The version major |
| `minor` | The version minor |
| `patch` | The version patch |
| `preReleaseIdentifier` | The pre-release identifier (`alpha`, `beta`, `rc`) |
| `preReleaseVersion` | The pre-release version |
| `preReleaseBuild` | The build number (only for pre-releases) |  
| `formattedVersion()` | Returns the formatted version (Example: `v1.2.0-alpha.1+001210`) |
| `firmVersion()` | Returns the firm version (Example: for `v1.2.0-alpha.1+001210`, this method will return `v1.2.0`) |

You can manually create a `Version Object` by calling the `newVersionObject()`.

## Parse Version - parseVersion()

The `parseVersion()` method will convert a string into a `Version Object`.

### Input Parameters

| name | required | description |
| :-- | :--: | :-- |
| `version` | yes | A string containing the version to be parsed. Example `v1.2.0-alpha.1+001210`. |

### Output

The function returns a `Version Object` containing the individual components of a version.

## Bump Version - bumpVersion()

The `bumpVersion()` method will move the current version into the next level, and return a `Version Object`.

### Input Parameters

| name | required | description |
| :-- | :--: | :-- |
| `currentVersion` | yes | A string containing the current version to be bumped. Example `v1.2.0-alpha.1+001210`. |
| `level` | yes | The level that needs to be bumped for the version. Valid values are: `major`, `minor`, `patch`, `prerelease-identifier`, `prerelease-version`. |
| `buildNumber` | no | A number representing the build number to be added to the end of the version. |

### Output

The function returns a `Version Object` containing the bumped version.