#!/bin/bash
HERE=$( dirname "${BASH_SOURCE[0]}" )

# Build main runtime
cd $HERE/packages/runtime
bun run build || {
	echo "Error: Failed to build runtime"
}

# Copy runtime files to paclet package
cp -r $HERE/packages/runtime/dist/* $HERE/packages/paclet/Resources/runtime || {
	echo "Error: Failed to copy runtime files to paclet package"
}

# Build Paclet
cd $HERE/packages/paclet
bun run build || {
	echo "Error: Failed to build paclet"
}

cp -r $HERE/packages/paclet/build/* $HERE/../build/Paclet || {
	echo "Error: Failed to copy paclet files to dist"
}
