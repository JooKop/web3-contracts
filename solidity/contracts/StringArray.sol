//SPDX-License-Identifier: MIT

pragma solidity ^0.8.9;

contract StringArray {
    string[] public myArray;

    constructor() {
    }

    function push() public {
        myArray.push("Hi!");
    }

    function getArray() public view returns (string[] memory) {
        return myArray;
    }

}
