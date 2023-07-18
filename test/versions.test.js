const versions = require('../src/versions.js');
const version = 'v1.2.3-alpha.1+000001';

test('parse version from string into object', () => {

    // Setup the version
    var currentVersion = versions.parseVersion(version);

    expect(currentVersion.major).toBe(1);
    expect(currentVersion.minor).toBe(2);
    expect(currentVersion.patch).toBe(3);
    expect(currentVersion.preReleaseIdentifier).toMatch('alpha');
    expect(currentVersion.preReleaseVersion).toBe(1);
    expect(currentVersion.preReleaseBuild).toBe(1);

});

test('retrieve firm version', () => {

    // Setup the version
    var currentVersion = versions.parseVersion(version);
    var firmVersion = currentVersion.firmVersion();

    expect(firmVersion.formattedVersion()).toMatch('v1.2.3');

});

test('bump version to next major', () => {

    // Setup the version
    var currentVersion = versions.parseVersion(version);
    var bumpedVersion = versions.bumpVersion(currentVersion.formattedVersion(), 'major', 4520);

    expect(bumpedVersion.formattedVersion()).toMatch('v2.0.0-alpha.1+004520');

});

test('bump version to next minor', () => {

    // Setup the version
    var currentVersion = versions.parseVersion(version);
    var bumpedVersion = versions.bumpVersion(currentVersion.formattedVersion(), 'minor', 4520);

    expect(bumpedVersion.formattedVersion()).toMatch('v1.3.0-alpha.1+004520');

});

test('bump version to next patch', () => {

    // Setup the version
    var currentVersion = versions.parseVersion(version);
    var bumpedVersion = versions.bumpVersion(currentVersion.formattedVersion(), 'patch', 4520);

    expect(bumpedVersion.formattedVersion()).toMatch('v1.2.4-alpha.1+004520');

});

test('bump version to next pre-release identifier', () => {

    // Setup the version
    var currentVersion = versions.parseVersion(version);
    var bumpedVersion = versions.bumpVersion(currentVersion.formattedVersion(), 'prerelease-identifier', 4520);

    expect(bumpedVersion.formattedVersion()).toMatch('v1.2.3-beta.1+004520');

});

test('bump version to next pre-release number', () => {

    // Setup the version
    var currentVersion = versions.parseVersion(version);
    var bumpedVersion = versions.bumpVersion(currentVersion.formattedVersion(), 'prerelease-version', 4520);

    expect(bumpedVersion.formattedVersion()).toMatch('v1.2.3-alpha.2+004520');

});