import { BigInt, log, Bytes } from "@graphprotocol/graph-ts";
import {
  Contract,
  Approval,
  ApprovalForAll,
  BidProposed,
  BidWithdrawn,
  BuyPriceSet,
  ControlLeverUpdated,
  PlatformAddressUpdated,
  RoyaltyAmountUpdated,
  TokenSale,
  Transfer,
  MintArtworkCall,
  SetupControlTokenCall,
} from "../generated/Contract/Contract";
import {
  Platform,
  Account,
  SaleLog,
  BidLog,
  TransferLog,
  Master,
  Layer,
  Lever,
} from "../generated/schema";
import { loadOrCreateAccount, loadOrCreatePlatform } from "./factory";

const GENESIS_ADDRESS = "0x0000000000000000000000000000000000000000";

export function handleApproval(event: Approval): void {}

export function handleApprovalForAll(event: ApprovalForAll): void {}

export function handleBidProposed(event: BidProposed): void {
  // TODO: Derive all bids from accounts and link to master/layer tokenId
  let tokenId = event.params.tokenId.toString();
  let master = Master.load(tokenId);

  let id = event.transaction.hash.toHexString();
  let bid = new BidLog(id);
  bid.timestamp = event.block.timestamp;
  bid.amountInWei = event.params.bidAmount;
  bid.isWithdrawn = false;
  bid.bidder = event.params.bidder;

  if (master !== null) {
    bid.master = tokenId;
    bid.save();
  } else {
    bid.layer = tokenId;
    bid.save();
  }
}

export function handleBidWithdrawn(event: BidWithdrawn): void {}

export function handleBuyPriceSet(event: BuyPriceSet): void {
  let id = event.params.tokenId.toString();
  let master = Master.load(id);

  if (master !== null) {
    master.buyNowPriceInWei = event.params.price;
    master.save();
  } else {
    let layer = Layer.load(id);
    layer.buyNowPriceInWei = event.params.price;
    layer.save();
  }
}

export function handleControlLeverUpdated(event: ControlLeverUpdated): void {
  // TODO implement layer control mapping if needed
}

export function handlePlatformAddressUpdated(
  event: PlatformAddressUpdated
): void {
  let platform = loadOrCreatePlatform(event.address);
  platform.address = event.params.platformAddress;
  platform.lastModifiedTimestamp = event.block.timestamp;
  platform.save();
}

export function handleRoyaltyAmountUpdated(event: RoyaltyAmountUpdated): void {
  let platform = loadOrCreatePlatform(event.address);
  platform.platformFirstSalePercentage = event.params.platformFirstPercentage;
  platform.platformSecondSalePercentage = event.params.platformSecondPercentage;
  platform.artistSecondSalePercentage = event.params.artistSecondPercentage;
  platform.lastModifiedTimestamp = event.block.timestamp;
  platform.save();
}

export function handleMintArtwork(call: MintArtworkCall): void {
  let masterId = call.inputs.artworkTokenId.toString();
  let master = new Master(masterId);

  let layerCount = call.inputs.controlTokenArtists.length;

  let startId = call.inputs.artworkTokenId;

  let i = 0;
  let incrementor = BigInt.fromI32(1);
  while (i < layerCount) {
    let layerId = startId.plus(incrementor).toString();
    let layer = new Layer(layerId);

    layer.owner = call.from;
    layer.creators = [call.from];
    layer.pastOwners = [call.from];
    layer.master = masterId;
    layer.save();
    incrementor = incrementor.plus(BigInt.fromI32(1));
    i++;
  }
  master.uri = call.inputs.artworkTokenURI.toString();
  master.creators = [call.from];
  master.uri = call.inputs.artworkTokenURI;
  master.owner = call.from;
  master.pastOwners = [call.from];
  master.layerCount = layerCount;
  master.save();
}

export function handleSetupControlToken(call: SetupControlTokenCall): void {
  let layerId = call.inputs.controlTokenId.toString();
  let layer = Layer.load(layerId);

  let numLevers = call.inputs.leverStartValues.length;

  let i = 0;
  while (i < numLevers) {
    let leverId = "layer-" + layerId + "-" + i.toString();
    let lever = new Lever(leverId);
    lever.minValue = call.inputs.leverMinValues.pop().toI32();
    lever.maxValue = call.inputs.leverMaxValues.pop().toI32();
    lever.currentValue = call.inputs.leverStartValues.pop().toI32();
    lever.layer = layerId;
    lever.save();
    i++;
  }

  layer.uri = call.inputs.controlTokenURI.toString();
  layer.numLevers = call.inputs.leverStartValues.length;
  layer.save();
}

export function handleTokenSale(event: TokenSale): void {
  let tokenId = event.params.tokenId.toString();
  let master = Master.load(tokenId);

  let transferLog = new TransferLog(event.transaction.hash.toHexString());
  transferLog.timestamp = event.block.timestamp;
  transferLog.from = event.transaction.from as Bytes;
  transferLog.to = event.transaction.to as Bytes;
  transferLog.tokenId = tokenId.toString();

  if (master !== null) {
    transferLog.master = tokenId;
    transferLog.save();
  } else {
    transferLog.layer = tokenId;
    transferLog.save();
  }
}

export function handleTransfer(event: Transfer): void {
  let tokenId = event.params.tokenId.toString();
  let master = Master.load(tokenId);

  let transferLog = new TransferLog(event.transaction.hash.toHexString());
  transferLog.timestamp = event.block.timestamp;
  transferLog.from = event.transaction.from as Bytes;
  transferLog.to = event.transaction.to as Bytes;
  transferLog.tokenId = tokenId.toString();

  if (master !== null) {
    transferLog.master = tokenId;
    transferLog.save();
  } else {
    transferLog.layer = tokenId;
    transferLog.save();
  }
}
