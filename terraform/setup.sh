#!/bin/sh

set -o errexit
set -o nounset
set -o pipefail

cat > ${TF_CLI_CONFIG_FILE} <<EOF
credentials "app.terraform.io" {
  token = "${TERRAFORM_CLI_TOKEN}"
}
EOF

exit 0