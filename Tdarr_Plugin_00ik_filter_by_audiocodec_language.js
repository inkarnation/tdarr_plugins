/* eslint no-plusplus: ["error", { "allowForLoopAfterthoughts": true }] */
const details = () => ({
  id: 'Tdarr_Plugin_00ik_filter_by_audiocodec_language',
  Stage: 'Pre-processing',
  Name: 'Filter - Filter by audio codec and language',
  Type: 'Video',
  Operation: 'Filter',
  Description: 'This plugin allows you to filter by checking the existence of an audio codec with a specific language.',
  Version: '1.00',
  Tags: 'filter',
  Inputs: [{
    name: 'codec',
    type: 'string',
    defaultValue: 'aac',
    inputUI: {
      type: 'text',
    },
    tooltip: 'Codec to filter for. Defaults to acc.'
          + '\\nExample:\\n'
          + 'dts or aac or ac3 or eac3 or dca or truehd',
  }, {
    name: 'languages',
    type: 'string',
    defaultValue: '',
    inputUI: {
      type: 'text',
    },
    tooltip: 'Specify the language tags to look for.'
          + '\\nExample:\\n'
          + 'eng,en',
  }],
});

// eslint-disable-next-line no-unused-vars
const plugin = (file, librarySettings, inputs, otherArguments) => {
  const lib = require('../methods/lib')();
  // eslint-disable-next-line no-unused-vars,no-param-reassign
  inputs = lib.loadDefaultValues(inputs, details);
  const response = {
    processFile: true,
    infoLog: '',
  };

  if (inputs.languages === '') {
    response.infoLog += 'Mandatory setting (languages) missing, skipping.';
    return response;
  }

  const filter_codec = inputs.codec ? inputs.codec : ['aac'];
  const filter_languages = inputs.languages.split(',');
  let filterMatched = false;

  // Try to find codec+lang of interest
  for (let i = 0; i < file.ffProbeData.streams.length; i += 1) {
    const currStream = file.ffProbeData.streams[i];
    if (
      currStream.codec_type.toLowerCase() === 'audio'
          && currStream.codec_name === filter_codec
          && currStream.tags
          && currStream.tags.language
    ) {
      for (let l = 0; l < filter_languages.length; l += 1) {
        if (currStream.tags.language === filter_languages[l]) {
          response.infoLog += 'File contains matching audio track: '
            + `${currStream.codec_name} in ${currStream.tags.language}`;
          filterMatched = true;
          break;
        }
      }
    }
  }

  if (filterMatched) {
    response.processFile = false;
  }

  return response;
};

module.exports.details = details;
module.exports.plugin = plugin;
