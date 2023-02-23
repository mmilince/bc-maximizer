$ScriptDir = Split-Path -Path $MyInvocation.MyCommand.Path -Parent
$BinDir = Join-Path -Path $ScriptDir -ChildPath "..\bin"
$ImagesDir = Join-Path -Path $ScriptDir -ChildPath "..\images"
$SourceDir = Join-Path -Path $ScriptDir -ChildPath "..\src"
$ArchivePath = Join-Path -Path $ScriptDir -ChildPath "..\bin\bc-maximizer.zip"
$ManifestPath = Join-Path -Path $ScriptDir -ChildPath "..\manifest.json"

If(test-path -PathType container $BinDir)
{
      Remove-Item -Path $BinDir -Recurse
}
New-Item -ItemType Directory -Path $BinDir

# Create a zip file
Compress-Archive -Path $ImagesDir -DestinationPath $ArchivePath

# Add more files to the zip file
# (Existing files in the zip file with the same name are replaced)
Compress-Archive -Path $SourceDir -Update -DestinationPath $ArchivePath
Compress-Archive -Path $ManifestPath -Update -DestinationPath $ArchivePath

