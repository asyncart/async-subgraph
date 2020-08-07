import { BigInt, log } from "@graphprotocol/graph-ts";
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
  UseControlTokenCall,
} from "../generated/Contract/Contract";
import {
  Platform,
  Account,
  SaleLog,
  BidLog,
  TransferLog,
  LayerUpdate,
  Master,
  Layer,
  Lever,
} from "../generated/schema";
import {
  TokenUpgraded
} from "../generated/V1Upgrader/V1Upgrader"
import { loadOrCreatePlatform } from "./factory";

export function handleApproval(event: Approval): void {}

export function handleApprovalForAll(event: ApprovalForAll): void {}

export function handleBidProposed(event: BidProposed): void {
  let tokenId = event.params.tokenId.toString();
  let master = Master.load(tokenId);

  let account = Account.load(event.params.bidder.toHexString());

  let i = 0;
  let bidId = "";
  let incrementBidId = true;
  while (incrementBidId == true) {
    let existingBidFromBidder = BidLog.load(
      event.params.bidder.toHexString() +
        "-" +
        event.params.tokenId.toString() +
        "-" +
        i.toString()
    );
    if (existingBidFromBidder == null) {
      bidId =
        event.params.bidder.toHexString() +
        "-" +
        event.params.tokenId.toString() +
        "-" +
        i.toString();
      incrementBidId = false;
    } else {
      i++;
    }
  }

  let bid = new BidLog(bidId);
  bid.timestamp = event.block.timestamp;
  bid.isWithdrawn = false;
  bid.wasSale = false;
  bid.amountInWei = event.params.bidAmount;

  if (account == null) {
    account = new Account(event.params.bidder.toHexString());
    account.isArtist = false;
    account.save();
  }

  bid.bidder = event.params.bidder.toHexString();
  if (master !== null) {
    bid.master = tokenId;
    bid.save();

    master.pastBids.push(bidId);
    if (master.highBid == null) {
      master.highBid = bidId;
    } else {
      let currentHighBidLog = BidLog.load(master.highBid);
      if (currentHighBidLog.amountInWei < bid.amountInWei) {
        master.highBid = bidId;
      }
    }
    master.save();
  } else {
    bid.layer = tokenId;
    bid.save();

    let layer = Layer.load(tokenId);
    layer.pastBids.push(bidId);

    if (layer.highBid == null) {
      layer.highBid = bidId;
    } else {
      let currentHighBidLog = BidLog.load(layer.highBid);
      if (currentHighBidLog.amountInWei < bid.amountInWei) {
        layer.highBid = bidId;
      }
    }
    layer.save();
  }
}

export function handleBidWithdrawn(event: BidWithdrawn): void {
  let i = 0;
  let incrementBidId = true;
  while (incrementBidId == true) {
    let existingBidFromBidder = BidLog.load(
      event.transaction.from.toHexString() +
        "-" +
        event.params.tokenId.toString() +
        "-" +
        i.toString()
    );
    if (existingBidFromBidder.isWithdrawn == false) {
      existingBidFromBidder.isWithdrawn = true;
      existingBidFromBidder.save();
      incrementBidId = false;
    } else {
      i++;
    }
  }
}

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

export function handleUseControlToken(call: UseControlTokenCall): void {
  let tokenId = call.inputs.controlTokenId.toString();
  let layer = Layer.load(tokenId);

  let layerUpdateCost = call.transaction.gasPrice.times(
    call.transaction.gasUsed
  );

  let layerUpdate = new LayerUpdate(call.transaction.hash.toHexString());
  layerUpdate.gasPrice = call.transaction.gasPrice;
  layerUpdate.gasUsed = call.transaction.gasUsed;
  layerUpdate.layer = layer.id;
  layerUpdate.costInWei = layerUpdateCost;
  layerUpdate.save();

  if (layer.averageUpdateCost.toString() == "0") {
    layer.averageUpdateCost = layerUpdateCost;
  } else {
    let allUpdateCosts = layer.allUpdates;
    // TODO: Fix bug where all updates cant be read
    let i = 0;
    let totalUpdateCost = BigInt.fromI32(0);
    while (i < allUpdateCosts.length) {
      let currentUpdate = LayerUpdate.load(allUpdateCosts.pop());
      totalUpdateCost = totalUpdateCost.plus(currentUpdate.costInWei);
      i++;
    }
    totalUpdateCost = totalUpdateCost.plus(layerUpdateCost);

    let averageUpdateCost = totalUpdateCost.div(
      BigInt.fromI32(allUpdateCosts.length + 1)
    );
    layer.averageUpdateCost = averageUpdateCost;
  }

  layer.save();
}

export function handleControlLeverUpdated(event: ControlLeverUpdated): void {
  let tokenId = event.params.tokenId.toString();
  let layer = Layer.load(tokenId);
  let master = Master.load(layer.master);


  let numUpdatedIds = event.params.leverIds.length;
  log.debug("Num updated ids {}", [numUpdatedIds.toString()]) ;
  let i = 0;
  while (i < numUpdatedIds) {
    let lever = Lever.load(
      "layer-" + tokenId + "-" + event.params.leverIds.pop().toString()
    );
    if (lever !== null) {
      lever.currentValue = event.params.updatedValues.pop();
      lever.save();
    } else {
      log.log(log.Level.DEBUG, "Cannot update null lever id");
    }
    i++;
  }
  let updateId =
    event.transaction.hash.toHexString() +
    "-" +
    event.block.timestamp.toString();

  layer.lastUpdate = updateId;
  master.lastUpdate = updateId;

  layer.numUpdates = layer.numUpdates + 1;
  master.numUpdates = master.numUpdates + 1;

  master.save();
  layer.save();
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

  let account = Account.load(call.from.toHexString());

  if (account == null) {
    account = new Account(call.from.toHexString());
  }

  account.isArtist = true;
  account.save();

  let layerCount = call.inputs.controlTokenArtists.length;
  log.debug("Layer count {}", [layerCount.toString()])

  let startId = call.inputs.artworkTokenId;

  log.debug("Start ID {}", [startId.toString()])

  let i = 0;
  let incrementor = BigInt.fromI32(1);
  while (i < layerCount) {
    let layerId = startId.plus(incrementor).toString();
    let layer = new Layer(layerId);

    layer.owner = call.from.toHexString();
    layer.creators = [call.from.toHexString()];
    layer.pastOwners = [call.from.toHexString()];
    layer.master = masterId;
    layer.numUpdates = 0;
    layer.save();
    incrementor = incrementor.plus(BigInt.fromI32(1));
    i++;
  }
  master.uri = call.inputs.artworkTokenURI.toString();
  master.creators = [call.from.toHexString()];
  master.uri = call.inputs.artworkTokenURI;
  master.owner = call.from.toHexString();
  master.numUpdates = 0;
  master.pastOwners = [call.from.toHexString()];
  master.layerCount = layerCount;
  master.save();
}

export function handleSetupControlToken(call: SetupControlTokenCall): void {
  let layerId = call.inputs.controlTokenId.toString();
  let layer = Layer.load(layerId);

  let numLevers = call.inputs.leverStartValues.length;

  log.debug("numLevers {}", [numLevers.toString()])

  let i = 0;
  while (i < numLevers) {
    log.debug("Start of loop {}", [i.toString()])
    let leverId = "layer-" + layerId + "-" + i.toString();
    let lever = new Lever(leverId);
    lever.minValue = call.inputs.leverMinValues.pop();
    lever.maxValue = call.inputs.leverMaxValues.pop();
    lever.currentValue = call.inputs.leverStartValues.pop();
    lever.layer = layerId;
    lever.save();
    i++;
    log.debug("End of loop {}", [i.toString()])
  }

  layer.uri = call.inputs.controlTokenURI.toString();
  layer.numLevers = call.inputs.leverStartValues.length;
  layer.save();
}

export function handleTokenSale(event: TokenSale): void {
  let tokenId = event.params.tokenId.toString();
  let master = Master.load(tokenId);

  let saleLog = new SaleLog(event.transaction.hash.toHexString());
  saleLog.timestamp = event.block.timestamp;
  saleLog.seller = event.transaction.from.toHexString();
  saleLog.buyer = event.transaction.to.toHexString();
  saleLog.tokenId = tokenId.toString();

  if (master !== null) {
    let acceptedBid = BidLog.load(master.highBid);
    saleLog.amountInWei = acceptedBid.amountInWei;
    saleLog.master = tokenId;
    saleLog.save();
    master.highBid = null;
    master.lastSale = event.transaction.hash.toHexString();
    master.save();
  } else {
    let layer = Layer.load(tokenId);
    let acceptedBid = BidLog.load(layer.highBid);
    saleLog.amountInWei = acceptedBid.amountInWei;
    saleLog.layer = tokenId;
    saleLog.save();
    layer.highBid = null;
    layer.lastSale = event.transaction.hash.toHexString();
    layer.save();
  }
}

export function handleTransfer(event: Transfer): void {
  let tokenId = event.params.tokenId.toString();
  let master = Master.load(tokenId);

  let toAccount = Account.load(event.params.to.toHexString());
  let fromAccount = Account.load(event.params.from.toHexString());

  if (toAccount == null) {
    toAccount = new Account(event.params.to.toHexString());
  }

  if (fromAccount == null) {
    fromAccount = new Account(event.params.from.toHexString());
  }

  let transferLog = new TransferLog(event.transaction.hash.toHexString());
  transferLog.timestamp = event.block.timestamp;
  transferLog.from = event.transaction.from.toHexString();
  transferLog.to = event.transaction.to.toHexString();
  transferLog.tokenId = tokenId.toString();

  if (master !== null) {
    transferLog.master = tokenId;
    transferLog.save();
  } else {
    transferLog.layer = tokenId;
    transferLog.save();
  }
}

export function handleTokenUpgraded(event: TokenUpgraded): void {

}
