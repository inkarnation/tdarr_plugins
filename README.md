# tdarr_plugins
Custom plugins developed for [HaveAGitGat/Tdarr](https://github.com/HaveAGitGat/Tdarr)

## Available Plugins
| Plugin ID                                       	| Description                                                                                                                                                                             	|
|-------------------------------------------------	|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------	|
| Tdarr_Plugin_00ik_filter_by_audiocodec_language 	| Filter (exclude)  specific audio codecs in a specific language. For example you can use this filter to exclude files from processing which contain a french aac track. 	|


## Installation / Usage
Grab the plugin you're interested in (The correct file to use is a concatination of the `Plugin ID` and the `.js` suffix) and place it within your tdarr installation in `Tdarr/Plugins/Local` (Folder depends on your installation, node/server, ...). Make sure the user running tdarr has proper permissions on the plugin file. Now you can use the Plugin in your stacks.
