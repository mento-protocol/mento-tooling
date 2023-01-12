import type { BaseContract, BigNumber, BigNumberish, BytesLike, CallOverrides, ContractTransaction, Overrides, PopulatedTransaction, Signer, utils } from "ethers";
import type { FunctionFragment, Result } from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type { TypedEventFilter, TypedEvent, TypedListener, OnEvent, PromiseOrValue } from "./common";
export declare namespace IExchangeProvider {
    type ExchangeStruct = {
        exchangeId: PromiseOrValue<BytesLike>;
        assets: PromiseOrValue<string>[];
    };
    type ExchangeStructOutput = [string, string[]] & {
        exchangeId: string;
        assets: string[];
    };
}
export interface IExchangeProviderInterface extends utils.Interface {
    functions: {
        "getAmountIn(bytes32,address,address,uint256)": FunctionFragment;
        "getAmountOut(bytes32,address,address,uint256)": FunctionFragment;
        "getExchanges()": FunctionFragment;
        "swapIn(bytes32,address,address,uint256)": FunctionFragment;
        "swapOut(bytes32,address,address,uint256)": FunctionFragment;
    };
    getFunction(nameOrSignatureOrTopic: "getAmountIn" | "getAmountOut" | "getExchanges" | "swapIn" | "swapOut"): FunctionFragment;
    encodeFunctionData(functionFragment: "getAmountIn", values: [
        PromiseOrValue<BytesLike>,
        PromiseOrValue<string>,
        PromiseOrValue<string>,
        PromiseOrValue<BigNumberish>
    ]): string;
    encodeFunctionData(functionFragment: "getAmountOut", values: [
        PromiseOrValue<BytesLike>,
        PromiseOrValue<string>,
        PromiseOrValue<string>,
        PromiseOrValue<BigNumberish>
    ]): string;
    encodeFunctionData(functionFragment: "getExchanges", values?: undefined): string;
    encodeFunctionData(functionFragment: "swapIn", values: [
        PromiseOrValue<BytesLike>,
        PromiseOrValue<string>,
        PromiseOrValue<string>,
        PromiseOrValue<BigNumberish>
    ]): string;
    encodeFunctionData(functionFragment: "swapOut", values: [
        PromiseOrValue<BytesLike>,
        PromiseOrValue<string>,
        PromiseOrValue<string>,
        PromiseOrValue<BigNumberish>
    ]): string;
    decodeFunctionResult(functionFragment: "getAmountIn", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getAmountOut", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getExchanges", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "swapIn", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "swapOut", data: BytesLike): Result;
    events: {};
}
export interface IExchangeProvider extends BaseContract {
    connect(signerOrProvider: Signer | Provider | string): this;
    attach(addressOrName: string): this;
    deployed(): Promise<this>;
    interface: IExchangeProviderInterface;
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
        getAmountIn(exchangeId: PromiseOrValue<BytesLike>, tokenIn: PromiseOrValue<string>, tokenOut: PromiseOrValue<string>, amountOut: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<[BigNumber] & {
            amountIn: BigNumber;
        }>;
        getAmountOut(exchangeId: PromiseOrValue<BytesLike>, tokenIn: PromiseOrValue<string>, tokenOut: PromiseOrValue<string>, amountIn: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<[BigNumber] & {
            amountOut: BigNumber;
        }>;
        getExchanges(overrides?: CallOverrides): Promise<[
            IExchangeProvider.ExchangeStructOutput[]
        ] & {
            exchanges: IExchangeProvider.ExchangeStructOutput[];
        }>;
        swapIn(exchangeId: PromiseOrValue<BytesLike>, tokenIn: PromiseOrValue<string>, tokenOut: PromiseOrValue<string>, amountIn: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        swapOut(exchangeId: PromiseOrValue<BytesLike>, tokenIn: PromiseOrValue<string>, tokenOut: PromiseOrValue<string>, amountOut: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
    };
    getAmountIn(exchangeId: PromiseOrValue<BytesLike>, tokenIn: PromiseOrValue<string>, tokenOut: PromiseOrValue<string>, amountOut: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;
    getAmountOut(exchangeId: PromiseOrValue<BytesLike>, tokenIn: PromiseOrValue<string>, tokenOut: PromiseOrValue<string>, amountIn: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;
    getExchanges(overrides?: CallOverrides): Promise<IExchangeProvider.ExchangeStructOutput[]>;
    swapIn(exchangeId: PromiseOrValue<BytesLike>, tokenIn: PromiseOrValue<string>, tokenOut: PromiseOrValue<string>, amountIn: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    swapOut(exchangeId: PromiseOrValue<BytesLike>, tokenIn: PromiseOrValue<string>, tokenOut: PromiseOrValue<string>, amountOut: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    callStatic: {
        getAmountIn(exchangeId: PromiseOrValue<BytesLike>, tokenIn: PromiseOrValue<string>, tokenOut: PromiseOrValue<string>, amountOut: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;
        getAmountOut(exchangeId: PromiseOrValue<BytesLike>, tokenIn: PromiseOrValue<string>, tokenOut: PromiseOrValue<string>, amountIn: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;
        getExchanges(overrides?: CallOverrides): Promise<IExchangeProvider.ExchangeStructOutput[]>;
        swapIn(exchangeId: PromiseOrValue<BytesLike>, tokenIn: PromiseOrValue<string>, tokenOut: PromiseOrValue<string>, amountIn: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;
        swapOut(exchangeId: PromiseOrValue<BytesLike>, tokenIn: PromiseOrValue<string>, tokenOut: PromiseOrValue<string>, amountOut: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;
    };
    filters: {};
    estimateGas: {
        getAmountIn(exchangeId: PromiseOrValue<BytesLike>, tokenIn: PromiseOrValue<string>, tokenOut: PromiseOrValue<string>, amountOut: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;
        getAmountOut(exchangeId: PromiseOrValue<BytesLike>, tokenIn: PromiseOrValue<string>, tokenOut: PromiseOrValue<string>, amountIn: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;
        getExchanges(overrides?: CallOverrides): Promise<BigNumber>;
        swapIn(exchangeId: PromiseOrValue<BytesLike>, tokenIn: PromiseOrValue<string>, tokenOut: PromiseOrValue<string>, amountIn: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        swapOut(exchangeId: PromiseOrValue<BytesLike>, tokenIn: PromiseOrValue<string>, tokenOut: PromiseOrValue<string>, amountOut: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
    };
    populateTransaction: {
        getAmountIn(exchangeId: PromiseOrValue<BytesLike>, tokenIn: PromiseOrValue<string>, tokenOut: PromiseOrValue<string>, amountOut: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        getAmountOut(exchangeId: PromiseOrValue<BytesLike>, tokenIn: PromiseOrValue<string>, tokenOut: PromiseOrValue<string>, amountIn: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        getExchanges(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        swapIn(exchangeId: PromiseOrValue<BytesLike>, tokenIn: PromiseOrValue<string>, tokenOut: PromiseOrValue<string>, amountIn: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        swapOut(exchangeId: PromiseOrValue<BytesLike>, tokenIn: PromiseOrValue<string>, tokenOut: PromiseOrValue<string>, amountOut: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
    };
}
