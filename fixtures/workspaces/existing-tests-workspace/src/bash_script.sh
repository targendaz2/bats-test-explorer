#!/usr/bin/env bash

# Enable strict mode
set -euo pipefail
IFS=$'\n\t'

# Exit trap
function cleanup {
  :
}
trap cleanup EXIT

function always_succeeds() {
    return 0
}

function always_fails() {
    return 1
}

function echo_arg() {
    local arg="${1:-}"

    [ -z "$arg" ] && return 1

    echo "$arg"
    return 0
}

function main() {
    always_succeeds
    always_fails || true
    return 0
}

(return 0 2>/dev/null) && sourced=1 || sourced=0
if [ "$sourced" -eq 0 ]; then
    main
    exit
fi
