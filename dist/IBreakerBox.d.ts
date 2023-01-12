import type { BaseContract, BigNumber, BytesLike, CallOverrides, ContractTransaction, Overrides, PopulatedTransaction, Signer, utils } from "ethers";
import type { FunctionFragment, Result, EventFragment } from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type { TypedEventFilter, TypedEvent, TypedListener, OnEvent, PromiseOrValue } from "./common";
export interface IBreakerBoxInterface extends utils.Interface {
    functions: {
        "checkAndSetBreakers(address)": FunctionFragment;
        "getBreakers()": FunctionFragment;
        "getRateFeedTradingMode(address)": FunctionFragment;
        "isBreaker(address)": FunctionFragment;
    };
    getFunction(nameOrSignatureOrTopic: "checkAndSetBreakers" | "getBreakers" | "getRateFeedTradingMode" | "isBreaker"): FunctionFragment;
    encodeFunctionData(functionFragment: "checkAndSetBreakers", values: [PromiseOrValue<string>]): string;
    encodeFunctionData(functionFragment: "getBreakers", values?: undefined): string;
    encodeFunctionData(functionFragment: "getRateFeedTradingMode", values: [PromiseOrValue<string>]): string;
    encodeFunctionData(functionFragment: "isBreaker", values: [PromiseOrValue<string>]): string;
    decodeFunctionResult(functionFragment: "checkAndSetBreakers", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getBreakers", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getRateFeedTradingMode", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "isBreaker", data: BytesLike): Result;
    events: {
        "BreakerAdded(address)": EventFragment;
        "BreakerRemoved(address)": EventFragment;
        "BreakerStatusUpdated(address,address,bool)": EventFragment;
        "BreakerTripped(address,address)": EventFragment;
        "RateFeedAdded(address)": EventFragment;
        "RateFeedRemoved(address)": EventFragment;
        "ResetAttemptCriteriaFail(address,address)": EventFragment;
        "ResetAttemptNotCool(address,address)": EventFragment;
        "ResetSuccessful(address,address)": EventFragment;
        "SortedOraclesUpdated(address)": EventFragment;
        "TradingModeUpdated(address,uint256)": EventFragment;
    };
    getEvent(nameOrSignatureOrTopic: "BreakerAdded"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "BreakerRemoved"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "BreakerStatusUpdated"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "BreakerTripped"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "RateFeedAdded"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "RateFeedRemoved"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "ResetAttemptCriteriaFail"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "ResetAttemptNotCool"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "ResetSuccessful"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "SortedOraclesUpdated"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "TradingModeUpdated"): EventFragment;
}
export interface BreakerAddedEventObject {
    breaker: string;
}
export type BreakerAddedEvent = TypedEvent<[string], BreakerAddedEventObject>;
export type BreakerAddedEventFilter = TypedEventFilter<BreakerAddedEvent>;
export interface BreakerRemovedEventObject {
    breaker: string;
}
export type BreakerRemovedEvent = TypedEvent<[
    string
], BreakerRemovedEventObject>;
export type BreakerRemovedEventFilter = TypedEventFilter<BreakerRemovedEvent>;
export interface BreakerStatusUpdatedEventObject {
    breaker: string;
    rateFeedID: string;
    status: boolean;
}
export type BreakerStatusUpdatedEvent = TypedEvent<[
    string,
    string,
    boolean
], BreakerStatusUpdatedEventObject>;
export type BreakerStatusUpdatedEventFilter = TypedEventFilter<BreakerStatusUpdatedEvent>;
export interface BreakerTrippedEventObject {
    breaker: string;
    rateFeedID: string;
}
export type BreakerTrippedEvent = TypedEvent<[
    string,
    string
], BreakerTrippedEventObject>;
export type BreakerTrippedEventFilter = TypedEventFilter<BreakerTrippedEvent>;
export interface RateFeedAddedEventObject {
    rateFeedID: string;
}
export type RateFeedAddedEvent = TypedEvent<[string], RateFeedAddedEventObject>;
export type RateFeedAddedEventFilter = TypedEventFilter<RateFeedAddedEvent>;
export interface RateFeedRemovedEventObject {
    rateFeedID: string;
}
export type RateFeedRemovedEvent = TypedEvent<[
    string
], RateFeedRemovedEventObject>;
export type RateFeedRemovedEventFilter = TypedEventFilter<RateFeedRemovedEvent>;
export interface ResetAttemptCriteriaFailEventObject {
    rateFeedID: string;
    breaker: string;
}
export type ResetAttemptCriteriaFailEvent = TypedEvent<[
    string,
    string
], ResetAttemptCriteriaFailEventObject>;
export type ResetAttemptCriteriaFailEventFilter = TypedEventFilter<ResetAttemptCriteriaFailEvent>;
export interface ResetAttemptNotCoolEventObject {
    rateFeedID: string;
    breaker: string;
}
export type ResetAttemptNotCoolEvent = TypedEvent<[
    string,
    string
], ResetAttemptNotCoolEventObject>;
export type ResetAttemptNotCoolEventFilter = TypedEventFilter<ResetAttemptNotCoolEvent>;
export interface ResetSuccessfulEventObject {
    rateFeedID: string;
    breaker: string;
}
export type ResetSuccessfulEvent = TypedEvent<[
    string,
    string
], ResetSuccessfulEventObject>;
export type ResetSuccessfulEventFilter = TypedEventFilter<ResetSuccessfulEvent>;
export interface SortedOraclesUpdatedEventObject {
    newSortedOracles: string;
}
export type SortedOraclesUpdatedEvent = TypedEvent<[
    string
], SortedOraclesUpdatedEventObject>;
export type SortedOraclesUpdatedEventFilter = TypedEventFilter<SortedOraclesUpdatedEvent>;
export interface TradingModeUpdatedEventObject {
    rateFeedID: string;
    tradingMode: BigNumber;
}
export type TradingModeUpdatedEvent = TypedEvent<[
    string,
    BigNumber
], TradingModeUpdatedEventObject>;
export type TradingModeUpdatedEventFilter = TypedEventFilter<TradingModeUpdatedEvent>;
export interface IBreakerBox extends BaseContract {
    connect(signerOrProvider: Signer | Provider | string): this;
    attach(addressOrName: string): this;
    deployed(): Promise<this>;
    interface: IBreakerBoxInterface;
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
        checkAndSetBreakers(rateFeedID: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        getBreakers(overrides?: CallOverrides): Promise<[string[]]>;
        getRateFeedTradingMode(rateFeedID: PromiseOrValue<string>, overrides?: CallOverrides): Promise<[BigNumber] & {
            tradingMode: BigNumber;
        }>;
        isBreaker(breaker: PromiseOrValue<string>, overrides?: CallOverrides): Promise<[boolean]>;
    };
    checkAndSetBreakers(rateFeedID: PromiseOrValue<string>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    getBreakers(overrides?: CallOverrides): Promise<string[]>;
    getRateFeedTradingMode(rateFeedID: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;
    isBreaker(breaker: PromiseOrValue<string>, overrides?: CallOverrides): Promise<boolean>;
    callStatic: {
        checkAndSetBreakers(rateFeedID: PromiseOrValue<string>, overrides?: CallOverrides): Promise<void>;
        getBreakers(overrides?: CallOverrides): Promise<string[]>;
        getRateFeedTradingMode(rateFeedID: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;
        isBreaker(breaker: PromiseOrValue<string>, overrides?: CallOverrides): Promise<boolean>;
    };
    filters: {
        "BreakerAdded(address)"(breaker?: PromiseOrValue<string> | null): BreakerAddedEventFilter;
        BreakerAdded(breaker?: PromiseOrValue<string> | null): BreakerAddedEventFilter;
        "BreakerRemoved(address)"(breaker?: PromiseOrValue<string> | null): BreakerRemovedEventFilter;
        BreakerRemoved(breaker?: PromiseOrValue<string> | null): BreakerRemovedEventFilter;
        "BreakerStatusUpdated(address,address,bool)"(breaker?: null, rateFeedID?: null, status?: null): BreakerStatusUpdatedEventFilter;
        BreakerStatusUpdated(breaker?: null, rateFeedID?: null, status?: null): BreakerStatusUpdatedEventFilter;
        "BreakerTripped(address,address)"(breaker?: PromiseOrValue<string> | null, rateFeedID?: PromiseOrValue<string> | null): BreakerTrippedEventFilter;
        BreakerTripped(breaker?: PromiseOrValue<string> | null, rateFeedID?: PromiseOrValue<string> | null): BreakerTrippedEventFilter;
        "RateFeedAdded(address)"(rateFeedID?: PromiseOrValue<string> | null): RateFeedAddedEventFilter;
        RateFeedAdded(rateFeedID?: PromiseOrValue<string> | null): RateFeedAddedEventFilter;
        "RateFeedRemoved(address)"(rateFeedID?: PromiseOrValue<string> | null): RateFeedRemovedEventFilter;
        RateFeedRemoved(rateFeedID?: PromiseOrValue<string> | null): RateFeedRemovedEventFilter;
        "ResetAttemptCriteriaFail(address,address)"(rateFeedID?: PromiseOrValue<string> | null, breaker?: PromiseOrValue<string> | null): ResetAttemptCriteriaFailEventFilter;
        ResetAttemptCriteriaFail(rateFeedID?: PromiseOrValue<string> | null, breaker?: PromiseOrValue<string> | null): ResetAttemptCriteriaFailEventFilter;
        "ResetAttemptNotCool(address,address)"(rateFeedID?: PromiseOrValue<string> | null, breaker?: PromiseOrValue<string> | null): ResetAttemptNotCoolEventFilter;
        ResetAttemptNotCool(rateFeedID?: PromiseOrValue<string> | null, breaker?: PromiseOrValue<string> | null): ResetAttemptNotCoolEventFilter;
        "ResetSuccessful(address,address)"(rateFeedID?: PromiseOrValue<string> | null, breaker?: PromiseOrValue<string> | null): ResetSuccessfulEventFilter;
        ResetSuccessful(rateFeedID?: PromiseOrValue<string> | null, breaker?: PromiseOrValue<string> | null): ResetSuccessfulEventFilter;
        "SortedOraclesUpdated(address)"(newSortedOracles?: PromiseOrValue<string> | null): SortedOraclesUpdatedEventFilter;
        SortedOraclesUpdated(newSortedOracles?: PromiseOrValue<string> | null): SortedOraclesUpdatedEventFilter;
        "TradingModeUpdated(address,uint256)"(rateFeedID?: PromiseOrValue<string> | null, tradingMode?: null): TradingModeUpdatedEventFilter;
        TradingModeUpdated(rateFeedID?: PromiseOrValue<string> | null, tradingMode?: null): TradingModeUpdatedEventFilter;
    };
    estimateGas: {
        checkAndSetBreakers(rateFeedID: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        getBreakers(overrides?: CallOverrides): Promise<BigNumber>;
        getRateFeedTradingMode(rateFeedID: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;
        isBreaker(breaker: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;
    };
    populateTransaction: {
        checkAndSetBreakers(rateFeedID: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        getBreakers(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        getRateFeedTradingMode(rateFeedID: PromiseOrValue<string>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        isBreaker(breaker: PromiseOrValue<string>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
    };
}
