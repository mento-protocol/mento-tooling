import type { BaseContract, BigNumber, BigNumberish, BytesLike, CallOverrides, ContractTransaction, Overrides, PopulatedTransaction, Signer, utils } from "ethers";
import type { FunctionFragment, Result, EventFragment } from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type { TypedEventFilter, TypedEvent, TypedListener, OnEvent, PromiseOrValue } from "./common";
export interface IBrokerAdminInterface extends utils.Interface {
    functions: {
        "addExchangeProvider(address)": FunctionFragment;
        "removeExchangeProvider(address,uint256)": FunctionFragment;
        "setReserve(address)": FunctionFragment;
    };
    getFunction(nameOrSignatureOrTopic: "addExchangeProvider" | "removeExchangeProvider" | "setReserve"): FunctionFragment;
    encodeFunctionData(functionFragment: "addExchangeProvider", values: [PromiseOrValue<string>]): string;
    encodeFunctionData(functionFragment: "removeExchangeProvider", values: [PromiseOrValue<string>, PromiseOrValue<BigNumberish>]): string;
    encodeFunctionData(functionFragment: "setReserve", values: [PromiseOrValue<string>]): string;
    decodeFunctionResult(functionFragment: "addExchangeProvider", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "removeExchangeProvider", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "setReserve", data: BytesLike): Result;
    events: {
        "ExchangeProviderAdded(address)": EventFragment;
        "ExchangeProviderRemoved(address)": EventFragment;
        "ReserveSet(address,address)": EventFragment;
    };
    getEvent(nameOrSignatureOrTopic: "ExchangeProviderAdded"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "ExchangeProviderRemoved"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "ReserveSet"): EventFragment;
}
export interface ExchangeProviderAddedEventObject {
    exchangeProvider: string;
}
export type ExchangeProviderAddedEvent = TypedEvent<[
    string
], ExchangeProviderAddedEventObject>;
export type ExchangeProviderAddedEventFilter = TypedEventFilter<ExchangeProviderAddedEvent>;
export interface ExchangeProviderRemovedEventObject {
    exchangeProvider: string;
}
export type ExchangeProviderRemovedEvent = TypedEvent<[
    string
], ExchangeProviderRemovedEventObject>;
export type ExchangeProviderRemovedEventFilter = TypedEventFilter<ExchangeProviderRemovedEvent>;
export interface ReserveSetEventObject {
    newAddress: string;
    prevAddress: string;
}
export type ReserveSetEvent = TypedEvent<[
    string,
    string
], ReserveSetEventObject>;
export type ReserveSetEventFilter = TypedEventFilter<ReserveSetEvent>;
export interface IBrokerAdmin extends BaseContract {
    connect(signerOrProvider: Signer | Provider | string): this;
    attach(addressOrName: string): this;
    deployed(): Promise<this>;
    interface: IBrokerAdminInterface;
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
        addExchangeProvider(exchangeProvider: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        removeExchangeProvider(exchangeProvider: PromiseOrValue<string>, index: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        setReserve(reserve: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
    };
    addExchangeProvider(exchangeProvider: PromiseOrValue<string>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    removeExchangeProvider(exchangeProvider: PromiseOrValue<string>, index: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    setReserve(reserve: PromiseOrValue<string>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    callStatic: {
        addExchangeProvider(exchangeProvider: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;
        removeExchangeProvider(exchangeProvider: PromiseOrValue<string>, index: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<void>;
        setReserve(reserve: PromiseOrValue<string>, overrides?: CallOverrides): Promise<void>;
    };
    filters: {
        "ExchangeProviderAdded(address)"(exchangeProvider?: PromiseOrValue<string> | null): ExchangeProviderAddedEventFilter;
        ExchangeProviderAdded(exchangeProvider?: PromiseOrValue<string> | null): ExchangeProviderAddedEventFilter;
        "ExchangeProviderRemoved(address)"(exchangeProvider?: PromiseOrValue<string> | null): ExchangeProviderRemovedEventFilter;
        ExchangeProviderRemoved(exchangeProvider?: PromiseOrValue<string> | null): ExchangeProviderRemovedEventFilter;
        "ReserveSet(address,address)"(newAddress?: PromiseOrValue<string> | null, prevAddress?: PromiseOrValue<string> | null): ReserveSetEventFilter;
        ReserveSet(newAddress?: PromiseOrValue<string> | null, prevAddress?: PromiseOrValue<string> | null): ReserveSetEventFilter;
    };
    estimateGas: {
        addExchangeProvider(exchangeProvider: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        removeExchangeProvider(exchangeProvider: PromiseOrValue<string>, index: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        setReserve(reserve: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
    };
    populateTransaction: {
        addExchangeProvider(exchangeProvider: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        removeExchangeProvider(exchangeProvider: PromiseOrValue<string>, index: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        setReserve(reserve: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
    };
}
