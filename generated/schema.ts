// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.

import {
  TypedMap,
  Entity,
  Value,
  ValueKind,
  store,
  Address,
  Bytes,
  BigInt,
  BigDecimal
} from "@graphprotocol/graph-ts";

export class Platform extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id !== null, "Cannot save Platform entity without an ID");
    assert(
      id.kind == ValueKind.STRING,
      "Cannot save Platform entity with non-string ID. " +
        'Considering using .toHex() to convert the "id" to a string.'
    );
    store.set("Platform", id.toString(), this);
  }

  static load(id: string): Platform | null {
    return store.get("Platform", id) as Platform | null;
  }

  get id(): string {
    let value = this.get("id");
    return value.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get address(): Bytes {
    let value = this.get("address");
    return value.toBytes();
  }

  set address(value: Bytes) {
    this.set("address", Value.fromBytes(value));
  }

  get totalSale(): BigInt | null {
    let value = this.get("totalSale");
    if (value === null) {
      return null;
    } else {
      return value.toBigInt();
    }
  }

  set totalSale(value: BigInt | null) {
    if (value === null) {
      this.unset("totalSale");
    } else {
      this.set("totalSale", Value.fromBigInt(value as BigInt));
    }
  }

  get totalSaleInWei(): BigInt | null {
    let value = this.get("totalSaleInWei");
    if (value === null) {
      return null;
    } else {
      return value.toBigInt();
    }
  }

  set totalSaleInWei(value: BigInt | null) {
    if (value === null) {
      this.unset("totalSaleInWei");
    } else {
      this.set("totalSaleInWei", Value.fromBigInt(value as BigInt));
    }
  }

  get platformFirstSalePercentage(): BigInt | null {
    let value = this.get("platformFirstSalePercentage");
    if (value === null) {
      return null;
    } else {
      return value.toBigInt();
    }
  }

  set platformFirstSalePercentage(value: BigInt | null) {
    if (value === null) {
      this.unset("platformFirstSalePercentage");
    } else {
      this.set(
        "platformFirstSalePercentage",
        Value.fromBigInt(value as BigInt)
      );
    }
  }

  get platformSecondSalePercentage(): BigInt | null {
    let value = this.get("platformSecondSalePercentage");
    if (value === null) {
      return null;
    } else {
      return value.toBigInt();
    }
  }

  set platformSecondSalePercentage(value: BigInt | null) {
    if (value === null) {
      this.unset("platformSecondSalePercentage");
    } else {
      this.set(
        "platformSecondSalePercentage",
        Value.fromBigInt(value as BigInt)
      );
    }
  }

  get artistSecondSalePercentage(): BigInt | null {
    let value = this.get("artistSecondSalePercentage");
    if (value === null) {
      return null;
    } else {
      return value.toBigInt();
    }
  }

  set artistSecondSalePercentage(value: BigInt | null) {
    if (value === null) {
      this.unset("artistSecondSalePercentage");
    } else {
      this.set("artistSecondSalePercentage", Value.fromBigInt(value as BigInt));
    }
  }

  get lastModifiedTimestamp(): BigInt | null {
    let value = this.get("lastModifiedTimestamp");
    if (value === null) {
      return null;
    } else {
      return value.toBigInt();
    }
  }

  set lastModifiedTimestamp(value: BigInt | null) {
    if (value === null) {
      this.unset("lastModifiedTimestamp");
    } else {
      this.set("lastModifiedTimestamp", Value.fromBigInt(value as BigInt));
    }
  }
}

export class Master extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id !== null, "Cannot save Master entity without an ID");
    assert(
      id.kind == ValueKind.STRING,
      "Cannot save Master entity with non-string ID. " +
        'Considering using .toHex() to convert the "id" to a string.'
    );
    store.set("Master", id.toString(), this);
  }

  static load(id: string): Master | null {
    return store.get("Master", id) as Master | null;
  }

  get id(): string {
    let value = this.get("id");
    return value.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get uri(): string {
    let value = this.get("uri");
    return value.toString();
  }

  set uri(value: string) {
    this.set("uri", Value.fromString(value));
  }

  get layerCount(): i32 {
    let value = this.get("layerCount");
    return value.toI32();
  }

  set layerCount(value: i32) {
    this.set("layerCount", Value.fromI32(value));
  }

  get layers(): Array<string> {
    let value = this.get("layers");
    return value.toStringArray();
  }

  set layers(value: Array<string>) {
    this.set("layers", Value.fromStringArray(value));
  }

  get creators(): Array<string> {
    let value = this.get("creators");
    return value.toStringArray();
  }

  set creators(value: Array<string>) {
    this.set("creators", Value.fromStringArray(value));
  }

  get owner(): string {
    let value = this.get("owner");
    return value.toString();
  }

  set owner(value: string) {
    this.set("owner", Value.fromString(value));
  }

  get pastOwners(): Array<string> {
    let value = this.get("pastOwners");
    return value.toStringArray();
  }

  set pastOwners(value: Array<string>) {
    this.set("pastOwners", Value.fromStringArray(value));
  }

  get highBid(): string | null {
    let value = this.get("highBid");
    if (value === null) {
      return null;
    } else {
      return value.toString();
    }
  }

  set highBid(value: string | null) {
    if (value === null) {
      this.unset("highBid");
    } else {
      this.set("highBid", Value.fromString(value as string));
    }
  }

  get pastBids(): Array<string> | null {
    let value = this.get("pastBids");
    if (value === null) {
      return null;
    } else {
      return value.toStringArray();
    }
  }

  set pastBids(value: Array<string> | null) {
    if (value === null) {
      this.unset("pastBids");
    } else {
      this.set("pastBids", Value.fromStringArray(value as Array<string>));
    }
  }

  get lastUpdate(): string | null {
    let value = this.get("lastUpdate");
    if (value === null) {
      return null;
    } else {
      return value.toString();
    }
  }

  set lastUpdate(value: string | null) {
    if (value === null) {
      this.unset("lastUpdate");
    } else {
      this.set("lastUpdate", Value.fromString(value as string));
    }
  }

  get numUpdates(): i32 {
    let value = this.get("numUpdates");
    return value.toI32();
  }

  set numUpdates(value: i32) {
    this.set("numUpdates", Value.fromI32(value));
  }

  get lastSale(): string | null {
    let value = this.get("lastSale");
    if (value === null) {
      return null;
    } else {
      return value.toString();
    }
  }

  set lastSale(value: string | null) {
    if (value === null) {
      this.unset("lastSale");
    } else {
      this.set("lastSale", Value.fromString(value as string));
    }
  }

  get pastSales(): Array<string> | null {
    let value = this.get("pastSales");
    if (value === null) {
      return null;
    } else {
      return value.toStringArray();
    }
  }

  set pastSales(value: Array<string> | null) {
    if (value === null) {
      this.unset("pastSales");
    } else {
      this.set("pastSales", Value.fromStringArray(value as Array<string>));
    }
  }

  get lastTransfer(): string | null {
    let value = this.get("lastTransfer");
    if (value === null) {
      return null;
    } else {
      return value.toString();
    }
  }

  set lastTransfer(value: string | null) {
    if (value === null) {
      this.unset("lastTransfer");
    } else {
      this.set("lastTransfer", Value.fromString(value as string));
    }
  }

  get pastTransfers(): Array<string> | null {
    let value = this.get("pastTransfers");
    if (value === null) {
      return null;
    } else {
      return value.toStringArray();
    }
  }

  set pastTransfers(value: Array<string> | null) {
    if (value === null) {
      this.unset("pastTransfers");
    } else {
      this.set("pastTransfers", Value.fromStringArray(value as Array<string>));
    }
  }

  get buyNowPriceInWei(): BigInt | null {
    let value = this.get("buyNowPriceInWei");
    if (value === null) {
      return null;
    } else {
      return value.toBigInt();
    }
  }

  set buyNowPriceInWei(value: BigInt | null) {
    if (value === null) {
      this.unset("buyNowPriceInWei");
    } else {
      this.set("buyNowPriceInWei", Value.fromBigInt(value as BigInt));
    }
  }
}

export class Layer extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id !== null, "Cannot save Layer entity without an ID");
    assert(
      id.kind == ValueKind.STRING,
      "Cannot save Layer entity with non-string ID. " +
        'Considering using .toHex() to convert the "id" to a string.'
    );
    store.set("Layer", id.toString(), this);
  }

  static load(id: string): Layer | null {
    return store.get("Layer", id) as Layer | null;
  }

  get id(): string {
    let value = this.get("id");
    return value.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get uri(): string | null {
    let value = this.get("uri");
    if (value === null) {
      return null;
    } else {
      return value.toString();
    }
  }

  set uri(value: string | null) {
    if (value === null) {
      this.unset("uri");
    } else {
      this.set("uri", Value.fromString(value as string));
    }
  }

  get numLevers(): i32 {
    let value = this.get("numLevers");
    return value.toI32();
  }

  set numLevers(value: i32) {
    this.set("numLevers", Value.fromI32(value));
  }

  get levers(): Array<string | null> {
    let value = this.get("levers");
    return value.toStringArray();
  }

  set levers(value: Array<string | null>) {
    this.set("levers", Value.fromStringArray(value));
  }

  get owner(): string {
    let value = this.get("owner");
    return value.toString();
  }

  set owner(value: string) {
    this.set("owner", Value.fromString(value));
  }

  get creators(): Array<string> {
    let value = this.get("creators");
    return value.toStringArray();
  }

  set creators(value: Array<string>) {
    this.set("creators", Value.fromStringArray(value));
  }

  get pastOwners(): Array<string> {
    let value = this.get("pastOwners");
    return value.toStringArray();
  }

  set pastOwners(value: Array<string>) {
    this.set("pastOwners", Value.fromStringArray(value));
  }

  get highBid(): string | null {
    let value = this.get("highBid");
    if (value === null) {
      return null;
    } else {
      return value.toString();
    }
  }

  set highBid(value: string | null) {
    if (value === null) {
      this.unset("highBid");
    } else {
      this.set("highBid", Value.fromString(value as string));
    }
  }

  get pastBids(): Array<string> | null {
    let value = this.get("pastBids");
    if (value === null) {
      return null;
    } else {
      return value.toStringArray();
    }
  }

  set pastBids(value: Array<string> | null) {
    if (value === null) {
      this.unset("pastBids");
    } else {
      this.set("pastBids", Value.fromStringArray(value as Array<string>));
    }
  }

  get lastUpdate(): string | null {
    let value = this.get("lastUpdate");
    if (value === null) {
      return null;
    } else {
      return value.toString();
    }
  }

  set lastUpdate(value: string | null) {
    if (value === null) {
      this.unset("lastUpdate");
    } else {
      this.set("lastUpdate", Value.fromString(value as string));
    }
  }

  get numUpdates(): i32 {
    let value = this.get("numUpdates");
    return value.toI32();
  }

  set numUpdates(value: i32) {
    this.set("numUpdates", Value.fromI32(value));
  }

  get allUpdates(): Array<string> | null {
    let value = this.get("allUpdates");
    if (value === null) {
      return null;
    } else {
      return value.toStringArray();
    }
  }

  set allUpdates(value: Array<string> | null) {
    if (value === null) {
      this.unset("allUpdates");
    } else {
      this.set("allUpdates", Value.fromStringArray(value as Array<string>));
    }
  }

  get averageUpdateCost(): BigInt | null {
    let value = this.get("averageUpdateCost");
    if (value === null) {
      return null;
    } else {
      return value.toBigInt();
    }
  }

  set averageUpdateCost(value: BigInt | null) {
    if (value === null) {
      this.unset("averageUpdateCost");
    } else {
      this.set("averageUpdateCost", Value.fromBigInt(value as BigInt));
    }
  }

  get lastSale(): string | null {
    let value = this.get("lastSale");
    if (value === null) {
      return null;
    } else {
      return value.toString();
    }
  }

  set lastSale(value: string | null) {
    if (value === null) {
      this.unset("lastSale");
    } else {
      this.set("lastSale", Value.fromString(value as string));
    }
  }

  get pastSales(): Array<string> | null {
    let value = this.get("pastSales");
    if (value === null) {
      return null;
    } else {
      return value.toStringArray();
    }
  }

  set pastSales(value: Array<string> | null) {
    if (value === null) {
      this.unset("pastSales");
    } else {
      this.set("pastSales", Value.fromStringArray(value as Array<string>));
    }
  }

  get lastTransfer(): string | null {
    let value = this.get("lastTransfer");
    if (value === null) {
      return null;
    } else {
      return value.toString();
    }
  }

  set lastTransfer(value: string | null) {
    if (value === null) {
      this.unset("lastTransfer");
    } else {
      this.set("lastTransfer", Value.fromString(value as string));
    }
  }

  get pastTransfers(): Array<string> | null {
    let value = this.get("pastTransfers");
    if (value === null) {
      return null;
    } else {
      return value.toStringArray();
    }
  }

  set pastTransfers(value: Array<string> | null) {
    if (value === null) {
      this.unset("pastTransfers");
    } else {
      this.set("pastTransfers", Value.fromStringArray(value as Array<string>));
    }
  }

  get buyNowPriceInWei(): BigInt | null {
    let value = this.get("buyNowPriceInWei");
    if (value === null) {
      return null;
    } else {
      return value.toBigInt();
    }
  }

  set buyNowPriceInWei(value: BigInt | null) {
    if (value === null) {
      this.unset("buyNowPriceInWei");
    } else {
      this.set("buyNowPriceInWei", Value.fromBigInt(value as BigInt));
    }
  }

  get master(): string | null {
    let value = this.get("master");
    if (value === null) {
      return null;
    } else {
      return value.toString();
    }
  }

  set master(value: string | null) {
    if (value === null) {
      this.unset("master");
    } else {
      this.set("master", Value.fromString(value as string));
    }
  }
}

export class LayerUpdate extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id !== null, "Cannot save LayerUpdate entity without an ID");
    assert(
      id.kind == ValueKind.STRING,
      "Cannot save LayerUpdate entity with non-string ID. " +
        'Considering using .toHex() to convert the "id" to a string.'
    );
    store.set("LayerUpdate", id.toString(), this);
  }

  static load(id: string): LayerUpdate | null {
    return store.get("LayerUpdate", id) as LayerUpdate | null;
  }

  get id(): string {
    let value = this.get("id");
    return value.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get gasPrice(): BigInt {
    let value = this.get("gasPrice");
    return value.toBigInt();
  }

  set gasPrice(value: BigInt) {
    this.set("gasPrice", Value.fromBigInt(value));
  }

  get gasUsed(): BigInt {
    let value = this.get("gasUsed");
    return value.toBigInt();
  }

  set gasUsed(value: BigInt) {
    this.set("gasUsed", Value.fromBigInt(value));
  }

  get costInWei(): BigInt {
    let value = this.get("costInWei");
    return value.toBigInt();
  }

  set costInWei(value: BigInt) {
    this.set("costInWei", Value.fromBigInt(value));
  }

  get layer(): string | null {
    let value = this.get("layer");
    if (value === null) {
      return null;
    } else {
      return value.toString();
    }
  }

  set layer(value: string | null) {
    if (value === null) {
      this.unset("layer");
    } else {
      this.set("layer", Value.fromString(value as string));
    }
  }
}

export class Lever extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id !== null, "Cannot save Lever entity without an ID");
    assert(
      id.kind == ValueKind.STRING,
      "Cannot save Lever entity with non-string ID. " +
        'Considering using .toHex() to convert the "id" to a string.'
    );
    store.set("Lever", id.toString(), this);
  }

  static load(id: string): Lever | null {
    return store.get("Lever", id) as Lever | null;
  }

  get id(): string {
    let value = this.get("id");
    return value.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get minValue(): i32 {
    let value = this.get("minValue");
    return value.toI32();
  }

  set minValue(value: i32) {
    this.set("minValue", Value.fromI32(value));
  }

  get maxValue(): i32 {
    let value = this.get("maxValue");
    return value.toI32();
  }

  set maxValue(value: i32) {
    this.set("maxValue", Value.fromI32(value));
  }

  get currentValue(): i32 {
    let value = this.get("currentValue");
    return value.toI32();
  }

  set currentValue(value: i32) {
    this.set("currentValue", Value.fromI32(value));
  }

  get layer(): string | null {
    let value = this.get("layer");
    if (value === null) {
      return null;
    } else {
      return value.toString();
    }
  }

  set layer(value: string | null) {
    if (value === null) {
      this.unset("layer");
    } else {
      this.set("layer", Value.fromString(value as string));
    }
  }
}

export class Account extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id !== null, "Cannot save Account entity without an ID");
    assert(
      id.kind == ValueKind.STRING,
      "Cannot save Account entity with non-string ID. " +
        'Considering using .toHex() to convert the "id" to a string.'
    );
    store.set("Account", id.toString(), this);
  }

  static load(id: string): Account | null {
    return store.get("Account", id) as Account | null;
  }

  get id(): string {
    let value = this.get("id");
    return value.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get isArtist(): boolean {
    let value = this.get("isArtist");
    return value.toBoolean();
  }

  set isArtist(value: boolean) {
    this.set("isArtist", Value.fromBoolean(value));
  }

  get bids(): Array<string> | null {
    let value = this.get("bids");
    if (value === null) {
      return null;
    } else {
      return value.toStringArray();
    }
  }

  set bids(value: Array<string> | null) {
    if (value === null) {
      this.unset("bids");
    } else {
      this.set("bids", Value.fromStringArray(value as Array<string>));
    }
  }

  get createdMasters(): Array<string> | null {
    let value = this.get("createdMasters");
    if (value === null) {
      return null;
    } else {
      return value.toStringArray();
    }
  }

  set createdMasters(value: Array<string> | null) {
    if (value === null) {
      this.unset("createdMasters");
    } else {
      this.set("createdMasters", Value.fromStringArray(value as Array<string>));
    }
  }

  get createdLayers(): Array<string> | null {
    let value = this.get("createdLayers");
    if (value === null) {
      return null;
    } else {
      return value.toStringArray();
    }
  }

  set createdLayers(value: Array<string> | null) {
    if (value === null) {
      this.unset("createdLayers");
    } else {
      this.set("createdLayers", Value.fromStringArray(value as Array<string>));
    }
  }

  get ownedMasters(): Array<string> | null {
    let value = this.get("ownedMasters");
    if (value === null) {
      return null;
    } else {
      return value.toStringArray();
    }
  }

  set ownedMasters(value: Array<string> | null) {
    if (value === null) {
      this.unset("ownedMasters");
    } else {
      this.set("ownedMasters", Value.fromStringArray(value as Array<string>));
    }
  }

  get ownedLayer(): Array<string> | null {
    let value = this.get("ownedLayer");
    if (value === null) {
      return null;
    } else {
      return value.toStringArray();
    }
  }

  set ownedLayer(value: Array<string> | null) {
    if (value === null) {
      this.unset("ownedLayer");
    } else {
      this.set("ownedLayer", Value.fromStringArray(value as Array<string>));
    }
  }
}

export class SaleLog extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id !== null, "Cannot save SaleLog entity without an ID");
    assert(
      id.kind == ValueKind.STRING,
      "Cannot save SaleLog entity with non-string ID. " +
        'Considering using .toHex() to convert the "id" to a string.'
    );
    store.set("SaleLog", id.toString(), this);
  }

  static load(id: string): SaleLog | null {
    return store.get("SaleLog", id) as SaleLog | null;
  }

  get id(): string {
    let value = this.get("id");
    return value.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get timestamp(): BigInt {
    let value = this.get("timestamp");
    return value.toBigInt();
  }

  set timestamp(value: BigInt) {
    this.set("timestamp", Value.fromBigInt(value));
  }

  get tokenId(): string {
    let value = this.get("tokenId");
    return value.toString();
  }

  set tokenId(value: string) {
    this.set("tokenId", Value.fromString(value));
  }

  get amountInWei(): BigInt {
    let value = this.get("amountInWei");
    return value.toBigInt();
  }

  set amountInWei(value: BigInt) {
    this.set("amountInWei", Value.fromBigInt(value));
  }

  get buyer(): string {
    let value = this.get("buyer");
    return value.toString();
  }

  set buyer(value: string) {
    this.set("buyer", Value.fromString(value));
  }

  get seller(): string {
    let value = this.get("seller");
    return value.toString();
  }

  set seller(value: string) {
    this.set("seller", Value.fromString(value));
  }

  get master(): string | null {
    let value = this.get("master");
    if (value === null) {
      return null;
    } else {
      return value.toString();
    }
  }

  set master(value: string | null) {
    if (value === null) {
      this.unset("master");
    } else {
      this.set("master", Value.fromString(value as string));
    }
  }

  get layer(): string | null {
    let value = this.get("layer");
    if (value === null) {
      return null;
    } else {
      return value.toString();
    }
  }

  set layer(value: string | null) {
    if (value === null) {
      this.unset("layer");
    } else {
      this.set("layer", Value.fromString(value as string));
    }
  }
}

export class BidLog extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id !== null, "Cannot save BidLog entity without an ID");
    assert(
      id.kind == ValueKind.STRING,
      "Cannot save BidLog entity with non-string ID. " +
        'Considering using .toHex() to convert the "id" to a string.'
    );
    store.set("BidLog", id.toString(), this);
  }

  static load(id: string): BidLog | null {
    return store.get("BidLog", id) as BidLog | null;
  }

  get id(): string {
    let value = this.get("id");
    return value.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get timestamp(): BigInt {
    let value = this.get("timestamp");
    return value.toBigInt();
  }

  set timestamp(value: BigInt) {
    this.set("timestamp", Value.fromBigInt(value));
  }

  get master(): string | null {
    let value = this.get("master");
    if (value === null) {
      return null;
    } else {
      return value.toString();
    }
  }

  set master(value: string | null) {
    if (value === null) {
      this.unset("master");
    } else {
      this.set("master", Value.fromString(value as string));
    }
  }

  get layer(): string | null {
    let value = this.get("layer");
    if (value === null) {
      return null;
    } else {
      return value.toString();
    }
  }

  set layer(value: string | null) {
    if (value === null) {
      this.unset("layer");
    } else {
      this.set("layer", Value.fromString(value as string));
    }
  }

  get amountInWei(): BigInt {
    let value = this.get("amountInWei");
    return value.toBigInt();
  }

  set amountInWei(value: BigInt) {
    this.set("amountInWei", Value.fromBigInt(value));
  }

  get bidder(): string {
    let value = this.get("bidder");
    return value.toString();
  }

  set bidder(value: string) {
    this.set("bidder", Value.fromString(value));
  }

  get isWithdrawn(): boolean {
    let value = this.get("isWithdrawn");
    return value.toBoolean();
  }

  set isWithdrawn(value: boolean) {
    this.set("isWithdrawn", Value.fromBoolean(value));
  }

  get wasSale(): boolean {
    let value = this.get("wasSale");
    return value.toBoolean();
  }

  set wasSale(value: boolean) {
    this.set("wasSale", Value.fromBoolean(value));
  }

  get withdrawnTimestamp(): BigInt | null {
    let value = this.get("withdrawnTimestamp");
    if (value === null) {
      return null;
    } else {
      return value.toBigInt();
    }
  }

  set withdrawnTimestamp(value: BigInt | null) {
    if (value === null) {
      this.unset("withdrawnTimestamp");
    } else {
      this.set("withdrawnTimestamp", Value.fromBigInt(value as BigInt));
    }
  }
}

export class TransferLog extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id !== null, "Cannot save TransferLog entity without an ID");
    assert(
      id.kind == ValueKind.STRING,
      "Cannot save TransferLog entity with non-string ID. " +
        'Considering using .toHex() to convert the "id" to a string.'
    );
    store.set("TransferLog", id.toString(), this);
  }

  static load(id: string): TransferLog | null {
    return store.get("TransferLog", id) as TransferLog | null;
  }

  get id(): string {
    let value = this.get("id");
    return value.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get timestamp(): BigInt {
    let value = this.get("timestamp");
    return value.toBigInt();
  }

  set timestamp(value: BigInt) {
    this.set("timestamp", Value.fromBigInt(value));
  }

  get tokenId(): string {
    let value = this.get("tokenId");
    return value.toString();
  }

  set tokenId(value: string) {
    this.set("tokenId", Value.fromString(value));
  }

  get from(): string {
    let value = this.get("from");
    return value.toString();
  }

  set from(value: string) {
    this.set("from", Value.fromString(value));
  }

  get to(): string {
    let value = this.get("to");
    return value.toString();
  }

  set to(value: string) {
    this.set("to", Value.fromString(value));
  }

  get master(): string | null {
    let value = this.get("master");
    if (value === null) {
      return null;
    } else {
      return value.toString();
    }
  }

  set master(value: string | null) {
    if (value === null) {
      this.unset("master");
    } else {
      this.set("master", Value.fromString(value as string));
    }
  }

  get layer(): string | null {
    let value = this.get("layer");
    if (value === null) {
      return null;
    } else {
      return value.toString();
    }
  }

  set layer(value: string | null) {
    if (value === null) {
      this.unset("layer");
    } else {
      this.set("layer", Value.fromString(value as string));
    }
  }
}
