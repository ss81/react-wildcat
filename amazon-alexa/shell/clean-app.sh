#!/bin/bash

set -u

# Remove existing modules / packages
(
    # Remove node modules
    rm -fr node_modules;
    rm -f yarn.lock;
)
