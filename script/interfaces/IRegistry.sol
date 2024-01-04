// SPDX-License-Identifier: GPL-3.0-or-later
pragma solidity >=0.5.0 <0.9.0;

interface IRegistry {
  function setAddressFor(string calldata, address) external;

  function getAddressForOrDie(bytes32) external view returns (address);

  function getAddressFor(bytes32) external view returns (address);

  function getAddressForStringOrDie(string calldata identifier) external view returns (address);

  function getAddressForString(string calldata identifier) external view returns (address);

  function isOneOf(bytes32[] calldata, address) external view returns (bool);
}
