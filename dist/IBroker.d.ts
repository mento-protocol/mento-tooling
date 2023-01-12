import type { BaseContract, BigNumber, BigNumberish, BytesLike, CallOverrides, ContractTransaction, Overrides, PopulatedTransaction, Signer, utils } from "ethers";
import type { FunctionFragment, Result, EventFragment } from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type { TypedEventFilter, TypedEvent, TypedListener, OnEvent, PromiseOrValue } from "./common";
export interface IBrokerInterface extends utils.Interface {
    functions: {
        "getAmountIn(address,bytes32,address,address,uint256)": FunctionFragment;
        "getAmountOut(address,bytes32,address,address,uint256)": FunctionFragment;
        "getExchangeProviders()": FunctionFragment;
        "swapIn(address,bytes32,address,address,uint256,uint256)": FunctionFragment;
        "swapOut(address,bytes32,address,address,uint256,uint256)": FunctionFragment;
    };
    getFunction(nameOrSignatureOrTopic: "getAmountIn" | "getAmountOut" | "getExchangeProviders" | "swapIn" | "swapOut"): FunctionFragment;
    encodeFunctionData(functionFragment: "getAmountIn", values: [
        PromiseOrValue<string>,
        PromiseOrValue<BytesLike>,
        PromiseOrValue<string>,
        PromiseOrValue<string>,
        PromiseOrValue<BigNumberish>
    ]): string;
    encodeFunctionData(functionFragment: "getAmountOut", values: [
        PromiseOrValue<string>,
        PromiseOrValue<BytesLike>,
        PromiseOrValue<string>,
        PromiseOrValue<string>,
        PromiseOrValue<BigNumberish>
    ]): string;
    encodeFunctionData(functionFragment: "getExchangeProviders", values?: undefined): string;
    encodeFunctionData(functionFragment: "swapIn", values: [
        PromiseOrValue<string>,
        PromiseOrValue<BytesLike>,
        PromiseOrValue<string>,
        PromiseOrValue<string>,
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<BigNumberish>
    ]): string;
    encodeFunctionData(functionFragment: "swapOut", values: [
        PromiseOrValue<string>,
        PromiseOrValue<BytesLike>,
        PromiseOrValue<string>,
        PromiseOrValue<string>,
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<BigNumberish>
    ]): string;
    decodeFunctionResult(functionFragment: "getAmountIn", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getAmountOut", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getExchangeProviders", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "swapIn", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "swapOut", data: BytesLike): Result;
    events: {
        "Swap(address,bytes32,address,address,address,uint256,uint256)": EventFragment;
    };
    getEvent(nameOrSignatureOrTopic: "Swap"): EventFragment;
}
export interface SwapEventObject {
    exchangeProvider: string;
    exchangeId: string;
    trader: string;
    tokenIn: string;
    tokenOut: string;
    amountIn: BigNumber;
    amountOut: BigNumber;
}
export type SwapEvent = TypedEvent<[
    string,
    string,
    string,
    string,
    string,
    BigNumber,
    BigNumber
], SwapEventObject>;
export type SwapEventFilter = TypedEventFilter<SwapEvent>;
export interface IBroker extends BaseContract {
    connect(signerOrProvider: Signer | Provider | string): this;
    attach(addressOrName: string): this;
    deployed(): Promise<this>;
    interface: IBrokerInterface;
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
        getAmountIn(exchangeProvider: PromiseOrValue<string>, exchangeId: PromiseOrValue<BytesLike>, tokenIn: PromiseOrValue<string>, tokenOut: PromiseOrValue<string>, amountOut: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<[BigNumber] & {
            amountIn: BigNumber;
        }>;
        getAmountOut(exchangeProvider: PromiseOrValue<string>, exchangeId: PromiseOrValue<BytesLike>, tokenIn: PromiseOrValue<string>, tokenOut: PromiseOrValue<string>, amountIn: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<[BigNumber] & {
            amountOut: BigNumber;
        }>;
        getExchangeProviders(overrides?: CallOverrides): Promise<[string[]] & {
            exchangeProviders: string[];
        }>;
        swapIn(exchangeProvider: PromiseOrValue<string>, exchangeId: PromiseOrValue<BytesLike>, tokenIn: PromiseOrValue<string>, tokenOut: PromiseOrValue<string>, amountIn: PromiseOrValue<BigNumberish>, amountOutMin: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        swapOut(exchangeProvider: PromiseOrValue<string>, exchangeId: PromiseOrValue<BytesLike>, tokenIn: PromiseOrValue<string>, tokenOut: PromiseOrValue<string>, amountOut: PromiseOrValue<BigNumberish>, amountInMax: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
    };
    getAmountIn(exchangeProvider: PromiseOrValue<string>, exchangeId: PromiseOrValue<BytesLike>, tokenIn: PromiseOrValue<string>, tokenOut: PromiseOrValue<string>, amountOut: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;
    getAmountOut(exchangeProvider: PromiseOrValue<string>, exchangeId: PromiseOrValue<BytesLike>, tokenIn: PromiseOrValue<string>, tokenOut: PromiseOrValue<string>, amountIn: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;
    getExchangeProviders(overrides?: CallOverrides): Promise<string[]>;
    swapIn(exchangeProvider: PromiseOrValue<string>, exchangeId: PromiseOrValue<BytesLike>, tokenIn: PromiseOrValue<string>, tokenOut: PromiseOrValue<string>, amountIn: PromiseOrValue<BigNumberish>, amountOutMin: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    swapOut(exchangeProvider: PromiseOrValue<string>, exchangeId: PromiseOrValue<BytesLike>, tokenIn: PromiseOrValue<string>, tokenOut: PromiseOrValue<string>, amountOut: PromiseOrValue<BigNumberish>, amountInMax: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    callStatic: {
        getAmountIn(exchangeProvider: PromiseOrValue<string>, exchangeId: PromiseOrValue<BytesLike>, tokenIn: PromiseOrValue<string>, tokenOut: PromiseOrValue<string>, amountOut: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;
        getAmountOut(exchangeProvider: PromiseOrValue<string>, exchangeId: PromiseOrValue<BytesLike>, tokenIn: PromiseOrValue<string>, tokenOut: PromiseOrValue<string>, amountIn: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;
        getExchangeProviders(overrides?: CallOverrides): Promise<string[]>;
        swapIn(exchangeProvider: PromiseOrValue<string>, exchangeId: PromiseOrValue<BytesLike>, tokenIn: PromiseOrValue<string>, tokenOut: PromiseOrValue<string>, amountIn: PromiseOrValue<BigNumberish>, amountOutMin: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;
        swapOut(exchangeProvider: PromiseOrValue<string>, exchangeId: PromiseOrValue<BytesLike>, tokenIn: PromiseOrValue<string>, tokenOut: PromiseOrValue<string>, amountOut: PromiseOrValue<BigNumberish>, amountInMax: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;
    };
    filters: {
        "Swap(address,bytes32,address,address,address,uint256,uint256)"(exchangeProvider?: null, exchangeId?: PromiseOrValue<BytesLike> | null, trader?: PromiseOrValue<string> | null, tokenIn?: PromiseOrValue<string> | null, tokenOut?: null, amountIn?: null, amountOut?: null): SwapEventFilter;
        Swap(exchangeProvider?: null, exchangeId?: PromiseOrValue<BytesLike> | null, trader?: PromiseOrValue<string> | null, tokenIn?: PromiseOrValue<string> | null, tokenOut?: null, amountIn?: null, amountOut?: null): SwapEventFilter;
    };
    estimateGas: {
        getAmountIn(exchangeProvider: PromiseOrValue<string>, exchangeId: PromiseOrValue<BytesLike>, tokenIn: PromiseOrValue<string>, tokenOut: PromiseOrValue<string>, amountOut: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;
        getAmountOut(exchangeProvider: PromiseOrValue<string>, exchangeId: PromiseOrValue<BytesLike>, tokenIn: PromiseOrValue<string>, tokenOut: PromiseOrValue<string>, amountIn: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;
        getExchangeProviders(overrides?: CallOverrides): Promise<BigNumber>;
        swapIn(exchangeProvider: PromiseOrValue<string>, exchangeId: PromiseOrValue<BytesLike>, tokenIn: PromiseOrValue<string>, tokenOut: PromiseOrValue<string>, amountIn: PromiseOrValue<BigNumberish>, amountOutMin: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        swapOut(exchangeProvider: PromiseOrValue<string>, exchangeId: PromiseOrValue<BytesLike>, tokenIn: PromiseOrValue<string>, tokenOut: PromiseOrValue<string>, amountOut: PromiseOrValue<BigNumberish>, amountInMax: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
    };
    populateTransaction: {
        getAmountIn(exchangeProvider: PromiseOrValue<string>, exchangeId: PromiseOrValue<BytesLike>, tokenIn: PromiseOrValue<string>, tokenOut: PromiseOrValue<string>, amountOut: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        getAmountOut(exchangeProvider: PromiseOrValue<string>, exchangeId: PromiseOrValue<BytesLike>, tokenIn: PromiseOrValue<string>, tokenOut: PromiseOrValue<string>, amountIn: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        getExchangeProviders(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        swapIn(exchangeProvider: PromiseOrValue<string>, exchangeId: PromiseOrValue<BytesLike>, tokenIn: PromiseOrValue<string>, tokenOut: PromiseOrValue<string>, amountIn: PromiseOrValue<BigNumberish>, amountOutMin: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        swapOut(exchangeProvider: PromiseOrValue<string>, exchangeId: PromiseOrValue<BytesLike>, tokenIn: PromiseOrValue<string>, tokenOut: PromiseOrValue<string>, amountOut: PromiseOrValue<BigNumberish>, amountInMax: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
    };
}
