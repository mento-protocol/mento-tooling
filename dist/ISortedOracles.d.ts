import type { BaseContract, BigNumber, BigNumberish, BytesLike, CallOverrides, ContractTransaction, Overrides, PopulatedTransaction, Signer, utils } from "ethers";
import type { FunctionFragment, Result } from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type { TypedEventFilter, TypedEvent, TypedListener, OnEvent, PromiseOrValue } from "./common";
export interface ISortedOraclesInterface extends utils.Interface {
    functions: {
        "addOracle(address,address)": FunctionFragment;
        "getOracles(address)": FunctionFragment;
        "getTimestamps(address)": FunctionFragment;
        "isOldestReportExpired(address)": FunctionFragment;
        "medianRate(address)": FunctionFragment;
        "medianTimestamp(address)": FunctionFragment;
        "numRates(address)": FunctionFragment;
        "numTimestamps(address)": FunctionFragment;
        "removeExpiredReports(address,uint256)": FunctionFragment;
        "removeOracle(address,address,uint256)": FunctionFragment;
        "report(address,uint256,address,address)": FunctionFragment;
    };
    getFunction(nameOrSignatureOrTopic: "addOracle" | "getOracles" | "getTimestamps" | "isOldestReportExpired" | "medianRate" | "medianTimestamp" | "numRates" | "numTimestamps" | "removeExpiredReports" | "removeOracle" | "report"): FunctionFragment;
    encodeFunctionData(functionFragment: "addOracle", values: [PromiseOrValue<string>, PromiseOrValue<string>]): string;
    encodeFunctionData(functionFragment: "getOracles", values: [PromiseOrValue<string>]): string;
    encodeFunctionData(functionFragment: "getTimestamps", values: [PromiseOrValue<string>]): string;
    encodeFunctionData(functionFragment: "isOldestReportExpired", values: [PromiseOrValue<string>]): string;
    encodeFunctionData(functionFragment: "medianRate", values: [PromiseOrValue<string>]): string;
    encodeFunctionData(functionFragment: "medianTimestamp", values: [PromiseOrValue<string>]): string;
    encodeFunctionData(functionFragment: "numRates", values: [PromiseOrValue<string>]): string;
    encodeFunctionData(functionFragment: "numTimestamps", values: [PromiseOrValue<string>]): string;
    encodeFunctionData(functionFragment: "removeExpiredReports", values: [PromiseOrValue<string>, PromiseOrValue<BigNumberish>]): string;
    encodeFunctionData(functionFragment: "removeOracle", values: [
        PromiseOrValue<string>,
        PromiseOrValue<string>,
        PromiseOrValue<BigNumberish>
    ]): string;
    encodeFunctionData(functionFragment: "report", values: [
        PromiseOrValue<string>,
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<string>,
        PromiseOrValue<string>
    ]): string;
    decodeFunctionResult(functionFragment: "addOracle", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getOracles", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getTimestamps", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "isOldestReportExpired", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "medianRate", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "medianTimestamp", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "numRates", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "numTimestamps", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "removeExpiredReports", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "removeOracle", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "report", data: BytesLike): Result;
    events: {};
}
export interface ISortedOracles extends BaseContract {
    connect(signerOrProvider: Signer | Provider | string): this;
    attach(addressOrName: string): this;
    deployed(): Promise<this>;
    interface: ISortedOraclesInterface;
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
        addOracle(arg0: PromiseOrValue<string>, arg1: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        getOracles(arg0: PromiseOrValue<string>, overrides?: CallOverrides): Promise<[string[]]>;
        getTimestamps(token: PromiseOrValue<string>, overrides?: CallOverrides): Promise<[string[], BigNumber[], number[]]>;
        isOldestReportExpired(token: PromiseOrValue<string>, overrides?: CallOverrides): Promise<[boolean, string]>;
        medianRate(arg0: PromiseOrValue<string>, overrides?: CallOverrides): Promise<[BigNumber, BigNumber]>;
        medianTimestamp(arg0: PromiseOrValue<string>, overrides?: CallOverrides): Promise<[BigNumber]>;
        numRates(arg0: PromiseOrValue<string>, overrides?: CallOverrides): Promise<[BigNumber]>;
        numTimestamps(arg0: PromiseOrValue<string>, overrides?: CallOverrides): Promise<[BigNumber]>;
        removeExpiredReports(arg0: PromiseOrValue<string>, arg1: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        removeOracle(arg0: PromiseOrValue<string>, arg1: PromiseOrValue<string>, arg2: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        report(arg0: PromiseOrValue<string>, arg1: PromiseOrValue<BigNumberish>, arg2: PromiseOrValue<string>, arg3: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
    };
    addOracle(arg0: PromiseOrValue<string>, arg1: PromiseOrValue<string>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    getOracles(arg0: PromiseOrValue<string>, overrides?: CallOverrides): Promise<string[]>;
    getTimestamps(token: PromiseOrValue<string>, overrides?: CallOverrides): Promise<[string[], BigNumber[], number[]]>;
    isOldestReportExpired(token: PromiseOrValue<string>, overrides?: CallOverrides): Promise<[boolean, string]>;
    medianRate(arg0: PromiseOrValue<string>, overrides?: CallOverrides): Promise<[BigNumber, BigNumber]>;
    medianTimestamp(arg0: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;
    numRates(arg0: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;
    numTimestamps(arg0: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;
    removeExpiredReports(arg0: PromiseOrValue<string>, arg1: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    removeOracle(arg0: PromiseOrValue<string>, arg1: PromiseOrValue<string>, arg2: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    report(arg0: PromiseOrValue<string>, arg1: PromiseOrValue<BigNumberish>, arg2: PromiseOrValue<string>, arg3: PromiseOrValue<string>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    callStatic: {
        addOracle(arg0: PromiseOrValue<string>, arg1: PromiseOrValue<string>, overrides?: CallOverrides): Promise<void>;
        getOracles(arg0: PromiseOrValue<string>, overrides?: CallOverrides): Promise<string[]>;
        getTimestamps(token: PromiseOrValue<string>, overrides?: CallOverrides): Promise<[string[], BigNumber[], number[]]>;
        isOldestReportExpired(token: PromiseOrValue<string>, overrides?: CallOverrides): Promise<[boolean, string]>;
        medianRate(arg0: PromiseOrValue<string>, overrides?: CallOverrides): Promise<[BigNumber, BigNumber]>;
        medianTimestamp(arg0: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;
        numRates(arg0: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;
        numTimestamps(arg0: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;
        removeExpiredReports(arg0: PromiseOrValue<string>, arg1: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<void>;
        removeOracle(arg0: PromiseOrValue<string>, arg1: PromiseOrValue<string>, arg2: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<void>;
        report(arg0: PromiseOrValue<string>, arg1: PromiseOrValue<BigNumberish>, arg2: PromiseOrValue<string>, arg3: PromiseOrValue<string>, overrides?: CallOverrides): Promise<void>;
    };
    filters: {};
    estimateGas: {
        addOracle(arg0: PromiseOrValue<string>, arg1: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        getOracles(arg0: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;
        getTimestamps(token: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;
        isOldestReportExpired(token: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;
        medianRate(arg0: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;
        medianTimestamp(arg0: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;
        numRates(arg0: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;
        numTimestamps(arg0: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;
        removeExpiredReports(arg0: PromiseOrValue<string>, arg1: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        removeOracle(arg0: PromiseOrValue<string>, arg1: PromiseOrValue<string>, arg2: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        report(arg0: PromiseOrValue<string>, arg1: PromiseOrValue<BigNumberish>, arg2: PromiseOrValue<string>, arg3: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
    };
    populateTransaction: {
        addOracle(arg0: PromiseOrValue<string>, arg1: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        getOracles(arg0: PromiseOrValue<string>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        getTimestamps(token: PromiseOrValue<string>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        isOldestReportExpired(token: PromiseOrValue<string>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        medianRate(arg0: PromiseOrValue<string>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        medianTimestamp(arg0: PromiseOrValue<string>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        numRates(arg0: PromiseOrValue<string>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        numTimestamps(arg0: PromiseOrValue<string>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        removeExpiredReports(arg0: PromiseOrValue<string>, arg1: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        removeOracle(arg0: PromiseOrValue<string>, arg1: PromiseOrValue<string>, arg2: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        report(arg0: PromiseOrValue<string>, arg1: PromiseOrValue<BigNumberish>, arg2: PromiseOrValue<string>, arg3: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
    };
}
