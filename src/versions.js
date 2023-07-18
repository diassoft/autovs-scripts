// Export functions
exports.parseVersion = parseVersion;
exports.bumpVersion = bumpVersion;
exports.newVersionObject = newVersionObject;

/**
 * Parses the version.
 *
 * @param   version  The fully formatted version.
 * @returns An object containing the version details
 */
function parseVersion(version) {
    
    // Version Variables
    var vers_main = '';
    var vers_prerelease = '';
    var vers_major = '0';
    var vers_minor = '0';
    var vers_patch = '0';
    var vers_prerelease_identifier = '';
    var vers_prerelease_version = '';
    var vers_prerelease_build = '';

    // Start Processing Version
    var vers_split = version.split('-');
    vers_main = vers_split[0];

    // Parse Main
    var vers_main_split = vers_main.split('.');

    if (vers_main_split.length == 0) return null;
    if (vers_main_split.length > 0)
        vers_major = vers_main_split[0].replace('v','').replace('V','');

    if (vers_main_split.length > 1)
        vers_minor = vers_main_split[1];

    if (vers_main_split.length > 2)
        vers_patch = vers_main_split[2];

    // Parse Pre-Release
    if (vers_split.length == 2)
    {
        vers_prerelease = vers_split[1];

        var vers_prerelease_split = vers_prerelease.split('+');

        if (vers_prerelease_split.length == 2)
            vers_prerelease_build = vers_prerelease_split[1];
    
        if (vers_prerelease_split.length >= 1)
        {
            var vers_prerelease_name_split = vers_prerelease_split[0].split('.');

             if (vers_prerelease_name_split.length == 2)
                vers_prerelease_version = vers_prerelease_name_split[1];

            if (vers_prerelease_name_split.length >= 1)
                vers_prerelease_identifier = vers_prerelease_name_split[0];
        }
    }

    return newVersionObject(vers_major, vers_minor, vers_patch, vers_prerelease_identifier, vers_prerelease_version, vers_prerelease_build);
} 

/**
 * Bumps to the next version
 *
 * @param   currentVersion  The fully formatted version.
 * @param   level The level of bumping in plain text (Major, Minor, Patch, Pre-Release Identifier, Pre-Release Number)
 * @param   buildNumber The number of the build (only append when there is pre-release data)
 * @returns An object containing the version information
 */
function bumpVersion(currentVersion, level, buildNumber) {

    var version_info = parseVersion(currentVersion);
    var formattedLevel = level.toString().toLowerCase();

    if (formattedLevel === 'major')
    {
        version_info.major = version_info.major + 1;
        version_info.minor = 0;
        version_info.patch = 0;
        version_info.preReleaseIdentifier = "alpha";
        version_info.preReleaseVersion = 1;
    }
    else if (formattedLevel === 'minor')
    {
        version_info.minor = version_info.minor + 1;
        version_info.patch = 0;
        version_info.preReleaseIdentifier = "alpha";
        version_info.preReleaseVersion = 1;
    }
    else if (formattedLevel === 'patch')
    {
        version_info.patch = version_info.patch + 1;
        version_info.preReleaseIdentifier = "alpha";
        version_info.preReleaseVersion = 1;
    }
    else if (formattedLevel === 'prerelease-identifier')
    {
        if (version_info.preReleaseIdentifier === "" || version_info.preReleaseIdentifier === null)
            version_info.preReleaseIdentifier = "alpha";
        else if (version_info.preReleaseIdentifier === "alpha")
            version_info.preReleaseIdentifier = "beta";
        else if (version_info.preReleaseIdentifier === "beta")
            version_info.preReleaseIdentifier = "rc";
        
        version_info.preReleaseVersion = 1;
    }
    else if (formattedLevel === 'prerelease-version')
    {
        version_info.preReleaseVersion = version_info.preReleaseVersion + 1;
    }

    // Assign the build number
    version_info.preReleaseBuild = parseInt(buildNumber);

    return version_info;
}

/**
 * Creates a new Version Object
 *
 * @param   major The version major
 * @param   minor The version minor
 * @param   patch The version patch
 * @param   preReleaseIdentifier The Pre-Release Identifier
 * @param   preReleaseVersion The Pre-Release Version
 * @param   preReleaseBuild The Pre-Release Build Number
 * @returns An object containing version information
 */
function newVersionObject(_major, _minor, _patch, _preReleaseIdentifier, _preReleaseVersion, _preReleaseBuild)
{
    var versionObj = {
        major: parseInt(_major),
        minor: parseInt(_minor),
        patch: parseInt(_patch),
        preReleaseIdentifier: _preReleaseIdentifier.toString().toLowerCase(),
        preReleaseVersion: parseInt(_preReleaseVersion),
        preReleaseBuild: parseInt(_preReleaseBuild),
        formattedVersion() {
            var textVersion = `v${this.major}.${this.minor}.${this.patch}`;

            if (!(this.preReleaseIdentifier === null || this.preReleaseIdentifier.trim() === ""))
                textVersion += `-${this.preReleaseIdentifier}`;

            if (!(this.preReleaseVersion === 0))
                textVersion += `.${this.preReleaseVersion}`;

            if (!(this.preReleaseBuild === 0))
                textVersion += `+${this.preReleaseBuild.toString().padStart(6,'0')}`;

            return textVersion;
        },
        firmVersion() {
            return newVersionObject(this.major, this.minor, this.patch, "", 0, 0);
        }
    };

    return versionObj;
}