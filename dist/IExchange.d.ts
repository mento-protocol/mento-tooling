import type { BaseContract, BigNumber, BigNumberish, BytesLike, CallOverrides, ContractTransaction, Overrides, PopulatedTransaction, Signer, utils } from "ethers";
import type { FunctionFragment, Result } from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type { TypedEventFilter, TypedEvent, TypedListener, OnEvent, PromiseOrValue } from "./common";
export interface IExchangeInterface extends utils.Interface {
    functions: {
        "buy(uint256,uint256,bool)": FunctionFragment;
        "exchange(uint256,uint256,bool)": FunctionFragment;
        "getBuyAndSellBuckets(bool)": FunctionFragment;
        "getBuyTokenAmount(uint256,bool)": FunctionFragment;
        "getSellTokenAmount(uint256,bool)": FunctionFragment;
        "sell(uint256,uint256,bool)": FunctionFragment;
        "setUpdateFrequency(uint256)": FunctionFragment;
    };
    getFunction(nameOrSignatureOrTopic: "buy" | "exchange" | "getBuyAndSellBuckets" | "getBuyTokenAmount" | "getSellTokenAmount" | "sell" | "setUpdateFrequency"): FunctionFragment;
    encodeFunctionData(functionFragment: "buy", values: [
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<boolean>
    ]): string;
    encodeFunctionData(functionFragment: "exchange", values: [
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<boolean>
    ]): string;
    encodeFunctionData(functionFragment: "getBuyAndSellBuckets", values: [PromiseOrValue<boolean>]): string;
    encodeFunctionData(functionFragment: "getBuyTokenAmount", values: [PromiseOrValue<BigNumberish>, PromiseOrValue<boolean>]): string;
    encodeFunctionData(functionFragment: "getSellTokenAmount", values: [PromiseOrValue<BigNumberish>, PromiseOrValue<boolean>]): string;
    encodeFunctionData(functionFragment: "sell", values: [
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<boolean>
    ]): string;
    encodeFunctionData(functionFragment: "setUpdateFrequency", values: [PromiseOrValue<BigNumberish>]): string;
    decodeFunctionResult(functionFragment: "buy", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "exchange", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getBuyAndSellBuckets", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getBuyTokenAmount", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getSellTokenAmount", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "sell", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "setUpdateFrequency", data: BytesLike): Result;
    events: {};
}
export interface IExchange extends BaseContract {
    connect(signerOrProvider: Signer | Provider | string): this;
    attach(addressOrName: string): this;
    deployed(): Promise<this>;
    interface: IExchangeInterface;
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
        buy(arg0: PromiseOrValue<BigNumberish>, arg1: PromiseOrValue<BigNumberish>, arg2: PromiseOrValue<boolean>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        exchange(arg0: PromiseOrValue<BigNumberish>, arg1: PromiseOrValue<BigNumberish>, arg2: PromiseOrValue<boolean>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        getBuyAndSellBuckets(arg0: PromiseOrValue<boolean>, overrides?: CallOverrides): Promise<[BigNumber, BigNumber]>;
        getBuyTokenAmount(arg0: PromiseOrValue<BigNumberish>, arg1: PromiseOrValue<boolean>, overrides?: CallOverrides): Promise<[BigNumber]>;
        getSellTokenAmount(arg0: PromiseOrValue<BigNumberish>, arg1: PromiseOrValue<boolean>, overrides?: CallOverrides): Promise<[BigNumber]>;
        sell(arg0: PromiseOrValue<BigNumberish>, arg1: PromiseOrValue<BigNumberish>, arg2: PromiseOrValue<boolean>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        setUpdateFrequency(arg0: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
    };
    buy(arg0: PromiseOrValue<BigNumberish>, arg1: PromiseOrValue<BigNumberish>, arg2: PromiseOrValue<boolean>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    exchange(arg0: PromiseOrValue<BigNumberish>, arg1: PromiseOrValue<BigNumberish>, arg2: PromiseOrValue<boolean>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    getBuyAndSellBuckets(arg0: PromiseOrValue<boolean>, overrides?: CallOverrides): Promise<[BigNumber, BigNumber]>;
    getBuyTokenAmount(arg0: PromiseOrValue<BigNumberish>, arg1: PromiseOrValue<boolean>, overrides?: CallOverrides): Promise<BigNumber>;
    getSellTokenAmount(arg0: PromiseOrValue<BigNumberish>, arg1: PromiseOrValue<boolean>, overrides?: CallOverrides): Promise<BigNumber>;
    sell(arg0: PromiseOrValue<BigNumberish>, arg1: PromiseOrValue<BigNumberish>, arg2: PromiseOrValue<boolean>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    setUpdateFrequency(arg0: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    callStatic: {
        buy(arg0: PromiseOrValue<BigNumberish>, arg1: PromiseOrValue<BigNumberish>, arg2: PromiseOrValue<boolean>, overrides?: CallOverrides): Promise<BigNumber>;
        exchange(arg0: PromiseOrValue<BigNumberish>, arg1: PromiseOrValue<BigNumberish>, arg2: PromiseOrValue<boolean>, overrides?: CallOverrides): Promise<BigNumber>;
        getBuyAndSellBuckets(arg0: PromiseOrValue<boolean>, overrides?: CallOverrides): Promise<[BigNumber, BigNumber]>;
        getBuyTokenAmount(arg0: PromiseOrValue<BigNumberish>, arg1: PromiseOrValue<boolean>, overrides?: CallOverrides): Promise<BigNumber>;
        getSellTokenAmount(arg0: PromiseOrValue<BigNumberish>, arg1: PromiseOrValue<boolean>, overrides?: CallOverrides): Promise<BigNumber>;
        sell(arg0: PromiseOrValue<BigNumberish>, arg1: PromiseOrValue<BigNumberish>, arg2: PromiseOrValue<boolean>, overrides?: CallOverrides): Promise<BigNumber>;
        setUpdateFrequency(arg0: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<void>;
    };
    filters: {};
    estimateGas: {
        buy(arg0: PromiseOrValue<BigNumberish>, arg1: PromiseOrValue<BigNumberish>, arg2: PromiseOrValue<boolean>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        exchange(arg0: PromiseOrValue<BigNumberish>, arg1: PromiseOrValue<BigNumberish>, arg2: PromiseOrValue<boolean>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        getBuyAndSellBuckets(arg0: PromiseOrValue<boolean>, overrides?: CallOverrides): Promise<BigNumber>;
        getBuyTokenAmount(arg0: PromiseOrValue<BigNumberish>, arg1: PromiseOrValue<boolean>, overrides?: CallOverrides): Promise<BigNumber>;
        getSellTokenAmount(arg0: PromiseOrValue<BigNumberish>, arg1: PromiseOrValue<boolean>, overrides?: CallOverrides): Promise<BigNumber>;
        sell(arg0: PromiseOrValue<BigNumberish>, arg1: PromiseOrValue<BigNumberish>, arg2: PromiseOrValue<boolean>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        setUpdateFrequency(arg0: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
    };
    populateTransaction: {
        buy(arg0: PromiseOrValue<BigNumberish>, arg1: PromiseOrValue<BigNumberish>, arg2: PromiseOrValue<boolean>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        exchange(arg0: PromiseOrValue<BigNumberish>, arg1: PromiseOrValue<BigNumberish>, arg2: PromiseOrValue<boolean>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        getBuyAndSellBuckets(arg0: PromiseOrValue<boolean>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        getBuyTokenAmount(arg0: PromiseOrValue<BigNumberish>, arg1: PromiseOrValue<boolean>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        getSellTokenAmount(arg0: PromiseOrValue<BigNumberish>, arg1: PromiseOrValue<boolean>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        sell(arg0: PromiseOrValue<BigNumberish>, arg1: PromiseOrValue<BigNumberish>, arg2: PromiseOrValue<boolean>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        setUpdateFrequency(arg0: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
    };
}
