#!/usr/bin/env bats

setup() {
    source 'src/bash_script.sh'
}

teardown() {
    :
}

@test "always_succeeds\(\) always succeeds" {
    # Given the always_succeeds() function

    # When that function is run
    run always_succeeds
    
    # Then it should succeed
    [ $status = 0 ]
}

@test "always_fails\(\) always fails" {
    # Given the always_fails() function

    # When that function is run
    run always_fails
    
    # Then it should fail
    [ $status = 1 ]
}
