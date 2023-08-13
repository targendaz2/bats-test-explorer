#!/usr/bin/env bats

@test "this test always passes" {
    # Given these 2 values
    value1='hello'
    value2='hello'

    # When they're compared
    [ "$value1" = "$value2" ]
    
    # Then they should be equal
}

@test "this test always fails" {
    # Given these 2 values
    value1='hello'
    value2='world'

    # When they're compared
    [ "$value1" = "$value2" ]
    
    # Then they should be equal
}
