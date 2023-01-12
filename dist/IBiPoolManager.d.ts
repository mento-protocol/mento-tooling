import type { BaseContract, BigNumber, BigNumberish, BytesLike, CallOverrides, ContractTransaction, Overrides, PopulatedTransaction, Signer, utils } from "ethers";
import type { FunctionFragment, Result, EventFragment } from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type { TypedEventFilter, TypedEvent, TypedListener, OnEvent, PromiseOrValue } from "./common";
export declare namespace FixidityLib {
    type FractionStruct = {
        value: PromiseOrValue<BigNumberish>;
    };
    type FractionStructOutput = [BigNumber] & {
        value: BigNumber;
    };
}
export declare namespace IBiPoolManager {
    type PoolConfigStruct = {
        spread: FixidityLib.FractionStruct;
        referenceRateFeedID: PromiseOrValue<string>;
        referenceRateResetFrequency: PromiseOrValue<BigNumberish>;
        minimumReports: PromiseOrValue<BigNumberish>;
        stablePoolResetSize: PromiseOrValue<BigNumberish>;
    };
    type PoolConfigStructOutput = [
        FixidityLib.FractionStructOutput,
        string,
        BigNumber,
        BigNumber,
        BigNumber
    ] & {
        spread: FixidityLib.FractionStructOutput;
        referenceRateFeedID: string;
        referenceRateResetFrequency: BigNumber;
        minimumReports: BigNumber;
        stablePoolResetSize: BigNumber;
    };
    type PoolExchangeStruct = {
        asset0: PromiseOrValue<string>;
        asset1: PromiseOrValue<string>;
        pricingModule: PromiseOrValue<string>;
        bucket0: PromiseOrValue<BigNumberish>;
        bucket1: PromiseOrValue<BigNumberish>;
        lastBucketUpdate: PromiseOrValue<BigNumberish>;
        config: IBiPoolManager.PoolConfigStruct;
    };
    type PoolExchangeStructOutput = [
        string,
        string,
        string,
        BigNumber,
        BigNumber,
        BigNumber,
        IBiPoolManager.PoolConfigStructOutput
    ] & {
        asset0: string;
        asset1: string;
        pricingModule: string;
        bucket0: BigNumber;
        bucket1: BigNumber;
        lastBucketUpdate: BigNumber;
        config: IBiPoolManager.PoolConfigStructOutput;
    };
}
export interface IBiPoolManagerInterface extends utils.Interface {
    functions: {
        "createExchange((address,address,address,uint256,uint256,uint256,((uint256),address,uint256,uint256,uint256)))": FunctionFragment;
        "destroyExchange(bytes32,uint256)": FunctionFragment;
        "getExchangeIds()": FunctionFragment;
        "getPoolExchange(bytes32)": FunctionFragment;
    };
    getFunction(nameOrSignatureOrTopic: "createExchange" | "destroyExchange" | "getExchangeIds" | "getPoolExchange"): FunctionFragment;
    encodeFunctionData(functionFragment: "createExchange", values: [IBiPoolManager.PoolExchangeStruct]): string;
    encodeFunctionData(functionFragment: "destroyExchange", values: [PromiseOrValue<BytesLike>, PromiseOrValue<BigNumberish>]): string;
    encodeFunctionData(functionFragment: "getExchangeIds", values?: undefined): string;
    encodeFunctionData(functionFragment: "getPoolExchange", values: [PromiseOrValue<BytesLike>]): string;
    decodeFunctionResult(functionFragment: "createExchange", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "destroyExchange", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getExchangeIds", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getPoolExchange", data: BytesLike): Result;
    events: {
        "BreakerBoxUpdated(address)": EventFragment;
        "BrokerUpdated(address)": EventFragment;
        "BucketsUpdated(bytes32,uint256,uint256)": EventFragment;
        "ExchangeCreated(bytes32,address,address,address)": EventFragment;
        "ExchangeDestroyed(bytes32,address,address,address)": EventFragment;
        "ReserveUpdated(address)": EventFragment;
        "SortedOraclesUpdated(address)": EventFragment;
    };
    getEvent(nameOrSignatureOrTopic: "BreakerBoxUpdated"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "BrokerUpdated"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "BucketsUpdated"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "ExchangeCreated"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "ExchangeDestroyed"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "ReserveUpdated"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "SortedOraclesUpdated"): EventFragment;
}
export interface BreakerBoxUpdatedEventObject {
    newBreakerBox: string;
}
export type BreakerBoxUpdatedEvent = TypedEvent<[
    string
], BreakerBoxUpdatedEventObject>;
export type BreakerBoxUpdatedEventFilter = TypedEventFilter<BreakerBoxUpdatedEvent>;
export interface BrokerUpdatedEventObject {
    newBroker: string;
}
export type BrokerUpdatedEvent = TypedEvent<[string], BrokerUpdatedEventObject>;
export type BrokerUpdatedEventFilter = TypedEventFilter<BrokerUpdatedEvent>;
export interface BucketsUpdatedEventObject {
    exchangeId: string;
    bucket0: BigNumber;
    bucket1: BigNumber;
}
export type BucketsUpdatedEvent = TypedEvent<[
    string,
    BigNumber,
    BigNumber
], BucketsUpdatedEventObject>;
export type BucketsUpdatedEventFilter = TypedEventFilter<BucketsUpdatedEvent>;
export interface ExchangeCreatedEventObject {
    exchangeId: string;
    asset0: string;
    asset1: string;
    pricingModule: string;
}
export type ExchangeCreatedEvent = TypedEvent<[
    string,
    string,
    string,
    string
], ExchangeCreatedEventObject>;
export type ExchangeCreatedEventFilter = TypedEventFilter<ExchangeCreatedEvent>;
export interface ExchangeDestroyedEventObject {
    exchangeId: string;
    asset0: string;
    asset1: string;
    pricingModule: string;
}
export type ExchangeDestroyedEvent = TypedEvent<[
    string,
    string,
    string,
    string
], ExchangeDestroyedEventObject>;
export type ExchangeDestroyedEventFilter = TypedEventFilter<ExchangeDestroyedEvent>;
export interface ReserveUpdatedEventObject {
    newReserve: string;
}
export type ReserveUpdatedEvent = TypedEvent<[
    string
], ReserveUpdatedEventObject>;
export type ReserveUpdatedEventFilter = TypedEventFilter<ReserveUpdatedEvent>;
export interface SortedOraclesUpdatedEventObject {
    newSortedOracles: string;
}
export type SortedOraclesUpdatedEvent = TypedEvent<[
    string
], SortedOraclesUpdatedEventObject>;
export type SortedOraclesUpdatedEventFilter = TypedEventFilter<SortedOraclesUpdatedEvent>;
export interface IBiPoolManager extends BaseContract {
    connect(signerOrProvider: Signer | Provider | string): this;
    attach(addressOrName: string): this;
    deployed(): Promise<this>;
    interface: IBiPoolManagerInterface;
    queryFilter<TEvent extends TypedEvent>(event: TypedEventFilter<TEvent>, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TEvent>>;
    listeners<TEvent extends TypedEvent>(eventFilter?: TypedEventFilter<TEvent>): Array<TypedListener<TEvent>>;
    listeners(eventName?: string): Array<Listener>;
    removeAllListeners<TEvent extends TypedEvent>(eventFilter: TypedEventFilter<TEvent>): this;
    removeAllListeners(eventName?: string): this;
    off: OnEvent<this>;
    on: OnEvent<this>;
    once: OnEvent<this>;
    removeListener: OnEvent<this>;
    functions: {
        createExchange(exchange: IBiPoolManager.PoolExchangeStruct, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        destroyExchange(exchangeId: PromiseOrValue<BytesLike>, exchangeIdIndex: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        getExchangeIds(overrides?: CallOverrides): Promise<[string[]] & {
            exchangeIds: string[];
        }>;
        getPoolExchange(exchangeId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<[
            IBiPoolManager.PoolExchangeStructOutput
        ] & {
            exchange: IBiPoolManager.PoolExchangeStructOutput;
        }>;
    };
    createExchange(exchange: IBiPoolManager.PoolExchangeStruct, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    destroyExchange(exchangeId: PromiseOrValue<BytesLike>, exchangeIdIndex: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    getExchangeIds(overrides?: CallOverrides): Promise<string[]>;
    getPoolExchange(exchangeId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<IBiPoolManager.PoolExchangeStructOutput>;
    callStatic: {
        createExchange(exchange: IBiPoolManager.PoolExchangeStruct, overrides?: CallOverrides): Promise<string>;
        destroyExchange(exchangeId: PromiseOrValue<BytesLike>, exchangeIdIndex: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<boolean>;
        getExchangeIds(overrides?: CallOverrides): Promise<string[]>;
        getPoolExchange(exchangeId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<IBiPoolManager.PoolExchangeStructOutput>;
    };
    filters: {
        "BreakerBoxUpdated(address)"(newBreakerBox?: null): BreakerBoxUpdatedEventFilter;
        BreakerBoxUpdated(newBreakerBox?: null): BreakerBoxUpdatedEventFilter;
        "BrokerUpdated(address)"(newBroker?: PromiseOrValue<string> | null): BrokerUpdatedEventFilter;
        BrokerUpdated(newBroker?: PromiseOrValue<string> | null): BrokerUpdatedEventFilter;
        "BucketsUpdated(bytes32,uint256,uint256)"(exchangeId?: PromiseOrValue<BytesLike> | null, bucket0?: null, bucket1?: null): BucketsUpdatedEventFilter;
        BucketsUpdated(exchangeId?: PromiseOrValue<BytesLike> | null, bucket0?: null, bucket1?: null): BucketsUpdatedEventFilter;
        "ExchangeCreated(bytes32,address,address,address)"(exchangeId?: PromiseOrValue<BytesLike> | null, asset0?: PromiseOrValue<string> | null, asset1?: PromiseOrValue<string> | null, pricingModule?: null): ExchangeCreatedEventFilter;
        ExchangeCreated(exchangeId?: PromiseOrValue<BytesLike> | null, asset0?: PromiseOrValue<string> | null, asset1?: PromiseOrValue<string> | null, pricingModule?: null): ExchangeCreatedEventFilter;
        "ExchangeDestroyed(bytes32,address,address,address)"(exchangeId?: PromiseOrValue<BytesLike> | null, asset0?: PromiseOrValue<string> | null, asset1?: PromiseOrValue<string> | null, pricingModule?: null): ExchangeDestroyedEventFilter;
        ExchangeDestroyed(exchangeId?: PromiseOrValue<BytesLike> | null, asset0?: PromiseOrValue<string> | null, asset1?: PromiseOrValue<string> | null, pricingModule?: null): ExchangeDestroyedEventFilter;
        "ReserveUpdated(address)"(newReserve?: PromiseOrValue<string> | null): ReserveUpdatedEventFilter;
        ReserveUpdated(newReserve?: PromiseOrValue<string> | null): ReserveUpdatedEventFilter;
        "SortedOraclesUpdated(address)"(newSortedOracles?: PromiseOrValue<string> | null): SortedOraclesUpdatedEventFilter;
        SortedOraclesUpdated(newSortedOracles?: PromiseOrValue<string> | null): SortedOraclesUpdatedEventFilter;
    };
    estimateGas: {
        createExchange(exchange: IBiPoolManager.PoolExchangeStruct, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        destroyExchange(exchangeId: PromiseOrValue<BytesLike>, exchangeIdIndex: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        getExchangeIds(overrides?: CallOverrides): Promise<BigNumber>;
        getPoolExchange(exchangeId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<BigNumber>;
    };
    populateTransaction: {
        createExchange(exchange: IBiPoolManager.PoolExchangeStruct, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        destroyExchange(exchangeId: PromiseOrValue<BytesLike>, exchangeIdIndex: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        getExchangeIds(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        getPoolExchange(exchangeId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
    };
}
