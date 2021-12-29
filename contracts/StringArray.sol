//SPDX-License-Identifier: MIT

// This contract lets users push new messages to an array and fetch the array.

pragma solidity ^0.8.9;

contract StringArray {
    string[] public myArray;

    constructor() {
    }

    function push(string memory message) public {
        myArray.push(message);
    }

    function getArray() public view returns (string[] memory) {
        return myArray;
    }

}
