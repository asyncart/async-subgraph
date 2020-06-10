import { Address, log } from "@graphprotocol/graph-ts";
import { Contract, Transfer } from "../generated/Contract/Contract";
import { Platform, Account } from "../generated/schema";

export function loadOrCreatePlatform(address: Address): Platform {
  let platform = Platform.load(address.toHex());

  if (platform == null) {
    platform = new Platform(address.toHex());
    platform.address = address;
  }

  return platform as Platform;
}

export function loadOrCreateAccount(address: Address): Account {
  let account = Account.load(address.toHex());

  // Create a new entry if it doesn't exist yet
  if (account == null) {
    account = new Account(address.toHex());
    account.address = address;
    account.isCreator = false;
  }

  return account as Account;
}
