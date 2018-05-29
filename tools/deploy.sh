#!/bin/bash

set -eu -o pipefail

declare -A PROJECT_ID

#Firebase project Ids
PROJECT_ID["stable", "dev"]="materialdesign-4a9fd"
PROJECT_ID["stable", "prod"]="materialdesign-4a9fd"
PROJECT_ID["v5", "dev"]="materialdesign-4a9fd"
PROJECT_ID["v5", "prod"]="materialdesign-4a9fd"

version=${1:-stable}
mode=${2:-dev}
projectId=${PROJECT_ID[$version, $mode]}

npm run build-themes
$(npm bin)/ng build --aot --prod
$(npm bin)/firebase use $projectId
$(npm bin)/firebase deploy

